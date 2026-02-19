/**
 * Kodee — Intelligent Enrollment Assistant: conversation logic.
 *
 * State machine: each step has a message and either options (branching)
 * or a recommendation (terminal). No AI required.
 *
 * Upgrade path: replace getStep() body with a Meta Cloud API / OpenAI call
 * without touching KodeeChat.tsx at all.
 */

export type KodeeOption = {
  label: string;
  next: string;
};

export type KodeeCTA = {
  label: string;
  href: string;
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
  welcome: {
    id: "welcome",
    message: "Welcome to SMCC. What are you looking for today?",
    options: [
      { label: "Marriage Counseling Training", next: "marriage_q1" },
      { label: "Leadership Development", next: "leadership_q1" },
      { label: "I'm Not Sure", next: "not_sure" },
    ],
  },

  marriage_q1: {
    id: "marriage_q1",
    message: "Are you currently married?",
    options: [
      { label: "Yes", next: "rec_cohort_strong" },
      { label: "No", next: "rec_cohort_general" },
    ],
  },

  leadership_q1: {
    id: "leadership_q1",
    message:
      "Are you currently leading others — in ministry, business, or your community?",
    options: [
      { label: "Yes", next: "rec_pillars" },
      { label: "No", next: "rec_assessment" },
    ],
  },

  not_sure: {
    id: "not_sure",
    message:
      "No problem. Are you more drawn to helping couples, or developing your own leadership?",
    options: [
      { label: "Helping couples", next: "rec_cohort_general" },
      { label: "Leadership growth", next: "rec_assessment" },
    ],
  },

  rec_cohort_strong: {
    id: "rec_cohort_strong",
    message:
      "Cohort I is ideal for you. You will gain faith-based frameworks, practical counseling tools, and the credential to serve couples with confidence.",
    recommendation: {
      ctas: [
        { label: "Apply to Cohort I", href: "/cohort-1" },
        { label: "Take the Assessment", href: "/assessment" },
      ],
    },
  },

  rec_cohort_general: {
    id: "rec_cohort_general",
    message:
      "Cohort I is the right starting point. It equips you to counsel couples — and prepares you for future marriage and ministry leadership.",
    recommendation: {
      ctas: [
        { label: "Apply to Cohort I", href: "/cohort-1" },
        { label: "Take the Assessment", href: "/assessment" },
      ],
    },
  },

  rec_pillars: {
    id: "rec_pillars",
    message:
      "The 7 Pillars of Elevation is built for you. It will deepen your authority and give you the framework to lead others at a higher level.",
    recommendation: {
      ctas: [
        { label: "Apply to Cohort I", href: "/cohort-1" },
        { label: "Request Information", href: "/#contact" },
      ],
    },
  },

  rec_assessment: {
    id: "rec_assessment",
    message:
      "Take the free Marriage Readiness Assessment to discover your best starting point. It takes under 2 minutes.",
    recommendation: {
      ctas: [
        { label: "Take the Assessment", href: "/assessment" },
        { label: "Request Information", href: "/#contact" },
      ],
    },
  },
};

export function getStep(id: string): KodeeStep {
  return steps[id] ?? steps.welcome;
}
