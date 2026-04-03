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
  metadataBase: new URL("https://www.smcc.solutions"),
  title: {
    default: "SMCC — Marriage Coaching Certification School | Cameroon",
    template: "%s | SMCC — School of Marriage & Christian Coaching",
  },
  description:
    "SMCC trains Christian coaches to transform marriages and lives. Join Cohort 1 — April 2026. Certification program in Cameroon under DRIMP Foundation.",
  keywords: [
    "marriage coaching certification Cameroon",
    "SMCC marriage school",
    "formation coaching conjugal Cameroun",
    "Christian life coaching certification Africa",
    "école coaching mariage Cameroun",
    "DRIMP Foundation SMCC",
    "how to become a marriage coach in Cameroon",
    "certification coaching chrétien Afrique",
    "Christian marriage counseling training",
    "Christian counseling certification",
    "marriage restoration program",
    "biblical relationship counseling",
  ],
  authors: [{ name: "SMCC — DRIMP Foundation" }],
  openGraph: {
    title: "SMCC — Marriage Coaching Certification School | Cameroon",
    description:
      "SMCC trains Christian coaches to transform marriages and lives. Join Cohort 1 — April 2026. Certification program in Cameroon under DRIMP Foundation.",
    url: "https://www.smcc.solutions",
    siteName: "SMCC — School of Marriage & Christian Coaching",
    type: "website",
    locale: "en_CM",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "SMCC Founders — Marriage Coaching Certification Cameroon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMCC — Marriage Coaching Certification | Cameroon",
    description: "Christian marriage coaching certification. Cohort 1 — April 2026. DRIMP Foundation, Cameroon.",
    images: ["/founders.jpg"],
  },
  alternates: {
    canonical: "https://www.smcc.solutions",
  },
  robots: {
    index: true,
    follow: true,
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
          "name": "SMCC — School of Marriage & Christian Coaching",
          "url": "https://www.smcc.solutions",
          "logo": "https://www.smcc.solutions/logo.png",
          "description": "Christian marriage and life coaching certification school in Cameroon",
          "address": { "@type": "PostalAddress", "addressCountry": "CM" },
          "parentOrganization": {
            "@type": "Organization",
            "name": "DRIMP Foundation",
            "url": "https://www.drimpfoundation.org"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "admissions",
            "url": "https://wa.me/237683493220"
          },
        }} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Marriage & Christian Coaching Certification — Cohort 1",
          "description": "Comprehensive certification program to become a Christian marriage and life coach in Cameroon",
          "provider": {
            "@type": "Organization",
            "name": "SMCC",
            "url": "https://www.smcc.solutions"
          },
          "startDate": "2026-04",
          "courseMode": "blended",
          "inLanguage": ["en", "fr"],
          "url": "https://www.smcc.solutions/cohort-1",
        }} />
        {children}
        <StickyBar />
        <KodeeChat />
        <Analytics />
      </body>
    </html>
  );
}
