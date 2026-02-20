import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { testimonials, getTestimonialBySlug } from "@/lib/testimonials";

// Pre-render all known slugs at build time
export function generateStaticParams() {
  return testimonials.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const testimonial = getTestimonialBySlug(params.slug);
  if (!testimonial) return {};
  return {
    title: `${testimonial.name} — SMCC`,
    description: testimonial.excerpt,
  };
}

export default function TestimonialDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const testimonial = getTestimonialBySlug(params.slug);
  if (!testimonial) notFound();

  const paragraphs = testimonial.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero header */}
        <section className="bg-gradient-to-br from-plum to-plum/90 pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-5"
              style={{ color: "#C9A227" }}
            >
              Transformation Story
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {testimonial.name}
            </h1>
            <p className="text-blush/80 text-base mb-1">{testimonial.title}</p>
            <p className="text-blush/55 text-sm">{testimonial.location}</p>
          </div>
        </section>

        {/* Full story */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-2xl mx-auto">

            {/* Opening quote mark */}
            <div
              className="font-playfair text-7xl leading-none mb-6"
              style={{ color: "rgba(91,26,93,0.12)" }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Content paragraphs */}
            <div className="space-y-6">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-charcoal/80 leading-[1.85] text-base md:text-lg"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Attribution */}
            <div
              className="mt-12 pt-8 border-t flex flex-col gap-0.5"
              style={{ borderColor: "rgba(91,26,93,0.12)" }}
            >
              <p className="font-bold text-plum text-lg">{testimonial.name}</p>
              <p className="text-charcoal/60 text-sm">{testimonial.title}</p>
              <p className="text-charcoal/40 text-xs">{testimonial.location}</p>
            </div>

            {/* Back link */}
            <div className="mt-12">
              <a
                href="/testimonials"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: "#5B1A5D" }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Testimonials
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blush/30">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A227" }}>
              Your Story Could Be Next
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-plum mb-6 leading-tight">
              Ready to Begin?
            </h2>
            <p className="text-charcoal/65 mb-8 leading-relaxed">
              Cohort I begins April 2026. Seats are limited.
            </p>
            <a
              href="/cohort-1"
              className="inline-block font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg text-charcoal"
              style={{ backgroundColor: "#C9A227" }}
            >
              Apply to Cohort I
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
