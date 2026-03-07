import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarriageResources from "@/components/MarriageResources";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Marriage Health Test | Evaluate Your Relationship Strength",
  description:
    "Take the marriage health assessment to evaluate communication, trust, and relationship strength. Discover practical steps toward restoration.",
  openGraph: {
    title: "Marriage Health Test | Evaluate Your Relationship Strength",
    description:
      "Take the marriage health assessment to evaluate communication, trust, and relationship strength. Discover practical steps toward restoration.",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "SMCC Marriage Health Test" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Marriage Health Test | Evaluate Your Relationship Strength",
  "description": "Take the marriage health assessment to evaluate communication, trust, and relationship strength. Discover practical steps toward restoration.",
  "author": { "@type": "Organization", "name": "SMCC", "url": "https://smcc.solutions" },
  "publisher": { "@type": "Organization", "name": "School of Marriage Counseling & Coaching", "url": "https://smcc.solutions" },
  "url": "https://smcc.solutions/marriage-health-test",
};

export default function MarriageHealthTestPage() {
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
              Free Assessment
            </p>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Marriage Health Test
            </h1>
            <p className="text-xl mb-10" style={{ color: "rgba(232,213,234,0.70)" }}>
              Understanding where your relationship stands is the first step toward building something stronger. This assessment gives you a clear, honest picture of your relationship&apos;s health — and a practical next step forward.
            </p>
            <a
              href="/assessment"
              className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
              style={{ backgroundColor: "#C9A227", color: "#121212" }}
            >
              Start Assessment
            </a>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">

            {/* Section 1 — Introduction */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Why Relationship Awareness Matters
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Many couples are unsure about the true health of their relationship — not because they are not paying attention, but because the patterns that indicate deeper problems are often invisible from the inside. What feels like a normal level of conflict may actually be a sign of entrenched communication breakdown. What feels like distance may be the early stage of emotional disconnection that, left unaddressed, becomes very difficult to reverse.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                The good news is that early awareness is one of the most powerful tools available to any couple. Relationships that might require extensive restoration work if allowed to deteriorate further can often be redirected with relatively straightforward interventions when the issues are identified early. The challenge is that most people do not seek outside perspective until the problems are already severe.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                The SMCC Marriage Health Test is designed to close that gap. It gives couples and individuals a structured, honest way to assess where their relationship actually stands — not where they hope it stands, and not where they fear it might be, but where it genuinely is — and to translate that assessment into a clear, practical next step. You can also explore our in-depth resource on{" "}
                <a href="/marriage-restoration" className="text-plum font-semibold underline">
                  marriage restoration
                </a>
                .
              </p>
            </div>

            {/* Section 2 — What the assessment evaluates */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                What the Assessment Evaluates
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-6">
                The assessment is built around the five dimensions of relationship health that research and pastoral experience consistently identify as the most significant indicators of both relational strength and relational risk. Understanding where you stand on each of these dimensions gives you a far more accurate and useful picture than any single metric could provide.
              </p>
              <div className="space-y-4">
                {[
                  {
                    area: "Communication",
                    desc: "How clearly and safely you and your partner are able to express needs, feelings, and concerns — and how well you are able to listen and respond without triggering escalation or withdrawal.",
                  },
                  {
                    area: "Trust",
                    desc: "The degree to which both partners feel secure, reliable, and honest with each other — including whether trust has been damaged by past events and to what degree it has been rebuilt.",
                  },
                  {
                    area: "Emotional Connection",
                    desc: "The quality of intimacy, vulnerability, and mutual understanding in the relationship — whether both partners feel genuinely known and genuinely cared for.",
                  },
                  {
                    area: "Conflict Resolution",
                    desc: "How effectively disagreements are navigated — whether conflict leads to greater understanding and growth, or to accumulated resentment and increasing emotional distance.",
                  },
                  {
                    area: "Shared Vision",
                    desc: "The degree to which both partners are aligned in their values, goals, faith, and vision for the future — whether they are building toward something together or gradually drifting in different directions.",
                  },
                ].map(({ area, desc }) => (
                  <div key={area} className="flex gap-4 p-5 rounded-lg border border-charcoal/10">
                    <span
                      className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#C9A227" }}
                    />
                    <div>
                      <p className="font-semibold text-charcoal mb-1">{area}</p>
                      <p className="text-charcoal/65 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-charcoal/65 text-sm mt-5 leading-relaxed">
                The assessment identifies your relationship&apos;s current position across all five dimensions — giving you a starting point for intentional growth, and a basis for deciding what kind of support would be most beneficial.
              </p>
            </div>

            {/* Section 3 — Take the Assessment */}
            <div className="mb-14 rounded-xl overflow-hidden border border-charcoal/10">
              <div
                className="px-8 py-6 text-center"
                style={{ background: "linear-gradient(135deg, #2a003a, #5B1A5D)" }}
              >
                <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-2" style={{ color: "#C9A227" }}>
                  Free Tool
                </p>
                <h2 className="font-playfair text-2xl font-bold text-white mb-2">
                  Marriage Health Assessment Tool
                </h2>
                <p className="text-sm" style={{ color: "rgba(232,213,234,0.65)" }}>
                  Five questions. A personalised report. A clear next step.
                </p>
              </div>
              <div className="px-8 py-10 bg-white text-center">
                <p className="text-charcoal/70 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                  The assessment takes approximately three minutes to complete. At the end, you will receive a personalised report explaining your results across all five dimensions and a recommended next step tailored to your situation.
                </p>
                <a
                  href="/assessment"
                  className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
                  style={{ backgroundColor: "#C9A227", color: "#121212" }}
                >
                  Start Assessment
                </a>
                <p className="text-charcoal/40 text-xs mt-4">Free · No account required · Results in under 3 minutes</p>
              </div>
            </div>

            {/* Section 4 — Understanding Results */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Understanding Your Results
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-6">
                Every relationship falls somewhere on a spectrum — and where yours falls right now does not define where it will be in six months with the right support and intentional effort. The goal of the assessment is not to produce a verdict but to give you useful information.
              </p>
              <div className="space-y-5">
                {[
                  {
                    level: "Strong Foundation",
                    color: "#16a34a",
                    bg: "#f0fdf4",
                    desc: "A strong result means your relationship has healthy foundations across most or all of the five dimensions. This does not mean there is nothing to work on — every relationship has areas for growth — but it does mean you are building from a position of genuine strength. The focus here is intentional growth, deepening connection, and equipping yourselves to serve others.",
                  },
                  {
                    level: "Structured Coaching Beneficial",
                    color: "#2563eb",
                    bg: "#eff6ff",
                    desc: "A moderate result suggests areas of real strength alongside areas that would benefit from structured attention. This is not a crisis — it is an opportunity. Couples in this range often make the fastest progress with relatively targeted coaching or counseling, because the relational goodwill is still intact and both partners are often still motivated to invest.",
                  },
                  {
                    level: "Foundational Work Needed",
                    color: "#d97706",
                    bg: "#fffbeb",
                    desc: "A foundational result indicates that the relationship is carrying significant strain across multiple dimensions. This is a call to take the situation seriously — not a reason for despair. Many relationships that have reached this level have been fully restored through structured counseling and guided restoration work. The key is not to wait for the situation to worsen further.",
                  },
                ].map(({ level, color, bg, desc }) => (
                  <div key={level} className="p-6 rounded-xl border-l-4" style={{ backgroundColor: bg, borderColor: color }}>
                    <p className="font-bold mb-2" style={{ color }}>{level}</p>
                    <p className="text-charcoal/70 leading-relaxed text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5 — When Restoration Requires Guidance */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                When Restoration Requires Guidance
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Some relational challenges can be addressed through intentional conversation, mutual commitment, and focused effort by the couple themselves. Others require the structured frameworks, neutral perspective, and trained facilitation that only a qualified counselor or mentor can provide.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Counseling frameworks give couples a structured process for working through specific issues — communication patterns, trust rebuilding, conflict resolution — in a way that produces lasting change rather than temporary truce. Mentorship from someone who has walked through restoration themselves provides both the wisdom of lived experience and the accountability of an ongoing relationship.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Restoration training — the kind offered through the{" "}
                <a href="/cohort-1" className="text-plum font-semibold underline">
                  SMCC Certification Program
                </a>{" "}
                — is what equips the people who help other couples. If you feel called to guide others through restoration, or if you are a pastor, leader, or mentor who regularly encounters couples in crisis, structured training is not optional — it is the foundation of effective, ethical, and genuinely helpful counseling work.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                The difference between help that heals and help that harms is almost always training. SMCC exists to ensure that the people serving couples in crisis are equipped to actually help them. Explore the full{" "}
                <a href="/payment" className="text-plum font-semibold underline">
                  enrollment options
                </a>{" "}
                to see how to get started.
              </p>
            </div>

            <MarriageResources currentPage="/marriage-health-test" />

            {/* CTA block */}
            <div
              className="rounded-xl p-10 text-center"
              style={{ background: "linear-gradient(135deg, #2a003a, #5B1A5D)" }}
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
                SMCC Certification
              </p>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
                When Restoration Requires Guidance
              </h2>
              <p className="text-lg mb-8" style={{ color: "rgba(232,213,234,0.70)" }}>
                If you feel called to guide couples through restoration — or if you need structured support yourself — the SMCC Certification Program provides the training, frameworks, and community to make that possible.
              </p>
              <a
                href="/payment?source=health-test"
                className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
                style={{ backgroundColor: "#C9A227", color: "#121212" }}
              >
                Explore the SMCC Certification Program
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
