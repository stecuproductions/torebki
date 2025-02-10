import React from "react";
import "../styles/home.css";

function Product({nazwa, cena, zdjecie}){
    return (
        <div className="Product">
            <div className="p-c1">
            <svg className="arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L1 7L7 1" stroke="black" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
                <img className="p-i1" src={zdjecie} alt="" />
            <svg className="arrow" width="8" height="18" viewBox="0 0 8 14" id="arrow2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L1 7L7 1" stroke="black" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
            <div className="p-text">
                <h2>{nazwa}</h2>
                <p>{cena} zł</p>
            </div>
        </div>
    )
}

export default Product;