/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-sync-scripts */
"use client";

import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientProvider from "./providers/ClientProvider"; 
import { initAuthListener } from "@/app/store/useAuthStore"; // 🔹 import store listener

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🔹 Initialize Firebase auth listener once
  useEffect(() => {
    initAuthListener();
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Comic+Relief&display=swap"
          rel="stylesheet"
        />

        {/* Tailwind via CDN (fallback) */}
        <script src="https://cdn.tailwindcss.com"></script>

        <style>{`
          body {
            font-family: 'Montserrat', sans-serif;
          }
          .font-comic {
            font-family: 'Comic Relief', cursive;
          }
        `}</style>
      </head>

      <body className="flex flex-col min-h-screen">
        <ClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
