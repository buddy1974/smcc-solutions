import { Metadata } from "next";
import { getSupabase } from "@/lib/supabase";
import { isValidReference } from "@/lib/enrollment";
import { getModules, programKey } from "@/lib/modules";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Student Dashboard — SMCC",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const { ref } = await searchParams;

  if (!ref) {
    return <RefPrompt message="Enter your enrollment reference to access your dashboard." />;
  }

  if (!isValidReference(ref)) {
    return <RefPrompt message="That reference format isn't recognised. Please check your enrollment email." />;
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("enrollments")
    .select(
      "reference, program_name, amount, status, checked_in, checked_in_at, source, created_at, student_name, progress, certificate_issued, certificate_issued_at"
    )
    .eq("reference", ref)
    .single();

  if (error || !data) {
    return <RefPrompt message="Reference not found. Please double-check your enrollment confirmation email." />;
  }

  const key = programKey(data.program_name);
  const modules = getModules(key);

  return <DashboardClient enrollment={data} modules={modules} programKey={key} />;
}

function RefPrompt({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Student Dashboard</h1>
        <p className="text-gray-500 mb-8 text-sm">{message}</p>
        <form method="GET" action="/dashboard" className="flex flex-col gap-3">
          <input
            name="ref"
            type="text"
            placeholder="e.g. SMCC-2026-001"
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-plum/30 text-center font-mono"
            autoFocus
          />
          <button
            type="submit"
            className="bg-plum text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-plum/90 transition-colors"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
