# Panduan Foto About Section - Bengkel Mobil Bunul

Folder ini menyimpan 3 foto dokumentasi teknis pada bagian Tentang Kami (**About Section**).

---

## 🗂️ Pemetaan Foto & Spesifikasi

| Nama File Target | Posisi di Halaman | Rasio & Ukuran Ideal | Konten Foto Disarankan |
|---|---|---|---|
| `about-inspection.webp` | Kolom Kiri (Vertikal) | **3:4 Portrait** (`600 × 800 px`) | Foto vertikal mekanik sedang inspeksi roda, kaki-kaki, atau balancing mobil di lift |
| `about-scanner.webp` | Kolom Kanan Atas | **16:10 / 16:9 Landscape** (`800 × 500 px`) | Foto mekanik memegang/memantau laptop scanner OBD-2 atau diagnostik digital |
| `about-engine.webp` | Kolom Kanan Bawah | **16:10 / 16:9 Landscape** (`800 × 500 px`) | Foto mekanik memeriksa komponen mesin, ruang bakar, atau oli |

---

## ⚡ Cara Mengompresi Foto Otomatis
1. Letakkan foto mentah ke folder:
   ```
   public/images/about/raw/
   ```
   *(Beri nama file yang memuat kata kunci seperti `inspection.jpg`, `scanner.jpg`, atau `engine.jpg`)*.
2. Jalankan perintah di terminal:
   ```bash
   node scripts/optimize-images.mjs about
   ```
   *(atau jalankan `npm run optimize:images` untuk memproses seluruh bagian sekaligus).*
3. Foto akan otomatis di-crop presisi sesuai posisi (vertikal/landscape), dikompresi ke WebP, dan siap tampil di website.
