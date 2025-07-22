"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // import useRouter

const slides = [
  {
    image: "https://i.pinimg.com/736x/eb/47/e0/eb47e0c084f7eaae93e6de5f83a11bff.jpg",
    title: "Whimsical Wall Art",
    subtitle: "Add joy and personality to your spaces.",
    button: "Explore Collection",
    position: "justify-center items-center text-center",
  },
  {
    image: "/carousel/carousel2.jpg",
    title: "Pastel Perfection",
    subtitle: "Where calm hues meet creativity.",
    button: "Shop Pastels",
    position: "justify-start items-start text-left pl-4 sm:pl-8 md:pl-10 pt-4 sm:pt-6 md:pt-10",
  },
  {
    image: "/carousel/carousel3.jpg",
    title: "Crafted With Love",
    subtitle: "Every piece tells a story.",
    button: "Browse Now",
    position: "justify-end items-end text-right pr-4 sm:pr-8 md:pr-10 pb-4 sm:pb-6 md:pb-10",
  },
  {
    image: "https://i.pinimg.com/736x/14/04/78/14047897ee0e078e85ae9363f88e35ef.jpg",
    title: "Inspired by Nature",
    subtitle: "Discover earthy tones and organic textures.",
    button: "See Nature Picks",
    position: "justify-center items-start text-center pt-6 md:pt-10",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [blink, setBlink] = useState(false);
  const router = useRouter(); // initialize router

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
    <section className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[580px] xl:h-[640px] overflow-hidden font-[Montserrat]">
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

      <div
        className={`absolute top-0 left-0 w-full h-full z-10 flex ${slides[current].position} bg-black/30 transition-all duration-700`}
      >
        <div className="text-white max-w-md sm:max-w-lg md:max-w-xl space-y-3 sm:space-y-4 p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
            {slides[current].title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg drop-shadow">
            {slides[current].subtitle}
          </p>
          <button
            className="bg-gray-800 text-white px-5 sm:px-6 py-2 rounded-xl shadow hover:bg-gray-700 transition"
            onClick={() => router.push("/collection")} // navigate on click
          >
            {slides[current].button}
          </button>
        </div>
      </div>

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
