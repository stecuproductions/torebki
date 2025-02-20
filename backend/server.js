import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Client } = pkg;


dotenv.config({ path: path.resolve('../.env') })

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Railway wymaga SSL
    }
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
                "/images/products/p0/p0_0.JPG",
                "/images/products/p0/p0_1.JPG",
                "/images/products/p0/p0_2.JPG",
        
             ]},
            
             {key: 1, opis:"",  id: 1, nazwa: "Torebka Denim Szara", cena: "800,00", zdjecia: [
                "/images/products/p1/p1_0.JPG",
                "/images/products/p1/p1_1.JPG",
             ]},
         ];
        
        res.json(produkty);
});
 





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serwer działa na http://localhost:${PORT}`));
