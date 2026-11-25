import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Particles } from "../components/Particles";
import { AnimatedText } from "../components/AnimatedText";
import { BrowserMockup } from "../components/BrowserMockup";
import { Highlight } from "../components/Highlight";
import { ScrollPage } from "../components/ScrollPage";
import { colors } from "../theme";
import { bodyFont, headingFont } from "../fonts";

const MOCK_W = 1180;
const MOCK_H = Math.round((MOCK_W * 9) / 16); // 664

const PAGES = [
  {
    src: "admin-dashboard.png",
    ratio: 2892 / 2560,
    caption: "Dashboard Admin",
    from: 0,
    to: 120,
  },
  {
    src: "admin-voters.png",
    ratio: 1982 / 2560,
    caption: "Manajemen Data Pemilih",
    from: 105,
    to: 210,
  },
  {
    src: "admin-elections.png",
    ratio: 2002 / 2560,
    caption: "Manajemen Pemilihan",
    from: 195,
    to: 300,
  },
  {
    src: "admin-candidates.png",
    ratio: 1600 / 2560,
    caption: "Data Kandidat",
    from: 285,
    to: 375,
  },
];

export const Scene5AdminDashboard: React.FC = () => {
  const frame = useCurrentFrame();

  const current =
    [...PAGES].reverse().find((p) => frame >= p.from + 8) ?? PAGES[0];

  const zoom = interpolate(frame, [0, 375], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <Particles count={30} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 44,
          gap: 28,
          transform: `scale(${zoom})`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 24,
              letterSpacing: 10,
              fontWeight: 600,
              color: colors.red,
              marginBottom: 8,
            }}
          >
            DASHBOARD ADMIN
          </div>
          <AnimatedText
            text="Kelola Seluruh Proses dalam Satu Panel"
            fontSize={52}
            delay={4}
            stagger={4}
          />
        </div>

        <BrowserMockup width={MOCK_W} delay={25} custom>
          {PAGES.map((p, i) => (
            <ScrollPage
              key={p.src}
              src={p.src}
              ratio={p.ratio}
              width={MOCK_W}
              height={MOCK_H}
              from={p.from}
              to={p.to}
              isFirst={i === 0}
              isLast={i === PAGES.length - 1}
            >
              {/* Sorotan pada ringkasan sistem di dashboard */}
              {i === 0 && (
                <Highlight x={25} y={40} w={73} h={14} delay={50} label="Ringkasan sistem" />
              )}
              {/* Sorotan pada daftar pemilih */}
              {i === 1 && (
                <Highlight x={25} y={42} w={73} h={50} delay={150} label="Data pemilih" />
              )}
            </ScrollPage>
          ))}
        </BrowserMockup>

        <div
          style={{
            fontFamily: headingFont,
            fontSize: 34,
            fontWeight: 600,
            color: colors.blueLight,
            letterSpacing: 4,
          }}
        >
          {current.caption}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};