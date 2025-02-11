
import React, {  useEffect } from "react";
import "../styles/home.css";
import AOS from 'aos';
import Product from "./Product.jsx";
import './BuyProduct.jsx';
import 'aos/dist/aos.css';

function Home() {

    const produkty = [
        { id: 0, nazwa: "Torebka Denim Czarno szara", cena: "1000,00", zdjecia: [
            "/images/_MG_0508.JPG",
            "/images/_MG_0228.JPG",
            "/images/_MG_0526.JPG"

        ]},
        
        { id: 1, nazwa: "Torebka Denim Szara", cena: "800,00", zdjecia: [
            "/images/_MG_0078.JPG",
            "/images/_MG_0228.JPG",
        ]},
        
        { id: 2, nazwa: "Torebka Denim Czarna", cena: "900,00", zdjecia: [
            "/images/_MG_0241.JPG",
            "images/_MG_0394.JPG",
        ] }
    ];

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <>
           <section>
                <div className='s1'>
                    <img src="/images/_MG_0295.JPG" alt=""  className='s1-i1'/>
                    <h1 className='s1-h1'>WITAJ!</h1>
                    <div className='s1-text'>
                        <p>Witaj na naszej stronie</p>
                        <p className='s1-text-p2'>Odkryj unikalne torebki denimowe tworzone z pasją przez naszych projektantów</p>
                    </div>
                    <img className='s1-i2' src="/images/_MG_0327.JPG" alt="" />
                    <img src="/images/_MG_0144.JPG" className='s1-i3' alt="" />
                </div>
           </section>
           <section>
                <div className="s2">
                    <h1 className="s2-h1" data-aos="fade-right">PRODUKTY</h1>
                    <svg width="100%" height="2" viewBox="0 0 100 2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <line x1="1" y1="1" x2="100" y2="1" stroke="black" stroke-width="1"/>
                    </svg>
                    <div className='s2-products' >
                        {produkty.map((produkt) => (
                                <Product className="Product" key={produkt.id} {...produkt}  />
                        ))}
                    </div>
                </div>
           </section>
           <section>
            <div className='s3'>
                <h1 className='s3-h1'>O NAS</h1>
                <img className='s3-i1' src="/images/_MG_0131.JPG" alt=""  data-aos="fade-right"/>
                <img className='s3-i2' src="/images/_MG_0368.JPG" alt=""  data-aos="fade-left"/>
                <div className='s3-container'>
                    <div className='s3-text'>
                        <h2 className='s3-h2' data-aos="zoom-in" >Nasza historia</h2>
                        <p className='s3-p1'  data-aos="zoom-in">Tutaj mozecie sobie dac jaki opis jakies informacje o was samych. Nadal prosze o wyjasnienie jak z dzinsow sie robi torebki. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id facilisis nunc. Quisque dignissim </p>
                    </div>
                    <button data-aos="zoom-in" className='s3-button'>Dowiedz się więcej</button>
                </div>
            </div>
           </section>
           <section>
            <div className="s4">
                <img src="/images/logo_scraps-01.png" alt="Logo Scraps" className="s4-logo" data-aos="fade-right"/>
                <svg  className='s4-footer-line' width="100%" height="2" viewBox="0 0 100 2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <line x1="0" y1="1" x2="100" y2="1" stroke="black" strokeWidth="0.5" />
                </svg>
                <div className="s4-footer" data-aos="fade-right">
                    <div className='s4-contact'>
                        <p >+48 123-456-789</p>
                        <p>info@scraps.com</p>
                    </div>
                    <svg className='s4-footer-line'  width="100%" height="2" viewBox="0 0 100 2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <line x1="0" y1="1" x2="100" y2="1" stroke="black" strokeWidth="0.5" />
                    </svg>
                    <div className='s4-social-media-container'>
                        <div className='s4-social-media'>
                            <img src="/images/Instagram.svg" alt="Instagram" />
                            <p>@scraps123</p>
                        </div>
                        <div className='s4-social-media'>
                            <img src="/images/TikTok.svg" alt="TikTok" />
                            <p>@scrapsTikTok</p>
                        </div>
                    </div>
                    <div className='s4-address'>
                        <p>ul. Zielona 5</p>
                        <p>78-345 Warszafka</p>
                    </div>
                </div>
                <div className='s4-newsletter'>
                    <div className='s4-newsletter-text' data-aos="fade-right">
                        <h2 className='s4-newsletter-text-header'>Zapisz się do newslettera</h2>
                        <p>Podaj swój e-mail</p>
                    </div>
                    <form action="">
                        <input type="email" name="email" id="email" data-aos="fade-right" autoComplete='off' placeholder="" />
                        <button type="submit" data-aos="fade-left">SUBSKRYBUJ</button>
                    </form>
                </div>
            </div>
        </section>


        </>
    );
}

export default Home;