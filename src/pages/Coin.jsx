import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import LineChart from "../components/LineChart";

const Coin = () => {
  const { coinId } = useParams();

  const { currency,apikey } = useContext(CoinContext);
  const [coindata, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();

  const fetchCoinData = () => {
    const options = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apikey,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setCoinData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchHistoricalData = () => {
    const options = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      params: { vs_currency: currency.name, days: "10", interval: 'daily' },
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apikey,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setHistoricalData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  console.log(coindata), console.log(historicalData);

  return coindata && historicalData ? (
    <div className="coin">
      <div className="coin-name">
        <img src={coindata.image.large} />
        <p>
          <b>
            {coindata.name} ({coindata.symbol.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
      <div className="coin-info">
        <ul>
            <li>Crypto Market Rank</li>
            <li>{coindata.market_cap_rank}</li>
        </ul>
        <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coindata.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
            <li>24hr High</li>
            <li>{currency.symbol} {coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
            <li>24hr Low</li>
            <li>{currency.symbol} {coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="spinner">
      <div className="spin"></div>
    </div>
  );
};

export default Coin;
