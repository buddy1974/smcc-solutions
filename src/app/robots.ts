import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/checkin"] },
    sitemap: "https://www.smcc.solutions/sitemap.xml",
  };
}
