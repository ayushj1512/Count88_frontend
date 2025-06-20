"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const router = useRouter();

  const navItems = [
    { label: "Stationery", submenu: ["Notebooks", "Pens", "Diaries"] },
    { label: "Art Supplies", submenu: ["Paints", "Brushes", "Canvas"] },
    { label: "Craft Material", submenu: ["Paper", "Glue", "Stickers"] },
    { label: "Journaling", submenu: ["Stamps", "Washi Tapes"] },
    { label: "Art Forms", submenu: ["Mandala", "Watercolor", "Minimal"] },
    { label: "Office Stationery", submenu: ["Folders", "Organizers"] },
    {
      label: "Shop By Brands",
      submenu: ["Faber-Castell", "Winsor & Newton", "Princeton", "Canson", "Pourfect", "more"],
    },
  ];

  const deliveryMessages = [
    "FREE DELIVERY ON ORDERS ABOVE ₹990.00",
    "USE CODE CRAFTRA10 FOR 10% OFF",
    "NEW ARRIVALS IN STOCK!",
    "HANDMADE WITH LOVE ♥",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    { name: "Classic Notebook", slug: "classic-notebook" },
    { name: "Watercolor Paint Set", slug: "watercolor-paint-set" },
    { name: "Mandala Canvas", slug: "mandala-canvas" },
    { name: "Sticky Notes", slug: "sticky-notes" },
    { name: "Organizing Folder", slug: "organizing-folder" },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % deliveryMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItems = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(storedItems.length);
    }
  }, [isCartOpen]);

  const handleSubmenuClick = (sub: string) => {
    router.push(`/category/${sub.toLowerCase().replace(/\s+/g, "-")}`);
    setShowSearch(false);
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>

      {showSearch && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setShowSearch(false)}
          />
          <div className="fixed top-0 left-10 right-10 z-50 bg-white p-6 rounded shadow-md animate-slide-down">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="mt-3 max-h-60 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-pink-100 cursor-pointer text-sm"
                    onClick={() => {
                      router.push(`/product/${product.slug}`);
                      setSearchQuery("");
                      setShowSearch(false);
                    }}
                  >
                    {product.name}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm px-4">No products found.</p>
              )}
            </div>
          </div>
        </>
      )}

      <div className="sticky top-0 z-30 bg-white shadow-md">
        {/* Top strip message */}
        <div className="bg-gray-800 text-white text-center text-sm py-2">
          {deliveryMessages[currentMessageIndex]}
        </div>

        {/* Header main */}
        <header className="flex items-center justify-between px-6 lg:px-10 py-4 bg-[#FFF2E1]">
          {/* Logo */}
          <div
            className="text-3xl font-extrabold text-gray-800 cursor-pointer tracking-wide"
            onClick={() => router.push("/")}
          >
            <span className="text-black">CRAF</span>
            <span className="text-red-600">TЯA</span>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex gap-6 xl:gap-8 text-sm xl:text-base text-gray-800">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <button className="hover:underline font-medium cursor-pointer whitespace-nowrap">
                  {item.label}
                </button>
                <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-md rounded-md border border-gray-200 z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 ease-in-out">
                  {item.submenu.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleSubmenuClick(sub)}
                      className="w-full text-left block px-4 py-2 text-sm hover:bg-[#A5CDD9] hover:pl-5 transition-all duration-200"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 text-gray-700 text-xl">
            <FaSearch className="cursor-pointer hover:text-black" onClick={() => setShowSearch(true)} />
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
