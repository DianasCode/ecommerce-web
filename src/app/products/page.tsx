import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string | null;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch("${process.env.NEXT_PUBLIC_API_URL}/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            SHOP
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-zinc-500">
              Home
            </Link>

            <Link href="/products" className="text-zinc-500">
              Products
            </Link>

            <Link href="/cart" className="hover:text-zinc-500">
              Cart (0)
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-zinc-500">Catalog</p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            All products
          </h1>

          <p className="mt-4 text-zinc-600">
            Browse our collection of products across electronics, fashion,
            home and sports.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:shadow-md"
            >
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

              <div className="p-6">
                <p className="text-sm text-zinc-500">{product.category}</p>

                <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>

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
      </section>
    </main>
  );
}
