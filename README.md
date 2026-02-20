# inno-endpoints

Express API с TypeScript, Prisma и PostgreSQL.

## Установка

```bash
npm install
cp .env.example .env
# Отредактируйте .env с вашими данными PostgreSQL
```

## База данных

```bash
# Применить миграции
npm run db:migrate

# Или синхронизировать схему без миграций (для разработки)
npm run db:push

# Открыть Prisma Studio
npm run db:studio
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск в режиме разработки |
| `npm run build` | Сборка TypeScript |
| `npm start` | Запуск production сервера |
| `npm run lint` | Проверка ESLint |
| `npm run format` | Форматирование Prettier |
| `npm run db:migrate` | Создать миграцию |
| `npm run db:push` | Синхронизировать схему |
| `npm run db:studio` | Открыть Prisma Studio |

## API Endpoints

### Categories
- `GET /api/categories` — список категорий
- `GET /api/categories/:id` — категория с товарами
- `POST /api/categories` — создать категорию
- `PUT /api/categories/:id` — обновить категорию
- `DELETE /api/categories/:id` — удалить категорию

### Products
- `GET /api/products` — список товаров (фильтры: `categoryId`, `active`)
- `GET /api/products/:id` — один товар
- `POST /api/products` — создать товар
- `PUT /api/products/:id` — обновить товар
- `DELETE /api/products/:id` — удалить товар

## Структура проекта

```
src/
├── index.ts           # Точка входа
├── lib/
│   └── prisma.ts      # Prisma клиент
└── routes/
    ├── categories.ts  # Роуты категорий
    └── products.ts    # Роуты товаров
prisma/
└── schema.prisma      # Схема базы данных
```
