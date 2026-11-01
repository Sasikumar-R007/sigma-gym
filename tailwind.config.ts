import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        vault: {
          black: "#060606",
          dark: "#0D0D0D",
          card: "#141414",
          cardHover: "#1A1A1A",
          charcoal: "#1F1F1F",
          border: "#2A2A2A",
          borderLight: "#3B3B3B",
          lime: "#CCFF00",
          limeHover: "#B8E600",
          limeLight: "#E5FF66",
          orange: "#FF5500",
          silver: "#999999",
          muted: "#666666",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-teko)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "lime-glow": "0 0 25px rgba(204, 255, 0, 0.35)",
        "lime-glow-lg": "0 0 45px rgba(204, 255, 0, 0.45)",
        "card-glow": "0 10px 30px -10px rgba(0,0,0,0.8)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
