const { EdgeTTS } = require("node-edge-tts");
const fs = require("fs");
const path = require("path");

// ============================================================
// PENGATURAN
// ============================================================
const VOICE = "id-ID-ArdiNeural"; // suara pria Indonesia
const LANG = "id-ID";
const RATE = "+0%";               // "+0%" normal, "-10%" lebih pelan
const OUT_DIR = path.join("public", "audio");

// Format 24kHz 48kbps mono = 6000 byte per detik (dipakai untuk estimasi durasi)
const OUTPUT_FORMAT = "audio-24khz-48kbitrate-mono-mp3";
const BYTES_PER_SECOND = 6000;

// [nomor scene, batas durasi (detik), naskah]
const SCRIPT = [
  [1, 6.0, "SMART VOTE. Masa depan demokrasi, dimulai dari Anda."],
  [2, 6.5, "Proses konvensional masih penuh antrean, pencatatan manual, dan rekapitulasi yang lama."],
  [3, 6.5, "SMART VOTE hadir sebagai platform pemungutan suara digital yang modern dan transparan."],
  [4, 10.0, "Dari halaman utama, login, hingga registrasi dua langkah, semuanya dirancang agar pemilih dapat memulai dengan mudah."],
  [5, 10.0, "Admin mengelola data pemilih, pemilihan, dan kandidat dalam satu panel yang terpusat."],
  [6, 11.0, "Pemilih memilih kandidat secara digital, dan sistem memastikan satu pemilih hanya memiliki satu suara."],
  [7, 12.5, "Pantau hasil dan tingkat partisipasi pemilih, lalu unduh laporan dalam format PDF dan Excel."],
  [8, 12.5, "SMART VOTE. Smart technology, transparent democracy."],
];
// ============================================================

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generate(text, file) {
  const tts = new EdgeTTS({
    voice: VOICE,
    lang: LANG,
    outputFormat: OUTPUT_FORMAT,
    rate: RATE,
    timeout: 20000,
  });

  // Coba sampai 4 kali karena koneksi internet bisa putus
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      await tts.ttsPromise(text, file);
      return;
    } catch (err) {
      console.log(`   gagal (percobaan ${attempt}/4): ${err.message || err}`);
      if (attempt === 4) throw err;
      await sleep(2000);
    }
  }
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`Suara: ${VOICE} | Kecepatan: ${RATE}\n`);

  for (const [num, limit, text] of SCRIPT) {
    const file = path.join(OUT_DIR, `vo${num}.mp3`);
    await generate(text, file);

    const seconds = fs.statSync(file).size / BYTES_PER_SECOND;
    const status = seconds <= limit ? "OK" : "TERLALU PANJANG";
    console.log(
      `Scene ${num}: sekitar ${seconds.toFixed(1)} dtk (batas ${limit.toFixed(1)})  [${status}]`,
    );
  }

  console.log("\nSelesai. File ada di public\\audio\\vo1.mp3 sampai vo8.mp3");
  process.exit(0);
})().catch((err) => {
  console.error("\nGagal:", err.message || err);
  process.exit(1);
});