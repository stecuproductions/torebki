import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./views/navbar";
import BuyProduct from "./views/BuyProduct";
import Footer from "./views/Footer";
import Cart from "./views/Cart";
import "./styles/home.css";
import ColorPicker from "./views/ColorPicker";
import Finalization from "./views/Finalization";
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<BuyProduct />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="*" element={<Home />} />
        <Route path="/finalize" element={<Finalization/>}/>
      </Routes>
      <Footer/>
      <ColorPicker/>
      
    </>
  );
}

export default App;
