"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { PROGRAMS } from "@/lib/enrollment";

interface Props {
  programKey: string;
  source?: string | null;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}

export default function EnrollButton({ programKey, source, className, style, children }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    const program = PROGRAMS[programKey];
    if (!program) return;

    setLoading(true);
    try {
      const res = await fetch("/api/enrollment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program: programKey, source: source ?? null }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reference) {
          sessionStorage.setItem("smcc_enrollment_ref", data.reference);
        }
      }
    } catch {
      // Non-blocking — proceed to payment regardless
    }

    window.open(program.payunitUrl, "_blank", "noopener,noreferrer");
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={className}
      style={style}
    >
      {loading ? "Preparing\u2026" : children}
    </button>
  );
}
