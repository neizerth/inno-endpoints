import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  console.log('Seeding database...');

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin123',
    },
  });
  console.log('Admin user created:', admin.username);

  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Электроника',
      slug: 'electronics',
    },
  });

  const clothing = await prisma.category.upsert({
    where: { slug: 'clothing' },
    update: {},
    create: {
      name: 'Одежда',
      slug: 'clothing',
    },
  });

  const home = await prisma.category.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      name: 'Дом и сад',
      slug: 'home',
    },
  });

  console.log('Categories created:', { electronics, clothing, home });

  const products = [
    {
      name: 'Смартфон X Pro',
      slug: 'smartphone-x-pro',
      description: 'Флагманский смартфон с отличной камерой',
      price: 79990,
      stock: 50,
      categoryId: electronics.id,
    },
    {
      name: 'Беспроводные наушники',
      slug: 'wireless-headphones',
      description: 'Наушники с активным шумоподавлением',
      price: 12990,
      stock: 100,
      categoryId: electronics.id,
    },
    {
      name: 'Ноутбук Pro 15',
      slug: 'laptop-pro-15',
      description: 'Мощный ноутбук для работы и игр',
      price: 149990,
      stock: 25,
      categoryId: electronics.id,
    },
    {
      name: 'Футболка базовая',
      slug: 'basic-tshirt',
      description: 'Хлопковая футболка унисекс',
      price: 1490,
      stock: 200,
      categoryId: clothing.id,
    },
    {
      name: 'Джинсы классические',
      slug: 'classic-jeans',
      description: 'Классические джинсы прямого кроя',
      price: 4990,
      stock: 80,
      categoryId: clothing.id,
    },
    {
      name: 'Кресло офисное',
      slug: 'office-chair',
      description: 'Эргономичное кресло с поддержкой поясницы',
      price: 24990,
      stock: 30,
      categoryId: home.id,
    },
    {
      name: 'Лампа настольная LED',
      slug: 'led-desk-lamp',
      description: 'Настольная лампа с регулировкой яркости',
      price: 2990,
      stock: 60,
      categoryId: home.id,
    },
  ];

  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    console.log('Product created:', created.name);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
