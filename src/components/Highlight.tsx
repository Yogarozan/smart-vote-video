import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { bodyFont } from "../fonts";

type Props = {
  x: number; // posisi kiri (persen)
  y: number; // posisi atas (persen)
  w: number; // lebar (persen)
  h: number; // tinggi (persen)
  delay?: number;
  label?: string;
  color?: string;
};

export const Highlight: React.FC<Props> = ({
  x,
  y,
  w,
  h,
  delay = 0,
  label,
  color = colors.red,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Denyut halus agar kotak terasa "hidup"
  const pulse = 0.5 + 0.5 * Math.sin(frame / 8);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        height: `${h}%`,
        border: `4px solid ${color}`,
        borderRadius: 16,
        opacity: appear,
        transform: `scale(${0.9 + appear * 0.1})`,
        boxShadow: `0 0 ${20 + pulse * 30}px ${color}, inset 0 0 ${10 + pulse * 20}px ${color}55`,
        pointerEvents: "none",
      }}
    >
      {label && (
        <div
          style={{
            position: "absolute",
            top: -46,
            left: 0,
            padding: "6px 18px",
            borderRadius: 10,
            background: color,
            color: colors.white,
            fontFamily: bodyFont,
            fontSize: 24,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};