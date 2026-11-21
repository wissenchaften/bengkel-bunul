# Panduan Foto Layanan & Optimasi Gambar - Bengkel Mobil Bunul

Folder ini menyimpan seluruh aset gambar untuk katalog layanan di website **Bengkel Mobil Bunul**.

---

## 📸 Spesifikasi Foto Rekomendasi
Untuk menjaga tampilan website tetap profesional, tajam, dan cepat saat diakses pelanggan, gunakan acuan spesifikasi berikut:

- **Format File**: `.webp`
- **Rasio Aspek**: **16:9** atau **4:3** (Landscape / Horizontal)
- **Dimensi Ideal**: Minimal `800 × 500 px` (atau `1200 × 675 px`)
- **Target Ukuran File**: Di bawah `150 KB` per foto

---

## 🗂️ Pemetaan Nama File (9 Layanan)

Setiap foto layanan harus diberi nama sesuai dengan slug berikut:

| Nama File | Layanan Terkait | Deskripsi Konten Foto yang Disarankan |
|---|---|---|
| `kelistrikan.webp` | Servis Kelistrikan & Aki | Pemeriksaan aki, alternator, scanner kelistrikan |
| `rem.webp` | Sistem Rem & ABS | Kampas rem, piringan cakram, bubut rem, kuras minyak |
| `mesin.webp` | Engine Tune-Up Plus | Ruang mesin, carbon clean, pembersihan intake/injektor |
| `ac.webp` | AC Mobil & Flushing | Mesin flushing freon AC, kompresor, suhu kisi-kisi AC |
| `kaki-kaki.webp` | Kaki-kaki & Suspensi | Mesin spooring 3D, balancing, shockbreaker, tie-rod |
| `transmisi.webp` | Transmisi Otomatis & Manual | Penggantian/kuras oli matik ATF, kopling, gearbox |
| `pendingin.webp` | Sistem Pendingin & Radiator | Kuras radiator coolant, water pump, kipas radiator |
| `berkala.webp` | Perawatan Servis Berkala | Penggantian oli mesin OEM & filter oli, 40 titik cek |
| `body-repair.webp` | Body Repair & Cat Panel | Pengecatan oven bodi, perbaikan panel bodi penyok (PDR) |

---

## ⚡ Cara Mengompresi Foto Otomatis (Hemat Storage & Bandwidth)

Anda **tidak perlu mengompresi gambar satu per satu secara manual**. Proyek ini sudah dilengkapi skrip kompresi otomatis berbasis library industri `sharp`.

### Metode 1: Lewat Folder `raw` (Paling Praktis)
1. Letakkan foto mentah dari HP atau kamera Anda ke dalam folder:
   ```
   public/images/services/raw/
   ```
2. Beri nama file foto tersebut mendekati nama layanannya (contoh: `kelistrikan.jpg`, `rem.png`, `mesin.jpeg`, atau `foto-ac.jpg`).
3. Buka terminal di folder proyek dan jalankan:
   ```bash
   npm run optimize:services
   ```
4. Skrip akan otomatis:
   - Me-resize & crop foto menjadi rasio ideal `800×500 px`.
   - Mengonversi format ke `.webp` dengan kualitas tinggi.
   - Menghapus metadata kamera EXIF yang berat.
   - Menyimpan hasil kompresi langsung ke `public/images/services/`.
   - Menampilkan persentase penghematan ukuran file di terminal (biasanya hemat >90%).

### Metode 2: Kompresi Langsung dari Folder Luar
Jika foto Anda masih berada di folder lain di komputer (misalnya Desktop), Anda bisa langsung mengarahkan path foldernya:
```bash
node scripts/optimize-service-images.js "C:\Users\Wissenchaften\Desktop\Pilihan Gambar Web\Pilihan Gambar Web\jpeg"
```
Skrip akan memproses foto dari folder tersebut dan menyimpannya langsung ke `public/images/services/`.
