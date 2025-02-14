import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { koszyk } from "./Home";
import {priceToInt, intToPrice } from "./Cart";
import AOS from "aos";
import 'aos/dist/aos.css';
import "../styles/Finalize.css";


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
    <div className="finalization-summary" data-aos="fade-right">
      <div className="finalization-summary-header">
        <h1>Podsumowanie</h1>
      </div>
      <div className="finalization-summary-products">
        {koszyk.map((product) => (
          <div className="finalization-summary-product" key={product.id}>
            <div className="finalization-summary-product-image">
              <img src={product.zdjecia[0]} alt={product.imie} />
            </div>
            <div className="finalization-summary-product-details">
              <h2 onClick={()=>{const toNavigate="/product/" +product.id ;navigate(toNavigate)}}>{product.nazwa}</h2>
              <p>Cena: {product.cena} zł</p>
              <p>Ilość: {product.ilosc}</p>
            </div>
          </div>
        ))}
      </div>  
      <p className="finalization-summary-total-price">Razem {calculateTotalPrice()} zł</p>
    </div>
  

  
    <div className="finalization-form-main" data-aos="fade-left">
      <div className="finalization-form-header">
        <h1>Dane do wysyłki</h1>
      </div>
      <div className="finalization-form-container">
        <form action="" className="finalization-form">
          <input type="text" placeholder="Imię" />
          <input type="text" placeholder="Nazwisko" />
          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="Nr. telefonu" />
          <div className="finalization-form-address1">
            <input type="text" placeholder="Miasto" />
            <input type="text" placeholder="Kod Pocztowy" />
          </div>
          <div className="finalization-form-address2">
            <input type="text" placeholder="Ulica" />
            <input type="text" placeholder="Numer domu" />
          </div>
          <input type="text" placeholder="Numer Mieszkania" />
          <select className="finalization-form-select" 
            value={selectedMethod}
            onChange={handleDeliverySelect}
          >
            <option value="" disabled>Wybierz metodę dostawy</option>
            {deliveryMethods.map((option) => (
              <option key={option.id} value={option.nazwa} >
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
