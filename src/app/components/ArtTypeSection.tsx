"use client";

import { useRouter } from "next/navigation";

const artTypes = [
  {
    name: "Sketching",
    image:
      "https://i.pinimg.com/736x/69/22/cd/6922cd901b676bacff34ae361a5fca5a.jpg",
    alt: "Sketch Drawing",
    link: "/category/sketching",
  },
  {
    name: "Oil Painting",
    image:
      "https://i.pinimg.com/736x/15/25/0e/15250e748b316939ca0a841ba4b0d9b7.jpg",
    alt: "Oil Painting Art",
    link: "/category/oil-painting",
  },
  {
    name: "Watercolor",
    image:
      "https://i.pinimg.com/736x/47/66/09/4766091a460842c56030f449fb8c4e20.jpg",
    alt: "Watercolor Art",
    link: "/category/watercolor",
  },
  {
    name: "Mandala Art",
    image:
      "https://i.pinimg.com/736x/6d/78/4e/6d784e53d51a0b1f6a6d6f627c5ee6c2.jpg",
    alt: "Mandala Pattern",
    link: "/category/mandala",
  },
  {
    name: "Acrylic Painting",
    image:
      "https://i.pinimg.com/736x/1e/0c/9c/1e0c9cee20d2ba074f662485f1735ab6.jpg",
    alt: "Acrylic Painting",
    link: "/category/acrylic-painting",
  },
  {
    name: "Charcoal Drawing",
    image:
      "https://i.pinimg.com/736x/e6/0d/cf/e60dcf7953692beb1c86bbbfdd70e9c9.jpg",
    alt: "Charcoal Sketch",
    link: "/category/charcoal",
  },
];

export default function ArtTypeSection() {
  const router = useRouter();

  return (
    <section className="relative bg-[#FEF1CB] pt-0 pb-12">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
        SHOP BY STYLE
      </h2>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20">
        {artTypes.map((type, index) => (
          <ArtTypeCard key={index} type={type} router={router} />
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden px-4 overflow-x-auto -mx-2">
        <div className="flex gap-4 snap-x snap-mandatory pb-4">
          {artTypes.map((type, index) => (
            <div
              key={index}
              className="snap-start min-w-[16rem] sm:min-w-[18rem]"
            >
              <ArtTypeCard type={type} router={router} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtTypeCard({
  type,
  router,
}: {
  type: {
    name: string;
    image: string;
    alt: string;
    link: string;
  };
  router: any;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all duration-300">
      <div className="w-full h-52 sm:h-60 overflow-hidden rounded-md">
        <img
          src={type.image}
          alt={type.alt}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          {type.name}
        </h3>
        <button
          onClick={() => router.push("/collection")}
          className="border border-gray-800 bg-red-600 text-white px-4 py-1 rounded hover:bg-white hover:text-red-500 transition"
        >
          EXPLORE
        </button>
      </div>
    </div>
  );
}
