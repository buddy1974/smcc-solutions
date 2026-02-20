import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabase();

    const { data: leads } = await supabase
      .from("leads")
      .select("*")
      .eq("followup_sent", false)
      .limit(10);

    if (!leads || leads.length === 0) {
      return NextResponse.json({ message: "No new leads." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    for (const lead of leads) {
      let subject = "SMCC Follow-Up";
      let body = "Thank you for reaching out to SMCC.";

      if (lead.priority === "urgent") {
        subject = "Urgent Support from SMCC";
        body = "We noticed your message indicates urgency. A team member will reach out shortly.";
      }

      if (lead.followup_language === "fr") {
        body = "Merci d'avoir contacté SMCC. Nous vous répondrons bientôt.";
      }

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject,
        text: body,
      });

      await supabase
        .from("leads")
        .update({ followup_sent: true })
        .eq("id", lead.id);
    }

    return NextResponse.json({ message: "Follow-ups processed." });
  } catch (error) {
    return NextResponse.json({ error: "Automation failed." }, { status: 500 });
  }
}
