import React from 'react';
import "../styles/home.css";
import Product from "./Product.jsx";
//            <img src="public/images/_MG_0295.JPG" alt="" />
function Home(){
    const produkty=[
        {id:0, nazwa: "Torebka Denim Czarno szara", cena: "1000,00", zdjecie: "/images/_MG_0508.JPG"},
        {id:1, nazwa: "Torebka Denim Szara", cena: "800,00", zdjecie: "/images/_MG_0078.JPG"},

    ]
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
                    <h1 className="s2-h1">PRODUKTY</h1>
                    <svg width="100%" height="2" viewBox="0 0 100 2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <line x1="1" y1="1" x2="100" y2="1" stroke="black" stroke-width="1"/>
                    </svg>
                    <div className='s2-products'>
                        {produkty.map((produkt) => (
                                <Product className="Product" key={produkt.id} {...produkt} />
                        ))}
                    </div>
                </div>
           </section>
           <section>
            <div className='s3'>
                <h1 className='s3-h1'>O NAS</h1>
                <img className='s3-i1' src="/images/_MG_0131.JPG" alt="" />
                <img className='s3-i2' src="/images/_MG_0368.JPG" alt="" />
                <p className='s3-p1'>Tutaj mozecie sobie dac jaki opis jakies informacje o was samych. Nadal prosze o wyjasnienie jak z dzinsow sie robi torebki. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.</p>
            </div>

           </section>
           <section>

           </section>
           <section>

           </section>
        </>
    );
}

export default Home;