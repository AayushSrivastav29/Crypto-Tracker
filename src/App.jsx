import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import {Routes, Route} from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/coin/:coinId" element={<Coin />}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
