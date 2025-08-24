// src/components/Chat/NewChatModal.js
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { createChat } from '../../services/firebase';
import { X } from 'lucide-react';
import { ethers } from 'ethers';

const NewChatModal = ({ isOpen, onClose, onChatCreated }) => {
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateAddress = (addr) => {
    try {
      return ethers.isAddress(addr);
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!walletAddress.trim()) return;

    setError('');
    setLoading(true);

    try {
      // Validate the wallet address
      if (!validateAddress(walletAddress)) {
        throw new Error('Invalid wallet address format');
      }

      // Check if trying to chat with self
      if (walletAddress.toLowerCase() === address?.toLowerCase()) {
        throw new Error('Cannot start a chat with yourself');
      }

      // Create the chat
      const chatId = await createChat(address, walletAddress);
      
      // Notify parent component
      onChatCreated(chatId, walletAddress);
      
      // Reset and close
      setWalletAddress('');
      onClose();
    } catch (error) {
      console.error('Error creating chat:', error);
      setError(error.message || 'Failed to create chat');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setWalletAddress('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Start New Chat</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x1234567890abcdef..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the wallet address you want to chat with
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!walletAddress.trim() || loading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </div>
              ) : (
                'Start Chat'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChatModal;