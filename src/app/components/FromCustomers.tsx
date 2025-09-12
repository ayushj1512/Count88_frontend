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
    <section className="bg-white py-0  overflow-hidden">
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
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Animated Text (Right Side) */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-right text-white max-w-md px-4">
  <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold opacity-0 animate-fadeInRight">
    ABOUT COUNT88
  </h2>
  <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base opacity-0 animate-fadeInRight delay-300">
    With the love for handicraft, Nidhi Rathi launched CLUTCHES & JUTTIS BY NR in MAY 2015, amalgamating the finesse of old royal moulds with innovative designs and embroidery patterns.
  </p>
  <button
    onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })} // Example scroll or navigation
    className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs sm:text-sm rounded-md font-semibold opacity-0 animate-fadeInRight delay-500 transition"
  >
    Explore More
  </button>
</div>

      </div>

      {/* Customers Carousel */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInRight {
          animation: fadeInRight 1s ease forwards;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>

      <h2 className="text-2xl sm:text-3xl md:text-4xl bg-black text-white font-bold text-center mt-12 mb-4">
        From Our Customers
      </h2>

      <div className="relative w-full">
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

      {/* Why Count88 */}
      <div className="relative z-10 bg-[url('https://i.pinimg.com/1200x/ac/21/03/ac2103527ceeef65e887de7d38484b62.jpg')] max-w-full pt-4 pb-4 mx-auto mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Why Count88?
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          <div className="flex flex-col items-center">
            <TfiGift className="text-4xl mb-3 text-gray-800 hover:text-red-800 transition" />
            <p className="text-sm font-semibold">GIFTABLE</p>
          </div>
          <div className="flex flex-col items-center">
            <MdOutlineFingerprint  className="text-4xl mb-3 text-gray-800 hover:text-red-800 transition" />
            <p className="text-sm font-semibold">UNIQUE</p>
          </div>
          <div className="flex flex-col items-center">
            <PiHandHeartLight className="text-4xl mb-3 text-gray-800 hover:text-red-800 transition" />
            <p className="text-sm font-semibold">100% HANDCRAFTED</p>
          </div>
          <div className="flex flex-col items-center">
            <IoDiamondOutline className="text-4xl mb-3 text-gray-800 hover:text-red-800 transition" />
            <p className="text-sm font-semibold">ARTISANAL</p>
          </div>
          <div className="flex flex-col items-center">
            <PiCrownLight  className="text-4xl mb-3 text-gray-800 hover:text-red-800 transition" />
            <p className="text-sm font-semibold">FINEST MATERIALS</p>
          </div>
          <div className="flex flex-col items-center">
            <BsFeather className="text-4xl mb-3 text-gray-800 hover:text-red-800 transition" />
            <p className="text-sm font-semibold">SUPER COMFY</p>
          </div>
        </div>
      </div>
    </section>
  );
}
