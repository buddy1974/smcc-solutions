"use client";

import { useRef, useState } from "react";

type Enrollment = {
  reference: string;
  program_name: string;
  student_name: string | null;
  certificate_issued_at: string | null;
  created_at: string;
};

export default function CertificateClient({ enrollment }: { enrollment: Enrollment }) {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const completionDate = enrollment.certificate_issued_at
    ? new Date(enrollment.certificate_issued_at)
    : new Date();
  const dateStr = completionDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  async function downloadPDF() {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FFFDF5",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [1120, 790] });
      pdf.addImage(imgData, "PNG", 0, 0, 1120, 790);
      pdf.save(`smcc-certificate-${enrollment.reference}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4">
      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <a
          href={`/dashboard?ref=${enrollment.reference}`}
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← Dashboard
        </a>
        <button
          onClick={downloadPDF}
          disabled={downloading}
          className="bg-plum text-white font-semibold px-6 py-2 rounded-lg text-sm hover:bg-plum/90 transition-colors disabled:opacity-60"
        >
          {downloading ? "Generating PDF…" : "Download PDF"}
        </button>
      </div>

      {/* Certificate */}
      <div
        ref={certRef}
        id="certificate-content"
        style={{
          width: "1120px",
          height: "790px",
          backgroundColor: "#FFFDF5",
          border: "12px solid #B8960C",
          boxSizing: "border-box",
          position: "relative",
          fontFamily: "Georgia, serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Inner border */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "2px solid #B8960C",
            pointerEvents: "none",
          }}
        />

        {/* Crest */}
        <p style={{ fontSize: "42px", marginBottom: "8px" }}>✝</p>

        {/* Institution */}
        <p style={{ fontSize: "13px", letterSpacing: "6px", textTransform: "uppercase", color: "#7B5E00", marginBottom: "4px" }}>
          Supernatural Marriage Counseling Center
        </p>
        <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#9E8040", marginBottom: "32px" }}>
          SMCC · smcc.solutions
        </p>

        {/* Declares */}
        <p style={{ fontSize: "15px", color: "#555", marginBottom: "12px", fontStyle: "italic" }}>
          This certifies that
        </p>

        {/* Name */}
        <p
          style={{
            fontSize: "52px",
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "#1A1A1A",
            marginBottom: "20px",
            fontWeight: "bold",
            textAlign: "center",
            borderBottom: "2px solid #B8960C",
            paddingBottom: "12px",
            minWidth: "500px",
          }}
        >
          {enrollment.student_name ?? "Graduate"}
        </p>

        {/* Award text */}
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "8px", textAlign: "center" }}>
          has successfully completed the requirements for
        </p>
        <p
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#2A1A00",
            marginBottom: "6px",
            textAlign: "center",
          }}
        >
          SMCC Certification in Marriage Counseling &amp; Coaching
        </p>
        <p style={{ fontSize: "14px", color: "#7B5E00", marginBottom: "32px" }}>
          {enrollment.program_name}
        </p>

        {/* Date */}
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "40px" }}>
          Awarded on {dateStr}
        </p>

        {/* Signature line */}
        <div style={{ display: "flex", gap: "80px", justifyContent: "center" }}>
          {["Program Director", "Academic Registrar"].map((role) => (
            <div key={role} style={{ textAlign: "center" }}>
              <div style={{ width: "180px", borderTop: "1px solid #B8960C", marginBottom: "6px" }} />
              <p style={{ fontSize: "11px", color: "#888", letterSpacing: "1px", textTransform: "uppercase" }}>{role}</p>
            </div>
          ))}
        </div>

        {/* Reference */}
        <p
          style={{
            position: "absolute",
            bottom: "32px",
            right: "40px",
            fontSize: "10px",
            color: "#CCC",
            fontFamily: "monospace",
          }}
        >
          Ref: {enrollment.reference}
        </p>
      </div>
    </div>
  );
}
