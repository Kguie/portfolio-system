import { ImageResponse } from "next/og";

export const alt = "Kévin Guieba — Fullstack Developer";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, #08142a 0%, #071225 38%, #040811 72%, #02040a 100%)",
          color: "#ffffff",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 40%, rgba(56,189,248,0.24) 0%, rgba(8,20,42,0) 46%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 110,
            left: "50%",
            width: 680,
            height: 260,
            borderRadius: 999,
            transform: "translateX(-50%)",
            background: "rgba(56,189,248,0.12)",
            filter: "blur(56px)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 18,
            padding: "0 72px",
          }}
        >
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.94)",
            }}
          >
            KÉVIN GUIEBA
          </div>
          <div
            style={{
              fontSize: 44,
              lineHeight: 1.1,
              fontWeight: 500,
              color: "rgba(255,255,255,0.82)",
            }}
          >
            Fullstack Developer
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.25,
              fontWeight: 400,
              color: "rgba(255,255,255,0.68)",
            }}
          >
            Focused on backend &amp; scalable systems
          </div>
        </div>
      </div>
    ),
    size,
  );
}
