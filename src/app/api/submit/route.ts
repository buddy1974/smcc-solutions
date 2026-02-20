/**
 * POST /api/submit
 * SMCC application submission handler.
 *
 * Flow:
 *   1. Receives JSON from ApplicationForm (or any form caller)
 *   2. Sends admin notification email to nforgweimah@gmail.com via Gmail SMTP
 *   3. Sends confirmation email to the applicant
 *   4. Triggers WhatsApp alert to admissions via CallMeBot
 *   5. Returns { success: true }
 *
 * Required environment variables (Vercel → Settings → Environment Variables):
 *   GMAIL_USER           — nforgweimah@gmail.com
 *   GMAIL_APP_PASSWORD   — 16-char Gmail App Password
 *   WA_PHONE             — 237697317737  (digits only)
 *   WA_CALLMEBOT_KEY     — CallMeBot API key
 */

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSupabase } from "@/lib/supabase";

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

    const userAgent = req.headers.get("user-agent") ?? "Unknown";

    // ── Applicant Scoring ─────────────────────────────────────────────────────
    const name = fullName;
    const reason = motivation ?? "";
    const leadershipExperience = occupation ?? "";

    let score = 0;
    if (reason && reason.length > 150) score += 5;
    if (leadershipExperience) score += 5;
    if (program === "Advanced Track") score += 5;

    let level = "Foundational";
    if (score >= 10) level = "Leadership Track";
    if (score >= 15) level = "Advanced Candidate";

    console.log({
      name,
      email,
      program,
      score,
      level,
      timestamp: new Date().toISOString(),
    });

    // Track application submission event (non-fatal)
    getSupabase().from("events").insert([{
      event: "application_submitted",
      meta:  { program: program ?? "N/A", score, level },
    }]).then(({ error }) => {
      if (error) console.error("[submit] event insert error:", error);
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // ── 1. Admin notification email ───────────────────────────────────────────
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
              <tr style="background:#f5f5f5">
                <td style="padding:10px 8px;color:#777"><strong>User Agent</strong></td>
                <td style="padding:10px 8px;font-size:11px;color:#888;word-break:break-all">${userAgent}</td>
              </tr>
            </table>

            <div style="margin-top:24px;padding:16px 20px;background:#F6E8F0;border-radius:8px;border-left:4px solid #5B1A5D">
              <p style="font-size:12px;font-weight:700;color:#5B1A5D;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px">Applicant Score</p>
              <p style="font-size:22px;font-weight:700;color:#5B1A5D;margin:0 0 4px">${score} / 15</p>
              <p style="font-size:13px;color:#777;margin:0">Level: <strong style="color:#121212">${level}</strong></p>
            </div>

            <h3 style="color:#5B1A5D;margin-top:28px;margin-bottom:8px">Message / Motivation</h3>
            <p style="background:#fff;padding:16px;border-left:4px solid #C9A227;border-radius:4px;margin:0;line-height:1.6">
              ${motivation || "Not provided"}
            </p>

            <p style="color:#aaa;font-size:11px;margin-top:32px;text-align:right">
              Submitted via smcc.solutions
            </p>
          </div>
        </div>
      `,
    });

    // ── 2. Confirmation email to applicant ────────────────────────────────────
    if (email) {
      await transporter.sendMail({
        from: `"SMCC Admissions" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Your SMCC Application Has Been Received",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#121212">

            <!-- Header -->
            <div style="background:#5B1A5D;padding:28px 32px;border-radius:8px 8px 0 0;text-align:center">
              <h1 style="color:#C9A227;margin:0;font-size:22px;font-weight:700;letter-spacing:0.02em">
                SMCC
              </h1>
              <p style="color:rgba(246,232,240,0.8);margin:6px 0 0;font-size:13px;letter-spacing:0.04em">
                SCHOOL OF MARRIAGE COUNSELING &amp; COACHING
              </p>
            </div>

            <!-- Body -->
            <div style="background:#ffffff;padding:36px 32px;border:1px solid #eee;border-top:none">
              <p style="font-size:17px;font-weight:600;color:#5B1A5D;margin:0 0 6px">
                Dear ${fullName},
              </p>
              <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 24px">
                Thank you for applying to the <strong>School of Marriage Counseling &amp; Coaching (SMCC)</strong>.
                Your application has been received and our admissions team will review it carefully.
              </p>

              <!-- Application summary -->
              <div style="background:#F6E8F0;border-radius:8px;padding:20px 24px;margin:0 0 28px">
                <p style="font-size:13px;font-weight:700;color:#5B1A5D;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px">
                  Application Summary
                </p>
                <table style="width:100%;font-size:14px;border-collapse:collapse">
                  <tr>
                    <td style="color:#777;padding:5px 0;width:130px">Program</td>
                    <td style="color:#121212;font-weight:600">${program || "SMCC Cohort I"}</td>
                  </tr>
                  <tr>
                    <td style="color:#777;padding:5px 0">Investment</td>
                    <td style="color:#121212;font-weight:600">50,000 FCFA</td>
                  </tr>
                  <tr>
                    <td style="color:#777;padding:5px 0">Cohort Start</td>
                    <td style="color:#121212;font-weight:600">April 2026</td>
                  </tr>
                </table>
              </div>

              <!-- Payment options -->
              <h3 style="color:#5B1A5D;font-size:16px;margin:0 0 12px">Payment Options</h3>
              <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 16px">
                Once your application is confirmed, you may complete payment using one of the following methods:
              </p>
              <table style="width:100%;border-collapse:collapse;font-size:13px;margin:0 0 8px">
                <tr style="background:#fafafa">
                  <td style="padding:10px 12px;border:1px solid #eee;font-weight:600;color:#5B1A5D">MTN MoMo</td>
                  <td style="padding:10px 12px;border:1px solid #eee;font-family:monospace;color:#121212">*126*4*926667*50000#</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px;border:1px solid #eee;font-weight:600;color:#5B1A5D">Orange Money</td>
                  <td style="padding:10px 12px;border:1px solid #eee;font-family:monospace;color:#121212">#150*47*890422*50000#</td>
                </tr>
              </table>
              <p style="font-size:12px;color:#888;line-height:1.6;margin:8px 0 28px">
                After payment, send your name and proof of payment to:
                <strong style="color:#121212">+237 681 255 891</strong> or
                <strong style="color:#121212">+237 671 652 744</strong>
              </p>

              <!-- Next steps -->
              <h3 style="color:#5B1A5D;font-size:16px;margin:0 0 12px">Next Steps</h3>
              <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 28px">
                Our admissions team will contact you within <strong>24&ndash;48 hours</strong> to
                confirm your enrollment and provide further instructions. Please check your inbox,
                including your spam or promotions folder.
              </p>

              <!-- Contact -->
              <div style="border-top:1px solid #eee;padding-top:24px;margin-top:4px">
                <p style="font-size:14px;color:#555;margin:0 0 6px">
                  Questions? Reach us at:
                </p>
                <p style="font-size:14px;margin:0">
                  <a href="mailto:nforgweimah@gmail.com" style="color:#5B1A5D;font-weight:600">
                    nforgweimah@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background:#F6E8F0;padding:20px 32px;border-radius:0 0 8px 8px;text-align:center;border:1px solid #eee;border-top:none">
              <p style="font-size:12px;color:#888;margin:0">
                &copy; 2026 SMCC &mdash; School of Marriage Counseling &amp; Coaching, Yaound&eacute;, Cameroon
              </p>
            </div>

          </div>
        `,
      });
    }

    // ── 3. WhatsApp alert to admissions via CallMeBot ─────────────────────────
    const waKey   = process.env.WA_CALLMEBOT_KEY;
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
      { success: false, error: "Submission failed — please contact admissions directly." },
      { status: 500 }
    );
  }
}
