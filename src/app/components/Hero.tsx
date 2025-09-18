"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const slides = [
  { image: "/assets/banner3.png" },
  { image: "/assets/banner3.png" },
  { image: "/assets/banner3.png" },
];

const categories = [
  { name: "HEELS", image: "/assets/1.png", link: "/collection" },
  { name: "FLATS", image: "/assets/2.png", link: "/collection" },
  { name: "SHOES", image: "/assets/3.png", link: "/collection" },
  { name: "BOOTS", image: "/assets/4.png", link: "/collection" },
  { name: "BRIDAL COLLECTION", image: "/assets/5.png", link: "/collection" },
];

export default function Hero() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto-slide every 5s
  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 5000);
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, []);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide(); // swipe left
    else if (distance < -50) prevSlide(); // swipe right
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <>
      {/* Categories on small screens */}
      <div className="block sm:hidden w-full overflow-x-auto no-scrollbar bg-[#f5f0e8] py-4">
        <div className="flex space-x-4 px-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col items-center cursor-pointer min-w-[80px]"
              onClick={() => router.push(cat.link)}
            >
              <div className="w-20 h-20 relative overflow-hidden rounded-lg">
                <Image src={cat.image} alt={cat.name} fill className="object-contain" />
              </div>
              <p className="mt-1 text-xs font-semibold text-[#5a1a01] text-center">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Banner Section */}
      <section
        className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full h-full relative flex-shrink-0">
              <Image src={slide.image} alt={`Slide ${index + 1}`} fill className="object-cover w-full h-full" />
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === current ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories for larger screens */}
      <section className="hidden sm:block py-12 sm:py-16 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-10 justify-items-center">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex flex-col items-center cursor-pointer group relative"
                onClick={() => router.push(cat.link)}
              >
                <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 relative overflow-hidden rounded-lg">
                  <Image src={cat.image} alt={cat.name} fill className="object-contain" />
                </div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-semibold tracking-wide text-[#5a1a01]">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
