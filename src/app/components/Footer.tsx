import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#FFF2E1] text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm sm:text-base">

        {/* Company Info */}
        <div>
          <h4 className="font-semibold text-[#8B5E3C] mb-3 uppercase tracking-wide text-lg">
            Craftra
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Crafted for creators — explore thoughtfully curated art and stationery supplies made with love.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-[#8B5E3C] mb-3 uppercase tracking-wide text-lg">
            Company Info
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/about" className="hover:text-red-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-600 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/FAQ" className="hover:text-red-600 transition">
                Help & FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold text-[#8B5E3C] mb-3 uppercase tracking-wide text-lg">
            Customer Service
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/returns" className="hover:text-red-600 transition">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-red-600 transition">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/privacypolicy" className="hover:text-red-600 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/refund" className="hover:text-red-600 transition">
                Refund & Cancellation
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-[#8B5E3C] mb-3 uppercase tracking-wide text-lg">
            Get In Touch
          </h4>
          <p className="text-gray-700">
            Email:{" "}
            <a
              href="mailto: craftraco25@gmail.com"
              className="underline hover:text-red-600 transition"
            >
              craftraco25@gmail.com
            </a>
          </p>
          <p className="text-gray-700 mt-2">
            Mobile:{" "}
            <a href="tel:+919899938464" className="hover:underline">
              +91 9899938464
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-300 text-center py-4 text-xs sm:text-sm text-gray-500">
        © 2025 Craftra. All rights reserved.
      </div>
    </footer>
  );
}
