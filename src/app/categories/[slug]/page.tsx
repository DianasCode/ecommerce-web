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

const categoryNames: Record<string, string> = {
  electronics: "Electronics",
  "home-living": "Home & Living",
  fashion: "Fashion",
  sports: "Sports",
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { cartCount } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    async function loadCategory() {
      const { slug } = await params;

      setSlug(slug);

      const categoryName = categoryNames[slug];

      if (!categoryName) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data: Product[] = await response.json();

        const filteredProducts = data.filter(
          (product) => product.category === categoryName
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.error(error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [params]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-zinc-500">Loading category...</p>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Category not found
          </h1>

          <Link
            href="/categories"
            className="mt-6 inline-block rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white"
          >
            Back to categories
          </Link>
        </div>
      </main>
    );
  }

  const categoryName = categoryNames[slug];

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
            <Link href="/" className="hover:text-zinc-500">
              Home
            </Link>

            <Link href="/products" className="hover:text-zinc-500">
              Products
            </Link>

            <Link
              href="/categories"
              className="text-zinc-500"
            >
              Categories
            </Link>

            <Link href="/cart" className="hover:text-zinc-500">
              Cart ({cartCount})
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Link
          href="/categories"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-950"
        >
          ← Back to categories
        </Link>

        <div className="mt-8">
          <p className="text-sm font-medium text-zinc-500">
            Category
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {categoryName}
          </h1>

          <p className="mt-4 text-zinc-600">
            Browse our {categoryName.toLowerCase()} products.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-zinc-200 p-10 text-center">
            <p className="text-zinc-500">
              No products in this category yet.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:shadow-md"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="flex aspect-square items-center justify-center bg-zinc-100">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-zinc-400">
                        Product image
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-6">
                  <p className="text-sm text-zinc-500">
                    {product.category}
                  </p>

                  <h2 className="mt-2 text-lg font-semibold">
                    {product.name}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-medium">
                      ${Number(product.price).toFixed(2)}
                    </span>

                    <Link
                      href={`/products/${product.id}`}
                      className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
