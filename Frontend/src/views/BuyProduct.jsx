import React from "react";
import { produkty } from "./Home";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/BuyProduct.css";

function BuyProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const urlId = Number(id);
    const produkt = produkty.find(produkt => produkt.id === urlId);
    return (
        <div className="buy-product-main" onClick={() => navigate(`/`)}>
            <div className="buy-product-text1">
                <svg className="buy-product-text1-arrow" fill="white" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 404.258 404.258" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 "></polygon> </g></svg>
                <p className="buy-product-text1-h2">Powrót do strony: Strona główna</p>
            </div>
            <div className="buy-product-c1">
                <img src={produkt.zdjecia[0]} alt="" className="buy-product-c1-i1" />
                <div className="buy-product-c1-text1">
                    <h1 className="buy-product-c1-text1-h1">{produkt.nazwa}</h1>
                    <p className="buy-product-c1-text1-p">{produkt.cena} zł</p>
                </div>
            </div>
            <div className="buy-product-form1">
                <label className="buy-product-form1-l1">Sztuk</label>
                <input type="number" className="buy-product-form1-i1" />
                <button className="buy-product-form1-b1">Dodaj do koszyka</button>
            </div>
        </div>
    );
}

export default BuyProduct;