import React from "react";

type IconProps = {
  size?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

// Antrean: tiga orang berbaris
export const QueueIcon: React.FC<IconProps> = ({ size = 80 }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="20" r="6" />
    <path d="M4 44 v-8 a8 8 0 0 1 16 0 v8" />
    <circle cx="32" cy="20" r="6" />
    <path d="M24 44 v-8 a8 8 0 0 1 16 0 v8" />
    <circle cx="52" cy="20" r="6" />
    <path d="M44 44 v-8 a8 8 0 0 1 16 0 v8" />
    <path d="M4 54 h56" />
  </svg>
);

// Pencatatan manual: buku dan pena
export const NotebookIcon: React.FC<IconProps> = ({ size = 80 }) => (
  <svg {...base(size)}>
    <rect x="12" y="8" width="34" height="48" rx="4" />
    <path d="M20 20 h18 M20 29 h18 M20 38 h10" />
    <path d="M44 50 l12 -22 l6 3 l-12 22 l-8 2 z" />
  </svg>
);

// Rekapitulasi: tumpukan kertas
export const PapersIcon: React.FC<IconProps> = ({ size = 80 }) => (
  <svg {...base(size)}>
    <rect x="16" y="6" width="34" height="44" rx="3" />
    <path d="M10 14 v40 a3 3 0 0 0 3 3 h30" />
    <path d="M24 18 h18 M24 27 h18 M24 36 h10" />
  </svg>
);

// Waktu: jam
export const ClockIcon: React.FC<IconProps> = ({ size = 80 }) => (
  <svg {...base(size)}>
    <circle cx="32" cy="32" r="24" />
    <path d="M32 18 v14 l10 6" />
  </svg>
);

// Pemilih: dua orang
export const VotersIcon: React.FC<IconProps> = ({ size = 80 }) => (
  <svg {...base(size)}>
    <circle cx="24" cy="22" r="9" />
    <path d="M6 54 v-4 a14 14 0 0 1 14 -14 h8 a14 14 0 0 1 14 14 v4" />
    <circle cx="46" cy="24" r="7" />
    <path d="M46 38 h2 a12 12 0 0 1 12 12 v4" />
  </svg>
);

// Kandidat: satu orang
export const UserIcon: React.FC<IconProps> = ({ size = 80 }) => (
  <svg {...base(size)}>
    <circle cx="32" cy="20" r="11" />
    <path d="M10 56 v-4 a16 16 0 0 1 16 -16 h12 a16 16 0 0 1 16 16 v4" />
  </svg>
);

// Suara: kotak suara dengan kertas
export const BallotIcon: React.FC<IconProps> = ({ size = 80 }) => (
  <svg {...base(size)}>
    <rect x="8" y="32" width="48" height="24" rx="4" />
    <path d="M24 44 h16" />
    <path d="M18 32 V12 a2 2 0 0 1 2 -2 h24 a2 2 0 0 1 2 2 V32" />
    <path d="M26 21 l5 5 l9 -10" />
  </svg>
);

// Tameng dengan centang (keamanan)
export const ShieldIcon: React.FC<IconProps> = ({ size = 80 }) => (
  <svg {...base(size)}>
    <path d="M32 6 L10 14 v16 c0 14 9 24 22 28 c13 -4 22 -14 22 -28 V14 z" />
    <path d="M22 32 l7 7 l13 -15" />
  </svg>
);

// Centang sederhana
export const CheckIcon: React.FC<IconProps> = ({ size = 80 }) => (
  <svg {...base(size)}>
    <path d="M14 34 l12 12 l24 -28" />
  </svg>
);

// Dokumen PDF
export const PdfIcon: React.FC<IconProps> = ({ size = 80 }) => (
  <svg {...base(size)}>
    <path d="M14 6 h26 l12 12 v36 a4 4 0 0 1 -4 4 h-34 a4 4 0 0 1 -4 -4 v-44 a4 4 0 0 1 4 -4 z" />
    <path d="M40 6 v12 h12" />
    <path d="M20 40 h24 M20 48 h16" />
  </svg>
);

// Tabel (Excel)
export const SheetIcon: React.FC<IconProps> = ({ size = 80 }) => (
  <svg {...base(size)}>
    <rect x="8" y="10" width="48" height="44" rx="5" />
    <path d="M8 24 h48 M8 38 h48 M26 10 v44 M42 10 v44" />
  </svg>
);