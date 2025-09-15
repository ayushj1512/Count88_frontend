'use client';

import React from 'react';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  images: { url: string }[];
  variants: {
    variant: string;
    mrp: number;
    discountedPrice: number;
  }[];
  category: string;
}

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const firstImage = product.images?.[0]?.url ?? '/placeholder.jpg';
  const price = product.variants?.[0]?.discountedPrice ?? 0;
  const mrp = product.variants?.[0]?.mrp ?? 0;
  const hasDiscount = mrp > price;

  return (
    <div
      className="w-[250px] h-[320px] bg-white rounded-xl shadow-md transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden flex-shrink-0 relative"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative w-full h-[180px] rounded-t-xl overflow-hidden">
        <Image
          src={firstImage}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 240px"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between p-3 h-[140px]">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 h-[40px]">
            {product.name}
          </h3>
        </div>

        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-pink-600 font-bold text-sm">₹{price}</span>
          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm">₹{mrp}</span>
          )}
        </div>
      </div>
    </div>
  );
}
