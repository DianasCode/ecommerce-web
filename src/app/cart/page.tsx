"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

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

  async function handleCheckout() {
    setErrorMsg("");

    if (!customerName.trim() || !customerEmail.trim()) {
      setErrorMsg("Please enter your name and email.");
      return;
    }

    setPlacing(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const order = await response.json();
      setOrderId(order.id);
      clearCart();
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong placing your order. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  if (orderId !== null) {
    return (
      <main className="min-h-screen bg-white text-zinc-950">
        <header className="border-b border-zinc-200">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
            <Link href="/" className="text-xl font-bold tracking-tight">
              SHOP
            </Link>
          </div>
        </header>

        <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center lg:px-8">
          <h1 className="text-3xl font-semibold">Order confirmed 🎉</h1>

          <p className="mt-4 text-zinc-600">
            Thank you! Your order <span className="font-medium">#{orderId}</span> has
            been received. We&apos;ll send a confirmation to {customerEmail}.
          </p>

          <Link
            href="/products"
            className="mt-10 inline-block rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

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

            <Link href="/cart" className="text-zinc-500">
              Cart ({totalItems})
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <p className="text-sm font-medium text-zinc-500">Shopping</p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Your cart</h1>

        {cartItems.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-zinc-200 p-12 text-center">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>

            <p className="mt-3 text-zinc-500">
              Add some products to your cart to get started.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-block rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
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
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-100">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-zinc-400">Image</span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-zinc-500">Product</p>

                        <h2 className="mt-1 font-semibold">{item.name}</h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-zinc-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center rounded-full border border-zinc-300">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-4 py-2 text-lg hover:bg-zinc-100"
                        >
                          −
                        </button>

                        <span className="min-w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-4 py-2 text-lg hover:bg-zinc-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-zinc-200 p-6">
              <h2 className="text-lg font-semibold">Order summary</h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="border-t border-zinc-200 pt-4">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <input
                  type="text"
                  placeholder="Full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-500"
                />

                <input
                  type="email"
                  placeholder="Email address"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-500"
                />
              </div>

              {errorMsg && (
                <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
              )}

              <button
                type="button"
                onClick={handleCheckout}
                disabled={placing}
                className="mt-6 w-full rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
              >
                {placing ? "Placing order..." : "Checkout"}
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