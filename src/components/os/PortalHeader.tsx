"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  CreditCard,
  CalendarCheck,
  ExternalLink,
  ShieldAlert,
  Bell,
  Building2,
} from "lucide-react";
import { SessionUser } from "@/lib/auth/session";

interface PortalHeaderProps {
  session: SessionUser;
  onOpenNewMember?: () => void;
  onOpenNewPayment?: () => void;
}

export default function PortalHeader({
  session,
  onOpenNewMember,
  onOpenNewPayment,
}: PortalHeaderProps) {
  const isApex = session.activeGymSlug === "apex-strength";
  const themeAccentColor = isApex ? "#FF5500" : "#CCFF00";

  return (
    <header className="h-16 bg-[#0a0a0d] border-b border-zinc-800 px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
      
      {/* Left: Active Gym Location Badge */}
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: themeAccentColor }}
          />
          <span className="font-bold text-white uppercase text-[11px] tracking-wider">
            {session.activeGymName}
          </span>
          <span className="text-zinc-500 hidden sm:inline">•</span>
          <span className="text-zinc-400 text-[11px] hidden sm:inline font-mono">
            ID: {session.activeGymId}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5">
        
        {/* View Public Website */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 transition-colors"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
        </Link>

        {/* Quick Check-in link */}
        <Link
          href="/portal/attendance"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-bold text-white transition-colors"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-vault-lime" />
          <span className="hidden sm:inline">Check-In</span>
        </Link>

        {/* Quick Action: New Member */}
        <Link
          href="/portal/members"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-vault-lime text-black font-extrabold uppercase text-[11px] tracking-wider shadow-sm hover:bg-vault-limeHover transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 text-black" />
          <span>New Member</span>
        </Link>

      </div>
    </header>
  );
}

