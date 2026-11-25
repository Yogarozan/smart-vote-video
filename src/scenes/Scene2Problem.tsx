import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { Particles } from "../components/Particles";
import { GlassCard } from "../components/GlassCard";
import { AnimatedText } from "../components/AnimatedText";
import {
  ClockIcon,
  NotebookIcon,
  PapersIcon,
  QueueIcon,
} from "../components/Icons";
import { colors, SCENE_FRAMES } from "../theme";
import { bodyFont, headingFont } from "../fonts";

const problems = [
  { icon: <QueueIcon size={90} />, title: "Antrean Panjang", desc: "Pemilih harus menunggu giliran" },
  { icon: <NotebookIcon size={90} />, title: "Pencatatan Manual", desc: "Rawan salah catat dan data ganda" },
  { icon: <PapersIcon size={90} />, title: "Rekapitulasi Lambat", desc: "Penghitungan suara memakan waktu" },
  { icon: <ClockIcon size={90} />, title: "Proses Memakan Waktu", desc: "Hasil akhir tidak instan" },
];

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = SCENE_FRAMES[1];

  // Zoom sangat pelan sepanjang scene
  const zoom = interpolate(frame, [0, total], [1, 1.04], {
    extrapolateRight: "clamp",
  });

  // Efek "lemah" di akhir scene: seluruh konten sedikit memudar
  const fadeOut = interpolate(frame, [total - 30, total - 10], [1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <Particles count={25} color={colors.red} />

      {/* Lapisan merah tipis supaya suasana terasa "bermasalah" */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 120%, ${colors.red}33 0%, transparent 60%)`,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 70,
          transform: `scale(${zoom})`,
          opacity: fadeOut,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 28,
              letterSpacing: 10,
              color: colors.red,
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            TANTANGAN
          </div>
          <AnimatedText
            text="Pemungutan Suara Konvensional"
            fontSize={74}
            delay={4}
            stagger={5}
          />
        </div>

        <div style={{ display: "flex", gap: 36 }}>
          {problems.map((p, i) => {
            const delay = 30 + i * 18;

            // Ikon sedikit "bergetar" saat kartu muncul untuk kesan kacau
            const shake = spring({
              frame: frame - delay - 8,
              fps,
              config: { damping: 6, stiffness: 200 },
            });
            const rotate = (1 - shake) * 6;

            return (
              <GlassCard
                key={p.title}
                delay={delay}
                style={{
                  width: 380,
                  padding: "50px 30px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 22,
                  textAlign: "center",
                  borderColor: "rgba(230,57,70,0.35)",
                }}
              >
                <div style={{ color: colors.red, transform: `rotate(${rotate}deg)` }}>
                  {p.icon}
                </div>
                <div
                  style={{
                    fontFamily: headingFont,
                    fontSize: 34,
                    fontWeight: 700,
                    color: colors.white,
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 24,
                    color: colors.textMuted,
                    lineHeight: 1.4,
                  }}
                >
                  {p.desc}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};