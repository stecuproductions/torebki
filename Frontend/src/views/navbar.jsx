import React, { useState, useEffect } from "react";
import "../styles/navbar.css";

function Navbar() {
    const images = [
        "/images/logo_scraps-01.svg",
        "/images/cart.svg",
        "/images/hamburger.svg"

    ];

    
    return (
        
        <nav className="navbar">
            <img src="/images/logo_scraps-01.svg" aos-data="zoom-out" className="navbar-logo" alt="logo" />

            <div className="navbar-right">
                <div className="cart-container">
                    <p>1</p>
                    <img src="/images/cart.svg" alt="cart" />
                </div>
                <img className="hamburger" src="/images/hamburger.svg" alt="menu" />
            </div>
        </nav>
    );
}

export default Navbar;
