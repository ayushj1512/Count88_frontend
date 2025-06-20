'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaEnvelope, FaUndo, FaGift, FaBox } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <>
      <Header />

     

      {/* Get in Touch */}
      <section className="max-w-full h-auto py-12 px-4 text-center bg-pink-50">
        <h2 className="text-4xl font-bold mb-4">GET IN TOUCH</h2>
        <p className="text-md mb-1">
          Email:{' '}
          <a href="mailto:support@craftra.com" className="text-blue-600 underline">
            support@craftra.com
          </a>
        </p>
        <p className="text-md mb-4">Call: 82888-80584</p>
        <p className="text-gray-500 text-sm">
          Available from Monday to Friday (9:30 AM – 5:30 PM)
        </p>
      </section>

      {/* Contact Form */}
      <section className="max-w-full  mx-auto pt-10 px-4 pb-20">
  <h2 className="text-3xl font-bold bg-black text-white text-center mb-8">Contact form</h2>
  <form className="space-y-6">
    <div className="grid grid-cols-1 text-black md:grid-cols-2 gap-6 ml-10 max-w-5xl items-center">
      <InputField label="Name *" type="text" required />
      <InputField label="Email *" type="email" required />
      <div className="md:col-span-2">
        <InputField label="Phone" type="tel" />
      </div>
      <div className="md:col-span-2">
        <label className="block font-semibold mb-1 text-white">Message *</label>
        <textarea
          rows={6}
          required
          className="w-full border border-gray-300 rounded-2xl p-4 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Your message"
        />
      </div>
    </div>
    <div className="flex justify-center">
  <button 
    type="submit"
    className="bg-black text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
  >
    Send
  </button>
</div>
  </form>
</section>

     {/* Info Boxes */}
      <div className="bg-pink-50 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center px-4">
          <InfoCard icon={<FaEnvelope size={28} />} title="Get in touch" subtitle="Expert help & advice" />
          <InfoCard icon={<FaUndo size={28} />} title="Returns & exchanges" subtitle="All you need to know" />
          <InfoCard icon={<FaGift size={28} />} title="Rewards" subtitle="Unlock Exclusive Benefits" />
          <InfoCard icon={<FaBox size={28} />} title="Bulk Order" subtitle="Get Customized Stationery" />
        </div>
      </div>
      <Footer />
    </>
  );
}

// Reusable info box component
function InfoCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition">
      <div className="mb-2">{icon}</div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}

// Reusable input field
function InputField({
  label,
  type,
  required,
}: {
  label: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type={type}
        required={required}
        className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
