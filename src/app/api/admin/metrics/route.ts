import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabase();

    const [
      { data: leadsPerDay },
      { data: crisisDistribution },
      { data: languageDistribution },
      { data: escalationRate },
    ] = await Promise.all([
      supabase.from("leads_per_day").select("*"),
      supabase.from("crisis_distribution").select("*"),
      supabase.from("language_distribution").select("*"),
      supabase.from("escalation_rate").select("*"),
    ]);

    return NextResponse.json({
      leadsPerDay,
      crisisDistribution,
      languageDistribution,
      escalationRate,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
