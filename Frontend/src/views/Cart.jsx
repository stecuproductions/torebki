import { koszyk } from "./Home";
import React, { useState } from "react";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom"; 

function Cart() {
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(() => {
        let totalPrice = 0;
        for(let i = 0; i < koszyk.length; i++) {
            totalPrice += priceToInt(koszyk[i].cena) * koszyk[i].ilosc;
        }
        return totalPrice;
    });
    function calculateTotalPrice() {
        let funcPrice = 0;
        for (let i = 0; i < koszyk.length; i++) {
            funcPrice += priceToInt(koszyk[i].cena) * koszyk[i].ilosc;
        }
        setTotalPrice(funcPrice);
    }
  function priceToInt(price) {
    return parseInt(price.replace(" ", "").replace("", ""));
  }
  function intToPrice(num) {
    const fixedNum = num.toFixed(2); // np. "11200.00"
    const [intPart, decimalPart] = fixedNum.split('.');
    const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return formattedIntPart + "," + decimalPart;
  }

  // Inicjalizujemy stan dla liczników – przyjmujemy, że każdy produkt zaczyna od wartości z produktu lub 1
  const [formCounts, setFormCounts] = useState(() => {
    const initialCounts = {};
    koszyk.forEach((produkt, index) => {
      initialCounts[index] = produkt.ilosc || 1;
    });
    return initialCounts;
  });

  const handleCountChange = (index, value) => {
    if (value < 1) {
      return;
    }
    setFormCounts((prev) => ({ ...prev, [index]: value }));
    koszyk[index].ilosc = value;
    localStorage.setItem("koszyk", JSON.stringify(koszyk));
    calculateTotalPrice();
  };
const handleDeleteProduct = (index) => {
    koszyk.splice(index, 1);
    localStorage.setItem("koszyk", JSON.stringify(koszyk));
    setFormCounts((prev) => {
        const newCounts = { ...prev };
        delete newCounts[index];
        return newCounts;
    });
    calculateTotalPrice();
};

if (koszyk.length!=0){ return (
    <div className="cart-main">
        <div className="cart-c1">
            {koszyk.map((produkt, index) => (
                <div className="cart-c1-product" key={index}>
                    <img src={produkt.zdjecia[0]} className="cart-c1-i1" alt="" />
                    <div className="cart-c1-product-text">
                        <p className="cart-produkt-nazwa" onClick={()=>{const toNavigate="/product/" +produkt.id ;navigate(toNavigate)}}>{produkt.nazwa}</p>
                        <p>{produkt.cena} zł</p>
                        <div className="cart-c1-product-text-c1">
                            <div className="cart-c1-product-text-c1-c1">
                                    <span className="cart-c1-product-text-c1-c1-sign" onClick={()=> {handleCountChange(index, formCounts[index]-1)}}>-</span>
                                    <input
                                            min="1"
                                        className="cart-c1-product-text-c1-input"
                                        type="number"
                                        value= {formCounts[index]}
                                        onChange={(e) =>
                                            handleCountChange(index, e.target.value)
                                        }
                                        readOnly
                                    />
                                    <span className="cart-c1-product-text-c1-c1-sign" onClick={()=> {handleCountChange(index, formCounts[index]+1)}}>+</span>
                            </div>
                            <p>{intToPrice(priceToInt(produkt.cena) * formCounts[index])} zł</p>
                        </div>
                    </div>
                    <svg onClick={() => handleDeleteProduct(index)} className="cart-bin" fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 408.483 408.483" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"></path> <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"></path> </g> </g> </g></svg>
                </div>
            ))}
        </div>
        <div className="cart-c2">
                    <h1 className="cart-c2-h2">Podsumowanie zamówienia</h1>
                     <p className="cart-c2-p">Razem {intToPrice(totalPrice)} zł</p>
                     <button className="cart-c2-button">Zamów</button>
        </div>
    </div>
);
}
else {
    return (
        <div className="cart-empty">
            <p className="cart-empty-h1">Koszyk jest pusty</p>
            <div  className="cart-text1"  onClick={() => navigate("/")}>
                        <svg className="cart-text1-arrow" fill="white" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 404.258 404.258" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 "></polygon> </g></svg>
                        <p className="cart-text1-p" onClick={()=> {navigate("/")}}>Powrót do strony: Strona główna</p>
             </div>
        </div>
    );
}
}

export default Cart;
