"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const slides = [
  { image: "/banner1.png", position: "justify-end items-end text-right pr-4 sm:pr-8 md:pr-10 pb-4 sm:pb-6 md:pb-10" },
  { image: "/banner2.png", position: "justify-end items-end text-right pr-4 sm:pr-8 md:pr-10 pb-4 sm:pb-6 md:pb-10" },
  { image: "/banner4.png", position: "justify-center items-start text-center pt-6 md:pt-10" },
];

// Category section data
const categories = [
  { name: "JUTTIS", image: "/category1.png", link: "/categories/juttis" },
  { name: "HEELS", image: "/category2.png", link: "/categories/heels" },
  { name: "POTLIS", image: "/category3.png", link: "/categories/potlis" },
  { name: "MULES", image: "/category4.png", link: "/categories/mules" },
  { name: "MEN", image: "/category5.png", link: "/categories/men" },
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
      <section className="relative w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-[420px] xl:h-[480px] overflow-hidden font-[Montserrat]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === current ? "opacity-100 z-0" : "opacity-0 z-0"
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
            className={`absolute top-0 left-0 w-full h-full z-10 flex ${slides[current].position} bg-black/30 transition-all duration-700`}
          >
            <div className="text-white max-w-md sm:max-w-lg md:max-w-xl space-y-3 sm:space-y-4 p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-lg">
                {slides[current].title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base drop-shadow">
                {slides[current].subtitle}
              </p>
              <button
                className="bg-[#bdb4a9] text-black px-4 sm:px-5 py-1.5 rounded-lg shadow hover:bg-[#a89c90] transition text-sm sm:text-base"
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 justify-items-center">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => router.push(cat.link)}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={160}
                  height={160}
                  className="object-contain group-hover:scale-110 transition-transform"
                />
                <p className="mt-4 text-base font-medium tracking-wide text-gray-800">
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
