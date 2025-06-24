"use client";
import React from "react";

interface ColumnProps {
  imageSrc: string;
  heading: string;
  paragraph: string;
  reverse?: boolean;
}

export function Column({
  imageSrc,
  heading,
  paragraph,
  reverse = false,
}: ColumnProps) {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center bg-[#f2ffe6] px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-14 md:py-20 gap-8 sm:gap-10 transition-all duration-300`}
    >
      {/* Image Block */}
      <div className="w-full md:w-1/2">
        <img
          src={imageSrc}
          alt={heading}
          className="w-full h-64 sm:h-80 md:h-[28rem] object-cover rounded-2xl sm:rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Text Block */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6 px-2 sm:px-4">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          {heading}
          <span className="block w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-pink-500 to-red-500 mt-2 mx-auto md:mx-0 rounded-full" />
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
          {paragraph}
        </p>
      </div>
    </div>
  );
}

export default function ColumnSection() {
  return (
    <section className="bg-[#f2ffe6]">
      <Column
        imageSrc="/carousel/bestseller2.jpg"
        heading="Unleash Your Creativity"
        paragraph="Explore our vibrant collection of art supplies, stationery, and handcrafted pieces designed to inspire your every day."
      />

      <Column
        imageSrc="/carousel/bestseller4.jpg"
        heading="Craft with Purpose"
        paragraph="Whether you're journaling, drawing, or decorating, our carefully curated tools help turn ideas into masterpieces."
        reverse
      />
    </section>
  );
}
