"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    image: "/carousel/carousel1.jpg",
    title: "Whimsical Wall Art",
    subtitle: "Add joy and personality to your spaces.",
    button: "Explore Collection",
    position: "justify-center items-center text-center"
  },
  {
    image: "/carousel/carousel2.jpg",
    title: "Pastel Perfection",
    subtitle: "Where calm hues meet creativity.",
    button: "Shop Pastels",
    position: "justify-start items-start text-left pl-10 pt-10"
  },
  {
    image: "/carousel/carousel3.jpg",
    title: "Crafted With Love",
    subtitle: "Every piece tells a story.",
    button: "Browse Now",
    position: "justify-end items-end text-right pr-10 pb-10"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [blink, setBlink] = useState(false);

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
    <section className="relative w-full h-[400px] md:h-[410px] overflow-hidden font-[Montserrat]">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === current ? "opacity-100 z-0" : "opacity-0 z-0"
          } ${index === current && blink ? "animate-blink" : ""}`}
        />
      ))}

      {/* Overlay Text */}
      <div
        className={`absolute top-0 left-0 w-full h-full z-10 flex ${slides[current].position} bg-black bg-opacity-30 transition-all duration-700`}
      >
        <div className="text-white max-w-lg space-y-4 p-4">
          <h2 className="text-3xl md:text-4xl font-semibold drop-shadow-lg">
            {slides[current].title}
          </h2>
          <p className="text-base md:text-lg drop-shadow">{slides[current].subtitle}</p>
          <button className="bg-gray-800 text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition">
            {slides[current].button}
          </button>
        </div>
      </div>

      {/* Blink animation */}
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
  );
}
