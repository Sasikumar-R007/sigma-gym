import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { getPaymentsByGym, recordPayment } from "@/services/payment.service";

export async function GET(req: NextRequest) {
  try {
    const session = await requireSession();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;
    const method = searchParams.get("method") || undefined;

    const payments = await getPaymentsByGym(session.activeGymId, { search, method });
    return NextResponse.json({ payments });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession(["OWNER", "MANAGER", "RECEPTIONIST"]);
    const body = await req.json();

    if (!body.memberId || !body.amount) {
      return NextResponse.json(
        { error: "Member ID and payment amount are required." },
        { status: 400 }
      );
    }

    const payment = await recordPayment(session.activeGymId, {
      memberId: body.memberId,
      amount: Number(body.amount),
      paymentMethod: body.paymentMethod || "UPI",
      transactionRef: body.transactionRef,
      planName: body.planName,
      collectedBy: session.fullName,
    });

    return NextResponse.json({ success: true, payment });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to record payment";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

