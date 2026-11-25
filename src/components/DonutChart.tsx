import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedCounter } from "./AnimatedCounter";
import { ChartItem } from "./BarChart";
import { colors } from "../theme";
import { bodyFont, headingFont } from "../fonts";

type Props = {
  data: ChartItem[];
  size?: number;
  stroke?: number;
  delay?: number;
};

export const DonutChart: React.FC<Props> = ({
  data,
  size = 280,
  stroke = 44,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  // Satu progres untuk seluruh donat: 0 -> 1 selama 60 frame
  const p = spring({
    frame: frame - delay,
    fps,
    durationInFrames: 60,
    config: { damping: 200 },
  });

  let cumulative = 0; // posisi awal tiap segmen (pecahan dari total)

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }} // mulai dari jam 12
      >
        {/* Lintasan dasar */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />

        {data.map((d) => {
          const fraction = d.value / total;
          const length = fraction * circumference * p;
          const offset = -cumulative * circumference * p;
          cumulative += fraction;

          return (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth={stroke}
              strokeDasharray={`${length} ${circumference}`}
              strokeDashoffset={offset}
              style={{ filter: `drop-shadow(0 0 10px ${d.color}88)` }}
            />
          );
        })}
      </svg>

      {/* Teks di tengah donat */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatedCounter
          value={total}
          delay={delay}
          duration={60}
          style={{
            fontFamily: headingFont,
            fontSize: 58,
            fontWeight: 700,
            color: colors.white,
          }}
        />
        <div style={{ fontFamily: bodyFont, fontSize: 24, color: colors.textMuted }}>
          total suara
        </div>
      </div>
    </div>
  );
};