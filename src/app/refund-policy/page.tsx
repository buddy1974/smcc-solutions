import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy — SMCC",
  description: "SMCC refund policy for program enrollment and payment.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-4 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>
              Legal
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-plum mb-4 leading-tight">
              Refund Policy
            </h1>
            <p className="text-charcoal/60 text-sm">
              Last updated: February 2026
            </p>
            <div className="h-0.5 w-10 mt-6" style={{ backgroundColor: "#C9A227" }} />
          </div>

          {/* Intro */}
          <p className="text-charcoal/75 leading-relaxed mb-12 text-lg">
            SMCC is committed to delivering high-quality training and supporting every participant
            through their program journey. Please review this policy carefully before completing
            your enrollment payment.
          </p>

          {/* Sections */}
          <div className="space-y-10">

            {/* 1 */}
            <div className="border-t border-charcoal/10 pt-10">
              <h2 className="font-playfair text-2xl font-bold text-plum mb-5">
                1. Non-Refundable After Cohort Begins
              </h2>
              <p className="text-charcoal/75 leading-relaxed mb-4">
                Payments made for any SMCC cohort are <strong>non-refundable once the cohort has commenced</strong>.
                This applies regardless of the reason for withdrawal, including personal circumstances,
                scheduling conflicts, or changes in availability.
              </p>
              <p className="text-charcoal/75 leading-relaxed">
                The cohort commencement date is communicated to all enrolled participants during
                the admissions process. Please ensure you are able to commit to the full program
                before completing payment.
              </p>
            </div>

            {/* 2 */}
            <div className="border-t border-charcoal/10 pt-10">
              <h2 className="font-playfair text-2xl font-bold text-plum mb-5">
                2. Refund Requests Before the Start Date
              </h2>
              <p className="text-charcoal/75 leading-relaxed mb-4">
                Refund requests submitted <strong>before the cohort start date</strong> will be
                considered on a case-by-case basis, provided the request is made within{" "}
                <strong>7 calendar days of the date of payment</strong>.
              </p>
              <p className="text-charcoal/75 leading-relaxed">
                Requests made after this 7-day window but before the cohort begins are at the
                sole discretion of SMCC and are not guaranteed.
              </p>
            </div>

            {/* 3 */}
            <div className="border-t border-charcoal/10 pt-10">
              <h2 className="font-playfair text-2xl font-bold text-plum mb-5">
                3. Administrative Processing Fee
              </h2>
              <p className="text-charcoal/75 leading-relaxed">
                Approved refunds may be subject to an administrative processing fee to cover
                payment handling costs incurred at the time of enrollment. This fee will be
                communicated clearly before any refund is processed.
              </p>
            </div>

            {/* 4 */}
            <div className="border-t border-charcoal/10 pt-10">
              <h2 className="font-playfair text-2xl font-bold text-plum mb-5">
                4. Program Modifications
              </h2>
              <p className="text-charcoal/75 leading-relaxed">
                SMCC reserves the right to reschedule cohort dates, modify program content, or
                change facilitators. Such modifications do not automatically entitle participants
                to a refund. SMCC will make reasonable efforts to accommodate affected participants
                in an alternative cohort where possible.
              </p>
            </div>

            {/* 5 */}
            <div className="border-t border-charcoal/10 pt-10">
              <h2 className="font-playfair text-2xl font-bold text-plum mb-5">
                5. How to Submit a Refund Request
              </h2>
              <p className="text-charcoal/75 leading-relaxed mb-4">
                To submit a refund request, please contact us by email with the following information:
              </p>
              <div className="bg-blush/30 rounded-xl p-6 space-y-2 text-sm text-charcoal/75">
                <p>• Your full name</p>
                <p>• The email address used during application</p>
                <p>• Your payment reference or transaction date</p>
                <p>• The reason for your refund request</p>
              </div>
              <div className="mt-6 p-5 rounded-xl border border-plum/15 bg-plum/5">
                <p className="text-sm text-charcoal/70 mb-1 font-semibold">Contact for refund requests:</p>
                <a
                  href="mailto:info@smcc.solutions"
                  className="text-plum font-bold hover:text-gold transition-colors"
                >
                  info@smcc.solutions
                </a>
                <p className="text-xs text-charcoal/50 mt-2">
                  We aim to respond to all refund requests within 3 business days.
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
