import React, { useState } from "react";
import "../styles/AdminPanel.css";
import { API_URL } from "../App";


function Admin({ produkty }) {
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();
            if (data.error) {
                alert("Błąd serwera");
                return;
            }
            if (data.ok) {
                setLogged(true);
            } else {
                alert("Błąd logowania");
            }
        } catch (error) {
            console.error("Błąd logowania:", error);
            alert("Wystąpił problem z połączeniem");
        }
    };

    const handleSelectChange = (e) => {
        const id = parseInt(e.target.value);
        const product = produkty.find((produkt) => produkt.id === id);
        setSelectedProduct(product || null);
    };

    const addProductHandleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Pobranie wartości z formularza
        const name = formData.get("name");
        const price = formData.get("price");
        const images = formData.getAll("images"); 
        const description = formData.get("description");
        const count = formData.get("stan");

        if (images.length < 2 || images.length > 4) {
            alert("Wybierz od 2 do 4 zdjęć!");
            return;
        }

        const requestData = new FormData();
        requestData.append("name", name);
        requestData.append("price", price);
        requestData.append("description", description);
        images.forEach((image) => requestData.append("images", image));
        try {
            const response = await fetch(`${API_URL}/api/add-product`, {
                method: "POST",
                body: requestData,
            });
            const data = await response.json();
            if (data.success) {
                alert("Produkt dodany!");
                form.reset(); // Resetowanie formularza po dodaniu produktu
            } else {
                alert("Błąd dodawania produktu");
            }
        } catch (error) {
            console.error("Błąd dodawania produktu:", error);
            alert("Wystąpił problem z połączeniem");
        }
    };

    return (
        <div className="admin-panel">
            <form onSubmit={login} className="login-form">
                <input
                    className="login-input"
                    type="password"
                    placeholder="Podaj hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Zaloguj</button>
            </form>
            {logged && (
                <>
                    <form className="add-product-form" onSubmit={addProductHandleSubmit}>
                        <h1>Dodawanie produktu</h1>
                        <label>Nazwa</label>
                        <input type="text" name="name" placeholder="Nazwa produktu" required />

                        <label>Cena (format 1000.00, kropka, dwa miejsca po przecinku)</label>
                        <input type="text" name="price" placeholder="Cena" required />

                        <label>Zdjęcia (2-4, pierwsze jest główne)</label>
                        <input type="file" name="images" multiple required />

                        <label>Stan: </label>
                        <input type="number" />   

                        <label>Opis</label>
                        <textarea name="description" cols="30" rows="10" required></textarea>

                        <button type="submit">Dodaj produkt</button>
                    </form>

                    <form className="edit-product-form">
                        <h1>Edycja produktów</h1>
                        <label>Wybierz produkt</label>
                        <select onChange={handleSelectChange}>
                            <option value="" disabled selected>
                                Wybierz produkt
                            </option>
                            {produkty.map((produkt) => (
                                <option key={produkt.id} value={produkt.id}>
                                    {produkt.id} - {produkt.nazwa} - {produkt.cena}
                                </option>
                            ))}
                        </select>

                        {selectedProduct && (
                            <>
                                <label>Nazwa</label>
                                <input type="text" defaultValue={selectedProduct.nazwa} required />

                                <label>Cena (format 1243.23)</label>
                                <input type="text" defaultValue={selectedProduct.cena} required />

                                <label>Opis</label>
                                <textarea
                                    name="description"
                                    cols="30"
                                    rows="10"
                                    defaultValue={selectedProduct.opis}
                                    required
                                ></textarea>

                                <button type="submit">Edytuj produkt</button>

                                <label>Zdjęcia</label>
                                {selectedProduct.zdjecia?.length > 0 &&
                                    selectedProduct.zdjecia.map((zdjecie, index) => (
                                        <div key={index} className="image-container">
                                            <p>{zdjecie}</p>
                                            <img src={`${API_URL}${zdjecie}`} alt="Produkt" />
                                        </div>
                                    ))}
                            </>
                        )}
                    </form>
                </>
            )}
        </div>
    );
}

export default Admin;
