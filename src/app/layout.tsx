import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IRONVAULT FITNESS | Luxury Strength & Performance Gym - Indiranagar, Bangalore",
  description: "Experience Bangalore's premier high-end fitness sanctuary. 12,000 sq.ft. of world-class Eleiko & Hammer Strength equipment, elite coaching, luxury recovery spa & 24/7 access. Portfolio demo created by Symphonix Tech.",
  keywords: "gym in bangalore, luxury gym, ironvault fitness, personal training indiranagar, strength and conditioning, symphonix tech demo",
  openGraph: {
    title: "IRONVAULT FITNESS | Build Strength. Break Limits.",
    description: "Bangalore's most prestigious strength sanctuary. Eleiko calibrated equipment, private training bays, cryotherapy, and science-backed coaching.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&family=Teko:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070707] text-[#F5F5F7] font-sans antialiased selection:bg-[#CCFF00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
