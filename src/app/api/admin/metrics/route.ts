import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const supabase = getSupabase();

    const [
      { data: leadsPerDay },
      { data: crisisDistribution },
      { data: languageDistribution },
      { data: escalationRate },
      { data: conversionMetrics },
    ] = await Promise.all([
      supabase.from("leads_per_day").select("*"),
      supabase.from("crisis_distribution").select("*"),
      supabase.from("language_distribution").select("*"),
      supabase.from("escalation_rate").select("*"),
      supabase.from("conversion_metrics").select("*"),
    ]);

    return NextResponse.json({
      leadsPerDay,
      crisisDistribution,
      languageDistribution,
      escalationRate,
      conversionMetrics,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
