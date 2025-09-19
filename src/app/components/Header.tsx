"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, X, User, Menu, Heart } from "lucide-react";
import Image from "next/image";
import CartDrawer from "./CartDrawer";
import { useCartStore } from "../store/cartStore";
import type { CartItem } from "../store/cartStore";
import { useAuthStore } from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const cartItems = useCartStore((state: { items: CartItem[] }) => state.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const user = useAuthStore((state) => state.user);

  const navItems = [
    { label: "NEW ARRIVAL", link: "/new" },
    { label: "HEELS", submenu: ["Heels", "Block Heel", "Court Shoes", "Pumps", "Wedges"] },
    { label: "FLATS", submenu: ["Bellies", "Slipper & Slides"] },
    { label: "SHOES", submenu: ["Casuals", "Sports", "Sneakers"] },
    { label: "BOOTS", link: "/boots" },
    { label: "BRIDAL", submenu: ["Shoes", "Sandal", "Bellies", "Pumps"] },
    { label: "SALE", link: "/sale", highlight: true },
    { label: "ABOUT US", link: "/about" },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => (user ? router.push("/profile") : router.push("/login"));

  const handleSubNavClick = (category: string, subcategory: string) => {
    const url = `/collection?category=${category}&subcategory=${subcategory}`;
    router.push(url);
    setIsMobileMenuOpen(false);
  };

  const promoText =
    '| AVAIL EXTRA 15% OFF - USE CODE "FESTIVE15" | CLEARANCE SALE | FREE SHIPPING OVER ₹999 | LIMITED TIME OFFER |';

  return (
    <>
      {/* Promo Bar */}
      <div className="w-full bg-[#620a1b] text-white text-xs sm:text-sm py-1 overflow-hidden">
        <div className="relative flex overflow-x-auto scrollbar-thin">
          <div className="animate-marquee flex whitespace-nowrap">
            <span className="mx-4">{promoText}</span>
          </div>
          <div className="animate-marquee2 absolute top-0 flex whitespace-nowrap"></div>
        </div>
      </div>

      {/* Navbar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <header className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4">
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </div>
          {/* Logo */}
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
            <span
              className="text-xl sm:text-3xl md:text-4xl tracking-wide count88-font"
              style={{ color: "#7a0d2e" }}
            >
              Count88
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-4 lg:gap-8 text-xs sm:text-sm md:text-base font-medium text-black relative">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => item.link && handleNavClick(item.link)}
                  className={`${
                    item.highlight ? "text-red-800 hover:text-red-900" : "hover:text-gray-600"
                  } text-sm`}
                >
                  {item.label}
                </button>
                {item.submenu && openDropdown === item.label && (
                  <div className="absolute left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md z-50 min-w-[140px]">
                    <ul className="flex flex-col py-1">
                      {item.submenu.map((sub) => (
                        <li
                          key={sub}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#7a0d2e] font-medium"
                          onClick={() =>
                            handleSubNavClick(
                              item.label.toLowerCase(),
                              sub.toLowerCase().replace(/\s+/g, "-")
                            )
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

          {/* Right Icons */}
          <div className="flex items-center gap-4 sm:gap-6 text-lg" style={{ color: "#7a0d2e" }}>
            <Search
              className="cursor-pointer hover:text-black w-5 h-5 transition-colors"
              onClick={() => handleNavClick("/search")}
            />
            <User
              className="cursor-pointer hover:text-black w-5 h-5 transition-colors"
              onClick={handleProfileClick}
            />
            <Heart
              className="cursor-pointer hover:text-black w-5 h-5 transition-colors"
              onClick={() => handleNavClick("/wishlist")}
            />
            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="hover:text-black w-5 h-5 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#7a0d2e] text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 bg-white w-72 p-6 shadow-xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold text-[#7a0d2e]">Menu</span>
                <X
                  className="w-6 h-6 cursor-pointer text-[#7a0d2e]"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.label}>
                    {item.submenu ? (
                      <details className="text-[#7a0d2e] font-medium">
                        <summary className="cursor-pointer select-none">{item.label}</summary>
                        <ul className="pl-4 mt-2 flex flex-col gap-2">
                          {item.submenu.map((sub) => (
                            <li
                              key={sub}
                              className="cursor-pointer text-[#7a0d2e] hover:text-red-700"
                              onClick={() =>
                                handleSubNavClick(
                                  item.label.toLowerCase(),
                                  sub.toLowerCase().replace(/\s+/g, "-")
                                )
                              }
                            >
                              {sub}
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <button
                        className="w-full text-left text-[#7a0d2e] font-medium hover:text-red-700"
                        onClick={() => handleNavClick(item.link!)}
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");
        .count88-font {
          font-family: "Great Vibes", cursive;
        }
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
          animation: marquee 40s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 40s linear infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #7a0d2e;
          border-radius: 9999px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #f3f3f3;
        }
      `}</style>
    </>
  );
}
