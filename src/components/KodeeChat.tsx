"use client";

import { useEffect, useRef, useState } from "react";
import {
  getStep,
  isEscalationTrigger,
  isUrgencyTrigger,
  GOOGLE_CALENDAR_URL,
} from "@/lib/kodeeLogic";
import { trackEvent } from "@/lib/track";

type Message = {
  from: "bot" | "user";
  text: string;
};

// Steps that render the "Schedule My Advisory Session" purple button
const SCHEDULE_STEPS = new Set(["human_escalation", "urgency_escalation"]);

// ── Scoring constants ──────────────────────────────────────────────────────
const CRISIS_KEYWORDS = ["divorce", "urgent", "separated", "crisis"];
const LEADERSHIP_KEYWORDS = ["leadership", "growth"];

// ── LocalStorage keys ─────────────────────────────────────────────────────
const LS_CHAT        = "delphi_chat";
const LS_LEAD        = "delphi_leadScore";
const LS_CRISIS      = "delphi_crisisScore";
const LS_STEP        = "delphi_stepId";

export default function KodeeChat() {
  const [open, setOpen] = useState(false);
  const [stepId, setStepId] = useState("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [started, setStarted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Hidden lead intelligence state ────────────────────────────────────────
  const [leadScore, setLeadScore] = useState(0);
  const [crisisScore, setCrisisScore] = useState(0);
  const [advisoryIntent, setAdvisoryIntent] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  // Prevent firing the lead export more than once per session
  const leadExportSent = useRef(false);

  // ── Restore session from localStorage on mount ────────────────────────────
  useEffect(() => {
    const savedChat   = localStorage.getItem(LS_CHAT);
    const savedLead   = localStorage.getItem(LS_LEAD);
    const savedCrisis = localStorage.getItem(LS_CRISIS);
    const savedStep   = localStorage.getItem(LS_STEP);

    if (savedChat) {
      setMessages(JSON.parse(savedChat));
      setStarted(true);
    }
    if (savedLead)   setLeadScore(Number(savedLead));
    if (savedCrisis) setCrisisScore(Number(savedCrisis));
    if (savedStep)   setStepId(savedStep);
  }, []);

  // ── Persist session to localStorage on every relevant state change ─────────
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(LS_CHAT, JSON.stringify(messages));
    }
    localStorage.setItem(LS_LEAD,   leadScore.toString());
    localStorage.setItem(LS_CRISIS, crisisScore.toString());
  }, [messages, leadScore, crisisScore]);

  useEffect(() => {
    localStorage.setItem(LS_STEP, stepId);
  }, [stepId]);

  // ── Scroll to bottom ──────────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, isThinking]);

  // ── Lead intelligence logging ─────────────────────────────────────────────
  useEffect(() => {
    if (interactionCount > 0) {
      console.log("Lead Score:", leadScore);
      console.log("Crisis Score:", crisisScore);
    }
  }, [leadScore, crisisScore, interactionCount]);

  // ── Engagement bonus: 3+ interactions ─────────────────────────────────────
  useEffect(() => {
    if (interactionCount === 3) {
      setLeadScore((prev) => prev + 10);
    }
  }, [interactionCount]);

  // ── Silent lead export when threshold crossed ─────────────────────────────
  useEffect(() => {
    if ((leadScore > 50 || advisoryIntent) && !leadExportSent.current) {
      leadExportSent.current = true;
      fetch("/api/delphi-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadScore,
          crisisScore,
          advisoryIntent,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => { /* silent — non-blocking */ });
    }
  }, [leadScore, crisisScore, advisoryIntent]);

  // ── Silent threshold: trigger auto-messages when thresholds are crossed ────
  function checkThresholds(
    newCrisisScore: number,
    newLeadScore: number,
    prevCrisisScore: number,
    prevLeadScore: number,
    addBotMessage: (text: string) => void
  ) {
    if (newCrisisScore >= 50 && prevCrisisScore < 50) {
      setTimeout(() => {
        addBotMessage(
          "This situation may require personal guidance.\n\nI recommend scheduling a private advisory session."
        );
        setStepId("urgency_escalation");
      }, 700);
    } else if (newLeadScore >= 50 && prevLeadScore < 50) {
      setTimeout(() => {
        addBotMessage(
          "Based on your interest, Cohort I may be a strong fit for you.\n\nWould you like to begin your enrollment?"
        );
      }, 700);
    }
  }

  function openChat() {
    if (!started) {
      const step = getStep("welcome");
      setMessages([{ from: "bot", text: step.message }]);
      setStarted(true);
      trackEvent("Delphi_Open");
    }
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 150);
  }

  // ── Option click with 600ms simulated thinking ────────────────────────────
  function handleOption(label: string, next: string) {
    setMessages((prev) => [...prev, { from: "user", text: label }]);
    setIsThinking(true);

    let scoreDelta = 0;
    const lowerLabel = label.toLowerCase();

    if (lowerLabel.includes("assess my situation")) scoreDelta = 10;
    if (lowerLabel.includes("apply")) scoreDelta = 25;
    if (lowerLabel.includes("human advisor") || lowerLabel.includes("speak to")) {
      scoreDelta = 40;
      setAdvisoryIntent(true);
    }
    if (LEADERSHIP_KEYWORDS.some((kw) => lowerLabel.includes(kw))) scoreDelta += 15;

    const prevLead   = leadScore;
    const prevCrisis = crisisScore;
    const newLead    = leadScore + scoreDelta;
    if (scoreDelta > 0) setLeadScore(newLead);
    setInteractionCount((prev) => prev + 1);

    setTimeout(() => {
      trackEvent("Delphi_Option", { choice: label });
      const step = getStep(next);
      setMessages((prev) => [...prev, { from: "bot", text: step.message }]);
      setStepId(next);
      setIsThinking(false);

      checkThresholds(prevCrisis, newLead, prevCrisis, prevLead, (text) => {
        setMessages((m) => [...m, { from: "bot", text }]);
      });
    }, 600);
  }

  // ── Text input with keyword detection ─────────────────────────────────────
  function handleTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = inputText.trim();
    if (!text || isThinking) return;
    setInputText("");

    const lower = text.toLowerCase();

    let scoreDelta  = 0;
    let crisisDelta = 0;

    if (CRISIS_KEYWORDS.some((kw) => lower.includes(kw))) crisisDelta = 50;
    if (LEADERSHIP_KEYWORDS.some((kw) => lower.includes(kw))) scoreDelta += 15;

    const prevLead   = leadScore;
    const prevCrisis = crisisScore;
    const newCrisis  = crisisScore + crisisDelta;
    const newLead    = leadScore + scoreDelta;

    if (crisisDelta > 0) setCrisisScore(newCrisis);
    if (scoreDelta > 0)  setLeadScore(newLead);
    setInteractionCount((prev) => prev + 1);

    if (isUrgencyTrigger(text)) {
      setMessages((prev) => [...prev, { from: "user", text }]);
      setIsThinking(true);
      setTimeout(() => {
        const step = getStep("urgency_escalation");
        setMessages((prev) => [...prev, { from: "bot", text: step.message }]);
        setStepId("urgency_escalation");
        trackEvent("Delphi_Urgency", { trigger: text });
        setIsThinking(false);
      }, 600);
      return;
    }

    if (isEscalationTrigger(text)) {
      setMessages((prev) => [...prev, { from: "user", text }]);
      setIsThinking(true);
      setTimeout(() => {
        const step = getStep("human_escalation");
        setMessages((prev) => [...prev, { from: "bot", text: step.message }]);
        setStepId("human_escalation");
        trackEvent("Delphi_Escalation_Keyword");
        setIsThinking(false);
      }, 600);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      {
        from: "bot",
        text: "Select one of the options below to continue, or type \"human\" to connect with a live advisor.",
      },
    ]);

    checkThresholds(newCrisis, newLead, prevCrisis, prevLead, (botText) => {
      setMessages((m) => [...m, { from: "bot", text: botText }]);
    });
  }

  // ── Schedule button click ──────────────────────────────────────────────────
  function handleScheduleClick() {
    console.log("Human escalation clicked");
    trackEvent("Delphi_Schedule_Click");
    window.open(GOOGLE_CALENDAR_URL, "_blank");
  }

  // ── Reset: clears localStorage + all state ────────────────────────────────
  function reset() {
    localStorage.removeItem(LS_CHAT);
    localStorage.removeItem(LS_LEAD);
    localStorage.removeItem(LS_CRISIS);
    localStorage.removeItem(LS_STEP);
    leadExportSent.current = false;

    const step = getStep("welcome");
    setMessages([{ from: "bot", text: step.message }]);
    setStepId("welcome");
    setIsThinking(false);
    setLeadScore(0);
    setCrisisScore(0);
    setAdvisoryIntent(false);
    setInteractionCount(0);
  }

  const currentStep    = getStep(stepId);
  const isScheduleStep = SCHEDULE_STEPS.has(currentStep.id);
  const isRecommendation = !!currentStep.recommendation;
  const showTextInput  = !isRecommendation;

  return (
    <>
      {/* ── Floating trigger ─────────────────────────────────────────── */}
      {!open && (
        <button
          type="button"
          onClick={openChat}
          aria-label="Open Delphi advisory assistant"
          className="fixed bottom-16 left-4 md:left-6 z-40 flex items-center gap-2 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-xl transition-all duration-200 hover:shadow-2xl hover:opacity-90"
          style={{ backgroundColor: "#5B1A5D" }}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <span>Delphi</span>
        </button>
      )}

      {/* ── Chat panel ───────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed bottom-16 left-4 md:left-6 z-40 flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white"
          style={{ width: "min(340px, calc(100vw - 2rem))", maxHeight: "540px" }}
        >
          {/* Header */}
          <div
            className="flex items-start justify-between px-5 py-4 flex-shrink-0"
            style={{ backgroundColor: "#5B1A5D" }}
          >
            <div>
              <p className="text-white font-bold text-sm">Delphi</p>
              <p className="text-xs" style={{ color: "rgba(246,232,240,0.65)" }}>
                SMCC Advisory Assistant &nbsp;&middot;&nbsp; Guiding you to the right path.
              </p>
            </div>
            <div className="flex items-center gap-3 ml-4 mt-0.5 flex-shrink-0">
              {/* Start New Conversation */}
              <button
                type="button"
                onClick={reset}
                aria-label="Start new conversation"
                className="text-white/35 hover:text-white/70 transition-colors text-[10px] leading-tight text-right"
              >
                New chat
              </button>
              {/* Close */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages + thinking indicator */}
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
                  className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-[85%] whitespace-pre-line"
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

            {/* Thinking dots */}
            {isThinking && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl px-4 py-3"
                  style={{ backgroundColor: "#fff", border: "1px solid rgba(91,26,93,0.12)", borderBottomLeftRadius: "4px" }}
                >
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "rgba(91,26,93,0.4)", animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "rgba(91,26,93,0.4)", animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "rgba(91,26,93,0.4)", animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Actions area */}
          <div className="bg-white border-t border-charcoal/10 px-4 py-4 flex-shrink-0">

            {/* ── Schedule button (human/urgency escalation) ────────── */}
            {isScheduleStep && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleScheduleClick}
                  className="w-full text-center text-sm px-4 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-100"
                  style={{ backgroundColor: "#5B1A5D" }}
                >
                  Schedule My Advisory Session
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="w-full text-center text-xs pt-1 text-charcoal/35 hover:text-charcoal/60 transition-colors"
                >
                  Start over
                </button>
              </div>
            )}

            {/* ── Branching options ────────────────────────────────── */}
            {!isScheduleStep && currentStep.options && (
              <div className="space-y-2">
                {currentStep.options.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    disabled={isThinking}
                    onClick={() => handleOption(opt.label, opt.next)}
                    className="w-full text-left text-sm px-4 py-2.5 rounded-xl border border-plum/20 text-plum hover:bg-plum hover:text-white hover:border-plum transition-all duration-150 font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-plum disabled:hover:border-plum/20"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* ── Terminal recommendation CTAs ─────────────────────── */}
            {isRecommendation && currentStep.recommendation && (
              <div className="space-y-2">
                {currentStep.recommendation.ctas.map((cta, i) =>
                  cta.external ? (
                    <button
                      key={cta.label}
                      type="button"
                      onClick={() => {
                        trackEvent("Delphi_CTA", { cta: cta.label });
                        console.log("Human escalation clicked");
                        window.open(cta.href, "_blank");
                      }}
                      className={`w-full text-center text-sm px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-100 ${
                        i === 0 ? "text-white hover:opacity-90" : "border border-plum/25 text-plum hover:bg-plum/5"
                      }`}
                      style={i === 0 ? { backgroundColor: "#5B1A5D" } : {}}
                    >
                      {cta.label}
                    </button>
                  ) : (
                    <a
                      key={cta.label}
                      href={cta.href}
                      onClick={() => trackEvent("Delphi_CTA", { cta: cta.label })}
                      className={`block w-full text-center text-sm px-4 py-2.5 rounded-xl font-semibold transition-colors ${
                        i === 0 ? "hover:opacity-90" : "border border-plum/25 text-plum hover:bg-plum/5"
                      }`}
                      style={i === 0 ? { backgroundColor: "#C9A227", color: "#121212" } : {}}
                    >
                      {cta.label}
                    </a>
                  )
                )}
                <button
                  type="button"
                  onClick={reset}
                  className="w-full text-center text-xs pt-1 text-charcoal/35 hover:text-charcoal/60 transition-colors"
                >
                  Start over
                </button>
              </div>
            )}

            {/* ── Free text input ───────────────────────────────────── */}
            {showTextInput && (
              <form onSubmit={handleTextSubmit} className="mt-3 pt-3 border-t border-charcoal/8 flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isThinking}
                  placeholder="Or type your question…"
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-charcoal/15 focus:outline-none focus:border-plum/30 bg-white text-charcoal placeholder-charcoal/30 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isThinking}
                  className="text-xs px-3 py-2 rounded-lg font-bold text-white transition-opacity hover:opacity-85 flex-shrink-0 disabled:opacity-40"
                  style={{ backgroundColor: "#5B1A5D" }}
                  aria-label="Send message"
                >
                  →
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}
