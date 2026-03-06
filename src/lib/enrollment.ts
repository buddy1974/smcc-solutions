// ── Enrollment reference utilities ──────────────────────────────────────────
// Format: SMCC-YYYY-NNN  (e.g. SMCC-2026-001)

export const PROGRAMS: Record<string, { name: string; amount: number; payunitUrl: string }> = {
  cohort1: {
    name: "SMCC Certification Program — Cohort I",
    amount: 50000,
    payunitUrl: "https://lk.payunit.net/pay/22d2bb47-1c2f-44dd-94e2-b83550dd0d49",
  },
  "7pillars": {
    name: "The 7 Pillars of Elevation Program",
    amount: 150000,
    payunitUrl: "https://lk.payunit.net/pay/f4521947-6e69-4d64-bf4d-d2bda32cf6c4",
  },
};

export function buildReference(year: number, seq: number): string {
  return `SMCC-${year}-${String(seq).padStart(3, "0")}`;
}

/** Returns the QR code image URL for a given reference (no package needed). */
export function getQrUrl(reference: string): string {
  const data = encodeURIComponent(reference);
  return `https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=220x220&margin=12`;
}

/** Validates the SMCC-YYYY-NNN format. */
export function isValidReference(ref: string): boolean {
  return /^SMCC-\d{4}-\d{3,}$/.test(ref);
}
