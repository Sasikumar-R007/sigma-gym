"use client";

import React from "react";
import Image from "next/image";
import { Shield, Zap, Target, Award, Sparkles, Check, ArrowRight } from "lucide-react";

interface AboutProps {
  onOpenTrial: () => void;
}

export default function About({ onOpenTrial }: AboutProps) {
  const pillars = [
    {
      icon: Target,
      title: "Biomechanical Precision",
      description:
        "Every single barbell, cable angle, and plate-loaded lever is curated to match human muscular resistance curves. Zero wasted reps, zero unnatural joint stress.",
      tag: "Zero Joint Shear",
    },
    {
      icon: Award,
      title: "Elite Coaching Roster",
      description:
        "We do not employ floor attendants. Every coach at IronVault is an internationally certified master practitioner (CSCS, USAW, EXOS) with proven competition credentials.",
      tag: "Tier-1 Certified",
    },
    {
      icon: Shield,
      title: "Capped Membership Policy",
      description:
        "We enforce a strict ceiling on active members to ensure pristine floor availability. No queues for squat racks, no chaos, just pure, uninterrupted training focus.",
      tag: "Zero Wait Times",
    },
    {
      icon: Zap,
      title: "Science-Backed Recovery",
      description:
        "Training breaks down muscle tissue; recovery rebuilds it stronger. Our contrast hydrotherapy cold plunge, dry sauna, and Normatec suite cut recovery lag in half.",
      tag: "Contrast Therapy",
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0a0c] relative overflow-hidden border-t border-zinc-800/80">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-vault-lime/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-bold text-vault-lime uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE IRONVAULT PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            NOT JUST A GYM. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime to-white">
              A CRUCIBLE FOR HUMAN POTENTIAL.
            </span>
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            Founded in Indiranagar, Bangalore, IronVault was engineered to reject the noisy, overcrowded model of commercial fitness chains. 
            We built an athletic sanctuary where serious lifters, founders, and professionals execute without compromise.
          </p>
        </div>

        {/* 2-Column Split: Story & Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Imagery Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] sm:h-[540px] rounded-2xl overflow-hidden border border-zinc-700/80 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop"
                alt="IronVault Fitness Interior and Equipment"
                fill
                className="object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Floating Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-zinc-950/85 border border-zinc-700/80 backdrop-blur-md shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-vault-lime">FACILITY SPECIFICATION</span>
                    <h4 className="text-lg font-bold text-white font-heading">12,000 SQ.FT. BIOMECHANICAL SUITE</h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      100% Eleiko Competition Barbells & Arsenal Strength Iso-Lateral Leverage Units
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-2xl font-black text-white font-heading">10,000+ KG</span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Calibrated Steel</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Mini Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 p-4 rounded-xl bg-zinc-900 border border-vault-lime/40 shadow-lime-glow/20 shadow-2xl max-w-xs backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-vault-lime/20 flex items-center justify-center text-vault-lime font-black text-lg">
                  ★
                </div>
                <div>
                  <div className="text-sm font-bold text-white">4.9 / 5.0 Rating</div>
                  <div className="text-xs text-zinc-400">480+ Verified Google Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-vault-lime">OUR MISSION</span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                BUILT BY LIFTERS, FOR INDIVIDUALS WHO DEMAND EXCELLENCE.
              </h3>
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                Most commercial gyms purchase cheap multi-stations designed to cram as many bodies as possible into minimal square footage. 
                At IronVault, every rack, dumbbell taper, and knurling pattern was selected through obsessive biomechanical criteria.
              </p>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Whether your target is pulling a 250kg deadlift, dropping 15kg of visceral body fat, or maintaining high mental clarity 
                to lead a high-growth company, our training ecosystem is built to guarantee quantifiable, repeatable results.
              </p>
            </div>

            {/* Key Value Checklist */}
            <div className="space-y-3 pt-2">
              {[
                "Strict ceiling on total memberships to eliminate overcrowded peak hours",
                "Hospital-grade HEPA air filtration exchanging indoor air 12 times per hour",
                "Private InBody 3D body composition scanning every 30 days for members",
                "Complimentary luxury towel service and Malin+Goetz executive grooming amenities",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-vault-lime/10 border border-vault-lime/40 flex items-center justify-center text-vault-lime mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-zinc-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenTrial}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-vault-lime text-black font-extrabold text-xs uppercase tracking-wider hover:bg-vault-limeHover transition-all shadow-lime-glow/50"
              >
                <span>Experience The Vault Yourself</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-vault-lime/50 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700/80 group-hover:border-vault-lime group-hover:bg-vault-lime/10 flex items-center justify-center text-vault-lime transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 group-hover:text-vault-lime transition-colors">
                      {pillar.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white font-heading tracking-tight mb-2 group-hover:text-vault-lime transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

