import React from "react";
import "../styles/navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <img src="/images/logo_scraps-01.svg" className="navbar-logo" alt="logo" />

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
