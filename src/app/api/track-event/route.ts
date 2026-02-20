/**
 * POST /api/track-event   — persist a named event to Supabase `events` table
 * GET  /api/track-event   — retrieve all events, newest first (admin use)
 *
 * Payload: { name: string; meta?: Record<string, unknown> }
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await getSupabase()
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[track-event] GET error:", error);
    return NextResponse.json([], { status: 500 });
  }

  const events = (data ?? []).map((row) => ({
    name:      row.event,
    meta:      row.meta ?? {},
    timestamp: row.created_at,
  }));

  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  try {
    const { name, meta } = (await req.json()) as {
      name: string;
      meta?: Record<string, unknown>;
    };
    if (!name) return NextResponse.json({ received: false }, { status: 400 });

    const { error } = await getSupabase().from("events").insert([{
      event: name,
      meta:  meta ?? {},
    }]);
    if (error) console.error("[track-event] DB insert error:", error);

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ received: false }, { status: 400 });
  }
}
