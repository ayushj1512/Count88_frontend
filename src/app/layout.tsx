import { Suspense } from "react";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GATracker from "../app/components/GAtracker"; // 👈 Route tracking component

export const metadata = {
  title: "Craftra",
  description: "Art and craft products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Tailwind fallback via CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          body {
            font-family: 'Montserrat', sans-serif;
          }
        `}</style>

        {/* ✅ Google Analytics for B2C */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S0LVNNTB34"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S0LVNNTB34');
            `,
          }}
        />
      </head>

      <body className="flex flex-col min-h-screen">
        <Header />
        <Suspense fallback={null}>
          <GATracker />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
