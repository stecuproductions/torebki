import React, {useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../styles/home.css"
import { API_URL } from "../App";
function Footer(){
        const [statusMessage, setStatusMessage] = React.useState('');
        useEffect(() => {
            AOS.init({
                duration: 1000,
                once: true,
            });
        }, [])

        const handleNewsletterSubmit = async (e) => {
            e.preventDefault();
            try{
                const email = document.getElementById('email').value;
                const result = await fetch(`${API_URL}/api/newsletter`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email}),
                })
                if (result.status===201){
                    document.getElementById('email').value='';
                    setStatusMessage('Zapisano do newslettera');
                }
                else if(result.status===400){
                    setStatusMessage('Email już istnieje w bazie');
                }
                else if(result.status===501){
                    setStatusMessage('Błąd serwera podczas zapisu do newslettera');
                }

            }
            catch(error){
                console.error("Błąd zapisu do newslettera:", error);
            }
        }
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
                                {/* Wersja klienta */}
                                <img src="/images/instagram2.png" alt="" />
                                {/* <img src="/images/Instagram.svg" alt="Instagram" /> */}
                                <p>@scraps123</p>
                            </div>
                            <div className='s4-social-media'>
                                {/* Wersja klienta */}
                                <img src="/images/tik-tok-2.png" alt="Facebook" /> 
                                {/* <img src="/images/TikTok.svg" alt="TikTok" /> */}
                                <p>@scrapsTikTok</p>
                            </div>
                        </div>
                        <div className='s4-address'>
                            <p>ul. Zielona 5</p>
                            <p>78-345 Warszafka</p>
                        </div>
                    </div>
                    <div className='s4-newsletter' data-aos="fade-right">
                        <div className='s4-newsletter-text' >
                            <h2 className='s4-newsletter-text-header'>Zapisz się do newslettera</h2>
                            <p>Podaj swój e-mail</p>
                        </div>
                        <form onSubmit={(e)=>handleNewsletterSubmit(e)} >
                            <input type="email" name="email" id="email"  placeholder="" />
                            <button id="s4-newsletter-form-1-button" type="submit">SUBSKRYBUJ</button>
                            {statusMessage && <p
                            style={{
                                color: statusMessage.includes('Błąd') ? 'red' : 'green',
                            }}
                            >{statusMessage}</p>}
                        </form>
                    </div>

                </footer>
    )
}

export default Footer;