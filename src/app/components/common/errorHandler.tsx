"use client";

import { useRouter } from "next/navigation";
import { Frown } from "lucide-react";
import { motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: "700" });

export default function ErrorFallback() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center flex flex-col items-center gap-4"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
          className="text-[#7a0d2e]"
        >
          <Frown size={80} strokeWidth={1.5} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${dancingScript.className} text-5xl font-bold text-[#7a0d2e]`}
        >
          Oops!
        </motion.h1>

        {/* Messages */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-700 text-lg"
        >
          We couldn&apos;t find what you are looking for.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500"
        >
          Don’t worry, there’s plenty to explore in our collections.
        </motion.p>

        {/* Shop Now Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/collections")}
          className="px-6 py-3 bg-[#7a0d2e] text-white rounded-xl font-semibold hover:bg-[#93123a] transition"
        >
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  );
}
