'use client';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CartDrawer() {
  const { cart, removeFromCart, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tombol Keranjang di Navbar */}
      <button onClick={() => setIsOpen(true)} className="relative p-2">
        🛒 <span className="absolute top-0 right-0 bg-white text-[#800000] rounded-full text-[10px] px-1 font-bold">
          {cart.length}
        </span>
      </button>

      {/* Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-sm bg-white h-full shadow-xl p-6 flex flex-col">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-xl font-bold text-[#800000]">Keranjang Saya</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 font-bold text-xl">×</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 mt-10 italic">Keranjang kosong</p>
              ) : (
                cart.map((item: any) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                      <p className="text-xs text-[#800000] font-bold">${item.price} x {item.quantity}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-500 underline mt-1">Hapus</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span className="text-[#800000]">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full bg-[#800000] text-white py-3 rounded-lg font-bold tracking-widest hover:bg-[#600000] transition-colors">
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}