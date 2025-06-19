import React from 'react';

const Filters = ({ sortOption, setSortOption }) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="p-2 border rounded-xl ml-4 shadow-sm"
    >
      <option value="newest">Newest</option>
      <option value="lowest">Lowest Price</option>
      <option value="mostTraded">Most Traded</option>
    </select>
  );
};

export default Filters;
