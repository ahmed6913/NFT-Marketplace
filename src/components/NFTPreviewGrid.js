import React from 'react';

const mockNFTs = [
  {
    id: 1,
    name: 'Cyber Ape #112',
    creator: 'Footlockerker Store',
    image: '',
    price: '0.15 ETH',
  },
  {
    id: 2,
    name: 'HypeBeast Runner',
    creator: 'SneakerVault',
    image: '',
    price: '0.2 ETH',
  },
  {
    id: 3,
    name: 'Urban Samurai',
    creator: 'Nike NFT Lab',
    image: '',
    price: '0.3 ETH',
  },
];


const NFTPreviewGrid = () => {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4 ">🔥 Trending NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockNFTs.map((nft) => (
          <div
            key={nft.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition"
          >
            <img src={nft.image} alt={nft.name} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{nft.name}</h3>
              <p className="text-sm text-gray-500">By {nft.creator}</p>
              <p className="text-indigo-600 font-semibold mt-2">{nft.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NFTPreviewGrid;
