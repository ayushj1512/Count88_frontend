"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { X, Plus } from "lucide-react";
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

export default function AddressPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const uid = user?.uid; // get Firebase UID from AuthStore

  // Fetch all addresses
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

  // Remove an address
  const handleRemove = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/address/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to remove address");
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
      toast.success("Address removed successfully");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="animate-pulse text-gray-500">Loading addresses...</span>
      </div>
    );
  }

  if (!uid) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Please log in to manage your addresses.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#7a0d2e]">My Addresses</h1>
        <button
          onClick={() => router.push("/add-address")}
          className="flex items-center gap-2 px-4 py-2 bg-[#7a0d2e] text-white rounded-md hover:bg-[#5c081f] transition"
        >
          <Plus className="w-4 h-4" /> Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div
          onClick={() => router.push("/add-address")}
          className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:bg-gray-50 transition"
        >
          <Plus className="text-4xl text-[#7a0d2e]" />
          <p className="mt-2 text-gray-600 font-medium">Add your first address</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition"
            >
              <button
                onClick={() => handleRemove(addr._id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-red-100 hover:bg-red-200"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>

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
      )}
    </div>
  );
}
