import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

const API_COIN_CHART_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const resp = await fetch(
          `${API_COIN_CHART_URL}/${coinId}/market_chart?vs_currency=usd&days=7`,
        );
        const data = await resp.json();
        const prices = data.prices.map((price) => ({
          x: price[0],
          y: price[1],
        }));
        setChartData({
          datasets: [
            {
              label: "Price (Last 7 Days) in USD",
              data: prices,
              fill: true,
              borderColor: "#007bff",
              backgroundColor: "rgba(0,123,255,0.1)",
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
  }, [coinId]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>Error loading chart: {error}</p>;
  if (!chartData) return null;

  return (
    <>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
              },
            },
            y: { ticks: { callback: (value) => `$${value.toLocaleString()}` } },
          },
        }}
      ></Line>
    </>
  );
};

export default CoinChart;
