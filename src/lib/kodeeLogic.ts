/**
 * Delphi — SMCC Intelligent Advisory Assistant: conversation logic.
 *
 * Pure state machine. No AI required.
 * Upgrade path: replace getStep() with Meta Cloud API / OpenAI call.
 * KodeeChat.tsx stays unchanged when you swap the logic engine here.
 */

export const GOOGLE_CALENDAR_URL = "https://calendar.app.google/NpGp4ddC5vYJKm9j6";

export type KodeeOption = {
  label: string;
  next: string;
};

export type KodeeCTA = {
  label: string;
  href: string;
  external?: boolean; // opens in new tab via window.open
};

export type KodeeStep = {
  id: string;
  message: string;
  options?: KodeeOption[];
  recommendation?: {
    ctas: KodeeCTA[];
  };
};

const steps: Record<string, KodeeStep> = {

  // ── Entry ──────────────────────────────────────────────────────────────────
  welcome: {
    id: "welcome",
    message:
      "Hello — I'm Delphi, your SMCC advisory assistant.\n\nI can help you:\n• Understand the program\n• Assess if this cohort fits your situation\n• Guide you toward the right next step\n• Connect you with a human advisor if needed\n\nHow can I assist you today?",
    options: [
      { label: "Assess My Situation", next: "assess_situation" },
      { label: "Learn About the Program", next: "learn_program" },
      { label: "Speak to a Human Advisor", next: "human_escalation" },
    ],
  },

  // ── Assessment flow ────────────────────────────────────────────────────────
  assess_situation: {
    id: "assess_situation",
    message:
      "Are you currently:\n\nA) Preparing for marriage\nB) Experiencing conflict in marriage\nC) Recovering from separation\nD) Seeking leadership growth",
    options: [
      { label: "A — Preparing for marriage", next: "assess_a" },
      { label: "B — Experiencing conflict", next: "assess_b" },
      { label: "C — Recovering from separation", next: "assess_c" },
      { label: "D — Seeking leadership growth", next: "assess_d" },
    ],
  },

  assess_a: {
    id: "assess_a",
    message:
      "Excellent timing. The strongest marriages are built before conflict sets in.\n\nSMCC Cohort I equips you with premarital frameworks, communication foundations, and spiritual alignment tools — so your marriage begins on solid ground.\n\nCohort I begins April 2026.",
    recommendation: {
      ctas: [
        { label: "Apply to Cohort I", href: "/cohort-1" },
        { label: "Take the Assessment", href: "/assessment" },
      ],
    },
  },

  assess_b: {
    id: "assess_b",
    message:
      "Thank you for sharing that.\n\nSMCC's Cohort I focuses strongly on:\n• Conflict resolution frameworks\n• Emotional pattern identification\n• Spiritual leadership alignment\n\nSMCC integrates faith-based insight with practical relational tools — so you receive both the wisdom and the method.",
    recommendation: {
      ctas: [
        { label: "Apply for Cohort I", href: "/cohort-1" },
        { label: "Schedule a Private Session", href: GOOGLE_CALENDAR_URL, external: true },
        { label: "Learn More About Curriculum", href: "/cohort-1#modules" },
      ],
    },
  },

  assess_c: {
    id: "assess_c",
    message:
      "Recovery requires both emotional care and structured guidance.\n\nSMCC's restoration framework has helped participants navigate separation, rebuild trust, and re-establish covenant foundations. You are not alone in this process.\n\nA private advisory session is the most appropriate first step.",
    recommendation: {
      ctas: [
        { label: "Schedule a Private Session", href: GOOGLE_CALENDAR_URL, external: true },
        { label: "Apply to Cohort I", href: "/cohort-1" },
      ],
    },
  },

  assess_d: {
    id: "assess_d",
    message:
      "Leadership development is at the core of SMCC's mission.\n\nCohort I trains you to counsel, guide, and lead others — through proven biblical frameworks, structured methodology, and professional certification. Our participants lead ministries, organisations, and communities across 5+ countries.",
    recommendation: {
      ctas: [
        { label: "Apply to Cohort I", href: "/cohort-1" },
        { label: "Take the Assessment", href: "/assessment" },
      ],
    },
  },

  // ── Program overview ───────────────────────────────────────────────────────
  learn_program: {
    id: "learn_program",
    message:
      "SMCC Cohort I is a 12-week faith-based marriage counseling and coaching intensive.\n\nYou will learn:\n• Biblical foundations of covenant and family\n• Conflict resolution and communication repair\n• Trauma-informed care and restoration\n• Premarital and crisis counseling frameworks\n\nCohort I begins April 2026. Investment: 50,000 FCFA.",
    recommendation: {
      ctas: [
        { label: "Apply to Cohort I", href: "/cohort-1" },
        { label: "Take the Assessment", href: "/assessment" },
      ],
    },
  },

  // ── Escalation paths ───────────────────────────────────────────────────────
  human_escalation: {
    id: "human_escalation",
    message:
      "I'd be happy to connect you with a human advisor.\n\nYou can schedule a private advisory session at a time that works best for you below.",
  },

  urgency_escalation: {
    id: "urgency_escalation",
    message:
      "It sounds like this may require personal guidance.\n\nI recommend scheduling a private advisory session so we can better understand your situation.",
  },

};

// ── Keyword detection ──────────────────────────────────────────────────────

export const URGENCY_KEYWORDS = [
  "urgent",
  "divorce",
  "crisis",
  "separated",
];

export const ESCALATION_KEYWORDS = [
  "talk to someone",
  "human",
  "call me",
  "advisor",
  "speak to delphine",
];

export function isUrgencyTrigger(text: string): boolean {
  const lower = text.toLowerCase();
  return URGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

export function isEscalationTrigger(text: string): boolean {
  const lower = text.toLowerCase();
  return ESCALATION_KEYWORDS.some((kw) => lower.includes(kw));
}

export function getStep(id: string): KodeeStep {
  return steps[id] ?? steps.welcome;
}
