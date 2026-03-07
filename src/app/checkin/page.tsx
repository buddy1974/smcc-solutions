"use client";

import { useState, useEffect } from "react";
import { isValidReference } from "@/lib/enrollment";

const KEY_STORAGE = "smcc_admin_key";

type State = "idle" | "loading" | "success" | "duplicate" | "notfound" | "unauthorized" | "error";

export default function CheckinPage() {
  const [key, setKey] = useState("");
  const [reference, setReference] = useState("");
  const [state, setState] = useState<State>("idle");
  const [programName, setProgramName] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY_STORAGE);
    if (saved) setKey(saved);
  }, []);

  async function handleCheckin(e: React.FormEvent) {
    e.preventDefault();
    const ref = reference.trim().toUpperCase();

    if (!isValidReference(ref)) {
      setState("error");
      return;
    }

    setState("loading");

    try {
      // Get enrollment details
      const getRes = await fetch(`/api/enrollment/${encodeURIComponent(ref)}`);
      if (!getRes.ok) {
        setState("notfound");
        return;
      }
      const { enrollment } = await getRes.json();

      // Perform check-in
      const patchRes = await fetch(
        `/api/enrollment/${encodeURIComponent(ref)}?key=${encodeURIComponent(key)}`,
        { method: "PATCH" }
      );

      if (patchRes.status === 401) { setState("unauthorized"); return; }
      if (patchRes.status === 404) { setState("notfound"); return; }
      if (patchRes.status === 409) { setState("duplicate"); return; }
      if (!patchRes.ok) { setState("error"); return; }

      sessionStorage.setItem(KEY_STORAGE, key);
      setProgramName(enrollment?.program_name ?? "");
      setState("success");
      setReference("");
    } catch {
      setState("error");
    }
  }

  function reset() {
    setState("idle");
    setProgramName("");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-bold text-2xl text-gray-900 mb-2">SMCC Check-in</h1>
          <p className="text-gray-500 text-sm">Enter an enrollment reference to check in a student.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {state === "success" ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="font-bold text-gray-900 text-lg">Check-in successful!</p>
              {programName && <p className="text-sm text-gray-500">{programName}</p>}
              <button
                onClick={reset}
                className="w-full bg-plum text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-plum/90 transition-colors"
              >
                Check in another student
              </button>
            </div>
          ) : state === "duplicate" ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <p className="font-bold text-gray-900">Already checked in</p>
              <p className="text-sm text-gray-500">This student has already been checked in.</p>
              <button
                onClick={reset}
                className="w-full border border-gray-200 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Try another reference
              </button>
            </div>
          ) : (
            <form onSubmit={handleCheckin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Admin Key
                </label>
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="smcc2026"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-plum/30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Enrollment Reference
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="SMCC-2026-001"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-plum/30"
                  autoFocus
                />
              </div>

              {state === "notfound" && (
                <p className="text-red-600 text-sm">Enrollment not found. Check the reference and try again.</p>
              )}
              {state === "unauthorized" && (
                <p className="text-red-600 text-sm">Invalid admin key.</p>
              )}
              {state === "error" && (
                <p className="text-red-600 text-sm">Invalid reference format or server error.</p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="w-full bg-plum text-white font-semibold py-3 rounded-lg text-sm hover:bg-plum/90 transition-colors disabled:opacity-60"
              >
                {state === "loading" ? "Checking in\u2026" : "Check In Student"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
