/**
 * POST /api/track-event   — push a named event into the in-memory store
 * GET  /api/track-event   — retrieve all events, newest first (admin use)
 *
 * Payload: { name: string; meta?: Record<string, unknown> }
 */

import { NextRequest, NextResponse } from "next/server";
import { pushEvent, getEvents } from "@/lib/eventStore";

export async function GET() {
  return NextResponse.json(getEvents().slice().reverse()); // newest first
}

export async function POST(req: NextRequest) {
  try {
    const { name, meta } = (await req.json()) as {
      name: string;
      meta?: Record<string, unknown>;
    };
    if (!name) return NextResponse.json({ received: false }, { status: 400 });
    pushEvent(name, meta ?? {});
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ received: false }, { status: 400 });
  }
}
