import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { authenticate } from '../lib/auth.js';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
  });
  res.json(categories);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
    include: { products: true },
  });

  if (!category) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }

  res.json(category);
});

router.post('/', authenticate, async (req: Request, res: Response): Promise<void> => {
  const { name, slug } = req.body;

  const category = await prisma.category.create({
    data: { name, slug },
  });

  res.status(201).json(category);
});

router.put('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, slug } = req.body;

  const category = await prisma.category.update({
    where: { id: Number(id) },
    data: { name, slug },
  });

  res.json(category);
});

router.delete('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  await prisma.category.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
});

export default router;
