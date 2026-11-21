import fs from "fs";
import path from "path";
import sharp from "sharp";

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

const SECTION_CONFIGS = {
  services: {
    name: "Katalog Layanan",
    inputDir: path.join(process.cwd(), "public", "images", "services", "raw"),
    outputDir: path.join(process.cwd(), "public", "images", "services"),
    defaultWidth: 800,
    defaultHeight: 500,
    resolveTarget: (filename) => {
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
      if (standardSlugs.includes(base)) return `${base}.webp`;

      if (base.includes("kaki") || base.includes("suspens") || base.includes("spooring")) return "kaki-kaki.webp";
      if (base.includes("kelistrik") || base.includes("battery") || (base.includes("aki") && !base.includes("kaki"))) return "kelistrikan.webp";
      if (base.includes("rem") || base.includes("brake") || base.includes("abs")) return "rem.webp";
      if (base.includes("mesin") || base.includes("tune") || base.includes("engine")) return "mesin.webp";
      if (base.includes("ac") || base.includes("freon") || base.includes("flushing")) return "ac.webp";
      if (base.includes("transmisi") || base.includes("matik") || base.includes("gearbox")) return "transmisi.webp";
      if (base.includes("radiator") || base.includes("pendingin") || base.includes("coolant")) return "pendingin.webp";
      if (base.includes("berkala") || base.includes("maintenance") || base.includes("oli")) return "berkala.webp";
      if (base.includes("body") || base.includes("cat") || base.includes("repair")) return "body-repair.webp";
      return `${base.replace(/[^a-z0-9_-]/g, "-")}.webp`;
    },
  },
  hero: {
    name: "Hero Section",
    inputDir: path.join(process.cwd(), "public", "images", "hero", "raw"),
    outputDir: path.join(process.cwd(), "public", "images", "hero"),
    defaultWidth: 1200,
    defaultHeight: 800,
    resolveTarget: (_filename) => "hero-workshop.webp",
  },
  about: {
    name: "About Section",
    inputDir: path.join(process.cwd(), "public", "images", "about", "raw"),
    outputDir: path.join(process.cwd(), "public", "images", "about"),
    defaultWidth: 800,
    defaultHeight: 500,
    resolveTarget: (filename) => {
      const base = path.parse(filename).name.toLowerCase().trim();
      if (base.includes("inspect") || base.includes("balance") || base.includes("kaki") || base.includes("roda")) {
        return { target: "about-inspection.webp", width: 600, height: 800 };
      }
      if (base.includes("scan") || base.includes("obd") || base.includes("laptop")) {
        return { target: "about-scanner.webp", width: 800, height: 500 };
      }
      return { target: "about-engine.webp", width: 800, height: 500 };
    },
  },
};

async function processSection(key, customInputDir) {
  const conf = SECTION_CONFIGS[key];
  if (!conf) return;

  const inputDir = customInputDir ? path.resolve(customInputDir) : conf.inputDir;
  const outputDir = conf.outputDir;

  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".jfif"].includes(ext);
  });

  console.log(`\n📂 [${conf.name.toUpperCase()}]`);
  console.log(`   Input : ${inputDir}`);
  console.log(`   Output: ${outputDir}`);

  if (files.length === 0) {
    console.log("   ℹ️ Tidak ada foto mentah di folder ini (melewati).");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const resolved = conf.resolveTarget(file);

    const targetFileName = typeof resolved === "string" ? resolved : resolved.target;
    const targetWidth = typeof resolved === "object" && resolved.width ? resolved.width : conf.defaultWidth;
    const targetHeight = typeof resolved === "object" && resolved.height ? resolved.height : conf.defaultHeight;

    const outputPath = path.join(outputDir, targetFileName);

    try {
      const statBefore = fs.statSync(inputPath);
      totalBefore += statBefore.size;

      await sharp(inputPath)
        .rotate()
        .resize(targetWidth, targetHeight, {
          fit: "cover",
          position: "center",
        })
        .webp({
          quality: 82,
          effort: 6,
          smartSubsample: true,
        })
        .toFile(outputPath);

      const statAfter = fs.statSync(outputPath);
      totalAfter += statAfter.size;
      const saved = ((1 - statAfter.size / statBefore.size) * 100).toFixed(1);

      console.log(
        `   ✅ [${file}] -> [${targetFileName}] (${targetWidth}x${targetHeight}) | ${formatBytes(
          statBefore.size
        )} -> ${formatBytes(statAfter.size)} (hemat ${saved}%)`
      );
    } catch (e) {
      console.error(`   ❌ Gagal mengompresi ${file}:`, e.message);
    }
  }

  if (totalBefore > 0) {
    const totalPercent = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
    console.log(
      `   📊 Subtotal: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} (Hemat ${totalPercent}% storage)`
    );
  }
}

async function run() {
  const sectionArg = (process.argv[2] || "all").toLowerCase();
  const customPathArg = process.argv[3];

  console.log("==================================================");
  console.log("   BENGKEL MOBIL BUNUL - MULTI-SECTION OPTIMIZER");
  console.log("==================================================");

  if (sectionArg === "all") {
    for (const key of Object.keys(SECTION_CONFIGS)) {
      await processSection(key);
    }
  } else if (SECTION_CONFIGS[sectionArg]) {
    await processSection(sectionArg, customPathArg);
  } else {
    console.log(`⚠️ Section '${sectionArg}' tidak dikenal.`);
    console.log("Pilihan yang tersedia: 'services', 'hero', 'about', atau 'all'");
  }

  console.log("\n==================================================");
  console.log("✨ Optimasi selesai.");
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
