import React from "react";
import { Img, staticFile } from "remotion";
import { colors } from "../theme";
import { bodyFont, headingFont } from "../fonts";

export type ScreenProps = {
  src?: string;      // nama file di folder public, contoh: "landing.png"
  tall?: boolean;    // true = screenshot panjang (full page) yang akan di-scroll
  scroll?: number;   // posisi scroll dalam persen tinggi gambar (0 = atas)
  zoom?: number;     // 1 = normal, 2 = diperbesar 2x
  originX?: number;  // titik fokus zoom, horizontal (0-100 persen)
  originY?: number;  // titik fokus zoom, vertikal (0-100 persen)
  label?: string;    // teks placeholder bila belum ada screenshot
  children?: React.ReactNode; // overlay, misalnya <Highlight />
};

export const ScreenContent: React.FC<ScreenProps> = ({
  src,
  tall = false,
  scroll = 0,
  zoom = 1,
  originX = 50,
  originY = 50,
  label = "Screenshot Website",
  children,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: colors.navy,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: tall ? "auto" : "100%",
          transformOrigin: `${originX}% ${originY}%`,
          transform: `translateY(-${scroll}%) scale(${zoom})`,
        }}
      >
        {src ? (
          <Img
            src={staticFile(src)}
            style={{
              display: "block",
              width: "100%",
              height: tall ? "auto" : "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        ) : (
          // Placeholder: ditampilkan selama screenshot belum dipasang
          <div
            style={{
              width: "100%",
              height: tall ? undefined : "100%",
              aspectRatio: tall ? "16 / 36" : undefined,
              background: `repeating-linear-gradient(180deg, #0d1a4a 0px, #0d1a4a 240px, #12235f 240px, #12235f 480px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: tall ? "flex-start" : "center",
              paddingTop: tall ? 120 : 0,
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: headingFont,
                fontSize: 44,
                fontWeight: 700,
                color: colors.white,
              }}
            >
              [ {label} ]
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 24,
                color: colors.textMuted,
              }}
            >
              diganti di Tahap 5
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};