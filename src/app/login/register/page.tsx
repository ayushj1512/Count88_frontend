/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Mail, Lock, User, Phone, UserPlus } from "lucide-react";
import Image from "next/image";

// 🔹 Firebase
import { auth } from "@/app/utils/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  AuthError,
} from "firebase/auth";

/* ✅ Wrapper with Suspense */
export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-10">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}

/* ✅ Actual Form Component */
function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Register handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // ✅ Create user
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // ✅ Update profile with name
      await updateProfile(userCred.user, { displayName: form.name });

      setLoading(false);
      router.push(callbackUrl);
    } catch (err: unknown) {
      setLoading(false);
      const errorMessage =
        (err as AuthError)?.message || "Unable to register. Please try again.";
      setError(errorMessage);
    }
  };

  // 🔹 Google sign-up
  const handleGoogleAuth = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push(callbackUrl);
    } catch (err: unknown) {
      const errorMessage =
        (err as AuthError)?.message || "Google sign-in failed";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">
        {/* Greeting */}
        <p className="text-center text-gray-600 text-sm mb-2">
          Let’s get you started with Count88
        </p>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#7a0d2e] mb-6">
          Create Your Account
        </h1>

        {/* Error */}
        {error && (
          <p className="mb-4 text-center text-red-500 text-sm">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#7a0d2e]/50">
            <User className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-2 py-1 outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#7a0d2e]/50">
            <Phone className="w-5 h-5 text-gray-400" />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-2 py-1 outline-none"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              pattern="[0-9]{10}"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#7a0d2e]/50">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-2 py-1 outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#7a0d2e]/50">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-2 py-1 outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#7a0d2e]/50">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-2 py-1 outline-none"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#7a0d2e] text-white py-2 hover:bg-[#5a0a22] transition disabled:opacity-70 shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Please wait...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" /> Sign up
              </>
            )}
          </button>
        </form>

        {/* Already have account? */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already registered?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-[#7a0d2e] font-medium hover:underline"
          >
            Sign in
          </button>
        </p>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Auth */}
        <button
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition shadow-sm"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
