/**
 * POST /api/delphi-lead
 * Receives silent lead intelligence from the Delphi chat assistant.
 *
 * Triggered when:
 *   - leadScore > 50  (high engagement)
 *   - advisoryIntent = true (user explicitly requested a human advisor)
 *
 * Current: logs to console.
 * Upgrade path: replace console.log with WhatsApp trigger (CallMeBot / Meta API).
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { leadScore, crisisScore, advisoryIntent, timestamp } = data;

    console.log("[Delphi Lead]", {
      leadScore,
      crisisScore,
      advisoryIntent,
      timestamp,
    });

    // TODO: Replace with WhatsApp / Meta automation trigger
    // e.g. send to CallMeBot, CRM webhook, or Meta Conversions API

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[delphi-lead]", err);
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
