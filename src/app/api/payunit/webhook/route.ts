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
  return NextResponse.json({ received: true });
}
