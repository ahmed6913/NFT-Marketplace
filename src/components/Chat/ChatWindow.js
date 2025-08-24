// src/components/Chat/ChatWindow.js
import React, { useState, useEffect, useRef } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { subscribeToMessages, sendMessage } from '../../services/firebase';
import {
  encryptMessage,
  decryptMessage,
  getPublicKeyFromSignature,
  generateSharedSecret,
  shortenAddress
} from '../../utils/encryption';
import { Send, ArrowLeft } from 'lucide-react';

const ChatWindow = ({ chatId, otherParticipant, onBack }) => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sharedSecret, setSharedSecret] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize shared secret for encryption
  useEffect(() => {
    const initializeEncryption = async () => {
      if (!walletClient || !address || !chatId) return;

      try {
        // Use chatId as shared secret so both users can decrypt messages
        // In production, implement proper ECDH key exchange
        const secret = `chat_${chatId}`;
        console.log('Initialized shared secret:', secret);
        setSharedSecret(secret);
      } catch (error) {
        console.error('Error initializing encryption:', error);
      }
    };

    initializeEncryption();
  }, [walletClient, address, chatId]);

  // Subscribe to messages
  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = subscribeToMessages(chatId, (chatMessages) => {
      console.log('Received messages from Firestore:', chatMessages.length);

      const decryptedMessages = chatMessages.map(msg => {
        // Debug: Log what we're getting from Firebase
        console.log('🔍 MESSAGE DETAILS:', {
          id: msg.id,
          sender: msg.sender,
          content: msg.content,
          contentType: typeof msg.content,
          contentLength: msg.content?.length,
          isEncrypted: msg.content?.startsWith('0x'),
          fullMessage: JSON.stringify(msg)
        });

        // Show messages without decryption to test basic functionality
        return {
          ...msg,
          decryptedContent: msg.content || 'Loading...'
        };
      });

      setMessages(decryptedMessages);
    });

    return () => unsubscribe();
  }, [chatId, sharedSecret]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || loading) return;

    setLoading(true);
    try {
      console.log('Sending message:', {
        chatId,
        address,
        message: newMessage.trim(),
        plainText: newMessage.trim()
      });

      // Send message without encryption for now (to test basic functionality)
      await sendMessage(chatId, address, newMessage.trim(), newMessage.trim());
      console.log('Message sent to Firestore successfully - should be plain text:', newMessage.trim());

      setNewMessage('');
    } catch (error) {
      console.error('Detailed error sending message:', error);
      alert(`Failed to send message: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isMyMessage = (sender) => {
    return sender.toLowerCase() === address?.toLowerCase();
  };

  if (!chatId) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <button
          onClick={onBack}
          className="md:hidden p-1 hover:bg-gray-100 rounded"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {shortenAddress(otherParticipant).slice(0, 2)}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">
            {shortenAddress(otherParticipant)}
          </h3>
          <p className="text-xs text-gray-500">Wallet Address</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No messages yet</p>
            <p className="text-sm mt-1">Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${isMyMessage(message.sender) ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isMyMessage(message.sender)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-900'
                  }`}
              >
                <p className="text-sm">{message.decryptedContent}</p>
                <p className={`text-xs mt-1 ${isMyMessage(message.sender) ? 'text-indigo-200' : 'text-gray-500'
                  }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;