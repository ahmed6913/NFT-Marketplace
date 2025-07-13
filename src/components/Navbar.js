// src/components/Navbar.js
import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { label: 'Home', route: '/home' },
    { label: 'Market Place', route: '/marketplace' },
    { label: 'NFTs Owned', route: '/ownednfts' },
    { label: 'Profile', route: '/profile' },
    { label: 'Map', route: '/map' }, // ✅ NEW PAGE
  ];

  const handleNavClick = (route) => {
    navigate(route);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-indigo-500 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          className="text-2xl font-bold text-indigo-600 tracking-tight cursor-pointer"
          onClick={() => handleNavClick('/home')}
        >
          Lazarus Mint - NFT Marketplace
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-indigo-800 font-medium text-sm">
          {items.map(({ label, route }) => (
            <li
              key={label}
              onClick={() => handleNavClick(route)}
              className="cursor-pointer hover:text-indigo-600 transition-colors px-2 py-1 rounded-md hover:bg-indigo-100"
            >
              {label}
            </li>
          ))}
          {location.pathname !== '/' && (
            <li
              onClick={() => handleNavClick('/')}
              className="cursor-pointer hover:text-indigo-600 transition-colors px-2 py-1 rounded-md hover:bg-indigo-100"
            >
              Back
            </li>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-indigo-600">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Wallet Connect */}
        <div className="ml-4 hidden md:block">
          <ConnectButton showBalance={false} accountStatus="address" />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 space-y-2 bg-white border-t border-indigo-200 shadow">
          {items.map(({ label, route }) => (
            <div
              key={label}
              onClick={() => handleNavClick(route)}
              className="block text-indigo-800 font-medium text-sm py-2 px-4 rounded hover:bg-indigo-100 cursor-pointer"
            >
              {label}
            </div>
          ))}
          {location.pathname !== '/' && (
            <div
              onClick={() => handleNavClick('/')}
              className="block text-indigo-800 font-medium text-sm py-2 px-4 rounded hover:bg-indigo-100 cursor-pointer"
            >
              Back
            </div>
          )}
          {/* Wallet Connect inside mobile menu */}
          <div className="pt-2">
            <ConnectButton showBalance={false} accountStatus="address" />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
