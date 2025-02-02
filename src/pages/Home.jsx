import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [input, setInput] = useState("");
  const [parameter, setParameter] = useState(10);

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await displayCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(coins);
  };

  useEffect(() => {
    const sortedCoins = [...allCoin].sort(
      (a, b) => a.market_cap_rank - b.market_cap_rank
    );
    setDisplayCoin(sortedCoins);
  }, [allCoin]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setParameter(parameter + 10);
  };

  const handlePrevious = () => {
    if (parameter > 10) {
      setParameter(parameter - 10);
    }
  };

  function formatMarketCap(value) {
    if (window.innerWidth <= 600) {
      return (value / 1e9).toFixed(2) + "B";
    } else {
      return value.toLocaleString();
    }
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            list="coinlist"
            type="text"
            placeholder="Search Crypto..."
            value={input}
            onChange={inputHandler}
            required
          ></input>

          <datalist id="coinlist">
            {displayCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24Hr Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(parameter - 10, parameter).map((item, index) => {
          return (
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} />
                <p>
                  {windowWidth <= 600
                    ? item.symbol
                    : item.name + "-" + item.symbol}
                </p>
              </div>
              <p>
                {currency.symbol} {item.current_price.toLocaleString()}
              </p>

              <p
                className={
                  item.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="market-cap">
                {currency.symbol} {formatMarketCap(item.market_cap)}
              </p>
            </Link>
          );
        })}
        
      </div>
      <div className="pagination-buttons">
          {parameter > 10 && (
            <button onClick={handlePrevious}>Previous</button>
          )}
          {parameter < displayCoin.length && (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
    </div>
  );
};

export default Home;
