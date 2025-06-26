// src/components/Navbar.js
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const items = [
    { label: 'Home', route: '/home' },
    { label: 'Marketplace', route: '/marketplace' },
    { label: 'NFTs Owned', route: '/ownednfts' },
    { label: 'Profile', route: '/profile' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-indigo-500 text-indigo-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate('/home')}
        >
          NFT Marketplace
        </div>

        {/* Nav Links */}
        <ul className="flex space-x-6 text-sm font-semibold justify-center">
          {items.map(({ label, route }) => (
            <li
              key={label}
              className="cursor-pointer hover:text-indigo-600 transition"
              onClick={() => navigate(route)}
            >
              {label}
            </li>
          ))}
        </ul>

        {/* Connect Wallet */}
        <div className="ml-4">
          <ConnectButton showBalance={false} accountStatus="address" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
