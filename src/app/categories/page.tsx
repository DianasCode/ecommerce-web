import Link from "next/link";

const categories = [
  {
    slug: "electronics",
    name: "Electronics",
    description: "Smart devices and accessories",
  },
  {
    slug: "home-&-living",
    name: "Home & Living",
    description: "Everything for your space",
  },
  {
    slug: "fashion",
    name: "Fashion",
    description: "Everyday essentials",
  },
  {
    slug: "sports",
    name: "Sports",
    description: "Gear for an active lifestyle",
  },
];

export default function CategoriesPage() {
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

            <Link href="/products" className="hover:text-zinc-500">
              Products
            </Link>

            <Link href="/categories" className="text-zinc-500">
              Categories
            </Link>

            <Link href="/cart" className="hover:text-zinc-500">
              Cart
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-zinc-500">
            Explore
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Categories
          </h1>

          <p className="mt-4 text-zinc-600">
            Browse products by category.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group rounded-2xl border border-zinc-200 p-6 transition hover:border-zinc-400 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">
                {category.name}
              </h2>

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
    </main>
  );
}
