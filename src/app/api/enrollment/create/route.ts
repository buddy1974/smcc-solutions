/**
 * POST /api/enrollment/create
 *
 * Creates an enrollment record in Supabase immediately when the user
 * clicks the payment button (before visiting PayUnit).
 *
 * Body: { program: string; source?: string }
 * Returns: { reference: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { buildReference, PROGRAMS } from "@/lib/enrollment";

export async function POST(req: NextRequest) {
  try {
    const { program, source } = await req.json();

    const programData = PROGRAMS[program as string];
    if (!programData) {
      return NextResponse.json({ error: "Invalid program" }, { status: 400 });
    }

    const supabase = getSupabase();
    const year = new Date().getFullYear();

    // Count existing enrollments this year to generate a sequential reference.
    const { count } = await supabase
      .from("enrollments")
      .select("*", { count: "exact", head: true })
      .gte("created_at", `${year}-01-01`);

    const seq = (count ?? 0) + 1;
    const reference = buildReference(year, seq);

    const { error } = await supabase.from("enrollments").insert({
      reference,
      program,
      program_name: programData.name,
      amount: programData.amount,
      status: "initiated",
      source: source ?? null,
    });

    if (error) {
      // Collision on reference — retry with a random suffix
      const fallback = buildReference(year, seq + Math.floor(Math.random() * 100));
      const { error: e2 } = await supabase.from("enrollments").insert({
        reference: fallback,
        program,
        program_name: programData.name,
        amount: programData.amount,
        status: "initiated",
        source: source ?? null,
      });
      if (e2) throw e2;
      return NextResponse.json({ reference: fallback });
    }

    return NextResponse.json({ reference });
  } catch (err) {
    console.error("[enrollment/create]", err);
    return NextResponse.json({ error: "Failed to create enrollment" }, { status: 500 });
  }
}
