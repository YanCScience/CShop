'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default function CSRPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchTime, setFetchTime] = useState('');

  const { addToCart } = useCart();

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://dummyjson.com/products/category/womens-dresses');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(data.products);
      setFetchTime(new Date().toLocaleTimeString()); // Indikator Waktu Client Side
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#800000]">Cari Koleksi CShop</h1>
            <p className="text-gray-500 mt-1">Client-Side Rendering (CSR) Implementation</p>
          </div>
          {/* Indikator Visual untuk Dosen */}
          <div className="text-right">
            <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-full border border-green-200 uppercase">
              Fetched at: {fetchTime || '--:--'} (Client)
            </span>
          </div>
        </div>
        
        <input 
          type="text"
          placeholder="Cari dress..."
          className="mt-6 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent shadow-sm transition-all"
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {/* 1. State: Error Handling */}
      {error && (
        <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-red-600 font-medium mb-4">Gagal memuat data dari API DummyJSON.</p>
          <button 
            onClick={fetchProducts}
            className="bg-[#800000] text-white px-6 py-2 rounded-lg hover:bg-[#600000] transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* 2. State: Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* 3. State: Success & Empty State */}
      {!loading && !error && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-5xl block mb-4">🔍</span>
              <p className="text-gray-400 italic">Produk "{search}" tidak ditemukan di katalog kami.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => (
                <div key={item.id} className="group bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="overflow-hidden rounded-lg mb-4">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <h2 className="text-sm font-semibold text-gray-800 h-10 overflow-hidden line-clamp-2">{item.title}</h2>
                  <p className="text-[#800000] font-bold mt-2 text-lg">${item.price}</p>
                  
                  <button 
                    onClick={() => addToCart(item)}
                    className="mt-4 w-full bg-[#800000] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#600000] active:scale-95 transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}