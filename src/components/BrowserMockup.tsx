import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { bodyFont } from "../fonts";
import { ScreenContent, ScreenProps } from "./ScreenContent";

type Props = ScreenProps & {
  width?: number;
  url?: string;
  delay?: number;
  float?: boolean;
  custom?: boolean; // true = children dipakai langsung sebagai isi layar
};

export const BrowserMockup: React.FC<Props> = ({
  width = 1400,
  url = "smartvote.test",
  delay = 0,
  float = true,
  custom = false,
  children,
  ...screen
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const floatY = float ? Math.sin(frame / 28) * 7 : 0;
  const screenHeight = Math.round((width * 9) / 16);

  return (
    <div
      style={{
        width,
        borderRadius: 22,
        overflow: "hidden",
        background: "#0f1730",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 100px ${colors.blue}44`,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 120 + floatY}px) scale(${0.92 + enter * 0.08})`,
      }}
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: "0 26px",
          background: "linear-gradient(180deg, #1a2447, #121a36)",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: colors.red }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#F4B942" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#3DDC84" }} />
        </div>

        <div
          style={{
            flex: 1,
            height: 36,
            borderRadius: 18,
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            fontFamily: bodyFont,
            fontSize: 20,
            color: colors.textMuted,
          }}
        >
          {url}
        </div>
      </div>

      <div style={{ width: "100%", height: screenHeight, position: "relative" }}>
        {custom ? (
          <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
            {children}
          </div>
        ) : (
          <ScreenContent {...screen}>{children}</ScreenContent>
        )}
      </div>
    </div>
  );
};