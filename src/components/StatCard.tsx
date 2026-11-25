import React from "react";
import { GlassCard } from "./GlassCard";
import { AnimatedCounter } from "./AnimatedCounter";
import { colors } from "../theme";
import { bodyFont, headingFont } from "../fonts";

type Props = {
  label: string;
  value: number;
  icon: React.ReactNode;
  delay?: number;
  accent?: string;
};

export const StatCard: React.FC<Props> = ({
  label,
  value,
  icon,
  delay = 0,
  accent = colors.blueLight,
}) => {
  return (
    <GlassCard
      delay={delay}
      style={{
        flex: 1,
        padding: "30px 36px",
        display: "flex",
        alignItems: "center",
        gap: 30,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 26,
          background: `${accent}22`,
          border: `1px solid ${accent}66`,
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 40px ${accent}33`,
        }}
      >
        {icon}
      </div>

      <div>
        <div style={{ fontFamily: bodyFont, fontSize: 28, color: colors.textMuted }}>
          {label}
        </div>
        <AnimatedCounter
          value={value}
          delay={delay + 10}
          duration={50}
          style={{
            fontFamily: headingFont,
            fontSize: 76,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.1,
          }}
        />
      </div>
    </GlassCard>
  );
};