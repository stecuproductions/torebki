import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const CartContext = createContext();

export const CartProvider = ({ children, produkty }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
     
        var localData = localStorage.getItem("cart");

        
        return localData ? JSON.parse(localData).filter((item)=>item.produkt in produkty) : [];
    });
    function addProductToCart(product) {
        for (let i=0; i<cart.length; i++){
            if (cart[i].id===product.id){
                cart[i].ilosc+=1;
                setCart([...cart]);
                return;
            }
        }
        setCart([...cart, product]);
    }

    
    const [totalPrice, setTotalPrice] = useState(0);


    function removeProductFromCart(product) {
        const newCart=cart.filter(item=>item.id!==product.id);
        setCart(newCart);
        if (newCart.length===0){
            navigate("/empty");
        }
    }
    function deleteProductFromCart(product) {
        const newCart=cart.filter(item=>item.id!=product.id);
        setCart(newCart);
        newCart.length===0 && navigate("/empty");
    }
    
    function decreaseProductQuantity(product) {
        if (product.ilosc===1){
            removeProductFromCart(product);
            return;
        }
        const newCart=cart.map(item => {
            return item.id===product.id ? {...item, ilosc:item.ilosc-1}:item;
        });
        setCart(newCart);
    }

    const priceToFloat = (price) => {
        return parseFloat(price.replace(" ", "").replace(",", "."));
    };

    const floatToPrice = (num) => {
        const fixed = num.toFixed(2);
        fixed.replace(".", ",");
        const [intPart, floatPart]= fixed.split(".");
        const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " "); 
        return formattedIntPart + "," + floatPart;

    };

    useEffect(() => {
        var newTotalPrice=0;
        cart.forEach((product) => {
            newTotalPrice += product.cena * product.ilosc;
        });
        setTotalPrice(newTotalPrice);
        localStorage.setItem("cart", JSON.stringify(cart));
        
    }, [cart]);
    return (
        <CartContext.Provider
            value={{ cart, setCart, addProductToCart, removeProductFromCart, priceToFloat, floatToPrice, totalPrice, decreaseProductQuantity, deleteProductFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
