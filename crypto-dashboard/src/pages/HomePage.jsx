import CoinCard from "../component/CoinCard";
import InputFilter from "../component/InputFilter";
import LimitSelector from "../component/LimitSelector";
import SortSelector from "../component/SortSelector";
import Spinner from "../component/Spinner";

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}) => {
  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "maket_cap_desc":
          return b.maket_cap - a.maket_cap;
        case "maket_cap_asc":
          return a.maket_cap - b.maket_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    });
  return (
    <>
      {loading && <Spinner color="white" />}
      {error && <div className="error">{error}</div>}
      <div className="top-controls">
        <InputFilter filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} OnChangeLimit={setLimit} />
        <SortSelector sortBy={sortBy} OnSortChange={setSortBy} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p>No Coins Match...</p>
          )}
        </main>
      )}

      <div>Crypto dashboard</div>
    </>
  );
};

export default HomePage;
