/**
 * POST /api/delphi/chat
 * Server-side GPT proxy for Delphi free-text replies.
 *
 * Accepts:
 *   {
 *     messages:   { role:"user"|"assistant", content:string }[],
 *     lang?:      "en" | "fr",
 *     sessionId?: string,   — client-generated UUID per chat session
 *     leadScore?: number,
 *   }
 *
 * Side effects (all non-fatal):
 *   - Server-side crisis scoring on the last user message
 *   - Inserts user + assistant messages into chat_messages
 *   - Upserts chat_sessions (crisis_score, escalated flag)
 *   - Creates a lead record when crisisScore >= 6
 *
 * Returns: { reply: string | null }
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabase } from "@/lib/supabase";

// ── System prompts ────────────────────────────────────────────────────────────
const SYSTEM: Record<"en" | "fr", string> = {
  en: `You are Delphi, a warm and professional enrollment guide for SMCC (School of Marriage Counseling & Coaching).
SMCC offers a 12-week faith-based marriage counseling and coaching intensive starting April 2026. Investment: 50,000 FCFA.
Your role: listen to the visitor's situation, respond with empathy, and guide them toward enrollment or a private advisory session.
Keep replies concise (2–4 lines). Be warm, direct, and professional. Never make medical or legal claims.
If the situation sounds urgent or deeply personal, recommend scheduling a private advisory session.`,

  fr: `Vous êtes Delphi, guide d'inscription chaleureux(se) et professionnel(le) pour l'SMCC (École de Conseil et Coaching Conjugal).
L'SMCC propose une formation intensive de 12 semaines axée sur la foi, débutant en avril 2026. Investissement : 50 000 FCFA.
Votre rôle : écouter la situation du visiteur, répondre avec empathie et le guider vers l'inscription ou une session privée.
Répondez toujours en français. Soyez concis(e) (2 à 4 lignes), chaleureux(se) et professionnel(le). Ne faites jamais de déclarations médicales ou juridiques.
Si la situation semble urgente ou profondément personnelle, recommandez de planifier une session de conseil privée.`,
};

// ── Server-side crisis scoring (0–10) ────────────────────────────────────────
function calculateCrisisScore(message: string): number {
  const crisisKeywords = [
    "divorce",
    "separation",
    "abuse",
    "cheating",
    "violence",
    "depression",
    "suicide",
    "hopeless",
    "broken",
  ];

  let score = 0;

  crisisKeywords.forEach((word) => {
    if (message.toLowerCase().includes(word)) {
      score += 2;
    }
  });

  return Math.min(score, 10);
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      messages:   { role: "user" | "assistant"; content: string }[];
      lang?:      string;
      sessionId?: string;
      leadScore?: number;
    };

    const {
      messages,
      lang      = "en",
      sessionId,
    } = body;

    const resolvedLang = (lang === "fr" ? "fr" : "en") as "en" | "fr";

    // ── GPT reply (logic unchanged) ──────────────────────────────────────────
    if (!process.env.OPENAI_API_KEY) {
      console.warn("[delphi/chat] OPENAI_API_KEY not set");
      return NextResponse.json({ reply: null }, { status: 503 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.responses.create({
      model:        "gpt-4o-mini",
      instructions: SYSTEM[resolvedLang],
      input:        messages,
    });

    const reply = response.output_text ?? null;

    // ── Supabase persistence (all non-fatal) ─────────────────────────────────
    if (sessionId && reply) {
      const db          = getSupabase();
      const lastMsg     = messages[messages.length - 1];
      const userMessage = lastMsg?.role === "user" ? (lastMsg.content ?? "") : "";
      const crisisScore = calculateCrisisScore(userMessage);

      // 1. Save chat messages
      if (userMessage) {
        db.from("chat_messages").insert([
          { session_id: sessionId, role: "user",      message: userMessage },
          { session_id: sessionId, role: "assistant", message: reply },
        ]).then(({ error }) => {
          if (error) console.error("[delphi/chat] messages insert:", error);
        });
      }

      // 2. Save / update chat session
      db.from("chat_sessions").upsert({
        session_id:   sessionId,
        language:     resolvedLang,
        crisis_score: crisisScore,
        escalated:    crisisScore >= 8,
      }, { onConflict: "session_id" }).then(({ error }) => {
        if (error) console.error("[delphi/chat] session upsert:", error);
      });

      // 3. Create lead record when crisis threshold is met
      if (crisisScore >= 6) {
        const priority = crisisScore >= 8 ? "urgent" : "normal";

        db.from("leads").insert({
          full_name:            "Chat Lead",
          email:                null,
          phone:                null,
          language:             resolvedLang,
          interest_type:        "crisis",
          crisis_score:         crisisScore,
          source:               "chatbot",
          priority,
          followup_language:    resolvedLang,
          flagged_for_whatsapp: crisisScore >= 8,
        }).then(({ error }) => {
          if (error) console.error("[delphi/chat] lead insert:", error);
        });
      }
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[delphi/chat]", err);
    return NextResponse.json({ reply: null }, { status: 500 });
  }
}
