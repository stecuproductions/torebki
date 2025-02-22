import React, {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./views/navbar";
import BuyProduct from "./views/BuyProduct";
import Footer from "./views/Footer";
import "./styles/home.css";
import Cart from "./views/Cart";
import Finalization from "./views/Finalization";
import EmptyCart from "./views/EmptyCart";
import  {CartProvider}  from "./CartContext";
import { HelmetProvider } from "react-helmet-async";
import Admin from "./views/Admin";

//export const API_URL = import.meta.env.VITE_APP_API_URL;
export const API_URL = "http://192.168.18.230:5000";
function App() {
     const [produktyState, setProdukty] = useState([]);
  
      useEffect(() => {
        async function getData() {
          const response = await fetch(`${API_URL}/api/produkty`);
          const data = await response.json();
          setProdukty(data);
        }
        getData();
      }, []);

      const produkty=produktyState;


  if (produkty.length === null) {
    return <span className="loader"></span>;
  }

  return (
    <>
    <HelmetProvider>
      <CartProvider produkty={produkty}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home produkty={produkty}/>} />
          <Route path="/product/:id" element={<BuyProduct produkty={produkty} />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/finalize" element={<Finalization/>}/>
          <Route path="/empty" element={<EmptyCart/>}/>
          <Route path="/admin" element={<Admin produkty={produkty}/>}/>          
        </Routes>
        <Footer/>
      </CartProvider>
    </HelmetProvider>

    
    </>
  );
}

export default App;
