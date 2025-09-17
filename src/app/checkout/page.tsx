"use client";

import { useCartStore, CartItem } from "../store/cartStore";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "../store/useAuthStore";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const cartItems = useCartStore(s => s.items);
  const loadCart = useCartStore(s => s.loadCart);
  const clearCart = useCartStore(s => s.clearCart);
  const applyCoupon = useCartStore(s => s.applyCoupon);
  const coupon = useCartStore(s => s.coupon);
  const subtotal = useCartStore(s => s.subtotal)();
  const discount = useCartStore(s => s.discount)();
  const shipping = useCartStore(s => s.shipping)();
  const total = useCartStore(s => s.total)();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    houseNumber: "", streetAddress: "", city: "", state: "", pincode: "", landmark: ""
  });
  const [couponInput, setCouponInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false); // 🔹 Loader state

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    if (!user) return;
    const [firstName, ...rest] = (user.name ?? "").split(" ");
    setForm(f => ({
      ...f,
      firstName: firstName || "",
      lastName: rest.join(" ") || "",
      email: user.email || "",
      phone: user.phone || ""
    }));
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "pincode" && !/^\d{0,6}$/.test(value)) return;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) newErrors.phone = "Invalid phone";
    if (!form.houseNumber.trim()) newErrors.houseNumber = "Required";
    if (!form.streetAddress.trim()) newErrors.streetAddress = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.state.trim()) newErrors.state = "Required";
    if (!form.pincode.trim() || form.pincode.length !== 6) newErrors.pincode = "6 digits required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!user) return toast.error("User not logged in.");
    if (!cartItems.length) return toast.error("Cart is empty.");
    if (!validateForm()) return toast.error("Please fix the errors.");

    setLoading(true); // 🔹 Start loader

    const payloadCartItems = cartItems.map(i => ({
      productId: String(i.id),
      size: i.size || "",
      quantity: i.quantity
    }));

    const payload = {
      uid: user.uid,
      customerName: `${form.firstName} ${form.lastName}`,
      customerEmail: form.email,
      customerMobile: form.phone,
      cartItems: payloadCartItems,
      shippingAddress: {
        houseNumber: form.houseNumber,
        streetAddress: form.streetAddress,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        landmark: form.landmark
      },
      paymentMethod: "COD"
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Order failed");

      toast.success("🎉 Order placed!");
      clearCart();
      setForm({ firstName:"", lastName:"", email:"", phone:"", houseNumber:"", streetAddress:"", city:"", state:"", pincode:"", landmark:"" });
      setCouponInput("");
      router.push("/order-successful");
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false); // 🔹 Stop loader
    }
  };

  const handleApplyCoupon = () => {
    const input = couponInput.trim().toLowerCase();
    if (!input) return toast.error("Enter a coupon code.");
    if (coupon === input) return toast("Coupon already applied", { icon: "ℹ️" });
    if (input === "craftra10") { applyCoupon("craftra10"); toast.success("Coupon applied: 10% off 🎉"); }
    else toast.error("Invalid coupon code.");
  };

  const inputClass = (name: string) => `px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a0d2e] ${errors[name] ? "border-red-500" : ""}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid md:grid-cols-2 gap-8">
      {/* Shipping Form */}
      <div className="bg-white rounded-2xl border shadow-lg p-6 flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-[#7a0d2e] mb-4">Shipping & Contact Info</h2>
        <div className="grid grid-cols-2 gap-3">
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className={inputClass("firstName")} />
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className={inputClass("lastName")} />
        </div>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass("email")} />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile Number" className={inputClass("phone")} />
        <input name="houseNumber" value={form.houseNumber} onChange={handleChange} placeholder="House / Flat Number" className={inputClass("houseNumber")} />
        <input name="streetAddress" value={form.streetAddress} onChange={handleChange} placeholder="Street Address" className={inputClass("streetAddress")} />
        <div className="grid grid-cols-3 gap-3">
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className={inputClass("city")} />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className={inputClass("state")} />
          <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" maxLength={6} className={inputClass("pincode")} />
        </div>
        <input name="landmark" value={form.landmark} onChange={handleChange} placeholder="Landmark (optional)" className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a0d2e]" />
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`px-4 py-3 mt-2 text-white rounded-xl font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#7a0d2e] hover:bg-[#93123a]"}`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl border shadow-lg p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#7a0d2e] mb-5">🛒 Order Summary</h2>
        {cartItems.length === 0 ? <p className="text-gray-600">Your cart is empty</p> :
          <>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {cartItems.map((i: CartItem) => (
                <div key={`${i.id}-${i.size}`} className="flex flex-col border-b pb-3 gap-1">
                  <div className="flex items-center gap-4">
                    <Image src={i.image} alt={i.title} width={64} height={64} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-semibold">{i.title}</p>
                      <p className="text-sm text-gray-500">
                        Brand: {i.brand || "N/A"} | Category: {i.category || "N/A"} | Subcategory: {i.subcategory || "N/A"} | Gender: {i.gender || "Unisex"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Size: {i.size} | Qty: {i.quantity}
                      </p>
                    </div>
                    <p className="text-right font-semibold text-gray-700 text-sm">
                      ₹{(i.discountPrice ?? i.price) * i.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Apply Coupon</label>
              <div className="flex gap-2">
                <input value={couponInput} onChange={e => setCouponInput(e.target.value)} placeholder="Enter coupon code" className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a0d2e]" />
                <button onClick={handleApplyCoupon} className="px-4 py-2 bg-[#7a0d2e] text-white rounded-lg font-medium hover:opacity-90">Apply</button>
              </div>
              {coupon === "craftra10" && <p className="text-green-600 text-sm mt-2">Coupon applied: 10% off</p>}
            </div>

            <div className="mt-4 pt-4 border-t text-right space-y-2 text-sm sm:text-base">
              <p>Subtotal: ₹{subtotal}</p>
              {discount > 0 && <p className="text-green-700">Discount: − ₹{discount}</p>}
              <p>Shipping: {shipping === 0 ? <><s className="text-red-500">₹60</s> ₹0</> : `₹${shipping}`}</p>
              <p className="text-lg font-bold text-[#7a0d2e]">Total: ₹{total}</p>
            </div>
          </>
        }
      </div>
    </div>
  );
}
