/**
 * POST /api/submit
 * SMCC application submission handler.
 *
 * Flow:
 *   1. Receives JSON from ApplicationForm
 *   2. Sends structured email to nforgweimah@gmail.com via Gmail SMTP
 *   3. Triggers WhatsApp alert to +237 697 317 737 via CallMeBot
 *   4. Returns { success: true } → client redirects to /thank-you
 *
 * Required environment variables (Vercel → Settings → Environment Variables):
 *   GMAIL_USER           — nforgweimah@gmail.com
 *   GMAIL_APP_PASSWORD   — 16-char Gmail App Password
 *   WA_PHONE             — 237697317737  (digits only)
 *   WA_CALLMEBOT_KEY     — CallMeBot API key
 */

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      fullName,
      email,
      phone,
      program,
      location,
      occupation,
      referralSource,
      motivation,
    } = data;

    // ── 1. Email via Gmail SMTP ──────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"SMCC Admissions" <${process.env.GMAIL_USER}>`,
      to: "nforgweimah@gmail.com",
      subject: `📋 New Application — ${fullName} (${program || "SMCC"})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#121212">
          <div style="background:#5B1A5D;padding:24px 32px;border-radius:8px 8px 0 0">
            <h2 style="color:#C9A227;margin:0;font-size:20px">SMCC — New Application Received</h2>
          </div>
          <div style="background:#fafafa;padding:32px;border:1px solid #eee;border-radius:0 0 8px 8px">
            <table style="width:100%;border-collapse:collapse;font-size:15px">
              <tr>
                <td style="padding:10px 0;color:#777;width:160px"><strong>Full Name</strong></td>
                <td style="padding:10px 0">${fullName}</td>
              </tr>
              <tr style="background:#f5f5f5">
                <td style="padding:10px 8px;color:#777"><strong>Email</strong></td>
                <td style="padding:10px 8px">
                  <a href="mailto:${email}" style="color:#5B1A5D">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#777"><strong>Phone</strong></td>
                <td style="padding:10px 0">${phone}</td>
              </tr>
              <tr style="background:#f5f5f5">
                <td style="padding:10px 8px;color:#777"><strong>Program</strong></td>
                <td style="padding:10px 8px">${program || "—"}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#777"><strong>Location</strong></td>
                <td style="padding:10px 0">${location || "—"}</td>
              </tr>
              <tr style="background:#f5f5f5">
                <td style="padding:10px 8px;color:#777"><strong>Occupation</strong></td>
                <td style="padding:10px 8px">${occupation || "—"}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#777"><strong>Referral</strong></td>
                <td style="padding:10px 0">${referralSource || "—"}</td>
              </tr>
            </table>

            <h3 style="color:#5B1A5D;margin-top:28px;margin-bottom:8px">Message / Motivation</h3>
            <p style="background:#fff;padding:16px;border-left:4px solid #C9A227;border-radius:4px;margin:0;line-height:1.6">
              ${motivation || "Not provided"}
            </p>

            <p style="color:#aaa;font-size:11px;margin-top:32px;text-align:right">
              Submitted via smcc.solutions — manual payment follow-up required
            </p>
          </div>
        </div>
      `,
    });

    // ── 2. WhatsApp alert via CallMeBot ──────────────────────────────────────────
    const waKey  = process.env.WA_CALLMEBOT_KEY;
    const waPhone = process.env.WA_PHONE ?? "237697317737";

    if (waKey) {
      const message = encodeURIComponent(
        `📋 New SMCC Application!\n👤 ${fullName}\n📞 ${phone}\n✉️ ${email}\n📚 ${program || "N/A"}\n📍 ${location || "N/A"}`
      );
      await fetch(
        `https://api.callmebot.com/whatsapp.php?phone=${waPhone}&text=${message}&apikey=${waKey}`
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/submit]", err);
    return NextResponse.json(
      { success: false, error: "Submission failed — please try WhatsApp." },
      { status: 500 }
    );
  }
}
