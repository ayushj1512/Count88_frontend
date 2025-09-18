"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const newArrivals = [
  {
    id: 1,
    name: "Peony Heels",
    price: "₹ 2,700",
    oldPrice: "₹ 5,999",
    discount: "SAVE 55%",
    img: "https://i.pinimg.com/736x/d6/4a/c2/d64ac27cd9fc1d63c29c2880bdcdd6cf.jpg",
  },
  {
    id: 2,
    name: "Birdie Heels",
    price: "₹ 2,700",
    oldPrice: "₹ 5,999",
    discount: "SAVE 55%",
    img: "https://i.pinimg.com/736x/61/fe/a0/61fea0cf1224fdbd635061dfea41f8f0.jpg",
  },
  {
    id: 3,
    name: "Daisy Heels",
    price: "₹ 2,700",
    oldPrice: "₹ 5,999",
    discount: "SAVE 55%",
    img: "https://i.pinimg.com/1200x/21/11/00/211100583782c93a6cc69e50f4e7924f.jpg",
  },
  {
    id: 4,
    name: "Sand Heels",
    price: "₹ 2,700",
    oldPrice: "₹ 5,999",
    discount: "SAVE 55%",
    img: "https://i.pinimg.com/736x/8b/1e/df/8b1edffd2651bdec1cb4655d390a0f61.jpg",
  },
  {
    id: 5,
    name: "Zarah Heels",
    price: "₹ 3,299",
    oldPrice: "₹ 5,999",
    discount: "SAVE 45%",
    img: "https://i.pinimg.com/736x/6d/ea/9e/6dea9edc10065f449fad742feac86a93.jpg",
  },
];

const bestSellers = [
  {
    id: 6,
    name: "Lotus Heels",
    price: "₹ 2,999",
    oldPrice: "₹ 5,999",
    discount: "SAVE 50%",
    img: "https://i.pinimg.com/736x/a5/68/ed/a568ed4b24c4b633875d376c179d38d6.jpg",
  },
  {
    id: 7,
    name: "Coral Heels",
    price: "₹ 3,100",
    oldPrice: "₹ 5,999",
    discount: "SAVE 48%",
    img: "https://i.pinimg.com/1200x/79/a5/f7/79a5f7c3c281f588784fa118ee51a0bb.jpg",
  },
];

export default function ProductCarousel() {
  const [activeTab, setActiveTab] = useState("new");
  const router = useRouter();
  const products = activeTab === "new" ? newArrivals : bestSellers;

  return (
    <div className="relative py-8 sm:py-12 bg-[#7a0d2e]">
      {/* Tabs */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2 sm:space-x-2">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 sm:px-5 py-2 text-sm sm:text-base rounded-md font-semibold transition-shadow ${
              activeTab === "new"
                ? "bg-[#f7e5cc] text-[#7a0d2e] shadow-lg"
                : "bg-white text-[#7a0d2e] hover:shadow-md"
            }`}
          >
            NEW ARRIVALS
          </button>
          <button
            onClick={() => setActiveTab("bestsellers")}
            className={`px-4 sm:px-5 py-2 text-sm sm:text-base rounded-md font-semibold transition-shadow ${
              activeTab === "bestsellers"
                ? "bg-[#f7e5cc] text-[#7a0d2e] shadow-lg"
                : "bg-white text-[#7a0d2e] hover:shadow-md"
            }`}
          >
            THE BESTSELLERS
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Products */}
      <div className="flex space-x-4 overflow-x-auto no-scrollbar px-4 sm:px-8 py-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => router.push("/collection")}
            className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px] relative rounded-xl overflow-hidden shadow-xl border-2 border-[#f7e5cc] flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-full h-44 sm:h-56 md:h-64">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 220px"
              />
            </div>
            <span className="absolute top-2 right-2 bg-[#f7e5cc] text-[#7a0d2e] text-[10px] sm:text-xs px-2 py-1 rounded shadow font-semibold">
              {product.discount}
            </span>
            <div className="text-center mt-2 sm:mt-3 bg-[#7a0d2e]/90 py-2">
              <h3 className="font-medium text-sm sm:text-base text-[#f7e5cc]">
                {product.name}
              </h3>
              <div className="space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-base">
                <span className="text-[#f7e5cc] font-semibold">{product.price}</span>
                <span className="text-gray-200 line-through">{product.oldPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
