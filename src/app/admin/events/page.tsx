"use client";

import { useEffect, useState } from "react";

type TrackEvent = {
  name: string;
  meta: Record<string, unknown>;
  timestamp: string;
};

const EVENT_LABELS: Record<string, string> = {
  delphi_opened:          "Delphi Opened",
  assessment_started:     "Assessment Started",
  assessment_completed:   "Assessment Completed",
  advisory_clicked:       "Advisory Clicked",
  advisory_booked:        "Advisory Booked",
  apply_clicked:          "Apply Clicked",
  lead_score_high:        "Lead Score High",
  crisis_detected:        "Crisis Detected",
  application_submitted:  "Application Submitted",
};

const EVENT_COLORS: Record<string, { bg: string; color: string }> = {
  crisis_detected:        { bg: "#fff0f0", color: "#c00" },
  advisory_booked:        { bg: "#edf7ed", color: "#2d7a2d" },
  application_submitted:  { bg: "#edf7ed", color: "#2d7a2d" },
  lead_score_high:        { bg: "#F6E8F0", color: "#5B1A5D" },
  advisory_clicked:       { bg: "#F6E8F0", color: "#5B1A5D" },
};

function defaultBadge() {
  return { bg: "#f0f0f0", color: "#555" };
}

export default function AdminEventsPage() {
  const [events, setEvents]   = useState<TrackEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/track-event")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<TrackEvent[]>;
      })
      .then((data) => setEvents(data))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
    } catch {
      return iso;
    }
  }

  function formatMeta(meta: Record<string, unknown>) {
    const entries = Object.entries(meta);
    if (entries.length === 0) return <span style={{ color: "#ccc" }}>—</span>;
    return (
      <span style={{ fontFamily: "monospace", fontSize: 11, color: "#666" }}>
        {entries.map(([k, v]) => `${k}: ${String(v)}`).join(" · ")}
      </span>
    );
  }

  const byName = (name: string) => events.filter((e) => e.name === name).length;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", backgroundColor: "#f8f8f8", color: "#121212" }}>

      {/* Header */}
      <div style={{ backgroundColor: "#5B1A5D", padding: "20px 32px" }}>
        <p style={{ color: "#C9A227", fontWeight: 700, fontSize: 18, margin: 0 }}>SMCC — Event Dashboard</p>
        <p style={{ color: "rgba(246,232,240,0.6)", fontSize: 12, margin: "4px 0 0" }}>
          Delphi CRM · Structured Event Tracking · Internal Use Only
        </p>
      </div>

      {/* Internal warning */}
      <div style={{ backgroundColor: "#fffbe6", borderBottom: "1px solid #ffe58f", padding: "10px 32px", fontSize: 12, color: "#7d6608" }}>
        ⚠ <strong>Internal Use Only</strong> — This page is not publicly linked. Data resets on server restart (MVP).
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Navigation */}
        <div style={{ marginBottom: 20, fontSize: 12 }}>
          <a href="/admin/leads" style={{ color: "#5B1A5D", textDecoration: "none", marginRight: 16 }}>← Leads Dashboard</a>
          <span style={{ color: "#888" }}>Events Dashboard</span>
        </div>

        {/* Summary */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { label: "Total Events",          value: events.length },
            { label: "Application Submitted", value: byName("application_submitted") },
            { label: "Advisory Booked",       value: byName("advisory_booked") },
            { label: "Crisis Detected",       value: byName("crisis_detected") },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: "#fff", border: "1px solid #eee", borderRadius: 10, padding: "14px 20px", minWidth: 140 }}>
              <p style={{ fontSize: 26, fontWeight: 700, color: "#5B1A5D", margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0" }}>{s.label}</p>
            </div>
          ))}
          <div style={{ marginLeft: "auto", alignSelf: "center" }}>
            <button
              onClick={() => window.location.reload()}
              style={{ fontSize: 12, color: "#5B1A5D", background: "none", border: "1px solid #5B1A5D", borderRadius: 6, padding: "6px 14px", cursor: "pointer" }}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        {loading && <p style={{ color: "#888", fontSize: 14 }}>Loading events…</p>}
        {error   && <p style={{ color: "#c00", fontSize: 14 }}>Error: {error}</p>}
        {!loading && !error && events.length === 0 && (
          <p style={{ color: "#aaa", fontSize: 14 }}>No events captured yet. Events are fired by Delphi interactions and application submissions.</p>
        )}
        {!loading && !error && events.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, backgroundColor: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <thead>
                <tr style={{ backgroundColor: "#5B1A5D", color: "#fff" }}>
                  {["Date", "Event", "Meta"].map((h) => (
                    <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.map((ev, i) => {
                  const badge = EVENT_COLORS[ev.name] ?? defaultBadge();
                  const rowBg = i % 2 === 0 ? "#fff" : "#fafafa";
                  return (
                    <tr key={i} style={{ backgroundColor: rowBg, borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "11px 14px", color: "#555", whiteSpace: "nowrap" }}>
                        {formatDate(ev.timestamp)}
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        <span style={{
                          display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                          backgroundColor: badge.bg, color: badge.color,
                        }}>
                          {EVENT_LABELS[ev.name] ?? ev.name}
                        </span>
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        {formatMeta(ev.meta)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
