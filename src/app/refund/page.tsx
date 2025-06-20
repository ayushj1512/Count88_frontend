"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiMessageCircle, FiRotateCw, FiGift, FiBox } from "react-icons/fi";

export default function RefundPolicyPage() {
    return (
        <>
            <Header />

            {/* Main Content */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold mb-8 text-center bg-teal-100">REFUND AND CANCELLATION POLICY</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">Refund Eligibility</h2>
                        <p>
                            We offer refunds for damaged or defective products within 10 business days of delivery, subject to our quality inspection.
                        </p>

                        <h2 className="text-2xl font-semibold">Return Process</h2>
                        <p>
                            To initiate a return, please contact us at{" "}
                            <a href="mailto:craftra1199@gmail.com" className="text-blue-600 underline">
                                craftra1199@gmail.com
                            </a>{" "}
                            with your order details and product photos. Once approved, return the item in its original packaging.
                        </p>

                        <h2 className="text-2xl font-semibold">Order Cancellation</h2>
                        <p>
                            You may cancel your order before it is dispatched. Once dispatched, orders cannot be cancelled. To cancel an order, email us at{" "}
                            <a href="mailto:craftra1199@gmail.com" className="text-blue-600 underline">
                                craftra1199@gmail.com
                            </a>{" "}
                            with your order number.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">Refund Timeframe</h2>
                        <p>
                            Refunds are processed within 7–10 business days after we receive the returned item. We'll notify you via email once it’s processed.
                        </p>

                        <h2 className="text-2xl font-semibold">Non-Refundable Items</h2>
                        <p>
                            Personalized items, opened hygiene products, and gift cards are non-refundable unless defective or damaged on arrival.
                        </p>

                        <h2 className="text-2xl font-semibold">Right to Refuse</h2>
                        <p>
                            Craftra reserves the right to refuse any return or refund if the returned product does not meet our return policy conditions.
                        </p>

                    </div>
                </div>
            </section>
            <hr></hr>
            <div className="max-w-4xl mx-auto px-6 py-16">
                <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
                <p className="text-gray-700">
                    If you have any questions or concerns about your return, feel free to contact our customer support team at{" "}
                    <a href="mailto:support@scooboo.in" className="text-blue-600 underline">
                        craftra1199@gmail.com
                    </a>
                    . We're here to help!
                </p>
            </div>


            {/* Info Icons Section */}
            <section className="bg-teal-100 py-12">
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

            <Footer />
        </>
    );
}
