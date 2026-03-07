import { getSupabase } from "@/lib/supabase";
import { getQrUrl, isValidReference } from "@/lib/enrollment";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Enrollment Receipt | SMCC",
  robots: "noindex",
};

type PageProps = { params: { reference: string } };

export default async function EnrollmentReceiptPage({ params }: PageProps) {
  const { reference } = params;
  if (!isValidReference(reference)) notFound();

  const supabase = getSupabase();
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("reference, program_name, amount, status, created_at")
    .eq("reference", reference)
    .single();

  if (!enrollment) notFound();

  const qrUrl = getQrUrl(reference);
  const date = new Date(enrollment.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-lg mx-auto" id="enrollment-receipt">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="font-playfair text-3xl font-bold text-plum mb-2">Enrollment Receipt</h1>
            <p className="text-charcoal/60 text-sm">School of Marriage Counseling &amp; Coaching</p>
          </div>

          {/* Receipt card */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

            {/* Details */}
            <div className="p-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-1">Program</p>
                <p className="font-semibold text-charcoal text-base">{enrollment.program_name}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-1">Reference</p>
                  <p className="font-mono font-bold text-plum text-sm">{reference}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-1">Date</p>
                  <p className="font-semibold text-charcoal text-sm">{date}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-1">Amount</p>
                  <p className="font-semibold text-charcoal text-sm">
                    {enrollment.amount.toLocaleString()} XAF
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-1">Status</p>
                  <span
                    className={`inline-block text-xs font-bold px-2 py-1 rounded-full ${
                      enrollment.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {enrollment.status === "confirmed" ? "Confirmed" : "Pending Confirmation"}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="border-t border-gray-100 p-8 flex flex-col items-center gap-4 bg-gray-50">
              <p className="text-xs uppercase tracking-widest text-charcoal/40">Check-in QR Code</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt={`QR code for enrollment ${reference}`}
                width={180}
                height={180}
                className="rounded-lg"
              />
              <p className="text-xs text-charcoal/40 font-mono">{reference}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 print:hidden">
            <PrintButton />
            <a
              href="/"
              className="flex-1 text-center font-semibold py-3 px-6 rounded-xl border border-plum/20 text-plum hover:bg-plum/5 transition-colors text-sm"
            >
              Return to Home
            </a>
          </div>

          <p className="text-center text-xs text-charcoal/30 mt-6 print:hidden">
            Keep this receipt. Present the QR code at orientation for check-in.
          </p>

          {/* Print-only footer */}
          <div className="hidden print:block mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
            smcc.solutions &middot; School of Marriage Counseling &amp; Coaching
          </div>
        </div>
      </main>

      <style>{`
        @media print {
          nav { display: none !important; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          body { background: white !important; }
        }
      `}</style>
    </>
  );
}
