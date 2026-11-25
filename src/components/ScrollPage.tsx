import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { colors } from "../theme";

const ease = Easing.inOut(Easing.cubic);

type Props = {
  src: string;
  ratio: number;    // tinggi / lebar gambar asli
  width: number;    // lebar layar mockup (px)
  height: number;   // tinggi layar mockup (px)
  from: number;     // frame mulai muncul
  to: number;       // frame selesai (setelah fade keluar)
  fade?: number;
  isFirst?: boolean;
  isLast?: boolean;
  children?: React.ReactNode; // overlay Highlight (ikut bergulir bersama gambar)
};

export const ScrollPage: React.FC<Props> = ({
  src,
  ratio,
  width,
  height,
  from,
  to,
  fade = 15,
  isFirst = false,
  isLast = false,
  children,
}) => {
  const frame = useCurrentFrame();

  const imgH = width * ratio;
  const maxScroll = Math.max(0, imgH - height);

  const scrollPx = interpolate(frame, [from + fade, to - fade], [0, maxScroll], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  const opacity = interpolate(
    frame,
    [from, from + fade, to - fade, to],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        overflow: "hidden",
        background: colors.navy,
      }}
    >
      <div
        style={{
          position: "relative",
          width,
          height: imgH,
          transform: `translateY(-${scrollPx}px)`,
        }}
      >
        <Img src={staticFile(src)} style={{ display: "block", width, height: imgH }} />
        {children}
      </div>
    </div>
  );
};