"use client";

import React, { useState } from "react";
import { ShieldCheck, Check, X, Flame, ArrowRight } from "lucide-react";
import { GYM_DATA, MembershipPlan } from "@/data/gymData";

interface MembershipsProps {
  onSelectPlan: (planName: string) => void;
}

export default function Memberships({ onSelectPlan }: MembershipsProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "annual">("quarterly");

  const formatPrice = (plan: MembershipPlan) => {
    if (billingCycle === "monthly") {
      return {
        amount: plan.pricing.monthly.toLocaleString("en-IN"),
        period: "/ month",
        savings: null,
      };
    }
    if (billingCycle === "quarterly") {
      const perMonth = Math.round(plan.pricing.quarterly / 3);
      return {
        amount: perMonth.toLocaleString("en-IN"),
        period: "/ month",
        total: `Billed ₹${plan.pricing.quarterly.toLocaleString("en-IN")} quarterly`,
        savings: "Save 15%",
      };
    }
    const perMonth = Math.round(plan.pricing.annual / 12);
    return {
      amount: perMonth.toLocaleString("en-IN"),
      period: "/ month",
      total: `Billed ₹${plan.pricing.annual.toLocaleString("en-IN")} annually`,
      savings: "Save 25% + 2 Free PT Sessions",
    };
  };

  return (
    <section id="memberships" className="py-24 bg-[#0a0a0c] relative overflow-hidden border-t border-zinc-800/80">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-vault-lime/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-bold text-vault-lime uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TRANSPARENT TIER ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            INVEST IN UNCOMPROMISING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime via-white to-zinc-400">
              PHYSICAL DOMINANCE.
            </span>
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            All memberships include full access to our calibrated Eleiko strength decks, executive locker rooms, 
            and smart biometric access. Zero hidden signup charges.
          </p>

          {/* Billing Toggle (Monthly / Quarterly / Annual) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <div className="inline-flex p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 backdrop-blur-md">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  billingCycle === "monthly"
                    ? "bg-vault-lime text-black shadow-lime-glow/50"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("quarterly")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  billingCycle === "quarterly"
                    ? "bg-vault-lime text-black shadow-lime-glow/50"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>Quarterly</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  -15%
                </span>
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  billingCycle === "annual"
                    ? "bg-vault-lime text-black shadow-lime-glow/50"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>Annual</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-vault-lime/20 text-vault-lime border border-vault-lime/40">
                  -25% + Perks
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {GYM_DATA.memberships.map((plan) => {
            const pricing = formatPrice(plan);
            const isPro = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                  isPro
                    ? "bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-vault-lime shadow-2xl shadow-vault-lime/10 lg:-translate-y-3"
                    : "bg-zinc-900/60 border border-zinc-800 shadow-xl"
                }`}
              >
                {/* Popular Pill */}
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-vault-lime text-black shadow-lime-glow flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-black" />
                      MOST POPULAR TIER
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Tier Title */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-vault-lime">
                        {plan.tier} PLAN
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight mt-0.5">
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 mt-2 font-medium min-h-[32px]">
                    {plan.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-6 pt-6 border-t border-zinc-800/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-zinc-400">₹</span>
                      <span className="text-4xl sm:text-5xl font-black text-white font-heading tracking-tight">
                        {pricing.amount}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        {pricing.period}
                      </span>
                    </div>

                    {pricing.total && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] text-zinc-400">{pricing.total}</span>
                        {pricing.savings && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-vault-lime/20 text-vault-lime border border-vault-lime/40">
                            {pricing.savings}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Perks Summary */}
                  <div className="mt-4 p-3 rounded-lg bg-black/40 border border-zinc-800 text-[11px] text-zinc-300 font-medium">
                    ⚡ {plan.perks}
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Plan Inclusions
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-vault-lime/10 border border-vault-lime/40 flex items-center justify-center text-vault-lime shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}

                    {/* Exclusions for Basic Plan */}
                    {plan.notIncluded && plan.notIncluded.length > 0 && (
                      <div className="pt-2 space-y-2 border-t border-zinc-800/60 opacity-60">
                        {plan.notIncluded.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400 line-through">
                            <X className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="p-8 pt-0">
                  <button
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                      isPro
                        ? "bg-vault-lime text-black hover:bg-vault-limeHover shadow-lime-glow hover:scale-[1.02] active:scale-95"
                        : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-vault-lime/50"
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-zinc-400 text-center mt-2.5">
                    Demo pricing • Includes 3-Day Risk-Free Trial
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Corporate & Executive Enquiries */}
        <div className="mt-16 p-8 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-white font-heading">
              CORPORATE MEMBERSHIPS & FOUNDER WELLNESS PARTNERSHIPS
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              Equip your leadership and engineering teams with elite physical conditioning. Bespoke executive wellness tiers available for venture-backed startups and enterprises located around Indiranagar and Whitefield.
            </p>
          </div>
          <button
            onClick={() => onSelectPlan("Corporate Wellness Program")}
            className="shrink-0 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-vault-lime hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all border border-zinc-700"
          >
            Inquire for Enterprise
          </button>
        </div>

      </div>
    </section>
  );
}

