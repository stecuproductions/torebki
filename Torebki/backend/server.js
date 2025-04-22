import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import cors from 'cors';

//DB CONFIG
const { Client } = pkg;
dotenv.config();
const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
db.connect();

//FILEPATHS CONFIG
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//EXPRESS CONFIG
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // jeśli używasz cookies itp.
  }));app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//MULTER CONFIG
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/products/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);

    }
});

const upload = multer({storage: storage});




//INITIALIZE PRODUCTS ROUTE
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






//Admin panel

app.post("/api/addProduct", upload.array('files', 4), async (req, res) => {
    try{
        const { id } = req.body;
        const files = req.files.map((file) => {
            return `/uploads/products/${file.originalname}`;
        }); 

        const values = files.map((file, index) => {
            return `($1, $${index + 2})`;
        });

        const params=[id, ...files];



        const result = await db.query(`INSERT INTO images (prod_id, img_path) VALUES ${values}`, params);
        return res.status(201).json({ ok: true });
    }
    catch(error){
        console.error("Błąd zapisu do newslettera:", error);
        return res.status(500);
    }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Serwer działa na porcie ${PORT}`));
