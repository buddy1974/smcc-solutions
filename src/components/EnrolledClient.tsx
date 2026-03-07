"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EnrolledClient() {
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    const ref = sessionStorage.getItem("smcc_enrollment_ref");
    if (ref) setReference(ref);
  }, []);

  if (!reference) return null;

  return (
    <div className="mt-8 p-5 rounded-xl border border-gray-200 bg-gray-50 text-center">
      <p className="text-sm text-charcoal/60 mb-1">Your enrollment reference</p>
      <p className="font-mono font-bold text-plum text-base mb-4">{reference}</p>
      <Link
        href={`/enrollment/${reference}`}
        className="inline-flex items-center gap-2 bg-plum text-white font-semibold px-6 py-3 rounded-lg hover:bg-plum/90 transition-colors text-sm"
      >
        View Enrollment Receipt &rarr;
      </Link>
    </div>
  );
}
