import React, { useState } from "react";
import "../styles/AdminPanel.css";
import { API_URL } from "../App";


function Admin({ produkty }) {
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editPhotos, setEditPhotos] = useState([]);
    const [selectAddImageProduct, setSelectAddImageProduct] = useState(null);


    const deleteProductsFromEdit = (path) => {
        setEditPhotos((prevPhotos) => prevPhotos.filter((photo) => photo !== path));
    };

    



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
        
        setEditPhotos(product ? product.zdjecia.map((zdjecie) => `${API_URL}${zdjecie}`) : []);
    };
    


const [isSubmitting, setIsSubmitting] = useState(false);

const addProductHandleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Jeśli formularz jest już wysyłany, ignorujemy kliknięcie

    setIsSubmitting(true); // Blokujemy przycisk

    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get("name");
    const price = formData.get("price");
    const images = formData.getAll("images");
    const description = formData.get("description");
    const count = formData.get("stan");

    if (images.length < 2 || images.length > 4) {
        alert("Wybierz od 2 do 4 zdjęć!");
        setIsSubmitting(false); // Odblokowujemy przycisk w przypadku błędu
        return;
    }

    const requestData = new FormData();
    requestData.append("name", name);
    requestData.append("price", price);
    requestData.append("description", description);
    requestData.append("count", count);
    requestData.append("password", password);
    images.forEach((image) => requestData.append("images", image));

    try {
        const response = await fetch(`${API_URL}/api/add-product`, {
            method: "POST",
            body: requestData,
        });
        const data = await response.json();

        if (data.success) {
            alert("Produkt dodany!");
            form.reset();
        } else {
            alert("Błąd dodawania produktu");
        }
    } catch (error) {
        console.error("Błąd dodawania produktu:", error);
        alert("Wystąpił problem z połączeniem");
    } finally {
        setIsSubmitting(false); // Odblokowanie przycisku po zakończeniu operacji
    }
};


const editProductHandleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const productId = parseInt(formData.get("product"));
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const count = formData.get("count");
    const newImages = formData.getAll("images"); // Nowe pliki

    const requestData = new FormData();
    requestData.append("name", name);
    requestData.append("price", price);
    requestData.append("description", description);
    requestData.append("count", count);
    requestData.append("password", password);
    requestData.append("productId", productId);

    // 🟢 Wysyłanie istniejących zdjęć jako JSON (w jednym polu!)
    requestData.append("existingImages", JSON.stringify(editPhotos));

    // 🟢 Dodawanie nowych zdjęć (pozostaje bez zmian)
    newImages.forEach((image) => requestData.append("images", image));

    try {
        const response = await fetch(`${API_URL}/api/edit-product`, {
            method: "POST",
            body: requestData,
        });
        const data = await response.json();

        if (data.success) {
            alert("Produkt edytowany!");
            form.reset();
        } else {
            alert("Błąd edycji produktu");
        }
    } catch (error) {
        console.error("Błąd edycji produktu:", error);
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
                        <input name="stan" type="number" />   

                        <label>Opis</label>
                        <textarea name="description" cols="30" rows="10" required></textarea>

                        <button type="submit">Dodaj produkt</button>
                    </form>

                    <form className="edit-product-form" onSubmit={editProductHandleSubmit}>
                        <h1>Edycja produktów</h1>
                        <label>Wybierz produkt</label>
                        <select onChange={handleSelectChange} name="product" >
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
                                <input type="text" defaultValue={selectedProduct.nazwa} name="name" required />

                                <label>Cena (format 1243.23)</label>
                                <input type="text" name="price" defaultValue={selectedProduct.cena} required />
                                
                                <label>Opis</label>
                                <textarea
                                    name="description"
                                    cols="30"
                                    rows="10"
                                    defaultValue={selectedProduct.opis}
                                    required
                                ></textarea>

                                <label>Zdjęcia</label>
                                {editPhotos.length > 0 &&
                                    editPhotos.map((zdjecie, index) => (
                                        <div key={index} className="image-container">
                                            <p className="image-path">{zdjecie}</p>
                                            <img src={zdjecie} alt="Produkt" />
                                            <svg  className="cart-bin" fill="#ffffff"  onClick= {() => editPhotos.length>1 ? deleteProductsFromEdit(zdjecie):null} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 408.483 408.483" xmlSpace="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"></path> <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"></path> </g> </g> </g></svg>
                                        </div>
                                    ))}
                                <label >Stan</label>
                                <input name="count" type="number" defaultValue={selectedProduct.stan}  />
                                <button type="submit">Edytuj produkt</button>

                            </>
                        )}
                    </form>
                 
                </>
            )}
        </div>
    );
}

export default Admin;
