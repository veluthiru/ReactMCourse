import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router";
import AboutPage from "./pages/AboutPage";
import Header from "./component/Header";
import NotFoundPage from "./pages/NotFoundPage";
import CoinDeailsPage from "./pages/CoinDetailsPage";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("maket_cap_desc");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        let resp = await fetch(
          `${API_URL}&order=maket_cap_desc&per_page=${limit}`,
        );
        if (!resp) {
          throw new error("Fetch api not found any data");
        }
        let data = await resp.json();
        console.log(data);
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDeailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
