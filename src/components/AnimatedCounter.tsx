import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  value: number;
  delay?: number;     // mulai menghitung pada frame ke-berapa
  duration?: number;  // lama menghitung (frame)
  decimals?: number;  // jumlah angka di belakang koma
  suffix?: string;    // contoh: "%"
  style?: React.CSSProperties;
};

export const AnimatedCounter: React.FC<Props> = ({
  value,
  delay = 0,
  duration = 45,
  decimals = 0,
  suffix = "",
  style,
}) => {
  const frame = useCurrentFrame();

  // Progres 0 -> 1, awalnya cepat lalu melambat (easing out)
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const text = (value * progress).toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {text}
      {suffix}
    </span>
  );
};