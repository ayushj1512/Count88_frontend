"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is Craftra?",
    answer:
      "Craftra is your creative companion for curated stationery and art supplies. We bring you beautifully crafted tools that inspire creativity and elevate everyday moments—from journaling to professional planning.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you’ll receive an email and SMS with a tracking number. You can use that number to check your delivery status on our 'Track Order' page.",
  },
  {
    question: "How long will it take to receive my order?",
    answer:
      "Orders typically arrive within 3–5 business days for prepaid and 5–7 days for COD. Please allow extra time during holidays, sales, or severe weather events.",
  },
  {
    question: "Can I place a bulk or custom order?",
    answer:
      "Yes! We accept bulk and corporate gifting orders. For customization options and catalogs, drop us an email at support@craftra.in or call 1800 309 9696.",
  },
  {
    question: "How do I cancel an order?",
    answer:
      "Orders can be cancelled before they are dispatched. Email us at support@craftra.in with your order number. Once dispatched, cancellations aren’t possible.",
  },
  {
    question: "What if my package says delivered but I didn’t receive it?",
    answer:
      "Please contact us at support@craftra.in within 48 hours of the delivery status. We’ll assist you in resolving the issue with the courier partner.",
  },
  {
    question: "When will I receive my refund?",
    answer:
      "Refunds are processed within 7–10 business days once we receive and verify the returned item. You’ll get an email confirmation once it’s done.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12  bg-gray-800 text-white">FAQs</h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl shadow-sm bg-white"
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition"
                >
                  <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                  {isActive ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </button>
                {isActive && (
                  <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </>
  );
}
