import { NextRequest, NextResponse } from "next/server";
import { switchGymContext } from "@/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const { targetGymId } = await req.json();
    if (!targetGymId) {
      return NextResponse.json({ error: "targetGymId is required." }, { status: 400 });
    }
    const result = await switchGymContext(targetGymId);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to switch gym.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

