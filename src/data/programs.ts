// ─────────────────────────────────────────────────────────────────────────────
// SMCC Programs — Single source of truth for all program data, contacts,
// and investment figures. Update here; the UI pulls automatically.
// ─────────────────────────────────────────────────────────────────────────────

// ── CONTACT CONSTANTS ─────────────────────────────────────────────────────────
export const SMCC_WA_NUMBER = "237683493220";   // digits only — wa.me link

export const PILLARS_WA_NUMBER = "237683493220";

// ── INVESTMENT CONSTANTS ──────────────────────────────────────────────────────
export const COHORT_INVESTMENT_FCFA = 50_000;

export function formatFcfa(amount: number): string {
  return amount.toLocaleString("en-US") + " FCFA";
}

// ── TYPES ─────────────────────────────────────────────────────────────────────
export type CohortStatus = "enrolling" | "coming-soon" | "completed";

export interface CohortModule {
  title: string;
}

export interface CohortProgram {
  id: string;
  cohortNumber: number;
  /** Human-readable date label — update here for every cohort launch */
  date: string;
  tagline: string;
  heading: string;
  subheading: string;
  description: string[];
  modules: CohortModule[];
  structureNote: string;
  investmentFcfa: number;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  status: CohortStatus;
  /** Controls which side the image appears on desktop */
  imagePosition: "left" | "right";
}

export interface Pillar {
  number: number;
  title: string;
}

// ── FUTURE SECTION TYPES (scaffolded — ready for population) ─────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  cohortId: string;
  quote: string;
  avatar?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
  expertise: string[];
}

// ── COHORT DATA ───────────────────────────────────────────────────────────────
export const COHORTS: CohortProgram[] = [
  // ── COHORT 1 — ACTIVE ──────────────────────────────────────────────────────
  {
    id: "cohort-1",
    cohortNumber: 1,
    date: "April 2026",           // ← update this when date changes
    tagline: "SMCC Certification Program",
    heading: "Cohort 1 \u2014 April 2026",
    subheading: "Foundations for Faith-Based Family Restoration",
    description: [
      "Marriage is under pressure. Families are breaking. Homes are crying for help.",
      "The School of Marriage Counseling & Coaching (SMCC) exists to raise trained, spiritually grounded counselors who restore covenant \u2014 not just manage conflict.",
      "Cohort 1 establishes your foundation as a certified faith-based marriage counselor.",
    ],
    modules: [
      { title: "The Calling & Ethics of a Marriage Counselor" },
      { title: "God\u2019s Design for Marriage" },
      { title: "Premarital Counseling Framework" },
      { title: "Communication & Conflict Resolution" },
      { title: "Trauma & Emotional Healing Foundations" },
      { title: "Financial & Parenting Dynamics in Marriage" },
      { title: "Step-by-Step Restoration Process" },
    ],
    structureNote:
      "Cohorts 1\u20133 progress from Foundation \u2192 Intermediate \u2192 Advanced Certification.",
    investmentFcfa: COHORT_INVESTMENT_FCFA,
    image: "/img-1.jpg",
    imageAlt: "SMCC Cohort 1 April 2026",
    ctaLabel: "Enroll Now",
    status: "enrolling",
    imagePosition: "left",
  },

  // ── COHORT 2 — COMING SOON ─────────────────────────────────────────────────
  {
    id: "cohort-2",
    cohortNumber: 2,
    date: "TBD",                  // ← set when confirmed
    tagline: "SMCC Certification Program",
    heading: "Cohort 2",
    subheading: "Intermediate Practice & Supervised Case Work",
    description: [
      "Building on Cohort 1 foundations, Cohort 2 develops advanced counseling methodology, supervised case work, and deeper pastoral integration.",
    ],
    modules: [],                  // ← populate when curriculum is finalised
    structureNote:
      "Cohorts 1\u20133 progress from Foundation \u2192 Intermediate \u2192 Advanced Certification.",
    investmentFcfa: COHORT_INVESTMENT_FCFA,
    image: "/img-1.jpg",
    imageAlt: "SMCC Cohort 2",
    ctaLabel: "Join Waitlist",
    status: "coming-soon",
    imagePosition: "right",
  },

  // ── COHORT 3 — COMING SOON ─────────────────────────────────────────────────
  {
    id: "cohort-3",
    cohortNumber: 3,
    date: "TBD",                  // ← set when confirmed
    tagline: "SMCC Certification Program",
    heading: "Cohort 3",
    subheading: "Advanced Certification & Professional Practice",
    description: [
      "Cohort 3 completes the certification journey \u2014 practicum, supervised practice, and full professional credential.",
    ],
    modules: [],                  // ← populate when curriculum is finalised
    structureNote:
      "Cohorts 1\u20133 progress from Foundation \u2192 Intermediate \u2192 Advanced Certification.",
    investmentFcfa: COHORT_INVESTMENT_FCFA,
    image: "/img-1.jpg",
    imageAlt: "SMCC Cohort 3",
    ctaLabel: "Join Waitlist",
    status: "coming-soon",
    imagePosition: "left",
  },
];

// ── 7 PILLARS DATA ────────────────────────────────────────────────────────────
export const SEVEN_PILLARS: Pillar[] = [
  { number: 1, title: "Leadership, Career & Business Advancement" },
  { number: 2, title: "Relationship Intelligence" },
  { number: 3, title: "Financial Intelligence" },
  { number: 4, title: "Identity & Purpose" },
  { number: 5, title: "Communication Mastery" },
  { number: 6, title: "Personal Branding & Influence" },
  { number: 7, title: "Spiritual Intelligence" },
];

export const PILLARS_PROGRAM = {
  tagline: "Executive Leadership & Identity Intensive",
  heading: "The 7 Pillars of Elevation",
  subheading: "14-Week Holistic Transformation Experience",
  image: "/THE SEVEN PILLARS APV.png",
  imageAlt: "The 7 Pillars of Elevation Program",
  ctaLabel: "Start Your Elevation",
  includes: [
    "14 weeks structured coaching",
    "Weekly live sessions",
    "Strategic frameworks",
    "Private leadership community",
    "Implementation-focused transformation",
  ],
} as const;

// ── FUTURE DATA PLACEHOLDERS ──────────────────────────────────────────────────
/** Populate once testimonials are collected from cohort graduates */
export const TESTIMONIALS: Testimonial[] = [];

/** Populate when faculty profiles are ready */
export const FACULTY: FacultyMember[] = [];
