"use client";

import { useEffect, useRef, useState } from "react";
import { getStep } from "@/lib/kodeeLogic";
import { trackEvent } from "@/lib/track";

type Message = {
  from: "bot" | "user";
  text: string;
};

export default function KodeeChat() {
  const [open, setOpen] = useState(false);
  const [stepId, setStepId] = useState("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  function openChat() {
    if (!started) {
      const step = getStep("welcome");
      setMessages([{ from: "bot", text: step.message }]);
      setStarted(true);
      trackEvent("Kodee_Open");
    }
    setOpen(true);
  }

  function handleOption(label: string, next: string) {
    trackEvent("Kodee_Option", { choice: label });
    const step = getStep(next);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: label },
      { from: "bot", text: step.message },
    ]);
    setStepId(next);
  }

  function reset() {
    const step = getStep("welcome");
    setMessages([{ from: "bot", text: step.message }]);
    setStepId("welcome");
  }

  const currentStep = getStep(stepId);

  return (
    <>
      {/* ── Floating trigger button ───────────────────────────────────── */}
      {!open && (
        <button
          type="button"
          onClick={openChat}
          aria-label="Open Kodee enrollment assistant"
          className="fixed bottom-16 left-4 md:left-6 z-40 flex items-center gap-2 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-xl transition-all duration-200 hover:shadow-2xl hover:opacity-90"
          style={{ backgroundColor: "#5B1A5D" }}
        >
          {/* Chat bubble icon */}
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <span>Kodee</span>
        </button>
      )}

      {/* ── Chat panel ───────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed bottom-16 left-4 md:left-6 z-40 flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white"
          style={{ width: "min(340px, calc(100vw - 2rem))", maxHeight: "500px" }}
        >
          {/* Header */}
          <div
            className="flex items-start justify-between px-5 py-4 flex-shrink-0"
            style={{ backgroundColor: "#5B1A5D" }}
          >
            <div>
              <p className="text-white font-bold text-sm">Kodee</p>
              <p className="text-xs" style={{ color: "rgba(246,232,240,0.65)" }}>
                Intelligent Enrollment Assistant &nbsp;&middot;&nbsp; Guiding you to the right path.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/40 hover:text-white transition-colors ml-4 mt-0.5 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ minHeight: "160px", backgroundColor: "#fafafa" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-[85%]"
                  style={
                    msg.from === "user"
                      ? { backgroundColor: "#F6E8F0", color: "#121212", borderBottomRightRadius: "4px" }
                      : { backgroundColor: "#fff", color: "#121212", border: "1px solid rgba(91,26,93,0.12)", borderBottomLeftRadius: "4px" }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Options / CTAs */}
          <div className="bg-white border-t border-charcoal/10 px-4 py-4 flex-shrink-0">

            {/* Branching options */}
            {currentStep.options && (
              <div className="space-y-2">
                {currentStep.options.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleOption(opt.label, opt.next)}
                    className="w-full text-left text-sm px-4 py-2.5 rounded-xl border border-plum/20 text-plum hover:bg-plum hover:text-white hover:border-plum transition-all duration-150 font-medium"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Terminal recommendation CTAs */}
            {currentStep.recommendation && (
              <div className="space-y-2">
                {currentStep.recommendation.ctas.map((cta, i) => (
                  <a
                    key={cta.label}
                    href={cta.href}
                    onClick={() => trackEvent("Kodee_CTA", { cta: cta.label })}
                    className={`block w-full text-center text-sm px-4 py-2.5 rounded-xl font-semibold transition-colors ${
                      i === 0
                        ? "hover:opacity-90"
                        : "border border-plum/25 text-plum hover:bg-plum/5"
                    }`}
                    style={i === 0 ? { backgroundColor: "#C9A227", color: "#121212" } : {}}
                  >
                    {cta.label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={reset}
                  className="w-full text-center text-xs pt-1 text-charcoal/35 hover:text-charcoal/60 transition-colors"
                >
                  Start over
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
