"use client";

import { useEffect, useState } from "react";

type Lead = {
  source: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  intent: "apply" | "advisor" | "info";
  leadScore: number;
  crisisScore: number;
  lang: string;
  timestamp: string;
};

const INTENT_LABELS: Record<string, string> = {
  apply:   "High Interest",
  advisor: "Seeking Advisor",
  info:    "Information",
};

export default function AdminLeadsPage() {
  const [leads, setLeads]     = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/crm/lead")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<Lead[]>;
      })
      .then((data) => setLeads(data.slice().reverse())) // newest first
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

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", backgroundColor: "#f8f8f8", color: "#121212" }}>

      {/* Header */}
      <div style={{ backgroundColor: "#5B1A5D", padding: "20px 32px" }}>
        <p style={{ color: "#C9A227", fontWeight: 700, fontSize: 18, margin: 0 }}>SMCC — Lead Dashboard</p>
        <p style={{ color: "rgba(246,232,240,0.6)", fontSize: 12, margin: "4px 0 0" }}>
          Delphi CRM · Internal Use Only
        </p>
      </div>

      {/* Internal warning */}
      <div style={{ backgroundColor: "#fffbe6", borderBottom: "1px solid #ffe58f", padding: "10px 32px", fontSize: 12, color: "#7d6608" }}>
        ⚠ <strong>Internal Use Only</strong> — This page is not publicly linked. Data resets on server restart (MVP).
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Summary */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { label: "Total Leads",    value: leads.length },
            { label: "Crisis Signals", value: leads.filter((l) => l.crisisScore >= 50).length },
            { label: "Advisor Requests", value: leads.filter((l) => l.intent === "advisor").length },
            { label: "High Interest",  value: leads.filter((l) => l.leadScore >= 50).length },
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
        {loading && (
          <p style={{ color: "#888", fontSize: 14 }}>Loading leads…</p>
        )}
        {error && (
          <p style={{ color: "#c00", fontSize: 14 }}>Error: {error}</p>
        )}
        {!loading && !error && leads.length === 0 && (
          <p style={{ color: "#aaa", fontSize: 14 }}>No leads captured yet. Leads appear after Delphi interactions cross the scoring threshold.</p>
        )}
        {!loading && !error && leads.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, backgroundColor: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <thead>
                <tr style={{ backgroundColor: "#5B1A5D", color: "#fff" }}>
                  {["Date", "Lead Score", "Crisis Score", "Intent", "Language", "Source", "Name / Contact"].map((h) => (
                    <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => {
                  const crisis = lead.crisisScore >= 50;
                  const rowBg  = crisis ? "#fff8f8" : i % 2 === 0 ? "#fff" : "#fafafa";
                  return (
                    <tr key={i} style={{ backgroundColor: rowBg, borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "11px 14px", color: "#555", whiteSpace: "nowrap" }}>
                        {formatDate(lead.timestamp)}
                      </td>
                      <td style={{ padding: "11px 14px", fontWeight: 700, color: lead.leadScore >= 50 ? "#5B1A5D" : "#121212", fontSize: 15 }}>
                        {lead.leadScore}
                      </td>
                      <td style={{ padding: "11px 14px", fontWeight: 700, color: crisis ? "#c00" : "#121212", fontSize: 15 }}>
                        {lead.crisisScore}
                        {crisis && <span style={{ marginLeft: 6, fontSize: 11 }}>⚠</span>}
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        <span style={{
                          display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                          backgroundColor: lead.intent === "advisor" ? "#F6E8F0" : lead.intent === "apply" ? "#edf7ed" : "#f0f0f0",
                          color: lead.intent === "advisor" ? "#5B1A5D" : lead.intent === "apply" ? "#2d7a2d" : "#555",
                        }}>
                          {INTENT_LABELS[lead.intent] ?? lead.intent}
                        </span>
                      </td>
                      <td style={{ padding: "11px 14px", textTransform: "uppercase", fontSize: 11, fontWeight: 600, color: "#777" }}>
                        {lead.lang}
                      </td>
                      <td style={{ padding: "11px 14px", color: "#777" }}>
                        {lead.source || "delphi"}
                      </td>
                      <td style={{ padding: "11px 14px", color: "#555" }}>
                        {lead.name || <span style={{ color: "#ccc" }}>—</span>}
                        {lead.email && <span style={{ display: "block", fontSize: 11, color: "#888" }}>{lead.email}</span>}
                        {lead.phone && <span style={{ display: "block", fontSize: 11, color: "#888" }}>{lead.phone}</span>}
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
