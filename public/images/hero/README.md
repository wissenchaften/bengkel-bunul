# Panduan Foto Hero Section - Bengkel Mobil Bunul

Folder ini menyimpan gambar utama (Hero) di bagian atas halaman website **Bengkel Mobil Bunul**.

---

## 📸 Spesifikasi Foto Rekomendasi
- **Format File**: `.webp`
- **Nama File Target**: `hero-workshop.webp`
- **Rasio Aspek**: **16:9** atau **3:2** (Landscape)
- **Dimensi Ideal**: `1200 × 800 px`
- **Konten Foto yang Disarankan**: Foto sudut pandang luas workshop modern Bengkel Mobil Bunul, mekanik bekerja di area servis, atau mobil di bay servis.

---

## ⚡ Cara Mengompresi Foto Otomatis
1. Letakkan foto mentah resolusi tinggi dari HP/kamera Anda ke dalam folder:
   ```
   public/images/hero/raw/
   ```
2. Jalankan perintah di terminal proyek:
   ```bash
   node scripts/optimize-images.mjs hero
   ```
   *(atau jalankan `npm run optimize:images` untuk mengompresi seluruh bagian sekaligus).*
3. Foto akan otomatis di-crop presisi ke `1200×800 px`, dikonversi ke WebP, dibersihkan metadata EXIF, dan disimpan ke `public/images/hero/hero-workshop.webp`.
