"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  image: string;
};

export default function ColumnLayout() {
  const router = useRouter();

  const products: Product[] = [
    { id: 1, name: "Heels", image: "https://i.pinimg.com/736x/e3/6d/d0/e36dd01168fd5cc080db6421c75fae76.jpg" },
    { id: 2, name: "Boots", image: "https://i.pinimg.com/1200x/2c/5f/ce/2c5fce3b141f356bd107c03ae0265462.jpg" },
    { id: 3, name: "Flats", image: "https://i.pinimg.com/1200x/2c/5f/ce/2c5fce3b141f356bd107c03ae0265462.jpg" },
    { id: 4, name: "Shoes", image: "https://i.pinimg.com/736x/98/40/64/98406426afad989b73c36cec7386a028.jpg" },
  ];

  const ProductCard = ({ product }: { product: Product }) => (
    <div
      onClick={() => router.push("/collection")}
      className="relative rounded-xl shadow cursor-pointer overflow-hidden h-64 min-w-[160px] flex-shrink-0"
    >
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <span className="absolute bottom-3 left-3 text-white font-medium text-lg drop-shadow">
        {product.name}
      </span>
    </div>
  );

  return (
    <section className="w-full px-4 py-8">
      {/* MOBILE LAYOUT */}
      <div className="block md:hidden space-y-6">
        {/* Top Banner */}
        <div onClick={() => router.push("/collection")} className="w-full cursor-pointer">
          <Image
            src="https://i.pinimg.com/1200x/07/a8/7f/07a87f16f9df32a189f2bfebeb4163af.jpg"
            alt="Top Banner"
            width={1200}
            height={600}
            className="w-full h-64 object-cover rounded-xl shadow"
          />
        </div>

        {/* First Products Row */}
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Middle Banner */}
        <div onClick={() => router.push("/collection")} className="w-full cursor-pointer">
          <Image
            src="https://i.pinimg.com/736x/4b/5d/f9/4b5df9e0a2e0e5e4127faeab56ad8da0.jpg"
            alt="Middle Banner Mobile"
            width={1200}
            height={800}
            className="w-full h-64 sm:h-80 object-cover rounded-xl shadow"
          />
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:block space-y-6">
        {/* Top Row */}
        <div className="grid grid-cols-5 gap-4">
          <div onClick={() => router.push("/collection")} className="col-span-2 cursor-pointer">
            <Image
              src="https://i.pinimg.com/1200x/07/a8/7f/07a87f16f9df32a189f2bfebeb4163af.jpg"
              alt="Small Banner"
              width={1200}
              height={800}
              className="w-full h-[32rem] object-cover rounded-xl shadow"
            />
          </div>
          <div className="col-span-3 grid grid-cols-2 grid-rows-2 gap-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Middle Full-Width Banner */}
        <div onClick={() => router.push("/collection")} className="w-full cursor-pointer">
          <Image
            src="/assets/banner6.png"
            alt="Middle Banner Desktop"
            width={1600}
            height={800}
            className="w-full h-64 sm:h-80 md:h-[28rem] object-cover rounded-xl shadow"
          />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 grid grid-cols-2 grid-rows-2 gap-4">
            {products.slice(4, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
