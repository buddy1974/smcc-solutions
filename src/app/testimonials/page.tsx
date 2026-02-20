import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials — SMCC",
  description:
    "Real transformation stories from SMCC participants across multiple countries. Marriage restoration, leadership growth, and purpose alignment.",
};

const stats = [
  { stat: "5+", label: "Countries Represented" },
  { stat: "12-Week", label: "Structured Cohort" },
  { stat: "Faith +", label: "Practical Framework" },
  { stat: "Certified", label: "Completion" },
];

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-plum to-plum/90 text-white pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Real Stories. Real Transformation.
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blush/90 max-w-3xl mx-auto">
              Marriage restoration, leadership growth, and purpose alignment &mdash; across continents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TrackedLink
                href="/cohort-1"
                event="Apply_Click"
                className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-center"
              >
                Apply Now
              </TrackedLink>
              <a
                href="/#contact"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 border border-white/30 hover:shadow-lg text-center"
              >
                Request Information
              </a>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((item) => (
                <div key={item.stat} className="flex flex-col items-center">
                  <p className="text-2xl md:text-3xl font-bold text-plum mb-1">{item.stat}</p>
                  <p className="text-charcoal/60 text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 px-4 bg-blush/30">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3 text-center" style={{ color: "#C9A227" }}>
              Student Voices
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-plum text-center mb-16 leading-tight">
              Transformed Lives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.slug}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Quote mark */}
                  <div className="text-4xl font-bold text-gold/30 leading-none mb-3 font-playfair">&ldquo;</div>

                  {/* Excerpt */}
                  <blockquote className="flex-1 text-charcoal/80 leading-relaxed mb-6 text-sm">
                    {t.excerpt}
                  </blockquote>

                  {/* Read full story */}
                  <a
                    href={`/testimonials/${t.slug}`}
                    className="text-sm font-semibold mb-5 text-plum hover:text-gold transition-colors"
                  >
                    Read Full Story →
                  </a>

                  {/* Attribution */}
                  <div className="border-t border-charcoal/10 pt-4">
                    <p className="font-bold text-plum">{t.name}</p>
                    <p className="text-charcoal/50 text-sm">{t.title}</p>
                    <p className="text-charcoal/40 text-xs mt-0.5">{t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-plum to-plum/90 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Begin Your Transformation?
            </h2>
            <p className="text-xl text-blush/90 mb-10 max-w-2xl mx-auto">
              Join leaders from across the globe who are building stronger marriages and transforming communities.
            </p>
            <TrackedLink
              href="/cohort-1"
              event="Apply_Click"
              className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-semibold px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Join Cohort I
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
