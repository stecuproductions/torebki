
import React, {  useEffect, useState } from "react";
import AOS from 'aos';
import Product from "./Product.jsx";
import './BuyProduct.jsx';
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet-async";
import {API_URL} from "../App.jsx";




function Home({produkty}) {  

  

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>Scraps | Ekskluzywne Torebki Denimowe Handmade</title>
                <link rel="canonical" />
                <meta name="description" content="Unikalne torebki denimowe handmade z recyklingu! Ręcznie robione z odzyskanego jeansu, stylowe i ekologiczne. Kup teraz i nadaj drugie życie denimowi!"/>
            </Helmet>

           <section>
                <div className='s1'>
                    <img src="/images/s1-i1.JPG"  alt="Para w jeansowych stylizacjach prezentująca torbę denimową na niebieskim tle"  className='s1-i1'/>
                    <h2 className='s1-h1'>TOREBKI DENIMOWE HANDMADE</h2>
                    <div className='s1-text'>
                        <p className="s1-text-p1">Witaj na naszej stronie</p>
                        <h2 className='s1-text-p2'>Odkryj unikalne torebki denimowe tworzone z pasją przez naszych projektantów</h2>
                    </div>
                    <img className='s1-i2' src="/images/s1-i2.JPG" alt="Mężczyzna w jeansowej kurtce i kobieta w czarnej stylizacji z torbami denimowymi na tle artystycznego graffiti" />
                    <img src="/images/s1-i3.JPG" className='s1-i3' alt="Mężczyzna w białej koszulce i czarnych spodniach trzymający torbę denimową na niebieskim tle" />
                </div>
           </section>
           <section>
                <div className="s2">
                    <h2 className="s2-h1" data-aos="fade-right">PRODUKTY</h2>
                    <svg width="100%" height="2" viewBox="0 0 100 2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <line x1="1" y1="1" x2="100" y2="1" stroke="black" strokeWidth="1"/>
                    </svg>
                        <div className='s2-products' >
                            {produkty &&  produkty.map((produkt) => (
                                    <Product   className="Product" key={produkt.key} id={produkt.id} nazwa={produkt.nazwa} cena={produkt.cena} zdjecia={produkt.zdjecia} opis={produkt.opis} />
                            ))}
                        </div>
                </div>
           </section>
           <section>
            <div className='s3'>
                <h2 className='s3-h1'>O NAS</h2>
                <img  loading="lazy" className='s3-i1' src="/images/s3-i1.JPG" alt="Dwie osoby w jeansowych stylizacjach siedzące na białej skrzyni, prezentujące torby denimowe"  data-aos="fade-right"/>
                <img loading="lazy" className='s3-i2' src="/images/s3-i2.JPG"  alt="Kobieta w białej koszulce i ciemnych spodniach z dużą, czarną torbą denimową na ramieniu"  data-aos="fade-left"/>
                <div className='s3-container'>
                    <div className='s3-text'>
                        <h2 className='s3-h2' data-aos="zoom-in" >Nasza historia</h2>
                        <p className='s3-p1'  data-aos="zoom-in">Tutaj mozecie sobie dac jaki opis jakies informacje o was samych. Nadal prosze o wyjasnienie jak z dzinsow sie robi torebki. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id facilisis nunc. Quisque dignissim </p>
                    </div>
                </div>
            </div>
           </section>
        </>
    );
}

export default Home;