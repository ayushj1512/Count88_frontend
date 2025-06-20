"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiMessageCircle, FiRotateCw, FiGift, FiBox } from "react-icons/fi";
export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />
            <h1 className="text-4xl pt-10 pb-8 font-extrabold bg-purple-100 text-center">PRIVACY POLICY</h1>
            <p className="pl-20 pr-20 pb-8 mx-auto text-center text-gray-700 bg-purple-100">
                We value your privacy and appreciate the trust you place in us. This policy explains what information we collect, how we use it, and your choices regarding your personal data.
            </p>
            <section className="max-w-4xl mx-auto px-6 py-16 space-y-8">


                <div>
                    <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Contact details like name, email, mobile number, address, and IP.</li>
                        <li>Billing and payment info (credit card data is securely handled by our payment partner).</li>
                        <li>Content you provide like reviews or feedback.</li>
                        <li>Demographic info from surveys or preferences.</li>
                        <li>Device and usage data such as browser, pages visited, and session duration.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">How We Collect Information</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Directly from you when you register, comment, or contact us.</li>
                        <li>Passively using cookies, analytics tools (e.g., Google Analytics), and tracking pixels.</li>
                        <li>From third parties, such as social login providers.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>To confirm purchases and send transactional communications.</li>
                        <li>To respond to inquiries and provide support.</li>
                        <li>To personalize your experience and improve our site and products.</li>
                        <li>To analyze trends, detect fraud, and ensure security.</li>
                        <li>For marketing purposes like newsletters, with an option to unsubscribe.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Sharing of Information</h2>
                    <p className="text-gray-700">
                        We may share data with third-party service providers (e.g., payment processors, analytics), legal authorities if required, or in connection with business transfers like a sale or merger.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Email Opt‑Out</h2>
                    <p className="text-gray-700">
                        To stop receiving marketing emails, email us at{" "}
                        <a href="mailto:craftra1199@gmail.com" className="text-blue-600 underline">craftra1199@gmail.com</a>. Please allow up to 10 business days to process your request.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
                    <p className="text-gray-700">
                        We use cookies to enhance your experience and security. You can disable them in your browser settings, but this may affect site functionality.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Access, update, or delete your personal data by contacting us.</li>
                        <li>Withdraw consent for data processing or marketing emails.</li>
                        <li>Lodge a complaint with a data protection authority if needed.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Grievance Officer</h2>
                    <p className="text-gray-700">
                        Mrs. Ruchi Kataria<br />
                        Toll Free: 1800 309 96396<br />
                        Email: <a href="mailto:craftra1199@gmail.com" className="text-blue-600 underline">craftra1199@gmail.com</a>
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Updates to this Policy</h2>
                    <p className="text-gray-700">
                        Last updated: June 14, 2020. We may update from time to time; check this page for changes.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
                    <p className="text-gray-700">
                        This policy is governed by the laws of Chandigarh, India. Disputes shall be resolved in Chandigarh courts.
                    </p>
                </div>

            </section>
            {/* Info Icons Section */}
            <section className="bg-purple-100 py-12">
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
