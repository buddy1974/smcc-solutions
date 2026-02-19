/** @type {import('next').NextConfig} */
const nextConfig = {
  // "output: export" removed — API routes require a Node.js runtime.
  // Deploy to Vercel, Railway, or any Node.js host (not static-only hosts).
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
