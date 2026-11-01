"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Flame, Shield, Play, CheckCircle2 } from "lucide-react";
import { GYM_DATA } from "@/data/gymData";

interface HeroProps {
  onOpenTrial: () => void;
  onOpenVideo: () => void;
}

export default function Hero({ onOpenTrial, onOpenVideo }: HeroProps) {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector("#memberships");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-16">
      {/* Background Image with Dark Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="IronVault Fitness Luxury Gym Arena"
          fill
          priority
          className="object-cover object-center scale-105 animate-pulse-slow filter brightness-[0.38] contrast-125"
        />
        {/* Cinematic Multi-layered Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/90 via-black/40 to-[#070707]/90" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-vault-lime/10 blur-[140px] pointer-events-none rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          
          {/* Top Location & Accreditation Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 backdrop-blur-md text-xs sm:text-sm text-zinc-300 shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-vault-lime animate-ping" />
            <span className="text-vault-lime font-bold tracking-wider uppercase text-[11px] sm:text-xs">
              BANGALORE&apos;S PREMIER STRENGTH SANCTUARY
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400 text-xs hidden sm:inline">Indiranagar 100ft Road</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-heading leading-[0.95]">
              BUILD STRENGTH.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime via-vault-limeLight to-emerald-400">
                BREAK LIMITS.
              </span>
            </h1>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl leading-relaxed font-normal">
            Where biomechanical science meets uncompromising heavy iron. 12,000 sq.ft. of competition-grade Eleiko platforms, 
            world-class coaching, and a results-obsessed culture engineered for lasting athletic transformation.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-zinc-300">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-zinc-800 backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-vault-lime" />
              <span>Eleiko & Arsenal Strength</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-zinc-800 backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-vault-lime" />
              <span>CSCS & Olympic Coaches</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-zinc-800 backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-vault-lime" />
              <span>Contrast Hydrotherapy Spa</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
            <button
              onClick={onOpenTrial}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-vault-lime text-black font-extrabold uppercase tracking-wider text-sm shadow-lime-glow hover:bg-vault-limeHover hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Flame className="w-4 h-4 fill-black text-black group-hover:scale-110 transition-transform" />
              <span>Book a Free Trial</span>
            </button>

            <a
              href="#memberships"
              onClick={scrollToPricing}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:border-vault-lime/50"
            >
              <Shield className="w-4 h-4 text-vault-lime" />
              <span>Explore Memberships</span>
            </a>

            <button
              onClick={onOpenVideo}
              className="w-full sm:w-auto px-5 py-4 rounded-lg bg-transparent hover:bg-white/5 border border-transparent hover:border-zinc-800 text-zinc-300 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-vault-lime/20 flex items-center justify-center text-vault-lime">
                <Play className="w-3 h-3 fill-vault-lime translate-x-0.5" />
              </div>
              <span>Watch Virtual Tour</span>
            </button>
          </div>

          {/* Live Demonstration Stats Grid */}
          <div className="w-full pt-10 sm:pt-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl shadow-2xl">
              {GYM_DATA.stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-3 text-center border-r last:border-r-0 border-zinc-800/60"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight flex items-baseline">
                    <span>{stat.value}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-vault-lime mt-1">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-0.5 hidden sm:inline">
                    {stat.subtext}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-4 flex flex-col items-center">
            <a
              href="#about"
              aria-label="Scroll to about section"
              className="text-zinc-400 hover:text-vault-lime transition-colors animate-bounce p-2"
            >
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

