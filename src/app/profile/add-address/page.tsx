"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Home, MapPin, Building, Flag, Hash, Map } from "lucide-react";

export default function AddAddressPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const uid = user?.uid;

  const [form, setForm] = useState({
    houseNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "pincode" && !/^\d{0,6}$/.test(value)) return; // Only 6 digits
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormComplete =
    form.houseNumber.trim() &&
    form.streetAddress.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.pincode.trim();

  const handleSubmit = async () => {
    if (!uid) return toast.error("User not logged in");
    if (!isFormComplete) return toast.error("Please fill out all required fields.");
    if (form.pincode.length !== 6) return toast.error("Pincode must be 6 digits.");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, uid }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add address");

      toast.success("Address added successfully!");
      setForm({
        houseNumber: "",
        streetAddress: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
      });
      router.push("/profile/address");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { name: "houseNumber", placeholder: "House / Flat Number", icon: Home },
    { name: "streetAddress", placeholder: "Street / Area", icon: MapPin },
    { name: "city", placeholder: "City", icon: Building },
    { name: "state", placeholder: "State", icon: Flag },
    { name: "pincode", placeholder: "Pincode", icon: Hash },
    { name: "landmark", placeholder: "Landmark (optional)", icon: Map },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-12 min-h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-semibold mb-6 text-[#7a0d2e]">Add New Address</h1>

      <div className="grid grid-cols-1 gap-4">
        {formFields.map(({ name, placeholder, icon: Icon }) => (
          <div key={name} className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name={name}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              placeholder={placeholder}
              className="pl-10 pr-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#7a0d2e]"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-6 w-full py-3 bg-[#7a0d2e] text-white font-semibold rounded-md hover:bg-[#5c081f] transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Saving..." : "Add Address"}
      </button>
    </div>
  );
}
