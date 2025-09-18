"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && isOpen) {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(stored);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const inc = (i: number) =>
    updateCart(
      cartItems.map((it, idx) =>
        idx === i ? { ...it, quantity: it.quantity + 1 } : it
      )
    );

  const dec = (i: number) =>
    updateCart(
      cartItems.map((it, idx) => {
        if (idx === i) return { ...it, quantity: Math.max(1, it.quantity - 1) };
        return it;
      })
    );

  const removeItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    updateCart(updated);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const total = cartItems.reduce((s, it) => s + it.price * it.quantity, 0);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white z-50 flex flex-col transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FaShoppingCart />
            Your cart · <span>{cartItems.length} {cartItems.length === 1 ? "item" : "items"}</span>
          </div>
          <button onClick={onClose} className="text-2xl font-light">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-24">
          {cartItems.length === 0 ? (
            <div className="text-center mt-10">
              <p>Your cart is empty.</p>
              <button
                onClick={() => {
                  onClose();
                  router.push("/");
                }}
                className="mt-4 bg-black text-white px-4 py-2 rounded"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((it, i) => (
                <div key={i} className="flex items-start gap-4 mb-4">
                  <Image src={it.image} alt={it.title} width={60} height={60} className="rounded border" />
                  <div className="flex-grow">
                    <p className="font-medium">{it.title}</p>
                    <p className="text-sm text-gray-500">0.5mm / Black</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => dec(i)} className="w-6 h-6 text-lg bg-gray-200 rounded">−</button>
                      <span>{it.quantity}</span>
                      <button onClick={() => inc(i)} className="w-6 h-6 text-lg bg-gray-200 rounded">+</button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button onClick={() => removeItem(i)} className="text-red-500">
                      <FaTimes />
                    </button>
                    <p className="font-medium mt-2">₹{it.price * it.quantity}</p>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="w-full bg-gray-100 text-gray-800 py-2 mt-4 rounded hover:bg-gray-200 text-sm font-medium"
              >
                Clear Cart
              </button>
            </>
          )}
        </div>

        <div className="p-4 border-t bg-white">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-medium">₹{total}</p>
            <span className="text-sm text-gray-500">Estimated total</span>
          </div>
          <Link href="/checkout" onClick={onClose}>
            <button
              className={`w-full py-3 rounded text-center font-medium transition ${cartItems.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
                }`}
              disabled={cartItems.length === 0}
            >
              Go to Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
