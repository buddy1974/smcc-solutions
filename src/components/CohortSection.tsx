/**
 * CohortSection — Reusable two-column section for any SMCC cohort.
 *
 * Pass any CohortProgram from src/data/programs.ts.
 * - status "enrolling"    → full layout with image, modules, and enrollment CTA
 * - status "coming-soon"  → compact teaser card with waitlist CTA
 * - status "completed"    → full layout with an "Enrollment Closed" badge
 *
 * imagePosition "left"  → image on left,  content on right
 * imagePosition "right" → content on left, image on right
 */

import Image from "next/image";
import { CohortProgram, formatFcfa } from "@/data/programs";

interface Props {
  program: CohortProgram;
  /** Optional override for section background */
  bg?: "white" | "blush";
}

// ── Badge shown on the image ─────────────────────────────────────────────────
function StatusBadge({ status }: { status: CohortProgram["status"] }) {
  if (status === "enrolling") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg"
        style={{ backgroundColor: "#C9A227", color: "#121212" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        Enrollment Open
      </span>
    );
  }
  if (status === "coming-soon") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/20 backdrop-blur-sm text-white border border-white/30">
        Coming Soon
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-charcoal/70 text-white/60">
      Enrollment Closed
    </span>
  );
}

// ── Compact teaser for coming-soon cohorts ────────────────────────────────────
function ComingSoonCard({ program }: { program: CohortProgram }) {
  return (
    <div
      className="rounded-2xl border border-charcoal/10 p-8 flex flex-col md:flex-row gap-8 items-start hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-playfair text-2xl font-bold text-white"
        style={{ backgroundColor: "#5B1A5D" }}>
        {program.cohortNumber}
      </div>
      <div className="flex-1">
        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#C9A227" }}>
          {program.tagline} &nbsp;&middot;&nbsp; Coming Soon
        </span>
        <h3 className="font-playfair text-2xl font-bold text-plum mb-2">{program.heading}</h3>
        <p className="text-charcoal/60 italic mb-4">{program.subheading}</p>
        <p className="text-charcoal/70 text-sm leading-relaxed mb-6">{program.description[0]}</p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`https://wa.me/${program.phoneWa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#5B1A5D", color: "#fff" }}
          >
            {program.ctaLabel}
          </a>
          <p className="text-xs text-charcoal/40">Call: {program.phoneDisplay}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function CohortSection({ program, bg = "white" }: Props) {
  if (program.status === "coming-soon") {
    return (
      <section className={`py-12 px-4 ${bg === "blush" ? "bg-blush" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto">
          <ComingSoonCard program={program} />
        </div>
      </section>
    );
  }

  // ── Full two-column layout (enrolling | completed) ─────────────────────────
  const imageCol = (
    <div className={`${program.imagePosition === "right" ? "md:order-2" : ""}`}>
      <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
        <Image
          src={program.image}
          alt={program.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Status badge overlay */}
        <div className="absolute top-4 left-4">
          <StatusBadge status={program.status} />
        </div>
      </div>

      {/* Cohort number accent below image */}
      <div className="flex items-center gap-4 mt-6 pl-1">
        <span
          className="font-playfair text-5xl font-bold leading-none"
          style={{ color: "#5B1A5D", opacity: 0.12 }}
        >
          {String(program.cohortNumber).padStart(2, "0")}
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "#C9A227", opacity: 0.3 }} />
      </div>
    </div>
  );

  const contentCol = (
    <div className={`flex flex-col justify-center ${program.imagePosition === "right" ? "md:order-1" : ""}`}>
      {/* Tagline */}
      <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#C9A227" }}>
        {program.tagline}
      </p>

      {/* Heading */}
      <h2 className="font-playfair text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-plum mb-2 leading-tight">
        {program.heading}
      </h2>
      <p className="font-playfair text-xl text-plum/60 italic mb-6">
        {program.subheading}
      </p>

      {/* Description paragraphs */}
      <div className="space-y-3 mb-8">
        {program.description.map((para, i) => (
          <p key={i} className="text-charcoal/75 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {/* Module list */}
      {program.modules.length > 0 && (
        <div className="mb-8">
          <h3 className="text-[10px] font-bold tracking-[0.25em] uppercase text-charcoal/40 mb-4">
            What You Will Learn
          </h3>
          <ul className="space-y-2.5">
            {program.modules.map((mod, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                  style={{ backgroundColor: "#5B1A5D", color: "#C9A227" }}
                >
                  {i + 1}
                </span>
                <span className="text-charcoal/80 text-sm leading-relaxed">{mod.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Structure note */}
      <div className="border-l-2 pl-4 mb-8" style={{ borderColor: "#C9A227" }}>
        <p className="text-xs text-charcoal/45 leading-relaxed">
          Program Structure: {program.structureNote}
        </p>
      </div>

      {/* Investment + CTA */}
      <div className="flex flex-wrap items-end gap-6 pt-2">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-charcoal/35 mb-1">
            Investment
          </p>
          <p className="font-playfair text-3xl font-bold text-plum leading-none">
            {formatFcfa(program.investmentFcfa)}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href={`https://wa.me/${program.phoneWa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm text-center"
            style={{ backgroundColor: "#C9A227", color: "#121212" }}
          >
            {program.ctaLabel}
          </a>
          <p className="text-xs text-charcoal/40 text-center">
            Call: {program.phoneDisplay}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className={`py-20 px-4 ${bg === "blush" ? "bg-blush" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {imageCol}
          {contentCol}
        </div>
      </div>
    </section>
  );
}
