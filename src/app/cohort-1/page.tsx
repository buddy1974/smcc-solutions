import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ManualPaymentBlock } from "@/components/ApplicationForm";

export const metadata: Metadata = {
  title: "Cohort I — SMCC Marriage Counseling Training",
  description:
    "Enroll in the 12-week faith-based marriage counseling and coaching cohort. 50,000 FCFA investment. Global participants welcome.",
  openGraph: {
    title: "Cohort I — SMCC Marriage Counseling Training",
    description:
      "Enroll in the 12-week faith-based marriage counseling and coaching cohort. 50,000 FCFA investment. Global participants welcome.",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "SMCC Cohort I" }],
  },
};

const modules = [
  {
    number: "01",
    title: "The Heart of a Counselor",
    description:
      "Before you can counsel others, you must be grounded in your own calling. This module establishes the ethical, emotional, and spiritual readiness every effective counselor must carry — the posture of humility, the weight of responsibility, and the authority that comes from walking uprightly.",
  },
  {
    number: "02",
    title: "God\u2019s Design for Marriage",
    description:
      "Marriages fail when they drift from their divine blueprint. You will master the biblical foundations of covenant, purpose, and spiritual unity — the framework that holds every healthy marriage together, and the lens through which every counseling session must be guided.",
  },
  {
    number: "03",
    title: "Premarital Counseling",
    description:
      "Prevention is more powerful than restoration. Learn how to equip couples before they begin — aligning expectations, building communication systems, and establishing spiritual foundations that give marriages the strongest possible start.",
  },
  {
    number: "04",
    title: "Communication & Conflict Resolution",
    description:
      "Most marriages do not break over catastrophic failures — they erode through daily misunderstanding. This module gives you practical, proven tools to help couples move from conflict to connection, and from silence to safe, honest dialogue.",
  },
  {
    number: "05",
    title: "Healing from Trauma & Emotional Wounds",
    description:
      "Many couples carry invisible wounds into their marriages — childhood pain, betrayal, abandonment, and grief. You will learn to guide individuals and couples through layers of trauma with clinical wisdom, spiritual care, and the patience of a true restorer.",
  },
  {
    number: "06",
    title: "Money, Parenting & Emotional Management",
    description:
      "The three most common sources of marital breakdown — finances, children, and emotional dysregulation — each require a specific counseling approach. You will leave this module equipped to address them with clarity, strategy, and grace.",
  },
  {
    number: "07",
    title: "Step-by-Step Restoration",
    description:
      "This is where theory becomes transformation. Using a structured, faith-anchored restoration framework, you will learn to walk couples from the moment of crisis through every stage of healing — rebuilding trust, renewing covenant, and restoring lasting hope.",
  },
];

const pillars = [
  {
    title: "Community of Leaders",
    body:
      "You will not train alone. Cohort I brings together pastors, mentors, and leaders who share your burden for marriage — a powerful peer community where iron sharpens iron.",
  },
  {
    title: "Scripture-Rooted Practice",
    body:
      "Every tool, every framework, every technique is anchored in the Word of God. You will never have to choose between biblical integrity and professional effectiveness.",
  },
  {
    title: "Confidence Through Competence",
    body:
      "No more uncertainty in the counseling room. You will leave Cohort I knowing what to say, how to guide, and when to refer — with the confidence of someone who has truly been trained.",
  },
  {
    title: "Certification & Calling",
    body:
      "Cohort I is the foundation of a three-cohort journey from foundational training to advanced certification. You will step into your role as a recognized, equipped, and credentialed marriage counselor.",
  },
];

