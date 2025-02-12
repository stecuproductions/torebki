import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    
    return (
        
        <nav className="navbar">
            <img src="/images/logo_scraps-01.svg" aos-data="zoom-out" className="navbar-logo" alt="logo"  onClick={ () => navigate("/")}/>

            <div className="navbar-right">
                <div className="cart-container" onClick={() => navigate("/cart")}>
                    <p>1</p>
                    <img src="/images/cart.svg" alt="cart" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
