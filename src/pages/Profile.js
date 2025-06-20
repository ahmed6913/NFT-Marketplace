import React from 'react';

export default function Profile() {
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
   // avatar: "/placeholder.svg",
    joinDate: "March 2023",
  };

  const purchasedNFTs = [
    {
      id: "1",
      image: "/placeholder.svg",
      name: "Cosmic Warrior #1234",
      storeName: "ArtistDAO",
      purchaseDate: "2024-01-15",
      price: "2.5",
    },
    {
      id: "2",
      image: "/placeholder.svg",
      name: "Digital Dreams",
      storeName: "CryptoCreator",
      purchaseDate: "2024-01-10",
      price: "1.8",
    },
    {
      id: "3",
      image: "/placeholder.svg",
      name: "Neon Genesis",
      storeName: "FutureArt",
      purchaseDate: "2024-01-05",
      price: "3.2",
    },
  ];

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 md:px-8 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-white text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-white/90 text-lg mb-1">{user.email}</p>
              <p className="text-white/80 text-sm">Member since {user.joinDate}</p>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="px-6 py-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{purchasedNFTs.length}</div>
              <div className="text-gray-600">NFTs Owned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {purchasedNFTs.reduce((sum, nft) => sum + parseFloat(nft.price), 0).toFixed(1)} ETH
              </div>
              <div className="text-gray-600">Total Spent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-gray-600">Collections</div>
            </div>
          </div>
        </div>

        {/* Purchase History */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 md:px-8 md:py-6 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Purchase History</h2>
          </div>

          {/* Table for desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NFT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Store</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {purchasedNFTs.map((nft) => (
                  <tr key={nft.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4">
                      <img src={nft.image} alt={nft.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="text-sm font-medium text-gray-900">{nft.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{nft.storeName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(nft.purchaseDate)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{nft.price} ETH</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card view */}
          <div className="md:hidden divide-y divide-gray-200">
            {purchasedNFTs.map((nft) => (
              <div key={nft.id} className="p-4 hover:bg-gray-50 flex items-center space-x-4">
                <img src={nft.image} alt={nft.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{nft.name}</p>
                  <p className="text-sm text-gray-500">{nft.storeName}</p>
                  <p className="text-xs text-gray-400">{formatDate(nft.purchaseDate)}</p>
                </div>
                <div className="text-sm font-medium text-gray-900">{nft.price} ETH</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
