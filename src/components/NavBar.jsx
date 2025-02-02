import React, { useContext } from "react";
import logo from "../assets/download.png";
import { FaExternalLinkAlt } from "react-icons/fa";
import { CoinContext } from "../context/CoinContext";
import { BsCurrencyEuro } from "react-icons/bs";
import { PiCurrencyInr } from "react-icons/pi";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { setCurrency } = useContext(CoinContext);
  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({
          name: "usd",
          symbol: "$",
        });
        break;
      }
      case "inr": {
        setCurrency({
          name: "inr",
          symbol: <PiCurrencyInr />,
        });
        break;
      }
      case "euro": {
        setCurrency({
          name: "euro",
          symbol: <BsCurrencyEuro />,
        });
        break;
      }
      default: {
        setCurrency({
          name: "usd",
          symbol: "$",
        });
        break;
      }
    }
  };
  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <img src={logo} />
      </Link>

      <div>
        <ul className="headers">
          <li><Link to='/'>Home</Link></li>
          <li>Features</li>
          <li>Pricing</li>
          <li><a href="#footer">Contact us</a></li>
        </ul>
      </div>

      <div className="right-navbar">
        <div>
          <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="euro">EURO</option>
          </select>
        </div>

        <div className="navbar-btn">
          <a href="http://cryptonews.com" target="_blank">
            <button>
              Latest News
              <FaExternalLinkAlt />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
