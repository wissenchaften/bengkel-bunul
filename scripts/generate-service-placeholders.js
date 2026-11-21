const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const services = [
  {
    id: "kelistrikan",
    title: "Servis Kelistrikan &amp; Aki",
    badge: "ELECTRICAL &amp; ECU",
    iconChar: "⚡",
  },
  {
    id: "rem",
    title: "Sistem Rem &amp; ABS",
    badge: "OEM BRAKE SYSTEM",
    iconChar: "🛑",
  },
  {
    id: "mesin",
    title: "Engine Tune-Up Plus",
    badge: "TUNE UP &amp; OVERHAUL",
    iconChar: "🔧",
  },
  {
    id: "ac",
    title: "AC Mobil &amp; Flushing",
    badge: "CLIMATE SYSTEM",
    iconChar: "❄️",
  },
  {
    id: "kaki-kaki",
    title: "Kaki-kaki &amp; Suspensi",
    badge: "SUSPENSION &amp; ALIGNMENT",
    iconChar: "⚙️",
  },
  {
    id: "transmisi",
    title: "Transmisi Otomatis &amp; Manual",
    badge: "TRANSMISSION CARE",
    iconChar: "🔄",
  },
  {
    id: "pendingin",
    title: "Sistem Pendingin &amp; Radiator",
    badge: "COOLING SYSTEM",
    iconChar: "🌡️",
  },
  {
    id: "berkala",
    title: "Perawatan Servis Berkala",
    badge: "PERIODIC MAINTENANCE",
    iconChar: "📋",
  },
  {
    id: "body-repair",
    title: "Body Repair &amp; Cat Panel",
    badge: "BODYWORK &amp; PAINT",
    iconChar: "🔨",
  },
];

function createServiceSvg(service) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a005d" />
        <stop offset="50%" stop-color="#120e3d" />
        <stop offset="100%" stop-color="#060228" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#d97706" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Background Base -->
    <rect width="800" height="500" fill="url(#bgGradient)" />
    <!-- Grid Overlay -->
    <rect width="800" height="500" fill="url(#grid)" />

    <!-- Ambient Glow Circle -->
    <circle cx="400" cy="220" r="180" fill="#1d1583" opacity="0.4" />

    <!-- Industrial Top Bar -->
    <rect x="0" y="0" width="800" height="6" fill="url(#accentGrad)" />

    <!-- Workshop Branding Header -->
    <text x="400" y="70" font-family="Arial, sans-serif" font-size="14" font-weight="bold" letter-spacing="4" fill="#a5b4fc" text-anchor="middle">
      BENGKEL MOBIL BUNUL MALANG
    </text>

    <!-- Center Icon Circle -->
    <circle cx="400" cy="180" r="60" fill="#1e1b4b" stroke="rgba(255, 255, 255, 0.15)" stroke-width="2" />
    <text x="400" y="196" font-family="Arial, sans-serif" font-size="44" text-anchor="middle">
      ${service.iconChar}
    </text>

    <!-- Badge Tag -->
    <rect x="250" y="270" width="300" height="30" rx="6" fill="#1d1583" stroke="#f59e0b" stroke-width="1" />
    <text x="400" y="290" font-family="Arial, sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#fbbf24" text-anchor="middle">
      ${service.badge}
    </text>

    <!-- Service Title -->
    <text x="400" y="340" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">
      ${service.title}
    </text>

    <!-- Subtitle Note -->
    <text x="400" y="375" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">
      Foto resmi teknis sedang dalam proses kurasi presisi
    </text>

    <!-- Industrial Bottom Line Accent -->
    <rect x="0" y="492" width="800" height="8" fill="#1d1583" />
    <rect x="350" y="492" width="100" height="8" fill="#f59e0b" />
  </svg>
  `;
}

async function generatePlaceholders() {
  const outputDir = path.join(process.cwd(), "public", "images", "services");
  const rawDir = path.join(outputDir, "raw");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  if (!fs.existsSync(rawDir)) {
    fs.mkdirSync(rawDir, { recursive: true });
  }

  console.log("🎨 Menghasilkan 9 placeholder WebP industrial...");

  for (const s of services) {
    const svg = createServiceSvg(s);
    const outputPath = path.join(outputDir, `${s.id}.webp`);

    await sharp(Buffer.from(svg))
      .webp({ quality: 85 })
      .toFile(outputPath);

    console.log(`✅ Dibuat: public/images/services/${s.id}.webp`);
  }

  console.log("✨ Seluruh 9 placeholder WebP berhasil dibuat!");
}

generatePlaceholders().catch((err) => {
  console.error("Gagal membuat placeholder:", err);
  process.exit(1);
});
