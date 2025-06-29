import React from 'react';
import { useAccount } from 'wagmi';
import NFTPreviewGrid from '../components/NFTPreviewGrid';
import ConfettiButton from "../components/ConfettiButton";

function Home() {
  const { address, isConnected } = useAccount();

  const renderHeroBanner = () => (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-full py-24 text-center mb-12">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Get rewarded with NFTs every time you shop.
      </h1>
      <p className="text-lg md:text-xl">
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
        message: "🎁 You've unlocked a reward from Nike",
        timestamp: 'Yesterday',
      },
    ];

    return (
      <section className="bg-white py-10 px-6 max-w-6xl mx-auto mb-12">
        <h2 className="text-xl font-semibold mb-4"> 🔥 Recent Activity</h2>
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="border-b pb-2">
              <p>{activity.message}</p>
              <span className="text-sm text-gray-500">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center">
          <ConfettiButton />
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="pb-10">
        {renderHeroBanner()}
        {renderActivityFeed()}
        <section className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold text-center mb-10 text-indigo-600">🔥 Trending NFTs</h2>
          <NFTPreviewGrid />
        </section>
        {isConnected && (
          <p className="mt-4 text-sm text-indigo-700 text-center">
            Connected wallet: {address}
          </p>
        )}
      </main>
    </div>
  );
}

export default Home;

