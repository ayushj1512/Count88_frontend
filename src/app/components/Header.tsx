"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import Image from "next/image";
import CartDrawer from "./CartDrawer";
import { useCartStore } from "../store/cartStore";
import type { CartItem } from "../store/cartStore";

export default function Header() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useCartStore((state: { items: CartItem[] }) => state.items);
  const cartCount = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  const promoText =
    '| AVAIL EXTRA 15% OFF - USE CODE "FESTIVE15" | CLEARANCE SALE | FREE SHIPPING OVER ₹999 | LIMITED TIME OFFER |';

  return (
    <>
      {/* Top Moving Promo Bar */}
      <div className="w-full bg-[#7a0d2e] text-white text-sm py-2 overflow-hidden">
        <div className="relative flex overflow-x-auto scrollbar-thin scrollbar-thumb-[#7a0d0d] scrollbar-track-[#6c0000ff]">
          <div className="animate-marquee flex whitespace-nowrap w-1/2">
            <span className="mx-4">{promoText}</span>
          </div>
          <div className="animate-marquee2 absolute top-0 flex whitespace-nowrap w-1/2"></div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <header className="flex items-center justify-between px-6 lg:px-12 py-4">
          {/* Left: Logo + Brand Name */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick("/")}
          >
            <Image
              src="/logo1.png" // place logo1.jpg inside /public
              alt="Count88 Logo"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
            <span
              className="text-xl font-extrabold tracking-wide"
              style={{ color: "#7a0d2e" }}
            >
              COUNT88
            </span>
          </div>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-black">
            <button
              onClick={() => handleNavClick("/categories")}
              className="hover:text-gray-600  font-extrabold"
            >
              ALL CATEGORIES
            </button>
            <button
              onClick={() => handleNavClick("/new")}
              className="hover:text-gray-600 font-extrabold"
            >
              NEW IN
            </button>
            <button
              onClick={() => handleNavClick("/footwear")}
              className="hover:text-gray-600  font-extrabold"
            >
              MEN
            </button>
            <button
              onClick={() => handleNavClick("/purses")}
              className="hover:text-gray-600 font-extrabold"
            >
              WOMEN
            </button>
            <button
              onClick={() => handleNavClick("/sale")}
              className="text-red-800 hover:text-red-900 font-extrabold"
            >
              SALE
            </button>
          </nav>

          {/* Right: Icons */}
          <div
            className="flex items-center gap-6 text-lg"
            style={{ color: "#7a0d2e" }}
          >
            <FaSearch
              className="cursor-pointer hover:text-black"
              onClick={() => handleNavClick("/search")}
            />
            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <FaShoppingBag className="hover:text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#7a0d0d] text-white text-xs rounded-full px-1.5">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </header>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Animations + Scrollbar Styling */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee2 {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-200%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite; /* slower */
        }
        .animate-marquee2 {
          animation: marquee2 40s linear infinite; /* slower */
        }

        /* Thin Scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px; /* horizontal scrollbar thickness */
          width: 4px; /* vertical scrollbar thickness if needed */
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #7a0d2e;
          border-radius: 9999px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #7a0d2e;
        }
      `}</style>
    </>
  );
}
