/** @type {import('next').NextConfig} */
const nextConfig = {
  // "output: export" removed — API routes require a Node.js runtime.
  // Deploy to Vercel, Railway, or any Node.js host (not static-only hosts).
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-Content-Type-Options",     value: "nosniff" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=()" },
          { key: "X-Robots-Tag",               value: "index, follow" },
        ],
      },
      {
        source: "/GRADUATION/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
