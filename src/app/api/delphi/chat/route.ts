/**
 * POST /api/delphi/chat
 * Server-side GPT proxy for Delphi free-text replies.
 *
 * Accepts: { messages: {role:"user"|"assistant", content:string}[], lang:"en"|"fr" }
 * Returns: { reply: string | null }
 *
 * Required env var: OPENAI_API_KEY
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Client is lazy-instantiated inside the handler so the module
// can be imported at build time without a key present.

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      messages: { role: "user" | "assistant"; content: string }[];
      lang?: string;
    };

    const { messages, lang = "en" } = body;
    const resolvedLang = (lang === "fr" ? "fr" : "en") as "en" | "fr";

    if (!process.env.OPENAI_API_KEY) {
      console.warn("[delphi/chat] OPENAI_API_KEY not set");
      return NextResponse.json({ reply: null }, { status: 503 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      instructions: SYSTEM[resolvedLang],
      input: messages,
    });

    const reply = response.output_text ?? null;
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[delphi/chat]", err);
    return NextResponse.json({ reply: null }, { status: 500 });
  }
}
