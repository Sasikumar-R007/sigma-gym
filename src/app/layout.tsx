import type { Metadata } from "next";
import { Inter, Outfit, Teko } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const teko = Teko({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-teko",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IRONVAULT FITNESS | Luxury Strength & Performance Gym - Indiranagar, Bangalore",
  description: "Experience Bangalore's premier high-end fitness sanctuary. 12,000 sq.ft. of world-class Eleiko & Hammer Strength equipment, elite coaching, luxury recovery spa & 24/7 access. Portfolio demo created by Symphonix Tech.",
  keywords: "gym in bangalore, luxury gym, ironvault fitness, personal training indiranagar, strength and conditioning, symphonix tech demo",
  openGraph: {
    title: "IRONVAULT FITNESS | Build Strength. Break Limits.",
    description: "Bangalore's most prestigious strength sanctuary. Eleiko calibrated equipment, private training bays, cryotherapy, and science-backed coaching.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${teko.variable} bg-[#070707] text-[#F5F5F7] font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
