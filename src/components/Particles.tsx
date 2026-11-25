import React from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

type Props = {
  count?: number;
  color?: string;
};

export const Particles: React.FC<Props> = ({
  count = 60,
  color = colors.blueLight,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill>
      {Array.from({ length: count }).map((_, i) => {
        // Setiap partikel punya nilai acak yang tetap (berdasarkan seed teks)
        const x0 = random(`px-${i}`) * width;
        const y0 = random(`py-${i}`) * height;
        const size = 2 + random(`ps-${i}`) * 4;
        const speed = 0.3 + random(`pv-${i}`) * 0.9;
        const phase = random(`pp-${i}`) * Math.PI * 2;

        // Naik ke atas, lalu muncul lagi dari bawah (wrap-around)
        const y = (((y0 - frame * speed) % height) + height) % height;
        const x = x0 + Math.sin(frame / 40 + phase) * 20;
        const opacity = 0.25 + 0.5 * Math.abs(Math.sin(frame / 30 + phase));

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              opacity,
              boxShadow: `0 0 ${size * 3}px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};