"use client";

import React from "react";
import Image from "next/image";
import { Award, Star, ShieldCheck, Calendar } from "lucide-react";
import { GYM_DATA } from "@/data/gymData";

interface TrainersProps {
  onOpenTrial: (trainerName?: string) => void;
}

export default function Trainers({ onOpenTrial }: TrainersProps) {
  return (
    <section id="trainers" className="py-24 bg-[#0a0a0c] relative overflow-hidden border-t border-zinc-800/80">
      {/* Background accents */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-vault-lime/5 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-bold text-vault-lime uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>WORLD-CLASS COACHING CADRE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            NO FLOOR ATTENDANTS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime via-white to-zinc-400">
              ONLY PROVEN MASTER PRACTITIONERS.
            </span>
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            Every coach on the IronVault roster holds tier-1 international certifications and deep competitive athletic backgrounds. 
            You will be guided with surgical biomechanical precision.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GYM_DATA.trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="rounded-2xl bg-zinc-900/70 border border-zinc-800/90 hover:border-vault-lime/50 transition-all duration-300 hover:-translate-y-2 group overflow-hidden flex flex-col justify-between shadow-2xl"
            >
              <div>
                {/* Trainer Photo Container */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                  {/* Experience Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/80 text-vault-lime border border-vault-lime/40 backdrop-blur-md">
                      {trainer.experience} Experience
                    </span>
                  </div>

                  {/* Verification Tag */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/80 text-zinc-300 text-[10px] font-bold border border-zinc-800 backdrop-blur-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-vault-lime" />
                    <span>CSCS / Certified</span>
                  </div>

                  {/* Name & Title on Image Bottom */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-2xl font-black text-white font-heading tracking-tight group-hover:text-vault-lime transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-xs font-semibold text-vault-lime">
                      {trainer.role}
                    </p>
                  </div>
                </div>

                {/* Trainer Body Info */}
                <div className="p-6 space-y-4">
                  {/* Quote */}
                  <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800/80 text-xs italic text-zinc-300 relative">
                    <span className="text-vault-lime font-serif text-lg leading-none absolute -top-1 left-2">&ldquo;</span>
                    <p className="pl-3">{trainer.quote}</p>
                  </div>

                  {/* Specializations Badges */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Core Specializations
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {trainer.specialization.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-800/90 text-zinc-300 border border-zinc-700/60"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Credentials & Certifications
                    </span>
                    <div className="space-y-1">
                      {trainer.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-zinc-400">
                          <Star className="w-3 h-3 text-vault-lime shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trainer Statistics */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                    <div className="p-2 rounded bg-zinc-950/60 border border-zinc-800/60 text-center">
                      <div className="text-sm font-black text-white font-heading">{trainer.stats.clientsTrained}</div>
                      <div className="text-[10px] text-zinc-400 uppercase">Athletes Coached</div>
                    </div>
                    <div className="p-2 rounded bg-zinc-950/60 border border-zinc-800/60 text-center">
                      <div className="text-sm font-black text-vault-lime font-heading">{trainer.stats.transformationSuccess}</div>
                      <div className="text-[10px] text-zinc-400 uppercase">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenTrial(`1-on-1 Consultation with ${trainer.name}`)}
                  className="w-full py-3 px-4 rounded-lg bg-zinc-800 hover:bg-vault-lime hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-zinc-700 hover:border-vault-lime hover:shadow-lime-glow/40"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation With {trainer.name.split(" ")[0]}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

