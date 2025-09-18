"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import axios from "axios";
import { Loader2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ProductItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface ShippingAddress {
  houseNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
  products: ProductItem[];
  totalProducts: number;
  totalQuantity: number;
  totalAmount: number;
  shippingAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: "COD" | "UPI" | "Card" | "NetBanking";
  createdAt: string;
}

export default function OrderHistory() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const statusColors: Record<Order["orderStatus"], string> = {
    Pending: "bg-gray-100 text-gray-800",
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Returned: "bg-purple-100 text-purple-800",
  };

  useEffect(() => {
    if (!user?.uid || !BASE_URL) return;

    const fetchOrders = async () => {
     try {
  const res = await axios.get(`${BASE_URL}/api/orders/user/${user.uid}`);
  const data = Array.isArray(res.data) ? res.data : [];
  setOrders(data);
} catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setError(err.response?.data?.error || "Failed to fetch orders");
  } else if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Failed to fetch orders");
  }
} finally {
  setLoading(false);
}

    };

    fetchOrders();
  }, [user?.uid, BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-6 h-6 animate-spin text-[#7a0d2e]" />
        <span className="ml-2 text-gray-600">Loading orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600">
        {error}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-600">
        <ShoppingBag className="w-10 h-10 text-gray-400 mb-4" />
        <p>No orders found yet.</p>
      </div>
    );
  }

  // Safe slice
  const displayedOrders = orders.slice(0, Math.min(3, orders.length));

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-red-600" /> Your Orders
      </h2>

      <div className="w-full max-w-4xl flex flex-col gap-4">
        {displayedOrders.map((order, idx) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
            className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200 cursor-pointer hover:shadow-lg transition"
            onClick={() => router.push("/profile/orders")}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-800">Order #{order.orderId}</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.orderStatus]}`}
              >
                {order.orderStatus}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-2">
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 text-sm mb-2">Payment: {order.paymentMethod}</p>

            <div className="mt-2">
              <p className="font-medium text-gray-800 mb-1">Products:</p>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                {Array.isArray(order.products) &&
                  order.products.map((p) => (
                    <li key={p.productId}>
                      {p.name} x{p.quantity} - ₹{p.price * p.quantity}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="mt-2 flex justify-between items-center text-gray-700 font-semibold">
              <span>Total Qty: {order.totalQuantity}</span>
              <span>Total: ₹{order.totalAmount}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {orders.length > 3 && (
        <button
          onClick={() => router.push("/profile/orders")}
          className="mt-6 px-6 py-2 bg-[#7a0d2e] text-white rounded-lg hover:bg-[#5f0a23] transition"
        >
          View All Orders
        </button>
      )}
    </div>
  );
}
