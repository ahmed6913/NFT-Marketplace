// src/components/Navbar.js
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const items = [
    { label: 'Home', route: '/home' },
    { label: 'Market Place', route: '/marketplace' },
    { label: 'NFTs Owned', route: '/ownednfts' },
    { label: 'Profile', route: '/profile' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-indigo-500 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-indigo-600 tracking-tight cursor-pointer"
          onClick={() => navigate('/home')}
        >
          Lazarus Mint - NFT Marketplace
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-indigo-800 font-medium text-sm">
          {items.map(({ label, route }) => (
            <li
              key={label}
              onClick={() => navigate(route)}
              className="cursor-pointer hover:text-indigo-600 transition-colors px-2 py-1 rounded-md hover:bg-indigo-100"
            >
              {label}
            </li>
          ))}
        </ul>

        
        {/* Connect Wallet Button */}
        <div className="ml-4">
          <ConnectButton showBalance={false} accountStatus="address" />
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
