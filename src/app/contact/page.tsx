"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Clock, Send, ChevronDown, User, Building2, MapPin } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    organisationName: "",
    location: "",
    queryType: "",
    message: "",
  });
  const [notification, setNotification] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/queries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        throw new Error(errorData.message || "Failed to submit query.");
      }

      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        organisationName: "",
        location: "",
        queryType: "",
        message: "",
      });

      // Show professional notification
      setNotification("✅ Query submitted successfully!");
      setTimeout(() => setNotification(""), 4000); // hide after 4s
    } catch (error) {
      const err = error as Error;
      console.error("❌ Error submitting query:", err);
      setNotification(`❌ ${err.message}`);
      setTimeout(() => setNotification(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full py-12 px-6 text-center bg-[#7a0d2e] text-white"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
        <div className="flex flex-col md:flex-row justify-center gap-6 text-sm md:text-base">
          <ContactInfo icon={<Mail size={18} />} text="fashion.count88@gmail.com" />
          <ContactInfo icon={<Phone size={18} />} text="+91 8595534390" />
          <ContactInfo icon={<Clock size={18} />} text="Mon–Fri, 9:30 AM – 5:30 PM" />
        </div>
      </motion.section>

      {/* Contact Form */}
      <section className="flex justify-center py-12 px-4 bg-gray-50 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-3xl"
        >
          <h2 className="text-2xl font-semibold text-center text-[#7a0d2e] mb-8">
            Submit Your Query
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputWithIcon
                placeholder="Name *"
                type="text"
                name="name"
                required
                icon={<User size={18} />}
                value={formData.name}
                onChange={handleChange}
              />
              <InputWithIcon
                placeholder="Phone Number *"
                type="tel"
                name="phoneNumber"
                required
                icon={<Phone size={18} />}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <InputWithIcon
                placeholder="Email"
                type="email"
                name="email"
                icon={<Mail size={18} />}
                value={formData.email}
                onChange={handleChange}
              />
              <InputWithIcon
                placeholder="Organisation Name"
                type="text"
                name="organisationName"
                icon={<Building2 size={18} />}
                value={formData.organisationName}
                onChange={handleChange}
              />
              <InputWithIcon
                placeholder="Location"
                type="text"
                name="location"
                icon={<MapPin size={18} />}
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Query Type Dropdown */}
            <div className="relative">
              <select
                required
                name="queryType"
                value={formData.queryType}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#7a0d2e] pl-12 pr-10 pt-3 pb-3 bg-transparent text-[#7a0d2e] focus:outline-none focus:ring-2 focus:ring-[#7a0d2e] appearance-none"
              >
                <option value="" disabled>
                  Query Type *
                </option>
                <option>Bulk Purchase</option>
                <option>Reseller</option>
                <option>Partnership</option>
                <option>Custom Requirement</option>
                <option>Others</option>
              </select>
              <ChevronDown size={18} className="absolute right-4 top-3 text-[#7a0d2e] pointer-events-none" />
              <Send size={18} className="absolute left-4 top-3 text-[#7a0d2e]" />
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                rows={5}
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-[#7a0d2e] rounded-xl pl-12 pr-4 pt-3 pb-2 bg-transparent text-[#7a0d2e] focus:outline-none focus:ring-2 focus:ring-[#7a0d2e]"
              />
              <Mail size={18} className="absolute left-4 top-3 text-[#7a0d2e]" />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-[#7a0d2e] text-white px-6 py-2 rounded-full hover:bg-black transition disabled:opacity-60"
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <Send size={16} />
                )}
                {loading ? "Sending..." : "Send"}
              </motion.button>
            </div>
          </form>

          {/* Notification */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white text-[#333] px-6 py-3 rounded-full shadow-lg border border-gray-200 z-50"
              >
                {notification}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}

// Contact Info Item
function ContactInfo({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {icon}
      <span>{text}</span>
    </div>
  );
}

// Input field with icon and placeholder
function InputWithIcon({
  placeholder,
  type,
  name,
  required,
  icon,
  value,
  onChange,
}: {
  placeholder: string;
  type: string;
  name: string;
  required?: boolean;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className="relative">
      {icon && <span className="absolute left-4 top-3 text-[#7a0d2e]">{icon}</span>}
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#7a0d2e] pl-12 pr-4 pt-3 pb-2 bg-transparent text-[#7a0d2e] focus:outline-none focus:ring-2 focus:ring-[#7a0d2e]"
      />
    </div>
  );
}
