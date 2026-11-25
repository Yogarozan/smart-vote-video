import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Particles } from "../components/Particles";
import { GlassCard } from "../components/GlassCard";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../theme";
import { bodyFont } from "../fonts";

export const DesignTest: React.FC = () => {
  const frame = useCurrentFrame();

  // Garis merah memanjang dari 0 ke 240px antara frame 25 dan 55
  const lineWidth = interpolate(frame, [25, 55], [0, 240], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <Particles count={70} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <GlassCard
          delay={5}
          style={{
            padding: "70px 110px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          <AnimatedText text="SMART VOTE" fontSize={130} weight={700} delay={15} letterSpacing={6} />

          <div
            style={{
              width: lineWidth,
              height: 6,
              borderRadius: 3,
              background: colors.red,
              boxShadow: `0 0 24px ${colors.red}`,
            }}
          />

          <AnimatedText
            text="The Future of Democracy"
            fontSize={44}
            weight={400}
            delay={45}
            color={colors.textMuted}
            fontFamily={bodyFont}
          />
        </GlassCard>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};