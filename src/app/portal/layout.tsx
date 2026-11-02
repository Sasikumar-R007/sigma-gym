import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import PortalClientShell from "@/components/os/PortalClientShell";

export const metadata = {
  title: "Dashboard Cockpit | Symphonix Gym OS",
  description: "Enterprise Gym Operations & Financial Management System",
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <PortalClientShell session={session}>{children}</PortalClientShell>;
}

