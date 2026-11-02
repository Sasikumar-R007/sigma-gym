"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, ShieldCheck, ArrowRight, Lock, Mail, Sparkles, Building2, UserCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@ironvault.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to log in.");
      }

      router.push(data.redirectUrl || "/portal");
      router.refresh();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Authentication error.");
    } finally {
      setIsLoading(false);
    }
  };

  const setDemoAccount = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-vault-lime/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />

      {/* Top Navbar */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-vault-lime shadow-md group-hover:border-vault-lime transition-all">
            <Dumbbell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-lg text-white font-heading">
              SYMPHONIX <span className="text-vault-lime">GYM OS</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
              Enterprise Multi-Tenant Platform
            </span>
          </div>
        </a>

        <a
          href="/"
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          ← Back to Demo Website
        </a>
      </header>

      {/* Login Card Container */}
      <div className="relative z-10 max-w-md w-full mx-auto px-4 py-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/90 border border-zinc-800/90 shadow-2xl backdrop-blur-xl">
          
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-vault-lime uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SECURE ACCESS CONSOLE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white font-heading tracking-tight">
              Sign In to Your Gym
            </h1>
            <p className="text-xs text-zinc-400">
              Access real-time member records, collections & floor operations.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Staff / Owner Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@ironvault.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-vault-lime transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-vault-lime transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider shadow-lime-glow hover:bg-vault-limeHover transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Tenant...</span>
              ) : (
                <>
                  <span>Enter Operations Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick-Switch Demo Accounts Selector */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-vault-lime" /> Quick Demo Accounts
              </span>
              <span className="text-[10px] text-zinc-500">Click to fill</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDemoAccount("owner@ironvault.com")}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  email === "owner@ironvault.com"
                    ? "bg-vault-lime/10 border-vault-lime text-white"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                }`}
              >
                <div className="font-bold flex items-center gap-1 text-[11px] text-vault-lime">
                  <Building2 className="w-3 h-3" /> IronVault Owner
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5 truncate">Vikramaditya (Full P&L)</div>
              </button>

              <button
                type="button"
                onClick={() => setDemoAccount("reception@ironvault.com")}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  email === "reception@ironvault.com"
                    ? "bg-vault-lime/10 border-vault-lime text-white"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                }`}
              >
                <div className="font-bold flex items-center gap-1 text-[11px] text-vault-lime">
                  <UserCheck className="w-3 h-3" /> Front Desk
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5 truncate">Pooja (Check-in & Fees)</div>
              </button>

              <button
                type="button"
                onClick={() => setDemoAccount("owner@apexstrength.com")}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  email === "owner@apexstrength.com"
                    ? "bg-vault-lime/10 border-vault-lime text-white"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                }`}
              >
                <div className="font-bold flex items-center gap-1 text-[11px] text-orange-400">
                  <Building2 className="w-3 h-3" /> Apex Gym Owner
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5 truncate">Karthik (Tenant 2)</div>
              </button>

              <button
                type="button"
                onClick={() => setDemoAccount("admin@symphonixtech.com")}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  email === "admin@symphonixtech.com"
                    ? "bg-vault-lime/10 border-vault-lime text-white"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                }`}
              >
                <div className="font-bold flex items-center gap-1 text-[11px] text-emerald-400">
                  <ShieldCheck className="w-3 h-3" /> Platform Admin
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5 truncate">Symphonix Super-Admin</div>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer info */}
      <footer className="p-6 text-center text-xs text-zinc-400 relative z-10">
        Symphonix Gym OS • Multi-Tenant Architecture • Inquiries: <a href="mailto:symphonixtech@gmail.com" className="text-vault-lime hover:underline font-mono">symphonixtech@gmail.com</a>
      </footer>
    </div>
  );
}

