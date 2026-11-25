import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../theme";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Gerakan pelan memakai sin/cos berdasarkan nomor frame
  const driftX = Math.sin(frame / 60) * 90;
  const driftY = Math.cos(frame / 75) * 70;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.navyDeep} 0%, ${colors.navy} 55%, #0D1B4C 100%)`,
      }}
    >
      {/* Glow biru besar (kanan atas) */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          left: 1000 + driftX,
          top: -350 + driftY,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.blue}66 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      />

      {/* Glow merah kecil sebagai aksen (kiri bawah) */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          left: -150 - driftX,
          top: 650 - driftY,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.red}40 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Grid halus yang bergeser pelan */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(rgba(90,169,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(90,169,255,0.07) 1px, transparent 1px)`,
          backgroundSize: "90px 90px",
          backgroundPosition: `0px ${frame * 0.4}px`,
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Vignette: tepi layar menggelap */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};