"use client";

import React, { useState } from "react";
import { MapPin, Phone, Clock, ChevronDown, ChevronUp, Navigation, ExternalLink, ShieldCheck } from "lucide-react";
import { GYM_DATA } from "@/data/gymData";

interface ContactProps {
  onOpenTrial: () => void;
}

export default function Contact({ onOpenTrial }: ContactProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="contact" className="py-24 bg-[#070708] relative overflow-hidden border-t border-zinc-800/80">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-vault-lime/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-bold text-vault-lime uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>VISIT THE SANCTUARY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            CONNECT WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime via-white to-zinc-400">
              IRONVAULT CONCIERGE.
            </span>
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            Located in prime East Bangalore. Tour the floor, inspect the Swedish Eleiko equipment, 
            and speak with a Master Coach today.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          
          {/* Left Column: Details Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-vault-lime/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-vault-lime shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">Physical Location</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                    {GYM_DATA.brand.address}
                  </p>
                  <span className="inline-block mt-2 text-[11px] text-vault-lime font-medium">
                    Opposite Starbucks • Covered Valet Parking Included
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Lines */}
            <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-vault-lime/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-vault-lime shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">Concierge Desk</h4>
                  <p className="text-sm text-zinc-200 mt-1 font-mono">
                    {GYM_DATA.brand.phoneDisplay}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Email: <span className="text-zinc-300">{GYM_DATA.brand.email}</span>
                  </p>
                  <span className="text-[10px] text-zinc-500 block mt-1">
                    *Clearly fictional demo contact for Symphonix Tech presentation
                  </span>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-vault-lime/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-vault-lime shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">Operating Hours</h4>
                  <div className="space-y-1.5 mt-2 text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Monday – Friday:</span>
                      <span className="font-semibold text-white">{GYM_DATA.brand.openingHours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Saturday:</span>
                      <span className="font-semibold text-white">{GYM_DATA.brand.openingHours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Sunday:</span>
                      <span className="font-semibold text-white">{GYM_DATA.brand.openingHours.sunday}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center gap-2 text-xs text-vault-lime font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{GYM_DATA.brand.openingHours.members247}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Mockup */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden relative shadow-2xl flex flex-col justify-between min-h-[420px]">
            {/* Map Canvas Mockup with custom dark theme */}
            <div className="relative w-full h-full min-h-[340px] bg-[#121214] flex items-center justify-center p-6 overflow-hidden">
              {/* Map Grid Pattern Graphic */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px]" />
              
              {/* Simulated Map Streets & Rivers */}
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-50,150 Q200,80 500,220 T1000,180" stroke="#333333" strokeWidth="8" fill="none" />
                <path d="M200,-50 L250,500" stroke="#2a2a2a" strokeWidth="12" fill="none" />
                <path d="M450,-50 L400,500" stroke="#222222" strokeWidth="6" fill="none" />
                <path d="M-50,320 L900,300" stroke="#2a2a2a" strokeWidth="10" fill="none" />
                <circle cx="280" cy="180" r="140" stroke="#1f1f1f" strokeWidth="2" fill="none" />
              </svg>

              {/* Central Map Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-vault-lime/20 animate-ping absolute" />
                  <div className="w-12 h-12 rounded-full bg-zinc-950 border-2 border-vault-lime flex items-center justify-center text-vault-lime shadow-lime-glow z-10">
                    <Navigation className="w-5 h-5 -rotate-45" />
                  </div>
                </div>

                {/* Map Tooltip Box */}
                <div className="mt-4 p-4 rounded-xl bg-zinc-900/95 border border-vault-lime/40 backdrop-blur-md shadow-2xl text-center max-w-xs">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-vault-lime px-2 py-0.5 rounded bg-zinc-800">
                    CURRENT LOCATION
                  </span>
                  <h4 className="text-sm font-bold text-white font-heading mt-1">
                    IRONVAULT FITNESS CLUB
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    100 Feet Rd, Indiranagar, Bengaluru
                  </p>
                  <div className="mt-2 pt-2 border-t border-zinc-800 flex items-center justify-center gap-3 text-xs">
                    <span className="text-emerald-400 font-semibold">● Open Now</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-300">5.3 km from CBD</span>
                  </div>
                </div>
              </div>

              {/* Zoom Controls Mockup */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-zinc-900 border border-zinc-700 rounded-lg p-1 text-zinc-300 text-xs">
                <button className="w-7 h-7 flex items-center justify-center hover:text-vault-lime font-bold">+</button>
                <div className="h-[1px] bg-zinc-700" />
                <button className="w-7 h-7 flex items-center justify-center hover:text-vault-lime font-bold">−</button>
              </div>
            </div>

            {/* Map Footer Bar */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
              <span>Google Maps Integration Preview • Bengaluru, Karnataka</span>
              <button
                onClick={onOpenTrial}
                className="text-vault-lime hover:underline font-semibold flex items-center gap-1"
              >
                <span>Get Driving Directions & Valet Info</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-zinc-800">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Everything you need to know before stepping into the Vault.
            </p>
          </div>

          <div className="space-y-3">
            {GYM_DATA.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-zinc-900/60 border border-zinc-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-vault-lime transition-colors"
                  >
                    <span>{faq.q}</span>
                    <div className="shrink-0 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

