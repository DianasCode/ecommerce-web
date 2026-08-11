"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseQuantity = (id: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );

    updateCart(updatedItems);
  };

  const decreaseQuantity = (id: number) => {
    const updatedItems = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedItems);
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);

    updateCart(updatedItems);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = subtotal === 0 ? 0 : subtotal >= 100 ? 0 : 10;

  const total = subtotal + shipping;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

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
              className="text-zinc-500"
            >
              Cart ({totalItems})
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div>
          <p className="text-sm font-medium text-zinc-500">
            Shopping
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Your cart
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-zinc-200 p-12 text-center">
            <h2 className="text-2xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-3 text-zinc-500">
              Add some products to your cart to get started.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-block rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition 
hover:bg-zinc-800"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-5 rounded-2xl border border-zinc-200 p-5"
                >
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                    <span className="text-xs text-zinc-400">
                      Image
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-zinc-500">
                          Product
                        </p>

                        <h2 className="mt-1 font-semibold">
                          {item.name}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-zinc-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center rounded-full border border-zinc-300">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="px-4 py-2 text-lg hover:bg-zinc-100"
                        >
                          −
                        </button>

                        <span className="min-w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="px-4 py-2 text-lg hover:bg-zinc-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-medium">
                        $
                        {(item.price * item.quantity).toFixed(
                          2,
                        )}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-zinc-200 p-6">
              <h2 className="text-lg font-semibold">
                Order summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">
                    Items
                  </span>

                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">
                    Subtotal
                  </span>

                  <span>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">
                    Shipping
                  </span>

                  <span>
                    {shipping === 0
                      ? "Free"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-zinc-200 pt-4">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>

                    <span>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={cartItems.length === 0}
                className="mt-8 w-full rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-medium text-white transition 
hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
              >
                Checkout
              </button>

              <Link
                href="/products"
                className="mt-4 block text-center text-sm font-medium underline underline-offset-4"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

