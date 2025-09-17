"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useCartStore, CartItem } from "../store/cartStore";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const router = useRouter();

  // ✅ get cart items & actions from store
  const cartItems = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) => s.total)();

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const inc = (item: CartItem) =>
    updateQuantity(item.id, item.quantity + 1, item.size);

  const dec = (item: CartItem) =>
    updateQuantity(item.id, Math.max(1, item.quantity - 1), item.size);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

      <div
        className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white z-50 flex flex-col transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-2 text-lg font-semibold text-[#7a0d2e]">
            <FaShoppingCart />
            Your cart · <span>{cartItems.length} {cartItems.length === 1 ? "item" : "items"}</span>
          </div>
          <button onClick={onClose} className="text-2xl font-light hover:text-[#7a0d2e]">×</button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 pb-24">
          {cartItems.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-gray-600">Your cart is empty.</p>
              <button
                onClick={() => {
                  onClose();
                  router.push("/");
                }}
                className="mt-4 bg-[#7a0d2e] text-white px-4 py-2 rounded hover:bg-[#5f0a23] transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 mb-4 border-b pb-4">
                  <Image src={item.image} alt={item.title} width={60} height={60} className="rounded border" />
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.size && `Size: ${item.size}`}</p>
                    <p className="text-xs text-gray-400">
                      {item.brand && `${item.brand} · `}{item.category && `${item.category} · `}{item.subcategory && `${item.subcategory} · `}{item.gender && item.gender}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dec(item)}
                        className="w-6 h-6 text-lg bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        −
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => inc(item)}
                        className="w-6 h-6 text-lg bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTimes />
                    </button>
                    <p className="font-medium mt-2 text-gray-800">
                      ₹{(item.discountPrice ?? item.price) * item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="w-full bg-gray-100 text-gray-800 py-2 mt-4 rounded hover:bg-gray-200 text-sm font-medium transition"
              >
                Clear Cart
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-medium text-gray-800">₹{total}</p>
            <span className="text-sm text-gray-500">Estimated total</span>
          </div>
          <Link href="/checkout" onClick={onClose}>
            <button
              className={`w-full py-3 rounded text-center font-medium transition ${
                cartItems.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#7a0d2e] text-white hover:bg-[#5f0a23]"
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
