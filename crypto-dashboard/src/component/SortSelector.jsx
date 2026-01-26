const SortSelector = ({ sortBy, OnSortChange }) => {
  return (
    <div className="controls">
      <label htmlFor="sort">Sort By:</label>
      <select
        value={sortBy}
        id="sort"
        onChange={(e) => OnSortChange(e.target.value)}
      >
        <option value="maket_cap_desc">Market Cap (High to Low)</option>
        <option value="maket_cap_asc">Market Cap (Low to High)</option>
        <option value="price_desc">Price (High to Low)</option>
        <option value="price_asc">Price (Low to High)</option>
        <option value="change_desc">24h Change (High to Low)</option>
        <option value="change_asc">24h Change (Low to High)</option>
      </select>
    </div>
  );
};

export default SortSelector;
