import { INITIAL_MEMBERS, SeedMember } from "@/lib/db/seedData";
import { getPlansByGym } from "./membership.service";
import { addDays } from "date-fns";

let membersStore: SeedMember[] = [...INITIAL_MEMBERS];

export interface GetMembersOptions {
  search?: string;
  status?: string;
  sortBy?: "name" | "joinedAt" | "expiry";
}

export async function getMembersByGym(
  gymId: string,
  options?: GetMembersOptions
): Promise<SeedMember[]> {
  let list = membersStore.filter((m) => m.gymId === gymId);

  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (m) =>
        m.fullName.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        m.memberCode.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
    );
  }

  if (options?.status && options.status !== "ALL") {
    list = list.filter((m) => m.status === options.status);
  }

  return list;
}

export async function getMemberById(
  gymId: string,
  memberId: string
): Promise<SeedMember | null> {
  const member = membersStore.find((m) => m.gymId === gymId && m.id === memberId);
  return member || null;
}

export interface CreateMemberInput {
  fullName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  phone: string;
  email: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  bloodGroup?: string;
  planId: string;
  amountPaid: number;
  paymentMethod: "CASH" | "UPI" | "CARD" | "BANK_TRANSFER";
  notes?: string;
}

export async function createMember(
  gymId: string,
  input: CreateMemberInput,
  collectedBy: string = "Front Desk"
): Promise<SeedMember> {
  const plans = await getPlansByGym(gymId);
  const selectedPlan = plans.find((p) => p.id === input.planId) || plans[0];

  const gymPrefix = gymId.includes("ironvault") ? "IV" : "MEM";
  const existingCount = membersStore.filter((m) => m.gymId === gymId).length;
  const newMemberCode = `${gymPrefix}-${1000 + existingCount + 1}`;

  const now = new Date();
  const joinedAtStr = now.toISOString().split("T")[0];
  const expiryDate = addDays(now, selectedPlan.durationDays);
  const expiryDateStr = expiryDate.toISOString().split("T")[0];

  const totalFee = selectedPlan.price + selectedPlan.registrationFee;
  const balanceDue = Math.max(0, totalFee - input.amountPaid);

  const newMember: SeedMember = {
    id: `mem-${Date.now()}`,
    gymId,
    memberCode: newMemberCode,
    fullName: input.fullName.trim(),
    gender: input.gender,
    phone: input.phone.trim(),
    email: input.email.trim(),
    emergencyContactName: input.emergencyContactName?.trim() || "",
    emergencyContactPhone: input.emergencyContactPhone?.trim() || "",
    bloodGroup: input.bloodGroup || "O+",
    status: "ACTIVE",
    joinedAt: joinedAtStr,
    activePlanName: selectedPlan.name,
    planExpiryDate: expiryDateStr,
    balanceDue,
    totalPaid: input.amountPaid,
    photoUrl:
      input.gender === "FEMALE"
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
  };

  membersStore.unshift(newMember);

  // If initial payment was made, record it
  if (input.amountPaid > 0) {
    const { recordPayment } = await import("./payment.service");
    await recordPayment(gymId, {
      memberId: newMember.id,
      amount: input.amountPaid,
      paymentMethod: input.paymentMethod,
      planName: `${selectedPlan.name} (Admission Fee)`,
      collectedBy,
    });
  }

  return newMember;
}

export async function updateMemberStatus(
  gymId: string,
  memberId: string,
  newStatus: SeedMember["status"]
): Promise<SeedMember | null> {
  const member = membersStore.find((m) => m.gymId === gymId && m.id === memberId);
  if (!member) return null;
  member.status = newStatus;
  return member;
}

