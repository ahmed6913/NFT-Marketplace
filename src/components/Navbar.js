import React from 'react';

function Navbar(props) {
  const items = ['Home', 'Connect Wallet', 'Marketplace', 'NFTs Owned', 'Profile', 'Logout'];

  return React.createElement(
    'nav',
    {
      className:
        'bg-white shadow-md p-4 flex justify-between items-center text-[#004085]',
      style: {
        borderBottom: '2px solid #007bff',
      },
    },
    React.createElement(
      'div',
      {
        className: 'font-bold text-xl cursor-pointer',
        style: { color: '#007bff' },
      },
      'NFT Marketplace'
    ),
    React.createElement(
      'ul',
      { className: 'flex space-x-6 text-sm font-semibold' },
      items.map((item) =>
        React.createElement(
          'li',
          {
            key: item,
            className: 'cursor-pointer hover:text-[#007bff]',
            onClick: () => {
              if (item === 'Connect Wallet') {
                props.onConnectWallet();
              } else if (item === 'Logout') {
                props.onLogout();
              } else {
                props.onNavigate(item.toLowerCase().replace(' ', ''));
              }
            },
          },
          item
        )
      )
    )
  );
}

export default Navbar;
