import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SMCC — Marriage Coaching Certification School | Cameroon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #3B0764 0%, #5B1A5D 60%, #7C2D7E 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
          padding: "60px",
        }}
      >
        {/* Gold accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#C9A227",
          }}
        />

        {/* Badge */}
        <div
          style={{
            background: "rgba(201, 162, 39, 0.2)",
            border: "1px solid rgba(201, 162, 39, 0.4)",
            borderRadius: "999px",
            padding: "8px 28px",
            marginBottom: "32px",
            display: "flex",
          }}
        >
          <span
            style={{
              color: "#C9A227",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Cohort 1 — April 2026 · Cameroon
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: "88px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "16px",
            textAlign: "center",
            display: "flex",
          }}
        >
          SMCC
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,220,210,0.85)",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            marginBottom: "48px",
            display: "flex",
          }}
        >
          Marriage Coaching Certification School
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "#C9A227",
            marginBottom: "40px",
          }}
        />

        {/* Bottom tagline */}
        <div
          style={{
            fontSize: "20px",
            color: "rgba(255,220,210,0.65)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          DRIMP Foundation · www.smcc.solutions
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#C9A227",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
