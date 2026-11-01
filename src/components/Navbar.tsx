"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Dumbbell, Menu, X, ShieldCheck, ChevronRight, Mail } from "lucide-react";
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

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Trainers", href: "#trainers" },
    { name: "Facilities", href: "#facilities" },
    { name: "Memberships", href: "#memberships" },
    { name: "Transformations", href: "#transformations" },
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
        isScrolled
          ? "bg-[#09090b]/92 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
          : "bg-gradient-to-b from-black/95 to-transparent py-4 sm:py-5"
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
            {navLinks.map((link) => (
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

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenTrial()}
              className="sm:hidden px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-black bg-vault-lime rounded-full"
            >
              Free Trial
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-vault-lime transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#0c0c0e]/98 border-b border-zinc-800 backdrop-blur-xl shadow-2xl transition-all duration-300 max-h-[85vh] overflow-y-auto">
          <div className="px-6 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-2 pb-4 border-b border-zinc-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-vault-lime hover:border-vault-lime/50 transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrial();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-vault-lime text-black font-extrabold uppercase tracking-wider text-xs shadow-lime-glow hover:bg-vault-limeHover transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Claim Free 3-Day Pass</span>
              </button>

              <div className="flex items-center justify-between text-xs text-zinc-400 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/50">
                <a
                  href={`mailto:${GYM_DATA.brand.email}`}
                  className="flex items-center gap-1.5 text-zinc-300 hover:text-vault-lime transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-vault-lime" />
                  <span>{GYM_DATA.brand.email}</span>
                </a>
                <span className="text-zinc-500 text-[11px]">Indiranagar, BLR</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
