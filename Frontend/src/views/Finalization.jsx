import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { koszyk, produkty } from "./Home";
import { priceToInt, intToPrice } from "./Cart";
import "../styles/Finalize.css";

export default function Finalization() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [formData, setFormData] = useState({
    produkty: koszyk,
    imie: "",
    nazwisko: "",
    email: "",
    telefon: "",
    miasto: "",
    kodPocztowy: "",
    ulica: "",
    numerDomu: "",
    numerMieszkania: "",
    metodaDostawy: "",
    cenaDostawy: 0,
  });
  const navigate = useNavigate();

  // Funkcja do obliczania całkowitej ceny produktów w koszyku
  const calculateTotalPrice = () => {
    return intToPrice(
      koszyk.reduce((total, product) => total + priceToInt(product.cena) * product.ilosc, 0)
    );
  };

  // Lista metod dostawy
  const deliveryMethods = [
    { id: 0, nazwa: "Kurier DPD", cena: 20 },
    { id: 1, nazwa: "Paczkomat InPost", cena: 40 },
    { id: 2, nazwa: "Kurier InPost", cena: 30 },
  ];

  // Obsługa zmian w formularzu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Obsługa wyboru metody dostawy
  const handleDeliverySelect = (e) => {
    const method = e.target.value;
    const selectedDelivery = deliveryMethods.find((option) => option.nazwa === method);
    setFormData((prev) => ({
      ...prev,
      metodaDostawy: method,
      cenaDostawy: selectedDelivery ? selectedDelivery.cena : 0,
    }));
    
    if (method === "Paczkomat InPost") {
      window.open("https://inpost.pl/znajdz-paczkomat", "_blank");
    }
  };

  // Jeśli koszyk jest pusty, przekierowanie na stronę główną
  useEffect(() => {
    if (!koszyk || koszyk.length === 0) {
      navigate("/");
    }
  }, [koszyk, navigate]);

  return (
    <div className="finalization">
      {/* Sekcja podsumowania */}
      <div className="finalization-summary">
        <div className="finalization-summary-header">
          <h1>Podsumowanie</h1>
        </div>
        <div className="finalization-summary-products">
          {koszyk.map((product, index) => (
            <div key={index} className="finalization-summary-product">
              <div className="finalization-summary-product-image">
                <img src={product.zdjecia[0]} alt={product.imie} />
              </div>
              <div className="finalization-summary-product-details">
                <h2>{product.nazwa}</h2>
                <p>Cena: {product.cena} zł</p>
                <p>Ilość: {product.ilosc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="finalization-summary-total-price">W sumie {calculateTotalPrice()} zł</p>
      </div>

      {/* Sekcja formularza */}
      <div className="finalization-form-main">
        <div className="finalization-form-header">
          <h1>Dane do wysyłki</h1>
        </div>
        <div className="finalization-form-container">
          <form className="finalization-form">
            <input type="text" name="imie" placeholder="Imię" onChange={handleInputChange} />
            <input type="text" name="nazwisko" placeholder="Nazwisko" onChange={handleInputChange} />
            <input type="text" name="email" placeholder="E-mail" onChange={handleInputChange} />
            <input type="text" name="telefon" placeholder="Nr telefonu" onChange={handleInputChange} />
            <div className="finalization-form-address1">
              <input type="text" name="miasto" placeholder="Miasto" onChange={handleInputChange} />
              <input type="text" name="kodPocztowy" placeholder="Kod Pocztowy" onChange={handleInputChange} />
            </div>
            <div className="finalization-form-address2">
              <input type="text" name="ulica" placeholder="Ulica" onChange={handleInputChange} />
              <input type="text" name="numerDomu" placeholder="Numer domu" onChange={handleInputChange} />
            </div>
            <input type="text" name="numerMieszkania" placeholder="Numer Mieszkania" onChange={handleInputChange} />

            {/* Wybór metody dostawy */}
            <select className="finalization-form-select" name="metodaDostawy" value={formData.metodaDostawy} onChange={handleDeliverySelect}>
              <option value="" disabled>
                Wybierz metodę dostawy
              </option>
              {deliveryMethods.map((option) => (
                <option key={option.id} value={option.nazwa}>
                  {option.nazwa} - {option.cena} zł
                </option>
              ))}
            </select>

            <button className="finalization-form-button" type="submit">
              Przejdź do płatności
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
