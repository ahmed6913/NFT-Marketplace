// src/components/Chat/ChatList.js
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { subscribeToUserChats } from '../../services/firebase';
import { shortenAddress } from '../../utils/encryption';
import { MessageCircle, Plus } from 'lucide-react';

const ChatList = ({ onSelectChat, onStartNewChat, selectedChatId }) => {
  const { address } = useAccount();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const unsubscribe = subscribeToUserChats(address, (userChats) => {
      setChats(userChats);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [address]);

  const getOtherParticipant = (participants) => {
    return participants.find(p => p.toLowerCase() !== address?.toLowerCase());
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!address) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <MessageCircle className="mx-auto mb-2" size={48} />
          <p>Connect your wallet to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
        <button
          onClick={onStartNewChat}
          className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
          title="Start new chat"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-500">
            Loading chats...
          </div>
        ) : chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MessageCircle className="mx-auto mb-2" size={32} />
            <p className="text-sm">No chats yet</p>
            <p className="text-xs mt-1">Start a new conversation</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {chats.map((chat) => {
              const otherParticipant = getOtherParticipant(chat.participants);
              const isSelected = selectedChatId === chat.id;
              
              return (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id, otherParticipant)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    isSelected ? 'bg-indigo-50 border-r-2 border-indigo-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {shortenAddress(otherParticipant).slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {shortenAddress(otherParticipant)}
                          </p>
                          {chat.lastMessage && (
                            <p className="text-xs text-gray-500 truncate">
                              {chat.lastMessage}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {chat.lastMessageTime && (
                      <div className="text-xs text-gray-400">
                        {formatTime(chat.lastMessageTime)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;