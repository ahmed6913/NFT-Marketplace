import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Dashboard({ user, onLogout }) {
  const [page, setPage] = useState('home');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask not detected. Please install it to connect your wallet.');
      return;
    }

    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        if (accounts.length === 0) {
          alert('No accounts found.');
        } else {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);
          alert('Wallet connected: ' + accounts[0]);
        }
      })
      .catch(err => {
        alert('Failed to connect wallet: ' + err.message);
      });
  }

  function renderPage() {
    switch (page) {
      case 'home':
        return React.createElement(
          'div',
          { className: 'text-[#004085] text-lg font-semibold' },
          `Welcome ${user?.email || 'Guest'} to the NFT Marketplace`,
          walletConnected &&
            React.createElement(
              'p',
              { className: 'mt-2 text-sm text-[#004085]' },
              `Connected wallet: ${walletAddress}`
            )
        );
      case 'marketplace':
        return React.createElement('div', { className: 'text-[#004085]' }, 'Marketplace page content');
      case 'nftsowned':
        return React.createElement('div', { className: 'text-[#004085]' }, 'NFTs you own will appear here');
      case 'profile':
        return React.createElement('div', { className: 'text-[#004085]' }, 'User profile info');
      default:
        return React.createElement('div', { className: 'text-[#842029]' }, 'Page not found');
    }
  }

  return React.createElement(
    'div',
    {
      className: 'min-h-screen',
      style: { backgroundColor: '#e9f0fb' }, // Match login background
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
