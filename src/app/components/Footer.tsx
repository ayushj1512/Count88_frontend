import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-gray-300">
      <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm">
        
        {/* Brand Info */}
        <div>
          <h4 className="font-extrabold text-[#cfa76a] mb-5 text-lg tracking-wide">
            COUNT88
          </h4>
          <p className="leading-relaxed text-gray-400 text-sm">
            A premium footwear brand redefining fashion with bold designs and uncompromising quality.
          </p>
          <div className="flex space-x-4 mt-6">
            <Link href="#" className="hover:text-[#cfa76a] transition-colors duration-300">
              <FaInstagram size={20} />
            </Link>
            <Link href="#" className="hover:text-[#cfa76a] transition-colors duration-300">
              <FaFacebookF size={20} />
            </Link>
            <Link href="#" className="hover:text-[#cfa76a] transition-colors duration-300">
              <FaTwitter size={20} />
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-[#cfa76a] mb-5 uppercase tracking-wider text-sm">
            Company
          </h4>
          <ul className="space-y-3 text-gray-400">
            <li>
              <Link href="/about" className="hover:text-[#cfa76a] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#cfa76a] transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/FAQ" className="hover:text-[#cfa76a] transition-colors">
                Help & FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-[#cfa76a] mb-5 uppercase tracking-wider text-sm">
            Support
          </h4>
          <ul className="space-y-3 text-gray-400">
            <li>
              <Link href="/returns" className="hover:text-[#cfa76a] transition-colors">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-[#cfa76a] transition-colors">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/privacypolicy" className="hover:text-[#cfa76a] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/refund" className="hover:text-[#cfa76a] transition-colors">
                Refund & Cancellation
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-[#cfa76a] mb-5 uppercase tracking-wider text-sm">
            Contact
          </h4>
          <p className="flex items-center text-sm mb-3 text-gray-400">
            <FaEnvelope className="mr-2 text-[#cfa76a]" />
            <a
              href="mailto:fashion.count88@gmail.com"
              className="hover:text-[#cfa76a] underline"
            >
              fashion.count88@gmail.com
            </a>
          </p>
          <p className="flex items-center text-sm text-gray-400">
            <FaPhone className="mr-2 text-[#cfa76a]" />
            <a
              href="tel:+918595534390"
              className="hover:text-[#cfa76a] underline"
            >
              +91 8595534390
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-5 text-xs text-gray-500">
        © {new Date().getFullYear()} <span className="text-[#cfa76a]">Count88</span>. All rights reserved.
      </div>
    </footer>
  );
}
