const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Supported standard service slugs for auto-detection:
// kelistrikan, rem, mesin, ac, kaki-kaki, transmisi, pendingin, berkala, body-repair

// Mapping helper to resolve variations in filenames
function normalizeSlug(filename) {
  const base = path.parse(filename).name.toLowerCase().trim();
  const standardSlugs = [
    "kelistrikan",
    "rem",
    "mesin",
    "ac",
    "kaki-kaki",
    "transmisi",
    "pendingin",
    "berkala",
    "body-repair",
  ];
  if (standardSlugs.includes(base)) return base;

  if (base.includes("kaki") || base.includes("suspens") || base.includes("spooring")) return "kaki-kaki";
  if (base.includes("kelistrik") || base.includes("battery") || (base.includes("aki") && !base.includes("kaki"))) return "kelistrikan";
  if (base.includes("rem") || base.includes("brake") || base.includes("abs")) return "rem";
  if (base.includes("mesin") || base.includes("tune") || base.includes("engine")) return "mesin";
  if (base.includes("ac") || base.includes("freon") || base.includes("flushing")) return "ac";
  if (base.includes("transmisi") || base.includes("matik") || base.includes("gearbox")) return "transmisi";
  if (base.includes("radiator") || base.includes("pendingin") || base.includes("coolant")) return "pendingin";
  if (base.includes("berkala") || base.includes("maintenance") || base.includes("oli")) return "berkala";
  if (base.includes("body") || base.includes("cat") || base.includes("repair")) return "body-repair";
  return base.replace(/[^a-z0-9_-]/g, "-");
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

async function optimizeImages() {
  const rootDir = process.cwd();
  const customInputDir = process.argv[2];
  const inputDir = customInputDir
    ? path.resolve(customInputDir)
    : path.join(rootDir, "public", "images", "services", "raw");
  const outputDir = path.join(rootDir, "public", "images", "services");

  console.log("==================================================");
  console.log("   BENGKEL MOBIL BUNUL - IMAGE OPTIMIZER");
  console.log("==================================================");
  console.log(`📁 Input Directory : ${inputDir}`);
  console.log(`📁 Output Directory: ${outputDir}`);
  console.log("⚙️  Target Format   : WebP (800x500, quality: 82, effort: 6)");
  console.log("--------------------------------------------------");

  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
    console.log(`ℹ️ Direktori input '${inputDir}' baru saja dibuat.`);
    console.log("💡 Masukkan file foto mentah (.jpg, .jpeg, .png, .webp) ke folder tersebut,");
    console.log("   lalu jalankan kembali perintah ini.");
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".jfif"].includes(ext);
  });

  if (files.length === 0) {
    console.log("⚠️ Tidak ada file gambar mentah ditemukan di direktori input.");
    console.log(`💡 Masukkan file foto ke: ${inputDir}`);
    console.log("💡 Nama file bisa langsung menggunakan slug layanan (contoh: 'kelistrikan.jpg')");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let successCount = 0;

  for (const file of files) {
    const inputFilePath = path.join(inputDir, file);
    const targetSlug = normalizeSlug(file);
    const outputFileName = `${targetSlug}.webp`;
    const outputFilePath = path.join(outputDir, outputFileName);

    try {
      const statsBefore = fs.statSync(inputFilePath);
      totalBefore += statsBefore.size;

      await sharp(inputFilePath)
        .rotate() // Auto-orient based on EXIF before stripping
        .resize(800, 500, {
          fit: "cover",
          position: "center",
        })
        .webp({
          quality: 82,
          effort: 6,
          smartSubsample: true,
        })
        .toFile(outputFilePath);

      const statsAfter = fs.statSync(outputFilePath);
      totalAfter += statsAfter.size;
      successCount++;

      const savedPercent = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(1);
      console.log(
        `✅ [${file}] -> [${outputFileName}] | ${formatBytes(statsBefore.size)} -> ${formatBytes(
          statsAfter.size
        )} (${savedPercent}% hemat)`
      );
    } catch (err) {
      console.error(`❌ Gagal mengompresi [${file}]:`, err.message);
    }
  }

  console.log("--------------------------------------------------");
  console.log(`🎉 Berhasil memproses ${successCount} dari ${files.length} gambar.`);
  if (totalBefore > 0) {
    const totalSaved = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
    console.log(
      `📊 Total Ukuran: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} (Hemat ${totalSaved}% storage)`
    );
  }
  console.log("==================================================");
}

optimizeImages().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
