"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { CheckCircle, Mail, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Confetti with Count88 palette
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#111111", "#FFFFFF", "#7a0d2e"],
      scalar: 1.1,
    });
    const t = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#7a0d2e", "#111111"],
      });
    }, 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start overflow-hidden">
      {/* Banner with background image */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-[url(https://i.pinimg.com/736x/d9/18/eb/d918eb1c6399cc38440a290b959d51e8.jpg)] bg-cover bg-center flex flex-col items-center justify-center shadow-lg"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-black"
        >
          <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-600" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mt-6 max-w-lg px-4 sm:px-6 space-y-5"
      >
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-tight">
          Thank You
        </h2>

        {/* Success Line */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-green-600 flex items-center justify-center shadow-md">
            <CheckCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
          </div>
          <p className="text-sm sm:text-base md:text-lg font-medium text-red-900">
            Payment Completed Successfully
          </p>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-4">
          {/* Email */}
          <div className="flex items-start gap-2 bg-black/5 rounded-lg p-3 hover:shadow-md transition">
            <div className="p-2 bg-white rounded-md shadow">
              <Mail className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-xs sm:text-sm md:text-base text-black">
                Confirmation
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">
                Sent to your email
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-start gap-2 bg-black/5 rounded-lg p-3 hover:shadow-md transition">
            <div className="p-2 bg-white rounded-md shadow">
              <MessageSquare className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-xs sm:text-sm md:text-base text-black">
                Updates
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">
                Sent via WhatsApp
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => router.push("/profile")}
          className="mt-6 inline-flex items-center mb-8 gap-2 px-5 sm:px-6 py-2.5 bg-red-900 text-white rounded-md text-sm sm:text-base font-medium shadow-lg hover:bg-black focus:outline-none focus:ring-4 focus:ring-red-900/30 transition"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
          Go to my Profile
        </motion.button>
      </motion.div>
    </div>
  );
}
