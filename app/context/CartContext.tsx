'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity?: number; // Menambah properti quantity
}

const CartContext = createContext<any>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      // Jika produk sudah ada, tambah quantity-nya dalam array baru
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    }
    // Jika produk baru, buat array baru dengan produk tersebut
    return [...prev, { ...product, quantity: 1 }];
  });
};

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);