'use client';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CartDrawer() {
  const { cart, totalItems, removeFromCart, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Menghitung total item (quantity) agar angka di icon akurat
  const totalItems = cart.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);

  return (
    <>
      {/* Tombol Keranjang di Navbar */}
      <button onClick={() => setIsOpen(true)} className="relative p-2">
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-[#800000] rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold border-2 border-[#800000]">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop gelap */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          {/* Konten Drawer */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col transform transition-transform duration-300">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-xl font-bold text-[#800000]">Keranjang CShop</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-[#800000] font-bold text-2xl transition-colors">
                ×
              </button>
            </div>

            {/* List Produk */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <span className="text-5xl mb-4">🛍️</span>
                  <p className="italic">Wah, keranjangmu masih kosong nih.</p>
                </div>
              ) : (
                cart.map((item: any) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 items-center">
                    <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-[#800000] font-bold mt-1">
                        ${item.price} <span className="text-gray-400 font-normal">x {item.quantity || 1}</span>
                      </p>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-[10px] text-red-500 hover:text-red-700 font-medium uppercase tracking-tighter mt-2 inline-block"
                      >
                        Hapus Barang
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            <div className="border-t pt-6 mt-4">
              <div className="flex justify-between items-center font-bold text-xl mb-6">
                <span className="text-gray-600 text-sm uppercase tracking-widest">Total Bayar</span>
                <span className="text-[#800000]">${totalPrice.toFixed(2)}</span>
              </div>
              <button 
                className="w-full bg-[#800000] text-white py-4 rounded-xl font-bold tracking-[0.2em] hover:bg-[#600000] transition-all active:scale-95 shadow-lg"
                onClick={() => alert('Fitur Checkout akan segera hadir!')}
              >
                CHECKOUT SEKARANG
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}