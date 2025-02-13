import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { koszyk } from "./Home";
import "../styles/Finalization.css";
import {priceToInt, intToPrice } from "./Cart";



export default function Finalization() {
  function calculateTotalPrice(){
    let funcPrice = 0;
    for (let i = 0; i < koszyk.length; i++) {
      funcPrice += priceToInt(koszyk[i].cena) * koszyk[i].ilosc;
    }
    return intToPrice(funcPrice);
  }
  const handleDeliverySelect = (e) => {
    setSelectedMethod(e.target.value);
    if (e.target.value=="Paczkomat InPost") {
      window.open("https://inpost.pl/znajdz-paczkomat", "_blank");

    }
  };
  const deliveryMethods = [
    {id:0, nazwa:"Kurier DPD", cena:20},
    {id:1,nazwa:"Paczkomat InPost", cena:40},
   {id:2, nazwa:"Kurier InPost", cena:30}
  ];
  const [selectedMethod, setSelectedMethod] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!koszyk || koszyk.length === 0) {
      navigate("/");
    }
  }, [koszyk, navigate]);


  return (
      <div className="finalization">
        <div className="finalization-summary">
          <div className="finalization-summary-header">
              <h1>Podsumowanie</h1>
          </div>
          <div className="finalization-summary-products">
              {koszyk.map((product) => {
                return (
                  <div className="finalization-summary-product">
                    <div className="finalization-summary-product-image">
                      <img src={product.zdjecia[0]} alt={product.imie} />
                    </div>
                    <div className="finalization-summary-product-details">
                      <h2>{product.nazwa}</h2>
                      <p>Cena: {product.cena} zł</p>
                      <p>Ilość: {product.ilosc}</p>
                    </div>
                  </div>
                );
              })}
          </div>  
          <p className="finalization-summary-total-price">W sumie {calculateTotalPrice()} zł</p>
      </div>
      <div className="finalization-form-main">
            <div className="finalization-form-header">
              <h1>Dane do wysyłki</h1>
            </div>
              <div className="finalization-form-container">
                <form action="" className="finalization-form">
                  <input type="text" name="" placeholder="Imie" id="" />
                  <input type="text" name="" placeholder="Nazwisko" id="" />
                  <input type="text" name="" placeholder="E-mail" id="" />
                  <input type="text" name="" placeholder="Nr.telefonu" id="" />
                  <div className="finalization-form-address1">
                    <input type="text" name="" placeholder="Miasto" id="" />
                    <input type="text" name="" placeholder="Kod Poczyowy" id="" />
                  </div>
                  <div className="finalization-form-address2">
                    <input type="text" name="" placeholder="Ulica" id="" />
                    <input type="text" name="" placeholder="Numer domu" id="" />
                  </div>
                  <input type="text" name="" placeholder="Numer Mieszkania" id="" />
                  <select className="finalization-form-select" 
                    value={selectedMethod}
                    onChange={handleDeliverySelect}
                  >
                    <option value="" disabled>Wybierz metodę dostawy</option>
                    {deliveryMethods.map((option) => (
                      <option key={option.id} value={option.nazwa}>
                        {option.nazwa} - {option.cena} zł
                      </option>
                    ))}
                  </select>                  
                  <button className="finalization-form-button" type="submit">Przejdź do płatności</button>
                </form>
              </div>
      </div>
    </div>
      
  );
}
