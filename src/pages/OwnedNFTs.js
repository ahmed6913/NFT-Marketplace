import React from "react";

export default function OwnedNFTs() {
  const nfts = [
    {
      id: "1",
      name: "Cosmic Warrior #1234",
      creator: "ArtistDAO",
      price: "2.5",
      image: "/placeholder.svg",
      blockchainUrl: "#",
    },
    {
      id: "2",
      name: "Digital Dreams",
      creator: "CryptoCreator",
      price: "1.8",
      image: "/placeholder.svg",
      blockchainUrl: "#",
    },
    {
      id: "3",
      name: "Neon Genesis",
      creator: "FutureArt",
      price: "3.2",
      image: "/placeholder.svg",
      blockchainUrl: "#",
    },
    {
      id: "4",
      name: "Abstract Reality",
      creator: "ModernMint",
      price: "0.9",
      image: "/placeholder.svg",
      blockchainUrl: "#",
    },
    {
      id: "5",
      name: "Pixel Paradise",
      creator: "RetroStudio",
      price: "4.1",
      image: "/placeholder.svg",
      blockchainUrl: "#",
    },
    {
      id: "6",
      name: "Ethereal Essence",
      creator: "SpiritualNFT",
      price: "2.7",
      image: "/placeholder.svg",
      blockchainUrl: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your NFTs</h1>

        {nfts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 truncate">{nft.name}</h3>
                  <p className="text-white/80 mb-3">by {nft.creator}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-semibold">{nft.price} ETH</span>
                  </div>
                  <a
                    href={nft.blockchainUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-md text-center transition-colors duration-200 backdrop-blur-sm"
                  >
                    View on Blockchain
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No NFTs Found</h3>
            <p className="text-gray-500">Start collecting NFTs to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
