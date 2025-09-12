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
];

export default function ProductCarousel() {
  const [activeTab, setActiveTab] = useState("new");
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;
  const products = activeTab === "new" ? newArrivals : bestSellers;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const visibleProducts = products.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div
      className="relative py-6 sm:py-8 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/79/38/da/7938da1e0808db25f2f31fba5a2e0e1e.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#800000]/80"></div>

      <div className="relative z-10">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-orange-400 flex items-center justify-center text-white bg-[#800000]/70 hover:bg-orange-500 transition"
        >
          <FaChevronLeft size={14} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-orange-400 flex items-center justify-center text-white bg-[#800000]/70 hover:bg-orange-500 transition"
        >
          <FaChevronRight size={14} />
        </button>

        {/* Tabs */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="flex flex-wrap gap-2 sm:space-x-2">
            <button
              onClick={() => {
                setActiveTab("new");
                setCurrentPage(0);
              }}
              className={`px-3 sm:px-4 py-1.5 text-sm sm:text-base rounded-md ${
                activeTab === "new"
                  ? "bg-orange-500 text-white font-semibold"
                  : "bg-white text-[#800000] font-semibold"
              }`}
            >
              NEW ARRIVALS
            </button>
            <button
              onClick={() => {
                setActiveTab("bestsellers");
                setCurrentPage(0);
              }}
              className={`px-3 sm:px-4 py-1.5 text-sm sm:text-base rounded-md ${
                activeTab === "bestsellers"
                  ? "bg-orange-500 text-white font-semibold"
                  : "bg-white text-[#800000] font-semibold"
              }`}
            >
              THE BESTSELLERS
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 px-3 sm:px-6 lg:px-12">
          {visibleProducts.map((product) => (
            <div key={product.id} className="relative">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg shadow-lg"
              />
              {/* Discount Badge */}
              <span className="absolute top-2 right-2 bg-white text-black text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 shadow rounded">
                {product.discount}
              </span>
              {/* Details */}
              <div className="text-center mt-2 sm:mt-3 text-white">
                <h3 className="font-medium text-xs sm:text-sm md:text-base">
                  {product.name}
                </h3>
                <div className="space-x-1 sm:space-x-2 text-[11px] sm:text-sm md:text-base">
                  <span className="text-white font-semibold">
                    {product.price}
                  </span>
                  <span className="text-gray-300 line-through">
                    {product.oldPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
