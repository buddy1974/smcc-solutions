"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { totalModules, programKey } from "@/lib/modules";

const KEY_STORAGE = "smcc_admin_key";

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

function exportCSV(rows: Enrollment[]) {
  const header = [
    "Reference", "Program", "Amount (XAF)", "Status",
    "Checked In", "Check-in Time", "Source", "Student Name",
    "Progress", "Certificate", "Created At",
  ];
  const lines = rows.map((r) =>
    [
      r.reference,
      `"${r.program_name}"`,
      r.amount,
      r.status,
      r.checked_in ? "Yes" : "No",
      r.checked_in_at ?? "",
      r.source ?? "",
      `"${r.student_name ?? ""}"`,
      r.progress ?? 0,
      r.certificate_issued ? "Yes" : "No",
      r.created_at,
    ].join(",")
  );
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `smcc-enrollments-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function ManagePanel({
  enrollment,
  adminKey,
  onUpdated,
}: {
  enrollment: Enrollment;
  adminKey: string;
  onUpdated: (ref: string, updates: Partial<Enrollment>) => void;
}) {
  const key = programKey(enrollment.program_name);
  const total = totalModules(key);
  const progress = enrollment.progress ?? 0;

  const [nameInput, setNameInput] = useState(enrollment.student_name ?? "");
  const [nameSaving, setNameSaving] = useState(false);
  const [progressSaving, setProgressSaving] = useState(false);
  const [certSaving, setCertSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function put(body: Record<string, unknown>) {
    const res = await fetch(
      `/api/enrollment/${enrollment.reference}?key=${encodeURIComponent(adminKey)}`,
      { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    if (!res.ok) throw new Error("Failed");
    return res.json();
  }

  async function saveName() {
    setNameSaving(true);
    setMsg("");
    try {
      await put({ student_name: nameInput });
      onUpdated(enrollment.reference, { student_name: nameInput });
      setMsg("Name saved.");
    } catch {
      setMsg("Failed to save name.");
    } finally {
      setNameSaving(false);
    }
  }

  async function changeProgress(delta: number) {
    const next = Math.max(0, Math.min(total, progress + delta));
    setProgressSaving(true);
    setMsg("");
    try {
      await put({ progress: next });
      onUpdated(enrollment.reference, { progress: next });
      setMsg(`Progress set to ${next}/${total}.`);
    } catch {
      setMsg("Failed to update progress.");
    } finally {
      setProgressSaving(false);
    }
  }

  async function issueCertificate() {
    if (!confirm(`Issue certificate for ${enrollment.reference}?`)) return;
    setCertSaving(true);
    setMsg("");
    try {
      await put({ certificate_issued: true });
      onUpdated(enrollment.reference, {
        certificate_issued: true,
        certificate_issued_at: new Date().toISOString(),
      });
      setMsg("Certificate issued.");
    } catch {
      setMsg("Failed to issue certificate.");
    } finally {
      setCertSaving(false);
    }
  }

  return (
    <tr>
      <td colSpan={10} className="px-5 py-4 bg-plum/5 border-t border-plum/10">
        <div className="flex flex-wrap gap-6 items-start">
          {/* Name */}
          <div className="flex flex-col gap-1 min-w-[200px]">
            <label className="text-xs font-semibold text-gray-600">Student Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-plum/30 w-40"
                placeholder="Full name"
              />
              <button
                onClick={saveName}
                disabled={nameSaving}
                className="text-xs font-semibold bg-plum text-white px-3 py-1.5 rounded-lg hover:bg-plum/90 disabled:opacity-60"
              >
                {nameSaving ? "…" : "Save"}
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600">
              Progress ({progress}/{total})
            </label>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => changeProgress(-1)}
                disabled={progressSaving || progress <= 0}
                className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 font-bold hover:bg-gray-100 disabled:opacity-40"
              >
                −
              </button>
              <span className="text-sm font-mono w-10 text-center">{progress}</span>
              <button
                onClick={() => changeProgress(1)}
                disabled={progressSaving || progress >= total}
                className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 font-bold hover:bg-gray-100 disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          {/* Certificate */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600">Certificate</label>
            {enrollment.certificate_issued ? (
              <span className="text-xs text-green-700 font-semibold">✓ Issued</span>
            ) : (
              <button
                onClick={issueCertificate}
                disabled={certSaving}
                className="text-xs font-semibold bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 disabled:opacity-60"
              >
                {certSaving ? "Issuing…" : "Issue Certificate"}
              </button>
            )}
          </div>

          {msg && <p className="text-xs text-plum self-end">{msg}</p>}
        </div>
      </td>
    </tr>
  );
}

export default function AdminEnrollmentsPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedRef, setExpandedRef] = useState<string | null>(null);

  const loadEnrollments = useCallback(async (adminKey: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/enrollment/list?key=${encodeURIComponent(adminKey)}`);
      if (res.status === 401) {
        setError("Invalid admin key.");
        setAuthed(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setEnrollments(data.enrollments ?? []);
      setAuthed(true);
      sessionStorage.setItem(KEY_STORAGE, adminKey);
    } catch {
      setError("Failed to load enrollments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY_STORAGE);
    if (saved) {
      setKey(saved);
      loadEnrollments(saved);
    }
  }, [loadEnrollments]);

  function applyUpdate(ref: string, updates: Partial<Enrollment>) {
    setEnrollments((prev) =>
      prev.map((e) => (e.reference === ref ? { ...e, ...updates } : e))
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="font-bold text-xl text-gray-900 mb-6 text-center">Admin &mdash; Enrollments</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loadEnrollments(key);
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Admin key"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-plum/30"
              autoFocus
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-plum text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-plum/90 transition-colors disabled:opacity-60"
            >
              {loading ? "Loading\u2026" : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const confirmed = enrollments.filter((e) => e.status === "confirmed").length;
  const initiated = enrollments.filter((e) => e.status === "initiated").length;
  const checkedIn = enrollments.filter((e) => e.checked_in).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg text-gray-900">SMCC Enrollments</h1>
          <p className="text-xs text-gray-400 mt-0.5">{enrollments.length} total records</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
            &larr; Admin Home
          </Link>
          <button
            onClick={() => exportCSV(enrollments)}
            className="text-xs font-semibold bg-plum text-white px-4 py-2 rounded-lg hover:bg-plum/90 transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={() => loadEnrollments(key)}
            disabled={loading}
            className="text-xs font-semibold border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            {loading ? "Loading\u2026" : "Refresh"}
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="px-6 py-5 grid grid-cols-3 gap-4 max-w-lg">
        {[
          { label: "Confirmed", value: confirmed, color: "text-green-600" },
          { label: "Initiated", value: initiated, color: "text-yellow-600" },
          { label: "Checked In", value: checkedIn, color: "text-plum" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="px-6 pb-12">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Reference", "Program", "Amount", "Status", "Checked In", "Student Name", "Progress", "Certificate", "Source", "Date", ""].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {enrollments.map((e) => {
                  const pKey = programKey(e.program_name);
                  const total = totalModules(pKey);
                  const prog = e.progress ?? 0;
                  const isExpanded = expandedRef === e.reference;

                  return [
                    <tr key={e.reference} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-plum font-bold">
                        <Link href={`/enrollment/${e.reference}`} className="hover:underline">
                          {e.reference}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-gray-700 text-xs">{e.program_name}</td>
                      <td className="px-5 py-3 text-gray-700 text-xs">{e.amount.toLocaleString()}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${
                            e.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : e.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {e.checked_in ? (
                          <span className="text-xs font-semibold text-green-600">&#10003; Yes</span>
                        ) : (
                          <span className="text-xs text-gray-400">&mdash;</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-700">{e.student_name ?? <span className="text-gray-300">—</span>}</td>
                      <td className="px-5 py-3 text-xs text-gray-700">
                        <span className={prog >= total && total > 0 ? "text-green-600 font-semibold" : ""}>
                          {prog}/{total}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs">
                        {e.certificate_issued ? (
                          <span className="text-green-700 font-semibold">✓ Issued</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-400">{e.source ?? "\u2014"}</td>
                      <td className="px-5 py-3 text-xs text-gray-400">
                        {new Date(e.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3 text-xs">
                        <button
                          onClick={() => setExpandedRef(isExpanded ? null : e.reference)}
                          className="text-xs font-semibold text-plum hover:underline"
                        >
                          {isExpanded ? "Close" : "Manage"}
                        </button>
                      </td>
                    </tr>,
                    isExpanded && (
                      <ManagePanel
                        key={`manage-${e.reference}`}
                        enrollment={e}
                        adminKey={key}
                        onUpdated={applyUpdate}
                      />
                    ),
                  ];
                })}
                {enrollments.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-5 py-10 text-center text-sm text-gray-400">
                      No enrollments yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
