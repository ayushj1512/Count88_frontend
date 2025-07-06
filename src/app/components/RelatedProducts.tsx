'use client';

import Link from 'next/link';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';
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
  const addToCart = useCartStore((state) => state.addToCart);

  const related = allProducts.filter(
    (p) => p.category === category && p.slug !== currentSlug
  );

  if (related.length === 0) return null;

  return (
    <div className="mt-20 px-4 sm:px-0">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 tracking-tight text-center sm:text-left">
        Related Products
      </h2>

      <div className="flex overflow-x-auto gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {related.map((product) => {
          const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

          return (
            <div
              key={product.id}
              className="min-w-[250px] sm:min-w-0 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col"
            >
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative w-full h-48 sm:h-52 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                      {discount}% OFF
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-4 flex flex-col justify-between flex-1">
                <Link href={`/product/${product.slug}`}>
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[3rem]">
                    {product.title}
                  </h4>
                </Link>

                <div className="text-sm text-gray-700 font-medium flex items-center gap-2 mt-2">
                  <span className="text-pink-600 font-semibold">₹{product.price}</span>
                  <span className="line-through text-gray-400">₹{product.mrp}</span>
                </div>

                <button
                  onClick={() => {
                    addToCart({
                      id: product.id.toString(),
                      title: product.title,
                      image: product.images[0],
                      price: product.price,
                    });
                    toast.success(`${product.title} added to cart`);
                  }}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
