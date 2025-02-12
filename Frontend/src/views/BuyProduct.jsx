import React, { useEffect,useState, useRef } from "react";
import { produkty } from "./Home";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/BuyProduct.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

function BuyProduct() {
    const [productCount, setProductCount] = useState(1);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
    const urlId = Number(id);
    const produkt = produkty.find(produkt => produkt.id === urlId);
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);   
    const startX = useRef(0); 

    function handleSwipeStart(e) {
        startX.current = e.touches[0].clientX;
    }

    function handleSwipeEnd(e) {
        const endX = e.changedTouches[0].clientX;
        const swipeThreshold = 50; // Minimalna odległość dla swipa

        if (Math.abs(startX.current - endX) > swipeThreshold) {
            if (startX.current - endX > 0) {
                setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % produkt.zdjecia.length);
            } else {
                setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + produkt.zdjecia.length) % produkt.zdjecia.length);
            }
        }
    }

    return (


            <div className="buy-product-main" data-aos="fade-right">  
                    <div  className="buy-product-text1" onClick={() => navigate("/")}>
                        <svg className="buy-product-text1-arrow" fill="white" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 404.258 404.258" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 "></polygon> </g></svg>
                        <p className="buy-product-text1-p">Powrót do strony: Strona główna</p>
                    </div>
                    <div className="buy-product-c1" >
                        <div className="buy-product-c1-c1">
                            <img className="buy-product-c1-c1-i1" src={produkt.zdjecia[currentPhotoIndex]} alt="" onTouchStart={handleSwipeStart} onTouchEnd={handleSwipeEnd}/>
                            <div className="buy-product-c1-c1-scrollCircles">
                                {produkt.zdjecia.map((_, index) =>
                                    <span
                                        onClick={() => setCurrentPhotoIndex(index)}
                                        key={index}
                                        className={index === currentPhotoIndex ? "buy-product-c1-c1-circle active" : "buy-product-c1-c1-circle"}
                                    ></span>
                                )}
                            </div>
                        </div>
                        <div className="buy-product-c1-c2">
                            <div className="buy-product-c1-c2-text1">
                                <h1 className="buy-product-c1-c2-text1-h1">{produkt.nazwa}</h1>
                                <p className="buy-product-c1-c2-text1-p">{produkt.cena} zł</p>
                            </div>
                            <form className="buy-product-c1-c2-form1">
                            <label className="buy-product-c1-c2-form1-l1">Sztuk</label>
                             <input
                                type="number"
                                className="buy-product-c1-c2-form1-i1"
                                value={productCount}
                                onChange={(e) => setProductCount(e.target.value)}
                            />
                            <button className="buy-product-c1-c2-form1-b1" type="submit">
                                Dodaj do koszyka
                            </button>
                            </form>
                        </div>
                    </div>
                    <p className="buy-product-main-p">{produkt.opis}</p>
            </div>
    );
}

export default BuyProduct;
