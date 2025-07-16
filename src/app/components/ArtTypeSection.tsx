'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const artTypes = [
  {
    name: 'Sketching',
    image: 'https://i.pinimg.com/736x/69/22/cd/6922cd901b676bacff34ae361a5fca5a.jpg',
    alt: 'Sketch Drawing',
  },
  {
    name: 'Oil Painting',
    image: 'https://i.pinimg.com/736x/15/25/0e/15250e748b316939ca0a841ba4b0d9b7.jpg',
    alt: 'Oil Painting Art',
  },
  {
    name: 'Watercolor',
    image: 'https://i.pinimg.com/736x/47/66/09/4766091a460842c56030f449fb8c4e20.jpg',
    alt: 'Watercolor Art',
  },
  {
    name: 'Mandala Art',
    image: 'https://i.pinimg.com/736x/6d/78/4e/6d784e53d51a0b1f6a6d6f627c5ee6c2.jpg',
    alt: 'Mandala Pattern',
  },
  {
    name: 'Acrylic Painting',
    image: 'https://i.pinimg.com/736x/1e/0c/9c/1e0c9cee20d2ba074f662485f1735ab6.jpg',
    alt: 'Acrylic Painting',
  },
  {
    name: 'Charcoal Drawing',
    image: 'https://i.pinimg.com/736x/e6/0d/cf/e60dcf7953692beb1c86bbbfdd70e9c9.jpg',
    alt: 'Charcoal Sketch',
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
      <div className="md:hidden px-4 -mx-2 overflow-x-auto overflow-y-hidden no-scrollbar">
        <div className="flex gap-4 snap-x snap-mandatory pb-4">
          {artTypes.map((type, index) => (
            <div key={index} className="snap-start min-w-[16rem] sm:min-w-[18rem]">
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
  };
  router: ReturnType<typeof useRouter>;
}) {
  const [loading, setLoading] = useState(false);

  const handleExploreClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?tag=${encodeURIComponent(type.name)}`
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        router.push(`/collection?tag=${encodeURIComponent(type.name)}`);
      } else {
        router.push('/collection');
      }
    } catch (error) {
      console.error('Error checking products for tag:', error);
      router.push('/collection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all duration-300">
      <div className="w-full h-52 sm:h-60 relative rounded-md overflow-hidden">
        <Image
          src={type.image}
          alt={type.alt}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 640px) 100vw, 300px"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          {type.name}
        </h3>
        <button
          onClick={handleExploreClick}
          disabled={loading}
          className={`border border-gray-800 px-4 py-1 rounded font-medium text-sm transition ${
            loading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-white hover:text-red-600'
          }`}
        >
          {loading ? 'Checking...' : 'EXPLORE'}
        </button>
      </div>
    </div>
  );
}
