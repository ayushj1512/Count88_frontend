/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { MdOutlineFingerprint } from "react-icons/md";
import { TfiGift } from "react-icons/tfi";
import { PiHandHeartLight } from "react-icons/pi";
import { IoDiamondOutline } from "react-icons/io5";
import { PiCrownLight } from "react-icons/pi";
import { BsFeather } from "react-icons/bs";

const customers = [
  { image: "https://i.pinimg.com/1200x/97/fb/c4/97fbc413173c22dd3e10a1135a2bcf6a.jpg" },
  { image: "https://i.pinimg.com/1200x/30/21/d0/3021d0beaefbb1f6220691e6c422e2eb.jpg" },
  { image: "https://i.pinimg.com/736x/a6/f5/36/a6f536a43435e87da8cadded194206e7.jpg" },
  { image: "https://i.pinimg.com/736x/61/c9/07/61c907e3fa167031be0482ddc0e0c202.jpg" },
  { image: "https://i.pinimg.com/1200x/28/d9/d7/28d9d750ccd8eff449f3c9f80a09b5cb.jpg" },
];

export default function FromOurCustomers() {
  const duplicated = [...customers, ...customers];

  return (
    <section className="bg-white py-0 overflow-hidden">
      {/* Top Banner with Overlay Text */}
      <div className="relative w-full h-64 sm:h-80 md:h-[26rem] lg:h-[30rem]">
        <Image
          src="https://i.pinimg.com/1200x/30/21/d0/3021d0beaefbb1f6220691e6c422e2eb.jpg"
          alt="Banner"
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-right text-white max-w-md px-4">
          <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold opacity-0 animate-fadeInRight">
            ABOUT COUNT88
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base opacity-0 animate-fadeInRight delay-300">
            As a 100% vegan and cruelty-free brand, we believe fashion should never come at the expense of animals or the planet. Every pair we design is crafted with sustainable materials, innovative techniques, and premium craftsmanship to ensure lasting quality and comfort.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
            className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs sm:text-sm rounded-md font-semibold opacity-0 animate-fadeInRight delay-500 transition"
          >
            Explore More
          </button>
        </div>
      </div>

      {/* Customers Carousel */}
      <h2 className="text-2xl bg-[#f7e5cc] sm:text-3xl md:text-4xl font-bold text-center mt-12 mb-4">
        From Our Customers
      </h2>

      <div className="overflow-x-auto w-full py-4 scrollbar-none">
        <div className="flex w-max gap-6 px-4 animate-[scroll_60s_linear_infinite]">
          {duplicated.map((customer, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 sm:w-72 h-80 relative rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={customer.image}
                alt={`Customer ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      {/* Why Count88 Section */}
      <div className="relative pt-8 pb-8 z-10 bg-[url('https://i.pinimg.com/736x/d9/18/eb/d918eb1c6399cc38440a290b959d51e8.jpg')] max-w-full pt-4 pb-4 mx-auto">
        <h2 className="text-2xl text-white sm:text-3xl font-bold text-center mb-6">
          Why Count88?
        </h2>

        <div className="flex justify-evenly flex-wrap lg:flex-nowrap text-white text-center gap-8">
          <div className="flex flex-col items-center">
            <TfiGift className="text-4xl mb-3 text-white hover:text-red-800 transition" />
            <p className="text-sm font-semibold">GIFTABLE</p>
          </div>
          <div className="flex flex-col items-center">
            <MdOutlineFingerprint className="text-4xl mb-3 text-white hover:text-red-800 transition" />
            <p className="text-sm font-semibold">UNIQUE</p>
          </div>
          <div className="flex flex-col items-center">
            <PiHandHeartLight className="text-4xl mb-3 text-white hover:text-red-800 transition" />
            <p className="text-sm font-semibold">100% HANDCRAFTED</p>
          </div>
          <div className="flex flex-col items-center">
            <IoDiamondOutline className="text-4xl mb-3 text-white hover:text-red-800 transition" />
            <p className="text-sm font-semibold">ARTISANAL</p>
          </div>
          <div className="flex flex-col items-center">
            <PiCrownLight className="text-4xl mb-3 text-white hover:text-red-800 transition" />
            <p className="text-sm font-semibold">FINEST MATERIALS</p>
          </div>
          <div className="flex flex-col items-center">
            <BsFeather className="text-4xl mb-3 text-white hover:text-red-800 transition" />
            <p className="text-sm font-semibold">SUPER COMFY</p>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes fadeInRight {
            0% { opacity: 0; transform: translateX(40px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeInRight { animation: fadeInRight 1s ease forwards; }
          .delay-300 { animation-delay: 0.3s; }
          .scrollbar-none::-webkit-scrollbar { display: none; }
          .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </section>
  );
}
