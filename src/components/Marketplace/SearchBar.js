import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search NFTs by name or store..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full sm:w-96 p-2 px-4 border rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
    />
  );
};

export default SearchBar;
