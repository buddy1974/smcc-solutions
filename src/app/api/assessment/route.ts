/**
 * POST /api/assessment
 * Marriage Readiness Assessment scoring engine.
 *
 * Accepts: { answers: number[] }  — 5 values, each 1–5
 * Returns: { score, level, summary, recommendation }
 *
 * Scoring bands (max 25):
 *   5–12  → Foundational work needed
 *  13–18  → Structured coaching beneficial
 *  19–25  → Strong base, leadership growth focus
 */

import { NextRequest, NextResponse } from "next/server";

interface AssessmentResult {
  score: number;
  level: "foundational" | "developing" | "strong";
  summary: string;
  recommendation: string;
}

function buildResult(score: number): AssessmentResult {
  if (score <= 12) {
    return {
      score,
      level: "foundational",
      summary:
        "Your responses suggest that your relationship is navigating some meaningful challenges. There are foundational areas — communication, emotional regulation, and value alignment — that would benefit from structured, intentional work. This is not a verdict; it is a starting point.",
      recommendation:
        "SMCC Cohort I is designed for exactly this moment. The 12-week program gives you practical, faith-rooted tools to address the core areas that strengthen any marriage — and trains you to help others do the same.",
    };
  }

  if (score <= 18) {
    return {
      score,
      level: "developing",
      summary:
        "Your relationship has meaningful strengths, and there are specific areas where structured support could make a significant difference. You are doing many things right — the opportunity is in refining and deepening those foundations with a clear framework.",
      recommendation:
        "SMCC Cohort I will give you the structured methodology you need to move from good to strong. The curriculum directly addresses the growth areas where focused, faith-based coaching creates the most lasting impact.",
    };
  }

  return {
    score,
    level: "strong",
    summary:
      "Your relationship reflects a strong foundation in communication, shared values, and spiritual alignment. You are building something meaningful — and your experience and maturity place you in a position to help others do the same.",
    recommendation:
      "With this strong relational foundation, SMCC training will help you step into marriage leadership and mentorship. Your journey is an asset that can serve many couples. Cohort I is the structured credential that formalises that calling.",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const answers: unknown = body?.answers;

    if (!Array.isArray(answers) || answers.length !== 5) {
      return NextResponse.json(
        { error: "Please answer all 5 questions." },
        { status: 400 }
      );
    }

    const validated = answers.map((v) => {
      const n = Number(v);
      if (!Number.isInteger(n) || n < 1 || n > 5) return null;
      return n;
    });

    if (validated.some((v) => v === null)) {
      return NextResponse.json(
        { error: "Each answer must be a whole number between 1 and 5." },
        { status: 400 }
      );
    }

    const score = (validated as number[]).reduce((sum, v) => sum + v, 0);
    const result = buildResult(score);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[api/assessment]", err);
    return NextResponse.json(
      { error: "Could not process your assessment. Please try again." },
      { status: 500 }
    );
  }
}
