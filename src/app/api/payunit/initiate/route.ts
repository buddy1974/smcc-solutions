/**
 * POST /api/payunit/initiate
 * Creates a PayUnit sandbox payment transaction for SMCC enrollment.
 *
 * Flow:
 *   1. Receives applicant form data from ApplicationForm
 *   2. Calls PayUnit /api/gateway/initialize in test mode
 *   3. Returns { checkoutUrl } — client redirects to PayUnit hosted payment page
 *   4. After payment, PayUnit redirects user to /enrolled (return_url)
 *   5. PayUnit also notifies /api/payunit/webhook (notify_url)
 *
 * Required environment variables (Vercel → Settings → Environment Variables):
 *   PAYUNIT_API_KEY       — PayUnit sandbox token (starts with sand_...)
 *                           Use the sandbox/test key from your PayUnit dashboard.
 *
 * Optional (add if PayUnit requires Basic Auth on your account tier):
 *   PAYUNIT_API_USER      — PayUnit API username (api_user field in dashboard)
 *   PAYUNIT_API_PASSWORD  — PayUnit API password
 *
 * URL variable (recommended — set to your production domain):
 *   NEXT_PUBLIC_SITE_URL  — e.g. https://smcc.solutions
 *                           Falls back to VERCEL_URL, then smcc-solutions.vercel.app
 */

import { NextRequest, NextResponse } from "next/server";

const PAYUNIT_BASE = "https://gateway.payunit.net";

// Resolve the canonical site URL for PayUnit callbacks.
// Priority: NEXT_PUBLIC_SITE_URL → Vercel auto-injected URL → hardcoded fallback.
function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://smcc-solutions.vercel.app";
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Only PAYUNIT_API_KEY is mandatory — the sandbox key (sand_...)
    const apiKey = process.env.PAYUNIT_API_KEY;
    if (!apiKey) {
      console.error("[payunit/initiate] PAYUNIT_API_KEY is not set");
      return NextResponse.json(
        { error: "Payment gateway is being activated. Use the manual payment option below." },
        { status: 503 }
      );
    }

    // Build headers — Basic Auth is optional; include only if both creds are set
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "mode": "test",
    };

    const apiUser = process.env.PAYUNIT_API_USER;
    const apiPass = process.env.PAYUNIT_API_PASSWORD;
    if (apiUser && apiPass) {
      headers["Authorization"] = `Basic ${Buffer.from(`${apiUser}:${apiPass}`).toString("base64")}`;
    }

    // Unique transaction ID — avoid special chars (Orange Money requirement)
    const transactionId = `SMCC${Date.now()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const base = siteUrl();

    const payunitRes = await fetch(`${PAYUNIT_BASE}/api/gateway/initialize`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        total_amount: 50000,
        currency: "XAF",
        transaction_id: transactionId,
        return_url: `${base}/enrolled`,
        notify_url: `${base}/api/payunit/webhook`,
        payment_country: "CM",
      }),
    });

    if (!payunitRes.ok) {
      const text = await payunitRes.text();
      console.error("[payunit/initiate] PayUnit error:", payunitRes.status, text);
      return NextResponse.json(
        { error: "Payment gateway is being activated. Use the manual payment option below." },
        { status: 502 }
      );
    }

    const json = await payunitRes.json();
    const checkoutUrl: string | undefined = json?.transaction_url;

    if (!checkoutUrl) {
      console.error("[payunit/initiate] Missing transaction_url in response:", json);
      return NextResponse.json(
        { error: "Payment gateway is being activated. Use the manual payment option below." },
        { status: 502 }
      );
    }

    console.log("[payunit/initiate] Created transaction:", transactionId, "for:", data.fullName);
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("[payunit/initiate]", err);
    return NextResponse.json(
      { error: "Payment gateway is being activated. Use the manual payment option below." },
      { status: 500 }
    );
  }
}
