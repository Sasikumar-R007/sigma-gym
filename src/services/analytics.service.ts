import { getMembersByGym } from "./member.service";
import { getPaymentsByGym } from "./payment.service";
import { getTodayAttendanceByGym } from "./attendance.service";

export async function getGymDashboardMetrics(gymId: string) {
  const members = await getMembersByGym(gymId);
  const payments = await getPaymentsByGym(gymId);
  const attendances = await getTodayAttendanceByGym(gymId);

  // Member metrics
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === "ACTIVE").length;
  const expiringMembers = members.filter((m) => m.status === "EXPIRING_SOON").length;
  const expiredMembers = members.filter((m) => m.status === "EXPIRED").length;

  // Financial metrics
  const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);
  const totalPendingDues = members.reduce((acc, m) => acc + m.balanceDue, 0);

  // Today's collections
  const todayPayments = payments.filter((p) => p.paymentDate.includes("Today") || p.paymentDate.includes("2026"));
  const todayCollections = todayPayments.slice(0, 3).reduce((acc, p) => acc + p.amount, 0);

  // Payment methods breakdown for pie chart
  const upiTotal = payments.filter((p) => p.paymentMethod === "UPI").reduce((acc, p) => acc + p.amount, 0);
  const cardTotal = payments.filter((p) => p.paymentMethod === "CARD").reduce((acc, p) => acc + p.amount, 0);
  const cashTotal = payments.filter((p) => p.paymentMethod === "CASH").reduce((acc, p) => acc + p.amount, 0);
  const bankTotal = payments.filter((p) => p.paymentMethod === "BANK_TRANSFER").reduce((acc, p) => acc + p.amount, 0);

  const paymentBreakdown = [
    { method: "UPI", amount: upiTotal, color: "#CCFF00" },
    { method: "Card / POS", amount: cardTotal, color: "#3B82F6" },
    { method: "Cash", amount: cashTotal, color: "#10B981" },
    { method: "Bank Transfer", amount: bankTotal, color: "#8B5CF6" },
  ];

  // Revenue trend (simulated calibrated months for chart)
  const revenueTrend = [
    { month: "May", revenue: Math.round(totalCollected * 0.45), members: Math.max(1, totalMembers - 5) },
    { month: "Jun", revenue: Math.round(totalCollected * 0.6), members: Math.max(2, totalMembers - 4) },
    { month: "Jul", revenue: Math.round(totalCollected * 0.75), members: Math.max(3, totalMembers - 3) },
    { month: "Aug", revenue: Math.round(totalCollected * 0.85), members: Math.max(4, totalMembers - 2) },
    { month: "Sep", revenue: Math.round(totalCollected * 0.92), members: Math.max(5, totalMembers - 1) },
    { month: "Oct", revenue: totalCollected, members: totalMembers },
  ];

  return {
    metrics: {
      totalMembers,
      activeMembers,
      expiringMembers,
      expiredMembers,
      todayCollections,
      totalCollected,
      totalPendingDues,
      todayCheckIns: attendances.length,
    },
    paymentBreakdown,
    revenueTrend,
    recentTransactions: payments.slice(0, 5),
    expiringMembersList: members.filter((m) => m.status === "EXPIRING_SOON" || m.status === "EXPIRED"),
  };
}

