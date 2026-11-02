"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, Flame, Shield, Play, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onOpenTrial: () => void;
  onOpenVideo: () => void;
}

// Animated Counter Component with easeOutCubic transition
function AnimatedCounter({ end, suffix = "", prefix = "", duration = 1800 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animationFrameId = window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function Hero({ onOpenTrial, onOpenVideo }: HeroProps) {
  // Slideshow background images
  const slides = [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2070&auto=format&fit=crop",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector("#memberships");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-4 pb-14">
      
      {/* Background Animated Slideshow with Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide}
              alt="IronVault Fitness Luxury Gym Arena"
              fill
              priority={index === 0}
              className={`object-cover object-center filter brightness-[0.38] contrast-125 transition-transform duration-[6000ms] ${
                index === currentSlide ? "scale-105" : "scale-100"
              }`}
            />
          </div>
        ))}

        {/* Cinematic Multi-layered Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/90 via-black/40 to-[#070707]/90" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-vault-lime/10 blur-[140px] pointer-events-none rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-7">
          
          {/* Top Location & Accreditation Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 backdrop-blur-md text-xs sm:text-sm text-zinc-300 shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-vault-lime animate-ping" />
            <span className="text-vault-lime font-bold tracking-wider uppercase text-[10px] sm:text-xs">
              BANGALORE&apos;S PREMIER STRENGTH SANCTUARY
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400 text-xs hidden sm:inline">Indiranagar 100ft Road</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white font-heading leading-[0.95]">
              BUILD STRENGTH.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime via-vault-limeLight to-emerald-400">
                BREAK LIMITS.
              </span>
            </h1>
          </div>

          {/* Supporting Text - Reduced font size as requested */}
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl leading-relaxed font-normal">
            Where biomechanical science meets uncompromising heavy iron. 12,000 sq.ft. of world-class Eleiko & Hammer Strength equipment, 
            elite coaching, and a results-driven fitness culture engineered for lasting athletic transformation.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs text-zinc-300">
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
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-1">
            <button
              onClick={onOpenTrial}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-vault-lime text-black font-black uppercase tracking-wider text-xs sm:text-sm shadow-lime-glow hover:bg-vault-limeHover hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Flame className="w-4 h-4 fill-black text-black group-hover:scale-110 transition-transform" />
              <span>Book a Free Trial</span>
            </button>

            <a
              href="#memberships"
              onClick={scrollToPricing}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-white font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:border-vault-lime/50"
            >
              <Shield className="w-4 h-4 text-vault-lime" />
              <span>Explore Memberships</span>
            </a>

            <button
              onClick={onOpenVideo}
              className="w-full sm:w-auto px-4 py-3.5 rounded-full bg-transparent hover:bg-white/5 border border-transparent hover:border-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-vault-lime/20 flex items-center justify-center text-vault-lime">
                <Play className="w-3 h-3 fill-vault-lime translate-x-0.5" />
              </div>
              <span>Watch Virtual Tour</span>
            </button>
          </div>

          {/* Live Demonstration Stats Grid with Counting Transition */}
          <div className="w-full pt-6 sm:pt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl shadow-2xl">
              
              {/* Stat 1: 1,200+ */}
              <div className="flex flex-col items-center justify-center p-3 text-center border-r border-b border-zinc-800/60 md:border-b-0">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight flex items-baseline">
                  <AnimatedCounter end={1200} suffix="+" duration={1800} />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-lime mt-1">
                  Active Members
                </span>
                <span className="text-[11px] text-zinc-400 mt-0.5 hidden sm:inline">
                  Dedicated fitness community
                </span>
              </div>

              {/* Stat 2: 15+ */}
              <div className="flex flex-col items-center justify-center p-3 text-center border-b border-zinc-800/60 md:border-b-0 md:border-r">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight flex items-baseline">
                  <AnimatedCounter end={15} suffix="+" duration={1500} />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-lime mt-1">
                  Master Coaches
                </span>
                <span className="text-[11px] text-zinc-400 mt-0.5 hidden sm:inline">
                  CSCS & Olympic certified
                </span>
              </div>

              {/* Stat 3: 12,000 */}
              <div className="flex flex-col items-center justify-center p-3 text-center border-r border-zinc-800/60">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight flex items-baseline">
                  <AnimatedCounter end={12000} duration={2000} />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-lime mt-1">
                  Strength Floor
                </span>
                <span className="text-[11px] text-zinc-400 mt-0.5 hidden sm:inline">
                  Sq.Ft. premium facility
                </span>
              </div>

              {/* Stat 4: 24/7 */}
              <div className="flex flex-col items-center justify-center p-3 text-center">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight flex items-baseline">
                  <AnimatedCounter end={24} suffix="/7" duration={1600} />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-vault-lime mt-1">
                  Vault Access
                </span>
                <span className="text-[11px] text-zinc-400 mt-0.5 hidden sm:inline">
                  Biometric keyless entry
                </span>
              </div>

            </div>
          </div>

          {/* Slideshow indicator dots */}
          <div className="flex items-center gap-1.5 pt-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "w-6 bg-vault-lime" : "w-1.5 bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-2 flex flex-col items-center">
            <a
              href="#about"
              aria-label="Scroll to about section"
              className="text-zinc-500 hover:text-vault-lime transition-colors animate-bounce p-1"
            >
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
