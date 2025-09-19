"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";

interface Address {
  _id: string;
  houseNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export default function AddressOverview() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const uid = user?.uid; // Firebase UID from AuthStore

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!uid) return;
      try {
        const res = await fetch(`${API_BASE_URL}/api/address/${uid}`);
        const data = await res.json();
        if (res.ok) setAddresses(data.data || []);
        else toast.error(data.message || "Failed to fetch addresses");
      } catch {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, [uid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span className="animate-pulse text-gray-500">Loading addresses...</span>
      </div>
    );
  }

  if (!uid) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-600">
        Please log in to view addresses.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header: title + manage button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#7a0d2e]">My Addresses</h2>
        <button
          onClick={() => router.push("/profile/address")}
          className="px-4 py-2 bg-[#7a0d2e] text-white rounded-md hover:bg-[#5c081f] transition"
        >
          Manage Address
        </button>
      </div>

      {/* Address Cards: horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {/* Add Address card if no addresses */}
        {addresses.length === 0 && (
          <div
            onClick={() => router.push("/profile/add-address")}
            className="min-w-[250px] border border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition flex-shrink-0"
          >
            <span className="text-4xl text-[#7a0d2e] font-bold">+</span>
            <span className="ml-2 text-gray-600 font-medium">Add Address</span>
          </div>
        )}

        {addresses.map((addr) => (
          <div
            key={addr._id}
            className="min-w-[250px] border rounded-lg p-4 shadow-sm hover:shadow-md transition flex-shrink-0"
          >
            <p className="font-medium">
              {addr.houseNumber}, {addr.streetAddress}
            </p>
            <p>
              {addr.city}, {addr.state} - {addr.pincode}
            </p>
            {addr.landmark && (
              <p className="text-gray-500 text-sm">Landmark: {addr.landmark}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
