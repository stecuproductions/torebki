import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { CartContext } from "../CartContext";

function Navbar() {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    return (
        
        <nav className="navbar">
            <a href="/" className="navbar-logo" data-aos="zoom-out" title="Strona Główna"><img src="/images/logo_scraps-01.svg" alt="logo" /></a>

            <div  className="navbar-right">
                <a title="koszyk" className="cart-container" href={cart.length>=1 ? "/cart" : "/empty"} >
                    <p>1</p>
                    <img src="/images/cart.svg" alt="Cart icon" />
                </a>
                <a href="/" title="Strona Główna" className="home-container">
                    <img src="/images/homeSvg.svg" alt="Home icon" />
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
