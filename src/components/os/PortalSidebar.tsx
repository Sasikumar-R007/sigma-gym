"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  CalendarCheck,
  Award,
  Layers,
  Settings,
  Dumbbell,
  LogOut,
  Building2,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { SessionUser } from "@/lib/auth/session";

interface PortalSidebarProps {
  session: SessionUser;
  onLogout: () => void;
  onSwitchGym: (gymId: string) => void;
}

export default function PortalSidebar({
  session,
  onLogout,
  onSwitchGym,
}: PortalSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview Cockpit", href: "/portal", icon: LayoutDashboard },
    { name: "Members CRM", href: "/portal/members", icon: Users },
    { name: "Membership Plans", href: "/portal/memberships", icon: Layers },
    { name: "Payments & Ledger", href: "/portal/payments", icon: CreditCard },
    { name: "Attendance Terminal", href: "/portal/attendance", icon: CalendarCheck },
  ];

  const isApex = session.activeGymSlug === "apex-strength";
  const themeAccentColor = isApex ? "#FF5500" : "#CCFF00";

  return (
    <aside className="w-64 bg-[#0a0a0d] border-r border-zinc-800 flex flex-col justify-between shrink-0 min-h-screen text-zinc-300">
      {/* Brand & Active Gym Switcher */}
      <div>
        <div className="p-5 border-b border-zinc-800">
          <Link href="/portal" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-black shadow-lg"
              style={{ backgroundColor: themeAccentColor }}
            >
              <Dumbbell className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-white text-base tracking-tight">
                  SYMPHONIX
                </span>
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 font-bold border border-zinc-700">
                  OS
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 block -mt-0.5">
                {session.activeGymName}
              </span>
            </div>
          </Link>

          {/* Tenant Switcher dropdown (for multi-gym owners or testing) */}
          {session.availableGyms && session.availableGyms.length > 1 && (
            <div className="mt-4 pt-3 border-t border-zinc-800/80">
              <label className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider block mb-1.5 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-vault-lime" /> Switch Active Gym
              </label>
              <div className="space-y-1">
                {session.availableGyms.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => onSwitchGym(g.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      session.activeGymId === g.id
                        ? "bg-zinc-800 text-white font-bold border border-zinc-700"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{g.name.split(" ")[0]}</span>
                    {session.activeGymId === g.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-vault-lime" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Core Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-zinc-800/90 text-white shadow-sm border border-zinc-700"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                }`}
              >
                <Icon
                  className="w-4 h-4 transition-colors"
                  style={{ color: isActive ? themeAccentColor : undefined }}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Session & Logout Footer */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {session.fullName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {session.fullName}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-800 text-vault-lime font-bold">
                  {session.gymRole}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Log Out"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

