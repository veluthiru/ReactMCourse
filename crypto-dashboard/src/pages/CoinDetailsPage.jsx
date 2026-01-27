import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Spinner from "../component/Spinner";
import CoinChart from "../component/CoinChart";
const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDeailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        let resp = await fetch(`${API_URL}/${id}`);
        if (!resp) {
          throw new error("Fetch api not found any data");
        }
        let data = await resp.json();
        console.log(data);
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return (
    <>
      <div className="coin-details-container">
        <Link to="/">Back to home</Link>
        <h1 className="coin-details-title">
          {coin ? `${coin.name} (${coin.symbol})` : "coin details"}
        </h1>
        {loading && <Spinner />}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <>
            <img
              src={coin.image.large}
              alt={coin.name}
              className="coin-details-image"
            />

            <p>{coin.description.en.split(". ")[0] + "."}</p>
            <div className="coin-details-info">
              <h3>Rank: #{coin.market_cap_rank}</h3>
              <h3>
                Current Price: $
                {coin.market_data.current_price.usd.toLocaleString()}
              </h3>
              <h4>
                Market Cap: {coin.market_data.market_cap.usd.toLocaleString()}
              </h4>
              <h4>24h High:{coin.market_data.high_24h.usd.toLocaleString()}</h4>
              <h4>24h Low: {coin.market_data.low_24h.usd.toLocaleString()}</h4>
              <h4>
                24h Price change: {coin.market_data.price_change_24h.toFixed(2)}
                {""} ({coin.market_data.price_change_percentage_24h.toFixed(2)}{" "}
                %)
              </h4>
            </div>
            <div>
              <CoinChart coinId={coin.id} />
            </div>
          </>
        )}

        {!loading && !error && !coin && <p>No data found</p>}
      </div>
    </>
  );
};

export default CoinDeailsPage;
