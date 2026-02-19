/**
 * SMCC Event Tracking Utility
 *
 * Currently logs events to console.
 * Future: wire into Vercel Analytics custom events or other analytics providers.
 *
 * Usage:
 *   import { trackEvent } from "@/lib/track";
 *   trackEvent("Apply_Click");
 */

export function trackEvent(event: string, properties?: Record<string, string>) {
  console.log("[SMCC Track]", event, properties ?? "");

  // Future hook: window.va?.("event", { name: event, ...properties });
}
