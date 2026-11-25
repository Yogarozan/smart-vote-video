import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

// ============================================================
// PILIH GAYA LOGO
//  "dark"  = garis kiri PUTIH, tanpa kotak (cocok di latar gelap)
//  "tile"  = warna asli (garis kiri navy) dengan kotak putih di belakang
// ============================================================
const STYLE: "dark" | "tile" = "dark";
// ============================================================

const BLUE = "#2563EB";
const RED = "#DC2626";
const NAVY = "#080F1F";

type Props = {
  size?: number;
  delay?: number;
};

export const Logo: React.FC<Props> = ({ size = 150, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;

  // Kemunculan keseluruhan (membal)
  const pop = spring({ frame: f, fps, config: { damping: 14, stiffness: 120 } });

  // Garis kiri tergambar (frame 0-14), lalu garis kanan (frame 12-28)
  const left = interpolate(f, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const right = interpolate(f, [12, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Titik merah dan kotak kecil
  const dot = spring({ frame: f - 26, fps, config: { damping: 10, stiffness: 160 } });
  const squares = interpolate(f, [34, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leftColor = STYLE === "tile" ? NAVY : colors.white;

  const icon = (
    <svg width="100%" height="100%" viewBox="0 0 64 64">
      {/* Garis kiri */}
      <path
        d="M10 16L27 46"
        fill="none"
        stroke={leftColor}
        strokeWidth={10}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - left}
        opacity={left > 0 ? 1 : 0}
      />
      {/* Garis kanan */}
      <path
        d="M27 46L52 13"
        fill="none"
        stroke={BLUE}
        strokeWidth={10}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - right}
        opacity={right > 0 ? 1 : 0}
      />
      {/* Titik merah */}
      <circle
        cx={53}
        cy={12}
        r={6 * dot}
        fill={RED}
        style={{ filter: `drop-shadow(0 0 3px ${RED})` }}
      />
      {/* Dua kotak kecil */}
      <rect x={40} y={50} width={7} height={7} rx={1.5} fill={BLUE} opacity={squares} />
      <rect x={51} y={50} width={7} height={7} rx={1.5} fill={BLUE} opacity={0.45 * squares} />
    </svg>
  );

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `scale(${pop})`,
        filter: `drop-shadow(0 0 ${size * 0.2}px ${colors.blue}99)`,
      }}
    >
      {STYLE === "tile" ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: size * 0.24,
            background: colors.white,
            padding: size * 0.12,
            boxSizing: "border-box",
          }}
        >
          {icon}
        </div>
      ) : (
        icon
      )}
    </div>
  );
};