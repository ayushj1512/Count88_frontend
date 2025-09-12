"use client";
import Image from "next/image";
import { FaGift, FaCrown, FaFeatherAlt } from "react-icons/fa";
import { GiFingerPrint, GiHand, GiCutDiamond } from "react-icons/gi";

export default function BannerSection() {
  return (
    <>
      {/* Video Gallery */}
      <section
        className="w-full bg-[url('https://i.pinimg.com/1200x/ac/21/03/ac2103527ceeef65e887de7d38484b62.jpg')] bg-cover bg-center bg-no-repeat py-12 px-6"
      >
        <h2 className="text-2xl sm:text-3xl bg-black text-[#F5E2AC] font-bold text-center mb-10">
          Step Into Your Style Story
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <video
            src="/assets/video1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-xl shadow-lg w-full h-[400px] object-cover"
          />
          <video
            src="/assets/video2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-xl shadow-lg w-full h-[400px] object-cover"
          />
          <video
            src="/assets/video3.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-xl shadow-lg w-full h-[400px] object-cover"
          />
          <video
            src="/assets/video4.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-xl shadow-lg w-full h-[400px] object-cover"
          />
          <video
            src="/assets/video5.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-xl shadow-lg w-full h-[400px] object-cover"
          />
        </div>
      </section>
    </>
  );
}
