"use client";

import Image from "next/image";

const categories = [
  {
    title: "Drawing & Writing Tools",
    image:
      "https://i.pinimg.com/736x/9a/3f/6f/9a3f6f4128a065169ed76c1d133c447e.jpg",
  },
  {
    title: "Paints, Inks & Color Media",
    image:
      "https://i.pinimg.com/736x/98/e0/f7/98e0f7b0f1f63c3ef4bf4e1d92b170d2.jpg",
  },
  {
    title: "Brushes & Tools",
    image:
      "https://i.pinimg.com/736x/42/25/e8/4225e828da0b14f714482a7e3c137436.jpg",
  },
  {
    title: "Surfaces & Papers",
    image:
      "https://i.pinimg.com/736x/ad/2d/7c/ad2d7c17705c4df6a07f9024cc1ae960.jpg",
  },
  {
    title: "Specialty Tools & Accessories",
    image:
      "https://i.pinimg.com/736x/76/81/cf/7681cfce7cbb93e186854147792e6893.jpg",
  },
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
        <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-800 mb-10 sm:mb-14 tracking-tight">
          SHOP BY CATEGORY
        </h2>

        {/* Responsive Layout */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 px-4 md:px-10 max-w-7xl mx-auto hidden md:grid">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>

        {/* Mobile Scrollable Layout */}
        <div className="md:hidden overflow-x-auto px-4 -mx-2">
          <div className="flex gap-4 snap-x snap-mandatory pb-2">
            {categories.map((category, index) => (
              <div key={index} className="snap-start min-w-[16rem] sm:min-w-[18rem]">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
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

function CategoryCard({ category }: { category: { title: string; image: string } }) {
  return (
    <div className="relative group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-pink-400">
      <div className="relative h-64 w-full">
        <Image
          src={category.image}
          alt={category.title}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-500 ease-in-out transform group-hover:scale-110 group-hover:brightness-90"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-center">
          <h3 className="text-white font-bold text-base sm:text-lg md:text-xl">
            {category.title}
          </h3>
          <button className="mt-2 px-4 py-1 text-sm sm:text-base bg-white text-gray-800 rounded-full shadow hover:bg-pink-600 hover:text-white transition duration-300">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
