'use client';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CartDrawer() {
  const { cart, removeFromCart, totalPrice, totalItems, addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tombol Keranjang di Navbar */}
      <button onClick={() => setIsOpen(true)} className="relative p-2 flex items-center">
        <span className="text-2xl">🛒</span>
        {/* Sekarang pakai totalItems dari context */}
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-[#800000] rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold border-2 border-[#800000]">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col transform transition-transform duration-300">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-xl font-bold text-[#800000]">CShop Cart</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-[#800000] font-bold text-2xl">
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <span className="text-5xl mb-4">🛍️</span>
                  <p className="italic">Keranjangmu masih kosong nih.</p>
                </div>
              ) : (
                cart.map((item: any) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 items-center">
                    <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-[#800000] font-bold mt-1">
                        ${item.price} <span className="text-gray-400 font-normal">x {item.quantity || 1}</span>
                      </p>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-[10px] text-red-500 hover:text-red-700 font-medium uppercase mt-2"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-6 mt-4">
              <div className="flex justify-between items-center font-bold text-xl mb-6">
                <span className="text-gray-600 text-sm uppercase">Total Bayar</span>
                <span className="text-[#800000]">${totalPrice.toFixed(2)}</span>
              </div>
              <button 
                className="w-full bg-[#800000] text-white py-4 rounded-xl font-bold tracking-[0.2em] hover:bg-[#600000] shadow-lg"
                onClick={() => alert('Fitur Checkout akan segera hadir!')}
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}