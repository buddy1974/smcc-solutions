"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/metrics")
      .then((res) => res.json())
      .then((metrics) => setData(metrics));
  }, []);

  if (!data) return <div className="p-10">Loading metrics...</div>;

  return (
    <div className="p-10 space-y-10">
      <h1 className="text-3xl font-bold">SMCC Intelligence Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-3">Leads Per Day</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(data.leadsPerDay, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Crisis Distribution</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(data.crisisDistribution, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Language Distribution</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(data.languageDistribution, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Escalation Rate</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(data.escalationRate, null, 2)}
        </pre>
      </section>
    </div>
  );
}
