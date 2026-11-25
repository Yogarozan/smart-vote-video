import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { Particles } from "../components/Particles";
import { AnimatedText } from "../components/AnimatedText";
import { colors } from "../theme";
import { bodyFont } from "../fonts";

type Props = {
  title: string;
  subtitle: string;
};

export const ScenePlaceholder: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <AbsoluteFill>
      <Background />
      <Particles count={30} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <AnimatedText text={title} fontSize={100} delay={5} />
        <AnimatedText
          text={subtitle}
          fontSize={40}
          weight={400}
          delay={20}
          color={colors.textMuted}
          fontFamily={bodyFont}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};