# Audit Visual Desktop (`1440×900`) — Bengkel Mobil Bunul

> **Environment:** Chrome Headless (CDP) pada fresh production build (`http://localhost:3005`)  
> **Tanggal Verifikasi:** 25 November 2026  
> **Viewport:** `1440px` × `900px`  
> **Data Pendukung:** `screenshots/audit-results.json`

---

## 1. Header & Navigasi Desktop
*From the visual evidence (`desktop-01-hero.png`), I observe:*
- Navbar `fixed top-0` melayang dengan latar putih translusen, logo & sub-label terbaca tajam, dan link brand memenuhi area sentuh `≥ 44px`.
- Kapsul navigasi tengah memuat 6 item (*Beranda*, *Tentang Kami*, *Layanan*, *Portofolio*, *Testimoni*, *Lokasi*), dengan `useScrollSpy` yang turut melacak `#reservasi` sehingga menu *Testimoni* otomatis nonaktif saat berada di formulir reservasi.
- **Verdict:** **ACHIEVED**

## 2. Hero Section & Stats Bar
*From the visual evidence (`desktop-01-hero.png`), I observe:*
- Badge kota (*"BENGKEL MOBIL SPESIALIS • KOTA MALANG"*), headline 52px bold, deskripsi ringkas, dan 3 tombol CTA (*Reservasi Jadwal Servis*, *Lihat Layanan*, `(0851) 0020-7777`) tersusun rapi tanpa wrapping berlebih.
- Kolom kanan menampilkan foto workshop lokal (`/images/hero/hero-workshop.webp`) dengan kartu status operasional live WIB (*"Sedang Tutup • Buka Besok 08:00 WIB"* saat diaudit pukul 19:49 WIB).
- Bar statistik 4 kolom di bawah hero menampilkan `10+ Tahun Pengalaman`, `4.9 / 5.0 500+ Ulasan Google` (tautan menuju `#testimoni`), `100% Suku Cadang Original`, dan `30 Hari Garansi Servis / 1.000 KM`.
- **Verdict:** **ACHIEVED**

## 3. Seksi Tentang Kami (`#tentang-kami`)
*From the visual evidence (`desktop-tentang-kami.png`), I observe:*
- Tata letak 3 kolom dengan *corner frame accents* indigo di sudut foto kiri dan kanan, 3 foto workshop lokal WebP tampil tajam, serta 3 kartu USP vertikal di kolom tengah.
- **Verdict:** **ACHIEVED**

## 4. Seksi Katalog Layanan (`#layanan`)
*From the visual evidence (`desktop-layanan.png`), I observe:*
- 9 layanan tampil dalam carousel 3-kartu per tampilan dengan tombol panah kiri/kanan di luar kartu (`hidden sm:flex`), foto lokal WebP di semua kartu, floating icon badge di sambungan gambar, dan tombol *"KONSULTASI LAYANAN"* (`≥ 44px`).
- Pengujian klik *"KONSULTASI LAYANAN"* pada kartu pertama berhasil melakukan auto-scroll ke `#reservasi` dan mengisi dropdown layanan dengan `"Perawatan Berkala"`.
- **Verdict:** **ACHIEVED**

## 5. Seksi Portofolio Video (`#portofolio`)
*From the visual evidence (`desktop-portofolio.png`), I observe:*
- 6 kartu video `9:16` (4 TikTok, 2 YouTube Shorts) tampil seragam bergaya YouTube Shorts dengan poster tajam, badge platform, tombol Play oranye, dan judul `<h3>` + deskripsi `line-clamp-1`.
- Pengujian single active player terverifikasi: klik Play pertama memunculkan 1 `<iframe>`, klik video lain menjaga jumlah `<iframe>` tetap 1 (player sebelumnya otomatis berhenti/unmount), dan tombol tutup `44×44px` menutup player kembali ke poster (`0` iframe).
- **Verdict:** **ACHIEVED**

## 6. Seksi Testimoni Kustomer (`#testimoni`)
*From the visual evidence (`desktop-testimoni.png`), I observe:*
- 7 ulasan nyata Google Maps ditampilkan dalam carousel 3-kartu desktop dengan lencana `Google Maps` per kartu, tombol navigasi `44×44px`, 7 pagination dots, serta tautan *"Lihat Semua Ulasan di Google Maps"*.
- Metadata reviewer (`context · date`) menggunakan `text-on-surface-variant` yang tajam kontrasnya di atas kartu putih.
- **Verdict:** **ACHIEVED**

## 7. Seksi Formulir Reservasi (`#reservasi`)
*From the visual evidence (`desktop-reservasi.png`), I observe:*
- Pita header indigo, grid 2 kolom untuk 8 field input, hint format plat monospaced, serta tombol CTA WhatsApp hijau tampil rapi dan simetris.
- **Verdict:** **ACHIEVED**

## 8. Seksi Lokasi & Peta (`#lokasi`)
*From the visual evidence (`desktop-lokasi.png`), I observe:*
- Kontras gelap `#1E1B4B` dengan kartu spesifikasi workshop dan 4 kartu fasilitas di bawah heading `<h3>`.
- Peta Google Maps dilengkapi tombol *"Aktifkan Interaksi Peta"* dan *"Buka Rute"* berukuran `≥ 44px` serta subtitle alamat `text-on-surface-variant` di atas kartu putih.
- **Verdict:** **ACHIEVED**

## 9. Footer
*From the visual evidence (`desktop-footer.png`), I observe:*
- 4 kolom terstruktur dengan judul `<h3>` (dan `<h4>` untuk sub-judul WhatsApp), teks deskripsi & baris copyright memakai `text-secondary-container` sehingga terbaca jelas di atas `#1E1B4B`, serta tombol *"Chat Admin Bengkel"* berukuran penuh `≥ 44px`.
- **Verdict:** **ACHIEVED**
