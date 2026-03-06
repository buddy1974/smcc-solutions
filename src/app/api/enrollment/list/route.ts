/**
 * GET /api/enrollment/list?key=smcc2026
 * Returns all enrollments ordered by created_at desc.
 * Protected by admin key.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const ADMIN_KEY = process.env.ADMIN_ENROLLMENT_KEY ?? "smcc2026";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("enrollments")
      .select("reference, program_name, amount, status, checked_in, checked_in_at, source, created_at, student_name, progress, certificate_issued, certificate_issued_at")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ enrollments: data ?? [] });
  } catch (err) {
    console.error("[enrollment/list]", err);
    return NextResponse.json({ error: "Failed to fetch enrollments" }, { status: 500 });
  }
}
