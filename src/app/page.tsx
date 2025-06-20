'use client';

import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ColumnSection from "./components/Column";
import { Column } from "./components/Column";
import ShopByCategory from "./components/ShopbyCategory";
import BestsellerSection from "./components/Bestsellers";
import OffersSection from "./components/OffersSection";
import BrandPartners from "./components/BrandPartners";
import { useCartStore } from "./store/cartStore";

export default function Home() {
  const loadCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <main className="relative min-h-screen text-brown-800 font-[Montserrat]">
      <Header />
      <Hero />
      <BestsellerSection />

      {/* Column Section */}

<Column
        imageSrc="/carousel/bestseller2.jpg"
        heading="Unleash Your Creativity"
        paragraph="Explore our vibrant collection of art supplies, stationery, and handcrafted pieces designed to inspire your every day."
      />

      <Column
              imageSrc="/carousel/bestseller4.jpg"
              heading="Craft with Purpose"
              paragraph="Whether you're journaling, drawing, or decorating, our carefully curated tools help turn ideas into masterpieces."
              reverse
            />


      <ShopByCategory />
      <OffersSection />
      <BrandPartners />
      <Footer />
      

      {/* Sticky WhatsApp Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="https://wa.me/9811195362"
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
