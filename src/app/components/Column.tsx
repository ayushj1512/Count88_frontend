"use client";
import React from "react";

export function Column() {
  return (
    <section className="w-full flex flex-col gap-20 py-10 px-4 md:px-20 bg-[#f5f1f0]">
      {/* First Section: Image Left, Text Right */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        {/* Left Side Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://i.pinimg.com/1200x/54/16/39/54163940fe7347b72943f8c77537382c.jpg"
            alt="Brown Shoes"
            className="w-[500px] h-[400px] object-cover rounded-md"
          />
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-[400px]">
          <div className="text-center md:text-center mb-4">
            <p className="text-base md:text-lg text-gray-700 mb-1">
              A refined new direction,
            </p>
            
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-md shadow-md mb-4 w-[180px] md:w-[200px]">
              <img
                src="https://i.pinimg.com/736x/c9/a3/67/c9a367926937502e3151f24245c1bd22.jpg"
                alt="Grey Mules"
                className="w-[160px] h-[160px] object-cover mb-2"
              />
              <p className="text-gray-800 font-medium text-sm md:text-base text-center">
                Caia - Stone Grey (Mule)
              </p>
              <p className="text-gray-500 text-sm text-center">MRP ₹ 9,690</p>
            </div>
            <button className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
              View Product
            </button>
          </div>
        </div>
      </div>

      {/* Second Section: Text Left, Image Right */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        {/* Left Side Content (Vertically Centered) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-center h-[400px]">
          <div className="text-center md:text-left mb-4">
            <p className="text-base md:text-lg text-gray-700 mb-1">
              Experience modern elegance,
            </p>
            
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-md shadow-md mb-4 w-[180px] md:w-[200px]">
              <img
                src="https://i.pinimg.com/1200x/8b/7d/33/8b7d33b213550e2bd5fa3750eb51be81.jpg"
                alt="Shoes Product"
                className="w-[160px] h-[160px] object-cover mb-2"
              />
              <p className="text-gray-800 font-medium text-sm md:text-base text-center">
                Nova - Midnight Black
              </p>
              <p className="text-gray-500 text-sm text-center">MRP ₹ 11,200</p>
            </div>
            <button className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
              View Product
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://i.pinimg.com/1200x/c8/c8/67/c8c8679919f71bafc23fb5cc3ab91ffc.jpg"
            alt="Shoes Product"
            className="w-[500px] h-[400px] object-cover rounded-md"
          />
        </div>
      </div>
    </section>
  );
}
