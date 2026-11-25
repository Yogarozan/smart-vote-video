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
import { NetworkLines } from "../components/NetworkLines";
import { Logo } from "../components/Logo";
import { AnimatedText } from "../components/AnimatedText";
import { colors, SCENE_FRAMES } from "../theme";
import { bodyFont, headingFont } from "../fonts";

export const Scene8Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = SCENE_FRAMES[7];

  // Zoom keluar pelan ala film
  const zoom = interpolate(frame, [0, total], [1.1, 1], {
    extrapolateRight: "clamp",
  });

  // Cahaya di belakang logo
  const glow = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Garis merah
  const lineWidth = interpolate(frame, [60, 95], [0, 520], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tombol call to action
  const cta = spring({
    frame: frame - 180,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Kilau berdenyut di tombol CTA
  const pulse = 0.5 + 0.5 * Math.sin(frame / 10);

  // Memudar ke hitam di 20 frame terakhir
  const fadeOut = interpolate(frame, [total - 20, total], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <NetworkLines />
      <Particles count={45} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 34,
          transform: `scale(${zoom})`,
          opacity: fadeOut,
        }}
      >
        {/* Cahaya latar */}
        <div
          style={{
            position: "absolute",
            width: 1100,
            height: 1100,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.blue}55 0%, transparent 65%)`,
            opacity: glow,
          }}
        />

        {/* Logo dan nama */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <Logo size={140} delay={5} />
          <AnimatedText
            text="SMART VOTE"
            fontSize={130}
            weight={700}
            delay={20}
            stagger={8}
            letterSpacing={6}
          />
        </div>

        <div
          style={{
            width: lineWidth,
            height: 6,
            borderRadius: 3,
            background: colors.red,
            boxShadow: `0 0 24px ${colors.red}`,
          }}
        />

        {/* Tagline penutup */}
        <AnimatedText
          text="Smart Technology, Transparent Democracy"
          fontSize={58}
          weight={600}
          delay={90}
          stagger={6}
        />

        {/* Call to action */}
        <div
          style={{
            marginTop: 30,
            padding: "26px 70px",
            borderRadius: 60,
            background: `linear-gradient(90deg, ${colors.blue}, ${colors.blueLight})`,
            fontFamily: bodyFont,
            fontSize: 38,
            fontWeight: 600,
            color: colors.white,
            letterSpacing: 2,
            opacity: cta,
            transform: `scale(${0.8 + cta * 0.2})`,
            boxShadow: `0 0 ${30 + pulse * 50}px ${colors.blue}`,
          }}
        >
          Discover the Future of Digital Voting
        </div>

        <div
          style={{
            fontFamily: headingFont,
            fontSize: 26,
            letterSpacing: 8,
            color: colors.textMuted,
            opacity: interpolate(frame, [210, 240], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          SISTEM PEMUNGUTAN SUARA DIGITAL
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};