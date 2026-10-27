
import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";

export const metadata: Metadata = {
  title: "SHOP",
  description: "Modern e-commerce platform",
  verification: {
    google: "bvQJXtkv86hyBVOrHLRVfOtDAWSAS9PJSHzoI8Odt48",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
