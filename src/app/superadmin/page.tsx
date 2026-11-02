import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getAllGyms } from "@/services/gym.service";
import {
  ShieldCheck,
  Building2,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SuperAdminPage() {
  const session = await getSession();

  if (!session || session.platformRole !== "SUPER_ADMIN") {
    redirect("/login");
  }

  const gyms = await getAllGyms();
  const totalGyms = gyms.length;
  const platformMRR = totalGyms * 2900; // Calculated based on ₹2,900/mo subscription retainer

  return (
    <div className="min-h-screen bg-[#070709] text-white p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-zinc-900 border border-emerald-500/30">
                  PLATFORM SUPER-ADMIN
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-xs text-zinc-400">Symphonix Tech Core</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
                Symphonix Gym OS Platform Command
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors border border-zinc-700"
            >
              Open Active Gym Portal →
            </Link>
          </div>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Active Gym Tenants
            </span>
            <div className="text-4xl font-black text-white font-heading mt-2">
              {totalGyms}
            </div>
            <div className="text-xs text-emerald-400 mt-2 font-semibold">
              ✓ All tenants healthy & isolated
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Platform MRR (Recurring)
            </span>
            <div className="text-4xl font-black text-emerald-400 font-heading mt-2">
              ₹{platformMRR.toLocaleString("en-IN")} <span className="text-sm font-sans text-zinc-400">/ mo</span>
            </div>
            <div className="text-xs text-zinc-400 mt-2">
              Based on ₹2,900/mo retainer tier
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Database Isolation
            </span>
            <div className="text-xl font-bold text-vault-lime font-heading mt-3">
              PostgreSQL Tenant Scoping
            </div>
            <div className="text-xs text-zinc-400 mt-2">
              Composite indexes on gym_id enforced
            </div>
          </div>
        </div>

        {/* Registered Gyms Table */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <h3 className="text-lg font-black text-white font-heading">
            Registered Gym Accounts ({gyms.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950 text-zinc-400 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-800">
                <tr>
                  <th className="py-3.5 px-4">Gym Name</th>
                  <th className="py-3.5 px-4">Slug / Tenant ID</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Plan Tier</th>
                  <th className="py-3.5 px-4 text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {gyms.map((gym) => (
                  <tr key={gym.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm font-heading">{gym.name}</div>
                      <div className="text-zinc-400 text-[11px]">{gym.email} • {gym.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-vault-lime">
                      {gym.slug}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300">
                      {gym.city}, {gym.state}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {gym.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-zinc-300">
                      {gym.planTier}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/portal"
                        className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <span>Open Cockpit</span>
                        <ArrowRight className="w-3.5 h-3.5 text-vault-lime" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

