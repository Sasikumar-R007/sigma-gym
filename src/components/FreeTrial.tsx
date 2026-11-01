"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { ShieldCheck, User, Mail, Phone, Sparkles, QrCode, Copy, Check, Download, AlertCircle } from "lucide-react";
import { GYM_DATA } from "@/data/gymData";

interface FreeTrialProps {
  initialProgram?: string;
}

export default function FreeTrial({ initialProgram = "" }: FreeTrialProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [preferredProgram, setPreferredProgram] = useState(initialProgram || "Strength & Conditioning");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("06:30 AM - Morning Slot");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestPass, setGuestPass] = useState<{
    passId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    program: string;
    date: string;
    time: string;
    issuedAt: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Set minimum date to tomorrow
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = "Please enter your full legal name (min 3 characters).";
    }

    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phoneNumber = "Please provide a valid 10-digit mobile number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!preferredDate) {
      errs.preferredDate = "Please select your preferred arrival date.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Realistic simulation delay
    setTimeout(() => {
      const generatedId = `IV-VIP-${Math.floor(10000 + Math.random() * 90000)}`;
      const now = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      setGuestPass({
        passId: generatedId,
        fullName: fullName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        program: preferredProgram,
        date: preferredDate,
        time: preferredTime,
        issuedAt: now,
      });

      setIsSubmitting(false);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#CCFF00", "#FFFFFF", "#10B981"],
        });
      } catch {
        // Safe fallback if confetti isn't supported
      }
    }, 1000);
  };

  const handleCopyPass = () => {
    if (guestPass) {
      navigator.clipboard.writeText(
        `IronVault VIP Pass: ${guestPass.passId} | Guest: ${guestPass.fullName} | Date: ${guestPass.date} (${guestPass.time})`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="free-trial" className="py-24 bg-[#0a0a0c] relative overflow-hidden border-t border-zinc-800/80">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-vault-lime/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-bold text-vault-lime uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMPLIMENTARY VIP ACCESS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            EXPERIENCE THE VAULT. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime via-white to-zinc-400">
              BOOK YOUR 3-DAY PASS.
            </span>
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            Gain unrestricted access to our calibrated Eleiko lifting floors, Technogym cardio deck, and 
            receive a complimentary InBody 3D body composition audit. Zero obligation to join.
          </p>
        </div>

        {/* Content Box */}
        <div className="max-w-4xl mx-auto">
          {!guestPass ? (
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 2-Column Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Full Legal Name <span className="text-vault-lime">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Aditi Sharma"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors({ ...errors, fullName: "" });
                        }}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border ${
                          errors.fullName ? "border-red-500" : "border-zinc-700"
                        } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-vault-lime transition-colors`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Mobile Number <span className="text-vault-lime">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: "" });
                        }}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border ${
                          errors.phoneNumber ? "border-red-500" : "border-zinc-700"
                        } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-vault-lime transition-colors`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phoneNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Email Address <span className="text-vault-lime">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      placeholder="aditi.sharma@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border ${
                        errors.email ? "border-red-500" : "border-zinc-700"
                      } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-vault-lime transition-colors`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Program & Schedule Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Preferred Training Program */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Preferred Training Program
                    </label>
                    <select
                      value={preferredProgram}
                      onChange={(e) => setPreferredProgram(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700 text-white text-sm focus:outline-none focus:border-vault-lime"
                    >
                      {GYM_DATA.programs.map((prog) => (
                        <option key={prog.id} value={prog.title} className="bg-zinc-900 text-white">
                          {prog.title}
                        </option>
                      ))}
                      <option value="General Open Floor & Recovery Access" className="bg-zinc-900 text-white">
                        General Open Floor & Recovery Access
                      </option>
                      <option value="1-on-1 Consultation & Body Scan Only" className="bg-zinc-900 text-white">
                        1-on-1 Consultation & Body Scan Only
                      </option>
                    </select>
                  </div>

                  {/* Preferred Arrival Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Preferred Visit Date <span className="text-vault-lime">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={getMinDate()}
                        value={preferredDate}
                        onChange={(e) => {
                          setPreferredDate(e.target.value);
                          if (errors.preferredDate) setErrors({ ...errors, preferredDate: "" });
                        }}
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-900/90 border ${
                          errors.preferredDate ? "border-red-500" : "border-zinc-700"
                        } text-white text-sm focus:outline-none focus:border-vault-lime transition-colors`}
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Preferred Time Slot */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Preferred Time of Day
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      "06:00 AM - 09:00 AM (Morning)",
                      "11:00 AM - 02:00 PM (Midday)",
                      "05:00 PM - 08:00 PM (Evening)",
                      "08:00 PM - 10:30 PM (Night)",
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPreferredTime(slot)}
                        className={`p-2.5 rounded-lg text-xs font-semibold text-center transition-all ${
                          preferredTime === slot
                            ? "bg-vault-lime text-black font-bold"
                            : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        {slot.split(" ")[0]} {slot.split(" ")[1]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Goals */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Specific Fitness Goals / Past Injuries (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Goal is to prepare for a powerlifting meet, previous shoulder impingement..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-vault-lime"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-vault-lime text-black font-black uppercase text-sm tracking-wider hover:bg-vault-limeHover transition-all shadow-lime-glow flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Generating VIP Guest Pass...</span>
                      </div>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>Book Your Free 3-Day Trial Pass</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-zinc-400 text-center mt-3">
                    Demonstration project for Symphonix Tech • Inquiries: <a href="mailto:symphonixtech@gmail.com" className="text-vault-lime hover:underline font-mono">symphonixtech@gmail.com</a>
                  </p>
                </div>

              </form>
            </div>
          ) : (
            /* Digital VIP Pass Generated Card */
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border-2 border-vault-lime shadow-2xl shadow-vault-lime/20 animate-fadeIn">
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-vault-lime animate-ping" />
                  <span className="text-xs font-black uppercase tracking-widest text-vault-lime">
                    DEMO VIP PASS ISSUED SUCCESSFULLY
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  {guestPass.issuedAt}
                </span>
              </div>

              {/* Pass Visual Layout */}
              <div className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-zinc-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-vault-lime/10 blur-[60px] pointer-events-none rounded-full" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-vault-lime px-2 py-0.5 rounded bg-zinc-800 border border-vault-lime/30">
                      GUEST PASS ID: {guestPass.passId}
                    </span>
                    <h3 className="text-3xl font-black text-white font-heading tracking-tight mt-2">
                      {guestPass.fullName}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      {guestPass.email} • {guestPass.phoneNumber}
                    </p>
                  </div>

                  {/* QR Code Container Mockup */}
                  <div className="p-3 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center shrink-0">
                    <QrCode className="w-20 h-20 text-black" />
                    <span className="text-[9px] font-mono font-bold text-black uppercase mt-1">
                      SCAN AT RECEPTION
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-800 text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase text-[10px] font-bold block">Assigned Program</span>
                    <span className="text-white font-bold">{guestPass.program}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase text-[10px] font-bold block">Reservation Date</span>
                    <span className="text-vault-lime font-bold">{guestPass.date}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase text-[10px] font-bold block">Arrival Window</span>
                    <span className="text-white font-bold">{guestPass.time}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Location: Apex Prestige Tower, 100ft Rd, Indiranagar, Bangalore</span>
                  <span className="text-emerald-400 font-semibold">✓ Verified Trial Pass</span>
                </div>
              </div>

              {/* Pass Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCopyPass}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-zinc-700 flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4 text-vault-lime" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "Pass Code Copied!" : "Copy Pass Code"}</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-zinc-700 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Print / Save Pass</span>
                  </button>
                </div>

                <button
                  onClick={() => setGuestPass(null)}
                  className="text-xs text-zinc-400 hover:text-white underline underline-offset-4"
                >
                  Book another guest pass
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}

