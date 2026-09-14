"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

const categories = [
  {
    name: "Electronics",
    description: "Smart devices and accessories",
  },
  {
    name: "Home & Living",
    description: "Everything for your space",
  },
  {
    name: "Fashion",
    description: "Everyday essentials",
  },
  {
    name: "Sports",
    description: "Gear for an active lifestyle",
  },
];

const featuredProducts = [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$129.00",
  },
  {
    name: "Minimal Backpack",
    category: "Fashion",
    price: "$79.00",
  },
  {
    name: "Smart Desk Lamp",
    category: "Home & Living",
    price: "$59.00",
  },
];

export default function Home() {
  const { cartCount } = useCart();

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            SHOP
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link
              href="/"
              className="hover:text-zinc-500"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="hover:text-zinc-500"
            >
              Products
            </Link>

            <Link
              href="/categories"
              className="hover:text-zinc-500"
            >
              Categories
            </Link>
          </nav>

          <Link
            href="/cart"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100"
          >
            Cart ({cartCount})
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Modern shopping experience
            </p>

            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Everything you need.
              <br />
              Nothing you don&apos;t.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-600">
              Discover carefully selected products for your everyday
              life, from technology and fashion to home and sports.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-full bg-zinc-950 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Explore products
              </Link>

              <Link
                href="/categories"
                className="rounded-full border border-zinc-300 bg-white px-7 py-3.5 text-sm font-medium transition 
hover:bg-zinc-100"
              >
                Browse categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Shop by category
            </h2>
          </div>

          <Link
            href="/categories"
            className="hidden text-sm font-medium underline underline-offset-4 sm:block"
          >
            View all
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.name
                .toLowerCase()
                .replace(/&/g, "")
                .replace(/\s+/g, " ")
                .trim()
                .replaceAll(" ", "-")}`}
              className="group rounded-2xl border border-zinc-200 p-6 transition hover:border-zinc-400 hover:shadow-sm"
            >
              <h3 className="font-semibold">
                {category.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {category.description}
              </p>

              <span className="mt-8 inline-block text-sm font-medium group-hover:underline">
                Shop now →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div>
            <p className="text-sm font-medium text-zinc-500">
              Our selection
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Featured products
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.name}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
              >
                <div className="flex aspect-square items-center justify-center bg-zinc-100">
                  <span className="text-sm text-zinc-400">
                    Product image
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-sm text-zinc-500">
                    {product.category}
                  </p>

                  <h3 className="mt-2 font-semibold">
                    {product.name}
                  </h3>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-medium">
                      {product.price}
                    </span>

                    <Link
                      href="/products"
                      className="text-sm font-medium underline underline-offset-4"
                    >
                      View product
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center 
sm:justify-between lg:px-8">
          <p>© 2026 SHOP. All rights reserved.</p>

          <p>
            Built as a production-ready e-commerce platform.
          </p>
        </div>
      </footer>
    </main>
  );
}
