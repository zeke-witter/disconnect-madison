import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/metadata";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (see BRAND.md)
const FOREST = "#386641";
const CREAM = "#FEF8E8";
const LIME = "#A7C957";

export default async function Image() {
  // Built Titling is OTF (CFF outlines) and the Raleway file is a variable
  // font; satori can parse neither, so the card uses static Raleway instances
  // (generated into raleway-static/). Brand styling still reads as ours.
  const fontsDir = join(process.cwd(), "app", "fonts", "raleway-static");
  const [ralewayRegular, ralewayBold] = await Promise.all([
    readFile(join(fontsDir, "Raleway-Regular.ttf")),
    readFile(join(fontsDir, "Raleway-ExtraBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: FOREST,
          padding: "80px",
        }}
      >
        <div style={{ width: 120, height: 8, background: LIME, borderRadius: 4, marginBottom: 48 }} />
        <div
          style={{
            fontFamily: "Raleway",
            fontWeight: 800,
            fontSize: 128,
            lineHeight: 1,
            color: CREAM,
            textAlign: "center",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          Disconnect Madison
        </div>
        <div
          style={{
            fontFamily: "Raleway",
            fontWeight: 400,
            fontSize: 38,
            color: CREAM,
            opacity: 0.9,
            textAlign: "center",
            marginTop: 36,
            maxWidth: 900,
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Raleway", data: ralewayRegular, weight: 400, style: "normal" },
        { name: "Raleway", data: ralewayBold, weight: 800, style: "normal" },
      ],
    }
  );
}
