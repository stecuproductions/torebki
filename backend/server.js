import express from 'express';
import multer from "multer";
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import pkg from 'pg';

const { Client } = pkg;

dotenv.config();

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
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

// Konfiguracja `multer` do przesyłania plików
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            // Pobierz ID produktu, jeśli istnieje
            let result = await db.query('SELECT id FROM products ORDER BY id DESC LIMIT 1');
            let newId = result.rows.length ? result.rows[0].id + 1 : 0;

            const uploadPath = path.join(__dirname, `uploads/products/p${newId}`);
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        } catch (error) {
            console.error("Błąd przy tworzeniu folderu:", error);
            cb(error, null);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// **📌 Pobieranie produktów z bazy**
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

// **📌 Logowanie admina**
app.post("/api/login", async (req, res) => {
    try {
        const { password } = req.body;
        if (password === process.env.ADMIN_PASSWORD) {
            res.json({ ok: true });
        } else {
            res.status(401).json({ ok: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

// **📌 Dodawanie produktu do bazy + przesyłanie zdjęć**
app.post("/api/add-product", upload.array("images", 4), async (req, res) => {
    try {
        const { name, price, description, stan } = req.body;
        if (!name || !price || !description || !stan) {
            return res.status(400).json({ error: "Brak wymaganych danych!" });
        }

        const result = await db.query(
            'INSERT INTO products (nazwa, cena, opis, stan) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, price, description, stan]
        );
        const productId = result.rows[0].id;

        const productFolder = `uploads/products/p${productId}`;
        if (!fs.existsSync(productFolder)) {
            fs.mkdirSync(productFolder, { recursive: true });
        }

        const imagePaths = req.files.map((file, index) => {
            const newImagePath = `/uploads/products/p${productId}/p${productId}_${index}.JPG`;

            // Przeniesienie pliku do właściwego folderu
            fs.renameSync(file.path, path.join(__dirname, newImagePath));

            return newImagePath;
        });

        await Promise.all(imagePaths.map(imgPath =>
            db.query('INSERT INTO images (img_path, prod_id) VALUES ($1, $2)', [imgPath, productId])
        ));

        res.json({ success: true, message: "Produkt dodany!", productId, images: imagePaths });

    } catch (error) {
        console.error("Błąd dodawania produktu:", error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Serwer działa na porcie ${PORT}`));
