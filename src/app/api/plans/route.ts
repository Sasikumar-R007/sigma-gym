import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { getPlansByGym, createPlan, updatePlan, togglePlanStatus } from "@/services/membership.service";

export async function GET() {
  try {
    const session = await requireSession();
    const plans = await getPlansByGym(session.activeGymId);
    return NextResponse.json({ plans });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession(["OWNER", "MANAGER"]);
    const body = await req.json();

    if (!body.name || !body.price || !body.durationDays) {
      return NextResponse.json(
        { error: "Plan Name, Price and Duration are required." },
        { status: 400 }
      );
    }

    const plan = await createPlan(session.activeGymId, {
      name: body.name,
      durationDays: Number(body.durationDays),
      price: Number(body.price),
      registrationFee: Number(body.registrationFee) || 0,
      description: body.description || "",
      facilitiesIncluded: Array.isArray(body.facilitiesIncluded)
        ? body.facilitiesIncluded
        : (body.facilitiesIncluded || "").split(",").map((s: string) => s.trim()),
    });

    return NextResponse.json({ success: true, plan });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create plan";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireSession(["OWNER", "MANAGER"]);
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "Plan ID is required." }, { status: 400 });
    }

    if (body.toggleStatus) {
      const plan = await togglePlanStatus(session.activeGymId, body.id);
      return NextResponse.json({ success: true, plan });
    }

    const plan = await updatePlan(session.activeGymId, body.id, {
      id: body.id,
      name: body.name,
      durationDays: body.durationDays ? Number(body.durationDays) : undefined,
      price: body.price ? Number(body.price) : undefined,
      registrationFee: body.registrationFee !== undefined ? Number(body.registrationFee) : undefined,
      description: body.description,
      facilitiesIncluded: Array.isArray(body.facilitiesIncluded)
        ? body.facilitiesIncluded
        : body.facilitiesIncluded
        ? body.facilitiesIncluded.split(",").map((s: string) => s.trim())
        : undefined,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : undefined,
    });

    return NextResponse.json({ success: true, plan });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update plan";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

