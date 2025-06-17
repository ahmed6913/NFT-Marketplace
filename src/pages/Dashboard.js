
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NFTPreviewGrid from '../components/NFTPreviewGrid';

function Dashboard({ user, onLogout }) {
  const [page, setPage] = useState('home');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user) {
      const displayName = user.displayName || user.email;
      setUsername(displayName);
    }
  }, [user]);

  function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask not detected. Please install it to connect your wallet.');
      return;
    }

    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        if (accounts.length === 0) {
          alert('No accounts found.');
        } else {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);
          alert('Wallet connected: ' + accounts[0]);
        }
      })
      .catch((err) => {
        alert('Failed to connect wallet: ' + err.message);
      });
  }

  function renderHeroBanner() {
    return React.createElement(
      'section',
      {
        className:
          'bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-10 rounded-lg shadow-lg mb-8',
      },
      React.createElement(
        'h1',
        { className: 'text-3xl font-bold mb-2' },
        'Get rewarded with NFTs every time you shop.'
      ),
      username &&
        React.createElement(
          'p',
          { className: 'text-xl' },
          `Welcome back, ${username} 👋`
        )
    );
  }

  function renderActivityFeed() {
    const activities = [
      {
        id: 1,
        message: '🎉 You earned an NFT from Footlocker Store',
        timestamp: '2 hours ago',
      },
      {
        id: 2,
        message: '🎁 You’ve unlocked a reward from Nike',
        timestamp: 'Yesterday',
      },
    ];

    return React.createElement(
      'section',
      { className: 'bg-white p-6 rounded-lg shadow-md' },
      React.createElement(
        'h2',
        { className: 'text-xl font-semibold mb-4' },
        'Recent Activity'
      ),
      React.createElement(
        'ul',
        { className: 'space-y-3' },
        ...activities.map((activity) =>
          React.createElement(
            'li',
            { key: activity.id, className: 'border-b pb-2' },
            React.createElement('p', null, activity.message),
            React.createElement(
              'span',
              { className: 'text-sm text-gray-500' },
              activity.timestamp
            )
          )
        )
      )
    );
  }

  function renderPage() {
    switch (page) {
      case 'home':
        return React.createElement(
          'div',
          null,
          renderHeroBanner(),
          renderActivityFeed(),
          React.createElement(NFTPreviewGrid),
          walletConnected &&
            React.createElement(
              'p',
              { className: 'mt-4 text-sm text-[#004085]' },
              `Connected wallet: ${walletAddress}`
            )
        );
      case 'marketplace':
        return React.createElement(
          'div',
          { className: 'text-[#004085]' },
          'Marketplace page content'
        );
      case 'nftsowned':
        return React.createElement(
          'div',
          { className: 'text-[#004085]' },
          'NFTs you own will appear here'
        );
      case 'profile':
        return React.createElement(
          'div',
          { className: 'text-[#004085]' },
          'User profile info'
        );
      default:
        return React.createElement(
          'div',
          { className: 'text-[#842029]' },
          'Page not found'
        );
    }
  }

  return React.createElement(
    'div',
    {
      className: 'min-h-screen',
      style: { backgroundColor: '#e9f0fb' },
    },
    React.createElement(Navbar, {
      onNavigate: setPage,
      onConnectWallet: connectWallet,
      onLogout,
    }),
    React.createElement(
      'main',
      { className: 'p-6 max-w-4xl mx-auto' },
      renderPage()
    )
  );
}

export default Dashboard;
