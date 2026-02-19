"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/track";

export default function StickyBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl border-t border-white/10" style={{ backgroundColor: "#5B1A5D" }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-3">

        {/* Text — full on desktop, condensed on mobile */}
        <p className="text-sm text-white/80 leading-snug">
          <span className="font-bold text-white">Cohort I</span>
          <span className="hidden sm:inline"> &nbsp;&middot;&nbsp; 50,000 FCFA &nbsp;&middot;&nbsp; April 2026</span>
          <span className="inline sm:hidden text-white/60 text-xs"> &middot; April 2026</span>
        </p>

        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="/cohort-1"
            onClick={() => trackEvent("Apply_Click", { source: "sticky_bar" })}
            className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-5 py-2 rounded-lg text-sm transition-colors whitespace-nowrap"
            style={{ color: "#121212" }}
          >
            Apply Now
          </a>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="text-white/40 hover:text-white/80 transition-colors p-1 flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
