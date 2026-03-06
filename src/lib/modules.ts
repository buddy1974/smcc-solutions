export interface Module {
  id: number;
  title: string;
}

export const PROGRAM_MODULES: Record<string, Module[]> = {
  cohort1: [
    { id: 1, title: "Biblical Foundations of Marriage" },
    { id: 2, title: "Communication & Conflict Resolution" },
    { id: 3, title: "Emotional Healing & Forgiveness" },
    { id: 4, title: "Rebuilding Trust After Betrayal" },
    { id: 5, title: "Spiritual Intimacy & Prayer" },
    { id: 6, title: "Practical Counseling Skills" },
    { id: 7, title: "Crisis Intervention & Safety" },
    { id: 8, title: "Certification Review & Assessment" },
  ],
  "7pillars": [
    { id: 1, title: "Pillar 1 — Identity in Christ" },
    { id: 2, title: "Pillar 2 — Covenant Commitment" },
    { id: 3, title: "Pillar 3 — Communication Mastery" },
    { id: 4, title: "Pillar 4 — Conflict & Forgiveness" },
    { id: 5, title: "Pillar 5 — Intimacy & Connection" },
    { id: 6, title: "Pillar 6 — Family & Purpose" },
    { id: 7, title: "Pillar 7 — Legacy & Leadership" },
  ],
};

/** Returns modules for the given program key (falls back to cohort1). */
export function getModules(programKey: string): Module[] {
  return PROGRAM_MODULES[programKey] ?? PROGRAM_MODULES.cohort1;
}

/** Returns total module count for the given program key. */
export function totalModules(programKey: string): number {
  return getModules(programKey).length;
}

/** Derive a stable program key from a program_name string. */
export function programKey(programName: string): string {
  const lc = programName.toLowerCase();
  if (lc.includes("7 pillar") || lc.includes("seven pillar")) return "7pillars";
  return "cohort1";
}
