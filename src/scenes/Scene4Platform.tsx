import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Background } from "../components/Background";
import { Particles } from "../components/Particles";
import { AnimatedText } from "../components/AnimatedText";
import { BrowserMockup } from "../components/BrowserMockup";
import { colors } from "../theme";
import { bodyFont, headingFont } from "../fonts";

// Ukuran layar mockup (lebar 1180, rasio 16:9)
const MOCK_W = 1180;
const MOCK_H = Math.round((MOCK_W * 9) / 16); // 664

// Rasio asli tiap screenshot (tinggi / lebar)
const PAGES = [
  { src: "landing.png", ratio: 7532 / 2560, caption: "Landing Page", from: 0, to: 175 },
  { src: "login.png", ratio: 1600 / 2560, caption: "Login Pengguna", from: 165, to: 255 },
  { src: "register1.png", ratio: 1908 / 2560, caption: "Registrasi: Langkah 1", from: 245, to: 315 },
  { src: "register2.png", ratio: 2122 / 2560, caption: "Registrasi: Langkah 2", from: 305, to: 375 },
];

const FADE = 15;
const ease = Easing.inOut(Easing.cubic);

const Page: React.FC<{
  src: string;
  ratio: number;
  from: number;
  to: number;
  isFirst: boolean;
  isLast: boolean;
}> = ({ src, ratio, from, to, isFirst, isLast }) => {
  const frame = useCurrentFrame();

  // Tinggi gambar saat lebarnya dipaskan ke mockup
  const imgH = MOCK_W * ratio;
  // Jarak maksimal yang bisa digulir (px). 0 jika gambar lebih pendek dari layar.
  const maxScroll = Math.max(0, imgH - MOCK_H);

  // Gulir dimulai sedikit setelah halaman muncul, selesai sebelum halaman keluar
  const start = from + FADE;
  const end = to - FADE;
  const scrollPx = interpolate(frame, [start, end], [0, maxScroll], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  const opacity = interpolate(
    frame,
    [from, from + FADE, to - FADE, to],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        overflow: "hidden",
        background: colors.navy,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          display: "block",
          width: MOCK_W,
          height: imgH,
          transform: `translateY(-${scrollPx}px)`,
        }}
      />
    </div>
  );
};

export const Scene4Platform: React.FC = () => {
  const frame = useCurrentFrame();

  const current =
    PAGES.find((p) => frame >= p.from + FADE && frame < p.to - FADE + 1) ??
    PAGES.find((p) => frame < p.to) ??
    PAGES[PAGES.length - 1];

  const zoom = interpolate(frame, [0, 375], [1, 1.03], {
    extrapolateRight: "clamp",
  });

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
          transform: `scale(${zoom})`,
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
            PLATFORM OVERVIEW
          </div>
          <AnimatedText
            text="Satu Platform untuk Admin dan Pemilih"
            fontSize={52}
            delay={4}
            stagger={4}
          />
        </div>

        <BrowserMockup width={MOCK_W} delay={25} custom>
          {PAGES.map((p, i) => (
            <Page
              key={p.src}
              src={p.src}
              ratio={p.ratio}
              from={p.from}
              to={p.to}
              isFirst={i === 0}
              isLast={i === PAGES.length - 1}
            />
          ))}
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
          {current.caption}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};