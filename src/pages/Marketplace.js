import React, { useState } from 'react';
import dummyNFTs from '../utils/nft';
import NFTCard from '../components/Marketplace/NFTCard';
import SearchBar from '../components/Marketplace/SearchBar';
import Filters from '../components/Marketplace/Filters';

const Marketplace = () => {
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  const filteredNFTs = dummyNFTs
    .filter(nft =>
      nft.name.toLowerCase().includes(query.toLowerCase()) ||
      nft.store.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'lowest') {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      return 0; // you can add more logic later
    });

    console.log('Loaded NFTs:', dummyNFTs);
console.log('Filtered NFTs:', filteredNFTs);


  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6">Browse & Discover NFTs</h1>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <SearchBar query={query} setQuery={setQuery} />
        <Filters sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredNFTs.map(nft => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
