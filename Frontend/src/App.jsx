import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./views/navbar";
import BuyProduct from "./views/BuyProduct";
import Footer from "./views/Footer";
import "./styles/home.css";
import ColorPicker from "./views/ColorPicker";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<BuyProduct />}/>
      </Routes>
      <Footer/>
      <ColorPicker/>
      
    </>
  );
}

export default App;
