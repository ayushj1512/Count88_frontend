"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { auth } from "../utils/firebase";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from "firebase/auth";
import {
  LogOut,
  User,
  ShoppingBag,
  Loader2,
} from "lucide-react";

interface ExtendedUser {
  uid?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  phone?: string | null;
}

interface Order {
  id: string;
  date: string;
  total: string;
  status: "Delivered" | "Shipped" | "Processing";
}

export default function ProfilePage() {
  const { user, setUser, clearUser } = useAuthStore();
  const [loadingUser, setLoadingUser] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  // 🔹 Sync Firebase Auth → Zustand store
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        clearUser();
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, [setUser, clearUser]);

  const orders: Order[] = [
    { id: "ORD123", date: "2025-09-01", total: "₹2,499", status: "Delivered" },
    { id: "ORD124", date: "2025-09-10", total: "₹1,299", status: "Shipped" },
    { id: "ORD125", date: "2025-09-12", total: "₹899", status: "Processing" },
  ];

  const statusColors: Record<Order["status"], string> = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Processing: "bg-yellow-100 text-yellow-700",
  };

  // 🔹 Global session loading
  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-6 h-6 animate-spin text-[#7a0d2e]" />
        <p className="ml-2 text-gray-600 text-lg">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const displayUser: ExtendedUser = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    phone: (user as FirebaseUser & { phoneNumber?: string }).phoneNumber,
    image: user.photoURL,
  };

  const handleConfirmLogout = async () => {
    await firebaseSignOut(auth);
    clearUser();
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6">
      {/* Profile Card */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 sm:p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-gradient-to-tr from-pink-100 to-red-100 rounded-full shadow-inner">
            <User className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
          </div>
          <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-gray-800">
            {displayUser.name ?? "Guest User"}
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            {displayUser.email}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
  
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Order History */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 sm:p-8 mt-6 sm:mt-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Order History
          </h3>
        </div>

        {orders.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
            {orders.map((order) => (
              <div
                key={order.id}
                className="min-w-[230px] sm:min-w-[280px] flex-shrink-0 p-4 border border-gray-200 rounded-lg text-sm sm:text-base bg-gray-50"
              >
                <p className="font-medium text-gray-800">
                  {order.id} • {order.date}
                </p>
                <p className="text-gray-600">{order.total}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">No orders yet.</p>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 sm:w-96 text-center">
            <p className="text-lg font-semibold text-gray-800">
             Leaving so soon?
            </p>
            <p className="text-sm text-gray-500 mt-2">
              We’ll miss you! Are you sure you want to log out?
            </p>
            <div className="mt-6 flex gap-3 justify-center">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition text-sm"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
