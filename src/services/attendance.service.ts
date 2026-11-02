import { INITIAL_ATTENDANCE, SeedAttendance } from "@/lib/db/seedData";
import { getMembersByGym } from "./member.service";

let attendanceStore: SeedAttendance[] = [...INITIAL_ATTENDANCE];

export async function getTodayAttendanceByGym(gymId: string): Promise<SeedAttendance[]> {
  return attendanceStore.filter((a) => a.gymId === gymId);
}

export async function getAttendanceByMember(
  gymId: string,
  memberId: string
): Promise<SeedAttendance[]> {
  return attendanceStore.filter((a) => a.gymId === gymId && a.memberId === memberId);
}

export interface MarkAttendanceInput {
  memberId: string;
  checkInMethod?: "MANUAL" | "QR_CODE";
  markedBy?: string;
}

export async function markAttendance(
  gymId: string,
  input: MarkAttendanceInput
) {
  const members = await getMembersByGym(gymId);
  const member = members.find((m) => m.id === input.memberId);

  if (!member) {
    throw new Error("Member not found in this gym.");
  }

  // Check if membership is expired
  if (member.status === "EXPIRED") {
    return {
      success: false,
      reason: "MEMBERSHIP_EXPIRED",
      message: `Membership expired on ${member.planExpiryDate}. Please renew to enter.`,
      member,
    };
  }

  // Check for duplicate check-in today
  const alreadyCheckedIn = attendanceStore.some(
    (a) => a.gymId === gymId && a.memberId === member.id && a.checkInTime.includes("Today")
  );

  if (alreadyCheckedIn) {
    return {
      success: false,
      reason: "ALREADY_CHECKED_IN",
      message: `${member.fullName} has already checked in today.`,
      member,
    };
  }

  const now = new Date();
  const timeStr = `Today at ${now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const newRecord: SeedAttendance = {
    id: `att-${Date.now()}`,
    gymId,
    memberId: member.id,
    memberName: member.fullName,
    memberCode: member.memberCode,
    checkInTime: timeStr,
    checkInMethod: input.checkInMethod || "MANUAL",
    markedBy: input.markedBy || "Front Desk",
  };

  attendanceStore.unshift(newRecord);

  return {
    success: true,
    attendance: newRecord,
    member,
  };
}

