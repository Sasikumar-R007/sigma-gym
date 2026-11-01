"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Layers, Maximize2, Check, X } from "lucide-react";
import { GYM_DATA, Facility } from "@/data/gymData";

interface FacilitiesProps {
  onOpenTrial: () => void;
}

export default function Facilities({ onOpenTrial }: FacilitiesProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [lightboxFacility, setLightboxFacility] = useState<Facility | null>(null);

  const tabs = [
    { id: "all", label: "All Zones" },
    { id: "strength", label: "Strength & Racks" },
    { id: "free-weights", label: "Free Weights & Dumbbells" },
    { id: "cardio", label: "Technogym Cardio" },
    { id: "turf", label: "Performance Turf" },
    { id: "recovery", label: "Recovery & Spa" },
  ];

  const filteredFacilities = GYM_DATA.facilities.filter((fac) => {
    if (activeTab === "all") return true;
    return fac.category === activeTab;
  });

  return (
    <section id="facilities" className="py-24 bg-[#070708] relative overflow-hidden border-t border-zinc-800/80">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vault-lime/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-bold text-vault-lime uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>12,000 SQ.FT. LUXURY ATHLETIC FLOOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            AN UNCOMPROMISING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime via-white to-zinc-400">
              TRAINING ENVIRONMENT.
            </span>
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            Step onto calibrated Olympic platforms, train on Arsenal Strength leverage machines, and decompress in 
            Bangalore&apos;s most sophisticated contrast hydrotherapy suite.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-vault-lime text-black shadow-lime-glow/50"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              className="rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-vault-lime/50 transition-all duration-300 hover:-translate-y-2 group overflow-hidden flex flex-col justify-between shadow-2xl"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden cursor-pointer" onClick={() => setLightboxFacility(facility)}>
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/80 text-vault-lime border border-vault-lime/30 backdrop-blur-md">
                      {facility.badge}
                    </span>
                  </div>

                  {/* Lightbox / Zoom Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxFacility(facility);
                    }}
                    aria-label="View larger image"
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/70 border border-zinc-700 text-zinc-300 hover:text-vault-lime flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Title overlay on image */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-xl font-bold text-white font-heading group-hover:text-vault-lime transition-colors">
                      {facility.title}
                    </h3>
                  </div>
                </div>

                {/* Facility Details */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {facility.description}
                  </p>

                  {/* Specs List */}
                  <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Technical Hardware Specifications
                    </span>
                    <div className="space-y-1">
                      {facility.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-vault-lime shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenTrial()}
                  className="w-full py-2.5 px-4 rounded-lg bg-zinc-800 hover:bg-vault-lime hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-zinc-700 hover:border-vault-lime"
                >
                  Book In-Person Facility Tour
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Amenity Specs Strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800">
          <div className="text-center p-3 border-r border-zinc-800">
            <span className="text-2xl sm:text-3xl font-black text-white font-heading">8°C</span>
            <p className="text-xs font-semibold text-vault-lime uppercase mt-0.5">Cold Plunge Suite</p>
            <p className="text-[11px] text-zinc-400">Rapid cellular inflammation drop</p>
          </div>
          <div className="text-center p-3 border-r border-zinc-800">
            <span className="text-2xl sm:text-3xl font-black text-white font-heading">85°C</span>
            <p className="text-xs font-semibold text-vault-lime uppercase mt-0.5">Nordic Dry Sauna</p>
            <p className="text-[11px] text-zinc-400">Cardiovascular heat shock therapy</p>
          </div>
          <div className="text-center p-3 border-r border-zinc-800">
            <span className="text-2xl sm:text-3xl font-black text-white font-heading">60 KG</span>
            <p className="text-xs font-semibold text-vault-lime uppercase mt-0.5">Solid Dumbbells</p>
            <p className="text-[11px] text-zinc-400">Laser-engraved custom urethane</p>
          </div>
          <div className="text-center p-3">
            <span className="text-2xl sm:text-3xl font-black text-white font-heading">100%</span>
            <p className="text-xs font-semibold text-vault-lime uppercase mt-0.5">HEPA Filtered Air</p>
            <p className="text-[11px] text-zinc-400">12 air air-exchanges per hour</p>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxFacility && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxFacility(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxFacility(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-vault-lime hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-[360px] sm:h-[480px] w-full">
              <Image
                src={lightboxFacility.image}
                alt={lightboxFacility.title}
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3 bg-zinc-950">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-vault-lime text-black">
                  {lightboxFacility.badge}
                </span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  IronVault Indiranagar Facility
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                {lightboxFacility.title}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {lightboxFacility.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {lightboxFacility.specs.map((spec, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700"
                  >
                    ✓ {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

