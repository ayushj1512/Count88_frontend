/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Mail, Lock, LogIn, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/app/store/useAuthStore";
import { auth } from "@/app/utils/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  sendPasswordResetEmail,
} from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  // 🔹 Email/Password login
  const handleCredentialsAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCred: UserCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      setUser(userCred.user);
      setLoading(false);
      router.push(callbackUrl);
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) setError(err.message);
      else setError("Invalid credentials.");
    }
  };

  // 🔹 Google login
  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const userCred: UserCredential = await signInWithPopup(auth, provider);

      setUser(userCred.user);
      setLoading(false);
      router.push(callbackUrl);
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) setError(err.message);
      else setError("Google login failed.");
    }
  };

  // 🔹 Forgot password
  const handlePasswordReset = async () => {
    if (!resetEmail) {
      setResetMessage("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("✅ Reset link sent! Check your email.");
    } catch (err: any) {
      setResetMessage(err.message || "Failed to send reset email.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">
        {/* Greeting */}
        <div className="text-center mb-1">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome to <span className="text-[#7a0d2e]">Count88</span>
          </h2>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#7a0d2e] mb-6">
          Please Sign In to continue.
        </h1>

        {/* Error */}
        {error && (
          <p className="mb-4 text-center text-red-500 text-sm">{error}</p>
        )}

        {/* Email / Password */}
        <form onSubmit={handleCredentialsAuth} className="space-y-4">
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

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsResetOpen(true)}
              className="text-sm text-[#7a0d2e] hover:underline"
            >
              Forgot password?
            </button>
          </div>

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
                <LogIn className="w-5 h-5" /> Continue with Email
              </>
            )}
          </button>
        </form>

        {/* Not registered link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Not registered?{" "}
          <Link
            href="/login/register"
            className="text-[#7a0d2e] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
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

      {/* 🔹 Forgot Password Modal */}
      {isResetOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
            <button
              onClick={() => {
                setIsResetOpen(false);
                setResetMessage("");
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-[#7a0d2e] mb-4">
              Reset Password
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-[#7a0d2e]/50"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            {resetMessage && (
              <p className="text-sm mb-3 text-center text-gray-600">
                {resetMessage}
              </p>
            )}
            <button
              onClick={handlePasswordReset}
              className="w-full bg-[#7a0d2e] text-white py-2 rounded-lg hover:bg-[#5a0a22] transition"
            >
              Send Reset Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