export default function CohortOnePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0d0010 0%, #2a003a 50%, #1a000f 100%)" }}
        >
          {/* Subtle gold grid overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #5B1A5D 0%, transparent 70%)" }}
          />

          <div className="relative max-w-4xl mx-auto text-center">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="block h-px w-8" style={{ backgroundColor: "#C9A227" }} />
              <span
                className="text-xs font-semibold tracking-[0.25em] uppercase"
                style={{ color: "#C9A227" }}
              >
                Cohort I &nbsp;&middot;&nbsp; Foundations for Faith-Based Family Restoration
              </span>
              <span className="block h-px w-8" style={{ backgroundColor: "#C9A227" }} />
            </div>

            {/* Main headline */}
            <h1
              className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-white"
            >
              THE SCHOOL OF<br />
              <span style={{ color: "#C9A227" }}>MARRIAGE COUNSELING</span><br />
              &amp; COACHING
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl font-semibold mb-6 tracking-wide" style={{ color: "#e8d5ea" }}>
              Thriving Marriages. Rising Families. Peaceful Nations.
            </p>

            {/* Body */}
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: "rgba(232,213,234,0.65)" }}>
              Marriage is under attack. Homes are breaking. Families are hurting.
              But God is raising men and women who will stand in the gap &mdash; leaders with wisdom,
              skill, and spiritual authority to restore what is broken.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="#admissions"
                className="inline-block font-semibold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
                style={{ backgroundColor: "#C9A227", color: "#121212" }}
              >
                Enroll in Cohort I
              </a>
              <a
                href="#modules"
                className="inline-block font-semibold px-10 py-4 rounded-lg transition-all duration-300 border text-white text-base hover:bg-white/10"
                style={{ borderColor: "rgba(201,162,39,0.4)" }}
              >
                View the Curriculum
              </a>
            </div>

            {/* Urgency note */}
            <p className="text-xs tracking-widest uppercase" style={{ color: "#C9A227", opacity: 0.6 }}>
              Cohort I &mdash; Limited Enrollment &nbsp;&middot;&nbsp; Secure Your Seat Early
            </p>
          </div>
        </section>

        {/* ── EMOTIONAL HOOK ────────────────────────────────────────── */}
        <section className="py-24 px-4" style={{ backgroundColor: "#0d0010" }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <span className="block h-px w-12 mx-auto mb-8" style={{ backgroundColor: "#C9A227" }} />
              <p
                className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold italic leading-snug text-white mb-8"
              >
                &ldquo;What happens to a generation when its marriages collapse?&rdquo;
              </p>
              <span className="block h-px w-12 mx-auto mt-8" style={{ backgroundColor: "#C9A227" }} />
            </div>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(232,213,234,0.70)" }}>
              Divorce. Broken homes. Children raised without covenant models. Communities without
              stable families. Nations built on fractured foundations. The cost of untrained,
              under-equipped counselors is not academic &mdash; it is generational.
            </p>
            <p className="text-xl md:text-2xl font-bold mt-10" style={{ color: "#C9A227" }}>
              Will you answer the call?
            </p>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ───────────────────────────────────────── */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">

            {/* Section header */}
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
                Eligibility
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-plum mb-6 leading-tight">
                Who Is This For?
              </h2>
              <div className="h-0.5 w-10" style={{ backgroundColor: "#C9A227" }} />
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-start">

              {/* Left — persona list */}
              <div className="space-y-5">
                {[
                  "Pastors and ministry leaders with a burden for struggling couples",
                  "Aspiring marriage counselors seeking structured, biblical training",
                  "Coaches and mentors who want proven frameworks, not just instinct",
                  "Lay leaders and church workers regularly counseling families",
                  "Anyone with a deep calling to see marriages healed and families restored",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: "#C9A227" }}
                    />
                    <p className="text-charcoal/80 text-lg leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              {/* Right — conviction statement */}
              <div
                className="rounded-xl p-10 border-l-4"
                style={{ backgroundColor: "#F6E8F0", borderColor: "#5B1A5D" }}
              >
                <p className="font-playfair text-2xl font-bold text-plum mb-6 leading-snug">
                  If you are tired of giving surface advice&hellip;
                </p>
                <p className="text-charcoal/75 text-lg leading-relaxed mb-6">
                  If every time a couple walks into your office you wish you had deeper tools,
                  clearer frameworks, and greater spiritual authority to actually help them &mdash;
                  this training was built for that moment.
                </p>
                <p className="text-charcoal/75 text-lg leading-relaxed">
                  SMCC Cohort I gives you the formation, the methodology, and the certification
                  to move from well-meaning to truly equipped.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU WILL BECOME ──────────────────────────────────── */}
        <section className="py-24 px-4" style={{ backgroundColor: "#F6E8F0" }}>
          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#5B1A5D" }}>
                Transformation
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-plum mb-4 leading-tight">
                What You Will Become
              </h2>
              <p className="text-charcoal/70 text-lg">
                At SMCC, we do not just train counselors. We raise restorers of covenant.
              </p>
              <div className="h-0.5 w-10 mx-auto mt-6" style={{ backgroundColor: "#C9A227" }} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  headline: "The Safe Voice",
                  body: "Couples will trust you with what they have never told anyone. You will hold that with wisdom, discretion, and grace.",
                },
                {
                  headline: "The Clear Counselor",
                  body: "No more uncertainty in the room. You will counsel with clarity, confidence, and a compassion rooted in genuine skill.",
                },
                {
                  headline: "The Wise Authority",
                  body: "You will handle the most delicate marital issues \u2014 trauma, betrayal, financial crisis \u2014 with spiritual authority and structured methodology.",
                },
                {
                  headline: "The True Restorer",
                  body: "Not just words that comfort, but solutions that heal. You will guide couples from crisis to covenant renewal and lasting wholeness.",
                },
              ].map((card) => (
                <div
                  key={card.headline}
                  className="bg-white rounded-xl p-8 shadow-sm border-t-4"
                  style={{ borderColor: "#5B1A5D" }}
                >
                  <h3 className="font-playfair text-xl font-bold text-plum mb-4">{card.headline}</h3>
                  <p className="text-charcoal/70 leading-relaxed text-sm">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT YOU WILL LEARN ───────────────────────────────────── */}
        <section id="modules" className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto">

            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
                Curriculum
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-plum mb-4 leading-tight">
                What You Will Learn
              </h2>
              <p className="text-charcoal/70 text-lg mb-6">
                Your training combines biblical truth with practical tools you can use immediately.
                Seven foundational modules. One complete formation.
              </p>
              <div className="h-0.5 w-10" style={{ backgroundColor: "#C9A227" }} />
            </div>

            <div className="space-y-0 divide-y divide-charcoal/8">
              {modules.map((mod) => (
                <div
                  key={mod.number}
                  className="group flex gap-8 py-10 hover:bg-plum/[0.02] transition-colors duration-200 -mx-4 px-4"
                >
                  {/* Number */}
                  <div className="flex-shrink-0 w-16">
                    <span
                      className="font-playfair text-4xl font-bold leading-none"
                      style={{ color: "#C9A227" }}
                    >
                      {mod.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="font-playfair text-2xl font-bold text-plum mb-3 group-hover:text-plum transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-charcoal/65 leading-relaxed">{mod.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY JOIN THIS COHORT ──────────────────────────────────── */}
        <section
          className="py-24 px-4"
          style={{ background: "linear-gradient(160deg, #2a003a 0%, #1a000f 100%)" }}
        >
          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
                Why SMCC
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Why Join This Cohort?
              </h2>
              <div className="h-0.5 w-10 mx-auto" style={{ backgroundColor: "#C9A227" }} />
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-xl p-10 border border-white/10 hover:border-gold/30 transition-colors duration-300"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div className="w-8 h-0.5 mb-6" style={{ backgroundColor: "#C9A227" }} />
                  <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                    {pillar.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "rgba(232,213,234,0.65)" }}>
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="font-playfair text-2xl md:text-3xl font-bold italic text-white">
                &ldquo;Strong marriages build strong nations.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ── INVESTMENT ────────────────────────────────────────────── */}
        <section id="admissions" className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto">

            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
                Investment
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-plum mb-4 leading-tight">
                Investment in Your Calling
              </h2>
              <p className="text-charcoal/65 text-lg">
                This is more than a course. It is an investment in your ministry and your impact.
              </p>
              <div className="h-0.5 w-10 mx-auto mt-6" style={{ backgroundColor: "#C9A227" }} />
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">

              {/* Pricing card */}
              <div
                className="rounded-xl p-10 text-center shadow-xl border-t-4"
                style={{ backgroundColor: "#F6E8F0", borderColor: "#5B1A5D" }}
              >
                <p className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: "#5B1A5D" }}>
                  Cohort I
                </p>
                <p className="font-playfair text-6xl font-bold text-plum mb-2 leading-none">
                  50,000
                </p>
                <p className="text-charcoal/60 text-base mb-8">FCFA &nbsp;&middot;&nbsp; Per Cohort</p>

                <div className="border-t border-charcoal/15 my-8" />

                <ul className="text-left space-y-4 mb-10">
                  {[
                    "Full Cohort I curriculum — 7 foundational modules",
                    "Live cohort sessions with direct mentoring",
                    "Practical counseling tools and frameworks",
                    "Certificate of completion from SMCC",
                    "Access to the SMCC leader community",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#C9A227" }}>
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-charcoal/80 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/237671652144"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                  style={{ backgroundColor: "#C9A227", color: "#121212" }}
                >
                  Enroll Now via WhatsApp
                </a>

                {/* Manual payment option — always visible */}
                <div className="mt-6">
                  <ManualPaymentBlock />
                </div>
              </div>

              {/* Journey context */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-plum mb-4">
                    A Three-Cohort Journey
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed text-lg">
                    Cohort I is the foundation. Cohorts I through III take you from foundational
                    principles to advanced practice and full certification &mdash; each building on
                    the last, each deepening your capacity to restore.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { cohort: "Cohort I", label: "Foundations", desc: "Biblical roots, counseling fundamentals, and restoration frameworks." },
                    { cohort: "Cohort II", label: "Methodology", desc: "Advanced case work, specialized interventions, and supervised practice." },
                    { cohort: "Cohort III", label: "Mastery", desc: "Full certification, practicum completion, and professional positioning." },
                  ].map((c) => (
                    <div
                      key={c.cohort}
                      className="flex gap-5 p-5 rounded-lg border border-charcoal/10"
                    >
                      <div className="flex-shrink-0 text-center">
                        <p className="font-playfair text-sm font-bold text-plum">{c.cohort}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal text-sm mb-1">{c.label}</p>
                        <p className="text-charcoal/55 text-xs leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-lg p-6 border-l-4"
                  style={{ backgroundColor: "#F6E8F0", borderColor: "#C9A227" }}
                >
                  <p className="text-charcoal/80 text-sm leading-relaxed italic">
                    &ldquo;Limited seats are available for each cohort to ensure an intimate,
                    high-impact learning environment. Early enrollment is strongly encouraged.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STRONG CTA ────────────────────────────────────────────── */}
        <section
          className="py-28 px-4 relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #2a003a 0%, #5B1A5D 60%, #2a003a 100%)" }}
        >
          {/* Subtle pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(#C9A227 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div className="relative max-w-3xl mx-auto text-center">
            <span className="block h-px w-12 mx-auto mb-10" style={{ backgroundColor: "#C9A227" }} />

            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Lead with wisdom.<br />
              <span style={{ color: "#C9A227" }}>Restore with love.</span><br />
              Build legacy &mdash; one marriage at a time.
            </h2>

            <p className="text-lg leading-relaxed mb-12 max-w-xl mx-auto" style={{ color: "rgba(232,213,234,0.70)" }}>
              The couples who need you are already waiting. The next generation of marriage
              counselors must be trained with clarity, conviction, and competence.
              Step into your assignment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://wa.me/237671652144"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-semibold px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
                style={{ backgroundColor: "#C9A227", color: "#121212" }}
              >
                Enroll in Cohort I
              </a>
              <a
                href="#modules"
                className="inline-block font-semibold px-10 py-5 rounded-lg transition-all duration-300 border-2 text-white text-base hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.25)" }}
              >
                Review the Curriculum
              </a>
            </div>

            <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(201,162,39,0.6)" }}>
              Cohort I &nbsp;&middot;&nbsp; Limited Enrollment &nbsp;&middot;&nbsp; Seats Filling
            </p>
          </div>
        </section>

        {/* ── WHATSAPP ENROLLMENT CTA ───────────────────────────────── */}
        <section className="py-16 px-4" style={{ backgroundColor: "#0d0010" }}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-6" style={{ color: "#C9A227" }}>
              Enroll Today
            </p>
            <p className="text-white text-lg mb-2">
              Speak directly with our admissions team on WhatsApp
            </p>
            <p className="text-charcoal/50 text-sm mb-8">
              Questions about the program, payment, or enrollment process? We respond promptly.
            </p>
            <a
              href="https://wa.me/237671652144"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-bold text-2xl md:text-3xl transition-colors duration-200"
              style={{ color: "#C9A227" }}
            >
              <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              +237 671 652 144
            </a>
          </div>
        </section>

      </main>
      <Footer />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/237671652144"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </>
  );
}
