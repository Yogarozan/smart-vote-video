import React from "react";
import { Audio, Sequence, interpolate, staticFile, useVideoConfig } from "remotion";

// ============================================================
// SAKLAR: ubah ke false jika filenya belum ada di public/audio
// ============================================================
const HAS_MUSIC = true;
const HAS_WHOOSH = true;
const HAS_HIT = true;
const HAS_CLICK = true;
const HAS_SUCCESS = true;
const HAS_VOICEOVER = false;
// ============================================================

// Volume (0 sampai 1)
const MUSIC_VOLUME = 0.45;  // musik saat tidak ada narasi
const DUCK_VOLUME = 0.14;   // musik saat narator berbicara
const SFX_VOLUME = 0.6;
const VO_VOLUME = 1;

// Frame awal tiap scene (sudah memperhitungkan overlap transisi)
const SCENE_START = {
  s1: 0,
  s2: 210,
  s3: 450,
  s4: 690,
  s5: 1050,
  s6: 1410,
  s7: 1800,
  s8: 2250,
};

// Narasi: [nomor, frame mulai, perkiraan lama (frame)]
// Perkiraan lama dipakai untuk menurunkan musik, bukan untuk memotong suara.
const VOICEOVER: { n: number; from: number; len: number }[] = [
  { n: 1, from: 30, len: 190 },
  { n: 2, from: SCENE_START.s2 + 15, len: 205 },
  { n: 3, from: SCENE_START.s3 + 15, len: 175 },
  { n: 4, from: SCENE_START.s4 + 15, len: 245 },
  { n: 5, from: SCENE_START.s5 + 15, len: 185 },
  { n: 6, from: SCENE_START.s6 + 15, len: 200 },
  { n: 7, from: SCENE_START.s7 + 15, len: 195 },
  { n: 8, from: SCENE_START.s8 + 20, len: 185 },
];

// Whoosh berbunyi sedikit sebelum scene baru muncul
const WHOOSH_FRAMES = [
  SCENE_START.s2,
  SCENE_START.s3,
  SCENE_START.s4,
  SCENE_START.s5,
  SCENE_START.s6,
  SCENE_START.s7,
  SCENE_START.s8,
].map((f) => f - 4);

// Faktor volume musik pada frame tertentu (1 = penuh, DUCK = diturunkan)
const duckAmount = (frame: number): number => {
  let level = MUSIC_VOLUME;
  if (!HAS_VOICEOVER) return level;
  for (const v of VOICEOVER) {
    const start = v.from;
    const end = v.from + v.len;
    const vol = interpolate(
      frame,
      [start - 10, start + 8, end - 6, end + 12],
      [MUSIC_VOLUME, DUCK_VOLUME, DUCK_VOLUME, MUSIC_VOLUME],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    level = Math.min(level, vol);
  }
  return level;
};

export const AudioTrack: React.FC = () => {
  const { durationInFrames } = useVideoConfig();

  // Musik: fade in di awal, fade out di akhir, dan turun saat narasi
  const musicVolume = (frame: number) => {
    const fade = interpolate(
      frame,
      [0, 45, durationInFrames - 90, durationInFrames],
      [0, 1, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    return fade * duckAmount(frame);
  };

  return (
    <>
      {HAS_MUSIC && ( 
        <Audio src={staticFile("audio/music.mp3")} volume={musicVolume} />
      )}

      {/* Narasi tiap scene */}
      {HAS_VOICEOVER &&
        VOICEOVER.map((v) => (
          <Sequence key={v.n} from={v.from}>
            <Audio src={staticFile(`audio/vo${v.n}.mp3`)} volume={VO_VOLUME} />
          </Sequence>
        ))}

      {/* Whoosh saat berpindah scene */}
      {HAS_WHOOSH &&
        WHOOSH_FRAMES.map((f) => (
          <Sequence key={f} from={f} durationInFrames={30}>
            <Audio src={staticFile("audio/whoosh.mp3")} volume={SFX_VOLUME} />
          </Sequence>
        ))}

      {/* Hit sinematik: logo muncul (Scene 1) dan logo kembali (Scene 8) */}
      {HAS_HIT && (
        <>
          <Sequence from={22} durationInFrames={90}>
            <Audio src={staticFile("audio/hit.mp3")} volume={SFX_VOLUME} />
          </Sequence>
          <Sequence from={SCENE_START.s8 + 6} durationInFrames={90}>
            <Audio src={staticFile("audio/hit.mp3")} volume={SFX_VOLUME} />
          </Sequence>
        </>
      )}

      {/* Klik: kandidat dipilih (Scene 6, frame lokal 185) */}
      {HAS_CLICK && (
        <Sequence from={SCENE_START.s6 + 185} durationInFrames={30}>
          <Audio src={staticFile("audio/click.mp3")} volume={SFX_VOLUME} />
        </Sequence>
      )}

      {/* Sukses: suara berhasil direkam (Scene 6, frame lokal 240) */}
      {HAS_SUCCESS && (
        <Sequence from={SCENE_START.s6 + 240} durationInFrames={60}>
          <Audio src={staticFile("audio/success.mp3")} volume={SFX_VOLUME} />
        </Sequence>
      )}
    </>
  );
};