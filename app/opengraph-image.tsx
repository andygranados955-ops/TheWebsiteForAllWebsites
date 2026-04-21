import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 80,
          background: "#f7f2ea",
          color: "#2a2118",
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        <div style={{ fontSize: 56, letterSpacing: -1, fontWeight: 500 }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 26,
            color: "#6b5344",
            maxWidth: 720,
            lineHeight: 1.35,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            height: 4,
            width: 120,
            background: "#b85c38",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
