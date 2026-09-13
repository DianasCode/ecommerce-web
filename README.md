# Ecommerce Platform

A full-stack e-commerce demo built with a NestJS backend and a Next.js storefront.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)

## Overview

This project implements a simple online store: a product catalog with categories, a persistent shopping cart, and a checkout flow that saves orders to a database.

## Tech Stack

**Backend** (`/backend`)
- NestJS 11
- Prisma ORM (with the `pg` driver adapter)
- PostgreSQL

**Frontend** (`/web`)
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS

## Features

- Product catalog fetched from a live API
- Category pages that filter products by category
- Product detail pages
- Persistent shopping cart (localStorage-backed) with quantity controls
- Checkout flow that creates a real order record (customer name, email, items, totals) in the database
- Order confirmation screen with an order number

## Project Structure

ecommerce-platform/
├── backend/
│ ├── src/
│ │ ├── products/ # Product endpoints (list, detail)
│ │ ├── orders/ # Order creation and retrieval
│ │ └── prisma/ # Prisma service (DB connection)
│ └── prisma/
│ └── schema.prisma # Product and Order models
└── web/
└── src/
├── app/
│ ├── products/ # Product listing + detail pages
│ ├── categories/ # Category listing + filtered pages
│ └── cart/ # Cart + checkout
└── context/
└── CartContext.tsx # Cart state (localStorage)


## Getting Started

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file:

DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce?schema=public"
PORT=4000


Run migrations and start the server:

```bash
npx prisma migrate dev
npm run start:dev
```

The API runs at `http://localhost:4000`.

### 2. Frontend

```bash
cd web
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint         | Description                  |
|--------|-------------------|-------------------------------|
| GET    | `/products`       | List all products             |
| GET    | `/products/:id`   | Get a single product          |
| POST   | `/orders`         | Create an order (checkout)    |
| GET    | `/orders`         | List all orders               |
| GET    | `/orders/:id`     | Get a single order            |

## Roadmap

- [ ] Connect homepage's featured products to live data
- [ ] Real payment integration (Stripe)
- [ ] Admin dashboard for managing products
- [ ] User accounts / authentication

---

© Ecommerce Platform.