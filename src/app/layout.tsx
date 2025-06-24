// File: src/app/layout.tsx

import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
        {/* Tailwind CSS via CDN for fallback */}
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          body {
            font-family: 'Montserrat', sans-serif;
          }
        `}</style>
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Toast positioned bottom-center */}
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
