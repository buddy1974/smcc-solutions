import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const testimonials = [
  {
    name: "Angela M.",
    location: "Canada",
    quote:
      "SMCC gave me tools I had never received in church or school. My communication with my husband shifted within weeks. The structure, the faith integration, and the coaching clarity were powerful.",
  },
  {
    name: "Judith N.",
    location: "Yaoundé",
    quote:
      "I came into the program broken and unsure about my marriage. Today, I lead small groups helping other women rebuild their homes. This was more than a course — it was restoration.",
  },
  {
    name: "Grace T.",
    location: "Atlanta",
    quote:
      "As a coach, I thought I knew relationship dynamics. SMCC expanded my framework and strengthened my spiritual leadership. I now integrate what I learned into my own consulting.",
  },
  {
    name: "Samuel & Ruth",
    location: "Lagos",
    quote:
      "We almost separated. The mentorship and practical tools helped us rebuild trust. We now serve couples in our local church.",
  },
  {
    name: "Patience A.",
    location: "Douala",
    quote:
      "The conflict resolution tools alone changed our home. But the spiritual clarity gave me the strength to lead with wisdom instead of emotion.",
  },
  {
    name: "Nadine K.",
    location: "Paris",
    quote:
      "This was the first program that connected faith, emotional healing, and practical steps in a way I could apply immediately.",
  },
];

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
              <a
                href="/cohort-1"
                className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Apply Now
              </a>
              <a
                href="/#contact"
                className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 border border-white/30 hover:shadow-lg"
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
                  key={t.name}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Quote mark */}
                  <div className="text-4xl font-bold text-gold/30 leading-none mb-3 font-playfair">&ldquo;</div>
                  <blockquote className="flex-1 text-charcoal/80 leading-relaxed mb-6">
                    {t.quote}
                  </blockquote>
                  <div className="border-t border-charcoal/10 pt-4">
                    <p className="font-bold text-plum">{t.name}</p>
                    <p className="text-charcoal/50 text-sm">{t.location}</p>
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
            <a
              href="/cohort-1"
              className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-semibold px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Join Cohort I
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
