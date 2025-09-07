'use client';

import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

import Hero from "./components/Hero";
// import ColumnSection from "./components/Column";
import { Column } from "./components/Column";
import ShopByCategory from "./components/FromCustomers";
import BestsellerSection from "./components/Bestsellers";
// import OffersSection from "./components/OffersSection";
// import BrandPartners from "./components/BrandPartners";
import { useCartStore } from "./store/cartStore";
import ArtTypeSection from "./components/VideoSection";

export default function Home() {
  const loadCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <main className="relative min-h-screen text-brown-800 font-[Montserrat]">
      <Hero />
      <BestsellerSection />

      {/* Column Section */}

      <Column
/>




      

       <ArtTypeSection />
      <ShopByCategory />
     


      {/* Sticky WhatsApp Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="https://wa.me/9899938464"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300"
        >
          <FaWhatsapp size={28} />
        </a>
      </div>
    </main>
  );
}
