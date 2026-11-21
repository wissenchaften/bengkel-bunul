import fs from "fs";
import path from "path";
import sharp from "sharp";

const heroPlaceholder = {
  width: 1200,
  height: 800,
  outputDir: path.join(process.cwd(), "public", "images", "hero"),
  fileName: "hero-workshop.webp",
  svg: `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a005d" />
        <stop offset="60%" stop-color="#120e3d" />
        <stop offset="100%" stop-color="#05011f" />
      </linearGradient>
      <linearGradient id="heroAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#d97706" />
      </linearGradient>
      <pattern id="heroGrid" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="1200" height="800" fill="url(#heroBg)" />
    <rect width="1200" height="800" fill="url(#heroGrid)" />

    <circle cx="600" cy="380" r="280" fill="#1d1583" opacity="0.35" />
    <rect x="0" y="0" width="1200" height="8" fill="url(#heroAccent)" />

    <!-- Branding Text -->
    <text x="600" y="140" font-family="Arial, sans-serif" font-size="18" font-weight="bold" letter-spacing="6" fill="#a5b4fc" text-anchor="middle">
      BENGKEL MOBIL BUNUL MALANG
    </text>

    <!-- Main Icon Circle -->
    <circle cx="600" cy="320" r="90" fill="#1e1b4b" stroke="rgba(255, 255, 255, 0.2)" stroke-width="3" />
    <text x="600" y="348" font-family="Arial, sans-serif" font-size="70" text-anchor="middle">
      🚗
    </text>

    <!-- Badge Tag -->
    <rect x="400" y="460" width="400" height="42" rx="8" fill="#1d1583" stroke="#f59e0b" stroke-width="1.5" />
    <text x="600" y="487" font-family="Arial, sans-serif" font-size="15" font-weight="bold" letter-spacing="3" fill="#fbbf24" text-anchor="middle">
      WORKSHOP &amp; DIAGNOSTIC BAY
    </text>

    <!-- Title -->
    <text x="600" y="560" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#ffffff" text-anchor="middle">
      Area Workshop &amp; Mekanik Profesional
    </text>

    <!-- Subtitle -->
    <text x="600" y="605" font-family="Arial, sans-serif" font-size="18" fill="#94a3b8" text-anchor="middle">
      Dokumentasi visual fasilitas resmi sedang disiapkan
    </text>

    <!-- Bottom industrial line -->
    <rect x="0" y="788" width="1200" height="12" fill="#1d1583" />
    <rect x="520" y="788" width="160" height="12" fill="#f59e0b" />
  </svg>`,
};

