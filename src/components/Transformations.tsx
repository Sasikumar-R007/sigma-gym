"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import { GYM_DATA } from "@/data/gymData";

interface TransformationsProps {
  onOpenTrial: () => void;
}

export default function Transformations({ onOpenTrial }: TransformationsProps) {
  const [activeViewMode, setActiveViewMode] = useState<{ [key: string]: "after" | "before" | "split" }>({
    "rajesh-k": "after",
    "meera-n": "after",
    "rohan-d": "after",
  });

  const toggleView = (id: string, mode: "after" | "before") => {
    setActiveViewMode((prev) => ({
      ...prev,
      [id]: mode,
    }));
  };

  return (
    <section id="transformations" className="py-24 bg-[#070708] relative overflow-hidden border-t border-zinc-800/80">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vault-lime/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-bold text-vault-lime uppercase tracking-widest mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>QUANTIFIABLE EVIDENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            PROVEN TRANSFORMATIONS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime via-white to-zinc-400">
              UNAPOLOGETIC RESULTS.
            </span>
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            Real discipline. Real biology. Explore how our members in Bangalore transformed their body composition, 
            strength thresholds, and daily mental clarity under IronVault guidance.
          </p>
          <p className="text-[11px] text-zinc-400 mt-2 font-mono uppercase tracking-wider">
            [ Demo Portfolio Case Studies · Symphonix Tech Showcase ]
          </p>
        </div>

        {/* Transformation Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {GYM_DATA.transformations.map((t) => {
            const currentMode = activeViewMode[t.id] || "after";
            const displayedImage = currentMode === "after" ? t.afterImage : t.beforeImage;

            return (
              <div
                key={t.id}
                className="rounded-2xl bg-zinc-900/70 border border-zinc-800/90 hover:border-vault-lime/40 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between shadow-2xl group"
              >
                <div>
                  {/* Image & Interactive Toggle Header */}
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src={displayedImage}
                      alt={`${t.name} ${currentMode} view`}
                      fill
                      className="object-cover object-center filter contrast-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                    {/* Timeline Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/80 text-vault-lime border border-vault-lime/40 backdrop-blur-md">
                        {t.duration} Protocol
                      </span>
                    </div>

                    {/* View Switcher Toggle (Before / After) */}
                    <div className="absolute top-4 right-4 flex p-1 rounded-lg bg-black/80 border border-zinc-700 backdrop-blur-md">
                      <button
                        onClick={() => toggleView(t.id, "before")}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                          currentMode === "before"
                            ? "bg-zinc-700 text-white"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        Before
                      </button>
                      <button
                        onClick={() => toggleView(t.id, "after")}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                          currentMode === "after"
                            ? "bg-vault-lime text-black font-extrabold"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        After
                      </button>
                    </div>

                    {/* Member Name on Image Bottom */}
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="text-xl font-bold text-white font-heading">
                        {t.name}, <span className="text-zinc-400 font-normal">{t.age}</span>
                      </h3>
                      <p className="text-xs text-zinc-400">{t.occupation}</p>
                    </div>
                  </div>

                  {/* Metrics Badges */}
                  <div className="grid grid-cols-2 gap-2 p-5 bg-black/40 border-b border-zinc-800/80">
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                      <div className="text-sm font-black text-vault-lime font-heading">{t.lostKg}</div>
                      <div className="text-[10px] text-zinc-400 uppercase">Body Composition</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                      <div className="text-sm font-black text-white font-heading">{t.gainedMuscle}</div>
                      <div className="text-[10px] text-zinc-400 uppercase">Performance PR</div>
                    </div>
                  </div>

                  {/* Quote and Program Used */}
                  <div className="p-6 space-y-3">
                    <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                      &quot;{t.quote}&quot;
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs text-vault-lime font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{t.programUsed}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={onOpenTrial}
                    className="w-full py-2.5 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-zinc-700 flex items-center justify-center gap-1.5"
                  >
                    <span>Start Your Transformation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Member Testimonials Sub-section */}
        <div className="border-t border-zinc-800 pt-16">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center gap-1 text-vault-lime mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-vault-lime" />
              ))}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase">
              WHAT OUR ATHLETES SAY
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Rated 4.9/5 based on 480+ Google & In-Club Reviews in Bangalore
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GYM_DATA.testimonials.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-vault-lime/30 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-vault-lime">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-vault-lime" />
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">{review.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                    &quot;{review.text}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-700 shrink-0">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white leading-snug">{review.name}</h5>
                    <p className="text-[11px] text-zinc-400">{review.title}</p>
                    <span className="text-[10px] text-vault-lime font-medium block mt-0.5">
                      ✓ {review.badge}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

