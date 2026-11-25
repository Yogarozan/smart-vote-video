import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../theme";

type Props = {
  count?: number;       // jumlah titik
  maxDistance?: number; // jarak maksimal untuk menarik garis
};

export const NetworkLines: React.FC<Props> = ({
  count = 34,
  maxDistance = 330,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Jaringan muncul perlahan selama 2 detik pertama
  const reveal = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Posisi tiap titik: tetap (random berdasarkan seed) + bergoyang pelan
  const nodes = Array.from({ length: count }).map((_, i) => {
    const phase = random(`nphase-${i}`) * Math.PI * 2;
    return {
      x: random(`nx-${i}`) * width + Math.sin(frame / 50 + phase) * 40,
      y: random(`ny-${i}`) * height + Math.cos(frame / 60 + phase) * 40,
    };
  });

  const lines: React.ReactNode[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        lines.push(
          <line
            key={`${i}-${j}`}
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[j].x}
            y2={nodes[j].y}
            stroke={colors.blueLight}
            strokeWidth={1.5}
            opacity={(1 - dist / maxDistance) * 0.5 * reveal}
          />,
        );
      }
    }
  }

  return (
    <AbsoluteFill>
      <svg width={width} height={height}>
        {lines}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={4}
            fill={colors.blueLight}
            opacity={0.9 * reveal}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};