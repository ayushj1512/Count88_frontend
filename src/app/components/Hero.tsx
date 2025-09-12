"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const slides = [
  { image: "/assets/banner1.png", position: "justify-end items-end text-right pr-3 sm:pr-6 md:pr-10 pb-3 sm:pb-6 md:pb-10" },
  { image: "/assets/banner2.png", position: "justify-end items-end text-right pr-3 sm:pr-6 md:pr-10 pb-3 sm:pb-6 md:pb-10" },
  { image: "/assets/banner4.png", position: "justify-center items-start text-center pt-6 md:pt-10" },
];

// Category section data
const categories = [
  { name: "JUTTIS", image: "/assets/category1.png", link: "/categories/juttis" },
  { name: "HEELS", image: "/assets/category2.png", link: "/categories/heels" },
  { name: "POTLIS", image: "/assets/category3.png", link: "/categories/potlis" },
  { name: "MULES", image: "/assets/category4.png", link: "/categories/mules" },
  { name: "MEN", image: "/assets/category5.png", link: "/categories/men" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [blink, setBlink] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setBlink(false);
      }, 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden font-[Montserrat]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === current ? "opacity-100" : "opacity-0"
            } ${index === current && blink ? "animate-blink" : ""}`}
          >
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}

        {slides[current].title && (
          <div
            className={`absolute inset-0 z-10 flex ${slides[current].position} bg-black/30 transition-all duration-700`}
          >
            <div className="text-white max-w-xs sm:max-w-md md:max-w-xl space-y-2 sm:space-y-4 p-3 sm:p-6">
              <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                {slides[current].title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base drop-shadow">
                {slides[current].subtitle}
              </p>
              <button
                className="bg-[#bdb4a9] text-black px-3 sm:px-5 py-1.5 rounded-lg shadow hover:bg-[#a89c90] transition text-xs sm:text-sm md:text-base"
                onClick={() => router.push("/collection")}
              >
                {slides[current].button}
              </button>
            </div>
          </div>
        )}

        <style jsx>{`
          .animate-blink {
            animation: blink 0.3s ease-in-out;
          }

          @keyframes blink {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.2;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </section>

      {/* Categories Section */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-10 justify-items-center">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => router.push(cat.link)}
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 relative">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-medium tracking-wide text-gray-800">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
