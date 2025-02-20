import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import 'aos/dist/aos.css';
import "../styles/Finalize.css";
import { CartContext } from "../CartContext";
import { API_URL } from "../App";
export default function Finalization() {
  const { cart, totalPrice, floatToPrice } = useContext(CartContext);

  const [formData, setFormData] =useState({
    imie: "",
    nazwisko: "",
    email: "",
    numerTelefonu: "",
    miasto: "",
    kodPocztowy: "",
    ulica: "",
    numerDomu: "",
    numerMieszkania: "",
    dostawa: "",
  })

  function handleInputChange(e) {
    console.log(e.target.name);
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.imie || !formData.nazwisko || !formData.email || !formData.numerTelefonu || !formData.miasto || !formData.kodPocztowy || !formData.ulica || !formData.numerDomu || !formData.dostawa){
      alert("Wypełnij wszystkie pola");
      return;
    }
    const emailRegex=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(formData.email)){
      alert("Niepoprawny email");
      return;
    }
    const postalCodeRegex=/^\d{2}-\d{3}$/;
    if (!postalCodeRegex.test(formData.kodPocztowy)){
      alert("Niepoprawny kod pocztowy");
      return;
    }

  }


  return (
    <div className="finalization">
    <div className="finalization-summary" data-aos="fade-right">
      <legend className="finalization-summary-header">
        <h1>Podsumowanie</h1>
      </legend>
      <div className="finalization-summary-products">
         {cart.map((product) => (
          <div className="finalization-summary-product" key={product.key}>
            <div className="finalization-summary-product-image">
              <img src={`${API_URL}${product.zdjecia[0]}`} />
            </div>
            <div className="finalization-summary-product-details">
              <h2 onClick={()=>{const toNavigate="/product/" +product.id ; navigate(toNavigate)}}>{product.nazwa}</h2>
              <p>Cena: {floatToPrice(product.cena)} zł</p>
              <p>Ilość: {product.ilosc}</p>
            </div>
          </div>
        ))} 
      </div>  
      <p className="finalization-summary-total-price">Razem {floatToPrice(totalPrice)} zł</p>
    </div>
  
    <div className="finalization-form-main" data-aos="fade-left">
      <div className="finalization-form-header">
        <legend>Dane do wysyłki</legend>
      </div>
      <div className="finalization-form-container">
        <form action="" className="finalization-form">
          <input aria-label="Imię" type="text" name="imie" placeholder="Imię" value={formData.imie} onChange={(e) => handleInputChange(e)} required={true} />
          <input aria-label="Nazwisko" type="text" placeholder="Nazwisko" name="nazwisko" value={formData.nazwisko} onChange={(e) => handleInputChange(e)} required={true} />
          <input aria-label="E-mail" type="text" placeholder="E-mail" name="email" value={formData.email} onChange={(e) => handleInputChange(e)}  required={true}/>
          <input    aria-label="Numer Telefonu" inputMode="numeric"  type="tel" placeholder="Nr. telefonu (+48)"   name="numerTelefonu" value={formData.numerTelefonu} onChange={(e) => handleInputChange(e)} required={true} />
          <fieldset className="finalization-form-address">
            <div className="finalization-form-address1">
              <input aria-label="Miasto" type="text" placeholder="Miasto" name="miasto" value={formData.miasto} onChange={(e) => handleInputChange(e)} required={true}/>
              <input aria-label="Kod Pocztowy" type="text" placeholder="Kod Pocztowy" name="kodPocztowy" value={formData.kodPocztowy} onChange={(e) => handleInputChange(e)} required={true} />
            </div>
            <div className="finalization-form-address2">
              <input aria-label="Ulica" type="text" placeholder="Ulica" name="ulica" value={formData.ulica} onChange={(e) => handleInputChange(e)} />
              <input aria-label="Numer Domu" type="text" placeholder="Numer domu" name="numerDomu" value={formData.numerDomu} onChange={(e) => handleInputChange(e)}  required={true}/>
            </div>
          </fieldset>
          <input aria-label="Numer Mieszkania" type="text" placeholder="Numer Mieszkania" name="numerMieszkania" value={formData.numerMieszkania} onChange={(e) => handleInputChange(e)} />
           <select aria-label="Forma dostawy"  className="finalization-form-select" name="dostawa" value={formData.dostawa} onChange={(e) => handleInputChange(e)} required={true}>
            <option value="" disabled>Wybierz opcję dostawy</option>
            <option value="kurier">Kurier InPost (30 zł)</option>
            <option value="paczkomat">Paczkomat InPost (15 zł)</option>
            <option value="odbior">Kurier DPD (20 zł)</option>
          </select>                  
          <button className="finalization-form-button" type="submit">Przejdź do płatności</button>
        </form>
      </div>
    </div>
  </div>
  
      
  );
}
