/**
 * POST /api/payunit/webhook
 * PayUnit payment notification handler.
 *
 * PayUnit calls this URL (notify_url) after a transaction completes.
 * For now: log the body and return 200 OK.
 * Validation, email, and WhatsApp notifications to be added later.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  console.log("[payunit/webhook]", JSON.stringify(body));

  // Notify admissions via WhatsApp (fire-and-forget — never block the 200 response)
  try {
    const waKey  = process.env.WA_CALLMEBOT_KEY;
    const waPhone = process.env.WA_PHONE ?? "237697317737";

    if (waKey && body) {
      const status   = body.status ?? body.transaction_status ?? "unknown";
      const amount   = body.amount ?? body.total_amount ?? "?";
      const txId     = body.transaction_id ?? body.id ?? "?";
      const message  = encodeURIComponent(
        `💳 PayUnit Payment\nStatus: ${status}\nAmount: ${amount} XAF\nRef: ${txId}\nCheck dashboard to confirm enrollment.`
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
