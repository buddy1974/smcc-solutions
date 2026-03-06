import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://smcc.solutions", lastModified: new Date(), priority: 1 },
    { url: "https://smcc.solutions/cohort-1", priority: 0.9 },
    { url: "https://smcc.solutions/payment", priority: 0.9 },
    { url: "https://smcc.solutions/marriage-restoration", priority: 0.9 },
    { url: "https://smcc.solutions/assessment", priority: 0.8 },
    { url: "https://smcc.solutions/marriage-health-test", priority: 0.8 },
    { url: "https://smcc.solutions/marriage-restoration-program", priority: 0.8 },
    { url: "https://smcc.solutions/christian-counseling-training", priority: 0.8 },
    { url: "https://smcc.solutions/biblical-marriage-counseling", priority: 0.8 },
    { url: "https://smcc.solutions/how-to-restore-a-broken-marriage", priority: 0.8 },
    { url: "https://smcc.solutions/biblical-counseling", priority: 0.7 },
    { url: "https://smcc.solutions/testimonials", priority: 0.6 },
    { url: "https://smcc.solutions/dashboard", priority: 0.5 },
  ];
}
