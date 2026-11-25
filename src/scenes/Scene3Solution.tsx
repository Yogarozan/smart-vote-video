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
import { Logo } from "../components/Logo";
import { AnimatedText } from "../components/AnimatedText";
import { colors, SCENE_FRAMES } from "../theme";
import { headingFont } from "../fonts";

const IMG_H = 1000 * (7532 / 2560);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = SCENE_FRAMES[2];

  const sweepX = interpolate(frame, [0, 40], [-1200, 2200], clamp);
  const laptopIn = spring({ frame: frame - 50, fps, config: { damping: 18, stiffness: 80 } });
  const float = Math.sin(frame / 25) * 8;
  const zoom = interpolate(frame, [50, total], [1, 1.06], clamp);
  const pageScroll = interpolate(frame, [80, total - 15], [0, 620], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const titleO = interpolate(frame, [6, 24], [0, 1], clamp);

  return (
    <AbsoluteFill>
      <Background />
      <Particles count={45} />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: sweepX,
          width: 500,
          height: 1080,
          background: `linear-gradient(90deg, transparent, ${colors.blue}66, transparent)`,
          transform: "skewX(-20deg)",
          filter: "blur(30px)",
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 70,
          transform: `scale(${zoom})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Logo size={80} delay={6} />
          <div
            style={{
              fontFamily: headingFont,
              fontSize: 52,
              fontWeight: 700,
              color: colors.white,
              letterSpacing: 4,
              opacity: titleO,
            }}
          >
            SMART VOTE
          </div>
        </div>

        <div style={{ marginTop: 26 }}>
          <AnimatedText
            text="Transformasi Pemungutan Suara ke Era Digital"
            fontSize={62}
            delay={14}
            stagger={5}
          />
        </div>

        <div
          style={{
            marginTop: 50,
            transform: `translateY(${(1 - laptopIn) * 500 + float}px)`,
            opacity: laptopIn,
          }}
        >
          <div
            style={{
              width: 1000,
              height: 560,
              borderRadius: "24px 24px 0 0",
              background: "#0b0f1a",
              border: "6px solid #1c2540",
              boxShadow: `0 0 120px ${colors.blue}55`,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Img
              src={staticFile("landing.png")}
              style={{
                display: "block",
                width: 1000,
                height: IMG_H,
                transform: `translateY(-${pageScroll}px)`,
              }}
            />
          </div>

          <div
            style={{
              width: 1160,
              height: 22,
              marginLeft: -80,
              borderRadius: "0 0 30px 30px",
              background: "linear-gradient(180deg, #2a3558, #121a33)",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};