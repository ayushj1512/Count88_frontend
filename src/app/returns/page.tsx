"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { FaEnvelope, FaUndo, FaGift, FaBox } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ReturnsPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [emailOrMobile, setEmailOrMobile] = useState("");

  return (
    <>
      <Header />

      {/* Main Section */}
      <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[70vh]">
        {/* Left: Text */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Return & Exchanges</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Return/Exchange your product in just a few clicks. Please enter your order number and email / mobile number to continue.
          </p>
        </div>

        {/* Right: Form */}
        <div className="bg-gray-50 shadow-md rounded-2xl p-8 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Get Started</h2>
          <form className="space-y-4">
            {/* Order Number */}
            <div className="relative">
              <input
                type="text"
                placeholder="Order Number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Info className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>

            {/* Email or Mobile */}
            <input
              type="text"
              placeholder="Email / Mobile Number"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-green-100 text-black py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </section>

      {/* Info Section */}
      <div className="bg-green-100 border-t border-gray-300 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center px-4">
          <div className="flex flex-col items-center space-y-2">
            <FaEnvelope size={30} className="text-gray-700" />
            <h4 className="font-semibold">Get in touch</h4>
            <p className="text-sm text-gray-600">Expert help & advice</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FaUndo size={30} className="text-gray-700" />
            <h4 className="font-semibold">Returns & exchanges</h4>
            <p className="text-sm text-gray-600">All you need to know</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FaGift size={30} className="text-gray-700" />
            <h4 className="font-semibold">Rewards</h4>
            <p className="text-sm text-gray-600">Unlock Exclusive Benefits</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FaBox size={30} className="text-gray-700" />
            <h4 className="font-semibold">Bulk Order</h4>
            <p className="text-sm text-gray-600">Get Customized Stationery</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
