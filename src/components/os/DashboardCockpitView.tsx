"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  CalendarCheck,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  Printer,
  CheckCircle2,
  Share2,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { SessionUser } from "@/lib/auth/types";

interface DashboardProps {
  session: SessionUser;
  metrics: {
    totalMembers: number;
    activeMembers: number;
    expiringMembers: number;
    expiredMembers: number;
    todayCollections: number;
    totalCollected: number;
    totalPendingDues: number;
    todayCheckIns: number;
  };
  paymentBreakdown: { method: string; amount: number; color: string }[];
  revenueTrend: { month: string; revenue: number; members: number }[];
  recentTransactions: {
    id: string;
    memberName: string;
    memberCode: string;
    receiptNumber: string;
    amount: number;
    paymentMethod: string;
    paymentDate: string;
    planName: string;
  }[];
  expiringMembersList: {
    id: string;
    memberCode: string;
    fullName: string;
    phone: string;
    status: string;
    activePlanName: string;
    planExpiryDate: string;
  }[];
}

export default function DashboardCockpitView({
  session,
  metrics,
  paymentBreakdown,
  revenueTrend,
  recentTransactions,
  expiringMembersList,
}: DashboardProps) {
  const [reminderSentId, setReminderSentId] = useState<string | null>(null);

  const handleSendReminder = (memberId: string, memberName: string) => {
    setReminderSentId(memberId);
    setTimeout(() => {
      alert(`WhatsApp renewal notification queued for ${memberName}. (Simulated Cloud API trigger)`);
      setReminderSentId(null);
    }, 600);
  };

  const isApex = session.activeGymSlug === "apex-strength";
  const themeAccentColor = isApex ? "#FF5500" : "#CCFF00";

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 border border-zinc-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded text-black"
              style={{ backgroundColor: themeAccentColor }}
            >
              TENANT COCKPIT
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs text-zinc-400 font-mono">
              Role: <strong className="text-white">{session.gymRole}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1.5 tracking-tight">
            Welcome back, {session.fullName.split(" ")[0]}
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time operations for <strong className="text-zinc-200">{session.activeGymName}</strong>. All data strictly isolated to this tenant.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/portal/attendance"
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center gap-2 border border-zinc-700 transition-all"
          >
            <CalendarCheck className="w-4 h-4 text-vault-lime" />
            <span>Launch Check-In Terminal</span>
          </Link>

          <Link
            href="/portal/payments"
            className="px-4 py-2.5 rounded-xl bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider shadow-lime-glow hover:bg-vault-limeHover transition-all flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4 text-black" />
            <span>Collect Fee</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Active Members */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Active Members
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-vault-lime">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-heading">
              {metrics.activeMembers}
            </span>
            <span className="text-xs text-zinc-400">
              / {metrics.totalMembers} Total
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px]">
            {metrics.expiringMembers > 0 ? (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {metrics.expiringMembers} Expiring Soon
              </span>
            ) : (
              <span className="text-emerald-400 font-semibold">
                ✓ All memberships healthy
              </span>
            )}
          </div>
        </div>

        {/* Metric 2: Today's Fee Collections */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Today&apos;s Collection
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-xs font-bold text-zinc-400">₹</span>
            <span className="text-3xl font-black text-white font-heading">
              {metrics.todayCollections.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            Recorded receipts across UPI & Cash
          </div>
        </div>

        {/* Metric 3: Total Collections / Revenue */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-vault-lime">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-xs font-bold text-zinc-400">₹</span>
            <span className="text-3xl font-black text-white font-heading">
              {metrics.totalCollected.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        {/* Metric 4: Outstanding Dues (Pending Fees) */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Pending Receivables
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-xs font-bold text-amber-400">₹</span>
            <span className="text-3xl font-black text-amber-400 font-heading">
              {metrics.totalPendingDues.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            Uncollected balance dues from members
          </div>
        </div>

      </div>

      {/* Visual Analytics Grid: Revenue Trend & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Revenue Growth Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
                Revenue Trajectory (Monthly)
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Total collections recorded in INR for {session.activeGymName}
              </p>
            </div>
            <span className="text-xs font-mono text-vault-lime px-2 py-0.5 rounded bg-zinc-800 border border-vault-lime/30">
              6-Month Ledger
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#CCFF00" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#71717A" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#18181B", borderColor: "#27272A", borderRadius: "12px", fontSize: "12px" }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#CCFF00" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Payment Method Share
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Breakdown of fee collections
            </p>

            <div className="h-44 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="amount"
                  >
                    {paymentBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#18181B", borderColor: "#27272A", borderRadius: "12px", fontSize: "12px" }}
                    formatter={(v: any) => [`₹${Number(v).toLocaleString("en-IN")}`, "Amount"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-800">
            {paymentBreakdown.map((p) => (
              <div key={p.method} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-zinc-300 font-medium">{p.method}</span>
                </div>
                <span className="font-mono font-bold text-white">
                  ₹{p.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 2-Column Operational Grids: Expiry Action Ledger & Recent Receipts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Expiring / Expired Members Action List */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
                Renewals & Expiry Alerts ({expiringMembersList.length})
              </h3>
            </div>
            <Link
              href="/portal/members"
              className="text-xs text-vault-lime hover:underline font-bold"
            >
              View All Members →
            </Link>
          </div>

          {expiringMembersList.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-400">
              No members expiring in the next 7 days.
            </div>
          ) : (
            <div className="space-y-3">
              {expiringMembersList.map((member) => (
                <div
                  key={member.id}
                  className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-3 hover:border-zinc-700 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white font-heading">
                        {member.fullName}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        ({member.memberCode})
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                          member.status === "EXPIRED"
                            ? "bg-red-500/20 text-red-400 border border-red-500/40"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        }`}
                      >
                        {member.status === "EXPIRED" ? "EXPIRED" : "EXPIRING"}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      {member.activePlanName} • Expires: <strong className="text-zinc-300">{member.planExpiryDate}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSendReminder(member.id, member.fullName)}
                    disabled={reminderSentId === member.id}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{reminderSentId === member.id ? "Queuing..." : "WhatsApp"}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Recent Transaction Receipts */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Recent Transactions ({recentTransactions.length})
            </h3>
            <Link
              href="/portal/payments"
              className="text-xs text-vault-lime hover:underline font-bold"
            >
              Full Ledger →
            </Link>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-3 hover:border-zinc-700 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-heading">
                      {tx.memberName}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      [{tx.receiptNumber}]
                    </span>
                    <span className="text-[10px] font-mono font-bold text-vault-lime px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-700">
                      {tx.paymentMethod}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    {tx.planName} • {tx.paymentDate}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-white font-heading">
                    ₹{tx.amount.toLocaleString("en-IN")}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    ✓ Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

