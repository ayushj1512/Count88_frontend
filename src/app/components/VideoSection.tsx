"use client";
import { motion } from "framer-motion";

export default function BannerSection() {
  const videos = [
    "/assets/video1.mp4",
    "/assets/video2.mp4",
    "/assets/video3.mp4",
    "/assets/video4.mp4",
    "/assets/video5.mp4",
  ];

  return (
    <section className="relative w-full bg-[#f5f0e8] py-10 px-4 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-[#5a1a01]">
          Step Into Your Style Story
        </h2>
        <p className="text-sm sm:text-base mt-2 text-[#7a0d2e] font-medium">
          A curated glimpse of elegance, crafted just for you
        </p>
      </div>

      {/* Videos */}
      <div className="flex flex-nowrap md:flex-wrap md:justify-center gap-4 overflow-x-auto no-scrollbar px-2 py-1 snap-x snap-mandatory">
        {videos.map((video, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
            className="relative flex-shrink-0 w-[180px] sm:w-[220px] md:w-[18%] h-[340px] rounded-lg overflow-hidden group snap-start shadow-md"
          >
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover:brightness-90 transition"
            />
            {/* Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white">
              <p className="text-xs font-semibold tracking-wide">
                Luxury • Elegance
              </p>
            </div>
          </motion.div>
        ))}
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
