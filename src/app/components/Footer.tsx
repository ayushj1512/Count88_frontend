import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#FFF2E1] text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        
        {/* Company Info */}
        <div>
          <h4 className="font-semibold mb-3 uppercase tracking-wide">Craftra</h4>
          <p>
            Crafted for creators — explore thoughtfully curated art and stationery supplies made with love.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 uppercase tracking-wide">COMPANY INFO</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
      
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
             <li>
              <Link href="/FAQ" className="hover:underline">
                Help & FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold mb-3 uppercase tracking-wide">Customer Service</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/returns" className="hover:underline">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:underline">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/privacypolicy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/refund" className="hover:underline">
                Refund and Cancellation Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-3 uppercase tracking-wide">Get In Touch</h4>
          <p>
            Email:{" "}
            <a href="mailto:craftra1199@gmail.com" className="underline">
              craftra1199@gmail.com
            </a>
          </p>
          <p>
            Mobile:{" "}
            <a>
              +91 9811195362
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-300 text-center py-4 text-xs text-gray-500">
        © 2025 Craftra. All rights reserved.
      </div>
    </footer>
  );
}
