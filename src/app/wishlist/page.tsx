"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Product {
  _id: string;
  slug: string;
  name: string;
  price: number;
  images: { url: string }[];
}

interface WishlistItem {
  _id: string;
  productId: Product;
}

export default function WishlistPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.uid) return;
      try {
        const res = await fetch(`${API_BASE_URL}/api/wishlist/${user.uid}`);
        const data = await res.json();
        if (res.ok) setWishlist(data.data);
        else toast.error(data.message || "Failed to fetch wishlist");
      } catch {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user?.uid]);

  const handleRemove = async (productId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/wishlist/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.uid, productId }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Removed from wishlist");
        setWishlist((prev) => prev.filter((item) => item.productId._id !== productId));
      } else toast.error(data.message || "Failed to remove");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  if (!user?.uid)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Please log in to view your wishlist.
      </div>
    );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="animate-pulse text-gray-500">Loading wishlist...</span>
      </div>
    );

  if (wishlist.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Your wishlist is empty.
      </div>
    );

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#7a0d2e]">My Wishlist</h1>
        <p className="text-gray-600">Results: {wishlist.length}</p>
      </div>

      {/* Grid: 2 columns on mobile, 5 on md, 6 on lg */}
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition relative cursor-pointer"
            onClick={() => router.push(`/collection/${item.productId.slug}`)}
          >
            <Image
              src={item.productId.images?.[0]?.url || "/assets/placeholder.png"}
              alt={item.productId.name}
              width={300}
              height={200}
              className="object-cover w-full h-40 rounded-md"
            />
            <h2 className="mt-3 font-medium text-lg">{item.productId.name}</h2>
            <p className="text-gray-600 text-sm">₹{item.productId.price}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item.productId._id);
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-red-100 hover:bg-red-200"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
