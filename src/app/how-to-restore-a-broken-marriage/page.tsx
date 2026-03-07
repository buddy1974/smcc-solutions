import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarriageResources from "@/components/MarriageResources";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "How to Restore a Broken Marriage Biblically | SMCC",
  description:
    "Learn the biblical framework for restoring a broken marriage. Discover why marriages break down, the foundations for healing, and how structured training equips you to guide couples back to covenant.",
  openGraph: {
    title: "How to Restore a Broken Marriage Biblically | SMCC",
    description:
      "Learn the biblical framework for restoring a broken marriage. Discover why marriages break down, the foundations for healing, and how structured training equips you to guide couples back to covenant.",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "SMCC Marriage Restoration" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Restore a Broken Marriage Biblically",
  "description": "Learn the biblical framework for restoring a broken marriage. Discover why marriages break down, the foundations for healing, and how structured training equips you to guide couples back to covenant.",
  "author": { "@type": "Organization", "name": "SMCC", "url": "https://smcc.solutions" },
  "publisher": { "@type": "Organization", "name": "School of Marriage Counseling & Coaching", "url": "https://smcc.solutions" },
  "url": "https://smcc.solutions/how-to-restore-a-broken-marriage",
};

export default function HowToRestoreBrokenMarriagePage() {
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
              Marriage Restoration
            </p>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              How to Restore a Broken Marriage Biblically
            </h1>
            <p className="text-xl mb-10" style={{ color: "rgba(232,213,234,0.70)" }}>
              Marriages can be healed — but restoration requires more than love. It requires a framework, a guide, and a process anchored in biblical truth. Here is what that looks like in practice.
            </p>
            <a
              href="/payment?source=seo-marriage"
              className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
              style={{ backgroundColor: "#C9A227", color: "#121212" }}
            >
              Begin Restoration Training
            </a>
          </div>
        </section>

        {/* Article content */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">

            {/* Section 1 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Why Marriages Break Down
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Most marriages do not collapse suddenly. They erode — slowly, quietly, through patterns of unresolved conflict, emotional disconnection, and unmet expectations that accumulate over years. By the time a couple seeks help, they are often carrying the weight of hundreds of small fractures that together form a chasm neither partner knows how to cross.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                The three most common drivers of marital breakdown are communication failure, financial stress, and unhealed personal wounds. When couples cannot express their needs without triggering defensiveness, when money becomes a source of power and shame rather than shared stewardship, and when childhood trauma or past betrayal seeps into present conflict — the marriage begins to break not from the outside but from within.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                Understanding why marriages break down is not about assigning blame. It is about identifying the specific patterns that need to be interrupted and replaced. Without this clarity, counselors and helpers — however well-meaning — can inadvertently deepen wounds instead of heal them.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Biblical Foundations for Restoration
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Scripture does not treat marriage as a social contract that can be discarded when it becomes difficult. It treats marriage as a covenant — a sacred, binding commitment that reflects the relationship between Christ and his church. This distinction matters profoundly for restoration work.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                When restoration is grounded in covenant theology, it is not simply about helping two people get along better. It is about calling them back to the original design — to sacrificial love, to honoring one another above self, to building something that outlasts both of them and serves the generations that follow.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                The biblical framework for restoration begins with repentance — not performance. It does not ask couples to pretend that nothing happened or to suppress legitimate pain. It asks them to acknowledge the truth of what has broken down, take responsibility for their part in it, and turn — genuinely turn — toward a new way of relating.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                This is where trained counselors play a critical role. Facilitating genuine repentance and reconciliation requires wisdom, neutrality, and spiritual authority. It cannot be done casually. It must be done by someone who has been equipped for it.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Practical Steps Toward Healing
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Biblical restoration is not a linear process, but it does follow identifiable stages that every effective counselor must understand and be able to navigate. The following steps outline the core arc of marriage restoration as taught in the SMCC curriculum.
              </p>
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Create Safety for Truth",
                    body: "Before any healing can happen, both partners must feel safe enough to speak honestly. The counselor&apos;s first task is establishing an environment where full truth — including pain, anger, and fear — can be expressed without judgment or escalation.",
                  },
                  {
                    step: "2",
                    title: "Identify Root Patterns",
                    body: "The presenting conflict is rarely the real issue. Effective counselors dig beneath the surface to identify the relational patterns — the cycles of pursue and withdraw, of criticism and defensiveness — that are actually driving the breakdown.",
                  },
                  {
                    step: "3",
                    title: "Rebuild Communication",
                    body: "New communication tools must replace old destructive patterns. This is not taught — it is practiced, repeatedly, in a structured and guided setting until it becomes the couple&apos;s new normal.",
                  },
                  {
                    step: "4",
                    title: "Address Unhealed Wounds",
                    body: "Many marital conflicts are fueled by individual wounds that predate the marriage. Effective restoration requires a counselor who can help individuals process personal trauma in a way that releases its grip on the relationship.",
                  },
                  {
                    step: "5",
                    title: "Renew Covenant Commitment",
                    body: "The final stage is not just resolution of conflict — it is renewal of purpose. Couples who have walked through genuine restoration need to articulate a shared vision for what their marriage will become and commit to it with clarity and faith.",
                  },
                ].map(({ step, title, body }) => (
                  <div key={step} className="flex gap-5 p-6 rounded-xl border border-charcoal/10">
                    <span
                      className="flex-shrink-0 w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center text-white"
                      style={{ backgroundColor: "#5B1A5D" }}
                    >
                      {step}
                    </span>
                    <div>
                      <h3 className="font-playfair text-lg font-bold text-plum mb-2">{title}</h3>
                      <p className="text-charcoal/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: body }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                When Outside Guidance Is Needed
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                There is a persistent myth that seeking outside help is a sign of failure. In reality, the opposite is true. The willingness to seek qualified guidance is one of the clearest indicators that a couple is serious about restoration. Couples who try to navigate crisis alone, without structured support, are far more likely to either suppress the problem or allow it to escalate to an irreversible breaking point.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Outside guidance is not optional when any of the following are present: repeated cycles of conflict that cannot be broken without intervention, betrayal or infidelity that has shattered the foundation of trust, one or both partners carrying unresolved trauma that is fueling present conflict, or a disconnection so deep that communication has almost entirely broken down.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                In these situations, well-meaning friends and family members — however caring — are not equipped to provide what the couple needs. What is needed is a trained counselor: someone who has the frameworks, the neutrality, and the spiritual authority to guide the couple through what they cannot navigate on their own. You can also evaluate your relationship health using the{" "}
                <a href="/assessment" className="text-plum font-semibold underline">
                  Marriage Assessment Tool
                </a>
                .
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                How Structured Restoration Training Works
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Not everyone who wants to help couples is equipped to help them effectively. Good intentions are not sufficient. What makes the difference between help that heals and help that harms is structured training — the kind that gives counselors both the theoretical frameworks and the practical tools to navigate the full complexity of marital breakdown.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                The{" "}
                <a href="/cohort-1" className="text-plum font-semibold underline">
                  SMCC Cohort I program
                </a>{" "}
                is built around this premise. Over twelve weeks, trainees move through seven foundational modules covering everything from the heart posture of a counselor to step-by-step restoration methodology. Each module combines biblical truth with practical counseling tools that can be applied immediately in real counseling situations.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                The program is delivered through live cohort sessions with direct mentoring, ensuring that trainees do not simply absorb information but develop genuine skill. By the end of Cohort I, you will know what to say, when to say it, and how to guide couples through even the most difficult conversations — with clarity, compassion, and biblical authority. See the full enrollment options on the{" "}
                <a href="/payment" className="text-plum font-semibold underline">
                  enrollment page
                </a>
                .
              </p>
            </div>

            <MarriageResources currentPage="/how-to-restore-a-broken-marriage" />

            {/* CTA block */}
            <div
              className="rounded-xl p-10 text-center"
              style={{ background: "linear-gradient(135deg, #2a003a, #5B1A5D)" }}
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
                SMCC Restoration Framework
              </p>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
                Learn the SMCC Restoration Framework
              </h3>
              <p className="text-lg mb-8" style={{ color: "rgba(232,213,234,0.70)" }}>
                Equip yourself with the biblical tools, practical frameworks, and professional training to guide couples from crisis to covenant renewal.
              </p>
              <a
                href="/payment?source=seo-marriage"
                className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
                style={{ backgroundColor: "#C9A227", color: "#121212" }}
              >
                Begin Restoration Training
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
