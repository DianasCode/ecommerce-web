"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string | null;
};

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const { addToCart, cartCount } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      const { id } = await params;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );

        if (!response.ok) {
          setNotFound(true);
          return;
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params]);

  function handleAddToCart() {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      imageUrl: product.imageUrl,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-zinc-500">Loading product...</p>
      </main>
    );
  }

  if (notFound || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Product not found
          </h1>

          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white"
          >
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            SHOP
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
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
              href="/cart"
              className="hover:text-zinc-500"
            >
              Cart ({cartCount})
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Link
          href="/products"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-950"
        >
          ← Back to products
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-zinc-100">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full rounded-3xl object-cover"
              />
            ) : (
              <span className="text-zinc-400">
                Product image
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium text-zinc-500">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              {product.name}
            </h1>

            <p className="mt-6 text-2xl font-medium">
              ${Number(product.price).toFixed(2)}
            </p>

            <p className="mt-6 max-w-xl leading-7 text-zinc-600">
              {product.description}
            </p>

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-10 w-full rounded-full bg-zinc-950 px-6 py-4 text-sm font-medium text-white transition 
hover:bg-zinc-800 sm:w-fit"
            >
              {added ? "Added to cart ✓" : "Add to cart"}
            </button>

            {added && (
              <Link
                href="/cart"
                className="mt-4 text-sm font-medium underline underline-offset-4"
              >
                Go to cart
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
