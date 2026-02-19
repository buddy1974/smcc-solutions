import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssessmentForm from "./AssessmentForm";

export const metadata: Metadata = {
  title: "Marriage Readiness Assessment — SMCC",
  description:
    "Take SMCC's free marriage readiness assessment and receive a personalised report with coaching recommendations tailored to your relationship.",
};

export default function AssessmentPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-plum to-plum/90 text-white pt-32 pb-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4 text-gold">
              Free Assessment
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              How Ready Is Your Marriage?
            </h1>
            <p className="text-xl text-blush/90 max-w-2xl mx-auto">
              Five questions. A personalised report. A clear next step — grounded in faith and practical wisdom.
            </p>
          </div>
        </section>

        {/* Assessment Form */}
        <section className="py-20 px-4 bg-blush/20">
          <div className="max-w-3xl mx-auto">
            <AssessmentForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
