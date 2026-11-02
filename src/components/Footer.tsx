"use client";

import React from "react";
import { Dumbbell, ArrowUp, Sparkles, MapPin, Mail } from "lucide-react";
import { GYM_DATA } from "@/data/gymData";

interface FooterProps {
  onOpenTrial: () => void;
}

export default function Footer({ onOpenTrial }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050506] border-t border-zinc-800 text-zinc-400 text-xs relative overflow-hidden">
      
      {/* Symphonix Tech Portfolio Showcase Banner */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-800/80 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-vault-lime/10 border border-vault-lime/40 flex items-center justify-center text-vault-lime shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-vault-lime px-2 py-0.5 rounded bg-zinc-800 border border-vault-lime/20">
                  DEVELOPER PORTFOLIO DEMONSTRATION
                </span>
                <span className="text-zinc-500 hidden sm:inline">•</span>
                <span className="text-white text-xs font-bold hidden sm:inline">Engineered by Symphonix Tech</span>
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white mt-1">
                Looking to build a high-converting, modern website for your gym, athletic brand, or wellness center?
              </h4>
              <p className="text-zinc-400 text-xs mt-0.5">
                Symphonix Tech designs lightning-fast, conversion-optimized web experiences tailored specifically for the fitness industry.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="/login"
              className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700 transition-colors"
            >
              Staff Portal Login
            </a>
            <button
              onClick={onOpenTrial}
              className="px-5 py-2.5 rounded-lg bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider hover:bg-vault-limeHover transition-all shadow-lime-glow/30"
            >
              Test VIP Pass Flow
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 text-vault-lime">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold tracking-tighter text-2xl text-white font-heading">
                  IRON<span className="text-vault-lime">VAULT</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 block -mt-1 font-medium">
                  FITNESS · INDIRANAGAR
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Bangalore&apos;s premier high-performance strength and athletic conditioning sanctuary. 
              12,000 sq.ft. of competition Eleiko barbells, certified Olympic coaching, and luxury contrast recovery.
            </p>

            {/* Social Media Links with Clean SVGs */}
            <div className="flex items-center gap-2 pt-2">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-vault-lime hover:border-vault-lime/50 transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-vault-lime hover:border-vault-lime/50 transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-vault-lime hover:border-vault-lime/50 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-vault-lime hover:border-vault-lime/50 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-white block">
              Navigation
            </span>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "#hero" },
                { name: "About Philosophy", href: "#about" },
                { name: "Training Programs", href: "#programs" },
                { name: "Master Coaches", href: "#trainers" },
                { name: "Facility Gallery", href: "#facilities" },
                { name: "Class Timetable", href: "#schedule" },
                { name: "Memberships", href: "#memberships" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-vault-lime transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Column */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-white block">
              Core Disciplines
            </span>
            <ul className="space-y-2">
              {[
                "Olympic Weightlifting & Eleiko Platforms",
                "1-on-1 Bespoke Body Recomposition",
                "Metabolic Fat Loss Conditioning",
                "CrossFit & 40m Sled Turf Arena",
                "Cardio VO2 Max & Skillmill Cadence",
                "Vault Strike Boxing & Aqua Bags",
                "Contrast Hydrotherapy Cold Plunge (8°C)",
              ].map((prog, i) => (
                <li key={i} className="hover:text-zinc-200 transition-colors">
                  {prog}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-white block">
              Club Location
            </span>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-vault-lime shrink-0 mt-0.5" />
                <span>Level 4 & 5, Apex Prestige Tower, 100 Feet Rd, Indiranagar, Bengaluru, 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-vault-lime shrink-0" />
                <a href="mailto:symphonixtech@gmail.com" className="text-zinc-300 hover:text-vault-lime font-mono transition-colors">
                  symphonixtech@gmail.com
                </a>
              </div>
              <div className="pt-2 text-[11px] text-zinc-500 leading-tight">
                Hours: Mon–Fri: 5:30 AM – 11:00 PM <br />
                Sat–Sun: 6:00 AM – 10:00 PM (24/7 for Pro/VIP)
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} IRONVAULT FITNESS. All rights reserved. Fictional brand demo for Symphonix Tech.
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-zinc-300">Privacy Policy (Demo)</a>
            <a href="#about" className="hover:text-zinc-300">Terms of Service</a>
            <a href="#contact" className="hover:text-zinc-300">Safety Standards</a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-vault-lime hover:border-vault-lime transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