const aboutPlaceholders = [
  {
    width: 600,
    height: 800,
    outputDir: path.join(process.cwd(), "public", "images", "about"),
    fileName: "about-inspection.webp",
    svg: `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="600" height="800" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aboutLeftBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a005d" />
          <stop offset="70%" stop-color="#120e3d" />
          <stop offset="100%" stop-color="#04001c" />
        </linearGradient>
        <pattern id="gridLeft" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
        </pattern>
      </defs>

      <rect width="600" height="800" fill="url(#aboutLeftBg)" />
      <rect width="600" height="800" fill="url(#gridLeft)" />

      <circle cx="300" cy="360" r="180" fill="#1d1583" opacity="0.35" />
      <rect x="0" y="0" width="600" height="6" fill="#f59e0b" />

      <text x="300" y="120" font-family="Arial, sans-serif" font-size="14" font-weight="bold" letter-spacing="4" fill="#a5b4fc" text-anchor="middle">
        INSPEKSI TEKNIS
      </text>

      <circle cx="300" cy="300" r="70" fill="#1e1b4b" stroke="rgba(255, 255, 255, 0.2)" stroke-width="2" />
      <text x="300" y="322" font-family="Arial, sans-serif" font-size="52" text-anchor="middle">
        🔍
      </text>

      <rect x="150" y="420" width="300" height="36" rx="6" fill="#1d1583" stroke="#f59e0b" stroke-width="1" />
      <text x="300" y="443" font-family="Arial, sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#fbbf24" text-anchor="middle">
        INSPEKSI 40 TITIK RESMI
      </text>

      <text x="300" y="520" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">
        Balancing &amp; Kaki-kaki
      </text>

      <text x="300" y="560" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">
        Standar Presisi Pabrikan
      </text>

      <rect x="0" y="792" width="600" height="8" fill="#1d1583" />
      <rect x="250" y="792" width="100" height="8" fill="#f59e0b" />
    </svg>`,
  },
  {
    width: 800,
    height: 500,
    outputDir: path.join(process.cwd(), "public", "images", "about"),
    fileName: "about-scanner.webp",
    svg: `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scannerBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a005d" />
          <stop offset="60%" stop-color="#120e3d" />
          <stop offset="100%" stop-color="#04001c" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill="url(#scannerBg)" />
      <circle cx="400" cy="220" r="160" fill="#1d1583" opacity="0.35" />
      <rect x="0" y="0" width="800" height="6" fill="#f59e0b" />

      <circle cx="400" cy="180" r="55" fill="#1e1b4b" stroke="rgba(255, 255, 255, 0.2)" stroke-width="2" />
      <text x="400" y="198" font-family="Arial, sans-serif" font-size="40" text-anchor="middle">
        💻
      </text>

      <rect x="260" y="270" width="280" height="30" rx="6" fill="#1d1583" stroke="#f59e0b" stroke-width="1" />
      <text x="400" y="290" font-family="Arial, sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#fbbf24" text-anchor="middle">
        OBD-2 LIVE DATA SCANNER
      </text>

      <text x="400" y="340" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">
        Diagnostik Sensor &amp; ECU
      </text>
      <text x="400" y="375" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">
        Uji data teknis mendalam kendaraan
      </text>

      <rect x="0" y="492" width="800" height="8" fill="#1d1583" />
      <rect x="350" y="492" width="100" height="8" fill="#f59e0b" />
    </svg>`,
  },
  {
    width: 800,
    height: 500,
    outputDir: path.join(process.cwd(), "public", "images", "about"),
    fileName: "about-engine.webp",
    svg: `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="engineBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a005d" />
          <stop offset="60%" stop-color="#120e3d" />
          <stop offset="100%" stop-color="#04001c" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill="url(#engineBg)" />
      <circle cx="400" cy="220" r="160" fill="#1d1583" opacity="0.35" />
      <rect x="0" y="0" width="800" height="6" fill="#f59e0b" />

      <circle cx="400" cy="180" r="55" fill="#1e1b4b" stroke="rgba(255, 255, 255, 0.2)" stroke-width="2" />
      <text x="400" y="198" font-family="Arial, sans-serif" font-size="40" text-anchor="middle">
        🔧
      </text>

      <rect x="250" y="270" width="300" height="30" rx="6" fill="#1d1583" stroke="#f59e0b" stroke-width="1" />
      <text x="400" y="290" font-family="Arial, sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#fbbf24" text-anchor="middle">
        KOMPONEN MESIN OEM
      </text>

      <text x="400" y="340" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">
        Pengecekan Mekanik Berpengalaman
      </text>
      <text x="400" y="375" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">
        Penanganan presisi tanpa biaya tersembunyi
      </text>

      <rect x="0" y="492" width="800" height="8" fill="#1d1583" />
      <rect x="350" y="492" width="100" height="8" fill="#f59e0b" />
    </svg>`,
  },
];

async function generateAllPlaceholders() {
  // 1. Hero
  if (!fs.existsSync(heroPlaceholder.outputDir)) {
    fs.mkdirSync(heroPlaceholder.outputDir, { recursive: true });
  }
  const heroRawDir = path.join(heroPlaceholder.outputDir, "raw");
  if (!fs.existsSync(heroRawDir)) {
    fs.mkdirSync(heroRawDir, { recursive: true });
  }
  await sharp(Buffer.from(heroPlaceholder.svg))
    .webp({ quality: 85 })
    .toFile(path.join(heroPlaceholder.outputDir, heroPlaceholder.fileName));
  console.log(`✅ Dibuat: public/images/hero/${heroPlaceholder.fileName}`);

  // 2. About
  const aboutDir = path.join(process.cwd(), "public", "images", "about");
  if (!fs.existsSync(aboutDir)) {
    fs.mkdirSync(aboutDir, { recursive: true });
  }
  const aboutRawDir = path.join(aboutDir, "raw");
  if (!fs.existsSync(aboutRawDir)) {
    fs.mkdirSync(aboutRawDir, { recursive: true });
  }

  for (const item of aboutPlaceholders) {
    await sharp(Buffer.from(item.svg))
      .webp({ quality: 85 })
      .toFile(path.join(item.outputDir, item.fileName));
    console.log(`✅ Dibuat: public/images/about/${item.fileName}`);
  }

  console.log("✨ Seluruh placeholder Hero & About berhasil dibuat!");
}

generateAllPlaceholders().catch((err) => {
  console.error("Gagal:", err);
  process.exit(1);
});
