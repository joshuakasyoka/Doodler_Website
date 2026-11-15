import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** The wordmark from the sprite, as a standalone white SVG data URL. */
function logoDataUrl(): string {
  const sprite = fs.readFileSync(path.join(process.cwd(), "public/icons/sprite.svg"), "utf8");
  const symbol = sprite.match(/<symbol id="logo" viewBox="([^"]+)">([\s\S]*?)<\/symbol>/);
  if (!symbol) return "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${symbol[1]}" style="color:#fffbf6">${symbol[2]}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/**
 * A branded Open Graph card for a page title. Colours mirror styles/tokens.css
 * (ink background, page-colour text). Satori needs literal values and inline styles.
 */
export function renderOgImage(title: string) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#141210",
        color: "#fffbf6",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
      <img src={logoDataUrl()} width={260} height={83} alt="" />
      <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
    </div>,
    ogSize,
  );
}
