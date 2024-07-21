import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const apikey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchAllCoin = async () => {
      const options = {
        method: "GET",
        url: "https://api.coingecko.com/api/v3/coins/markets",
        params: { vs_currency: currency.name },
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": apikey,
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          setAllCoin(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    apikey,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
