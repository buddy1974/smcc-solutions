/**
 * Delphi bilingual copy — EN / FR
 * Used for all UI strings in the Delphi chat assistant.
 */

export type Lang = "en" | "fr";

type CopyKey =
  | "welcome"
  | "headerSubtitle"
  | "placeholder"
  | "scheduleBtn"
  | "startOver"
  | "newChat"
  | "thinking"
  | "errorReply"
  | "escalationMsg"
  | "urgencyMsg"
  | "fallbackMsg"
  | "enrollNudge"
  | "crisisNudge";

const copy: Record<Lang, Record<CopyKey, string>> = {
  en: {
    welcome:
      "Hello — I'm Delphi, your SMCC advisory assistant.\n\nI can help you:\n• Understand the program\n• Assess if this cohort fits your situation\n• Guide you toward the right next step\n• Connect you with a human advisor if needed\n\nHow can I assist you today?",
    headerSubtitle: "SMCC Advisory Assistant · Guiding you to the right path.",
    placeholder: "Or type your question…",
    scheduleBtn: "Schedule My Advisory Session",
    startOver: "Start over",
    newChat: "New chat",
    thinking: "Delphi is thinking…",
    errorReply:
      "I'm having trouble responding right now — you can still schedule an advisory session.",
    escalationMsg:
      "I'd be happy to connect you with a human advisor.\n\nYou can schedule a private advisory session at a time that works best for you below.",
    urgencyMsg:
      "It sounds like this may require personal guidance.\n\nI recommend scheduling a private advisory session so we can better understand your situation.",
    fallbackMsg:
      "Select one of the options below to continue, or type \"human\" to connect with a live advisor.",
    enrollNudge:
      "Based on your interest, Cohort I may be a strong fit for you.\n\nWould you like to begin your enrollment?",
    crisisNudge:
      "This situation may require personal guidance.\n\nI recommend scheduling a private advisory session.",
  },
  fr: {
    welcome:
      "Bonjour — Je suis Delphi, votre assistant SMCC.\n\nJe peux vous aider à :\n• Comprendre le programme\n• Évaluer si cette cohorte correspond à votre situation\n• Vous guider vers la prochaine étape\n• Vous connecter à un conseiller si nécessaire\n\nComment puis-je vous aider aujourd'hui ?",
    headerSubtitle: "Assistant SMCC · Vous guider vers la bonne voie.",
    placeholder: "Ou posez votre question…",
    scheduleBtn: "Planifier ma session de conseil",
    startOver: "Recommencer",
    newChat: "Nouvelle discussion",
    thinking: "Delphi réfléchit…",
    errorReply:
      "Je rencontre des difficultés à répondre — vous pouvez quand même planifier une session de conseil.",
    escalationMsg:
      "Je serais heureux(se) de vous mettre en contact avec un conseiller.\n\nVous pouvez planifier une session privée à l'heure qui vous convient.",
    urgencyMsg:
      "Cette situation semble nécessiter un accompagnement personnel.\n\nJe recommande de planifier une session de conseil privée.",
    fallbackMsg:
      "Sélectionnez une option ci-dessous ou tapez \"humain\" pour parler à un conseiller.",
    enrollNudge:
      "D'après votre intérêt, la Cohorte I pourrait vous correspondre.\n\nSouhaitez-vous commencer votre inscription ?",
    crisisNudge:
      "Cette situation peut nécessiter des conseils personnels.\n\nJe recommande de planifier une session de conseil privée.",
  },
};

export function t(lang: Lang, key: CopyKey): string {
  return copy[lang][key];
}

// ── Option button label translations ─────────────────────────────────────────
const optionLabels: Record<string, Record<Lang, string>> = {
  "Assess My Situation":            { en: "Assess My Situation",            fr: "Évaluer ma situation" },
  "Learn About the Program":        { en: "Learn About the Program",        fr: "En savoir plus sur le programme" },
  "Speak to a Human Advisor":       { en: "Speak to a Human Advisor",       fr: "Parler à un conseiller" },
  "A — Preparing for marriage":     { en: "A — Preparing for marriage",     fr: "A — Préparer le mariage" },
  "B — Experiencing conflict":      { en: "B — Experiencing conflict",      fr: "B — Vivre un conflit conjugal" },
  "C — Recovering from separation": { en: "C — Recovering from separation", fr: "C — Se remettre d'une séparation" },
  "D — Seeking leadership growth":  { en: "D — Seeking leadership growth",  fr: "D — Développer son leadership" },
};

export function tOption(lang: Lang, label: string): string {
  return optionLabels[label]?.[lang] ?? label;
}
