"use client";

import { useCartStore } from "../store/cartStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ShippingInfo from "../components/ShippingInfo";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "pincode" && !/^\d{0,6}$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const isFormComplete = Object.values(form).every((v) => v.trim() !== "");

  const handleCheckout = async () => {
    if (!isFormComplete) return toast.error("Please fill out all fields.");
    if (form.pincode.length !== 6) return toast.error("Pincode must be 6 digits.");

    try {
      const payload = {
        customerName: `${form.firstName} ${form.lastName}`,
        customerEmail: form.email,
        customerMobile: form.phone,
        products: cartItems.map((item) => ({
          productId: String(item.id),
          name: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        totalProducts: cartItems.length,
        totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: subtotal - discount + shipping,
        shippingAmount: shipping,
        appliedCoupon: appliedCoupon?.code || null,
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

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

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
      const message = err instanceof Error ? err.message : "Something went wrong during checkout.";
      toast.error(message);
    }
  };

  const handleApplyCoupon = async () => {
    const input = couponInput.trim();
    if (!input) return toast.error("Please enter a coupon code.");
    if (appliedCoupon?.code?.toLowerCase() === input.toLowerCase()) {
      toast("Coupon already applied.", { icon: "ℹ️" });
      return;
    }

    try {
      await applyCoupon(input);
      const updatedCoupon = useCartStore.getState().appliedCoupon;
      if (updatedCoupon) {
        toast.success(
          `Coupon applied: ${
            updatedCoupon.discountType === "PERCENTAGE"
              ? `${updatedCoupon.discountValue}% off`
              : `₹${updatedCoupon.discountValue} off`
          } 🎉`
        );
        setCouponInput("");
      } else {
        toast.error("Invalid or inapplicable coupon.");
      }
    } catch (err) {
      console.error("Apply coupon error:", err);
      toast.error("Failed to apply coupon.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Shipping Form */}
        <div className="w-full lg:w-2/3">
          <ShippingInfo
            form={form}
            onChange={handleChange}
            onCheckout={handleCheckout}
            isFormComplete={isFormComplete}
            cartItemCount={cartItems.length}
          />
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl border shadow-lg p-6 sm:p-8 lg:sticky lg:top-20 h-fit">
          <h2 className="text-2xl font-semibold text-[#7a0d2e] mb-6">Order Summary</h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-8 flex flex-col items-center justify-center gap-4">
              <ShoppingCart className="h-16 w-16 text-[#7a0d2e] animate-bounce" />
              <p className="text-[#7a0d2e] text-xl sm:text-2xl font-bold">Your cart is empty!</p>
              <p className="text-gray-500">Browse products and add them to your cart to get started.</p>
              <button
                onClick={() => router.push("/")}
                className="mt-2 px-6 py-2 bg-[#7a0d2e] text-white font-semibold rounded-lg hover:bg-[#5c0a24] transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id + item.size}
                    className="flex items-center gap-4 border-b pb-3 hover:bg-gray-50 transition rounded-md"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="object-cover rounded border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 line-clamp-1">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                    </div>
                    <p className="text-right font-semibold text-gray-700 text-sm">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="mt-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">Apply Coupon</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a0d2e] transition"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-[#7a0d2e] text-white rounded-md hover:bg-[#5c081f] transition"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-[#7a0d2e] text-sm mt-2 font-medium">
                    Coupon applied:{" "}
                    {appliedCoupon.discountType === "PERCENTAGE"
                      ? `${appliedCoupon.discountValue}% off`
                      : `₹${appliedCoupon.discountValue} off`}
                  </p>
                )}
              </div>

              {/* Shipping Notice */}
              {subtotal - discount < 500 ? (
                <p className="mt-4 text-yellow-700 text-sm">
                  Add ₹{500 - (subtotal - discount)} more for free shipping 🚚
                </p>
              ) : (
                <p className="mt-4 text-green-700 text-sm font-medium">
                  You are getting <strong>free shipping 🚚</strong>
                </p>
              )}

              {/* Summary Totals */}
              <div className="mt-6 pt-6 border-t text-start space-y-2 text-sm sm:text-base text-right">
                <p className="text-gray-700">
                  Subtotal: <span className="font-medium">₹{subtotal}</span>
                </p>
                {discount > 0 && (
                  <p className="text-[#7a0d2e]">
                    Discount: <span className="font-medium">− ₹{discount}</span>
                  </p>
                )}
                <p className="text-gray-700">
                  Shipping:{" "}
                  <span className="font-medium">{shipping === 0 ? <><s className="text-red-500">₹60</s> ₹0</> : `₹${shipping}`}</span>
                </p>
                <p className="text-lg font-semibold text-gray-800">Total: ₹{total}</p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full mt-6 py-3 bg-[#7a0d2e] text-white font-semibold rounded-lg hover:bg-[#5c081f] transition"
              >
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
