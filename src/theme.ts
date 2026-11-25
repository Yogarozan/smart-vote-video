export const colors = {
  navyDeep: "#060B1F",
  navy: "#0A1128",
  blue: "#2F6BFF",
  blueLight: "#5AA9FF",
  white: "#FFFFFF",
  red: "#E63946",
  textMuted: "#A9B8D9",
};

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 2700, // 90 detik x 30 FPS
};

// Lama transisi antar-scene (frame). 15 frame = 0,5 detik
export const TRANSITION = 15;

// Durasi tiap scene sesuai storyboard (detik)
export const SCENE_SECONDS = [7, 8, 8, 12, 12, 13, 15, 15];

// Durasi tiap scene dalam frame, ditambah overlap transisi
// (scene terakhir tidak perlu karena tidak ada transisi setelahnya)
export const SCENE_FRAMES = SCENE_SECONDS.map(
  (s, i) =>
    s * VIDEO.fps + (i < SCENE_SECONDS.length - 1 ? TRANSITION : 0),
);