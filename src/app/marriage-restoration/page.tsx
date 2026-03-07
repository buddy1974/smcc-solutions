import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarriageResources from "@/components/MarriageResources";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Marriage Restoration | Biblical Principles for Healing Relationships | SMCC",
  description:
    "Learn biblical principles for restoring broken relationships and marriages. Discover counseling frameworks and training through the SMCC certification program.",
  openGraph: {
    title: "Marriage Restoration | Biblical Principles for Healing Relationships | SMCC",
    description:
      "Learn biblical principles for restoring broken relationships and marriages. Discover counseling frameworks and training through the SMCC certification program.",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "SMCC Marriage Restoration" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Marriage Restoration | Biblical Principles for Healing Relationships",
  "description": "Learn biblical principles for restoring broken relationships and marriages. Discover counseling frameworks and training through the SMCC certification program.",
  "author": { "@type": "Organization", "name": "SMCC", "url": "https://smcc.solutions" },
  "publisher": { "@type": "Organization", "name": "School of Marriage Counseling & Coaching", "url": "https://smcc.solutions" },
  "url": "https://smcc.solutions/marriage-restoration",
};

export default function MarriageRestorationPage() {
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
              Biblical Healing Framework
            </p>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Marriage Restoration
            </h1>
            <p className="text-xl mb-10" style={{ color: "rgba(232,213,234,0.70)" }}>
              Broken relationships can be healed — but restoration requires more than time. It requires a biblical framework, intentional guidance, and trained counselors who know how to lead couples from crisis back to covenant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/payment?source=marriage-restoration-hub"
                className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
                style={{ backgroundColor: "#C9A227", color: "#121212" }}
              >
                Explore the SMCC Certification Program
              </a>
              <a
                href="/marriage-health-test"
                className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 border-2 text-white text-base hover:bg-white/10"
                style={{ borderColor: "rgba(201,162,39,0.4)" }}
              >
                Take the Marriage Assessment
              </a>
            </div>
          </div>
        </section>

        {/* Article content */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">

            {/* Section 1 — Understanding Marriage Restoration */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Understanding Marriage Restoration
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Most relationships do not break suddenly. They erode — through patterns of emotional distance that accumulate quietly over months and years, through communication breakdown that leaves both partners feeling unheard and unknown, and through the slow loss of trust that follows repeated disappointment. By the time a couple recognizes they are in crisis, the fractures are often deep and the patterns well-established.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Emotional distance is one of the most common and most dangerous signs of a relationship in decline. When partners stop sharing vulnerably, when conversations stay on the surface, when physical and emotional intimacy begin to feel like obligations rather than gifts — the connection that holds a marriage together begins to erode beneath the surface. Left unaddressed, emotional distance eventually becomes emotional divorce, even while both partners are still living in the same home.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Communication breakdown follows a predictable arc: couples stop speaking honestly, begin avoiding difficult topics, and eventually default to patterns of criticism, defensiveness, contempt, or withdrawal that make genuine connection almost impossible. These are not character flaws — they are learned responses to pain. But they will destroy a marriage if they are not interrupted and replaced with something better.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                The loss of trust — whether through betrayal, repeated broken promises, or the simple accumulation of unresolved hurt — is perhaps the most difficult wound to heal. Trust once broken does not simply return with time. It must be rebuilt, deliberately, through consistent action, accountability, and the kind of honest conversation that requires both courage and skill to facilitate. This is why restoration requires intentional frameworks — not just goodwill.
              </p>
            </div>

            {/* Section 2 — Biblical Principles */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Biblical Principles for Restoring Relationships
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-6">
                Scripture does not treat relational healing as an optional extra for the spiritually advanced. It presents forgiveness, accountability, humility, and covenant commitment as the essential framework within which broken relationships can be genuinely restored.
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: "Forgiveness",
                    body: "Biblical forgiveness is not the suppression of legitimate pain or the premature declaration that nothing happened. It is the deliberate choice to release another person from the debt of their offense — not because they deserve it, but because unforgiveness destroys the one who holds it. Forgiveness is the foundation without which no restoration can stand. Trained counselors learn to guide couples through genuine forgiveness — not performance, but transformation.",
                  },
                  {
                    title: "Accountability",
                    body: "Restoration without accountability produces false peace. Biblical accountability means being willing to acknowledge what actually happened, take responsibility for one&apos;s part in the breakdown, and make concrete commitments to change. It is not shame — it is the honest reckoning that genuine healing requires. A skilled counselor knows how to create an environment where accountability is possible without becoming a weapon.",
                  },
                  {
                    title: "Humility",
                    body: "Pride is the most consistent enemy of marital restoration. The willingness to be wrong, to prioritize the relationship over being right, and to submit to a process of genuine change — these require a humility that does not come naturally to people in pain. Scripture consistently identifies humility as the posture that opens the door to grace, and therefore to healing.",
                  },
                  {
                    title: "Covenant Commitment",
                    body: "Unlike a contract — which is conditional and transactional — a covenant is unconditional and sacrificial. Biblical marriage was designed as a covenant, which means restoration is not about renegotiating terms but about returning to a commitment that was never contingent on performance. This covenantal foundation gives couples a reason to do the hard work of restoration that no feeling-based motivation can sustain.",
                  },
                ].map(({ title, body }) => (
                  <div
                    key={title}
                    className="p-6 rounded-xl border-l-4"
                    style={{ backgroundColor: "#F6E8F0", borderColor: "#5B1A5D" }}
                  >
                    <h3 className="font-playfair text-xl font-bold text-plum mb-3">{title}</h3>
                    <p className="text-charcoal/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: body }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 — Why Couples Struggle Alone */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Why Couples Struggle Alone
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                When a relationship is in genuine crisis, the very dynamics that created the crisis make it nearly impossible for the couple to navigate it on their own. Emotional blind spots are perhaps the most insidious obstacle. Every person carries unconscious patterns — ways of perceiving, reacting, and relating that feel entirely rational and justified from the inside but are invisible to the person experiencing them. A partner can be genuinely convinced they are communicating clearly while their spouse experiences them as completely dismissive.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Unresolved pain compounds this problem exponentially. When partners carry unhealed wounds from earlier in the marriage, from childhood, or from past relationships, those wounds do not stay dormant. They surface in moments of vulnerability and conflict, driving reactions that seem disproportionate to the immediate situation because they are responding to something much older and much deeper. Without help identifying and addressing this deeper layer, couples find themselves having the same argument repeatedly — never reaching resolution because they are never actually addressing the real source of the conflict.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                Destructive communication patterns — the cycles of criticism and defensiveness, of contempt and withdrawal — are self-reinforcing once established. Each partner&apos;s response triggers the other&apos;s defensiveness, which confirms the first partner&apos;s frustration, which escalates the response. Breaking these cycles requires an outside perspective: someone trained to see the pattern, name it, and introduce something different. This is the role of a trained counselor and mentor, and it is why no amount of good intentions can substitute for structured guidance. You can begin by evaluating your relationship using the{" "}
                <a href="/marriage-health-test" className="text-plum font-semibold underline">
                  Marriage Health Test
                </a>
                .
              </p>
            </div>

            {/* Section 4 — SMCC Framework */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                The SMCC Restoration Framework
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                SMCC&apos;s approach to marriage restoration is built on the conviction that effective counseling requires both biblical integrity and practical structure. The SMCC framework is not a set of generic principles — it is a structured methodology for guiding couples through every stage of the restoration journey, from initial crisis to covenant renewal.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                The framework is delivered through structured counseling sessions that create safety for honest conversation, practical mentoring frameworks that give couples concrete tools for building new patterns, and a leadership training model that equips counselors to facilitate restoration in their own communities. Every element is anchored in Scripture and tested through real counseling practice.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                What makes SMCC&apos;s approach distinctive is that it trains not just counselors but leaders — people who carry a calling to their communities and who will multiply the work of restoration far beyond the counseling room. A pastor trained through SMCC serves not just the couples who come to him directly, but every couple influenced by the culture he builds in his congregation. A mentor trained through SMCC becomes a resource for the entire relational ecosystem in which she operates.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                The{" "}
                <a href="/cohort-1" className="text-plum font-semibold underline">
                  SMCC Certification Program
                </a>{" "}
                is the vehicle through which this framework is transmitted — systematically, comprehensively, and with the mentoring support that ensures trainees develop genuine skill, not just theoretical knowledge.
              </p>
            </div>

            {/* Section 5 — Three Cohort Journey */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                The Three-Cohort Certification Journey
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-6">
                SMCC&apos;s training is structured across three progressive cohorts, each building on the last, each deepening the counselor&apos;s capacity to restore. Training begins with Cohort I Foundations — currently open for enrollment.
              </p>
              <div className="space-y-4">
                {[
                  {
                    cohort: "Cohort I — Foundations",
                    active: true,
                    desc: "The complete foundational formation. Seven modules covering the biblical basis for marriage, the heart of a counselor, communication and conflict resolution, trauma and emotional healing, and the step-by-step restoration framework. Live cohort sessions, direct mentoring, and a certificate of completion. This is where the restoration counselor begins.",
                  },
                  {
                    cohort: "Cohort II — Methodology",
                    active: false,
                    desc: "Advanced case work and specialized counseling interventions. Trainees move from understanding frameworks to applying them in supervised real-world practice, developing the confidence and skill that only comes from guided experience.",
                  },
                  {
                    cohort: "Cohort III — Mastery",
                    active: false,
                    desc: "Full professional certification, practicum completion, and positioning as a recognized SMCC-certified marriage counselor. Graduates leave with the credentials, the competence, and the community to operate with authority in their field.",
                  },
                ].map(({ cohort, active, desc }) => (
                  <div
                    key={cohort}
                    className="p-7 rounded-xl"
                    style={{
                      border: active ? "2px solid #C9A227" : "1px solid rgba(0,0,0,0.08)",
                      backgroundColor: active ? "#F6E8F0" : "#fafafa",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="font-playfair text-lg font-bold text-plum">{cohort}</h3>
                      {active && (
                        <span
                          className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "rgba(201,162,39,0.15)", color: "#C9A227" }}
                        >
                          Enrollment Open
                        </span>
                      )}
                    </div>
                    <p className="text-charcoal/70 leading-relaxed text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Marriage Restoration Guide — cluster hub */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-3">
                Marriage Restoration Guide
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-6">
                Explore these in-depth articles on marriage restoration, biblical counseling, and professional training.
              </p>
              <MarriageResources currentPage="/marriage-restoration" />
            </div>

            {/* Assessment CTA */}
            <div className="mb-10 rounded-xl p-8 border border-charcoal/10">
              <h2 className="font-playfair text-2xl font-bold text-plum mb-3">
                Evaluate the Health of Your Relationship
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mb-6">
                Not sure where your relationship stands? Take the Marriage Health Assessment to gain insight into the current health of your relationship — and discover a clear next step forward.
              </p>
              <a
                href="/marriage-health-test"
                className="inline-block font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-base"
                style={{ backgroundColor: "#5B1A5D", color: "#fff" }}
              >
                Take the Marriage Assessment
              </a>
            </div>

            {/* Program CTA */}
            <div
              className="rounded-xl p-10 text-center"
              style={{ background: "linear-gradient(135deg, #2a003a, #5B1A5D)" }}
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
                SMCC Certification Program
              </p>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
                Begin the Restoration Journey
              </h2>
              <p className="text-lg mb-8" style={{ color: "rgba(232,213,234,0.70)" }}>
                If you feel called to help couples rebuild relationships and restore families, the SMCC Certification Program provides the training and framework needed to guide others through transformation.
              </p>
              <a
                href="/payment?source=marriage-restoration-hub"
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
