"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function ColumnLayout() {
  const router = useRouter();

  // Example product data (replace with real data)
  const products = [
    { id: 1, name: "Heels", image: "https://i.pinimg.com/736x/e3/6d/d0/e36dd01168fd5cc080db6421c75fae76.jpg" },
    { id: 2, name: "Boots", image: "https://img.fantaskycdn.com/7da4fa4a456952725f98a78448ee5a60_1024x.jpeg" },
    { id: 3, name: "Flats", image: "https://i.pinimg.com/1200x/2c/5f/ce/2c5fce3b141f356bd107c03ae0265462.jpg" },
    { id: 4, name: "Shoes", image: "https://i.pinimg.com/736x/98/40/64/98406426afad989b73c36cec7386a028.jpg" },
    { id: 5, name: "Workwear Smart", image: "https://i.pinimg.com/1200x/c1/7e/ac/c17eac2e6facd6fcf79387622c308a57.jpg" },
    { id: 6, name: "Bold Black", image: "https://i.pinimg.com/736x/54/29/86/54298698555b135ed05dd42285af7d79.jpg" },
    { id: 7, name: "Weekend Relaxed", image: "https://i.pinimg.com/1200x/26/cb/92/26cb9265d0cecff3a71a4971a5f1e5b3.jpg" },
    { id: 8, name: "Formal Blue", image: "https://i.pinimg.com/1200x/04/0c/06/040c06af2f0eb3f380b11f6b795bf33b.jpg" },
  ];

  // Reusable product card
  const ProductCard = ({ product }: any) => (
    <div
      onClick={() => router.push("/collections")}
      className="relative rounded-xl shadow cursor-pointer overflow-hidden h-64"
    >
      {/* Background Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      {/* Product Name */}
      <span className="absolute bottom-3 left-3 text-white font-medium text-lg drop-shadow">
        {product.name}
      </span>
    </div>
  );

  return (
    <section className="w-full px-4 py-8">
      {/* Top Row */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {/* Small Banner (equal height to 4 products) */}
        <div className="col-span-2">
          <img
            src="https://i.pinimg.com/1200x/07/a8/7f/07a87f16f9df32a189f2bfebeb4163af.jpg"
            alt="Small Banner"
            className="w-full h-[32rem] object-cover rounded-xl shadow"
          />
        </div>

        {/* Four Product Cards (Right) */}
        <div className="col-span-3 grid grid-cols-2 grid-rows-2 gap-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Middle Full-Width Banner */}
      <div className="w-full mb-6">
        <img
          src="/assets/banner6.png"
          alt="Large Banner"
          className="w-full h-64 sm:h-80 md:h-[28rem] object-cover rounded-xl shadow"
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-5 gap-4">
        {/* Four Product Cards (Left) */}
        <div className="col-span-3 grid grid-cols-2 grid-rows-2 gap-4">
          {products.slice(4, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Right Banner (equal height to 4 products) */}
        <div className="col-span-2">
          <img
            src="https://i.pinimg.com/1200x/ab/1f/60/ab1f60aa203d02a68ee9e22bea9a6cc0.jpg"
            alt="Right Banner"
            className="w-full h-[32rem] object-cover rounded-xl shadow"
          />
        </div>
      </div>
    </section>
  );
}
