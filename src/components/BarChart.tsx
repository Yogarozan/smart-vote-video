import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedCounter } from "./AnimatedCounter";
import { colors } from "../theme";
import { bodyFont, headingFont } from "../fonts";

export type ChartItem = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  data: ChartItem[];
  delay?: number;
  height?: number;
};

export const BarChart: React.FC<Props> = ({ data, delay = 0, height = 320 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div>
      {/* Area batang */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          height,
          gap: 40,
          borderBottom: "2px solid rgba(255,255,255,0.18)",
        }}
      >
        {data.map((d, i) => {
          const grow = spring({
            frame: frame - delay - i * 8,
            fps,
            config: { damping: 200 },
          });
          const barHeight = (d.value / max) * (height - 70) * grow;

          return (
            <div
              key={d.label}
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <AnimatedCounter
                value={d.value}
                delay={delay + i * 8}
                duration={50}
                style={{
                  fontFamily: headingFont,
                  fontSize: 34,
                  fontWeight: 700,
                  color: colors.white,
                  marginBottom: 10,
                }}
              />
              <div
                style={{
                  width: "70%",
                  height: barHeight,
                  borderRadius: "14px 14px 0 0",
                  background: `linear-gradient(180deg, ${d.color}, ${d.color}88)`,
                  boxShadow: `0 0 30px ${d.color}66`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Label di bawah sumbu */}
      <div style={{ display: "flex", gap: 40, marginTop: 14 }}>
        {data.map((d) => (
          <div
            key={d.label}
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: bodyFont,
              fontSize: 26,
              color: colors.textMuted,
            }}
          >
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
};