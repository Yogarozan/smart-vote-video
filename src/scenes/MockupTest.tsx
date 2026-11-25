import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Particles } from "../components/Particles";
import { BrowserMockup } from "../components/BrowserMockup";
import { LaptopMockup } from "../components/LaptopMockup";
import { Highlight } from "../components/Highlight";

const ease = Easing.inOut(Easing.cubic);

// Bagian 1: browser + zoom + highlight
const BrowserDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Zoom masuk antara frame 50 dan 100
  const zoom = interpolate(frame, [50, 100], [1, 1.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <BrowserMockup
        delay={5}
        zoom={zoom}
        originX={25}
        originY={30}
        label="Landing Page"
      >
        <Highlight x={10} y={20} w={30} h={22} delay={70} label="Fitur utama" />
      </BrowserMockup>
    </AbsoluteFill>
  );
};

// Bagian 2: laptop + scroll
const LaptopDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Scroll dari atas ke 60% antara frame 40 dan 130
  const scroll = interpolate(frame, [40, 130], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <LaptopMockup delay={5} width={1100} tall scroll={scroll} label="Halaman Panjang" />
    </AbsoluteFill>
  );
};

export const MockupTest: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Particles count={35} />

      <Sequence from={0} durationInFrames={150}>
        <BrowserDemo />
      </Sequence>

      <Sequence from={150} durationInFrames={150}>
        <LaptopDemo />
      </Sequence>
    </AbsoluteFill>
  );
};