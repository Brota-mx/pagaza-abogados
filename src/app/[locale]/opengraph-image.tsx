import { ImageResponse } from "next/og";

// OG image dinámica por locale (Next la autodetecta y la inyecta en la metadata del segmento).
export const runtime = "nodejs";
export const alt = "Pagaza Abogados Tributarios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#16243b";
const NAVY_INK = "#101b2d";
const BRONZE = "#b0894e";
const BRONZE_SOFT = "#c9a96a";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const es = locale !== "en";
  const tagline = es
    ? "Estrategia fiscal de élite · Ciudad de México"
    : "Elite tax strategy · Mexico City";
  const kicker = es
    ? "Derecho Fiscal · Administrativo · Constitucional"
    : "Tax · Administrative · Constitutional Law";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_INK} 100%)`,
        padding: "72px 80px",
        color: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 56, height: 2, background: BRONZE }} />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: BRONZE_SOFT,
          }}
        >
          {kicker}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          <span>PAGAZA</span>
          <span style={{ color: BRONZE }}>.</span>
        </div>
        <div
          style={{
            fontSize: 30,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
            marginTop: 8,
          }}
        >
          Abogados Tributarios
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: 28,
          fontSize: 26,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        <span>{tagline}</span>
        <span style={{ color: BRONZE_SOFT }}>pagaza.mx</span>
      </div>
    </div>,
    { ...size },
  );
}
