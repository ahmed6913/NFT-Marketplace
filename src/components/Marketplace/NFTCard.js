import React from 'react';

const NFTCard = ({ nft }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full sm:w-72 hover:scale-105 transition">
      <img src={nft.image} alt={nft.name} className="rounded-xl w-full h-52 object-cover" />
      <h2 className="mt-3 text-lg font-semibold">{nft.name}</h2>
      <p className="text-sm text-gray-500">{nft.store}</p>
      <p className="mt-1 font-medium text-indigo-600">{nft.price}</p>
      <div className="mt-2 text-xs text-gray-400">
        {nft.tags.map(tag => (
          <span key={tag} className="mr-2">#{tag}</span>
        ))}
      </div>
      <a
        href={nft.etherscan}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-blue-500 text-sm hover:underline"
      >
        View on Blockchain
      </a>
    </div>
  );
};

export default NFTCard;
