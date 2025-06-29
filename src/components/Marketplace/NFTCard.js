import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';

const NFTCard = ({ nft }) => {
  const [showModal, setShowModal] = useState(false);

  const handleBuyClick = () => {
    setShowModal(true);
  };

  const handleConfirmPurchase = () => {
    setShowModal(false);
    alert(`✅ You purchased "${nft.name}" for ${nft.price} ETH`);
  };

  const handleCancelPurchase = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-4 w-full sm:w-72 hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-200">
      <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl overflow-hidden aspect-square">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-bold text-slate-800">{nft.name}</h2>
        <p className="text-sm text-slate-600">{nft.store}</p>
        <div className="text-right">
          <p className="text-xs text-slate-500">Price</p>
          <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {nft.price} ETH
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs mt-2">
          {nft.tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full font-medium ${
                tag === 'rare'
                  ? 'bg-indigo-100 text-indigo-700'
                  : tag === 'trending'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          <a
            href={nft.etherscan}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition hover:underline"
          >
            View on Blockchain
          </a>
          <button
            onClick={handleBuyClick}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
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

