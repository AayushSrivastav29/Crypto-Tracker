import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  useEffect(() => {
    const fetchAllCoin = async () => {
      const options = {
        method: "GET",
        url: "https://api.coingecko.com/api/v3/coins/markets",
        params: { vs_currency: currency.name },
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-1tkEa8QjUECfN8SY5oiNJCyS	",
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
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
