import express from 'express';
import multer from 'multer';
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
    ssl: {
        rejectUnauthorized: false,
    },
});

db.connect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const productId = req.productId;
        const folderPath = path.join(__dirname, `uploads/products/p${productId}`);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, `p${req.productId}_${Date.now()}.webp`);
    },
});

const upload = multer({ storage });

const generateProductId = async (req, res, next) => {
    try {
        const firstResult = await db.query('SELECT COUNT(*) AS count FROM products');
        const count = parseInt(firstResult.rows[0].count);
        
        if (count === 0) {
            const result = await db.query('SELECT nextval(\'"public"."Products_id_seq"\') AS id');
            req.productId = result.rows[0].id;
        } else {
            const result = await db.query('SELECT MAX(id) AS id FROM products');
            req.productId = result.rows[0].id + 1;
        }

        next();
    } catch (error) {
        console.error("Błąd pobierania ID produktu:", error);
        return res.status(500).json({ error: "Błąd serwera podczas generowania ID produktu" });
    }
};

app.get("/api/produkty", async (req, res) => {
    try {
        const result = (await db.query('SELECT * FROM products')).rows;
        if (result.length === 0) {
            return res.json([]);
        }

        const products = await Promise.all(result.map(async (product) => {
            const imagesResult = await db.query('SELECT img_path FROM images WHERE prod_id = $1', [product.id]);
            return {
                ...product,
                zdjecia: imagesResult.rows.map(row => row.img_path),
            };
        }));

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

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

app.post("/api/add-product", generateProductId, upload.array("images", 4), async (req, res) => {
    try {
        const { name, price, description, count, password } = req.body;
        if (password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ error: "Niepoprawne hasło" });
        }

        if (!name || !price || !description) {
            return res.status(400).json({ error: "Brak wymaganych pól" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "Brak przesłanych plików" });
        }

        const filePaths = req.files.map(file => `/uploads/products/p${req.productId}/${file.filename}`);

        const result = await db.query(
            "INSERT INTO products (nazwa, cena, opis, stan) VALUES ($1, $2, $3, $4) RETURNING id",
            [name, price, description, parseInt(count)]
        );

        const productId = result.rows[0].id;

        await Promise.all(
            filePaths.map(filePath => db.query("INSERT INTO images (prod_id, img_path) VALUES ($1, $2)", [productId, filePath]))
        );

        res.json({ success: true, message: "Produkt i pliki zapisane!", images: filePaths });
    } catch (error) {
        console.error("Błąd zapisu produktu:", error);
        res.status(500).json({ error: "Błąd serwera podczas zapisu produktu" });
    }
});

app.post("/api/edit-product", upload.array("images", 4),async (req, res) => {
    const { name, price, description, count, password, productId } = req.body;
    let { existingImages } = req.body;
    const paths = JSON.parse(existingImages).map(image => image.replace(`${process.env.API_URL}`, ""))
        .filter(image => image !== "");

    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Niepoprawne hasło" });
    }

    try {
        await db.query("UPDATE products SET nazwa=$1, cena=$2, opis=$3, stan=$4 WHERE id=$5", [name, price, description, parseInt(count), productId]);

        await db.query(
            "DELETE FROM images WHERE img_path NOT IN (" + paths.map((_, i) => `$${i + 1}`).join(", ") + ") AND prod_id = $" + (paths.length + 1),
            [...paths, productId]
        );

        const folderPath= path.join(__dirname, `uploads/products/${paths[0].split("/")[3]}`);
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error("Błąd odczytu folderu:", err);
                return res.status(500).json({ error: "Błąd serwera podczas odczytu folderu" });
            }

            files.forEach(file => {
                if (!paths.map(p => p.split("/")[4]).includes(file)) {  
                    const filePath = path.join(folderPath, file);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error("Błąd usuwania pliku:", err);
                            return res.status(500).json({ error: "Błąd serwera podczas usuwania pliku" });
                        }
                    });
                }
                
            });
        });
    
    

        res.json({ success: true, message: "Produkt zaktualizowany!" });
    } catch (error) {
        console.error("Błąd aktualizacji produktu:", error);
        res.status(500).json({ error: "Błąd serwera podczas aktualizacji produktu" });
    }
});


app.post("/api/newsletter", async (req, res) => {
    try{
        const { email } = req.body;
        const test = await db.query('SELECT * FROM newsletter_subscribers WHERE email=$1', [email]);
        if (test.rows.length > 0) {
            return res.status(400).json({ error: "Email już istnieje w bazie" });
        }
        const result = await db.query('INSERT INTO newsletter_subscribers (email, created_at) VALUES ($1, NOW())', [email]);
        return res.status(201).json({ ok: true });
    }
    catch(error){
        console.error("Błąd zapisu do newslettera:", error);
        return res.status(500).json({ error: "Błąd serwera podczas zapisu do newslettera" });
    }

});

const API_TOKEN=process.env.API_TOKEN;
app.get(`/api/newsletterUsers${API_TOKEN}`, async (req, res) => {
    try{
        const result = await db.query('SELECT email, created_at FROM newsletter_subscribers');
        res.json(result.rows);
    }
    catch(error){
        console.error("Błąd pobierania subskrybentów newslettera:", error);
        return res.status(500).json({ error: "Błąd serwera podczas pobierania subskrybentów newslettera" });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Serwer działa na porcie ${PORT}`));
