import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { CartContext } from "../CartContext";

function Navbar() {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    console.log(cart);
    return (
        
        <nav className="navbar">
            <img src="/images/logo_scraps-01.svg" aos-data="zoom-out" className="navbar-logo" alt="logo"  onClick={ () => navigate("/")}/>


            <div className="navbar-right">
                <div className="cart-container" onClick={() => {cart.length >= 1  ? navigate("/cart") : navigate("/empty")}}>
                    <p>1</p>
                    <img src="/images/cart.svg" alt="cart" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
