"use client";

import { useState } from "react";
import Link from "next/link";
import { Module } from "@/lib/modules";

type Enrollment = {
  reference: string;
  program_name: string;
  amount: number;
  status: string;
  checked_in: boolean;
  checked_in_at: string | null;
  source: string | null;
  created_at: string;
  student_name: string | null;
  progress: number | null;
  certificate_issued: boolean | null;
  certificate_issued_at: string | null;
};

const SESSIONS = [
  { date: "April 12, 2026", topic: "Module 1 — Biblical Foundations" },
  { date: "April 19, 2026", topic: "Module 2 — Communication Skills" },
  { date: "April 26, 2026", topic: "Module 3 — Emotional Healing" },
  { date: "May 3, 2026", topic: "Module 4 — Trust & Forgiveness" },
];

const RESOURCES = [
  { label: "Student Handbook (PDF)", href: "/resources/student-handbook.pdf" },
  { label: "Session Workbook (PDF)", href: "/resources/session-workbook.pdf" },
  { label: "Counseling Framework (PDF)", href: "/resources/counseling-framework.pdf" },
  { label: "Prayer & Reflection Guide (PDF)", href: "/resources/prayer-guide.pdf" },
];

interface Props {
  enrollment: Enrollment;
  modules: Module[];
  programKey: string;
}

export default function DashboardClient({ enrollment, modules, programKey: _programKey }: Props) {
  const [name, setName] = useState(enrollment.student_name ?? "");
  const [editingName, setEditingName] = useState(!enrollment.student_name);
  const [nameInput, setNameInput] = useState(enrollment.student_name ?? "");
  const [nameSaving, setNameSaving] = useState(false);
  const [nameError, setNameError] = useState("");

  const progress = enrollment.progress ?? 0;
  const total = modules.length;
  const pct = total > 0 ? Math.round((progress / total) * 100) : 0;
  const eligible = enrollment.certificate_issued || progress >= total;

  async function saveName() {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setNameSaving(true);
    setNameError("");
    try {
      const res = await fetch(`/api/enrollment/${enrollment.reference}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_name: trimmed }),
      });
      if (!res.ok) throw new Error("Failed to save name");
      setName(trimmed);
      setEditingName(false);
    } catch {
      setNameError("Could not save name. Please try again.");
    } finally {
      setNameSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">SMCC</p>
            <h1 className="text-lg font-bold text-gray-900">Student Dashboard</h1>
          </div>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              enrollment.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {enrollment.status}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Welcome */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          {editingName ? (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Welcome to SMCC!</h2>
              <p className="text-sm text-gray-500 mb-4">Enter your full name to personalise your dashboard and certificate.</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Your full name"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-plum/30"
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                  autoFocus
                />
                <button
                  onClick={saveName}
                  disabled={nameSaving || !nameInput.trim()}
                  className="bg-plum text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-plum/90 transition-colors disabled:opacity-60"
                >
                  {nameSaving ? "Saving…" : "Save"}
                </button>
              </div>
              {nameError && <p className="text-red-500 text-xs mt-2">{nameError}</p>}
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Welcome back</p>
                <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
              </div>
              <button
                onClick={() => { setNameInput(name); setEditingName(true); }}
                className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
              >
                Edit name
              </button>
            </div>
          )}
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Enrollment Details</h3>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              { label: "Reference", value: enrollment.reference, mono: true },
              { label: "Program", value: enrollment.program_name },
              { label: "Amount Paid", value: `${enrollment.amount.toLocaleString()} XAF` },
              { label: "Enrolled", value: new Date(enrollment.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) },
              { label: "Cohort", value: "Cohort 1 — 2026" },
              { label: "Check-in", value: enrollment.checked_in ? "Completed" : "Pending" },
            ].map(({ label, value, mono }) => (
              <div key={label}>
                <dt className="text-xs text-gray-400 mb-0.5">{label}</dt>
                <dd className={`text-sm font-semibold text-gray-900 ${mono ? "font-mono" : ""}`}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Progress tracker */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Course Progress</h3>
            <span className="text-sm font-bold text-plum">{progress}/{total} modules</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
            <div
              className="bg-plum h-2 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          {/* Module list */}
          <ul className="space-y-2">
            {modules.map((m) => {
              const done = m.id <= progress;
              return (
                <li key={m.id} className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                      done ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {done ? "✓" : m.id}
                  </span>
                  <span className={`text-sm ${done ? "text-gray-700" : "text-gray-400"}`}>{m.title}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Upcoming sessions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Upcoming Sessions</h3>
          <ul className="space-y-3">
            {SESSIONS.map((s) => (
              <li key={s.date} className="flex items-center gap-4">
                <span className="text-xs font-semibold text-plum bg-plum/10 px-3 py-1 rounded-full whitespace-nowrap">{s.date}</span>
                <span className="text-sm text-gray-600">{s.topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Resources</h3>
          <ul className="space-y-2">
            {RESOURCES.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-plum hover:underline"
                >
                  <span className="text-base">📄</span>
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Certificate */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Certificate</h3>
          {eligible ? (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Congratulations! Your certificate is ready.
              </p>
              <Link
                href={`/certificate/${enrollment.reference}`}
                className="inline-block bg-plum text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-plum/90 transition-colors"
              >
                View Certificate →
              </Link>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Complete all {total} modules to unlock your certificate.{" "}
              <span className="font-semibold text-gray-700">{total - progress} remaining.</span>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
