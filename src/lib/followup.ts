import nodemailer from "nodemailer";
import { getSupabase } from "@/lib/supabase";

export async function processLeadFollowup(lead: Record<string, unknown>) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  let subject = "SMCC Follow-Up";
  let body = "Thank you for reaching out to SMCC.";

  if (lead.priority === "urgent") {
    subject = "Urgent Support from SMCC";
    body =
      "We noticed your message indicates urgency. A team member will reach out shortly.";
  }

  if (lead.followup_language === "fr") {
    body =
      "Merci d'avoir contacté SMCC. Nous vous répondrons bientôt.";
  }

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject,
    text: body,
  });

  await getSupabase()
    .from("leads")
    .update({ followup_sent: true })
    .eq("id", lead.id);
}
