"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, Flame, Target } from "lucide-react";

interface BmiCalculatorProps {
  onOpenTrial: (recommendedProgram?: string) => void;
}

export default function BmiCalculator({ onOpenTrial }: BmiCalculatorProps) {
  const [height, setHeight] = useState<string>("175");
  const [weight, setWeight] = useState<string>("75");
  const [age, setAge] = useState<string>("28");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [goal, setGoal] = useState<"fat-loss" | "muscle-gain" | "strength">("muscle-gain");

  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    categoryColor: string;
    calories: number;
    recommendedProgram: string;
    advice: string;
  } | null>({
    bmi: 24.5,
    category: "Optimal Athletic Range",
    categoryColor: "text-emerald-400",
    calories: 2650,
    recommendedProgram: "Strength & Conditioning + Hypertrophy",
    advice: "Your baseline BMI indicates strong foundations. Progressive overload and 160g+ protein will optimize body recomposition.",
  });

  const calculateMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age) || 25;

    if (!h || !w || h <= 0 || w <= 0) return;

    const heightInMeters = h / 100;
    const bmiVal = parseFloat((w / (heightInMeters * heightInMeters)).toFixed(1));

    let category = "Normal weight";
    let categoryColor = "text-emerald-400";
    let program = "Strength & Conditioning";
    let advice = "Great baseline. Focus on heavy compound lifts and structured recovery.";

    if (bmiVal < 18.5) {
      category = "Underweight / Lean";
      categoryColor = "text-amber-400";
      program = "Hypertrophy & Mass Construction";
      advice = "Prioritize a caloric surplus, complex carbohydrates, and heavy hypertrophy volume to build dense lean mass.";
    } else if (bmiVal >= 18.5 && bmiVal <= 24.9) {
      category = "Optimal Athletic Base";
      categoryColor = "text-vault-lime";
      program = goal === "fat-loss" ? "Weight Loss & Transformation" : "Strength & Conditioning";
      advice = "Excellent physiological base. Structured periodization on Eleiko racks will unlock your peak power output.";
    } else if (bmiVal >= 25 && bmiVal <= 29.9) {
      category = "Overweight / Dense";
      categoryColor = "text-orange-400";
      program = "Weight Loss & Body Transformation";
      advice = "Target high-density resistance training paired with moderate calorie deficits to burn visceral fat while sparing muscle.";
    } else {
      category = "High BMI / Adipose Alert";
      categoryColor = "text-red-400";
      program = "1-on-1 Bespoke Personal Training";
      advice = "Recommended 1-on-1 coaching to protect joints with low-impact sleds and customized clinical nutrition.";
    }

    // Basal Metabolic Rate using Mifflin-St Jeor formula
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr = gender === "male" ? bmr + 5 : bmr - 161;

    // Daily Calorie Target based on goal
    const multiplier = 1.45; // moderate activity
    let targetCalories = Math.round(bmr * multiplier);
    if (goal === "fat-loss") targetCalories -= 450;
    if (goal === "muscle-gain") targetCalories += 350;

    setResult({
      bmi: bmiVal,
      category,
      categoryColor,
      calories: targetCalories,
      recommendedProgram: program,
      advice,
    });
  };

  return (
    <section className="py-20 bg-[#0a0a0c] relative overflow-hidden border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Info & Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-bold text-vault-lime uppercase tracking-widest mb-3">
                <Calculator className="w-3.5 h-3.5" />
                <span>INTERACTIVE BIOMETRIC TOOL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-heading">
                CALCULATE YOUR BMI & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime to-white">
                  OPTIMAL CALORIE TARGET.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                Discover your baseline metrics and receive an instant, evidence-backed training prescription from IronVault&apos;s master coaching algorithm.
              </p>
            </div>

            <form onSubmit={calculateMetrics} className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    min={120}
                    max={230}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:border-vault-lime"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    min={35}
                    max={200}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:border-vault-lime"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    min={15}
                    max={85}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:border-vault-lime"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender("male")}
                      className={`py-2.5 rounded-lg text-xs font-bold uppercase transition-all ${
                        gender === "male"
                          ? "bg-vault-lime text-black"
                          : "bg-zinc-950 text-zinc-400 border border-zinc-700"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender("female")}
                      className={`py-2.5 rounded-lg text-xs font-bold uppercase transition-all ${
                        gender === "female"
                          ? "bg-vault-lime text-black"
                          : "bg-zinc-950 text-zinc-400 border border-zinc-700"
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Primary Fitness Target
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "fat-loss", label: "Fat Loss" },
                    { id: "muscle-gain", label: "Build Muscle" },
                    { id: "strength", label: "Max Strength" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGoal(item.id as "fat-loss" | "muscle-gain" | "strength")}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-bold uppercase transition-all ${
                        goal === item.id
                          ? "bg-zinc-800 text-vault-lime border border-vault-lime"
                          : "bg-zinc-950 text-zinc-400 border border-zinc-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider hover:bg-vault-limeHover transition-all shadow-lime-glow/30"
              >
                Compute Biometric Prescription
              </button>
            </form>
          </div>

          {/* Right Results Panel */}
          <div className="lg:col-span-6">
            {result && (
              <div className="p-8 rounded-3xl bg-zinc-950 border border-vault-lime/40 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-vault-lime/10 blur-[80px] pointer-events-none rounded-full" />

                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Body Mass Index (BMI)
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-5xl font-black text-white font-heading">
                          {result.bmi}
                        </span>
                        <span className={`text-sm font-bold uppercase ${result.categoryColor}`}>
                          {result.category}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Target Energy Intake
                      </span>
                      <div className="flex items-baseline justify-end gap-1 mt-1">
                        <Flame className="w-5 h-5 text-orange-400" />
                        <span className="text-3xl font-black text-white font-heading">
                          {result.calories}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">kcal/day</span>
                      </div>
                    </div>
                  </div>

                  {/* Program Recommendation Box */}
                  <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-700 space-y-2">
                    <div className="flex items-center gap-2 text-vault-lime text-xs font-bold uppercase tracking-wider">
                      <Target className="w-4 h-4" />
                      <span>Recommended IronVault Protocol</span>
                    </div>
                    <h4 className="text-xl font-bold text-white font-heading">
                      {result.recommendedProgram}
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {result.advice}
                    </p>
                  </div>

                  {/* Coach Action */}
                  <div className="pt-2">
                    <button
                      onClick={() => onOpenTrial(`Program Consultation: ${result.recommendedProgram}`)}
                      className="w-full py-3.5 px-4 rounded-xl bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider hover:bg-vault-limeHover transition-all flex items-center justify-center gap-2 shadow-lime-glow"
                    >
                      <span>Claim Free Trial For This Program</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-zinc-400 text-center mt-2">
                      Includes InBody 3D scan at our Indiranagar club to verify your lean muscle mass.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

