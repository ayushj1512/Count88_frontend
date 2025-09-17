"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";

type ShippingInfoProps = {
  form: {
    firstName: string; lastName: string; email: string; phone: string;
    houseNumber: string; address: string; city: string; state: string;
    pincode: string; landmark: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCheckout: (u: { uid: string; name: string; email: string; mobile: string }) => void;
  isFormComplete: boolean; cartItemCount: number;
};

const inputClass =
  "px-4 py-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#7a0d2e] bg-white text-sm";

const ShippingInfo: React.FC<ShippingInfoProps> = ({ form, onChange, onCheckout, isFormComplete, cartItemCount }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  // ✅ Prefill without `any`
  useEffect(() => {
    if (!user) return;
    const [fn, ...rest] = (user.name ?? "").split(" ");
    const ln = rest.join(" ");
    if (!form.firstName && fn) onChange({ target: { name: "firstName", value: fn } } as React.ChangeEvent<HTMLInputElement>);
    if (!form.lastName && ln) onChange({ target: { name: "lastName", value: ln } } as React.ChangeEvent<HTMLInputElement>);
    if (!form.email && user.email) onChange({ target: { name: "email", value: user.email } } as React.ChangeEvent<HTMLInputElement>);
    if (!form.phone && user.phone) onChange({ target: { name: "phone", value: user.phone } } as React.ChangeEvent<HTMLInputElement>);
  }, [user, form, onChange]);

  const handleSubmit = async () => {
    if (!isFormComplete || !user?.uid || cartItemCount === 0 || loading) return;
    setLoading(true);
    try {
      await onCheckout({ uid: user.uid, name: `${form.firstName} ${form.lastName}`, email: form.email, mobile: form.phone });
      router.push("/order-successful");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-bold text-[#7a0d2e] mb-1">Shipping Information</h2>
      <p className="text-sm text-gray-500 mb-6">Please enter your shipping details below.</p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="firstName" value={form.firstName} onChange={onChange} placeholder="First Name" className={inputClass} />
          <input name="lastName" value={form.lastName} onChange={onChange} placeholder="Last Name" className={inputClass} />
        </div>
        <input type="email" name="email" value={form.email} onChange={onChange} placeholder="Email" className={inputClass} />
        <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="Phone Number" className={inputClass} />
        <input name="houseNumber" value={form.houseNumber} onChange={onChange} placeholder="House / Flat Number" className={inputClass} />
        <textarea name="address" value={form.address} onChange={onChange} placeholder="Street Address" rows={2} className={inputClass} />
        <input name="landmark" value={form.landmark} onChange={onChange} placeholder="Landmark (optional)" className={inputClass} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="city" value={form.city} onChange={onChange} placeholder="City" className={inputClass} />
          <input name="state" value={form.state} onChange={onChange} placeholder="State" className={inputClass} />
          <input name="pincode" value={form.pincode} onChange={onChange} placeholder="Pincode" maxLength={6} className={inputClass} />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormComplete || cartItemCount === 0 || loading || !user?.uid}
        className={`w-full mt-6 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 ${
          !isFormComplete || cartItemCount === 0 || loading || !user?.uid
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[#7a0d2e] text-white hover:bg-[#93123a]"
        }`}
      >
        {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Place Order"}
      </button>
    </div>
  );
};

export default ShippingInfo;
