import React from 'react';

function Navbar({ onConnectWallet, onLogout, onNavigate }) {
  const items = [
    { label: 'Home', route: '/home' },
    { label: 'Connect Wallet', action: onConnectWallet },
    { label: 'Marketplace', route: '/marketplace' },
    { label: 'NFTs Owned', route: '/ownednfts' },
    { label: 'Profile', route: '/profile' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-indigo-500 text-indigo-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-indigo-600">
          NFT Marketplace
        </div>
        <ul className="flex space-x-6 text-sm font-semibold justify-center flex-1">
          {items.map(({ label, route, action }) => (
            <li
              key={label}
              className="cursor-pointer hover:text-indigo-600 transition"
              onClick={() => {
                if (action) {
                  action();
                } else if (route) {
                  onNavigate?.(route);
                }
              }}
            >
              {label}
            </li>
          ))}
        </ul>
        <button
          onClick={onLogout}
          className="ml-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md font-semibold text-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

