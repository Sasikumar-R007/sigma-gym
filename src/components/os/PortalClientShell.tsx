"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PortalSidebar from "./PortalSidebar";
import PortalHeader from "./PortalHeader";
import type { SessionUser } from "@/lib/auth/types";

interface PortalClientShellProps {
  session: SessionUser;
  children: React.ReactNode;
}

export default function PortalClientShell({
  session,
  children,
}: PortalClientShellProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const handleSwitchGym = async (targetGymId: string) => {
    const res = await fetch("/api/auth/switch-gym", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetGymId }),
    });
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <div className="h-screen bg-[#070709] text-white flex overflow-hidden">
      {/* Fixed Sidebar - No movement on scroll */}
      <PortalSidebar
        session={session}
        onLogout={handleLogout}
        onSwitchGym={handleSwitchGym}
      />

      {/* Main Content Area - Independent Scroll */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <PortalHeader session={session} />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

