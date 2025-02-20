import { useState } from "react";
import "../styles/AdminPanel.css";
const API_URL = import.meta.env.VITE_APP_API_URL;
function Admin() {
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();
        const userPassword=e.target.value;
        const response = await fetch( `${API_URL}/api/login`, {    
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),

        }
    );
    response.ok ? alert("Zalogowano") : alert("Błąd logowania");
    setPassword(userPassword);
    }

    return(
        <div className="admin-panel">
            <form action="">
                <input className="login-input" type="password" placeholder="podaj haslo" id="" onSubmit={login} />
                <button onClick={login}>Zaloguj</button>
            </form>
        </div>
    )
};



export default  Admin;