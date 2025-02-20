import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Client } = pkg;


dotenv.config()

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, 
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.get("/api/produkty", async (req, res) => {
    try {
        const result = (await db.query('SELECT * FROM products')).rows;

        const products = await Promise.all(result.map(async product => {
            const imagesResult = await db.query('SELECT img_path FROM images WHERE prod_id = $1', [product.id]);
            return { 
                ...product, 
                zdjecia: imagesResult.rows.map(row => row.img_path) 
            };
        }));


        res.json(products); 
    }   
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

app.post("/api/login", async (req, res) => {
    try{
        const {password}= req.body;
        if (password === process.env.ADMIN_PASSWORD) {
            res.json({ ok: true });
        } else {
            res.status(401).json({ ok: false });
        }
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});






const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Serwer działa na porcie ${PORT}`));

