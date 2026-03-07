import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import StickyBar from "@/components/StickyBar";
import KodeeChat from "@/components/KodeeChat";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "@/components/JsonLd";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smcc.solutions"),
  title: {
    default: "School of Marriage Counseling & Coaching (SMCC)",
    template: "%s — SMCC",
  },
  description:
    "Faith-based marriage counseling and leadership training program. 12-week structured cohort designed to restore families and equip leaders globally.",
  keywords: [
    "Christian marriage counseling training",
    "Christian counseling certification",
    "marriage restoration program",
    "biblical relationship counseling",
    "Christian counseling course",
    "how to become a Christian marriage counselor",
    "marriage restoration training",
    "SMCC",
  ],
  authors: [{ name: "SMCC" }],
  openGraph: {
    title: "School of Marriage Counseling & Coaching",
    description:
      "Structured 12-week global marriage counseling training program. Restore families. Equip leaders.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "SMCC Founders" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "School of Marriage Counseling & Coaching (SMCC)",
    description: "Faith-based 12-week marriage counseling training. Global cohort.",
    images: ["/founders.jpg"],
  },
  alternates: {
    canonical: "https://smcc.solutions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "School of Marriage Counseling & Coaching",
          "url": "https://smcc.solutions",
          "description": "Faith-based marriage counseling and coaching training program",
          "address": { "@type": "PostalAddress", "addressCountry": "CM" },
        }} />
        {children}
        <StickyBar />
        <KodeeChat />
        <Analytics />
      </body>
    </html>
  );
}
