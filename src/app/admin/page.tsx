"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
} from "recharts";

type Metrics = {
  leadsPerDay:          { day: string; total_leads: number }[];
  crisisDistribution:   { crisis_score: number; count: number }[];
  languageDistribution: { language: string; total: number }[];
  escalationRate:       { escalated: number; not_escalated: number; total: number; escalation_percentage: number }[];
  funnelOverview:       { total_leads: number; total_appointments: number; conversion_rate: number }[];
  averageCrisis:        { average_crisis: number }[];
};

const PIE_COLORS = ["#6B21A8", "#9333EA", "#C084FC", "#E9D5FF"];

function KpiCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      borderLeft: "4px solid #6B21A8",
      padding: "20px 24px",
      boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
      flex: 1,
      minWidth: 140,
    }}>
      <p style={{ fontSize: 32, fontWeight: 700, color: "#6B21A8", margin: 0, lineHeight: 1.1 }}>
        {value}
      </p>
      <p style={{ fontSize: 12, color: "#888", margin: "6px 0 0" }}>{label}</p>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
      <p style={{ fontWeight: 700, fontSize: 14, color: "#6B21A8", marginBottom: 20, marginTop: 0 }}>
        {title}
      </p>
      {children}
    </div>
  );
}

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
        if (res.status === 401) throw new Error("Unauthorized");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Metrics>;
      })
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 40, color: "#888", fontFamily: "system-ui" }}>Loading metrics…</div>;
  if (error)   return <div style={{ padding: 40, color: "#c00",  fontFamily: "system-ui" }}>Error: {error}</div>;
  if (!data)   return null;

  const funnel    = data.funnelOverview?.[0];
  const escalation = data.escalationRate?.[0];
  const avgCrisis  = data.averageCrisis?.[0];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", backgroundColor: "#f5f5f8", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ backgroundColor: "#6B21A8", padding: "20px 32px" }}>
        <p style={{ color: "#E9D5FF", fontWeight: 700, fontSize: 18, margin: 0 }}>SMCC — Intelligence Dashboard</p>
        <p style={{ color: "rgba(233,213,255,0.6)", fontSize: 12, margin: "4px 0 0" }}>Executive Overview · Internal Use Only</p>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>

        {/* ── KPI Grid ────────────────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <KpiCard label="Total Leads"    value={funnel?.total_leads       ?? "—"} />
          <KpiCard label="Appointments"   value={funnel?.total_appointments ?? "—"} />
          <KpiCard label="Conversion %"   value={funnel ? `${funnel.conversion_rate ?? 0}%` : "—"} />
          <KpiCard label="Escalation %"   value={escalation ? `${escalation.escalation_percentage ?? 0}%` : "—"} />
          <KpiCard label="Avg Crisis Score" value={avgCrisis?.average_crisis ?? "—"} />
        </div>

        {/* ── Charts ──────────────────────────────────────────────────────── */}
        <ChartCard title="Leads Per Day">
          {data.leadsPerDay?.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={data.leadsPerDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="total_leads" stroke="#6B21A8" strokeWidth={2} dot={{ fill: "#6B21A8", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : <p style={{ color: "#aaa", fontSize: 13 }}>No data yet.</p>}
        </ChartCard>

        <ChartCard title="Crisis Score Distribution">
          {data.crisisDistribution?.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.crisisDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="crisis_score" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#9333EA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={{ color: "#aaa", fontSize: 13 }}>No data yet.</p>}
        </ChartCard>

        <ChartCard title="Language Distribution">
          {data.languageDistribution?.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={data.languageDistribution}
                  dataKey="total"
                  nameKey="language"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${String(name).toUpperCase()} ${Math.round((percent ?? 0) * 100)}%`
                  }
                >
                  {data.languageDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <p style={{ color: "#aaa", fontSize: 13 }}>No data yet.</p>}
        </ChartCard>

      </div>
    </div>
  );
}
