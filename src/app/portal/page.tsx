import React from "react";
import { requireSession } from "@/lib/auth/session";
import { getGymDashboardMetrics } from "@/services/analytics.service";
import DashboardCockpitView from "@/components/os/DashboardCockpitView";

export const dynamic = "force-dynamic";

export default async function PortalDashboardPage() {
  const session = await requireSession();
  const data = await getGymDashboardMetrics(session.activeGymId);

  return (
    <DashboardCockpitView
      session={session}
      metrics={data.metrics}
      paymentBreakdown={data.paymentBreakdown}
      revenueTrend={data.revenueTrend}
      recentTransactions={data.recentTransactions}
      expiringMembersList={data.expiringMembersList}
    />
  );
}

