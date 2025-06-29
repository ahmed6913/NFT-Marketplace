import React from 'react';
import { useAccount } from 'wagmi';
import NFTPreviewGrid from '../components/NFTPreviewGrid';
import ConfettiButton from "../components/ConfettiButton";

function Home() {
  const { address, isConnected } = useAccount();

  const renderHeroBanner = () => (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-10 rounded-lg shadow-lg mb-8">
      <h1 className="text-3xl font-bold mb-2">
        Get rewarded with NFTs every time you shop.
      </h1>
      <p className="text-xl">
        Welcome to Lazarus Mint 👋
      </p>
    </section>
  );

  const renderActivityFeed = () => {
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
        <ConfettiButton />
      </section>
    );
  };

  const renderAboutSection = () => (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8 mt-16 text-black-500">
      <h2 className="text-2xl font-bold mb-4">🔥 Developer Team</h2>
      <div className="text-center">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500 overflow-hidden">
          <img
             src="/founder.jpg"
            alt="Shaikh Saim"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">Shaikh Saim</h3>
        <p className="text-sm text-purple-600 mb-2">Full Stack Web3 Developer & DevOps Enthusiast</p>
        <p className="text-sm mb-5">
          “Web3 isn't just about technology — it's about empowering users to own their digital future and participate in the decentralized economy.”
        </p>
        <p className="text-xs text-black-500">
          Currently building a blockchain-based NFT rewards marketplace for retail that bridges traditional commerce with Web3 technology.
        </p>
      </div>
      <br />
      <p className="text-center text-sm text-gray-500">© 2025 Shaikh Saim. All rights reserved.</p>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 max-w-4xl mx-auto">
        {renderHeroBanner()}
        {renderActivityFeed()}
        <NFTPreviewGrid />
        {isConnected && (
          <p className="mt-4 text-sm text-indigo-700">
            Connected wallet: {address}
          </p>
        )}
        {renderAboutSection()}
      </main>
    </div>
  );
}

export default Home;

