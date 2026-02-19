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
 *   PAYUNIT_API_USER      — PayUnit API username / api_user
 *   PAYUNIT_API_PASSWORD  — PayUnit API password
 *   PAYUNIT_API_KEY       — PayUnit application token (x-api-key)
 */

import { NextRequest, NextResponse } from "next/server";

const PAYUNIT_BASE = "https://gateway.payunit.net";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Build Basic auth header: Base64(api_user:api_password)
    const credentials = Buffer.from(
      `${process.env.PAYUNIT_API_USER}:${process.env.PAYUNIT_API_PASSWORD}`
    ).toString("base64");

    // Unique transaction ID — avoid special chars (Orange Money requirement)
    const transactionId = `SMCC${Date.now()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const payunitRes = await fetch(`${PAYUNIT_BASE}/api/gateway/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}`,
        "x-api-key": process.env.PAYUNIT_API_KEY ?? "",
        "mode": "test",
      },
      body: JSON.stringify({
        total_amount: 50000,
        currency: "XAF",
        transaction_id: transactionId,
        return_url: "https://smcc-solutions.vercel.app/enrolled",
        notify_url: "https://smcc-solutions.vercel.app/api/payunit/webhook",
        payment_country: "CM",
      }),
    });

    if (!payunitRes.ok) {
      const text = await payunitRes.text();
      console.error("[payunit/initiate] PayUnit error:", payunitRes.status, text);
      return NextResponse.json(
        { error: "Payment initiation failed. Please contact us on WhatsApp." },
        { status: 502 }
      );
    }

    const json = await payunitRes.json();
    const checkoutUrl: string | undefined = json?.transaction_url;

    if (!checkoutUrl) {
      console.error("[payunit/initiate] Missing transaction_url in response:", json);
      return NextResponse.json(
        { error: "Payment initiation failed. Please contact us on WhatsApp." },
        { status: 502 }
      );
    }

    console.log("[payunit/initiate] Created transaction:", transactionId, "for:", data.fullName);
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("[payunit/initiate]", err);
    return NextResponse.json(
      { error: "Server error. Please contact us on WhatsApp." },
      { status: 500 }
    );
  }
}
