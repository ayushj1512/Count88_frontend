"use client";
import Image from "next/image";
import { FaGift, FaCrown, FaFeatherAlt } from "react-icons/fa";
import { GiFingerPrint, GiHand, GiCutDiamond } from "react-icons/gi";

export default function BannerSection() {
  return (
    <>
      {/* Banner Section */}
      <section className="relative w-full h-[500px] sm:h-[600px] bg-gray-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/banner7.jpg"
            alt="Banner Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Discover Your Artistic Style
          </h1>
          <p className="text-lg sm:text-2xl text-white mb-6">
            Explore exclusive collections and get inspired
          </p>
          <button className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-white hover:text-red-600 transition font-semibold">
            Explore Now
          </button>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="w-full bg-white py-12 px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Step Into Your Style Story
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <video src="/assets/video1.mp4" autoPlay loop muted playsInline className="rounded-xl shadow-lg w-full h-[400px] object-cover" />
          <video src="/assets/video2.mp4" autoPlay loop muted playsInline className="rounded-xl shadow-lg w-full h-[400px] object-cover" />
          <video src="/assets/video3.mp4" autoPlay loop muted playsInline className="rounded-xl shadow-lg w-full h-[400px] object-cover" />
          <video src="/assets/video4.mp4" autoPlay loop muted playsInline className="rounded-xl shadow-lg w-full h-[400px] object-cover" />
          <video src="/assets/video5.mp4" autoPlay loop muted playsInline className="rounded-xl shadow-lg w-full h-[400px] object-cover" />
        </div>
      </section>

      {/* Why Count88 */}
      <section className="w-full relative py-16 px-8">
        <div className="absolute inset-0">
          <Image
            src="/assets/ethnic-bg.jpg"
            alt="Ethnic Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/70"></div>
        </div>

        
      </section>
    </>
  );
}
