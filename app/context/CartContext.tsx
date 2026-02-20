'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const CartContext = createContext<any>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => [...prev, product]);
    alert(`${product.title} ditambahkan ke wishlist!`);
  };

  return (
    <CartContext.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);