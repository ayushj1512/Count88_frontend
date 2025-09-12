"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import CartDrawer from "./CartDrawer";
import { useCartStore } from "../store/cartStore";
import type { CartItem } from "../store/cartStore";

export default function Header() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItems = useCartStore((state: { items: CartItem[] }) => state.items);
  const cartCount = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  const handleNavClick = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };

  const promoText =
    '| AVAIL EXTRA 15% OFF - USE CODE "FESTIVE15" | CLEARANCE SALE | FREE SHIPPING OVER ₹999 | LIMITED TIME OFFER |';

  const navItems = [
    { label: "NEW ARRIVAL", link: "/new" },
    { label: "HEELS", submenu: ["Heels", "Block Heel", "Court Shoes", "Pumps", "Wedges"] },
    { label: "FLATS", submenu: ["Belly", "Slipper & Slides"] },
    { label: "SHOES", submenu: ["Casuals", "Sports", "Sneakers"] },
    { label: "BOOTS", link: "/boots" },
    { label: "BRIDAL", submenu: ["Shoes", "Sandal", "Belly", "Pumps"] },
    { label: "SALE", link: "/sale", highlight: true },
    { label: "ABOUT US", link: "/about" },
  ];

  return (
    <>
      {/* Top Moving Promo Bar */}
      <div className="w-full bg-[#620a1b] text-white text-xs sm:text-sm py-1 overflow-hidden">
        <div className="relative flex overflow-x-auto scrollbar-thin">
          <div className="animate-marquee flex whitespace-nowrap">
            <span className="mx-4">{promoText}</span>
          </div>
          <div className="animate-marquee2 absolute top-0 flex whitespace-nowrap"></div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <header className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4">
          {/* Left: Logo + Brand */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onClick={() => handleNavClick("/")}
          >
            <Image
              src="/assets/logo1.png"
              alt="Count88 Logo"
              width={50}
              height={50}
              className="object-contain"
              priority
            />
            <span className="text-xl sm:text-3xl md:text-4xl tracking-wide count88-font" style={{ color: "#7a0d2e" }}>
              Count88
            </span>
          </div>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex gap-4 lg:gap-8 text-xs sm:text-sm md:text-base font-medium text-black relative">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.submenu ? item.label : null)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => item.link ? handleNavClick(item.link) : undefined}
                  className={`hover:text-gray-600 text-sm ${item.highlight ? "text-red-800 hover:text-red-900" : ""}`}
                >
                  {item.label}
                </button>

                {item.submenu && openDropdown === item.label && (
                  <div className="absolute left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md z-50 min-w-[140px]">
                    <ul className="flex flex-col py-1">
                      {item.submenu.map((sub) => (
                        <li
                          key={sub}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() =>
                            handleNavClick(`/${item.label.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, "-")}`)
                          }
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Icons & Mobile Menu */}
          <div className="flex items-center gap-4 sm:gap-6 text-lg" style={{ color: "#7a0d2e" }}>
            <FaSearch className="cursor-pointer hover:text-black" onClick={() => handleNavClick("/search")} />
            <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
              <FaShoppingBag className="hover:text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#7a0d0d] text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <ul className="flex flex-col py-2 text-sm">
              {navItems.map((item) => (
                <li key={item.label} className="px-4 py-2">
                  {item.submenu ? (
                    <details>
                      <summary className="cursor-pointer font-semibold">{item.label}</summary>
                      <ul className="pl-4 mt-1 flex flex-col gap-1">
                        {item.submenu.map((sub) => (
                          <li
                            key={sub}
                            className="cursor-pointer hover:text-red-700"
                            onClick={() =>
                              handleNavClick(`/${item.label.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, "-")}`)
                            }
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <button className="w-full text-left" onClick={() => handleNavClick(item.link!)}>
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        .count88-font {
          font-family: 'Great Vibes', cursive;
        }

        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-200%); }
        }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-marquee2 { animation: marquee2 40s linear infinite; }

        .scrollbar-thin::-webkit-scrollbar { height: 4px; width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #7a0d2e; border-radius: 9999px; }
        .scrollbar-thin::-webkit-scrollbar-track { background-color: #7a0d2e; }
      `}</style>
    </>
  );
}
