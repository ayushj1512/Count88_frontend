"use client";

import { useCartStore } from "../store/cartStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ShippingInfo from "../components/ShippingInfo";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const coupon = useCartStore((state) => state.coupon);
  const subtotal = useCartStore((state) => state.subtotal)();
  const discount = useCartStore((state) => state.discount)();
  const shipping = useCartStore((state) => state.shipping)();
  const total = useCartStore((state) => state.total)();
  const router = useRouter();

  const [couponInput, setCouponInput] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    houseNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "pincode" && !/^\d{0,6}$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const isFormComplete = Object.values(form).every((v) => v.trim() !== "");

  const handleCheckout = async () => {
    if (!isFormComplete) return toast.error("Please fill out all fields.");
    if (form.pincode.length !== 6)
      return toast.error("Pincode must be 6 digits.");

    try {
      const payload = {
        customerName: `${form.firstName} ${form.lastName}`,
        customerEmail: form.email,
        customerMobile: form.phone,
        products: cartItems.map((item) => ({
          productId: String(item.id), // 🔁 Ensure it's a string for MongoDB schema
          name: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        totalProducts: cartItems.length,
        totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: subtotal - discount + shipping,
        shippingAmount: shipping,
        shippingAddress: {
          houseNumber: form.houseNumber,
          streetAddress: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          landmark: form.landmark,
        },
        paymentMethod: "COD",
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Order creation failed.");

      toast.success("🎉 Order placed successfully!");
      clearCart();
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        houseNumber: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
      });
      setCouponInput("");
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      console.error("Checkout error:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong during checkout.";
      toast.error(message);
    }
  };

  const handleApplyCoupon = () => {
    const input = couponInput.trim().toLowerCase();
    if (!input) return toast.error("Please enter a coupon code.");
    if (coupon === input) {
      toast("Coupon already applied.", { icon: "ℹ️" });
      return;
    }

    if (input === "craftra10") {
      applyCoupon("craftra10");
      toast.success("Coupon applied: 10% off 🎉");
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 sm:gap-10">
        <div>
          <ShippingInfo
            form={form}
            onChange={handleChange}
            onCheckout={handleCheckout}
            isFormComplete={isFormComplete}
            cartItemCount={cartItems.length}
          />
        </div>

        <div className="bg-white rounded-xl border shadow p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Your cart is empty.</p>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-3"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-right font-semibold text-gray-700 text-sm">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Apply Coupon
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 border rounded-md"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  >
                    Apply
                  </button>
                </div>
                {coupon === "craftra10" && (
                  <p className="text-green-600 text-sm mt-2">
                    Coupon applied: 10% off
                  </p>
                )}
              </div>

              {subtotal - discount < 500 ? (
                <p className="mt-4 text-yellow-700 text-sm">
                  Add ₹{500 - (subtotal - discount)} more for free shipping 🚚
                </p>
              ) : (
                <p className="mt-4 text-green-700 text-sm">
                  You are getting <strong>free shipping 🚚</strong>
                </p>
              )}

              <div className="mt-6 pt-4 border-t text-right space-y-1 text-sm sm:text-base">
                <p className="text-gray-700">
                  Subtotal: <span className="font-medium">₹{subtotal}</span>
                </p>
                {discount > 0 && (
                  <p className="text-green-700">
                    Discount: <span className="font-medium">− ₹{discount}</span>
                  </p>
                )}
                <p className="text-gray-700">
                  Shipping:{" "}
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <>
                        <s className="text-red-500">₹60</s> ₹0
                      </>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Total: ₹{total}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
