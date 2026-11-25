import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  children: React.ReactNode;
  delay?: number; // kapan kartu mulai muncul (dalam frame)
  style?: React.CSSProperties;
};

export const GlassCard: React.FC<Props> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // spring menghasilkan angka 0 -> 1 dengan gerakan alami
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 32,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        opacity: progress,
        transform: `translateY(${(1 - progress) * 50}px) scale(${0.94 + progress * 0.06})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};