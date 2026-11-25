import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { ScreenContent, ScreenProps } from "./ScreenContent";

type Props = ScreenProps & {
  width?: number;
  delay?: number;
  float?: boolean;
};

export const LaptopMockup: React.FC<Props> = ({
  width = 1000,
  delay = 0,
  float = true,
  ...screen
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const floatY = float ? Math.sin(frame / 25) * 8 : 0;
  const screenHeight = Math.round((width * 10) / 16);

  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${(1 - enter) * 400 + floatY}px)`,
      }}
    >
      {/* Layar */}
      <div
        style={{
          width,
          height: screenHeight,
          borderRadius: "24px 24px 0 0",
          background: "#0b0f1a",
          border: "8px solid #1c2540",
          borderBottomWidth: 12,
          boxShadow: `0 0 120px ${colors.blue}55`,
          overflow: "hidden",
          boxSizing: "content-box",
        }}
      >
        <ScreenContent {...screen} />
      </div>

      {/* Dasar laptop */}
      <div
        style={{
          width: width * 1.16,
          height: 22,
          marginLeft: -width * 0.08 - 8,
          borderRadius: "0 0 30px 30px",
          background: "linear-gradient(180deg, #2a3558, #121a33)",
        }}
      />
    </div>
  );
};