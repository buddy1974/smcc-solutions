import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import CohortSection from "@/components/CohortSection";
import PillarsSection from "@/components/PillarsSection";
import ApplicationForm from "@/components/ApplicationForm";
import { COHORTS } from "@/data/programs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section id="home" className="relative bg-gradient-to-br from-plum to-plum/90 text-white pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-gold/20 backdrop-blur-sm rounded-full border border-gold/30">
              <span className="text-gold font-semibold text-sm tracking-wide">
                Now Enrolling — Cohort I &middot; April 2026
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              THE SCHOOL OF MARRIAGE COUNSELING &amp; COACHING
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blush/90 max-w-3xl mx-auto font-semibold">
              Thriving Marriages. Rising Families. Peaceful Nations.
            </p>
            <p className="text-lg mb-12 text-blush/70 max-w-2xl mx-auto">
              Marriage was designed for more than survival. SMCC equips counselors and coaches with the faith foundations, practical frameworks, and professional integrity to restore what was always meant to thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#admissions"
                className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Cohort I — Apply Now
              </a>
              <a
                href="#program"
                className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 border border-white/30"
              >
                Request Information
              </a>
            </div>
          </div>
        </section>

        {/* Credibility Strip */}
        <section className="py-12 px-4 bg-white/80">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <p className="text-charcoal font-semibold text-base md:text-lg">
                  Founded in Yaoundé, Cameroon
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-charcoal font-semibold text-base md:text-lg">
                  Faith-Based & Skill-Driven
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-charcoal font-semibold text-base md:text-lg">
                  Certificate of Completion Awarded
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-charcoal font-semibold text-base md:text-lg">
                  Cohort-Based 12-Week Intensive
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Programs ─────────────────────────────────────────────────── */}
        {/* Section header */}
        <div className="bg-white pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>
              Our Programs
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-plum mb-4 leading-tight">
              Training &amp; Transformation
            </h2>
            <div className="h-0.5 w-10" style={{ backgroundColor: "#C9A227" }} />
          </div>
        </div>

        {/* Cohort 1 — active */}
        <CohortSection program={COHORTS[0]} bg="white" />

        {/* 7 Pillars of Elevation */}
        <PillarsSection />

        {/* Cohort pathway — future cohorts teaser */}
        <section className="py-16 px-4 bg-blush">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3 text-center" style={{ color: "#5B1A5D" }}>
              Program Pathway
            </p>
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-plum text-center mb-2">
              Foundation to Advanced Certification
            </h3>
            <p className="text-charcoal/55 text-center text-sm mb-10 max-w-xl mx-auto">
              Cohorts 1&ndash;3 progress from foundational training through to full professional certification.
              Complete one cohort to unlock the next.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {COHORTS.map((c) => (
                <div
                  key={c.id}
                  className={`rounded-xl p-7 border transition-shadow duration-200 ${
                    c.status === "enrolling"
                      ? "bg-white shadow-lg border-plum/20 hover:shadow-xl"
                      : "bg-white/60 border-charcoal/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-playfair text-4xl font-bold leading-none"
                      style={{ color: c.status === "enrolling" ? "#5B1A5D" : "#5B1A5D", opacity: c.status === "enrolling" ? 1 : 0.25 }}
                    >
                      {String(c.cohortNumber).padStart(2, "0")}
                    </span>
                    {c.status === "enrolling" ? (
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "#C9A227", color: "#121212" }}>
                        Open
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-charcoal/10 text-charcoal/40">
                        Soon
                      </span>
                    )}
                  </div>
                  <h4 className="font-playfair text-lg font-bold text-plum mb-1">{c.heading}</h4>
                  <p className="text-charcoal/55 text-xs leading-relaxed">{c.subheading}</p>
                  {c.status === "enrolling" && (
                    <p className="text-xs font-semibold mt-3" style={{ color: "#C9A227" }}>
                      {c.date} &middot; {c.phoneDisplay}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Founders Section */}
        <section id="founders" className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>
                Leadership
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-plum mb-5 leading-tight">
                Visionary Leadership.<br className="hidden sm:block" /> Proven Impact.
              </h2>
              <p className="text-lg md:text-xl text-charcoal/65 max-w-2xl mx-auto">
                SMCC is led by leaders who bridge ministry, education, and global transformation.
              </p>
              <div className="h-0.5 w-10 mx-auto mt-6" style={{ backgroundColor: "#C9A227" }} />
            </div>

            {/* Founders photo */}
            <div className="mb-16">
              <Image
                src="/founders.jpg"
                alt="Founders of SMCC — Delphine and Rogers Nforgwei"
                width={1200}
                height={600}
                className="rounded-2xl shadow-xl w-full object-cover max-h-[480px]"
              />
            </div>

            {/* Founder profiles grid */}
            <div className="grid md:grid-cols-2 gap-10 mb-16">

              {/* Delphine */}
              <div className="bg-blush/20 rounded-2xl p-8 border border-plum/10">
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-plum mb-1">
                  Delphine Nforgwei
                </h3>
                <p className="text-sm font-semibold mb-5" style={{ color: "#C9A227" }}>
                  Pastor &nbsp;·&nbsp; Women&apos;s Impact Coach &nbsp;·&nbsp; Relationship Educator
                </p>
                <p className="text-charcoal/75 leading-relaxed mb-6">
                  Founder of SMCC and Blossom Life Academy, Delphine is a passionate leader of
                  the E-Woman Conference and a dedicated advocate for women&apos;s leadership and
                  marital transformation. She hosts international Zoom cohorts, empowering women
                  across continents to lead with purpose and build thriving marriages.
                </p>
                <ul className="space-y-2">
                  {[
                    "Founder, SMCC & Blossom Life Academy",
                    "International cohort host (Zoom-based global programs)",
                    "Women\u2019s leadership mentor",
                    "Marriage transformation advocate",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C9A227" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rogers */}
              <div className="bg-blush/20 rounded-2xl p-8 border border-plum/10">
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-plum mb-1">
                  Rogers Nforgwei
                </h3>
                <p className="text-sm font-semibold mb-5" style={{ color: "#C9A227" }}>
                  Pastor &nbsp;·&nbsp; Education Strategist &nbsp;·&nbsp; Business Development Leader
                </p>
                <p className="text-charcoal/75 leading-relaxed mb-6">
                  With executive education from Harvard Business School Online and a distinguished
                  career as former Business Development Manager (Africa) at Cambridge University
                  Press, Rogers brings academic rigor to ministry. As Founder of NMI Education and
                  President of DRIMP Foundation, he integrates strategic excellence with spiritual depth.
                </p>
                <ul className="space-y-2">
                  {[
                    "Education strategist",
                    "Executive education background (Harvard Business School Online)",
                    "Ministry & leadership development mentor",
                    "Founder, NMI Education",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C9A227" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Shared Vision Block */}
            <div className="bg-gradient-to-br from-plum/5 to-blush/30 rounded-2xl p-8 md:p-10 border border-plum/10">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-plum text-center mb-8">
                Our Shared Vision
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {[
                  "Impacted Marriages. Flourishing Nations.",
                  "Academic Rigor Meets Ministry",
                  "Spiritual & Practical Empowerment",
                  "Global Digital Accessibility",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-white/70 rounded-lg px-5 py-4">
                    <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full" style={{ backgroundColor: "#C9A227" }} />
                    <span className="text-charcoal/80 font-medium text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Books & Resources Section */}
        <section id="resources" className="py-20 px-4 bg-charcoal/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-plum mb-6">
              Books & Resources
            </h2>
            <p className="text-lg md:text-xl text-center text-charcoal/70 max-w-3xl mx-auto mb-12">
              Delphine Nforgwei has authored several books on marriage, relationships, and women&apos;s empowerment, available globally through Amazon and her official bookstore.
            </p>

            {/* Book Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
              {/* Book 1 */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
                <Image
                  src="/books/book-1.jpg"
                  alt="L'Épouse VIP"
                  width={300}
                  height={288}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-plum mb-2">L&apos;Épouse VIP</h3>
                  <p className="text-sm text-charcoal/70 mb-4">Sagesse divine pour l&apos;épouse du 21e siècle.</p>
                  <a
                    href="https://www.amazon.de/dp/B0DSWKLSW4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold/80 font-semibold text-sm"
                  >
                    View on Amazon →
                  </a>
                </div>
              </div>

              {/* Book 2 */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
                <Image
                  src="/books/book-2.jpg"
                  alt="My Bulletproof Marriage"
                  width={300}
                  height={288}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-plum mb-2">My Bulletproof Marriage</h3>
                  <p className="text-sm text-charcoal/70 mb-4">Practical strategies for building an unshakeable marriage.</p>
                  <a
                    href="https://www.amazon.de/dp/B0DSJFWJPR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold/80 font-semibold text-sm"
                  >
                    View on Amazon →
                  </a>
                </div>
              </div>

              {/* Book 3 */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
                <Image
                  src="/books/book-3.jpg"
                  alt="Everyday a Honeymoon"
                  width={300}
                  height={288}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-plum mb-2">Everyday a Honeymoon</h3>
                  <p className="text-sm text-charcoal/70 mb-4">Daily secrets to a stronger, happier marriage.</p>
                  <a
                    href="https://www.amazon.de/dp/B0DSHX1T37"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold/80 font-semibold text-sm"
                  >
                    View on Amazon →
                  </a>
                </div>
              </div>

              {/* Book 4 */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
                <Image
                  src="/books/book-4.jpg"
                  alt="The Attraction Code"
                  width={300}
                  height={288}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-plum mb-2">The Attraction Code</h3>
                  <p className="text-sm text-charcoal/70 mb-4">10 deep secrets to attract your dream partner.</p>
                  <a
                    href="https://www.amazon.de/dp/B0DSJFV8HN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold/80 font-semibold text-sm"
                  >
                    View on Amazon →
                  </a>
                </div>
              </div>

              {/* Book 5 */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
                <Image
                  src="/books/book-5.jpg"
                  alt="The VIP Wife"
                  width={300}
                  height={288}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-plum mb-2">The VIP Wife</h3>
                  <p className="text-sm text-charcoal/70 mb-4">Godly wisdom for the 21st-century wife.</p>
                  <a
                    href="https://www.amazon.de/dp/B0DSVXJ7X8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold/80 font-semibold text-sm"
                  >
                    View on Amazon →
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-charcoal/70 mb-6">
                Explore all publications and conference materials on Delphine&apos;s official website.
              </p>
              <a
                href="https://delphine-nforgwei.com/books"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold text-charcoal font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gold/90 transition"
              >
                Visit Official Bookstore
              </a>
            </div>
          </div>
        </section>

        {/* Marriage Crisis Section */}
        <section id="crisis" className="py-20 px-4 bg-charcoal/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-plum mb-8">
              The Marriage Crisis of Our Generation
            </h2>
            <p className="text-lg md:text-xl text-center text-charcoal/80 mb-16 max-w-3xl mx-auto">
              Marriages are under pressure. Families are hurting. Many desire help but don&apos;t know where to turn.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center px-6">
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-4">
                  Broken Trust
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Betrayal, emotional distance, and communication breakdown are tearing couples apart. The foundation of trust that marriage requires is crumbling in too many homes.
                </p>
              </div>
              <div className="text-center px-6">
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-4">
                  Hurting Families
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Children bear the weight of instability. Generational wounds are passed down. The ripple effect of broken marriages extends far beyond the couple.
                </p>
              </div>
              <div className="text-center px-6">
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-4">
                  Unprepared Counselors
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Passionate leaders want to help but lack structured training and proven tools. Good intentions alone cannot heal what is broken.
                </p>
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-center text-plum">
              SMCC exists to bridge this gap.
            </p>
          </div>
        </section>

        {/* The Bigger Question Section */}
        <section className="py-24 px-4 bg-blush/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center text-plum mb-8">
              The Bigger Question
            </h2>
            <p className="text-lg md:text-xl text-center text-charcoal/80 mb-16 max-w-3xl mx-auto leading-relaxed">
              If marriage is the foundation of society, what happens when that foundation weakens? The crisis is not merely emotional — it is cultural, spiritual, and generational.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {/* Left Column */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-plum mb-6">
                  A Spiritual Mandate
                </h3>
                <p className="text-lg text-charcoal/80 leading-relaxed">
                  We believe marriage was designed with divine intention. When biblical principles are misunderstood or neglected, families suffer. Restoration requires both spiritual clarity and practical competence.
                </p>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-plum mb-6">
                  A Cultural Responsibility
                </h3>
                <p className="text-lg text-charcoal/80 leading-relaxed">
                  A nation&apos;s future is shaped in its homes. Strong marriages create stable communities, responsible leadership, and generational legacy. The work of counseling is therefore not optional — it is strategic.
                </p>
              </div>
            </div>

            <p className="text-2xl md:text-3xl font-bold text-center text-plum">
              SMCC exists at the intersection of faith, structure, and transformation.
            </p>
          </div>
        </section>

        {/* SMCC Framework Section */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-plum mb-6">
              The SMCC Framework
            </h2>
            <p className="text-lg md:text-xl text-center text-charcoal/70 mb-20 max-w-3xl mx-auto">
              A structured pathway to restore marriages and equip confident counselors.
            </p>

            <div className="space-y-16">
              {/* Step 01 */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                <div className="flex-shrink-0">
                  <span className="text-6xl md:text-7xl font-bold text-gold">01</span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl md:text-4xl font-bold text-plum mb-4">
                    Alignment
                  </h3>
                  <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed">
                    Align relationships with divine purpose and shared vision.
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                <div className="flex-shrink-0">
                  <span className="text-6xl md:text-7xl font-bold text-gold">02</span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl md:text-4xl font-bold text-plum mb-4">
                    Restoration
                  </h3>
                  <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed">
                    Heal broken trust, rebuild communication, and restore emotional intimacy.
                  </p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                <div className="flex-shrink-0">
                  <span className="text-6xl md:text-7xl font-bold text-gold">03</span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl md:text-4xl font-bold text-plum mb-4">
                    Leadership
                  </h3>
                  <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed">
                    Equip counselors and coaches with ethical, practical, and biblically grounded frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Leaders Trust SMCC */}
        <section className="py-24 px-4 bg-charcoal/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-plum mb-6">
              Why Leaders Trust SMCC
            </h2>
            <p className="text-lg md:text-xl text-center text-charcoal/70 mb-16 max-w-3xl mx-auto leading-relaxed">
              SMCC is built on biblical conviction, structured methodology, and measurable transformation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-4">
                  Faith-Centered
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Every framework is grounded in biblical truth and spiritual accountability.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-4">
                  Structured Training
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Not inspiration alone — but practical systems, case simulations, and proven counseling tools.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-4">
                  Professional Integrity
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Certification, accountability, and excellence that builds long-term credibility.
                </p>
              </div>
            </div>

            <div className="border-t border-charcoal/10 my-8"></div>

            <blockquote className="text-center">
              <p className="text-2xl md:text-3xl italic text-plum/90 max-w-2xl mx-auto">
                &ldquo;Strong marriages build strong nations.&rdquo;
              </p>
            </blockquote>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-plum mb-16">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {/* FAQ 1 */}
              <div className="bg-white border border-charcoal/10 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold text-plum mb-3">
                  Who can enroll in SMCC?
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  SMCC is open to pastors, ministry leaders, aspiring marriage counselors, coaches, and Christian professionals committed to restoring families.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="bg-white border border-charcoal/10 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold text-plum mb-3">
                  What is the registration fee?
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  The investment for Cohort I is 50,000 FCFA per cohort. Payment instructions are provided by the admissions team after your application is reviewed.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="bg-white border border-charcoal/10 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold text-plum mb-3">
                  Is the training practical or theoretical?
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  SMCC combines biblical foundations with structured frameworks, case simulations, and practical counseling tools.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="bg-white border border-charcoal/10 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold text-plum mb-3">
                  Will I receive certification?
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Yes. Participants who complete the program requirements receive formal certification from SMCC.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="bg-white border border-charcoal/10 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold text-plum mb-3">
                  How do I begin?
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Click &ldquo;Start Your Application,&rdquo; complete the enrollment form, and follow the payment instructions provided.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="program" className="py-20 px-4 bg-blush">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-plum mb-12">
              Our Mission
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-plum/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-plum" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-plum mb-4">Restore</h3>
                <p className="text-charcoal/80">
                  We help couples rediscover the strength and beauty of their covenant relationship through biblical principles and practical tools.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-plum mb-4">Equip</h3>
                <p className="text-charcoal/80">
                  We train and certify marriage counselors and coaches with transformative skills rooted in God&apos;s word and proven methodologies.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-plum/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-plum" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-plum mb-4">Transform</h3>
                <p className="text-charcoal/80">
                  We create a ripple effect of healing that impacts families, communities, and generations to come.
                </p>
              </div>
            </div>

            {/* Program Framework Block */}
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-center text-plum mb-6">
                Program Framework
              </h3>
              <p className="text-lg text-center text-charcoal/80 mb-12 max-w-3xl mx-auto">
                Our curriculum combines biblical foundations with structured counseling methodology and supervised practical training.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                  <h4 className="text-2xl font-bold text-plum mb-4">
                    Biblical Foundations
                  </h4>
                  <p className="text-charcoal/80 leading-relaxed">
                    Marriage theology, covenant principles, reconciliation models, and spiritual leadership within the family.
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-plum mb-4">
                    Counseling Methodology
                  </h4>
                  <p className="text-charcoal/80 leading-relaxed">
                    Structured intake systems, assessment tools, communication repair frameworks, and conflict resolution models.
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-plum mb-4">
                    Practical Application
                  </h4>
                  <p className="text-charcoal/80 leading-relaxed">
                    Case simulations, supervised practice, ethical standards, and real-world coaching implementation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Structure */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-plum text-center mb-16">
              Program Structure
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-charcoal/5 p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-bold text-plum mb-4">
                  Foundation Phase
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  Biblical theology of marriage, covenant principles, identity in Christ, and spiritual leadership within counseling contexts. Students develop a theological framework that anchors all practical intervention.
                </p>
              </div>

              <div className="bg-charcoal/5 p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-bold text-plum mb-4">
                  Practical Training Phase
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  Structured counseling frameworks, case simulations, communication diagnostics, conflict resolution systems, and intervention tools. Students learn to apply theory through guided practice and scenario-based training.
                </p>
              </div>

              <div className="bg-charcoal/5 p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-bold text-plum mb-4">
                  Supervised Application
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  Live case supervision with experienced mentors, guided feedback sessions, ethical practice standards, and structured evaluation. Students integrate learning into real-world counseling scenarios.
                </p>
              </div>
            </div>

            <p className="text-xl md:text-2xl font-semibold text-center text-plum mt-16">
              Graduates leave equipped not only with knowledge — but with applied competence.
            </p>
          </div>
        </section>

        {/* Graduate Impact */}
        <section className="py-28 px-4 bg-charcoal/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-plum text-center mb-20">
              Graduate Impact
            </h2>

            <p className="text-lg text-charcoal/80 text-center max-w-3xl mx-auto mb-16">
              Our graduates do not merely complete a course. They step into structured impact.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-10 rounded-xl shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-plum mb-4">
                  Marriage Restoration
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  SMCC-trained counselors apply evidence-based frameworks and biblical principles to rebuild broken trust, resolve entrenched conflict, and restore covenant alignment in measurable, sustained outcomes.
                </p>
              </div>

              <div className="bg-white p-10 rounded-xl shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-plum mb-4">
                  Church & Community Leadership
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  Our graduates establish structured counseling ministries within local churches, train lay leaders, and build sustainable support systems that bring professional-level family care to entire communities.
                </p>
              </div>

              <div className="bg-white p-10 rounded-xl shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-plum mb-4">
                  Generational Transformation
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  By strengthening the family unit at its foundation, SMCC graduates break cycles of relational dysfunction, create environments where children flourish, and establish legacy patterns of covenant faithfulness.
                </p>
              </div>
            </div>

            <p className="text-2xl font-semibold text-plum text-center mt-16">
              Strong marriages build strong nations.
            </p>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-plum mb-6">
              Comprehensive Training Program
            </h2>
            <p className="text-xl text-charcoal/70 mb-12">
              Our intensive program combines theological depth, psychological insight, and practical application to prepare you for excellence in marriage counseling and coaching.
            </p>
            <div className="bg-gradient-to-br from-plum to-plum/90 text-white p-12 rounded-2xl shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">Cohort I — April 2026</h3>
              <p className="text-blush text-lg mb-8">
                Enrollment is now open. Apply today to secure your place in the inaugural cohort.
              </p>
              <a
                href="#admissions"
                className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Apply Now
              </a>
            </div>

            {/* Certification & Investment Block */}
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-center text-plum mb-6">
                Certification & Investment
              </h3>
              <p className="text-lg text-center text-charcoal/80 mb-12 max-w-2xl mx-auto">
                SMCC provides structured, professional training designed to equip you for real counseling impact. Certification is awarded upon successful completion of coursework and practical requirements.
              </p>

              <div className="bg-blush rounded-xl p-10 shadow-xl max-w-xl mx-auto text-center">
                <p className="text-4xl font-bold text-plum mb-2">
                  50,000 FCFA
                </p>
                <p className="text-charcoal/70 text-sm">
                  Investment per cohort. Payment instructions provided after application review.
                </p>

                <div className="my-6 border-t border-charcoal/20"></div>

                <ul className="text-charcoal/80 text-left space-y-2 mb-8">
                  <li>• Full program access</li>
                  <li>• Practical training & supervision</li>
                  <li>• Official SMCC certification</li>
                </ul>

                <a
                  href="#admissions"
                  className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Secure Your Seat
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Certification Program Structure */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-plum mb-6">
              Certification Program Structure
            </h2>
            <p className="text-lg md:text-xl text-center text-charcoal/70 mb-16 max-w-3xl mx-auto">
              A rigorous, practical, and spiritually grounded formation journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Module 1 */}
              <div className="rounded-lg border border-charcoal/10 p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-4">
                  Foundations of Marriage Theology
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Biblical worldview of covenant, identity, purpose, and divine alignment.
                </p>
              </div>

              {/* Module 2 */}
              <div className="rounded-lg border border-charcoal/10 p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-4">
                  Counseling Psychology & Emotional Intelligence
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Trauma awareness, attachment patterns, communication systems, and emotional regulation.
                </p>
              </div>

              {/* Module 3 */}
              <div className="rounded-lg border border-charcoal/10 p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-4">
                  Conflict Resolution & Restoration Systems
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Structured mediation frameworks, trust rebuilding models, reconciliation protocols.
                </p>
              </div>

              {/* Module 4 */}
              <div className="rounded-lg border border-charcoal/10 p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-4">
                  Coaching Practice & Ethics
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  Supervised sessions, case studies, ethical standards, and professional boundaries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Institutional Oversight */}
        <section className="py-24 px-4 bg-charcoal/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-plum mb-6">
              Leadership & Institutional Oversight
            </h2>
            <p className="text-lg md:text-xl text-center text-charcoal/70 mb-16 max-w-3xl mx-auto">
              Guided by experienced mentors, governed with integrity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
              {/* Academic Direction */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-6">
                  Academic Direction
                </h3>
                <p className="text-lg text-charcoal/70 leading-relaxed">
                  SMCC is led by seasoned marriage mentors, ministry leaders, and counseling practitioners committed to academic rigor and spiritual maturity. Our leadership brings decades of hands-on experience, theological depth, and a heart for seeing marriages restored and counselors equipped.
                </p>
              </div>

              {/* Ethical Governance */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-plum mb-6">
                  Ethical Governance
                </h3>
                <p className="text-lg text-charcoal/70 leading-relaxed">
                  We are committed to structured supervision, accountability, biblical integrity, and professional standards. Every aspect of our program is designed to uphold ethical excellence, ensuring that graduates serve with both competence and character.
                </p>
              </div>
            </div>

            <p className="text-2xl md:text-3xl font-bold text-center text-plum">
              SMCC is not an event. It is an institution.
            </p>
          </div>
        </section>

        {/* Program Investment Section */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-plum mb-8">
              Program Investment
            </h2>

            <p className="text-lg text-charcoal/80 mb-10 max-w-3xl mx-auto">
              This immersive 12-week training program equips you with practical counseling
              frameworks, biblical foundations, and professional integrity to restore marriages
              and strengthen families.
            </p>

            <div className="bg-blush p-10 rounded-xl shadow-xl mb-8">
              <p className="text-4xl font-bold text-plum mb-2">
                50,000 FCFA
              </p>
              <p className="text-charcoal/70">
                Investment per cohort. Payment instructions provided after application review.
              </p>
            </div>

            <p className="text-charcoal/70 mb-8">
              Limited seats available to ensure a focused and interactive cohort experience.
            </p>

            <a
              href="#admissions"
              className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-semibold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Apply Now — Cohort I
            </a>
          </div>
        </section>

        {/* Application Section */}
        {/* Tuition & Investment */}
        <section className="py-24 px-4 bg-charcoal/5">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-plum mb-10">
              Tuition & Investment
            </h2>
            <p className="text-lg text-charcoal/80 max-w-3xl mx-auto mb-16">
              Professional training requires structured investment. Our tuition reflects the depth, supervision, and certification standards of the program.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-xl mx-auto">
              <p className="uppercase tracking-wide text-sm text-charcoal/60 mb-4">
                Cohort I
              </p>
              <p className="text-5xl font-bold text-plum mb-4">
                50,000 FCFA
              </p>
              <p className="text-charcoal/70 mb-6">
                Investment per cohort
              </p>

              <div className="border-t border-charcoal/10 my-6"></div>

              <ul className="space-y-3 text-charcoal/80 text-left mb-8">
                <li>• Full curriculum access</li>
                <li>• Training materials</li>
                <li>• Supervised practical sessions</li>
                <li>• Certification upon completion</li>
              </ul>

              <a
                href="#admissions"
                className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-semibold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mt-8"
              >
                Secure Your Seat
              </a>
            </div>

            <p className="text-sm text-charcoal/60 mt-6">
              Limited seats available. Early application recommended.
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section id="admissions" className="py-28 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-plum text-center mb-8">
              Start Your Application
            </h2>

            <p className="text-charcoal/80 text-center mb-16">
              Complete the form below. Our admissions team will review your application and contact you via WhatsApp.
            </p>

            <ApplicationForm />
          </div>
        </section>

        {/* Testimonials Preview */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3 text-center" style={{ color: "#C9A227" }}>
              Student Stories
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-plum text-center mb-4 leading-tight">
              What People Are Saying
            </h2>
            <p className="text-charcoal/60 text-center mb-14 max-w-xl mx-auto">
              Voices from across the globe — real transformation through faith and practical tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Card 1 */}
              <div className="bg-blush/30 rounded-xl p-8 flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl font-bold text-gold/30 leading-none mb-3 font-playfair">&ldquo;</div>
                <blockquote className="flex-1 text-charcoal/80 leading-relaxed mb-6">
                  SMCC gave me tools I had never received in church or school. My communication with my husband shifted within weeks. The structure, the faith integration, and the coaching clarity were powerful.
                </blockquote>
                <div className="border-t border-charcoal/10 pt-4">
                  <p className="font-bold text-plum">Angela M.</p>
                  <p className="text-charcoal/50 text-sm">Canada</p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-blush/30 rounded-xl p-8 flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl font-bold text-gold/30 leading-none mb-3 font-playfair">&ldquo;</div>
                <blockquote className="flex-1 text-charcoal/80 leading-relaxed mb-6">
                  I came into the program broken and unsure about my marriage. Today, I lead small groups helping other women rebuild their homes. This was more than a course &mdash; it was restoration.
                </blockquote>
                <div className="border-t border-charcoal/10 pt-4">
                  <p className="font-bold text-plum">Judith N.</p>
                  <p className="text-charcoal/50 text-sm">Yaound&eacute;</p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="bg-blush/30 rounded-xl p-8 flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl font-bold text-gold/30 leading-none mb-3 font-playfair">&ldquo;</div>
                <blockquote className="flex-1 text-charcoal/80 leading-relaxed mb-6">
                  As a coach, I thought I knew relationship dynamics. SMCC expanded my framework and strengthened my spiritual leadership. I now integrate what I learned into my own consulting.
                </blockquote>
                <div className="border-t border-charcoal/10 pt-4">
                  <p className="font-bold text-plum">Grace T.</p>
                  <p className="text-charcoal/50 text-sm">Atlanta</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <a
                href="/testimonials"
                className="inline-block bg-plum hover:bg-plum/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Read More Testimonials
              </a>
            </div>
          </div>
        </section>

        {/* Why SMCC Is Different */}
        <section className="py-20 px-4 bg-charcoal/[0.03]">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3 text-center" style={{ color: "#C9A227" }}>
              Our Difference
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-plum text-center mb-4 leading-tight">
              Why SMCC Is Different
            </h2>
            <div className="h-0.5 w-10 mx-auto mb-14" style={{ backgroundColor: "#C9A227" }} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* 1 */}
              <div className="bg-white rounded-xl p-7 border border-charcoal/8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: "#F6E8F0" }}>
                  <svg className="w-6 h-6" fill="none" stroke="#5B1A5D" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-playfair text-lg font-bold text-plum mb-3">
                  Faith + Practical Framework
                </h3>
                <p className="text-charcoal/65 text-sm leading-relaxed">
                  Biblical principles combined with structured relationship tools.
                </p>
              </div>

              {/* 2 */}
              <div className="bg-white rounded-xl p-7 border border-charcoal/8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: "#F6E8F0" }}>
                  <svg className="w-6 h-6" fill="none" stroke="#5B1A5D" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-playfair text-lg font-bold text-plum mb-3">
                  Global Cohort Model
                </h3>
                <p className="text-charcoal/65 text-sm leading-relaxed">
                  Participants join from multiple countries, creating diverse learning perspectives.
                </p>
              </div>

              {/* 3 */}
              <div className="bg-white rounded-xl p-7 border border-charcoal/8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: "#F6E8F0" }}>
                  <svg className="w-6 h-6" fill="none" stroke="#5B1A5D" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-playfair text-lg font-bold text-plum mb-3">
                  Structured 12-Week Curriculum
                </h3>
                <p className="text-charcoal/65 text-sm leading-relaxed">
                  Step-by-step transformation pathway &mdash; not motivational talks.
                </p>
              </div>

              {/* 4 */}
              <div className="bg-white rounded-xl p-7 border border-charcoal/8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: "#F6E8F0" }}>
                  <svg className="w-6 h-6" fill="none" stroke="#5B1A5D" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-playfair text-lg font-bold text-plum mb-3">
                  Leadership Development Focus
                </h3>
                <p className="text-charcoal/65 text-sm leading-relaxed">
                  Graduates are equipped to mentor and support others.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Component */}
        <CTA />
      </main>
      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/237671652144"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-2xl">
        <div className="flex">
          <a
            href="#admissions"
            className="flex-1 bg-gold hover:bg-gold/90 text-charcoal font-semibold py-4 text-center transition-colors"
          >
            Cohort I &mdash; Apply Now
          </a>
          <a
            href="https://wa.me/237671652144"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 text-center flex items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
