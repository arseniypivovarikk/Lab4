import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/db.json'), 'utf8'));
let nextOrderId = 1;
app.use(cors());
app.use(express.json());
app.get('/api/products', (_req, res) => res.json(db.products));
app.post('/api/orders', (req, res) => {
  const { name, email, quantity } = req.body ?? {};
  if (!name || !email || !String(email).includes('@') || !Number.isFinite(Number(quantity)) || Number(quantity) < 10) {
    return res.status(400).json({ error: 'Укажите имя, корректный email и объём заказа не менее 10 кг.' });
  }
  return res.status(201).json({ id: nextOrderId++, message: 'Заявка принята', order: req.body });
});
app.listen(PORT, () => console.log(`AgroMarket API запущен: http://localhost:${PORT}`));
