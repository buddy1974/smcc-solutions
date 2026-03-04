import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Enroll — Select Your Program | SMCC",
  description:
    "Choose your SMCC program and secure your enrollment. SMCC Certification Cohort I or The 7 Pillars of Elevation. Secure payment powered by PayUnit.",
};

const WA_URL = "https://wa.me/237683493220";

const programs = [
  {
    eyebrow: "Certification Program",
    title: "SMCC Certification Program",
    subtitle: "Cohort Enrollment",
    price: "50,000",
    currency: "XAF",
    features: [
      "Full Cohort I curriculum — 7 foundational modules",
      "Live cohort sessions with direct mentoring",
      "Practical counseling tools and frameworks",
      "Certificate of completion from SMCC",
      "Access to the SMCC leader community",
    ],
    buttonText: "Enroll in Cohort I",
    payunitUrl: "https://lk.payunit.net/pay/22d2bb47-1c2f-44dd-94e2-b83550dd0d49",
    highlight: false,
  },
  {
    eyebrow: "Leadership & Identity Intensive",
    title: "The 7 Pillars of Elevation Program",
    subtitle: "14-Week Holistic Transformation",
    price: "150,000",
    currency: "XAF",
    features: [
      "14 weeks of structured coaching",
      "Weekly live sessions",
      "Strategic leadership frameworks",
      "Private leadership community",
      "Implementation-focused transformation",
    ],
    buttonText: "Start the 7 Pillars Program",
    payunitUrl: "https://lk.payunit.net/pay/f4521947-6e69-4d64-bf4d-d2bda32cf6c4",
    highlight: true,
  },
];

export default function PaymentPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section
          className="pt-36 pb-20 px-4 text-center"
          style={{ background: "linear-gradient(160deg, #0d0010 0%, #2a003a 60%, #1a000f 100%)" }}
        >
          {/* Gold grid overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="block h-px w-8" style={{ backgroundColor: "#C9A227" }} />
              <span
                className="text-xs font-semibold tracking-[0.25em] uppercase"
                style={{ color: "#C9A227" }}
              >
                Payment-First Enrollment
              </span>
              <span className="block h-px w-8" style={{ backgroundColor: "#C9A227" }} />
            </div>

            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Select Your Program
            </h1>
            <p className="text-lg" style={{ color: "rgba(232,213,234,0.65)" }}>
              Choose your program below and complete secure payment to confirm your enrollment.
            </p>
          </div>
        </section>

        {/* ── PROGRAM CARDS ─────────────────────────────────────────── */}
        <section
          className="py-20 px-4"
          style={{ backgroundColor: "#0d0010" }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {programs.map((program) => (
                <div
                  key={program.title}
                  className="rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    border: program.highlight
                      ? "2px solid #C9A227"
                      : "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: program.highlight
                      ? "rgba(201,162,39,0.06)"
                      : "rgba(255,255,255,0.03)",
                  }}
                >
                  {/* Card header */}
                  <div
                    className="px-8 py-6"
                    style={{
                      background: program.highlight
                        ? "linear-gradient(135deg, #5B1A5D, #3a0040)"
                        : "linear-gradient(135deg, #1a000f, #2a003a)",
                      borderBottom: program.highlight
                        ? "1px solid rgba(201,162,39,0.3)"
                        : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                      style={{ color: "#C9A227" }}
                    >
                      {program.eyebrow}
                    </p>
                    <h2 className="font-playfair text-2xl font-bold text-white mb-1 leading-snug">
                      {program.title}
                    </h2>
                    <p className="text-sm" style={{ color: "rgba(232,213,234,0.55)" }}>
                      {program.subtitle}
                    </p>
                  </div>

                  {/* Card body */}
                  <div className="px-8 py-8 flex flex-col flex-1 gap-8">

                    {/* Price */}
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(201,162,39,0.7)" }}>
                        Program Investment
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-playfair text-5xl font-bold text-white leading-none">
                          {program.price}
                        </span>
                        <span className="text-lg font-semibold" style={{ color: "rgba(232,213,234,0.5)" }}>
                          {program.currency}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 flex-1">
                      {program.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span
                            className="flex-shrink-0 mt-1 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#C9A227" }}
                          >
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                              <path
                                d="M1 3l2 2 4-4"
                                stroke="#121212"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="text-sm leading-relaxed" style={{ color: "rgba(232,213,234,0.75)" }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="space-y-3">
                      <a
                        href={program.payunitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg text-base"
                        style={{
                          backgroundColor: "#C9A227",
                          color: "#121212",
                        }}
                      >
                        {program.buttonText}
                      </a>

                      {/* Trust line */}
                      <p
                        className="flex items-center justify-center gap-1.5 text-xs"
                        style={{ color: "rgba(232,213,234,0.35)" }}
                      >
                        <svg
                          className="w-3 h-3 flex-shrink-0"
                          style={{ color: "#25D366" }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        Secure payment powered by PayUnit
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHATSAPP SUPPORT ──────────────────────────────────────── */}
        <section
          className="py-16 px-4 border-t"
          style={{ backgroundColor: "#0d0010", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-xl mx-auto text-center">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: "#C9A227" }}
            >
              Admissions Support
            </p>
            <p className="text-white text-lg font-semibold mb-2">
              Questions before you enroll?
            </p>
            <p className="text-sm mb-8" style={{ color: "rgba(232,213,234,0.50)" }}>
              Our admissions team is ready to help. Reach us directly on WhatsApp.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base"
              style={{ backgroundColor: "#25D366", color: "#fff" }}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Contact SMCC Admissions on WhatsApp
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
