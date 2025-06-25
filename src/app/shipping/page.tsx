"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiMessageCircle, FiRotateCw, FiGift, FiBox } from "react-icons/fi";

export default function ShippingPolicyPage() {
  return (
    <>

      {/* Main Content */}
<section className="max-w-4xl mx-auto px-6 py-16">
  <h1 className="text-4xl w-full font-bold mb-12 text-center bg-red-100">SHIPPING POLICY</h1>

  <div className="grid md:grid-cols-2 gap-12">
    {/* Left Column */}
    <div>
      <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
      <p className="text-gray-700 mb-6">
        We aim to offer the best shipping service, irrespective of where you live. We deliver our products to hundreds of customers daily whilst ensuring that we provide the very highest levels of responsiveness to you at all times.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Processing Time</h2>
      <p className="text-gray-700 mb-6">
        Once order verification, tailoring, quality check and packaging is done, the order is dispatched within 24-48 hours of placing it.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Shipping Charges</h2>
      <p className="text-gray-700 mb-6">
        A non-refundable shipping fee of <strong>Rs.49/-</strong> is charged for all prepaid orders and <strong>Rs.99/-</strong> is charged for all Cash-On-Delivery orders.
      </p>
    </div>

    {/* Right Column */}
    <div>
      <h2 className="text-2xl font-semibold mb-3">Shipping Time</h2>
      <p className="text-gray-700 mb-4">
        This refers to the time it takes for items to be shipped from our warehouse to the destination. Pickrr, which is India’s best logistics service provider, ships our orders.
      </p>
      <p className="text-gray-700 mb-4">
        After processing and leaving the warehouse, prepaid orders take between <strong>3-5 business days</strong> while COD orders take <strong>5-7 business days</strong> to arrive at the destination.
      </p>
      <p className="text-gray-700 mb-6">
        However, due to COVID-19 restrictions, festivals, and extreme weather conditions, there might be slight delays in delivery.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Need Help?</h2>
      <p className="text-gray-700">
        For any concerns regarding delivery status, email us at <a href="mailto:support@scooboo.in" className="text-blue-600 underline">support@scooboo.in</a> or call our toll-free number <strong>1800 309 9696</strong>.
      </p>
    </div>
  </div>
</section>

    

{/* Support Icons Section */}
<section className="bg-red-100 py-12">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    <div>
      <FiMessageCircle className="mx-auto mb-3 text-gray-800" size={36} />
      <h3 className="font-semibold text-gray-900 mb-1">Get in touch</h3>
      <p className="text-gray-600 text-sm">Expert help & advice</p>
    </div>
    <div>
      <FiRotateCw className="mx-auto mb-3 text-gray-800" size={36} />
      <h3 className="font-semibold text-gray-900 mb-1">Returns & exchanges</h3>
      <p className="text-gray-600 text-sm">All you need to know</p>
    </div>
    <div>
      <FiGift className="mx-auto mb-3 text-gray-800" size={36} />
      <h3 className="font-semibold text-gray-900 mb-1">Rewards</h3>
      <p className="text-gray-600 text-sm">Unlock Exclusive Benefits</p>
    </div>
    <div>
      <FiBox className="mx-auto mb-3 text-gray-800" size={36} />
      <h3 className="font-semibold text-gray-900 mb-1">Bulk Order</h3>
      <p className="text-gray-600 text-sm">Get Customized Stationery</p>
    </div>
  </div>
</section>

    </>
  );
}
