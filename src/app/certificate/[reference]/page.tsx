import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { isValidReference } from "@/lib/enrollment";
import { programKey, totalModules } from "@/lib/modules";
import CertificateClient from "./CertificateClient";

interface PageProps {
  params: Promise<{ reference: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { reference } = await params;
  return {
    title: `Certificate — ${reference} — SMCC`,
    robots: { index: false, follow: false },
  };
}

export default async function CertificatePage({ params }: PageProps) {
  const { reference } = await params;

  if (!isValidReference(reference)) notFound();

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("enrollments")
    .select(
      "reference, program_name, student_name, progress, certificate_issued, certificate_issued_at, created_at, status"
    )
    .eq("reference", reference)
    .single();

  if (error || !data) notFound();

  const key = programKey(data.program_name);
  const total = totalModules(key);
  const eligible = data.certificate_issued || (data.progress ?? 0) >= total;

  if (!eligible) {
    const remaining = total - (data.progress ?? 0);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
          <div className="text-4xl mb-4">🎓</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Certificate Not Yet Available</h1>
          <p className="text-gray-500 text-sm mb-4">
            You have completed {data.progress ?? 0} of {total} modules.{" "}
            {remaining} module{remaining !== 1 ? "s" : ""} remaining.
          </p>
          <a
            href={`/dashboard?ref=${data.reference}`}
            className="inline-block bg-plum text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-plum/90 transition-colors"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <CertificateClient enrollment={data} />;
}
