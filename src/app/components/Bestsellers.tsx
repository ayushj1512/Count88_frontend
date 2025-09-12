"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
   {
    id: 12,
    name: "Emerald Heels",
    price: "₹ 2,800",
    oldPrice: "₹ 5,999",
    discount: "SAVE 53%",
    img: "https://i.pinimg.com/1200x/ed/44/0d/ed440d588b736bf1f538d7675d24bb20.jpg",
  },
  {
    id: 13,
    name: "Coral Heels",
    price: "₹ 3,100",
    oldPrice: "₹ 5,999",
    discount: "SAVE 48%",
    img: "https://i.pinimg.com/1200x/79/a5/f7/79a5f7c3c281f588784fa118ee51a0bb.jpg",
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
  {
    id: 8,
    name: "Pearl Heels",
    price: "₹ 2,899",
    oldPrice: "₹ 5,999",
    discount: "SAVE 52%",
    img: "https://i.pinimg.com/736x/cf/d5/fa/cfd5fa6e9e1c1618d660037d9582c327.jpg",
  },
  {
    id: 9,
    name: "Ruby Heels",
    price: "₹ 2,650",
    oldPrice: "₹ 5,999",
    discount: "SAVE 56%",
    img: "https://i.pinimg.com/736x/d6/26/44/d6264419fa9d18e4aaafc7b9d09dc5de.jpg",
  },
  {
    id: 10,
    name: "Emerald Heels",
    price: "₹ 2,800",
    oldPrice: "₹ 5,999",
    discount: "SAVE 53%",
    img: "https://i.pinimg.com/1200x/ed/44/0d/ed440d588b736bf1f538d7675d24bb20.jpg",
  },
    {
    id: 11,
    name: "Emerald Heels",
    price: "₹ 2,800",
    oldPrice: "₹ 5,999",
    discount: "SAVE 53%",
    img: "https://i.pinimg.com/1200x/ed/44/0d/ed440d588b736bf1f538d7675d24bb20.jpg",
  },
  {id: 14,
    name: "Sand Heels",
    price: "₹ 2,700",
    oldPrice: "₹ 5,999",
    discount: "SAVE 55%",
    img: "https://i.pinimg.com/736x/8b/1e/df/8b1edffd2651bdec1cb4655d390a0f61.jpg",
  },
   
];

export default function ProductCarousel() {
  const [activeTab, setActiveTab] = useState("new");

  const products = activeTab === "new" ? newArrivals : bestSellers;

  return (
    <div
      className="relative py-8 sm:py-12 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/d9/18/eb/d918eb1c6399cc38440a290b959d51e8.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-[#5a1a01]/80"></div>

      <div className="relative z-10">
        {/* Tabs */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:space-x-2">
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 sm:px-5 py-2 text-sm sm:text-base rounded-md font-semibold transition-shadow ${
                activeTab === "new"
                  ? "bg-[#f7e5cc] text-[#5a1a01] shadow-lg"
                  : "bg-white text-[#5a1a01] hover:shadow-md"
              }`}
            >
              NEW ARRIVALS
            </button>
            <button
              onClick={() => setActiveTab("bestsellers")}
              className={`px-4 sm:px-5 py-2 text-sm sm:text-base rounded-md font-semibold transition-shadow ${
                activeTab === "bestsellers"
                  ? "bg-[#f7e5cc] text-[#5a1a01] shadow-lg"
                  : "bg-white text-[#5a1a01] hover:shadow-md"
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
              className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px] relative rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-[#f7e5cc] flex-shrink-0"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-44 sm:h-56 md:h-64 object-cover"
              />
              <span className="absolute top-2 right-2 bg-[#f7e5cc] text-[#5a1a01] text-[10px] sm:text-xs px-2 py-1 rounded shadow font-semibold">
                {product.discount}
              </span>
              <div className="text-center mt-2 sm:mt-3 bg-[#5a1a01]/70 py-2">
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
      </div>

      {/* Hide scrollbar globally */}
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
