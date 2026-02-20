import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import passport from './lib/auth.js';
import logger from './lib/logger.js';
import categoriesRouter from './routes/categories.js';
import productsRouter from './routes/products.js';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(
  pinoHttp({
    logger,
    autoLogging: {
      ignore: (req) => req.url === '/health',
    },
  })
);
app.use(passport.initialize());

app.get('/', (_req: Request, res: Response): void => {
  res.json({ message: 'Product Catalog API' });
});

app.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok' });
});

app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Server started');
});
