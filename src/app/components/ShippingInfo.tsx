"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type ShippingInfoProps = {
  form: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    houseNumber: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onCheckout: () => void;
  isFormComplete: boolean;
  cartItemCount: number;
};

const inputClass =
  "px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FFD9B7] transition bg-white text-sm";

const ShippingInfo: React.FC<ShippingInfoProps> = ({
  form,
  onChange,
  onCheckout,
  isFormComplete,
  cartItemCount,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isFormComplete || cartItemCount === 0 || loading) return;
    setLoading(true);
    try {
      await onCheckout(); // Your API or payment logic here
      router.push("/order-successful");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Shipping Information</h2>
      <p className="text-sm text-gray-500 mb-6">Please enter your shipping details below.</p>

      <div className="space-y-4">
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            placeholder="First Name"
            className={inputClass}
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            placeholder="Last Name"
            className={inputClass}
          />
        </div>

        {/* Contact Info */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          className={inputClass}
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="Phone Number"
          className={inputClass}
        />

        {/* Address */}
        <input
          type="text"
          name="houseNumber"
          value={form.houseNumber}
          onChange={onChange}
          placeholder="House / Flat Number"
          className={inputClass}
        />
        <textarea
          name="address"
          value={form.address}
          onChange={onChange}
          placeholder="Street Address"
          rows={2}
          className={`${inputClass} resize-none`}
        />
        <input
          type="text"
          name="landmark"
          value={form.landmark}
          onChange={onChange}
          placeholder="Landmark (optional)"
          className={inputClass}
        />

        {/* City, State, Pincode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={onChange}
            placeholder="City"
            className={inputClass}
          />
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={onChange}
            placeholder="State"
            className={inputClass}
          />
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={onChange}
            placeholder="Pincode"
            className={inputClass}
            maxLength={6}
          />
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleSubmit}
        disabled={!isFormComplete || cartItemCount === 0 || loading}
        className={`w-full mt-6 py-3 rounded-md font-semibold text-lg border border-black flex justify-center items-center gap-2 transition ${!isFormComplete || cartItemCount === 0 || loading
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-[#FFF2E1] hover:bg-[#ffe4c1]"
          }`}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  );
};

export default ShippingInfo;
