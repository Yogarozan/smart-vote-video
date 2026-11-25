import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { headingFont } from "../fonts";

type Props = {
  text: string;
  delay?: number;
  stagger?: number; // jeda antar kata (frame)
  fontSize?: number;
  weight?: number;
  color?: string;
  letterSpacing?: number;
  fontFamily?: string;
};

export const AnimatedText: React.FC<Props> = ({
  text,
  delay = 0,
  stagger = 4,
  fontSize = 72,
  weight = 700,
  color = colors.white,
  letterSpacing = 0,
  fontFamily = headingFont,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        fontFamily,
        fontSize,
        fontWeight: weight,
        color,
        letterSpacing,
      }}
    >
      {words.map((word, i) => {
        const progress = spring({
          frame: frame - delay - i * stagger,
          fps,
          config: { damping: 200 },
        });

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              opacity: progress,
              transform: `translateY(${(1 - progress) * 40}px)`,
              filter: `blur(${(1 - progress) * 10}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};