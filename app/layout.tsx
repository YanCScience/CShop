import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <CartProvider>
          <nav className="p-5 bg-[#800000] text-white flex justify-between items-center sticky top-0 z-50">
            <Link href="/" className="font-bold text-xl italic">D4RL COLLECTION</Link>
            <div className="flex gap-6 text-sm uppercase tracking-widest">
              <Link href="/ssg">Katalog (SSG)</Link>
              <Link href="/ssr">Terbaru (SSR)</Link>
              <Link href="/csr">Cari (CSR)</Link>
            </div>
          </nav>
          <main className="min-h-screen">{children}</main>
          <footer className="p-4 bg-white border-t text-center text-xs text-gray-400">
            © 2026 Diyani Rahayu Nur'aeni - UNSIL
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}