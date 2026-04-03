import type { MetadataRoute } from "next";

const BASE = "https://www.smcc.solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, lastModified: new Date(), priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/cohort-1`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/payment`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/marriage-restoration`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/assessment`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/marriage-health-test`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/marriage-restoration-program`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/christian-counseling-training`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/biblical-marriage-counseling`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/how-to-restore-a-broken-marriage`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/biblical-counseling`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/testimonials`, priority: 0.6, changeFrequency: "weekly" },
    { url: `${BASE}/dashboard`, priority: 0.3, changeFrequency: "monthly" },
  ];
}
