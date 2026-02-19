"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/track";

interface AssessmentResult {
  score: number;
  level: "foundational" | "developing" | "strong";
  summary: string;
  recommendation: string;
}

const questions = [
  {
    id: 1,
    text: "How well do you and your spouse communicate during moments of stress or conflict?",
    low: "Poorly",
    high: "Very well",
  },
  {
    id: 2,
    text: "How effectively do you resolve disagreements without lasting resentment?",
    low: "Rarely",
    high: "Consistently",
  },
  {
    id: 3,
    text: "How aligned are you and your spouse in core values, faith, and life vision?",
    low: "Rarely aligned",
    high: "Deeply aligned",
  },
  {
    id: 4,
    text: "How well do you support each other's emotional needs and personal growth?",
    low: "Struggle to",
    high: "Very well",
  },
  {
    id: 5,
    text: "How confident are you in your marriage's direction and shared future goals?",
    low: "Not confident",
    high: "Very confident",
  },
];

const levelColors = {
  foundational: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-800",
  },
  developing: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-800",
  },
  strong: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800",
  },
};

const levelLabels = {
  foundational: "Foundational Work Needed",
  developing: "Structured Coaching Beneficial",
  strong: "Strong Foundation",
};

export default function AssessmentForm() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allAnswered = answers.every((a) => a !== null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allAnswered) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data: AssessmentResult = await res.json();
      trackEvent("Assessment_Submit", { level: data.level });
      setResult(data);
      setTimeout(() => {
        document
          .getElementById("assessment-result")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    const colors = levelColors[result.level];
    return (
      <div
        id="assessment-result"
        className={`rounded-2xl border-2 ${colors.bg} ${colors.border} p-8 md:p-12`}
      >
        {/* Score */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4 text-charcoal/50">
            Your Result
          </p>
          <div className="font-playfair text-7xl font-bold text-plum mb-3">
            {result.score}
            <span className="text-3xl text-charcoal/40"> / 25</span>
          </div>
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${colors.badge}`}
          >
            {levelLabels[result.level]}
          </span>
        </div>

        {/* Summary */}
        <div className="mb-8">
          <h2 className="font-playfair text-xl font-bold text-plum mb-3">
            What This Means
          </h2>
          <p className="text-charcoal/80 leading-relaxed">{result.summary}</p>
        </div>

        {/* Recommendation */}
        <div className="bg-plum/5 border border-plum/15 rounded-xl p-6 mb-10">
          <h2 className="font-playfair text-xl font-bold text-plum mb-3">
            Recommended Next Step
          </h2>
          <p className="text-charcoal/80 leading-relaxed">
            {result.recommendation}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/cohort-1"
            onClick={() => trackEvent("Apply_Click", { source: "assessment_result" })}
            className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
          >
            Apply to Cohort I
          </a>
          <button
            type="button"
            onClick={() => {
              setResult(null);
              setAnswers(Array(5).fill(null));
            }}
            className="w-full sm:w-auto bg-white hover:bg-charcoal/5 text-charcoal font-semibold px-8 py-4 rounded-lg transition-all duration-300 border border-charcoal/20 text-center"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((q, idx) => (
        <div
          key={q.id}
          className="bg-white rounded-xl border border-charcoal/10 p-6 md:p-8 shadow-sm"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2 text-plum/50">
            Question {idx + 1} of 5
          </p>
          <p className="text-lg font-medium text-charcoal mb-6 leading-snug">
            {q.text}
          </p>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-xs text-charcoal/50 w-16 text-right shrink-0 hidden sm:block">
              {q.low}
            </span>
            <div className="flex gap-2 md:gap-3 flex-1 justify-center">
              {[1, 2, 3, 4, 5].map((val) => (
                <label
                  key={val}
                  className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={val}
                    checked={answers[idx] === val}
                    onChange={() => {
                      const next = [...answers];
                      next[idx] = val;
                      setAnswers(next);
                    }}
                    className="sr-only"
                  />
                  <span
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-200 select-none ${
                      answers[idx] === val
                        ? "bg-plum border-plum text-white scale-110 shadow-md"
                        : "border-charcoal/20 text-charcoal/50 group-hover:border-plum/50 group-hover:text-plum"
                    }`}
                  >
                    {val}
                  </span>
                </label>
              ))}
            </div>
            <span className="text-xs text-charcoal/50 w-16 shrink-0 hidden sm:block">
              {q.high}
            </span>
          </div>
          {/* Mobile labels */}
          <div className="flex justify-between mt-3 sm:hidden px-2">
            <span className="text-xs text-charcoal/40">{q.low}</span>
            <span className="text-xs text-charcoal/40">{q.high}</span>
          </div>
        </div>
      ))}

      {error && (
        <p className="text-center text-red-600 text-sm font-medium">{error}</p>
      )}

      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={!allAnswered || loading}
          className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-charcoal font-semibold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          {loading ? "Generating Your Report…" : "Get My Personalised Report"}
        </button>
        {!allAnswered && (
          <p className="text-charcoal/40 text-sm mt-3">
            Answer all 5 questions to continue
          </p>
        )}
      </div>
    </form>
  );
}
