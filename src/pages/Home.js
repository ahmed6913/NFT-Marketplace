import React, { useState, useEffect } from 'react';
import NFTPreviewGrid from '../components/NFTPreviewGrid';

function Home({ user }) {
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
    window.open('https://metamask.io/download/', '_blank');
    return alert('MetaMask is not installed. Redirecting to MetaMask website...');
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
    return (
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-10 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Get rewarded with NFTs every time you shop.
        </h1>
        {username && <p className="text-xl">Welcome back, {username} 👋</p>}
      </section>
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

    return (
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="border-b pb-2">
              <p>{activity.message}</p>
              <span className="text-sm bg-white">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  function renderPage() {
    switch (page) {
      case 'home':
        return (
          <div>
            {renderHeroBanner()}
            {renderActivityFeed()}
            <NFTPreviewGrid />
            {walletConnected && (
              <p className="mt-4 text-sm text-[#004085]">
                Connected wallet: {walletAddress}
              </p>
            )}
          </div>
        );
      case 'marketplace':
        return <div className="text-[#004085]">Marketplace page content</div>;
      case 'nftsowned':
        return <div className="text-[#004085]">NFTs you own will appear here</div>;
      case 'profile':
        return <div className="text-[#004085]">User profile info</div>;
      default:
        return <div className="text-[#842029]">Page not found</div>;
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'bg-white p-6 rounded-lg shadow-md' }}>
      <main className="p-6 max-w-4xl mx-auto">{renderPage()}</main>
    </div>
  );
}

export default Home;
