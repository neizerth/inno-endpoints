import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import categoriesRouter from './routes/categories.js';
import productsRouter from './routes/products.js';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req: Request, res: Response): void => {
  res.json({ message: 'Product Catalog API' });
});

app.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok' });
});

app.use('/api/category', categoriesRouter);
app.use('/api/product', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
