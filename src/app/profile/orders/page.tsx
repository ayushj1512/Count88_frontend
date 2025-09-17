"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Loader2, ShoppingBag, Repeat } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ProductItem {
  productId: string;
  quantity: number;
}

interface ProductDetails {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: { url: string }[];
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
  const [productMap, setProductMap] = useState<Record<string, ProductDetails>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [reason, setReason] = useState("");

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
    if (!user?.uid) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/orders/user/${user.uid}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch orders");
        }
        const data: Order[] = await res.json();
        setOrders(data);

        const allProductIds = Array.from(new Set(data.flatMap(order => order.products.map(p => p.productId))));
        const productResponses = await Promise.all(
          allProductIds.map(id =>
            fetch(`${BASE_URL}/api/products/${id}`).then(r => r.json())
          )
        );

        const map: Record<string, ProductDetails> = {};
        productResponses.forEach(prod => {
          map[prod._id] = prod;
        });
        setProductMap(map);

      } catch (err: any) {
        console.error("Fetch orders error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.uid, BASE_URL]);

  const openModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setReason("");
    setModalOpen(true);
  };

  const handleWhatsApp = () => {
    if (!reason) return;
    const text = `Hello, I want to exchange/return my order #${selectedOrderId}. Reason: ${reason}`;
    const whatsappURL = `https://wa.me/918595534390?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, "_blank");
    setModalOpen(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-6 h-6 animate-spin text-[#7a0d2e]" />
        <span className="ml-2 text-gray-600">Loading orders...</span>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600">
        {error}
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-600">
        <ShoppingBag className="w-10 h-10 text-gray-400 mb-4" />
        <p>No orders found yet.</p>
      </div>
    );

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-red-600" /> Your Orders
      </h2>

      <div className="w-full max-w-5xl space-y-6">
        {orders.map(order => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 w-full"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-gray-800 text-lg">Order #{order.orderId}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.orderStatus]}`}>
                {order.orderStatus}
              </span>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-4">
              <div>
                <p><span className="font-semibold">Placed on:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><span className="font-semibold">Payment:</span> {order.paymentMethod}</p>
                <p><span className="font-semibold">Customer:</span> {order.customerName}</p>
                <p><span className="font-semibold">Email:</span> {order.customerEmail}</p>
                <p><span className="font-semibold">Mobile:</span> {order.customerMobile}</p>
              </div>
              <div>
                <p className="font-semibold">Shipping Address:</p>
                <p>{order.shippingAddress.houseNumber}, {order.shippingAddress.streetAddress}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                {order.shippingAddress.landmark && <p>Landmark: {order.shippingAddress.landmark}</p>}
              </div>
            </div>

            {/* Products */}
            <div className="mb-4">
              <p className="font-semibold text-gray-800 mb-2">Products:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.products.map(p => {
                  const product = productMap[p.productId];
                  if (!product) return null;
                  return (
                    <div
                      key={p.productId}
                      className="cursor-pointer border border-gray-200 rounded-lg p-2 hover:shadow-md transition"
                      onClick={() => router.push(`/collection/${product.slug}`)}
                    >
                      {product.images[0] && (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                      )}
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-gray-600 text-sm">Qty: {p.quantity}</p>
                      <p className="text-gray-600 text-sm">₹{product.price * p.quantity}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-between items-center text-gray-700 font-semibold mb-3">
              <span>Total Qty: {order.totalQuantity}</span>
              <span>Total: ₹{order.totalAmount} (Shipping: ₹{order.shippingAmount})</span>
            </div>

            {/* Action */}
            <button
              onClick={() => openModal(order.orderId)}
              className="w-full bg-[#7a0d2e] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#5f0a23] transition"
            >
              <Repeat className="w-4 h-4" /> Exchange / Return
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md">
            <h3 className="text-lg font-bold mb-4">Exchange / Return Reason</h3>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4 resize-none"
              rows={4}
              placeholder="Enter reason for exchange or return..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleWhatsApp}
                className="px-4 py-2 rounded-lg bg-[#7a0d2e] text-white hover:bg-[#5f0a23]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
