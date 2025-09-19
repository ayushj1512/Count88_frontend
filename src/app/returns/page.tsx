"use client";

import { motion } from "framer-motion";
import { Repeat, Package, Clock } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-[#7a0d2e]">Return & Exchange Policy</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Easily manage your returns and exchanges. Please read the policy carefully to know how you can return or exchange your products.
          </p>
        </motion.div>
      </section>

      {/* Policy Sections */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Size Exchange Fee */}
        <motion.div
          whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
          className="bg-white rounded-2xl shadow-md p-6 flex gap-4 items-start transition-all"
        >
          <Repeat className="w-8 h-8 text-[#7a0d2e] mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Size Exchange Fee</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Free First Exchange: Request a free size exchange within 7 days of delivery.</li>
              <li>Second Exchange Fee: Rs. 200 for additional exchanges for the same product.</li>
            </ul>
          </div>
        </motion.div>

        {/* Return Fee */}
        <motion.div
          whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
          className="bg-white rounded-2xl shadow-md p-6 flex gap-4 items-start transition-all"
        >
          <Package className="w-8 h-8 text-[#7a0d2e] mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Return Fee</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Return within 7 days if unsatisfied.</li>
              <li>A nominal return fee of Rs. 100 covers pickup, packaging, and logistics.</li>
            </ul>
          </div>
        </motion.div>

        {/* Return / Exchange Process */}
        <motion.div
          whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
          className="bg-white rounded-2xl shadow-md p-6 flex gap-4 items-start transition-all"
        >
          <Repeat className="w-8 h-8 text-[#7a0d2e] mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Return / Exchange Process</h3>
            <p className="text-gray-700 text-sm">
              Contact <span className="font-semibold text-[#7a0d2e]">support@count88.in</span> with order details, product photos with tags, and unboxing video. Return/exchange in original packaging once approved.
            </p>
          </div>
        </motion.div>

        {/* Refund Eligibility & Timeframe */}
        <motion.div
          whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
          className="bg-white rounded-2xl shadow-md p-6 flex gap-4 items-start transition-all"
        >
          <Clock className="w-8 h-8 text-[#7a0d2e] mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Refund Eligibility & Timeframe</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>COUNT88 may refuse any return/exchange/refund if policy conditions are not met.</li>
              <li>Refunds processed within 7–10 business days after receiving the returned item. Notification via email once processed.</li>
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
