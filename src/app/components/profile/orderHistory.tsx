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
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-6 h-6 animate-spin text-[#7a0d2e]" />
        <span className="ml-2 text-gray-600">Loading orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-red-600">
        {error}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-600">
        <ShoppingBag className="w-10 h-10 text-gray-400 mb-4" />
        <p>No orders found yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#7a0d2e] flex items-center gap-2">
         My Orders
        </h2>
        {orders.length > 0 && (
          <button
            onClick={() => router.push("/profile/orders")}
            className="px-4 py-2 bg-[#7a0d2e] text-white rounded-md hover:bg-[#5c081f] transition"
          >
            Manage Orders
          </button>
        )}
      </div>

      {/* Orders: horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            className="min-w-[280px] border rounded-lg p-4 shadow-sm hover:shadow-md transition flex-shrink-0 cursor-pointer bg-white"
            onClick={() => router.push("/profile/orders")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-800">#{order.orderId}</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.orderStatus]}`}
              >
                {order.orderStatus}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-1">
              Placed: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 text-sm mb-2">Payment: {order.paymentMethod}</p>

            <p className="font-medium text-gray-800 mb-1">Products:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm mb-2">
              {order.products.map((p) => (
                <li key={p.productId}>
                  {p.name} x{p.quantity} - ₹{p.price * p.quantity}
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center text-gray-700 font-semibold">
              <span>Total Qty: {order.totalQuantity}</span>
              <span>Total: ₹{order.totalAmount}</span>
            </div>
          </motion.div>
        ))}
      </div>


    </div>
  );
}
