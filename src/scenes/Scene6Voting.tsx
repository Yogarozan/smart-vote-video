import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { Particles } from "../components/Particles";
import { GlassCard } from "../components/GlassCard";
import { AnimatedText } from "../components/AnimatedText";
import { BrowserMockup } from "../components/BrowserMockup";
import { Highlight } from "../components/Highlight";
import { CandidateCard } from "../components/CandidateCard";
import { CheckIcon, ShieldIcon } from "../components/Icons";
import { colors } from "../theme";
import { bodyFont, headingFont } from "../fonts";

const MOCK_W = 1180;
const MOCK_H = Math.round((MOCK_W * 9) / 16); // 664
const IMG_H = MOCK_W * (3470 / 2560);          // tinggi gambar saat lebarnya 1180
const MAX_SCROLL = IMG_H - MOCK_H;

// Nama kandidat sesuai data asli
const CANDIDATES = ["Andi Pratama", "Budi Santoso W."];
const CHOSEN = 0; // 0 = Andi Pratama

const ease = Easing.inOut(Easing.cubic);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Scene6Voting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---------- BAGIAN 1: dashboard asli ----------
  // Gulir ke kartu pemilihan (sekitar 38 persen tinggi gambar)
  const scroll = interpolate(frame, [35, 95], [0, MAX_SCROLL * 0.62], {
    ...clamp,
    easing: ease,
  });
  const part1 = interpolate(frame, [115, 140], [1, 0], clamp);

  // ---------- BAGIAN 2: memilih kandidat ----------
  const part2In = interpolate(frame, [125, 150], [0, 1], clamp);
  const part2Out = interpolate(frame, [245, 270], [1, 0], clamp);
  const part2 = Math.min(part2In, part2Out);

  const pick = spring({
    frame: frame - 185,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // ---------- BAGIAN 3: konfirmasi ----------
  const confirm = spring({
    frame: frame - 240,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const ripple = interpolate(frame, [255, 300], [0, 1], clamp);
  const part3Out = interpolate(frame, [385, 405], [1, 0], clamp);

  // ---------- Pesan akhir ----------
  const msg = spring({ frame: frame - 315, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill>
      <Background />
      <Particles count={35} />

      {/* BAGIAN 1: dashboard pemilih asli */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 44,
          gap: 28,
          opacity: part1,
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
            DASHBOARD PEMILIH
          </div>
          <AnimatedText
            text="Pilih Kandidat dengan Mudah dan Aman"
            fontSize={52}
            delay={4}
            stagger={4}
          />
        </div>

        <BrowserMockup width={MOCK_W} delay={20} custom>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: colors.navy }}>
            <div
              style={{
                position: "relative",
                width: MOCK_W,
                height: IMG_H,
                transform: `translateY(-${scroll}px)`,
              }}
            >
              <Img
                src={staticFile("voter-dashboard.png")}
                style={{ display: "block", width: MOCK_W, height: IMG_H }}
              />
              {/* Sorotan 1: kartu pemilihan aktif (sekitar 57-71 persen tinggi) */}
              <Highlight x={25} y={56.5} w={73} h={14.5} delay={75} label="Pemilihan aktif" />
            </div>
          </div>
        </BrowserMockup>
      </AbsoluteFill>

      {/* BAGIAN 2: kartu kandidat (ilustrasi dengan nama asli) */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 50,
          opacity: part2,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 26,
              letterSpacing: 10,
              fontWeight: 600,
              color: colors.red,
              marginBottom: 12,
            }}
          >
            PILIHAN KANDIDAT
          </div>
          <div style={{ fontFamily: headingFont, fontSize: 60, fontWeight: 700, color: colors.white }}>
            Pemilihan Ketua OSIS 2026
          </div>
        </div>

        <div style={{ display: "flex", gap: 80 }}>
          {CANDIDATES.map((name, i) => (
            <CandidateCard
              key={name}
              number={i + 1}
              name={name}
              delay={140 + i * 12}
              selected={i === CHOSEN ? pick : 0}
              dimmed={i === CHOSEN ? 0 : pick}
            />
          ))}
        </div>
      </AbsoluteFill>

      {/* BAGIAN 3: konfirmasi + pesan akhir */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 40,
          opacity: part3Out,
        }}
      >
        <GlassCard
          delay={240}
          style={{
            padding: "56px 120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
            transform: `scale(${0.9 + confirm * 0.1})`,
          }}
        >
          <div style={{ position: "relative", width: 150, height: 150 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `4px solid ${colors.blueLight}`,
                transform: `scale(${1 + ripple * 1.2})`,
                opacity: 1 - ripple,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`,
                color: colors.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 60px ${colors.blue}`,
                transform: `scale(${confirm})`,
              }}
            >
              <CheckIcon size={90} />
            </div>
          </div>
          <div style={{ fontFamily: headingFont, fontSize: 58, fontWeight: 700, color: colors.white }}>
            Suara Anda Berhasil Direkam
          </div>
        </GlassCard>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            opacity: msg,
            transform: `translateY(${(1 - msg) * 40}px)`,
          }}
        >
          <div style={{ color: colors.red }}>
            <ShieldIcon size={76} />
          </div>
          <div
            style={{
              fontFamily: headingFont,
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: 3,
              color: colors.white,
            }}
          >
            One Voter, <span style={{ color: colors.red }}>One Vote</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};