import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { processLeadFollowup } from "@/lib/followup";

export async function GET() {
  try {
    const { data: leads } = await getSupabase()
      .from("leads")
      .select("*")
      .eq("followup_sent", false)
      .limit(10);

    if (!leads || leads.length === 0) {
      return NextResponse.json({ message: "No new leads." });
    }

    for (const lead of leads) {
      await processLeadFollowup(lead);
    }

    return NextResponse.json({ message: "Follow-ups processed." });
  } catch (error) {
    return NextResponse.json({ error: "Automation failed." }, { status: 500 });
  }
}
