"use client";

import { motion } from "framer-motion";
import { FiMessageCircle, FiRotateCw, FiGift, FiBox } from "react-icons/fi";

const ACCENT_COLOR = "#7a0d2e";

export default function ShippingPolicyPage() {
  return (
    <>
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl w-full font-bold mb-12 text-center rounded-lg shadow-md"
        style={{ backgroundColor: ACCENT_COLOR, color: "#fff" }}
      >
        SHIPPING & RETURNS POLICY
      </motion.h1>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 pb-16 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-3" style={{ color: ACCENT_COLOR }}>
            Our Commitment
          </h2>
          <p className="text-gray-700">
            We aim to offer the best shipping service, irrespective of where you live. We deliver our products daily while ensuring the highest level of responsiveness.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold mb-3" style={{ color: ACCENT_COLOR }}>
            Processing Time
          </h2>
          <p className="text-gray-700">
            Once order verification, tailoring, quality check, and packaging are done, the order is dispatched within 24-48 hours of placing it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-3" style={{ color: ACCENT_COLOR }}>
            Shipping Charges & Time
          </h2>
          <p className="text-gray-700 mb-2">
            A non-refundable shipping fee of <strong>Rs.100/-</strong> is charged for prepaid orders and <strong>Rs.99/-</strong> for Cash-On-Delivery orders.
          </p>
          <p className="text-gray-700">
            Prepaid orders take <strong>3-5 business days</strong> while COD orders take <strong>5-7 business days</strong> to arrive at the destination. Delays may occur due to holidays, extreme weather, or logistical issues.
          </p>
        </motion.div>

        {/* Exchange & Return */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-3" style={{ color: ACCENT_COLOR }}>
            Exchange & Return Policy
          </h2>
          <h3 className="font-semibold mb-2">Size Exchange Fee</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Free First Exchange: Request a free size exchange within 7 days of delivery.</li>
            <li>Second Exchange Fee: Handling fee of Rs.200 for any additional exchanges.</li>
          </ul>

          <h3 className="font-semibold mb-2">Return Fee</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Return within 7 days if not satisfied with the product or fit.</li>
            <li>Nominal return fee of Rs.100 covers pickup, handling, packaging, and logistics.</li>
          </ul>

          <h3 className="font-semibold mb-2">Return or Exchange Process</h3>
          <p className="text-gray-700 mb-4">
            Contact <a href="mailto:support@count88.in" className="text-blue-600 underline">support@count88.in</a> with order details, product photos with tags, and unboxing video. Once approved, return/exchange the item in its original packaging.
          </p>

          <h3 className="font-semibold mb-2">Refund Eligibility & Timeframe</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>COUNT88 reserves the right to refuse any return, exchange, or refund if conditions are not met.</li>
            <li>Refunds processed within 7–10 business days after receipt of the returned item. Notification sent via email once processed.</li>
          </ul>
        </motion.div>

        {/* Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-3" style={{ color: ACCENT_COLOR }}>
            Need Help?
          </h2>
          <p className="text-gray-700">
            For delivery or return inquiries, email us at <a href="mailto:support@count88.in" className="text-blue-600 underline">support@count88.in</a> or call <strong>+91 8595534390</strong>.
          </p>
        </motion.div>
      </section>

      {/* Support Icons Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: FiMessageCircle, title: "Get in touch", desc: "Expert help & advice" },
            { icon: FiRotateCw, title: "Returns & exchanges", desc: "All you need to know" },
            { icon: FiGift, title: "Rewards", desc: "Unlock Exclusive Benefits" },
            { icon: FiBox, title: "Bulk Order", desc: "Get Customized Stationery" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-md cursor-pointer transition"
              >
                <Icon className="mx-auto mb-3" size={36} color={ACCENT_COLOR} />
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
