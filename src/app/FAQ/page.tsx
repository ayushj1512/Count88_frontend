"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT_COLOR = "#7a0d2e";

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you’ll receive an email and SMS with a tracking number. You can use that number to check your delivery status on our 'Track Order' page.",
  },
  {
    question: "How long will I take to receive my order?",
    answer:
      "Orders typically arrive within 3–5 business days. Please allow extra time during holidays, sales, or severe weather events.",
  },
  {
    question: "Can I place a bulk or custom order?",
    answer:
      "Yes! We accept bulk and corporate gifting orders. For customization options and catalogs, drop us an email at support@count88.in or call +91 8595534390.",
  },
  {
    question: "How do I cancel an order?",
    answer:
      "Orders can be cancelled before they are dispatched. Email us at support@count88.in with your order number. Once dispatched, cancellations aren’t possible.",
  },
  {
    question: "What if my package says delivered but I didn’t receive it?",
    answer:
      "Please contact us at support@count88.in within 48 hours of the delivery status. We’ll assist you in resolving the issue with the courier partner or delivery service. You can also call +91 8595534390.",
  },
  {
    question: "When will I receive my refund?",
    answer:
      "Refunds are processed within 7–10 business days once we receive and verify the returned item. You’ll get an email confirmation once it’s done. For any queries, contact support@count88.in or call +91 8595534390.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 py-16"
    >
      <h1
        className="text-4xl font-bold text-center mb-12 rounded-lg py-4 shadow-sm"
        style={{ backgroundColor: ACCENT_COLOR, color: "#fff" }}
      >
        FAQs
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`border rounded-xl shadow-sm bg-white overflow-hidden transition-all duration-300 ${
                isActive ? "border-[2px] border-[#7a0d2e] bg-[#fff0f3]" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span
                  className={`text-lg font-medium transition-colors duration-300 ${
                    isActive ? "text-[#7a0d2e]" : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-gray-500" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-4 text-gray-700 text-sm leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
