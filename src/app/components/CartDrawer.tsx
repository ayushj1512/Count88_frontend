'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type ProductRecommendation = {
  id: number;
  title: string;
  price: number;
  image: string;
  slug: string;
};

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [recs, setRecs] = useState<ProductRecommendation[]>([]);
  const [showRemove, setShowRemove] = useState(false);
  const [toRemove, setToRemove] = useState<{ index: number; item: CartItem } | null>(null);
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

  useEffect(() => {
    if (isOpen) {
      fetch("/api/bestsellers/route")
        .then((r) => r.json())
        .then(setRecs)
        .catch(console.error);
    }
  }, [isOpen]);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const inc = (i: number) =>
    updateCart(cartItems.map((it, idx) => idx === i ? { ...it, quantity: it.quantity + 1 } : it));

  const dec = (i: number) => {
    const it = cartItems[i];
    if (it.quantity > 1) {
      updateCart(cartItems.map((c, idx) => idx === i ? { ...c, quantity: c.quantity - 1 } : c));
    } else {
      setToRemove({ index: i, item: it });
      setShowRemove(true);
    }
  };

  const total = cartItems.reduce((s, it) => s + it.price * it.quantity, 0);

  const confirmRemove = () => {
    if (toRemove) {
      const updated = cartItems.filter((_, i) => i !== toRemove.index);
      updateCart(updated);
      setShowRemove(false);
    }
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}
      <div className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white z-50 flex flex-col transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FaShoppingCart />
            Your cart · <span>{cartItems.length} {cartItems.length === 1 ? "item" : "items"}</span>
          </div>
          <button onClick={onClose} className="text-2xl font-light">×</button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 pb-24">
          {cartItems.length === 0 ? (
            <div className="text-center mt-10">
              <p>Your cart is empty.</p>
              <button
                onClick={() => { onClose(); router.push("/"); }}
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
                    <button onClick={() => { setToRemove({ index: i, item: it }); setShowRemove(true); }} className="text-red-500">
                      <FaTrash />
                    </button>
                    <p className="font-medium mt-2">₹{it.price * it.quantity}</p>
                  </div>
                </div>
              ))}
              <input placeholder="Enter coupon code" className="w-full border rounded p-2 mt-4" />
            </>
          )}

          {/* Recommendations */}
          {recs.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-green-700 border-b pb-1 mb-2">You might also like</h3>
              <div className="grid grid-cols-2 gap-4">
                {recs.slice(0, 4).map((r) => (
                  <div
                    key={r.id}
                    onClick={() => { onClose(); router.push(`/product/${r.slug}`); }}
                    className="cursor-pointer border rounded p-2 text-sm hover:shadow"
                  >
                    <Image src={r.image} alt={r.title} width={100} height={100} className="rounded" />
                    <p className="mt-1 line-clamp-2">{r.title}</p>
                    <p className="font-semibold">₹{r.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Checkout Footer */}
        {!showRemove && (
          <div className="p-4 border-t bg-white">
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-medium">₹{total}</p>
              <span className="text-sm text-gray-500">Estimated total</span>
            </div>
            <button className="w-full bg-black text-white py-3 rounded text-center font-medium">Checkout</button>
          </div>
        )}

        {/* Confirm Remove Bottom Modal */}
        {showRemove && toRemove && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t z-50 shadow-lg">
            <div className="p-4 relative">
              <button
                onClick={() => setShowRemove(false)}
                className="absolute top-2 right-3 text-gray-400 hover:text-black text-lg"
              >
                ×
              </button>

              <p className="text-sm font-medium mb-4">
                Do you want to remove {toRemove.item.quantity} {toRemove.item.quantity === 1 ? "item" : "items"}?
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={toRemove.item.image}
                    alt={toRemove.item.title}
                    width={60}
                    height={60}
                    className="rounded-md border w-16 h-16 object-contain"
                  />
                  <div className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {toRemove.item.quantity}
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">{toRemove.item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">0.5mm / Black</p>
                </div>

                <p className="text-sm font-medium">₹{toRemove.item.price}</p>
              </div>

              <button
                onClick={() => {
                  confirmRemove();
                  onClose(); // optionally keep drawer open if you prefer
                }}
                className="w-full bg-black text-white text-sm mt-6 py-3 rounded-full"
              >
                Remove and go back to store
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
