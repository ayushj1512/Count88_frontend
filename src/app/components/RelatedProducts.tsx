'use client';

import Link from 'next/link';
import Image from 'next/image';

type Product = {
  id: number;
  slug: string;
  title: string;
  price: number;
  mrp: number;
  images: string[];
  category: string;
};

type Props = {
  currentSlug: string;
  category: string;
  allProducts: Product[];
};

export default function RelatedProducts({ currentSlug, category, allProducts }: Props) {
  const related = allProducts.filter(
    (p) => p.category === category && p.slug !== currentSlug
  );

  if (related.length === 0) return null;

  return (
    <div className="mt-8 px-4 sm:px-0 relative">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 text-center sm:text-left">
        Related Products
      </h2>

      <div className="flex gap-4 overflow-x-auto no-scrollbar sm:overflow-visible sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {related.map((product) => {
          const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

          return (
            <div
              key={product.id}
              className="min-w-[140px] sm:min-w-0 bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col"
            >
              <Link href={`/collection/${product.slug}`} className="block relative w-full" style={{ paddingBottom: '100%' }}>
                {product.images[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                )}

                {discount > 0 && (
                  <span className="absolute top-2 left-2 bg-[#7a0d2e] text-white text-xs font-bold px-2 py-1 rounded shadow">
                    {discount}% OFF
                  </span>
                )}
              </Link>

              <div className="p-2 sm:p-3 flex flex-col justify-between flex-1">
                <Link href={`/collection/${product.slug}`}>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 min-h-[2.5rem]">
                    {product.title}
                  </h4>
                </Link>

                <div className="text-xs sm:text-sm text-gray-700 font-medium flex items-center gap-1 mt-1">
                  <span className="text-[#7a0d2e] font-semibold">₹{product.price}</span>
                  <span className="line-through text-gray-400 text-[0.7rem] sm:text-xs">₹{product.mrp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
  