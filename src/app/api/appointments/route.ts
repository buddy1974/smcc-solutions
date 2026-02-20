/**
 * POST /api/appointments
 * Records a booked advisory session and marks the originating lead as converted.
 *
 * Payload: { lead_id, scheduled_time, calendar_source? }
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { lead_id, scheduled_time, calendar_source = "google" } =
      await req.json() as {
        lead_id:         string;
        scheduled_time:  string;
        calendar_source?: string;
      };

    if (!lead_id || !scheduled_time) {
      return NextResponse.json(
        { error: "lead_id and scheduled_time are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // Insert appointment record
    const { data: appointment, error: apptErr } = await supabase
      .from("appointments")
      .insert({ lead_id, scheduled_time, calendar_source, status: "booked" })
      .select()
      .single();

    if (apptErr) {
      console.error("[appointments] insert error:", apptErr);
      return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
    }

    // Mark originating lead as converted
    const { error: leadErr } = await supabase
      .from("leads")
      .update({ converted: true })
      .eq("id", lead_id);

    if (leadErr) console.error("[appointments] lead conversion error:", leadErr);

    return NextResponse.json({ appointment });
  } catch (err) {
    console.error("[appointments]", err);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
