import React from "react";
import "../styles/home.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


function Product({nazwa, cena, zdjecie}){
      useEffect(() => {
            AOS.init({
                duration: 1000,
                once: true,
            });
        }, []);
    return (
        <div className="Product">
            <div className="p-c1">
                <svg  data-aos="fade-zoom-in" className="arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 7L7 1" stroke="black" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <img className="p-i1" src={zdjecie} alt="" data-aos="fade-zoom-in" />
                <svg  data-aos="fade-zoom-in" className="arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g transform="rotate(180, 4, 7)"> 
                        <path d="M7 13L1 7L7 1" stroke="black" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                </svg>
            </div>
            <div className="p-text">
                <h2 data-aos="fade-zoom-in">{nazwa}</h2>
                <p data-aos="fade-zoom-in"> {cena} zł</p>
            </div>
        </div>
    )
}

export default Product;