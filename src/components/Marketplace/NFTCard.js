import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal'; // ✅ Import the modal

const NFTCard = ({ nft }) => {
  const [showModal, setShowModal] = useState(false);

  const handleBuyClick = () => {
    setShowModal(true);
  };

  const handleConfirmPurchase = () => {
    setShowModal(false);
    // Simulate transaction logic (for now just an alert)
    alert(`✅ You purchased "${nft.name}" for ${nft.price} ETH`);
  };

  const handleCancelPurchase = () => {
    setShowModal(false);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-md p-4 w-full sm:w-72 hover:scale-105 transition">
      <img
        src={nft.image}
        alt={nft.name}
        className="rounded-xl w-full h-52 object-cover"
      />
      <h2 className="mt-3 text-lg font-semibold">{nft.name}</h2>
      <p className="text-sm text-gray-500">{nft.store}</p>
      <p className="mt-1 font-medium text-indigo-600">{nft.price} ETH</p>
      <div className="mt-2 text-xs text-gray-400">
        {nft.tags.map((tag) => (
          <span key={tag} className="mr-2">#{tag}</span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-3">
        <a
          href={nft.etherscan}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 text-sm hover:underline"
        >
          View on Blockchain
        </a>
        <button
          onClick={handleBuyClick}
          className="bg-indigo-600 text-white px-3 py-1 text-xs rounded-lg hover:bg-indigo-700 transition"
        >
          Buy Now
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmModal
          nft={nft}
          onConfirm={handleConfirmPurchase}
          onCancel={handleCancelPurchase}
        />
      )}
    </div>
  );
};

export default NFTCard;
