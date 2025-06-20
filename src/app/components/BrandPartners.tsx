"use client";

import Image from "next/image";

const brands = [
  { src: "/carousel/logoo1.jpg", alt: "Kuretake" },
  { src: "/carousel/logo2.jpg", alt: "Kokuyo" },
  { src: "/carousel/logo3.jpg", alt: "Tombow" },
  { src: "/carousel/logo4.jpg", alt: "Uni Mitsubishi Pencil" },
  { src: "/carousel/logo5.jpg", alt: "Midori" },
  { src: "/carousel/logo6.jpg", alt: "Sailor" },
  { src: "/carousel/logo7.jpg", alt: "Sailor" },
];

export default function BrandPartners() {
  return (
    <section className="bg-pink-50 pb-10 ">
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-700 tracking-wide mb-10">
        Partnered with Top Brands
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-10 px-4 md:px-20">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center p-2"
          >
            <Image
              src={brand.src}
              alt={brand.alt}
              width={80}
              height={80}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
