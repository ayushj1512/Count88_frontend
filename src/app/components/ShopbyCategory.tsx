"use client";

import Image from "next/image";

const categories = [
  { title: "Drawing & Writing Tools", image: "/carousel/1.png" },
  { title: "Paints, Inks & Color Media", image: "/carousel/2.png" },
  { title: "Brushes & Tools", image: "/carousel/3.png" },
  { title: "Surfaces & Papers", image: "/carousel/4.png" },
  { title: "Specialty Tools & Accessories", image: "/carousel/5.png" },
];

export default function ShopByCategory() {
  return (
    <>
      {/* Top Wave Divider */}
      <div className="-mt-1 overflow-hidden leading-none bg-[#EBFFD9]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20"
        >
          <path
            d="M0,0 C100,50 150,-30 300,30 C450,90 550,-20 700,40 C850,100 1000,-10 1200,50 L1200,120 L0,120 Z"
            fill="#a8d9e8"
          />
        </svg>
      </div>

      {/* Category Section */}
      <section className="relative bg-[#a8d9e8] py-16 text-center overflow-hidden">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
          SHOP BY CATEGORY
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 md:px-10 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="overflow-hidden rounded-xl ">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={400}
                  height={400}
                  className="object-cover w-full h-48"
                />
              </div>

              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 text-brown-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap shadow">
                {category.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Wave Divider */}
      <div className="-mt-1 overflow-hidden leading-none bg-[#a8d9e8]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20"
        >
          <path
            d="M0,0 C100,50 150,-30 300,30 C450,90 550,-20 700,40 C850,100 1000,-10 1200,50 L1200,120 L0,120 Z"
            fill="#FEF1CB"
          />
        </svg>
      </div>
    </>
  );
}
