import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions — SMCC",
  description: "Terms and conditions governing enrollment in SMCC programs.",
};

const sections = [
  {
    title: "Program Enrollment",
    content: [
      "Submission of an application does not guarantee enrollment in any SMCC program. Enrollment is confirmed only upon receipt and verification of full payment of the applicable program investment.",
      "SMCC reserves the right to accept or decline any application at its sole discretion. Applicants will be notified of their enrollment status within 24–48 hours of application review.",
      "SMCC reserves the right to modify cohort start dates, session schedules, facilitators, and program content. Participants will be notified of any significant changes in advance.",
    ],
  },
  {
    title: "Payment Terms",
    content: [
      "The program investment for Cohort I is 50,000 FCFA per participant. Payment must be completed in full prior to the cohort start date to secure enrollment.",
      "Accepted payment methods include PayUnit (where available), MTN Mobile Money, and Orange Money. Payment instructions will be provided by the SMCC admissions team.",
      "SMCC is not responsible for payment delays, technical failures, or errors caused by third-party payment processors. In the event of a payment dispute, participants should contact the relevant payment provider directly.",
      "Please refer to our Refund Policy for information on refund eligibility.",
    ],
  },
  {
    title: "Certification Disclaimer",
    content: [
      "Upon successful completion of all program requirements, participants will receive a Certificate of Completion from SMCC. This certificate recognises participation in and completion of the SMCC training program.",
      "The SMCC Certificate of Completion is an institutional credential issued by SMCC. It is not a government-accredited qualification unless explicitly stated. Participants are responsible for verifying the suitability of this credential for their specific professional or regulatory context.",
      "Certification is contingent upon satisfactory completion of all required modules, assessments, and supervised sessions as defined by SMCC.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All program materials, including but not limited to curriculum content, presentations, handouts, recordings, and frameworks, are the intellectual property of SMCC and its founders.",
      "Participants may not reproduce, distribute, sell, publish, or otherwise share program materials without prior written consent from SMCC. Materials are provided for personal learning and professional development purposes only.",
      "Participants may not use SMCC's name, logo, or branding in any commercial or public-facing capacity without explicit written authorisation from SMCC.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "SMCC provides its programs and materials in good faith for educational and professional development purposes. SMCC makes no guarantee of specific outcomes, results, or professional success arising from participation in its programs.",
      "To the fullest extent permitted by applicable law, SMCC shall not be liable for any indirect, incidental, or consequential damages arising from participation in or inability to participate in any SMCC program.",
      "SMCC's total liability to any participant shall not exceed the amount paid by that participant for the relevant program.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of Cameroon. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts of Cameroon.",
      "By submitting an application or enrolling in any SMCC program, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions.",
    ],
  },
];

export default function TermsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="text-charcoal/60 text-sm">
              Last updated: February 2026
            </p>
            <div className="h-0.5 w-10 mt-6" style={{ backgroundColor: "#C9A227" }} />
          </div>

          {/* Intro */}
          <p className="text-charcoal/75 leading-relaxed mb-12 text-lg">
            Please read these Terms and Conditions carefully before enrolling in any SMCC program.
            By submitting an application, you confirm that you have read and agree to the terms
            set out below.
          </p>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={section.title} className="border-t border-charcoal/10 pt-10">
                <h2 className="font-playfair text-2xl font-bold text-plum mb-5">
                  {i + 1}. {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((para, j) => (
                    <p key={j} className="text-charcoal/75 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="border-t border-charcoal/10 pt-10 mt-10">
            <p className="text-charcoal/60 text-sm leading-relaxed">
              Questions regarding these Terms and Conditions may be directed to{" "}
              <a href="mailto:info@smcc.solutions" className="text-plum font-semibold hover:text-gold transition-colors">
                info@smcc.solutions
              </a>
              .
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
