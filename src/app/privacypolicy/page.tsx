"use client";

import { motion } from "framer-motion";
import { FiMessageCircle, FiRotateCw, FiGift, FiBox } from "react-icons/fi";

const ACCENT_COLOR = "#7a0d2e";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Header Section */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl pt-10 pb-8 font-extrabold text-center rounded-lg shadow-md"
        style={{ backgroundColor: ACCENT_COLOR, color: "#fff" }}
      >
        PRIVACY POLICY
      </motion.h1>
      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {[
          {
            title: "Information We Collect",
            content: [
              "Contact details like name, email, mobile number, address, and IP.",
              "Billing and payment info (credit card data is securely handled by our payment partner).",
              "Content you provide like reviews or feedback.",
              "Demographic info from surveys or preferences.",
              "Device and usage data such as browser, pages visited, and session duration.",
            ],
          },
          {
            title: "How We Collect Information",
            content: [
              "Directly from you when you register, comment, or contact us.",
              "Passively using cookies, analytics tools (e.g., Google Analytics), and tracking pixels.",
              "From third parties, such as social login providers.",
            ],
          },
          {
            title: "How We Use Your Information",
            content: [
              "To confirm purchases and send transactional communications.",
              "To respond to inquiries and provide support.",
              "To personalize your experience and improve our site and products.",
              "To analyze trends, detect fraud, and ensure security.",
              "For marketing purposes like newsletters, with an option to unsubscribe.",
            ],
          },
          {
            title: "Sharing of Information",
            content: [
              "We may share data with third-party service providers (e.g., payment processors, analytics), legal authorities if required, or in connection with business transfers like a sale or merger.",
            ],
          },
          {
            title: "Email Opt‑Out",
            content: [
              "To stop receiving marketing emails, email us at ",
              "support@count88.in. Please allow up to 10 business days to process your request.",
            ],
          },
          {
            title: "Cookies",
            content: [
              "We use cookies to enhance your experience and security. You can disable them in your browser settings, but this may affect site functionality.",
            ],
          },
          {
            title: "Your Rights",
            content: [
              "Access, update, or delete your personal data by contacting us.",
              "Withdraw consent for data processing or marketing emails.",
              "Lodge a complaint with a data protection authority if needed.",
            ],
          },
          {
            title: "Grievance Officer",
            content: [
              "Mr. PANKAJ GAUTAM",
              "Toll Free: +91 8595534390",
              "Email: support@count88.in",
            ],
          },
          {
            title: "Updates to this Policy",
            content: ["Last updated: June 14, 2020. We may update from time to time; check this page for changes."],
          },
          
        ].map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-4" style={{ color: ACCENT_COLOR }}>
              {section.title}
            </h2>
            {section.content.length > 1 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">{section.content[0]}</p>
            )}
          </motion.div>
        ))}
      </section>

      {/* Info Icons Section */}
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
