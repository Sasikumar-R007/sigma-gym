"use client";

import React, { useState } from "react";
import { Layers, Plus, CheckCircle2, ShieldCheck, Sparkles, X } from "lucide-react";
import { INITIAL_PLANS, SeedPlan } from "@/lib/db/seedData";

export default function MembershipsPage() {
  const [plans, setPlans] = useState<SeedPlan[]>(INITIAL_PLANS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Plan form state
  const [name, setName] = useState("");
  const [durationDays, setDurationDays] = useState("90");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState("Strength Floor, Cardio Zone, Showers");

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const newPlan: SeedPlan = {
      id: `plan-${Date.now()}`,
      gymId: "gym-ironvault",
      name: name.trim(),
      durationDays: Number(durationDays),
      price: Number(price),
      registrationFee: 0,
      description: description.trim(),
      facilitiesIncluded: facilities.split(",").map((s) => s.trim()),
      isActive: true,
    };

    setPlans([...plans, newPlan]);
    setIsModalOpen(false);
    setName("");
    setPrice("");
    setDescription("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-vault-lime uppercase tracking-widest mb-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>MODULE 2: MEMBERSHIP PLANS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
            Membership Packages & Tiers
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Configure flexible membership packages, durations, and pricing in INR.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider shadow-lime-glow hover:bg-vault-limeHover transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Create New Package</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-vault-lime/50 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-zinc-800 text-vault-lime border border-zinc-700">
                  {plan.durationDays} Days Duration
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              <h3 className="text-xl font-black text-white font-heading tracking-tight mt-3">
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-xs font-bold text-zinc-400">₹</span>
                <span className="text-3xl font-black text-white font-heading">
                  {plan.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-zinc-400 font-sans">
                  / {plan.durationDays >= 365 ? "year" : plan.durationDays >= 90 ? "quarter" : "month"}
                </span>
              </div>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {plan.description}
              </p>

              {/* Inclusions */}
              <div className="mt-6 space-y-2 pt-4 border-t border-zinc-800/80">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                  Included Amenities
                </span>
                {plan.facilitiesIncluded.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-vault-lime shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
              <span>Status: <strong className="text-emerald-400">Active</strong></span>
              <span className="text-[11px] font-mono">Plan ID: {plan.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-black text-white font-heading">
                Create Membership Plan
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Plan Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 6-Month Hypertrophy Pass"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Duration (Days) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="180"
                    value={durationDays}
                    onChange={(e) => setDurationDays(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="14999"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary of this training package..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Amenities Included (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Racks, Hydrotherapy, Nutrition Plan"
                  value={facilities}
                  onChange={(e) => setFacilities(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-vault-lime text-black font-extrabold text-xs uppercase"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

