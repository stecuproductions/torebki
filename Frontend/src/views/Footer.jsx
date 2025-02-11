import React, {useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../styles/Home.css"

function Footer(){
        useEffect(() => {
            AOS.init({
                duration: 1000,
                once: true,
            });
        }, [])

    return(
        <footer className="s4">
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

                </footer>
    )
}

export default Footer;