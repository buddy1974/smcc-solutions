import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarriageResources from "@/components/MarriageResources";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Christian Marriage Counseling Training | SMCC Certification",
  description:
    "Discover what Christian marriage counseling training involves, why it differs from secular therapy, and how SMCC equips counselors with biblical frameworks and professional certification.",
  openGraph: {
    title: "Christian Marriage Counseling Training | SMCC Certification",
    description:
      "Discover what Christian marriage counseling training involves, why it differs from secular therapy, and how SMCC equips counselors with biblical frameworks and professional certification.",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "SMCC Christian Counseling Training" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Christian Marriage Counseling Training",
  "description": "Discover what Christian marriage counseling training involves, why it differs from secular therapy, and how SMCC equips counselors with biblical frameworks and professional certification.",
  "author": { "@type": "Organization", "name": "SMCC", "url": "https://smcc.solutions" },
  "publisher": { "@type": "Organization", "name": "School of Marriage Counseling & Coaching", "url": "https://smcc.solutions" },
  "url": "https://smcc.solutions/christian-counseling-training",
};

export default function ChristianCounselingTrainingPage() {
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
              SMCC Certification Program
            </p>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Christian Marriage Counseling Training
            </h1>
            <p className="text-xl mb-10" style={{ color: "rgba(232,213,234,0.70)" }}>
              Faith-rooted, professionally structured, and certified. SMCC equips the next generation of Christian marriage counselors to restore families with competence and biblical authority.
            </p>
            <a
              href="/payment?source=seo-training"
              className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
              style={{ backgroundColor: "#C9A227", color: "#121212" }}
            >
              Enroll in Cohort I
            </a>
          </div>
        </section>

        {/* Article content */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">

            {/* Section 1 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                What Christian Counseling Is
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Christian counseling is a practice that integrates the wisdom of Scripture with a structured understanding of human psychology, relational dynamics, and emotional health. It begins with a foundational conviction: that God&apos;s Word speaks authoritatively to every dimension of human experience, including the most complex and painful struggles of marriage and family life.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                A Christian counselor does not simply add a Bible verse to a secular methodology. Christian counseling operates from a fundamentally different view of the human person — one that understands behavior as rooted in the heart, that sees suffering through the lens of redemption, and that treats relationships as sacred covenants rather than social contracts.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                This means that Christian counseling addresses not just what is happening in a marriage but why — and in doing so, it reaches deeper than surface behavior modification to the transformation that God alone can bring through a process of genuine repentance, healing, and renewed commitment.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Difference from Secular Therapy
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Secular therapy is not without value — and Christian counselors should have enough literacy in psychological frameworks to communicate across that boundary. But the fundamental difference between Christian counseling and secular therapy is not methodological. It is cosmological. Secular therapy operates within a worldview that sees the human being as essentially self-sufficient — as someone who, with the right tools and insights, can resolve their own problems.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Christian counseling operates within a different story entirely. It recognizes that human beings are created by God, broken by sin, and redeemable through Christ — and that this reality must shape every dimension of how a counselor approaches a struggling couple. The goal is not merely healthier communication patterns or better conflict resolution habits. The goal is covenant renewal rooted in spiritual transformation.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                This distinction also shapes how Christian counselors handle forgiveness, betrayal, and the question of whether a marriage should continue. These are not clinical questions with clinical answers — they are moral and spiritual questions that require a counselor grounded in both compassion and biblical conviction.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Why Structured Training Matters
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Many people who feel called to help struggling marriages attempt to do so on the basis of personal experience, pastoral instinct, or general wisdom. These things have real value. But they are not sufficient substitutes for structured training — and in the most difficult counseling situations, the absence of proper training can cause genuine harm.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Structured training provides what instinct cannot: a systematic framework for assessing what is happening in a marriage, a methodology for navigating specific crisis situations, a clear understanding of ethical boundaries, and the practiced ability to facilitate difficult conversations without escalating them. Without these tools, even the most gifted counselor is operating without a map in unfamiliar territory.
              </p>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                Structured training also creates accountability. When a counselor has been through a recognized certification program, the couples they serve have a basis for trust beyond personal rapport. You can evaluate your own readiness to counsel using the{" "}
                <a href="/assessment" className="text-plum font-semibold underline">
                  Marriage Assessment Tool
                </a>
                .
              </p>
            </div>

            {/* Section 4 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                Skills Every Counselor Needs
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                Effective Christian marriage counselors are not born — they are trained. The specific skills that separate a genuinely equipped counselor from someone who means well but lacks the tools are learnable, and SMCC&apos;s curriculum is designed to develop each of them systematically.
              </p>
              <ul className="space-y-4 mb-5">
                {[
                  { skill: "Active Listening and Reflective Communication", desc: "The ability to hear not just what is said but what is meant — to reflect a person&apos;s experience back to them in a way that creates genuine understanding." },
                  { skill: "Conflict Navigation", desc: "The capacity to guide heated or emotionally charged conversations without escalation, and to help couples move from reactive arguing to constructive problem-solving." },
                  { skill: "Trauma Awareness", desc: "An understanding of how personal and relational trauma shapes marital behavior, and practical skills for helping individuals process that trauma in a healing context." },
                  { skill: "Biblical Discernment", desc: "The wisdom to know when and how to bring Scripture to bear on a counseling situation — not as a weapon but as a lamp, illuminating the path toward truth and restoration." },
                  { skill: "Ethical Boundaries", desc: "A clear understanding of when to refer, when to maintain confidentiality, and how to protect both the counselor and the couple from situations that exceed the scope of counseling." },
                ].map(({ skill, desc }) => (
                  <li key={skill} className="flex items-start gap-4 p-5 rounded-lg border border-charcoal/10">
                    <span
                      className="flex-shrink-0 mt-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#C9A227" }}
                    />
                    <div>
                      <p className="font-semibold text-charcoal mb-1">{skill}</p>
                      <p className="text-charcoal/65 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 5 */}
            <div className="mb-14">
              <h2 className="font-playfair text-3xl font-bold text-plum mb-5">
                The SMCC Certification Pathway
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-5">
                SMCC offers a progressive three-cohort certification pathway designed to take counselors from foundational training to full professional certification. Each cohort builds on the last, deepening both knowledge and practical skill.
              </p>
              <div className="space-y-4 mb-5">
                {[
                  { cohort: "Cohort I — Foundations", desc: "Seven modules covering the biblical basis for marriage, the heart of a counselor, communication and conflict resolution, trauma and emotional healing, and step-by-step restoration frameworks. This is where the formation begins." },
                  { cohort: "Cohort II — Methodology", desc: "Advanced case work, specialized interventions for specific crisis situations, and supervised counseling practice. Trainees begin applying frameworks under direct mentorship." },
                  { cohort: "Cohort III — Mastery", desc: "Full certification, practicum completion, and professional positioning. Graduates leave with the credentials, the competence, and the community to operate as recognized Christian marriage counselors." },
                ].map(({ cohort, desc }) => (
                  <div key={cohort} className="p-6 rounded-xl" style={{ backgroundColor: "#F6E8F0" }}>
                    <h3 className="font-playfair text-lg font-bold text-plum mb-2">{cohort}</h3>
                    <p className="text-charcoal/70 leading-relaxed text-sm">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                Enrollment is currently open for{" "}
                <a href="/cohort-1" className="text-plum font-semibold underline">
                  Cohort I
                </a>
                . Seats are limited to preserve the quality of the cohort experience. Full enrollment details are available on the{" "}
                <a href="/payment" className="text-plum font-semibold underline">
                  enrollment page
                </a>
                .
              </p>
            </div>

            <MarriageResources currentPage="/christian-counseling-training" />

            {/* CTA block */}
            <div
              className="rounded-xl p-10 text-center"
              style={{ background: "linear-gradient(135deg, #2a003a, #5B1A5D)" }}
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
                SMCC Certification
              </p>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
                Start the SMCC Certification Program
              </h3>
              <p className="text-lg mb-8" style={{ color: "rgba(232,213,234,0.70)" }}>
                Join the next cohort of Christian marriage counselors being trained to restore families with competence, compassion, and biblical authority.
              </p>
              <a
                href="/payment?source=seo-training"
                className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
                style={{ backgroundColor: "#C9A227", color: "#121212" }}
              >
                Enroll in Cohort I
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
