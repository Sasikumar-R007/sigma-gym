"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { X, ShieldCheck, User, Mail, Phone, QrCode, Copy, Check } from "lucide-react";

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedItem?: string;
}

export default function TrialModal({ isOpen, onClose, preselectedItem = "" }: TrialModalProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPlanOrProgram, setSelectedPlanOrProgram] = useState(preselectedItem || "Gold Vault (All-Access)");
  const [visitDate, setVisitDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("07:00 AM (Morning Peak)");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issuedPass, setIssuedPass] = useState<{
    passId: string;
    fullName: string;
    plan: string;
    date: string;
    time: string;
    issuedAt: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedItem) {
      setSelectedPlanOrProgram(preselectedItem);
    }
  }, [preselectedItem]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = "Please enter your full name.";
    }
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phoneNumber = "Please enter a valid 10-digit mobile number.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!visitDate) {
      errs.visitDate = "Please choose your preferred visit date.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedPass = {
        passId: `IV-VIP-${Math.floor(10000 + Math.random() * 90000)}`,
        fullName: fullName.trim(),
        plan: selectedPlanOrProgram,
        date: visitDate,
        time: timeSlot,
        issuedAt: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
      setIssuedPass(generatedPass);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.5 },
          colors: ["#CCFF00", "#FFFFFF", "#10B981"],
        });
      } catch {}
    }, 800);
  };

  const handleCopy = () => {
    if (issuedPass) {
      navigator.clipboard.writeText(
        `IronVault VIP Pass: ${issuedPass.passId} | Guest: ${issuedPass.fullName} | Session: ${issuedPass.plan} | Date: ${issuedPass.date} (${issuedPass.time})`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetAndClose = () => {
    setIssuedPass(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={resetAndClose}
    >
      <div
        className="relative max-w-lg w-full bg-zinc-950 border border-zinc-700/80 rounded-2xl shadow-2xl text-white max-h-[88vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 sm:px-6 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-zinc-900/50">
          <div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-vault-lime px-2 py-0.5 rounded bg-zinc-900 border border-vault-lime/30">
              GUEST ACCESS PORTAL
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-heading mt-1">
              CLAIM YOUR 3-DAY VIP PASS
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-vault-lime hover:border-vault-lime transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body with internal scrolling */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {!issuedPass ? (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero fees. Includes full access to Eleiko lifting decks, Technogym cardio, and an InBody scan in Indiranagar, Bangalore.
              </p>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                  Full Legal Name <span className="text-vault-lime">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="e.g. Siddharth Menon"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs sm:text-sm text-white focus:outline-none focus:border-vault-lime"
                  />
                </div>
                {errors.fullName && <p className="text-red-400 text-[11px] mt-0.5">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Mobile Number <span className="text-vault-lime">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                    <input
                      type="tel"
                      placeholder="10-digit number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs sm:text-sm text-white focus:outline-none focus:border-vault-lime"
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-red-400 text-[11px] mt-0.5">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Email Address <span className="text-vault-lime">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs sm:text-sm text-white focus:outline-none focus:border-vault-lime"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-[11px] mt-0.5">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                  Plan, Coach or Program Interest
                </label>
                <input
                  type="text"
                  value={selectedPlanOrProgram}
                  onChange={(e) => setSelectedPlanOrProgram(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs sm:text-sm text-white focus:outline-none focus:border-vault-lime"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Visit Date <span className="text-vault-lime">*</span>
                  </label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs sm:text-sm text-white focus:outline-none focus:border-vault-lime"
                  />
                  {errors.visitDate && <p className="text-red-400 text-[11px] mt-0.5">{errors.visitDate}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs sm:text-sm text-white focus:outline-none focus:border-vault-lime"
                  >
                    <option value="06:30 AM (Early Lifters)">06:30 AM (Early Lifters)</option>
                    <option value="08:00 AM (Morning Peak)">08:00 AM (Morning Peak)</option>
                    <option value="12:00 PM (Midday Session)">12:00 PM (Midday Session)</option>
                    <option value="05:30 PM (Evening Peak)">05:30 PM (Evening Peak)</option>
                    <option value="07:30 PM (Night Rush)">07:30 PM (Night Rush)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider hover:bg-vault-limeHover transition-all shadow-lime-glow flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Issuing Digital Pass...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Generate 3-Day VIP Pass Now</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-zinc-500 text-center mt-2">
                  Portfolio demo for Symphonix Tech • Inquiries: symphonixtech@gmail.com
                </p>
              </div>
            </form>
          ) : (
            /* Success Screen with Pass */
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-vault-lime/20 border border-vault-lime flex items-center justify-center text-vault-lime mx-auto mb-1.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-vault-lime font-bold">
                  DEMO PASS ACTIVE
                </span>
                <h3 className="text-xl font-black text-white font-heading mt-0.5">
                  VIP ACCESS PASS GRANTED
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 relative overflow-hidden">
                <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800">
                  <span className="font-mono text-xs text-vault-lime font-bold">
                    PASS #{issuedPass.passId}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    Issued: {issuedPass.issuedAt}
                  </span>
                </div>

                <div className="my-3 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-bold text-white font-heading">
                      {issuedPass.fullName}
                    </h4>
                    <p className="text-xs text-vault-lime mt-0.5">
                      Tier: {issuedPass.plan}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Valid for: {issuedPass.date} ({issuedPass.time})
                    </p>
                  </div>
                  <div className="p-2 bg-white rounded-lg shrink-0">
                    <QrCode className="w-12 h-12 text-black" />
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800 text-[10px] text-zinc-400">
                  Reception: Apex Prestige Tower, 100ft Rd, Indiranagar, Bangalore
                </div>
              </div>

              <div className="flex gap-2.5 pt-1">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-vault-lime" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Pass Code"}</span>
                </button>

                <button
                  onClick={resetAndClose}
                  className="flex-1 py-2.5 rounded-full bg-vault-lime text-black text-xs font-black uppercase hover:bg-vault-limeHover transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
