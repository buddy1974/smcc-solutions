import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarriageResources from "@/components/MarriageResources";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Biblical Marriage Counseling Principles | SMCC",
  description:
    "Explore the biblical foundations of marriage counseling. Learn how Scripture shapes restoration work, why couples struggle, and how SMCC trains leaders to counsel couples with faith and competence.",
  openGraph: {
    title: "Biblical Marriage Counseling Principles | SMCC",
    description:
      "Explore the biblical foundations of marriage counseling. Learn how Scripture shapes restoration work, why couples struggle, and how SMCC trains leaders to counsel couples with faith and competence.",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "SMCC Biblical Marriage Counseling" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Biblical Marriage Counseling Principles",
  "description": "Explore the biblical foundations of marriage counseling. Learn how Scripture shapes restoration work, why couples struggle, and how SMCC trains leaders to counsel couples with faith and competence.",
  "author": { "@type": "Organization", "name": "SMCC", "url": "https://smcc.solutions" },
  "publisher": { "@type": "Organization", "name": "School of Marriage Counseling & Coaching", "url": "https://smcc.solutions" },
  "url": "https://smcc.solutions/biblical-marriage-counseling",
};

export default function BiblicalMarriageCounselingPage() {
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
              Biblical Counseling Principles
            </p>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Biblical Marriage Counseling
            </h1>
            <p className="text-xl mb-10" style={{ color: "rgba(232,213,234,0.70)" }}>
              When counseling is rooted in Scripture, it does not just manage conflict — it transforms marriages from the inside out. Here is what biblical marriage counseling looks like and why it works.
            </p>
            <a
              href="/payment?source=seo-biblical"
              className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
              style={{ backgroundColor: "#C9A227", color: "#121212" }}
            >
              Start Training
            </a>
          </div>
        </section>

        {/* Article content */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">

            {/* Section 1 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                The Biblical View of Marriage
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Scripture presents marriage not as a cultural institution or a legal arrangement but as a covenant — a binding, sacred commitment initiated by God and reflective of his relationship with his people. From the beginning of Genesis, marriage is portrayed as the union of two image-bearers, created for companionship, complementarity, and the co-stewardship of life and legacy.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                This view of marriage is not merely theological background — it is the operating framework for all effective biblical counseling. When a counselor understands that marriage is covenantal in nature, the entire approach to restoration changes. The question is no longer &ldquo;can this relationship be saved?&rdquo; but &ldquo;how do we return to what this marriage was always designed to be?&rdquo;
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                The biblical view also establishes what marriage is for — not primarily personal fulfillment, but mutual sanctification, faithful partnership, and the raising of a generation that knows and serves God. When this purpose is lost, marriages lose their anchor. When it is recovered, couples find renewed reason to do the hard work of restoration.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Why Couples Struggle
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                The struggles of marriage are rarely unique — they follow predictable patterns rooted in the universal realities of human brokenness. Understanding these patterns is one of the first things a biblical marriage counselor must master.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Most couples struggle because of communication breakdown — not simply that they say the wrong things, but that they have developed deeply ingrained patterns of speaking past each other, avoiding difficult conversations, or escalating conflict in ways that leave both partners feeling unseen and unsafe. Over time, these patterns harden into walls that feel immovable.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                A second major driver is unresolved personal wound — the accumulated pain from childhood, from past relationships, or from earlier seasons of the marriage itself that has never been properly grieved and healed. Unhealed wounds do not disappear when ignored. They resurface, consistently, in the most vulnerable moments of the marriage.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                Third, many couples struggle because their expectations have never been aligned. They entered marriage with different assumptions about roles, finances, parenting, intimacy, and spirituality — and those differences, never addressed directly, have become sources of chronic frustration and resentment. You can assess the health of a relationship using the{" "}
                <a href="/assessment" className="text-plum font-semibold underline">
                  Marriage Assessment Tool
                </a>
                .
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Counseling Principles in Scripture
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Scripture is not a counseling textbook — but it is filled with counseling principles that, when properly understood and applied, transform the way counselors engage with struggling couples.
              </p>
              <div className="space-y-5 mb-5">
                {[
                  { principle: "Speak truth in love (Ephesians 4:15)", desc: "Biblical counseling does not choose between honesty and compassion — it requires both. Counselors must be willing to speak difficult truths while maintaining genuine care for the people they serve." },
                  { principle: "Bear one another's burdens (Galatians 6:2)", desc: "This principle establishes the counselor as someone who enters into the weight of another person's struggle — not as a distant expert, but as a fellow traveler who takes their pain seriously." },
                  { principle: "Be quick to hear, slow to speak (James 1:19)", desc: "Effective counseling begins with listening — real listening that seeks to understand before seeking to be understood. Scripture recognizes this long before modern communication theory." },
                  { principle: "Forgiveness as a covenant obligation (Colossians 3:13)", desc: "Biblical counseling does not treat forgiveness as a therapeutic option to be considered. It presents forgiveness as a moral and spiritual imperative — and it equips counselors to guide couples through the genuine process of extending it." },
                ].map(({ principle, desc }) => (
                  <div key={principle} className="p-6 rounded-xl border-l-4" style={{ backgroundColor: "#F6E8F0", borderColor: "#5B1A5D" }}>
                    <h3 className="font-playfair text-base font-bold text-plum mb-2">{principle}</h3>
                    <p className="text-charcoal/70 leading-relaxed text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Restoration Frameworks
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Biblical principles must be translated into structured methodologies to be practically useful in the counseling room. SMCC&apos;s curriculum bridges this gap by training counselors in specific restoration frameworks that are both scripturally grounded and clinically effective.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                These frameworks guide counselors through the full arc of restoration — from initial crisis assessment to the rebuilding of communication, from confronting the roots of conflict to facilitating genuine forgiveness, from re-establishing trust to renewing covenant commitment. Each step is teachable, each framework is replicable, and each outcome is measurable.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                What makes SMCC&apos;s approach distinctive is that these frameworks are never applied mechanically. Every couple is unique. Every marriage has its own history, its own wounds, and its own path toward restoration. Trained counselors learn to hold the framework with one hand and the person with the other — adapting the methodology to the human being in front of them without losing the structure that makes the work effective.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Training Leaders to Guide Couples
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                The church has always been the most natural and most powerful counseling institution in the world. Pastors, elders, deacons, mentors, and leaders are already embedded in the relational fabric of their communities. They are already trusted. They are already present. What they often lack is structured, competent training.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                SMCC exists to close that gap. The{" "}
                <a href="/cohort-1" className="text-plum font-semibold underline">
                  SMCC Cohort I program
                </a>{" "}
                trains church leaders, aspiring counselors, and ministry workers with the biblical frameworks, practical tools, and professional certification they need to serve couples with genuine competence. The result is not just better counselors — it is stronger churches, healthier families, and more stable communities.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                When leaders are trained, the ripple effect is generational. Every couple they help becomes a stronger family. Every stronger family produces more resilient children. Every resilient generation shapes a more stable nation. This is why the work of biblical marriage counseling training is not just important — it is urgent. Explore{" "}
                <a href="/payment" className="text-plum font-semibold underline">
                  enrollment options
                </a>{" "}
                to get started.
              </p>
            </div>

            <MarriageResources currentPage="/biblical-marriage-counseling" />

            {/* CTA block */}
            <div
              className="rounded-xl p-10 text-center"
              style={{ background: "linear-gradient(135deg, #2a003a, #5B1A5D)" }}
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
                SMCC Biblical Counseling
              </p>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
                Learn the Biblical Counseling Framework
              </h3>
              <p className="text-lg mb-8" style={{ color: "rgba(232,213,234,0.70)" }}>
                Be equipped to counsel couples with Scripture-rooted tools, practical frameworks, and the authority of genuine training.
              </p>
              <a
                href="/payment?source=seo-biblical"
                className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
                style={{ backgroundColor: "#C9A227", color: "#121212" }}
              >
                Start Training
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
