/**
 * GET   /api/enrollment/[reference]  — fetch enrollment details
 * PATCH /api/enrollment/[reference]  — check in (requires key)
 * PUT   /api/enrollment/[reference]  — update student_name (no key) or admin fields (requires key)
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { isValidReference } from "@/lib/enrollment";

const ADMIN_KEY = process.env.ADMIN_ENROLLMENT_KEY ?? "smcc2026";

type RouteContext = { params: Promise<{ reference: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { reference } = await params;
  if (!isValidReference(reference)) {
    return NextResponse.json({ error: "Invalid reference format" }, { status: 400 });
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("reference", reference)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }
    return NextResponse.json({ enrollment: data });
  } catch (err) {
    console.error("[enrollment/get]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { reference } = await params;
  if (!isValidReference(reference)) {
    return NextResponse.json({ error: "Invalid reference format" }, { status: 400 });
  }

  const key = req.nextUrl.searchParams.get("key");
  const isAdmin = key === ADMIN_KEY;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Fields any student can update (no key needed)
  const studentFields: Record<string, unknown> = {};
  if (typeof body.student_name === "string") {
    studentFields.student_name = body.student_name.trim().slice(0, 200);
  }

  // Fields only admin can update
  const adminFields: Record<string, unknown> = {};
  if (isAdmin) {
    if (typeof body.progress === "number") adminFields.progress = Math.max(0, body.progress);
    if (typeof body.certificate_issued === "boolean") {
      adminFields.certificate_issued = body.certificate_issued;
      if (body.certificate_issued) adminFields.certificate_issued_at = new Date().toISOString();
    }
  }

  const updates = { ...studentFields, ...(isAdmin ? adminFields : {}) };
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("enrollments")
      .update(updates)
      .eq("reference", reference);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[enrollment/put]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reference } = await params;
  if (!isValidReference(reference)) {
    return NextResponse.json({ error: "Invalid reference format" }, { status: 400 });
  }

  try {
    const supabase = getSupabase();

    // Fetch first to check if already checked in
    const { data: existing } = await supabase
      .from("enrollments")
      .select("checked_in, status")
      .eq("reference", reference)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }
    if (existing.checked_in) {
      return NextResponse.json({ error: "Already checked in", alreadyCheckedIn: true }, { status: 409 });
    }

    const { error } = await supabase
      .from("enrollments")
      .update({ checked_in: true, checked_in_at: new Date().toISOString() })
      .eq("reference", reference);

    if (error) throw error;
    return NextResponse.json({ success: true, reference });
  } catch (err) {
    console.error("[enrollment/checkin]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
