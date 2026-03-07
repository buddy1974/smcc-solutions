import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarriageResources from "@/components/MarriageResources";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Marriage Restoration Program | SMCC",
  description:
    "The SMCC Marriage Restoration Program trains counselors in a structured, faith-anchored methodology for guiding broken marriages back to covenant. Learn about the three-cohort certification journey.",
  openGraph: {
    title: "Marriage Restoration Program | SMCC",
    description:
      "The SMCC Marriage Restoration Program trains counselors in a structured, faith-anchored methodology for guiding broken marriages back to covenant. Learn about the three-cohort certification journey.",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "SMCC Marriage Restoration Program" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Marriage Restoration Program",
  "description": "The SMCC Marriage Restoration Program trains counselors in a structured, faith-anchored methodology for guiding broken marriages back to covenant.",
  "author": { "@type": "Organization", "name": "SMCC", "url": "https://smcc.solutions" },
  "publisher": { "@type": "Organization", "name": "School of Marriage Counseling & Coaching", "url": "https://smcc.solutions" },
  "url": "https://smcc.solutions/marriage-restoration-program",
};

export default function MarriageRestorationProgramPage() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <Navbar />
      <main>

        {/* Hero */}
        <section
          className="pt-36 pb-24 px-4 text-center"
          style={{ background: "linear-gradient(160deg, #0d0010 0%, #2a003a 60%, #1a000f 100%)" }}
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
              SMCC Program
            </p>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Marriage Restoration Program
            </h1>
            <p className="text-xl mb-10" style={{ color: "rgba(232,213,234,0.70)" }}>
              A structured, faith-rooted training program designed to equip counselors, pastors, and leaders with the frameworks, skills, and certification to guide broken marriages back to covenant wholeness.
            </p>
            <a
              href="/payment?source=seo-program"
              className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
              style={{ backgroundColor: "#C9A227", color: "#121212" }}
            >
              Apply to Cohort I
            </a>
          </div>
        </section>

        {/* Article content */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">

            {/* Section 1 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                What Restoration Means
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Restoration is not reconciliation without transformation. It is not two people agreeing to continue living together while the same patterns that broke the marriage persist beneath the surface. True restoration — the kind that lasts — requires a genuine change in the dynamics, the habits, and the relational posture of both partners.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                In the biblical framework, restoration means returning to covenant — to the original design and purpose of the marriage. It means that what was broken has been repaired not by papering over the cracks but by addressing the root causes of the breakdown and replacing them with new patterns built on truth, honesty, and mutual commitment.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                This kind of restoration is possible. But it requires guidance — structured, competent, spiritually grounded guidance from someone who has been trained to lead couples through the full journey from crisis to covenant renewal. The SMCC Marriage Restoration Program exists to create that guidance at scale, by training the counselors who serve the communities where marriages are breaking.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Why Couples Need Structured Guidance
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                When a marriage is in genuine crisis, the couple is rarely equipped to navigate that crisis on their own. The very relational dynamics that created the crisis — the communication failures, the emotional reactivity, the accumulated resentment — make it nearly impossible for two people to see clearly enough to find their own way out. They need someone who can see what they cannot see, name what they cannot name, and guide them toward what they cannot reach alone.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Structured guidance provides three things that informal support cannot. First, it provides a framework — a clear, tested methodology for moving through the stages of restoration systematically rather than reactively. Second, it provides neutrality — a trained third party who can hold space for both partners without taking sides. Third, it provides accountability — a consistent, structured process that keeps couples moving forward rather than circling back through the same arguments.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                Without these elements, even couples who genuinely want restoration will often find themselves stuck — trapped in patterns they cannot identify and cycles they cannot break. You can evaluate your own relationship health with the{" "}
                <a href="/assessment" className="text-plum font-semibold underline">
                  Marriage Assessment Tool
                </a>
                .
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                The SMCC Methodology
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                The SMCC restoration methodology is built on seven foundational principles that span the full arc of marriage counseling — from the posture and formation of the counselor to the step-by-step restoration framework applied in the counseling room.
              </p>
              <div className="space-y-4 mb-5">
                {[
                  { title: "The Heart of a Counselor", desc: "Before technique comes formation. SMCC begins by establishing the ethical, emotional, and spiritual posture that every effective counselor must carry." },
                  { title: "God's Design for Marriage", desc: "A counselor cannot guide couples back to a design they do not deeply understand. This module establishes the biblical framework that shapes every other intervention." },
                  { title: "Premarital Counseling", desc: "Prevention is more powerful than restoration. Trainees learn to equip couples before the marriage begins, building foundations that make restoration less necessary." },
                  { title: "Communication and Conflict Resolution", desc: "Practical, proven tools for helping couples move from conflict to connection — from patterns of destruction to habits of honest, productive dialogue." },
                  { title: "Healing from Trauma and Emotional Wounds", desc: "Individual wounds are often the hidden drivers of marital conflict. Counselors learn to identify, address, and help couples heal from the trauma that fuels their present struggles." },
                  { title: "Money, Parenting, and Emotional Management", desc: "The three most common sources of marital breakdown, each requiring a specific counseling approach taught with both clarity and grace." },
                  { title: "Step-by-Step Restoration", desc: "The culminating module — a structured, faith-anchored restoration framework that takes couples from crisis through every stage of healing to covenant renewal." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4 p-5 rounded-lg border border-charcoal/10">
                    <span
                      className="flex-shrink-0 mt-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#C9A227" }}
                    />
                    <div>
                      <p className="font-semibold text-charcoal mb-1">{title}</p>
                      <p className="text-charcoal/65 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                The Three-Cohort Certification Journey
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                SMCC&apos;s certification pathway is structured across three progressive cohorts. Each cohort is a complete program in itself, but each also prepares the trainee for the next level of depth and skill.
              </p>
              <div className="space-y-5 mb-5">
                {[
                  {
                    cohort: "Cohort I — Foundations",
                    price: "50,000 XAF",
                    desc: "The complete foundational formation. Seven modules, live cohort sessions, direct mentoring, and a certificate of completion from SMCC. This is where the restoration counselor begins.",
                    active: true,
                  },
                  {
                    cohort: "Cohort II — Methodology",
                    price: "Coming Soon",
                    desc: "Advanced case work and specialized counseling interventions. Trainees move from understanding frameworks to applying them in supervised real-world practice.",
                    active: false,
                  },
                  {
                    cohort: "Cohort III — Mastery",
                    price: "Coming Soon",
                    desc: "Full professional certification, practicum completion, and positioning as a recognized SMCC-certified marriage counselor.",
                    active: false,
                  },
                ].map(({ cohort, price, desc, active }) => (
                  <div
                    key={cohort}
                    className="p-7 rounded-xl"
                    style={{
                      border: active ? "2px solid #C9A227" : "1px solid rgba(0,0,0,0.08)",
                      backgroundColor: active ? "#F6E8F0" : "#fafafa",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <h3 className="font-playfair text-lg font-bold text-plum">{cohort}</h3>
                      <span
                        className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: active ? "rgba(201,162,39,0.15)" : "rgba(0,0,0,0.05)",
                          color: active ? "#C9A227" : "#999",
                        }}
                      >
                        {price}
                      </span>
                    </div>
                    <p className="text-charcoal/70 leading-relaxed text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Program Overview
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                The SMCC Marriage Restoration Program is a global initiative designed for pastors, ministry leaders, aspiring counselors, coaches, and mentors who carry a deep calling to see marriages healed and families restored. Participants join from across Africa, Europe, and North America, bringing together a diverse cohort united by a shared faith and a shared mission.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                The program is intentionally structured for formation, not just information. Live cohort sessions ensure that trainees are not simply absorbing content — they are developing genuine skill through practice, feedback, and direct mentoring from experienced practitioners. The cohort model also creates a powerful peer community of leaders who continue to support and sharpen one another long after the program ends.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Graduates of the SMCC program leave with three things: a certificate of completion that establishes their credential, a set of practical tools they can apply immediately in their ministry context, and a network of trained counselors who share their commitment to restoring marriages and building stronger families.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                Enrollment for{" "}
                <a href="/cohort-1" className="text-plum font-semibold underline">
                  Cohort I
                </a>{" "}
                is currently open. Seats are limited, and early enrollment is encouraged to secure your place in the cohort. Full program details and payment options are available on the{" "}
                <a href="/payment" className="text-plum font-semibold underline">
                  enrollment page
                </a>
                .
              </p>
            </div>

            <MarriageResources currentPage="/marriage-restoration-program" />

            {/* CTA block */}
            <div
              className="rounded-xl p-10 text-center"
              style={{ background: "linear-gradient(135deg, #2a003a, #5B1A5D)" }}
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
                SMCC Restoration Program
              </p>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
                Start the Restoration Journey
              </h3>
              <p className="text-lg mb-8" style={{ color: "rgba(232,213,234,0.70)" }}>
                Join the cohort of counselors, pastors, and leaders being trained to guide broken marriages back to covenant. Limited seats available.
              </p>
              <a
                href="/payment?source=seo-program"
                className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
                style={{ backgroundColor: "#C9A227", color: "#121212" }}
              >
                Apply to Cohort I
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
