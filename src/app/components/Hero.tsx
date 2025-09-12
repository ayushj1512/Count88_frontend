"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/assets/banner7.jpg",
    position:
      "justify-end items-end text-right pr-4 sm:pr-8 md:pr-12 pb-4 sm:pb-8 md:pb-12",
    title: "Elegant Ethnic Wear",
    subtitle: "Step into tradition with style and grace",
    button: "Shop Collection",
  },
  {
    image: "/assets/banner3.png",
    position:
      "justify-left items-end text-left pl-8 pr-4 sm:pr-8 md:pr-12 pb-4 sm:pb-8 md:pb-12",
    title: "Luxury Juttis & Heels",
    subtitle: "Handcrafted with love and finesse",
    button: "Explore Now",
  },
  {
    image: "/assets/banner9.png",
    position: "justify-center items-start text-center pt-6 md:pt-10",
    title: "Vibrant Collection",
    subtitle: "Perfect for festive occasions",
    button: "View Collection",
  },
];

const categories = [
  { name: "HEELS", image: "/assets/1.png", link: "/categories/juttis" },
  { name: "FLATS", image: "/assets/2.png", link: "/categories/heels" },
  { name: "SHOES", image: "/assets/3.png", link: "/categories/potlis" },
  { name: "BOOTS", image: "/assets/4.png", link: "/categories/mules" },
  { name: "BRIDAL COLLECTION", image: "/assets/5.png", link: "/categories/men" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Categories on small screens */}
      <div className="block sm:hidden w-full overflow-x-auto no-scrollbar bg-[#f5f0e8] py-4">
        <div className="flex space-x-4 px-4">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center cursor-pointer min-w-[80px]"
              onClick={() => router.push(cat.link)}
            >
              <div className="w-20 h-20 relative overflow-hidden rounded-lg">
                <Image src={cat.image} alt={cat.name} fill className="object-contain" />
              </div>
              <p className="mt-1 text-xs font-semibold text-[#5a1a01] text-center">{cat.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden font-[Montserrat]">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === current && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <Image
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />

                  {/* Text Overlay */}
                  <div className={`absolute inset-0 z-10 flex ${slide.position} bg-black/20`}>
                    <motion.div
                      key={slide.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.1, duration: 0.25, ease: "easeInOut" }}
                      className="text-white max-w-xs sm:max-w-md md:max-w-xl space-y-2 sm:space-y-4 p-2 sm:p-6"
                    >
                      <h2 className="text-lg sm:text-3xl md:text-5xl lg:text-6xl font-bold">
                        {slide.title}
                      </h2>
                      <p className="text-xs sm:text-base md:text-lg">{slide.subtitle}</p>
                      <motion.button
                        whileHover={{ scale: 1.08, backgroundColor: "#d4c6b5" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#bdb4a9] text-black px-3 sm:px-6 py-1 sm:py-2 rounded-lg font-semibold text-xs sm:text-base md:text-lg"
                        onClick={() => router.push("/collection")}
                      >
                        {slide.button}
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === current ? "bg-white" : "bg-gray-400"
              }`}
              animate={{ opacity: index === current ? [1, 0.5, 1] : 1 }}
              transition={{ duration: 1, repeat: index === current ? Infinity : 0 }}
            />
          ))}
        </div>
      </section>

      {/* Categories for larger screens */}
      <section className="hidden sm:block py-12 sm:py-16 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-10 justify-items-center">
            {categories.map((cat) => (
              <motion.div
                key={cat.name}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center cursor-pointer group relative"
                onClick={() => router.push(cat.link)}
              >
                <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 relative overflow-hidden rounded-lg">
                  <Image src={cat.image} alt={cat.name} fill className="object-contain" />
                </div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-semibold tracking-wide text-[#5a1a01]">
                  {cat.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hide scrollbar globally for horizontal scroll */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
