"use client";

import React, { useState } from "react";
import { Sparkles, MapPin, X, ArrowRight } from "lucide-react";

interface TopBannerProps {
  onOpenTrial: () => void;
}

export default function TopBanner({ onOpenTrial }: TopBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-neutral-950 via-zinc-900 to-neutral-950 border-b border-vault-lime/30 text-xs py-2 px-4 relative z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-zinc-300 mx-auto sm:mx-0">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-vault-lime text-black">
            <Sparkles className="w-3 h-3" /> VIP INTAKE
          </span>
          <span className="hidden md:inline font-medium text-white">
            Only 25 complimentary 3-Day VIP Passes available this month
          </span>
          <span className="text-zinc-400 hidden lg:inline">|</span>
          <span className="inline-flex items-center gap-1 text-zinc-300">
            <MapPin className="w-3 h-3 text-vault-lime" /> Indiranagar, Bangalore
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTrial}
            className="hidden sm:inline-flex items-center gap-1 text-vault-lime hover:text-white font-semibold transition-colors duration-200 group"
          >
            <span>Claim Free Pass</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <span className="hidden xl:inline-block px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] border border-zinc-700">
            Portfolio Demo by Symphonix Tech
          </span>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

