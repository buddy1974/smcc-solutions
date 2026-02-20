"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend,
} from "recharts";

type Metrics = {
  leadsPerDay:         { day: string;          count: number }[];
  crisisDistribution:  { crisis_score: number; count: number }[];
  languageDistribution:{ language: string;     count: number }[];
  escalationRate:      { escalated: number; not_escalated: number; total: number }[];
};

const PLUM  = "#5B1A5D";
const GOLD  = "#C9A227";
const PINK  = "#F6E8F0";
const RED   = "#c00";

const PIE_COLORS = [PLUM, GOLD, "#888", RED];

export default function AdminDashboard() {
  const [data,    setData]    = useState<Metrics | null>(null);
  const [error,   setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/metrics", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET}`,
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized — check NEXT_PUBLIC_ADMIN_SECRET");
        if (!res.ok)            throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Metrics>;
      })
      .then((metrics) => setData(metrics))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ fontFamily: "system-ui", padding: 40, color: "#888" }}>
      Loading metrics…
    </div>
  );

  if (error) return (
    <div style={{ fontFamily: "system-ui", padding: 40, color: RED }}>
      Error: {error}
    </div>
  );

  if (!data) return null;

  const escalation = data.escalationRate?.[0];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", backgroundColor: "#f8f8f8", color: "#121212" }}>

      {/* Header */}
      <div style={{ backgroundColor: PLUM, padding: "20px 32px" }}>
        <p style={{ color: GOLD, fontWeight: 700, fontSize: 20, margin: 0 }}>SMCC — Intelligence Dashboard</p>
        <p style={{ color: "rgba(246,232,240,0.6)", fontSize: 12, margin: "4px 0 0" }}>
          Live metrics · Internal Use Only
        </p>
      </div>

      {/* Nav */}
      <div style={{ backgroundColor: "#fffbe6", borderBottom: "1px solid #ffe58f", padding: "10px 32px", fontSize: 12, color: "#7d6608" }}>
        ⚠ <strong>Internal Use Only</strong> — not publicly linked · &nbsp;
        <a href="/admin/leads"  style={{ color: PLUM, marginRight: 12 }}>Leads →</a>
        <a href="/admin/events" style={{ color: PLUM }}>Events →</a>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Escalation summary cards */}
        {escalation && (
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { label: "Total Sessions",  value: escalation.total },
              { label: "Escalated",       value: escalation.escalated,     highlight: true },
              { label: "Not Escalated",   value: escalation.not_escalated },
              { label: "Escalation Rate", value: escalation.total > 0
                  ? `${Math.round((escalation.escalated / escalation.total) * 100)}%`
                  : "0%" },
            ].map((s) => (
              <div key={s.label} style={{
                backgroundColor: "#fff", border: "1px solid #eee", borderRadius: 10,
                padding: "14px 20px", minWidth: 140,
              }}>
                <p style={{ fontSize: 26, fontWeight: 700, color: s.highlight ? RED : PLUM, margin: 0 }}>
                  {s.value}
                </p>
                <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0" }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Leads Per Day — Line Chart */}
        <div style={{ backgroundColor: "#fff", borderRadius: 10, padding: "24px 28px", border: "1px solid #eee" }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: PLUM, margin: "0 0 20px" }}>Leads Per Day</p>
          {data.leadsPerDay?.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.leadsPerDay} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke={PLUM} strokeWidth={2} dot={{ fill: PLUM, r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: "#aaa", fontSize: 13 }}>No data yet.</p>
          )}
        </div>

        {/* Crisis Distribution — Bar Chart */}
        <div style={{ backgroundColor: "#fff", borderRadius: 10, padding: "24px 28px", border: "1px solid #eee" }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: PLUM, margin: "0 0 20px" }}>Crisis Score Distribution</p>
          {data.crisisDistribution?.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.crisisDistribution} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="crisis_score" tick={{ fontSize: 11 }} label={{ value: "Score", position: "insideBottom", offset: -2, fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill={GOLD} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: "#aaa", fontSize: 13 }}>No data yet.</p>
          )}
        </div>

        {/* Language Distribution — Pie Chart */}
        <div style={{ backgroundColor: "#fff", borderRadius: 10, padding: "24px 28px", border: "1px solid #eee" }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: PLUM, margin: "0 0 20px" }}>Language Distribution</p>
          {data.languageDistribution?.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={data.languageDistribution}
                  dataKey="count"
                  nameKey="language"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) =>
                    `${(name ?? "?").toUpperCase()} ${Math.round((percent ?? 0) * 100)}%`
                  }
                >
                  {data.languageDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, String(name).toUpperCase()]} />
                <Legend formatter={(v) => String(v).toUpperCase()} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: "#aaa", fontSize: 13 }}>No data yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}
