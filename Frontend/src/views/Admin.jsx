import React, { useState } from "react";
import "../styles/AdminPanel.css";
import { API_URL } from "../App";
function Admin({produkty}) {
    const [password, setPassword] = useState("");
    

    const login = async (e) => {
        e.preventDefault();
        const response = await fetch( `${API_URL}/api/login`, {    
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
             body: JSON.stringify({ password }),
        }
    );
    const data = await response.json();
    if(data.error)  {
        alert("Błąd serwera")
        return;
    }
    data.ok ? alert("Zalogowano") : alert("Błąd logowania");
    
    }

    return(
        <div className="admin-panel">
            <form  onSubmit={login} className="login-form">
                <input className="login-input" type="password" placeholder="podaj haslo" value={password} onChange={(e) => setPassword(e.target.value)}  />
                <button type="submit">Zaloguj</button>
            </form>
            <form action="" className="add-product-form">
                <h1>Dodawnie produktu</h1>
                <label htmlFor="">nazwa</label>
                <input type="text" placeholder="Nazwa produktu" />
                <label htmlFor="">cena, koniecznie w formacie 1000.00 kropa nie przecinek i dwa miejsca zerowe</label>
                <input type="text" placeholder="Cena" />
                <label htmlFor="">Zdjęcia, wybierzcie od 2 do 4. Najwazniejsze jest zdjecie nr 1, ono jest glowne. Pozostale to te ktore mozna scrollowac</label>
                <input type="file" multiple />
                <button type="submit">Dodaj produkt</button>
            </form>
            <form action="" className="edit-product-form">
                <h1>Edycja produktow</h1>
                <label htmlFor="">Wybierz produkt</label>
                <select name="" id="">
                    <option value="" disabled selected>Wybierz produkt</option>
                    {produkty.map((produkt) => (
                        <option >{produkt.id} + {produkt.nazwa} + {produkt.cena}</option>
                    ))}
                </select>
            </form>
            

        </div>
    )
};



export default  Admin;