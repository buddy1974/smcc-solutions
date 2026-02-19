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
 * No Stripe. No /thank-you direct link. Payment required before enrollment confirmation.
 */

import { useState } from "react";

export default function ApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        setError(json.error ?? "Something went wrong. Please try WhatsApp.");
        setLoading(false);
        return;
      }

      if (!json.checkoutUrl) {
        setError("Payment URL not received. Please try WhatsApp.");
        setLoading(false);
        return;
      }

      // Redirect to PayUnit hosted payment page
      window.location.href = json.checkoutUrl;
    } catch {
      setError("Network error. Please try WhatsApp directly.");
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

      {/* Error message */}
      {error && (
        <div className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            {error}{" "}
            <a href="https://wa.me/237671652144" target="_blank" rel="noopener noreferrer"
              className="underline font-semibold">
              Contact us on WhatsApp
            </a>
          </span>
        </div>
      )}

      {/* Submit */}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-gold hover:bg-gold/90 disabled:opacity-60 disabled:cursor-not-allowed text-charcoal font-semibold px-12 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-3"
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
