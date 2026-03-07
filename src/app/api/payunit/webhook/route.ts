/**
 * POST /api/payunit/webhook
 * PayUnit payment notification handler.
 *
 * PayUnit calls this URL (notify_url) after a transaction completes.
 * For now: log the body and return 200 OK.
 * Validation, email, and WhatsApp notifications to be added later.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// Amount → program key mapping (XAF)
const AMOUNT_TO_PROGRAM: Record<number, string> = {
  50000: "cohort1",
  150000: "7pillars",
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  console.log("[payunit/webhook]", JSON.stringify(body));

  // Confirm enrollment in Supabase (fire-and-forget)
  try {
    if (body) {
      const rawStatus = (body.status ?? body.transaction_status ?? "").toLowerCase();
      const isSuccess = rawStatus === "success" || rawStatus === "completed" || rawStatus === "paid";
      const amount = Number(body.amount ?? body.total_amount ?? 0);
      const txId = body.transaction_id ?? body.id ?? null;
      const program = AMOUNT_TO_PROGRAM[amount];

      if (isSuccess && program) {
        const supabase = getSupabase();
        // Confirm the most recent initiated enrollment for this program
        const { data: match } = await supabase
          .from("enrollments")
          .select("reference")
          .eq("program", program)
          .eq("status", "initiated")
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (match?.reference) {
          await supabase
            .from("enrollments")
            .update({ status: "confirmed", payunit_transaction_id: txId })
            .eq("reference", match.reference);
          console.log("[payunit/webhook] confirmed enrollment:", match.reference);
        }
      }
    }
  } catch (e) {
    console.error("[payunit/webhook] enrollment confirm error:", e);
  }

  // Notify admissions via WhatsApp (fire-and-forget — never block the 200 response)
  try {
    const waKey  = process.env.WA_CALLMEBOT_KEY;
    const waPhone = process.env.WA_PHONE ?? "237697317737";

    if (waKey && body) {
      const status   = body.status ?? body.transaction_status ?? "unknown";
      const amount   = body.amount ?? body.total_amount ?? "?";
      const txId     = body.transaction_id ?? body.id ?? "?";
      const message  = encodeURIComponent(
        `PayUnit Payment\nStatus: ${status}\nAmount: ${amount} XAF\nRef: ${txId}\nEnrollment confirmed automatically.`
      );
      fetch(
        `https://api.callmebot.com/whatsapp.php?phone=${waPhone}&text=${message}&apikey=${waKey}`
      ).catch((e) => console.error("[payunit/webhook] CallMeBot error:", e));
    }
  } catch (e) {
    console.error("[payunit/webhook] notification error:", e);
  }

  return NextResponse.json({ received: true });
}
