// app/csr/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function CSRPage() {
  const [products, setProducts] = useState([]);
  const { addToWishlist } = useCart();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/womens-dresses?limit=4')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#800000] mb-8">Explore</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((item: any) => (
          <div key={item.id} className="border p-4 rounded bg-white">
            <img src={item.thumbnail} alt={item.title} className="h-40 w-full object-cover mb-4" />
            <h2 className="text-sm font-semibold truncate">{item.title}</h2>
            <button
              onClick={() => addToCart(item)} // Panggil fungsi ini!
              className="bg-[#800000] text-white p-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}