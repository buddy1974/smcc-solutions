import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — SMCC",
  description: "How SMCC collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    content: [
      "When you submit an application or contact us, we collect the following personal information:",
      "• Full name",
      "• Email address",
      "• Phone number (WhatsApp or standard)",
      "• Location (city and country)",
      "• Occupation",
      "• Program interest and motivation",
      "This information is collected solely to process your application and communicate with you about SMCC programs.",
    ],
  },
  {
    title: "How We Use Information",
    content: [
      "We use the information you provide to:",
      "• Process and evaluate your application",
      "• Contact you regarding enrollment, payment, and program updates",
      "• Send you program-related communications",
      "• Improve our admissions process",
      "We do not use your personal information for marketing purposes beyond SMCC programs, and we do not sell, rent, or trade your personal data to any third party.",
    ],
  },
  {
    title: "Payment Processing",
    content: [
      "Payment transactions are processed through third-party providers, including PayUnit and mobile money operators (MTN MoMo, Orange Money). SMCC does not store your payment card details.",
      "When you complete a payment through these providers, their respective privacy policies and terms of service apply. We encourage you to review their policies before completing a transaction.",
      "We retain records of payment completion for enrollment confirmation and administrative purposes.",
    ],
  },
  {
    title: "Data Protection",
    content: [
      "We take reasonable precautions to protect your personal information from unauthorised access, disclosure, or loss. Access to applicant data is limited to authorised SMCC staff involved in admissions and program administration.",
      "We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except as required by law or to facilitate the services you have requested.",
      "Our website is hosted on Vercel, a secure cloud platform. Communications are transmitted over HTTPS.",
    ],
  },
  {
    title: "Retention",
    content: [
      "We retain your personal information for as long as necessary to fulfil the purposes described in this policy, or as required by law. Application data for enrolled participants is retained for the duration of the program and for a reasonable period thereafter for administrative records.",
      "If you would like your information removed from our records, please contact us at the address below.",
    ],
  },
  {
    title: "Contact Information",
    content: [
      "If you have questions or concerns about this Privacy Policy or the handling of your personal information, please contact us:",
      "Email: info@smcc.solutions",
      "School of Marriage Counseling & Coaching (SMCC)",
      "Yaoundé, Cameroon",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-4 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#C9A227" }}>
              Legal
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-plum mb-4 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-charcoal/60 text-sm">
              Last updated: February 2026
            </p>
            <div className="h-0.5 w-10 mt-6" style={{ backgroundColor: "#C9A227" }} />
          </div>

          {/* Intro */}
          <p className="text-charcoal/75 leading-relaxed mb-12 text-lg">
            The School of Marriage Counseling &amp; Coaching (SMCC) is committed to protecting
            your privacy. This policy explains what information we collect, how we use it,
            and the choices you have regarding your personal data.
          </p>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={section.title} className="border-t border-charcoal/10 pt-10">
                <h2 className="font-playfair text-2xl font-bold text-plum mb-5">
                  {i + 1}. {section.title}
                </h2>
                <div className="space-y-3">
                  {section.content.map((para, j) => (
                    <p key={j} className={`leading-relaxed ${
                      para.startsWith("•")
                        ? "text-charcoal/70 pl-4 text-sm"
                        : "text-charcoal/75"
                    }`}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
