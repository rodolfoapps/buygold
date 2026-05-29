import { ImageResponse } from "next/og";

/**
 * Branded Open Graph image generator.
 *
 * Used by the `opengraph-image` route files across the app to produce a
 * consistent 1200x630 social-share card for every page. Editorial look:
 * warm paper background, the gold bar motif, serif-style wordmark, and the
 * page title. Uses the runtime's default font for build robustness (no
 * external font fetching required).
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#fbfaf7";
const INK = "#1c1a17";
const INK_MUTED = "#6b6760";
const GOLD = "#b9852b";
const GOLD_LIGHT = "#dcbb6a";
const LINE = "#e7e2d7";

export function renderOgImage({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: PAPER,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Top gold rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: `linear-gradient(90deg, ${GOLD_LIGHT}, ${GOLD})`,
          }}
        />

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 48,
              borderRadius: 8,
              background: `linear-gradient(${GOLD_LIGHT}, ${GOLD})`,
            }}
          />
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: INK,
              letterSpacing: -0.5,
            }}
          >
            Buy Gold Insider
          </div>
        </div>

        {/* Eyebrow / category */}
        {eyebrow ? (
          <div
            style={{
              marginTop: 64,
              fontSize: 26,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 3,
              color: GOLD,
            }}
          >
            {eyebrow}
          </div>
        ) : (
          <div style={{ marginTop: 64 }} />
        )}

        {/* Title */}
        <div
          style={{
            marginTop: 20,
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            color: INK,
            letterSpacing: -1,
            display: "flex",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${LINE}`,
            paddingTop: 28,
            fontSize: 26,
            color: INK_MUTED,
          }}
        >
          <span>buygoldinsider.com</span>
          <span>Plain answers about gold, before you buy.</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
