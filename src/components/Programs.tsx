"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dumbbell, Flame, Clock, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { GYM_DATA, Program } from "@/data/gymData";

interface ProgramsProps {
  onSelectProgram: (program: Program) => void;
  onOpenTrial: (programTitle?: string) => void;
}

export default function Programs({ onSelectProgram, onOpenTrial }: ProgramsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Programs" },
    { id: "Strength", label: "Strength & Power" },
    { id: "Personal", label: "1-on-1 Coaching" },
    { id: "Functional", label: "Functional & HIIT" },
    { id: "Cardio", label: "Cardio & Group" },
  ];

  const filteredPrograms = GYM_DATA.programs.filter((prog) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "Strength") return prog.title.includes("Strength");
    if (selectedFilter === "Personal") return prog.title.includes("Personal");
    if (selectedFilter === "Functional") return prog.title.includes("CrossFit") || prog.title.includes("Transformation");
    if (selectedFilter === "Cardio") return prog.title.includes("Cardio") || prog.title.includes("Group");
    return true;
  });

  return (
    <section id="programs" className="py-24 bg-[#070708] relative overflow-hidden border-t border-zinc-800/80">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-vault-lime/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-bold text-vault-lime uppercase tracking-widest mb-4">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>ELITE TRAINING ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            TAILORED FOR MAXIMUM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime via-white to-zinc-400">
              PHYSIOLOGICAL ADAPTATION.
            </span>
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            Whether your objective is shattering personal lifting records, stripping down body fat, or building relentless cardiovascular stamina, 
            each program is backed by progressive overload and real-time biomechanical feedback.
          </p>

          {/* Filter Tabs in One Row */}
          <div className="w-full flex justify-center mt-8 px-2">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md max-w-full overflow-x-auto flex-nowrap scrollbar-none">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap shrink-0 ${
                    selectedFilter === tab.id
                      ? "bg-vault-lime text-black shadow-lime-glow/50"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-vault-lime/50 transition-all duration-300 hover:-translate-y-2 group overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Program Card Image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-black/80 text-vault-lime border border-vault-lime/30 backdrop-blur-md">
                      {program.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                        program.intensity === "Extreme"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : program.intensity === "High"
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      } backdrop-blur-md`}
                    >
                      {program.intensity} Intensity
                    </span>
                  </div>

                  {/* Metas at Bottom of Image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-zinc-300">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-vault-lime" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      <span>{program.caloriesBurned}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading group-hover:text-vault-lime transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 font-medium italic">
                      &quot;{program.tagline}&quot;
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                    {program.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      Core Highlights
                    </span>
                    {program.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-vault-lime shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => onSelectProgram(program)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-zinc-700 hover:border-zinc-500"
                >
                  View Details
                </button>
                <button
                  onClick={() => onOpenTrial(program.title)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-vault-lime hover:bg-vault-limeHover text-black text-xs font-extrabold uppercase tracking-wider transition-all shadow-lime-glow/30 flex items-center justify-center gap-1 group-hover:shadow-lime-glow"
                >
                  <span>Book Trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Free Assessment Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-vault-lime/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-vault-lime text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Unsure Which Program Fits Your Biology?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
              SCHEDULE A COMPLIMENTARY 1-ON-1 INBODY 3D SCAN & COACHING CONSULTATION
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Meet with a Master Trainer in Indiranagar. We will evaluate your movement mechanics, resting metabolic rate, and assemble your 90-day trajectory.
            </p>
          </div>

          <button
            onClick={() => onOpenTrial("Complimentary 1-on-1 InBody Assessment")}
            className="shrink-0 px-6 py-3.5 rounded-lg bg-vault-lime text-black font-extrabold text-xs uppercase tracking-wider hover:bg-vault-limeHover transition-all shadow-lime-glow"
          >
            Claim Consultation (Free)
          </button>
        </div>

      </div>
    </section>
  );
}

