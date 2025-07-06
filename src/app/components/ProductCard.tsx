'use client';

import React from 'react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
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
  tags?: string[];
}

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const firstImage = product.images?.[0]?.url ?? '/placeholder.jpg';
  const price = product.variants?.[0]?.discountedPrice ?? 0;
  const mrp = product.variants?.[0]?.mrp ?? 0;
  const hasDiscount = mrp > price;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      title: product.name,
      image: firstImage,
      price,
    });
    toast.success(`${product.name} added to cart`);
    toggleCart(true);
  };

  return (
    <div
      className="w-[250px] h-[350px] bg-white rounded-xl shadow-md transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden flex-shrink-0 relative"
      onClick={onClick}
    >
      {/* Tag Badges */}
      {(product.tags?.length ?? 0) > 0 && (
  <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
    {product.tags?.slice(0, 2).map((tag) => (
      <span
        key={tag}
        className="bg-yellow-200 text-yellow-800 text-[10px] font-semibold px-2 py-[2px] rounded-full uppercase"
      >
        {tag}
      </span>
    ))}
  </div>
)}


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
      <div className="flex flex-col justify-between p-3 h-[170px]">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 h-[40px]">
            {product.name}
          </h3>
          {/* <p className="text-xs text-gray-500 mt-1">{product.brand}</p> */}
        </div>

        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-pink-600 font-bold text-sm">₹{price}</span>
          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm">₹{mrp}</span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="mt-3 py-2 w-full bg-gradient-to-r from-[#ff8fa3] to-[#ff5680] text-white rounded-full text-sm font-medium shadow-md transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
