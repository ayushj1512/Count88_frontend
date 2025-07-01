"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import CartDrawer from "./CartDrawer";
import { useCartStore } from "../store/cartStore";
import type { CartItem } from "../store/cartStore";

export default function Header() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const cartItems = useCartStore((state: { items: CartItem[] }) => state.items);
  const cartCount = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  const handleNavClick = (path: string) => {
    router.push(path);
    setMobileNavOpen(false);
  };

  return (
    <>
      <div className="sticky top-0 z-30 bg-white shadow-md">
        <header className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 bg-[#FFF2E1]">
          {/* Left Section: Hamburger + Logo */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-xl text-gray-800"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open Menu"
            >
              <FaBars />
            </button>

            {/* Logo */}
            <div
              className="text-2xl sm:text-3xl font-extrabold text-gray-800 cursor-pointer tracking-wide font-comic"
              onClick={() => handleNavClick("/")}
            >
              <span className="text-black">CRAF</span>
              <span className="text-red-600">TЯA</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 text-sm xl:text-base text-gray-800 items-center">
            <button onClick={() => handleNavClick("/")} className="hover:underline">
              Home
            </button>
            <button onClick={() => handleNavClick("/collection")} className="hover:underline">
              Collection
            </button>
            <button onClick={() => handleNavClick("/blogs")} className="hover:underline">
              Blogs
            </button>
            <button onClick={() => handleNavClick("/about")} className="hover:underline">
              About Us
            </button>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4 text-gray-700 text-xl lg:gap-6">
            <FaSearch
              className="cursor-pointer hover:text-black"
              onClick={() => setShowSearch(true)}
            />
            <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
              <FaShoppingCart className="hover:text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Side Drawer Navigation */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-40"
              onClick={() => setMobileNavOpen(false)}
            />

            {/* Drawer */}
            <div className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg px-6 py-5 text-gray-800 animate-slide-in-left flex flex-col">
              {/* Logo + Close */}
              <div className="flex items-center justify-between mb-6">
                {/* Logo */}
                <div
                  className="text-2xl font-extrabold tracking-wide font-comic cursor-pointer"
                  onClick={() => handleNavClick("/")}
                >
                  <span className="text-black">CRAF</span>
                  <span className="text-red-600">TЯA</span>
                </div>
                {/* Close button */}
                <button className="text-xl text-gray-600 hover:text-black" onClick={() => setMobileNavOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-4">
                <button
                  onClick={() => handleNavClick("/")}
                  className="py-2 px-2 rounded-md text-left text-base hover:bg-gray-100 transition"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick("/collection")}
                  className="py-2 px-2 rounded-md text-left text-base hover:bg-gray-100 transition"
                >
                  Collection
                </button>
                <button
                  onClick={() => handleNavClick("/blogs")}
                  className="py-2 px-2 rounded-md text-left text-base hover:bg-gray-100 transition"
                >
                  Blogs
                </button>
                <button
                  onClick={() => handleNavClick("/about")}
                  className="py-2 px-2 rounded-md text-left text-base hover:bg-gray-100 transition"
                >
                  About Us
                </button>
              </nav>
            </div>
          </div>
        )}

      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Slide-in animation */}
      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
