// src/components/Chat/ChatContainer.js
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import NewChatModal from './NewChatModal';

const ChatContainer = () => {
  const { address, isConnected } = useAccount();
  const [selectedChat, setSelectedChat] = useState(null);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const handleSelectChat = (chatId, otherParticipant) => {
    setSelectedChat({ chatId, otherParticipant });
    setShowMobileChat(true);
  };

  const handleStartNewChat = () => {
    setShowNewChatModal(true);
  };

  const handleChatCreated = (chatId, otherParticipant) => {
    setSelectedChat({ chatId, otherParticipant });
    setShowMobileChat(true);
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  if (!isConnected) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Anonymous Wallet Chat
          </h2>
          <p className="text-gray-600 mb-6">
            Connect your wallet to start secure, anonymous conversations with other wallet holders.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h3 className="font-medium text-blue-900 mb-2">Features:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• End-to-end encrypted messages</li>
              <li>• No usernames or emails required</li>
              <li>• Chat using only wallet addresses</li>
              <li>• Real-time messaging</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden md:flex h-full">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r border-gray-200 bg-gray-50">
          <ChatList
            onSelectChat={handleSelectChat}
            onStartNewChat={handleStartNewChat}
            selectedChatId={selectedChat?.chatId}
          />
        </div>
        
        {/* Chat Window */}
        <div className="flex-1">
          <ChatWindow
            chatId={selectedChat?.chatId}
            otherParticipant={selectedChat?.otherParticipant}
            onBack={handleBackToList}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden h-full">
        {!showMobileChat ? (
          <ChatList
            onSelectChat={handleSelectChat}
            onStartNewChat={handleStartNewChat}
            selectedChatId={selectedChat?.chatId}
          />
        ) : (
          <ChatWindow
            chatId={selectedChat?.chatId}
            otherParticipant={selectedChat?.otherParticipant}
            onBack={handleBackToList}
          />
        )}
      </div>

      {/* New Chat Modal */}
      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        onChatCreated={handleChatCreated}
      />
    </div>
  );
};

export default ChatContainer;