"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dumbbell,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Mail,
  Flame,
  Users,
  Layers,
  Sparkles,
  Calendar,
  MapPin,
} from "lucide-react";
import { GYM_DATA } from "@/data/gymData";

interface NavbarProps {
  onOpenTrial: (planOrProgram?: string) => void;
}

export default function Navbar({ onOpenTrial }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "About", href: "#about", icon: Sparkles },
    { name: "Programs", href: "#programs", icon: Dumbbell },
    { name: "Trainers", href: "#trainers", icon: Users },
    { name: "Facilities", href: "#facilities", icon: Layers },
    { name: "Memberships", href: "#memberships", icon: ShieldCheck },
    { name: "Transformations", href: "#transformations", icon: Flame },
    { name: "Schedule", href: "#schedule", icon: Calendar },
    { name: "Contact", href: "#contact", icon: MapPin },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-[#09090b] border-b border-zinc-800 shadow-2xl py-3"
          : "bg-[#09090b]/95 sm:bg-gradient-to-b sm:from-black/95 sm:to-transparent py-3 sm:py-5 border-b border-zinc-900/40 sm:border-b-0 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link
            href="#hero"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            onClick={(e) => handleNavClick(e, "#hero")}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700/80 group-hover:border-vault-lime transition-all duration-300 shadow-md">
              <Dumbbell className="w-5 h-5 text-vault-lime group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-vault-lime animate-ping opacity-75" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-vault-lime" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold tracking-tight text-xl sm:text-2xl text-white font-heading">
                  IRON<span className="text-vault-lime">VAULT</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold px-1.5 py-0.2 rounded bg-zinc-800/80 border border-zinc-700">
                  BLR
                </span>
              </div>
              <span className="text-[8px] uppercase tracking-[0.25em] text-zinc-400 font-medium -mt-0.5">
                FITNESS · ATHLETIC CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.slice(0, 6).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Button (Clean Sleek Pill) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenTrial()}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-black uppercase tracking-wider text-black bg-vault-lime rounded-full overflow-hidden transition-all duration-300 hover:bg-vault-limeHover hover:shadow-lime-glow hover:scale-105 active:scale-95 group shadow-md"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Book Free Trial</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Action & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenTrial()}
              className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-black bg-vault-lime rounded-full shadow-sm hover:bg-vault-limeHover active:scale-95 transition-all"
            >
              Free Trial
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className={`p-2 rounded-lg border transition-all ${
                mobileMenuOpen
                  ? "bg-vault-lime text-black border-vault-lime"
                  : "bg-zinc-900 border-zinc-700 text-zinc-200 hover:text-white hover:border-vault-lime"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Solid Opaque Mobile Menu Drawer (Zero transparency, high contrast) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[61px] bottom-0 z-50 bg-[#09090b] border-t border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.98)] overflow-y-auto">
          <div className="max-w-lg mx-auto px-5 py-6 space-y-6">
            
            {/* Quick Title & Indiranagar Tag */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                NAVIGATION DIRECTORY
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-vault-lime font-bold">
                Indiranagar, Bangalore
              </span>
            </div>

            {/* Solid Grid Menu Items */}
            <div className="grid grid-cols-2 gap-2.5">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#131317] border border-zinc-800 hover:border-vault-lime hover:bg-zinc-800/90 text-white font-semibold text-xs transition-all shadow-md active:scale-95 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-black border border-zinc-700 flex items-center justify-center text-vault-lime group-hover:scale-110 transition-transform">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-heading tracking-wide uppercase text-[12px]">
                        {link.name}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-vault-lime group-hover:translate-x-0.5 transition-all" />
                  </a>
                );
              })}
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrial();
                }}
                className="w-full flex items-center justify-center gap-2 py-4 px-5 rounded-xl bg-vault-lime text-black font-black uppercase tracking-wider text-xs shadow-lime-glow hover:bg-vault-limeHover active:scale-95 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Claim Free 3-Day VIP Pass</span>
              </button>

              {/* Developer / Official Inquiries Card */}
              <div className="p-4 rounded-xl bg-[#131317] border border-zinc-800 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                  Official Inquiries & Demo Contact
                </span>
                <a
                  href={`mailto:${GYM_DATA.brand.email}`}
                  className="flex items-center gap-2 text-vault-lime text-xs font-mono font-bold hover:underline"
                >
                  <Mail className="w-4 h-4 text-vault-lime shrink-0" />
                  <span>{GYM_DATA.brand.email}</span>
                </a>
                <p className="text-[10px] text-zinc-500">
                  Engineered by Symphonix Tech for premium fitness centers.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
