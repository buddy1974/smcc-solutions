/**
 * Shared in-memory event store — MVP only.
 * Resets on server restart / deploy.
 * Upgrade path: replace pushEvent() with a database write (Supabase, etc.)
 */

export type TrackEvent = {
  name: string;
  meta: Record<string, unknown>;
  timestamp: string;
};

const events: TrackEvent[] = [];

export function pushEvent(name: string, meta: Record<string, unknown> = {}): void {
  events.push({ name, meta, timestamp: new Date().toISOString() });
}

export function getEvents(): TrackEvent[] {
  return events;
}
