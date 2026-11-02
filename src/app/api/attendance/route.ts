import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { getTodayAttendanceByGym, markAttendance } from "@/services/attendance.service";

export async function GET() {
  try {
    const session = await requireSession();
    const attendance = await getTodayAttendanceByGym(session.activeGymId);
    return NextResponse.json({ attendance });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    const body = await req.json();

    if (!body.memberId) {
      return NextResponse.json({ error: "Member ID is required." }, { status: 400 });
    }

    const result = await markAttendance(session.activeGymId, {
      memberId: body.memberId,
      checkInMethod: body.checkInMethod || "MANUAL",
      markedBy: session.fullName,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to record check-in";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

