import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import animacji
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Product({ id ,nazwa, cena, zdjecia }) {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // Kierunek animacji

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const nextImage = () => {
        setDirection(1); // Przesuwa w prawo
        setCurrentIndex(prevIndex => (prevIndex + 1) % zdjecia.length);
    };

    const prevImage = () => {
        setDirection(-1); // Przesuwa w lewo
        setCurrentIndex(prevIndex => (prevIndex - 1 + zdjecia.length) % zdjecia.length);
    };

    return (
        <div className="Product"  data-aos="zoom-out">
            <div className="p-c1">
                <svg  className="arrow" width="32" height="56" viewBox="0 0 8 14" fill="none" onClick={prevImage}
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 7L7 1" stroke="black" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>

                {/* Kontener na animowane zdjęcie */}
                <div className="p-image-container">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={zdjecia[currentIndex]} // Klucz wymusza odświeżenie obrazu
                            src={zdjecia[currentIndex]}
                            className="p-i1"
                            alt="Produkt"
                            //initial={{ opacity: 0,}} // Start poza ekranem
                            // animate={{ opacity: 1, x: 0 }} // Płynnie wchodzi na miejsce
                            // exit={{ opacity: 0, }} // Wychodzi w przeciwną stronę
                            // transition={{ duration: 0.5, ease: "easeInOut" }} // Płynna animacja
                        />
                    </AnimatePresence>

                    {/* Kółka do zmiany zdjęcia */}
                    <div className="p-circle-container">
                        {zdjecia.map((_, index) => (
                            <span
                                key={index}
                                className={`p-circle-switch ${index === currentIndex ? "active" : ""}`}
                                onClick={() => setCurrentIndex(index)}
                            ></span>
                        ))}
                    </div>
                </div>


                <svg  className="arrow" width="32" height="56" viewBox="0 0 8 14" fill="none" onClick={nextImage}
                     xmlns="http://www.w3.org/2000/svg">
                    <g transform="rotate(180, 4, 7)">
                        <path d="M7 13L1 7L7 1" stroke="black" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </g>
                </svg>
            </div>
            <div className="p-text " onClick={() =>  {window.scrollTo(0, 0); navigate(`/product/${id}`)}}>
                <h2>{nazwa}</h2>
                <p>{cena} zł</p>
            </div>
        </div>
    );
}

export default Product;
