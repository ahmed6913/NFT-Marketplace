import React, { useState } from 'react';
import dummyNFTs from '../utils/nft';
import NFTCard from '../components/Marketplace/NFTCard';
import SearchBar from '../components/Marketplace/SearchBar';
import Filters from '../components/Marketplace/Filters';

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [form, setForm] = useState({
    nftName: '',
    price: '',
    message: '',
  });

  const filteredNFTs = dummyNFTs
    .filter(nft =>
      nft.name.toLowerCase().includes(query.toLowerCase()) ||
      nft.store.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'lowest') {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      return 0;
    });

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSellSubmit = e => {
    e.preventDefault();
    alert(`Listed NFT: ${form.nftName} for ${form.price} ETH`);
    setForm({ nftName: '', price: '', message: '' });
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-indigo-600">NFT Marketplace</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {['browse', 'trade', 'sell'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab === 'browse' ? 'Buy NFT' : tab === 'trade' ? 'Trade NFT' : 'Sell NFT'}
          </button>
        ))}
      </div>

      {/* Buy NFTs */}
      {activeTab === 'browse' && (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <SearchBar query={query} setQuery={setQuery} />
            <Filters sortOption={sortOption} setSortOption={setSortOption} />
          </div>
          {filteredNFTs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredNFTs.map(nft => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-12">
              No NFTs match your search.
            </div>
          )}
        </>
      )}

      {/* Trade NFTs */}
      {activeTab === 'trade' && (
        <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-700">
          <h2 className="text-xl font-semibold mb-4">Peer-to-Peer NFT Trading (Coming Soon)</h2>
          <p>Select NFTs to trade directly with other users in the future.</p>
        </div>
      )}

   {/* Sell NFTs */}
{activeTab === 'sell' && (
  <>
    {/* Top: Search bar (like in Buy tab) */}
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
      <SearchBar query={query} setQuery={setQuery} />
    </div>

    {/* Centered Sell Form */}
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-indigo-100/50 p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            List Your NFT
          </h2>
          <p>Set your price and list your NFT for sale</p>
        </div>

        <form onSubmit={handleSellSubmit} className="space-y-6">
          {/* NFT Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">NFT Name</label>
            <input
              type="text"
              name="nftName"
              value={form.nftName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition bg-slate-50/50 hover:bg-white focus:bg-white outline-none"
              placeholder="Enter your NFT name"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Price in ETH</label>
            <div className="relative">
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleInputChange}
                required
                step="0.001"
                min="0"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition bg-slate-50/50 hover:bg-white focus:bg-white outline-none"
                placeholder="0.00"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium text-sm">
                ETH
              </span>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Optional Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition bg-slate-50/50 hover:bg-white focus:bg-white outline-none resize-none"
              placeholder="Add a message for buyers (optional)"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl transform hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            List for Sale
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            By listing, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  </>
)}



    </div>
  );
};

export default Marketplace;
