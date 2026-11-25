import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Particles } from "../components/Particles";
import { AnimatedText } from "../components/AnimatedText";
import { BrowserMockup } from "../components/BrowserMockup";
import { Highlight } from "../components/Highlight";
import { colors } from "../theme";
import { bodyFont, headingFont } from "../fonts";

const MOCK_W = 1180;
const MOCK_H = Math.round((MOCK_W * 9) / 16); // 664
const IMG_H = MOCK_W * (2544 / 2560);          // tinggi gambar saat lebarnya 1180
const MAX_SCROLL = IMG_H - MOCK_H;             // jarak gulir maksimal

const ease = Easing.inOut(Easing.cubic);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Scene7Results: React.FC = () => {
  const frame = useCurrentFrame();

  // Gulir: atas -> bawah (frame 130-235), lalu kembali ke atas (frame 245-285)
  const scrollDown = interpolate(frame, [130, 235], [0, MAX_SCROLL], { ...clamp, easing: ease });
  const scrollUp = interpolate(frame, [245, 285], [0, MAX_SCROLL], { ...clamp, easing: ease });
  const scroll = scrollDown - scrollUp;

  // Zoom ke tombol laporan (frame 290-340)
  const zoom = interpolate(frame, [290, 340], [1, 1.7], { ...clamp, easing: ease });

  // Caption berganti sesuai bagian
  const caption =
    frame < 130
      ? "Statistik Partisipasi Pemilih"
      : frame < 245
        ? "Perolehan Suara Kandidat"
        : "Laporan PDF dan Excel";

  // Zoom pelan seluruh scene
  const sceneZoom = interpolate(frame, [0, 465], [1, 1.03], clamp);

  return (
    <AbsoluteFill>
      <Background />
      <Particles count={30} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 44,
          gap: 28,
          transform: `scale(${sceneZoom})`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 24,
              letterSpacing: 10,
              fontWeight: 600,
              color: colors.red,
              marginBottom: 8,
            }}
          >
            HASIL & LAPORAN
          </div>
          <AnimatedText
            text="Pantau Hasil dan Unduh Laporan"
            fontSize={52}
            delay={4}
            stagger={5}
          />
        </div>

        <BrowserMockup width={MOCK_W} delay={25} custom>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: colors.navy }}>
            <div
              style={{
                position: "relative",
                width: MOCK_W,
                height: IMG_H,
                // titik tumpu zoom: sekitar tombol laporan
                transformOrigin: `${MOCK_W * 0.47}px 288px`,
                transform: `translateY(-${scroll}px) scale(${zoom})`,
              }}
            >
              <Img
                src={staticFile("admin-results.png")}
                style={{ display: "block", width: MOCK_W, height: IMG_H }}
              />

              {/* Sorotan 1: kartu statistik (4 kartu) */}
              <Sequence1 from={55} to={135}>
                <Highlight x={25} y={29} w={73} h={9.5} delay={55} label="Partisipasi pemilih" />
              </Sequence1>

              {/* Sorotan 2: perolehan suara kandidat */}
              <Sequence1 from={170} to={245}>
                <Highlight x={25} y={60} w={73} h={11} delay={170} label="Perolehan suara" />
              </Sequence1>

              {/* Sorotan 3: tiga tombol laporan */}
              <Sequence1 from={335} to={465}>
                <Highlight x={24.8} y={22} w={44.5} h={5.2} delay={335} label="Laporan" />
              </Sequence1>
            </div>
          </div>
        </BrowserMockup>

        <div
          style={{
            fontFamily: headingFont,
            fontSize: 34,
            fontWeight: 600,
            color: colors.blueLight,
            letterSpacing: 4,
          }}
        >
          {caption}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Menampilkan anak hanya pada rentang frame tertentu (agar sorotan hilang saat tidak relevan)
const Sequence1: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({
  from,
  to,
  children,
}) => {
  const frame = useCurrentFrame();
  if (frame < from || frame > to) return null;
  const opacity = interpolate(frame, [to - 10, to], [1, 0], clamp);
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>{children}</div>
  );
};