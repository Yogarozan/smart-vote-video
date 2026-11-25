import React from "react";
import { GlassCard } from "./GlassCard";
import { CheckIcon, UserIcon } from "./Icons";
import { colors } from "../theme";
import { bodyFont, headingFont } from "../fonts";

type Props = {
  number: number;
  name: string;
  delay?: number;
  selected?: number; // 0 = belum dipilih, 1 = terpilih penuh
  dimmed?: number;   // 0 = normal, 1 = meredup (tidak dipilih)
};

export const CandidateCard: React.FC<Props> = ({
  number,
  name,
  delay = 0,
  selected = 0,
  dimmed = 0,
}) => {
  return (
    <div
      style={{
        opacity: 1 - dimmed * 0.55,
        transform: `scale(${1 + selected * 0.06})`,
      }}
    >
      <GlassCard
        delay={delay}
        style={{
          width: 360,
          padding: "44px 30px 38px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          position: "relative",
          borderColor: selected > 0.5 ? colors.blueLight : "rgba(255,255,255,0.14)",
          boxShadow:
            selected > 0
              ? `0 0 ${selected * 70}px ${colors.blue}, 0 30px 80px rgba(0,0,0,0.45)`
              : "0 30px 80px rgba(0,0,0,0.45)",
        }}
      >
        {/* Nomor urut */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 22,
            fontFamily: headingFont,
            fontSize: 30,
            fontWeight: 700,
            color: colors.textMuted,
          }}
        >
          No. {number}
        </div>

        {/* Lencana centang */}
        <div
          style={{
            position: "absolute",
            top: -22,
            right: -22,
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: colors.blue,
            color: colors.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${selected})`,
            boxShadow: `0 0 30px ${colors.blue}`,
          }}
        >
          <CheckIcon size={38} />
        </div>

        {/* Avatar */}
        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.blue}55, ${colors.blueLight}22)`,
            border: `2px solid ${colors.blueLight}66`,
            color: colors.blueLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <UserIcon size={100} />
        </div>

        <div
          style={{
            fontFamily: headingFont,
            fontSize: 38,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          {name}
        </div>

        {/* Tombol pilih */}
        <div
          style={{
            padding: "14px 44px",
            borderRadius: 16,
            fontFamily: bodyFont,
            fontSize: 26,
            fontWeight: 600,
            color: colors.white,
            background:
              selected > 0.5
                ? `linear-gradient(90deg, ${colors.blue}, ${colors.blueLight})`
                : "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {selected > 0.5 ? "Terpilih" : "Pilih"}
        </div>
      </GlassCard>
    </div>
  );
};