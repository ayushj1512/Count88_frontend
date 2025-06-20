// File: src/app/layout.tsx
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
        {/* Tailwind CDN - client-side only, so it won’t affect SSR */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Fallback font styling */}
        <style>{`
          body {
            font-family: 'Montserrat', sans-serif;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
