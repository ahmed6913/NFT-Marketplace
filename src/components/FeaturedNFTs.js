// src/components/FeaturedNFTs.js
import React from 'react';

const nfts = [
  {
    image: "https://i.ibb.co/mV06Fzdb/7748169.jpg",
    name: "Cyber Samurai Ape",
    creator: "ArtistOne",
  },
  {
    image: "https://i.ibb.co/Q75tLB8h/5348934.jpg",
    name: "Pixel Ghost",
    creator: "ArtistTwo",
  },
  {
    image: "https://i.ibb.co/q3WtTLyK/7748166.jpg",
    name: "Neo Ape",
    creator: "ArtistThree",
  },
];

const FeaturedNFTs = () => {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">🎨 Featured NFTs</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {nfts.map((nft, idx) => (
          <div key={idx} className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-xl transition">
            <img src={nft.image} alt={nft.name} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{nft.name}</h3>
              <p className="text-sm text-gray-500">by {nft.creator}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedNFTs;

