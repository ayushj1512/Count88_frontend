"use client";

import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";

export default function NotLoggedIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      {/* Creative Icon */}
      <div className="relative w-24 h-24 flex items-center justify-center bg-gradient-to-tr from-pink-100 to-red-100 rounded-full shadow-md">
        <Lock className="w-12 h-12 text-red-600" />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
          !
        </span>
      </div>

      {/* Message */}
      <h2 className="mt-6 text-2xl font-bold text-gray-800">
        You’re not logged in
      </h2>
      <p className="mt-2 text-gray-600 max-w-md">
        Looks like you’re trying to access your profile. Please log in to view
        your <span className="font-medium text-red-600">orders</span>,{" "}
        <span className="font-medium text-red-600">wishlist</span>, and more 🎉
      </p>

      {/* CTA */}
      <Link
        href="/login"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
      >
        Login Now <ArrowRight className="w-4 h-4" />
      </Link>

      {/* Extra creative touch */}
      <div className="mt-8 text-xs text-gray-500 italic">
        Unlock exclusive deals once you’re in 🔑
      </div>
    </div>
  );
}
