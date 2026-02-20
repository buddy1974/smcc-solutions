"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/metrics", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET}`,
      },
    })
      .then((res) => res.json())
      .then((metrics) => setData(metrics));
  }, []);

  if (!data) return <div className="p-10">Loading metrics...</div>;

  const COLORS = ["#6B21A8", "#9333EA", "#C084FC", "#E9D5FF"];

  return (
    <div className="p-10 space-y-16">
      <h1 className="text-3xl font-bold">
        SMCC Intelligence Dashboard
      </h1>

      {/* Leads Per Day */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Leads Per Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.leadsPerDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total_leads" stroke="#6B21A8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Crisis Distribution */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Crisis Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.crisisDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crisis_score" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#9333EA" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Language Distribution */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Language Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.languageDistribution}
              dataKey="total"
              nameKey="language"
              outerRadius={100}
            >
              {data.languageDistribution.map((_: any, index: number) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Escalation Rate */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Escalation Rate</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(data.escalationRate, null, 2)}
        </pre>
      </div>
    </div>
  );
}
