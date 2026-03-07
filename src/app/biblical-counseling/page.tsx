import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Biblical Counseling | Scripture-Rooted Marriage Counseling Training — SMCC",
  description:
    "SMCC's curriculum is built on biblical counseling principles — equipping counselors to guide couples using Scripture-rooted frameworks that address the heart, not just behavior.",
  openGraph: {
    title: "Biblical Counseling | Scripture-Rooted Marriage Counseling Training — SMCC",
    description:
      "SMCC's curriculum is built on biblical counseling principles — equipping counselors to guide couples using Scripture-rooted frameworks that address the heart, not just behavior.",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "SMCC Biblical Counseling" }],
  },
};

export default function BiblicalCounselingPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section
          className="pt-36 pb-24 px-4 text-center"
          style={{ background: "linear-gradient(160deg, #0d0010 0%, #2a003a 60%, #1a000f 100%)" }}
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
              Biblical Counseling
            </p>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Counsel From the Word — With Wisdom and Authority
            </h1>
            <p className="text-xl mb-10" style={{ color: "rgba(232,213,234,0.70)" }}>
              True counseling does not just address behavior — it reaches the heart. SMCC trains counselors in the art of biblical counseling: guiding individuals and couples toward transformation through the timeless truth of Scripture.
            </p>
            <a
              href="/payment?source=seo-biblical-counseling"
              className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
              style={{ backgroundColor: "#C9A227", color: "#121212" }}
            >
              Explore the SMCC Curriculum
            </a>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto space-y-12">

            <div>
              <h2 className="font-playfair text-3xl font-bold text-plum mb-4">
                What Is Biblical Counseling?
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                Biblical counseling is a practice rooted in the conviction that Scripture is sufficient to address the deepest struggles of human life — including broken marriages, unresolved conflict, emotional wounds, and relational dysfunction. It does not replace clinical insight; rather, it provides the moral and spiritual framework within which all human experience must be understood. A biblical counselor helps people not just to manage their problems, but to encounter the One who redeems them.
              </p>
            </div>

            <div>
              <h2 className="font-playfair text-3xl font-bold text-plum mb-4">
                How to Counsel Couples Biblically
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                Counseling couples biblically means understanding the divine blueprint for marriage — covenant, sacrificial love, mutual submission, and spiritual unity — and helping couples return to it from wherever they have drifted. It means asking not just &ldquo;what happened?&rdquo; but &ldquo;what does God say about this?&rdquo; and &ldquo;how does this situation call us toward repentance, forgiveness, and renewal?&rdquo; SMCC trains counselors to hold both the pastoral warmth and the theological clarity that biblical counseling requires.
              </p>
            </div>

            <div>
              <h2 className="font-playfair text-3xl font-bold text-plum mb-4">
                SMCC&apos;s Scripture-Rooted Curriculum
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed mb-6">
                Every module in the SMCC curriculum is anchored in biblical truth. From the foundational theology of marriage in Cohort I to the advanced restoration frameworks of Cohort III, you will never be asked to choose between your faith and your methodology — because at SMCC, they are inseparable. Our training integrates Scripture with practical counseling tools to produce counselors who are both doctrinally sound and clinically effective.
              </p>
              <ul className="space-y-3">
                {[
                  "God's design for marriage — covenant, purpose, and spiritual unity",
                  "Premarital counseling grounded in biblical expectations",
                  "Healing from trauma through both Scripture and structured methodology",
                  "Communication and conflict frameworks drawn from biblical principles",
                  "Step-by-step restoration anchored in covenant theology",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#C9A227" }}
                    />
                    <span className="text-charcoal/75 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-playfair text-3xl font-bold text-plum mb-4">
                The Biblical Foundation of SMCC
              </h2>
              <p className="text-charcoal/75 text-lg leading-relaxed">
                SMCC was founded on the conviction that strong marriages build strong nations — and that the church is uniquely positioned to be the most powerful counseling institution in the world when it is properly equipped. Our training exists to give the body of Christ the tools, the theology, and the professional credibility to lead the way in restoring families and healing communities.
              </p>
            </div>

            {/* Internal links + CTA */}
            <div
              className="rounded-xl p-8 border-l-4 text-center"
              style={{ backgroundColor: "#F6E8F0", borderColor: "#5B1A5D" }}
            >
              <p className="font-playfair text-xl font-bold text-plum mb-4">
                Ready to go deeper in biblical counseling?
              </p>
              <p className="text-charcoal/70 mb-6">
                Explore the full curriculum at{" "}
                <a href="/cohort-1" className="text-plum font-semibold underline">
                  SMCC Cohort I
                </a>
                {", "}learn about our{" "}
                <a href="/marriage-restoration" className="text-plum font-semibold underline">
                  marriage restoration program
                </a>
                , or take the{" "}
                <a href="/assessment" className="text-plum font-semibold underline">
                  free marriage health assessment
                </a>
                .
              </p>
              <a
                href="/payment?source=seo-biblical-counseling"
                className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-base"
                style={{ backgroundColor: "#C9A227", color: "#121212" }}
              >
                Explore the SMCC Curriculum
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
