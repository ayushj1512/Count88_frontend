/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { FaGift, FaCrown, FaFeatherAlt } from "react-icons/fa";
import { GiFingerPrint, GiHand, GiCutDiamond } from "react-icons/gi";

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
    <section className="bg-white py-12 sm:py-16 overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
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
      <div className="relative z-10 max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          Why Count88?
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          <div className="flex flex-col items-center">
            <FaGift className="text-4xl mb-3 text-gray-800 hover:text-red-600 transition" />
            <p className="text-sm font-semibold">GIFTABLE</p>
          </div>
          <div className="flex flex-col items-center">
            <GiFingerPrint className="text-4xl mb-3 text-gray-800 hover:text-red-600 transition" />
            <p className="text-sm font-semibold">UNIQUE</p>
          </div>
          <div className="flex flex-col items-center">
            <GiHand className="text-4xl mb-3 text-gray-800 hover:text-red-600 transition" />
            <p className="text-sm font-semibold">100% HANDCRAFTED</p>
          </div>
          <div className="flex flex-col items-center">
            <GiCutDiamond className="text-4xl mb-3 text-gray-800 hover:text-red-600 transition" />
            <p className="text-sm font-semibold">ARTISANAL</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCrown className="text-4xl mb-3 text-gray-800 hover:text-red-600 transition" />
            <p className="text-sm font-semibold">FINEST MATERIALS</p>
          </div>
          <div className="flex flex-col items-center">
            <FaFeatherAlt className="text-4xl mb-3 text-gray-800 hover:text-red-600 transition" />
            <p className="text-sm font-semibold">SUPER COMFY</p>
          </div>
        </div>
      </div>
    </section>
  );
}
