import React from "react";
import "../styles/Cart.css";
export default function EmptyCart() {
return (
<div className="cart-empty">
    <p className="cart-empty-h1">Koszyk jest pusty</p>
    <div  className="cart-text1"  onClick={() => navigate("/")}>
                <svg className="cart-text1-arrow" fill="white" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 404.258 404.258" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 "></polygon> </g></svg>
                <p className="cart-text1-p" onClick={()=> {navigate("/")}}>Powrót do strony: Strona główna</p>
     </div>
</div>)
}