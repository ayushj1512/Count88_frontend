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
      } items-center bg-[#EBFFD9] p-6 md:p-6 gap-4`}
    >
      <div className="pl-10 pr-10 md:w-1/2 w-full">
        <img
          src={imageSrc}
          alt={heading}
          className="w-full h-80 object-cover rounded-xl shadow-md"
        />
      </div>
      <div className="md:w-1/2 w-full pl-10 pr-10 text-center md:text-left space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">{heading}</h2>
        <p className="text-gray-600 text-lg">{paragraph}</p>
      </div>
    </div>
  );
}

export default function ColumnSection() {
  return (
    <section className="bg-[#EBFFD9]">
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
