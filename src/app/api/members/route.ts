import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { getMembersByGym, createMember } from "@/services/member.service";

export async function GET(req: NextRequest) {
  try {
    const session = await requireSession();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;

    const members = await getMembersByGym(session.activeGymId, { search, status });
    return NextResponse.json({ members });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession(["OWNER", "MANAGER", "RECEPTIONIST"]);
    const body = await req.json();

    if (!body.fullName || !body.phone || !body.planId) {
      return NextResponse.json(
        { error: "Full Name, Phone number and Membership Plan are required." },
        { status: 400 }
      );
    }

    const member = await createMember(
      session.activeGymId,
      {
        fullName: body.fullName,
        gender: body.gender || "MALE",
        phone: body.phone,
        email: body.email || "",
        emergencyContactName: body.emergencyContactName,
        emergencyContactPhone: body.emergencyContactPhone,
        bloodGroup: body.bloodGroup,
        planId: body.planId,
        amountPaid: Number(body.amountPaid) || 0,
        paymentMethod: body.paymentMethod || "UPI",
        notes: body.notes,
      },
      session.fullName
    );

    return NextResponse.json({ success: true, member });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create member";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

