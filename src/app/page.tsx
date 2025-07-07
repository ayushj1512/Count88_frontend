'use client';

import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

import Hero from "./components/Hero";
// import ColumnSection from "./components/Column";
import { Column } from "./components/Column";
import ShopByCategory from "./components/ShopbyCategory";
import BestsellerSection from "./components/Bestsellers";
// import OffersSection from "./components/OffersSection";
// import BrandPartners from "./components/BrandPartners";
import { useCartStore } from "./store/cartStore";
import ArtTypeSection from "./components/ArtTypeSection";

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
  imageSrc="https://i.pinimg.com/736x/d9/74/0f/d9740f97a26c7b827a4139fa5fd2ea3c.jpg"
  heading="Unleash Your Creativity"
  paragraph="Let your imagination run wild with our inspiring collection of art materials, creative tools, and expressive stationery. Whether you're painting, sketching, or crafting, we provide everything you need to break free from the ordinary and turn blank pages into vibrant stories of color and emotion."
/>

<Column
  imageSrc="https://i.pinimg.com/736x/8e/30/4a/8e304aac188acd1f61943e58752a2115.jpg"
  heading="Craft with Purpose"
  paragraph="Each stroke you make and every detail you add reflects your unique voice. Our thoughtfully selected range of tools empowers you to turn everyday moments into meaningful creations. Elevate your artistic journey with supplies that are not just functional but also elevate the soul of your craft."
  reverse
/>


      


      <ShopByCategory />
      <ArtTypeSection />


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
