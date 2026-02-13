import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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
  title: "SMCC | School of Marriage Counseling & Coaching",
  description: "Restoring Marriages. Equipping Counselors. Transforming Generations. School of Marriage Counseling & Coaching (SMCC) — Yaoundé, Cameroon.",
  keywords: ["marriage counseling", "coaching", "SMCC", "Cameroon", "Yaoundé", "marriage restoration"],
  authors: [{ name: "SMCC" }],
  openGraph: {
    title: "SMCC | School of Marriage Counseling & Coaching",
    description: "Restoring Marriages. Equipping Counselors. Transforming Generations.",
    type: "website",
    locale: "en_US",
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
        {children}
      </body>
    </html>
  );
}
