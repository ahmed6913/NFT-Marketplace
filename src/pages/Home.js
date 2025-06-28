import React, { useState, useEffect } from 'react';
import NFTPreviewGrid from '../components/NFTPreviewGrid';
import ConfettiButton from "../components/ConfettiButton";



function Home({ user }) {
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
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4"> 🔥 Recent Activity</h2>
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="border-b pb-2">
              <p>{activity.message}</p>
              <span className="text-sm text-gray-500">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
        {/* 🎉 Confetti Button */}
        <ConfettiButton />

      </section>
    );
  }

  function renderAboutSection() {
    return (

      <section className="bg-white p-6 rounded-lg shadow-md mb-8 mt-16 text-black-500">

        <h2 className="text-2xl font-bold mb-4 ">🔥 Developer Team</h2>
        <div className="text-center">

          <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500 overflow-hidden">

            <img
              src="/founder.jpg"
              alt="Shaikh Saim"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold">Shaikh Saim</h3>
          <p className="text-sm text-purple-600 mb-2">Full Stack Web3 Developer & Cybersecurity Enthusiast</p>
          <p className="text-sm mb-5 ">
            “Web3 isn't just about technology — it's about empowering User to own their digital future and
            participate in the decentralized economy.”
          </p>
          <p className="text-xs text-black-500">
            Currently building a blockchain-based NFT rewards marketplace for retail that bridges traditional commerce
            with Web3 technology. Passionate about decentralization, open source development, and User empowerment
            through accessible blockchain solutions.
          </p>
        </div>
        <br />
        <p className="text-center text-sm text-gray-500">© 2025 Shaikh Saim. All rights reserved.</p>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 max-w-4xl mx-auto">
        {renderHeroBanner()}
        {renderActivityFeed()}
        <NFTPreviewGrid />
        {walletConnected && (
          <p className="mt-4 text-sm text-indigo-700">
            Connected wallet: {walletAddress}
          </p>
        )}
        {renderAboutSection()}
      </main>
    </div>
  );
}



export default Home;
