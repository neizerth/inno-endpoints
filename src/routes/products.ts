import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { authenticate } from '../lib/auth.js';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { categoryId, active } = req.query;

  const where: Record<string, unknown> = {};
  if (categoryId) where.categoryId = Number(categoryId);
  if (active !== undefined) where.isActive = active === 'true';

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  res.json(products);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  });

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  res.json(product);
});

router.post('/', authenticate, async (req: Request, res: Response): Promise<void> => {
  const { name, slug, description, price, stock, isActive, categoryId } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      stock: stock ?? 0,
      isActive: isActive ?? true,
      categoryId,
    },
    include: { category: true },
  });

  res.status(201).json(product);
});

router.put('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, slug, description, price, stock, isActive, categoryId } = req.body;

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name,
      slug,
      description,
      price,
      stock,
      isActive,
      categoryId,
    },
    include: { category: true },
  });

  res.json(product);
});

router.delete('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  await prisma.product.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
});

export default router;
