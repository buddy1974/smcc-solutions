/**
 * PillarsSection — The 7 Pillars of Elevation program section.
 *
 * Two-column layout (content left, image right).
 * Data driven from src/data/programs.ts — update there, not here.
 */

import Image from "next/image";
import { SEVEN_PILLARS, PILLARS_PROGRAM } from "@/data/programs";

export default function PillarsSection() {
  const program = PILLARS_PROGRAM;

  const contentCol = (
    <div className="flex flex-col justify-center">
      {/* Tagline */}
      <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#C9A227" }}>
        {program.tagline}
      </p>

      {/* Heading */}
      <h2 className="font-playfair text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-white mb-2 leading-tight">
        {program.heading}
      </h2>
      <p className="font-playfair text-xl text-white/50 italic mb-6">
        {program.subheading}
      </p>

      {/* Intro */}
      <div className="mb-8 space-y-2">
        <p className="text-white/75 leading-relaxed">
          You&apos;ve gained knowledge. But life hasn&apos;t shifted at its core.
        </p>
        <p className="text-white/55 leading-relaxed italic">
          Because no one rebuilt the whole you.
        </p>
        <p className="text-white/75 leading-relaxed">
          This program addresses leadership, identity, finances, communication, relationships,
          and spiritual alignment &mdash; in one structured journey.
        </p>
      </div>

      {/* 7 Pillars list */}
      <div className="mb-8">
        <h3 className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4"
          style={{ color: "rgba(201,162,39,0.55)" }}>
          The 7 Pillars
        </h3>
        <ul className="space-y-2.5">
          {SEVEN_PILLARS.map((pillar) => (
            <li key={pillar.number} className="flex items-center gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: "rgba(201,162,39,0.15)", color: "#C9A227", border: "1px solid rgba(201,162,39,0.3)" }}
              >
                {pillar.number}
              </span>
              <span className="text-white/80 text-sm leading-relaxed">{pillar.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What&apos;s included */}
      <div className="mb-8">
        <h3 className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4"
          style={{ color: "rgba(201,162,39,0.55)" }}>
          What This Program Includes
        </h3>
        <ul className="space-y-2">
          {program.includes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <svg className="flex-shrink-0 w-4 h-4 mt-0.5" style={{ color: "#C9A227" }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/70 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="pt-2">
        <a
          href="/payment?source=homepage"
          className="inline-block font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-sm"
          style={{ backgroundColor: "#C9A227", color: "#121212" }}
        >
          {program.ctaLabel}
        </a>
      </div>
    </div>
  );

  const imageCol = (
    <div>
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"
      >
        <Image
          src={program.image}
          alt={program.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Subtle gradient overlay on image */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(18,18,18,0.4) 0%, transparent 60%)" }}
        />
      </div>

      {/* Program badge below image */}
      <div
        className="mt-5 rounded-xl p-5 flex items-center gap-4 border"
        style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(201,162,39,0.2)" }}
      >
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs"
          style={{ backgroundColor: "rgba(201,162,39,0.15)", color: "#C9A227" }}
        >
          7P
        </div>
        <div>
          <p className="text-white/80 text-sm font-semibold">14 Weeks &middot; Structured Transformation</p>
          <p className="text-white/35 text-xs">Leadership &middot; Identity &middot; Purpose</p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="py-20 px-4"
      style={{ background: "linear-gradient(160deg, #0d0010 0%, #1a000f 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {contentCol}
          {imageCol}
        </div>
      </div>
    </section>
  );
}
