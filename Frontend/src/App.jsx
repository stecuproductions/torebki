import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./views/navbar";
import BuyProduct from "./views/BuyProduct";
import Footer from "./views/Footer";
import Cart from "./views/Cart";
import "./styles/home.css";
import Finalization from "./views/Finalization";
import EmptyCart from "./views/EmptyCart";
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
        <Route path="/empty" element={<EmptyCart/>}/>
      </Routes>
      <Footer/>
      
    </>
  );
}

export default App;
