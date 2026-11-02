import { INITIAL_PAYMENTS, SeedPayment } from "@/lib/db/seedData";
import { getMembersByGym } from "./member.service";
import { getGymById } from "./gym.service";

let paymentsStore: SeedPayment[] = [...INITIAL_PAYMENTS];

export interface RecordPaymentInput {
  memberId: string;
  amount: number;
  paymentMethod: "CASH" | "UPI" | "CARD" | "BANK_TRANSFER";
  transactionRef?: string;
  planName?: string;
  collectedBy?: string;
}

export async function getPaymentsByGym(
  gymId: string,
  options?: { search?: string; method?: string }
): Promise<SeedPayment[]> {
  let list = paymentsStore.filter((p) => p.gymId === gymId);

  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.memberName.toLowerCase().includes(q) ||
        p.memberCode.toLowerCase().includes(q) ||
        p.receiptNumber.toLowerCase().includes(q) ||
        (p.transactionRef && p.transactionRef.toLowerCase().includes(q))
    );
  }

  if (options?.method && options.method !== "ALL") {
    list = list.filter((p) => p.paymentMethod === options.method);
  }

  return list;
}

export async function getPaymentsByMember(
  gymId: string,
  memberId: string
): Promise<SeedPayment[]> {
  return paymentsStore.filter((p) => p.gymId === gymId && p.memberId === memberId);
}

export async function recordPayment(
  gymId: string,
  input: RecordPaymentInput
): Promise<SeedPayment> {
  const members = await getMembersByGym(gymId);
  const member = members.find((m) => m.id === input.memberId);

  if (!member) {
    throw new Error("Member not found in this gym.");
  }

  const gymPrefix = gymId.includes("ironvault") ? "IV" : "REC";
  const year = new Date().getFullYear();
  const count = paymentsStore.filter((p) => p.gymId === gymId).length + 1;
  const receiptNumber = `${gymPrefix}-REC-${year}-${String(count).padStart(4, "0")}`;

  const now = new Date();
  const paymentDateStr = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const newPayment: SeedPayment = {
    id: `pay-${Date.now()}`,
    gymId,
    memberId: member.id,
    memberName: member.fullName,
    memberCode: member.memberCode,
    receiptNumber,
    amount: input.amount,
    paymentMethod: input.paymentMethod,
    transactionRef: input.transactionRef || undefined,
    paymentDate: paymentDateStr,
    planName: input.planName || member.activePlanName,
    collectedBy: input.collectedBy || "Reception Desk",
  };

  paymentsStore.unshift(newPayment);

  // Update member balances
  member.totalPaid += input.amount;
  member.balanceDue = Math.max(0, member.balanceDue - input.amount);

  return newPayment;
}

export async function getReceiptById(gymId: string, paymentId: string) {
  const payment = paymentsStore.find((p) => p.gymId === gymId && p.id === paymentId);
  if (!payment) return null;

  const gym = await getGymById(gymId);
  const members = await getMembersByGym(gymId);
  const member = members.find((m) => m.id === payment.memberId);

  return {
    payment,
    gym,
    member,
  };
}

