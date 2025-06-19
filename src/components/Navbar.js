import React from 'react';

function Navbar(props) {
  const items = ['Home', 'Connect Wallet', 'Marketplace', 'NFTs Owned', 'Profile', 'Logout'];

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center border-b-2 border-indigo-500 text-indigo-800">
      <div className="text-xl font-bold cursor-pointer text-indigo-600">
        NFT Marketplace
      </div>
      <ul className="flex space-x-6 text-sm font-semibold">
        {items.map((item) => (
          <li
            key={item}
            className="cursor-pointer hover:text-indigo-600 transition"
            onClick={() => {
              if (item === 'Connect Wallet') {
                props.onConnectWallet();
              } else if (item === 'Logout') {
                props.onLogout();
              } else {
                props.onNavigate(item.toLowerCase().replace(' ', ''));
              }
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
