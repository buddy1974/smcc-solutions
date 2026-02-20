/**
 * POST /api/crm/lead
 * Receives silent lead intelligence from Delphi and sends an admin notification email.
 *
 * Triggered when:
 *   - User clicks "Speak to a Human Advisor"
 *   - User opens the Google Calendar booking link
 *   - leadScore >= 50 (high engagement threshold)
 *
 * Payload:
 *   { source, name, email, phone, country, intent, leadScore, crisisScore, lang, timestamp }
 *
 * Current: console.log + nodemailer notification to admissions.
 * Upgrade path: add CRM webhook, Meta Conversions API, or WhatsApp trigger.
 */

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type LeadPayload = {
  source: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  intent: "apply" | "advisor" | "info";
  leadScore: number;
  crisisScore: number;
  lang: string;
  timestamp: string;
};

// ── In-memory lead store (resets on deploy — MVP only) ────────────────────────
// Upgrade path: replace with database write (Supabase, PlanetScale, etc.)
const leads: LeadPayload[] = [];

export async function GET() {
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  try {
    const data: LeadPayload = await req.json();
    const {
      source, name, email, phone, country,
      intent, leadScore, crisisScore, lang, timestamp,
    } = data;

    // Store in memory for dashboard
    leads.push(data);

    console.log("[CRM Lead]", {
      source, name, email, phone, country,
      intent, leadScore, crisisScore, lang, timestamp,
    });

    // ── Email notification (non-fatal) ───────────────────────────────────────
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const intentLabel = {
        apply:   "High Interest — Apply",
        advisor: "Seeking Human Advisor",
        info:    "Information Request",
      }[intent] ?? intent;

      const langLabel  = lang === "fr" ? "French 🇫🇷" : "English 🇬🇧";
      const crisisFlag = crisisScore >= 50;

      await transporter.sendMail({
        from: `"SMCC Delphi" <${process.env.GMAIL_USER}>`,
        to: "nforgweimah@gmail.com",
        subject: `🤖 Delphi Lead — ${intentLabel} (Score: ${leadScore})${crisisFlag ? " ⚠" : ""}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#121212">

            <!-- Header -->
            <div style="background:#5B1A5D;padding:24px 32px;border-radius:8px 8px 0 0">
              <h2 style="color:#C9A227;margin:0;font-size:18px">SMCC — New Delphi Lead</h2>
              <p style="color:rgba(246,232,240,0.65);margin:6px 0 0;font-size:12px">
                Captured automatically by Delphi advisory assistant
              </p>
            </div>

            <!-- Body -->
            <div style="background:#fafafa;padding:28px 32px;border:1px solid #eee;border-radius:0 0 8px 8px">

              ${crisisFlag ? `
              <div style="margin-bottom:20px;padding:14px 18px;background:#fff0f0;border-radius:8px;border-left:4px solid #c00">
                <p style="color:#c00;font-weight:700;margin:0;font-size:14px">
                  ⚠ High Crisis Signal — Follow up with this person immediately.
                </p>
              </div>` : ""}

              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr>
                  <td style="padding:9px 0;color:#777;width:140px"><strong>Intent</strong></td>
                  <td style="padding:9px 0;font-weight:600">${intentLabel}</td>
                </tr>
                <tr style="background:#f5f5f5">
                  <td style="padding:9px 8px;color:#777"><strong>Lead Score</strong></td>
                  <td style="padding:9px 8px;font-size:20px;font-weight:700;color:#5B1A5D">${leadScore}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0;color:#777"><strong>Crisis Score</strong></td>
                  <td style="padding:9px 0;font-size:20px;font-weight:700;color:${crisisFlag ? "#c00" : "#121212"}">${crisisScore}</td>
                </tr>
                <tr style="background:#f5f5f5">
                  <td style="padding:9px 8px;color:#777"><strong>Language</strong></td>
                  <td style="padding:9px 8px">${langLabel}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0;color:#777"><strong>Name</strong></td>
                  <td style="padding:9px 0">${name || "—"}</td>
                </tr>
                <tr style="background:#f5f5f5">
                  <td style="padding:9px 8px;color:#777"><strong>Email</strong></td>
                  <td style="padding:9px 8px">
                    ${email ? `<a href="mailto:${email}" style="color:#5B1A5D">${email}</a>` : "—"}
                  </td>
                </tr>
                <tr>
                  <td style="padding:9px 0;color:#777"><strong>Phone</strong></td>
                  <td style="padding:9px 0">${phone || "—"}</td>
                </tr>
                <tr style="background:#f5f5f5">
                  <td style="padding:9px 8px;color:#777"><strong>Country</strong></td>
                  <td style="padding:9px 8px">${country || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0;color:#777"><strong>Source</strong></td>
                  <td style="padding:9px 0">${source || "delphi"}</td>
                </tr>
                <tr style="background:#f5f5f5">
                  <td style="padding:9px 8px;color:#777"><strong>Timestamp</strong></td>
                  <td style="padding:9px 8px;font-size:11px;color:#888">${timestamp}</td>
                </tr>
              </table>

              <p style="color:#aaa;font-size:11px;margin-top:28px;text-align:right">
                Via smcc.solutions · Delphi Advisory Assistant
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      // Non-fatal — log but don't fail the endpoint
      console.error("[crm/lead] email notification failed:", emailErr);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[crm/lead]", err);
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
