"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#EBFFD9] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md sm:max-w-lg text-center p-6 sm:p-10 space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-snug">
          🎉 Order Placed Successfully!
        </h2>

        {/* Subtext */}
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          Thank you for shopping with <span className="font-semibold">Craftra</span>! Your order is being processed with care. 🛍️
        </p>

        {/* Info */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          ✅ Confirmation sent to your email.
          <br />
          💬 You’ll also receive updates via <span className="font-semibold text-green-600">WhatsApp</span>.
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Button */}
        <button
          onClick={() => router.push("/collections")}
          className="px-6 py-3 w-full sm:w-auto bg-green-600 text-white rounded-full text-sm sm:text-base font-medium hover:bg-green-700 transition"
        >
          Continue Shopping
        </button>

        {/* Support Message */}
        <p className="text-xs text-gray-500 mt-2">
          Need help?{" "}
          <a href="/contact" className="underline hover:text-green-600">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
