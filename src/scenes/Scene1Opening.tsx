import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Particles } from "../components/Particles";
import { NetworkLines } from "../components/NetworkLines";
import { Logo } from "../components/Logo";
import { AnimatedText } from "../components/AnimatedText";
import { colors, SCENE_FRAMES } from "../theme";
import { bodyFont } from "../fonts";

export const Scene1Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const total = SCENE_FRAMES[0];

  // Zoom sinematik: dari agak besar ke ukuran normal sepanjang scene
  const zoom = interpolate(frame, [0, total], [1.12, 1], {
    extrapolateRight: "clamp",
  });

  // Kilatan cahaya di belakang logo saat logo muncul
  const flash = interpolate(frame, [20, 40, 90], [0, 1, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Garis merah memanjang
  const lineWidth = interpolate(frame, [70, 100], [0, 420], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <NetworkLines />
      <Particles count={40} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${zoom})`,
        }}
      >
        {/* Cahaya di belakang logo */}
        <div
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.blue}55 0%, transparent 65%)`,
            opacity: flash,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <Logo size={150} delay={20} />
            <AnimatedText
              text="SMART VOTE"
              fontSize={140}
              weight={700}
              delay={38}
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

          <AnimatedText
            text="The Future of Democracy"
            fontSize={48}
            weight={400}
            delay={95}
            stagger={6}
            color={colors.textMuted}
            fontFamily={bodyFont}
            letterSpacing={3}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};