"use client";

/**
 * ApplicationForm — SMCC application form.
 *
 * Flow:
 *   1. User fills form and submits
 *   2. Prevent default → POST JSON to /api/payunit/initiate
 *   3. Receive { checkoutUrl } → window.location.href = checkoutUrl
 *   4. User completes payment on PayUnit hosted page
 *   5. PayUnit redirects to /enrolled (return_url)
 *
 * On PayUnit failure: manual payment block is revealed with MTN/Orange USSD codes.
 * Form data is preserved — user is never left at a dead end.
 */

import { useState } from "react";

// ── Manual Payment Block ─────────────────────────────────────────────────────
// Shared between ApplicationForm (on error) and cohort-1 page (always visible).
// EXACT codes as specified — do not edit without confirming with admissions.
export const MANUAL_PAYMENT_CODES = {
  mtn: {
    name: "MTN MoMo",
    holder: "Delphine Nforgwei",
    ussd: "*126*4*926667*AMOUNT#",
  },
  orange: {
    name: "Orange Money",
    holder: "Mah epse Nforgwei",
    ussd: "#150*47*890422*AMOUNT#",
  },
  afterPayment: "After payment, send your name + proof of payment via WhatsApp: wa.me/237683493220",
};

export function ManualPaymentBlock({ className = "" }: { className?: string }) {
  const [copiedMtn, setCopiedMtn] = useState(false);
  const [copiedOrange, setCopiedOrange] = useState(false);

  function copy(text: string, which: "mtn" | "orange") {
    navigator.clipboard.writeText(text).then(() => {
      if (which === "mtn") {
        setCopiedMtn(true);
        setTimeout(() => setCopiedMtn(false), 2000);
      } else {
        setCopiedOrange(true);
        setTimeout(() => setCopiedOrange(false), 2000);
      }
    });
  }

  return (
    <div className={`rounded-xl border border-gold/40 bg-gold/5 p-6 ${className}`}>
      <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-4">
        Manual Payment Option
      </p>

      <div className="space-y-4 mb-5">
        {/* MTN MoMo */}
        <div className="bg-white rounded-lg border border-charcoal/10 p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-charcoal text-sm">{MANUAL_PAYMENT_CODES.mtn.name}</span>
            <button
              type="button"
              onClick={() => copy(MANUAL_PAYMENT_CODES.mtn.ussd, "mtn")}
              className="text-xs text-plum font-semibold hover:text-gold transition-colors px-2 py-1 rounded hover:bg-plum/5"
            >
              {copiedMtn ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-charcoal/50 mb-2">{MANUAL_PAYMENT_CODES.mtn.holder}</p>
          <code className="block text-sm font-mono font-bold text-plum bg-blush/50 rounded px-3 py-2 select-all">
            {MANUAL_PAYMENT_CODES.mtn.ussd}
          </code>
        </div>

        {/* Orange Money */}
        <div className="bg-white rounded-lg border border-charcoal/10 p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-charcoal text-sm">{MANUAL_PAYMENT_CODES.orange.name}</span>
            <button
              type="button"
              onClick={() => copy(MANUAL_PAYMENT_CODES.orange.ussd, "orange")}
              className="text-xs text-plum font-semibold hover:text-gold transition-colors px-2 py-1 rounded hover:bg-plum/5"
            >
              {copiedOrange ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-charcoal/50 mb-2">{MANUAL_PAYMENT_CODES.orange.holder}</p>
          <code className="block text-sm font-mono font-bold text-plum bg-blush/50 rounded px-3 py-2 select-all">
            {MANUAL_PAYMENT_CODES.orange.ussd}
          </code>
        </div>
      </div>

      <p className="text-xs text-charcoal/70 leading-relaxed border-t border-charcoal/10 pt-4">
        <span className="font-semibold">Replace AMOUNT with 50000.</span>{" "}
        {MANUAL_PAYMENT_CODES.afterPayment}
      </p>
    </div>
  );
}

// ── Main Form ────────────────────────────────────────────────────────────────

export default function ApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showManualPayment, setShowManualPayment] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/payunit/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.error ?? "Payment gateway is being activated. Use the manual payment option below.");
        setShowManualPayment(true);
        setLoading(false);
        return;
      }

      if (!json.checkoutUrl) {
        setError("Payment gateway is being activated. Use the manual payment option below.");
        setShowManualPayment(true);
        setLoading(false);
        return;
      }

      // Redirect to PayUnit hosted payment page
      window.location.href = json.checkoutUrl;
    } catch {
      setError("Payment gateway is being activated. Use the manual payment option below.");
      setShowManualPayment(true);
      setLoading(false);
    }
  }

  const fieldClass =
    "w-full border border-charcoal/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-plum/40 transition bg-white";

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-charcoal font-semibold mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input type="text" id="fullName" name="fullName" required
          className={fieldClass} placeholder="Enter your full name" />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-charcoal font-semibold mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input type="email" id="email" name="email" required
          className={fieldClass} placeholder="your.email@example.com" />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-charcoal font-semibold mb-2">
          WhatsApp / Phone Number <span className="text-red-500">*</span>
        </label>
        <input type="tel" id="phone" name="phone" required
          className={fieldClass} placeholder="+237..." />
      </div>

      {/* Program */}
      <div>
        <label htmlFor="program" className="block text-charcoal font-semibold mb-2">
          Program <span className="text-red-500">*</span>
        </label>
        <select id="program" name="program" required className={fieldClass}>
          <option value="">Select a program</option>
          <option value="SMCC Cohort I — Foundations for Faith-Based Family Restoration">
            SMCC Cohort I — Foundations (April 2026)
          </option>
          <option value="The 7 Pillars of Elevation — 14-Week Leadership Intensive">
            The 7 Pillars of Elevation — Leadership Intensive
          </option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-charcoal font-semibold mb-2">
          City / Country
        </label>
        <input type="text" id="location" name="location"
          className={fieldClass} placeholder="e.g., Yaoundé, Cameroon" />
      </div>

      {/* Occupation */}
      <div>
        <label htmlFor="occupation" className="block text-charcoal font-semibold mb-2">
          Occupation
        </label>
        <input type="text" id="occupation" name="occupation"
          className={fieldClass} placeholder="e.g., Pastor, Counselor, Teacher" />
      </div>

      {/* Referral */}
      <div>
        <label htmlFor="referralSource" className="block text-charcoal font-semibold mb-2">
          How did you hear about SMCC?
        </label>
        <select id="referralSource" name="referralSource" className={fieldClass}>
          <option value="">Select an option</option>
          <option value="church">Church</option>
          <option value="social-media">Social Media</option>
          <option value="friend">Friend / Referral</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Motivation / Message */}
      <div>
        <label htmlFor="motivation" className="block text-charcoal font-semibold mb-2">
          Why do you want to join this program?
        </label>
        <textarea id="motivation" name="motivation" rows={5}
          className={`${fieldClass} resize-none`}
          placeholder="Share your motivation and goals..." />
      </div>

      {/* Tuition acknowledgment */}
      <div className="flex items-start gap-3 p-4 bg-blush/50 rounded-lg border border-plum/10">
        <input type="checkbox" id="tuitionAck" name="tuitionAck" required
          className="mt-1 w-5 h-5 accent-plum flex-shrink-0" />
        <label htmlFor="tuitionAck" className="text-charcoal/80 text-sm leading-relaxed">
          I understand the program investment is <strong>50,000 FCFA</strong> and I am ready
          to complete payment to confirm my enrollment in Cohort I.
        </label>
      </div>

      {/* Investment notice */}
      <div className="flex items-center justify-between bg-plum/5 border border-plum/15 rounded-lg px-5 py-3">
        <span className="text-charcoal/70 text-sm font-medium">Program Investment</span>
        <span className="text-plum font-bold text-lg">50,000 FCFA <span className="text-xs font-normal text-charcoal/50">per cohort</span></span>
      </div>

      <hr className="border-charcoal/10" />

      {/* Error message — improved UX: no dead end, no WhatsApp wording */}
      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-bold text-amber-900 mb-1">Payment gateway is being activated</p>
          <p className="text-amber-800 text-sm leading-relaxed">
            You can complete your enrollment using the manual payment option below
            while PayUnit activation is finalized.
          </p>
        </div>
      )}

      {/* Manual payment block — revealed on error */}
      {showManualPayment && (
        <ManualPaymentBlock />
      )}

      {/* Submit */}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-gold hover:bg-gold/90 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 text-charcoal font-semibold px-12 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-3 w-full sm:w-auto justify-center"
        >
          {loading && (
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? "Preparing Payment…" : "Proceed to Payment"}
        </button>
        <p className="text-sm text-charcoal/50 mt-4">
          You will be redirected to a secure payment page to complete your enrollment.
        </p>
      </div>

    </form>
  );
}
