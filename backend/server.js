import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Client } = pkg;


dotenv.config({ path: path.resolve('../.env') })

const db = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT || 5432 // Domyślny port PostgreSQL
});


db.connect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const frontendPath = path.join(__dirname, '../Frontend/dist');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath));





app.get("/api/produkty", async (req, res) => {
    console.log("Pobieranie produktów z bazy danych");
    const produkty = [
             { key:0, opis:"Torebka czarna 100% Denim", id: 0, nazwa: "Torebka Denim Czarno szara", cena: "1 000,00", zdjecia: [
                "/images/_MG_0508.JPG",
                "/images/_MG_0228.JPG",
                 "/images/_MG_0526.JPG"
        
             ]},
            
             {key: 1, opis:"",  id: 1, nazwa: "Torebka Denim Szara", cena: "800,00", zdjecia: [
                 "/images/_MG_0078.JPG",
                "/images/_MG_0228.JPG",
             ]},
            
             { key: 2, opis:"", id: 2, nazwa: "Torebka Denim Czarna", cena: "900,00", zdjecia: [
                 "/images/_MG_0241.JPG",
                 "images/_MG_0394.JPG",
             ] },
         ];
        
        res.json(produkty);
});
 





app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));   
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Serwer działa na http://localhost:${PORT}`));
