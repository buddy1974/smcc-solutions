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

function KpiCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-purple-700">
      <div className="text-3xl font-bold text-purple-900">
        {value}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        {label}
      </div>
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

  if (loading) return <div className="p-10 text-gray-400">Loading metrics…</div>;
  if (error)   return <div className="p-10 text-red-600">Error: {error}</div>;
  if (!data)   return null;

  const funnel     = data.funnelOverview?.[0];
  const escalation = data.escalationRate?.[0];
  const avgCrisis  = data.averageCrisis?.[0];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-purple-900 px-8 py-5">
        <p className="text-purple-200 font-bold text-lg">SMCC — Intelligence Dashboard</p>
        <p className="text-purple-400 text-xs mt-1">Executive Overview · Internal Use Only</p>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">

        {/* ── KPI Grid ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <KpiCard label="Total Leads"    value={funnel?.total_leads       ?? 0} />
          <KpiCard label="Appointments"   value={funnel?.total_appointments ?? 0} />
          <KpiCard label="Conversion %"   value={`${funnel?.conversion_rate ?? 0}%`} />
          <KpiCard label="Escalation %"   value={`${escalation?.escalation_percentage ?? 0}%`} />
          <KpiCard label="Avg Crisis"     value={avgCrisis?.average_crisis  ?? 0} />
        </div>

        {/* ── Leads Per Day ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="font-semibold text-purple-800 mb-5">Leads Per Day</p>
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
          ) : <p className="text-gray-400 text-sm">No data yet.</p>}
        </div>

        {/* ── Crisis Distribution ───────────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="font-semibold text-purple-800 mb-5">Crisis Score Distribution</p>
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
          ) : <p className="text-gray-400 text-sm">No data yet.</p>}
        </div>

        {/* ── Language Distribution ─────────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="font-semibold text-purple-800 mb-5">Language Distribution</p>
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
          ) : <p className="text-gray-400 text-sm">No data yet.</p>}
        </div>

      </div>
    </div>
  );
}
