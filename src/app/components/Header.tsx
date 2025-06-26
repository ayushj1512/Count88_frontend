"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import CartDrawer from "./CartDrawer";
import { useCartStore } from "../store/cartStore";
import type { CartItem } from "../store/cartStore";

export default function Header() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const cartItems = useCartStore((state: { items: CartItem[] }) => state.items);
  const cartCount = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  const shopByBrands = [
    "Faber-Castell",
    "Winsor & Newton",
    "Princeton",
    "Canson",
    "Pourfect",
    "more",
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  const handleBrandClick = (brand: string) => {
    router.push(`/brand/${brand.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <>
      <div className="sticky top-0 z-30 bg-white shadow-md">
        <header className="flex items-center justify-between px-6 lg:px-10 py-4 bg-[#FFF2E1]">
          {/* Logo */}
          <div
            className="text-3xl font-extrabold text-gray-800 cursor-pointer tracking-wide"
            onClick={() => handleNavClick("/")}
          >
            <span className="text-black">CRAF</span>
            <span className="text-red-600">TЯA</span>
          </div>

          {/* Navigation */}
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


            {/* Shop By Brands Dropdown */}
            <div className="relative group">
              <button className="hover:underline font-medium cursor-pointer whitespace-nowrap">
                Shop By Brands
              </button>
              <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-md rounded-md border border-gray-200 z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 ease-in-out">
                {shopByBrands.map((brand, index) => (
                  <button
                    key={index}
                    onClick={() => handleBrandClick(brand)}
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-[#A5CDD9] hover:pl-5 transition-all duration-200"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => handleNavClick("/about")} className="hover:underline">
              About Us
            </button>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 text-gray-700 text-xl">
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
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
