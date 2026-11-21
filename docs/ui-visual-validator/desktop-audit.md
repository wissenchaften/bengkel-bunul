# Audit Visual Desktop (1440×900) — Bengkel Mobil Bunul

> **Environment:** Chrome 157.0 Headless (CDP)  
> **Viewport:** 1440px width × 900px height  
> **Tangkapan Layar:** `screenshots/desktop-fullpage.png`

---

## 1. Header & Navigasi Desktop

*From the visual evidence, I observe:*
* Navbar berada dalam status `fixed top-0`, mengambang dengan latar belakang putih translusen (`bg-surface/85 backdrop-blur-md`).
* Logo bengkel di sisi kiri (`w-9 h-9`) tampil tajam dengan teks nama *"Bengkel Bunul"* (font-headline Plus Jakarta Sans, 18px bold `#0a005d`) dan sub-label *"SPESIALIS SERVIS & REPARASI"* (`#f99632`).
* Navigasi desktop berbentuk kapsul (*pill container*) di tengah memuat 6 tautan: *Beranda*, *Tentang Kami*, *Layanan*, *Portofolio*, *Testimoni*, dan *Lokasi*. Tautan aktif ditandai dengan latar belakang `#1d1583` dan teks putih tebal.
* Di sisi kanan, tombol CTA *"Reservasi Sekarang"* (`bg-accent-amber-deep` `#f99632`) terpasang rapi dengan sudut membulat penuh (*rounded-full*) dan ikon panah `ArrowRight`.
* **Verdict:** **ACHIEVED (Lolos)**

---

## 2. Hero Section

*From the visual evidence, I observe:*
* **Kolom Kiri:**
  * Eyebrow pill: *"BENGKEL MOBIL SPESIALIS RESMI"* dengan dot aksen oranye dan border halus `#cbd5e1`.
  * Headline Utama: *"Perbaikan dan Perawatan Mobil Standar Presisi Pabrikan"* (ukuran font 54px, tebal 800, warna `#191c1e` dengan teks span aksen `#1d1583`). Hierarki teks terbaca sangat tegas dan tajam.
  * Deskripsi: Font Inter 18px warna `#464552`, leading santai, tanpa istilah *slop* fiktif.
  * CTA Group: 3 tombol sejajar:
    1. *"Reservasi Jadwal Servis"* (`bg-primary-container`, teks putih)
    2. *"Lihat Katalog Layanan"* (`bg-white`, border `#cbd5e1`, teks `#0a005d`)
    3. Hotline telepon: `(0851) 0020-7777` dengan ikon WhatsApp hijau.
  * Fitur unggulan di bawah CTA: 3 butir terverifikasi (*8 Teknisi Bersertifikasi*, *1.000 KM / 30 Hari Garansi*, *Inspeksi Diagnostik OBD-2 Digital*).
* **Kolom Kanan (Defek Visual):**
  * Kartu visual kanan memiliki rasio aspek dan sudut melengkung `rounded-2xl` dengan kartu melayang *"Standar Servis Resmi Bengkel Mobil Bunul - Buka 08:00 - 17:00 WIB"*.
  * **DEFEK KRITIS:** Gambar mekanik pada kartu ini **rusak / gagal dimuat** (*broken image icon* di pojok kiri atas kartu).
  * **Akar Masalah:** Atribut `src` pada [HeroSection.tsx](file:///c:/Users/Wissenchaften/Desktop/Web%20Bengkel%20Bunul/src/components/sections/HeroSection.tsx#L141) mengarah ke URL privat yang kedaluwarsa (`https://lh3.googleusercontent.com/aida/...`).
* **Verdict:** **NOT ACHIEVED (Gagal)** karena elemen visual utama gagal merender foto.

---

## 3. Baris Statistik (Stats Bar)

*From the visual evidence, I observe:*
* Kotak kontainer putih dengan elevasi halus dan border tipis `#e2e8f0` di bawah hero.
* Terbagi menjadi 4 kolom metrik:
  1. `10+` Tahun Pengalaman (angka 36px font-headline `#0a005d` dengan tanda `+` oranye)
  2. `4.9 / 5.0` Google Maps Rating (disertai ikon bintang emas)
  3. `100%` Suku Cadang Original
  4. `Resmi` Garansi Servis Tertulis (disertai perisai hijau)
* **Verdict:** **ACHIEVED (Lolos)**

---

## 4. Seksi Tentang Kami (About Section)

*From the visual evidence, I observe:*
* Lencana seksi *"MENGAPA MEMILIH KAMI"* dengan latar oranye muda (`bg-tertiary-fixed` `#ffdcc2`) dan font label Public Sans huruf kapital.
* Judul seksi: *"Transparansi Total di Setiap Putaran Baut & Diagnostik Mesin"* (36px).
* Tata letak split 3 kolom:
  1. **Kolom Kiri:** Foto workshop mekanik dengan ornamen arsitektural sudut (*corner frame accents* 2 garis siku warna `#1d1583` di kiri atas dan kiri bawah) ter-render presisi. Foto mekanik balancing ban mobil berhasil termuat tajam.
  2. **Kolom Tengah:** Paragraf narasi disusul 3 kartu USP vertikal (*Proteksi Kendaraan & Part OEM*, *Diagnostik Mesin & Sensor OBD-2*, *Sistem Rem & Kaki-kaki Andal*) masing-masing memiliki ikon melingkar dengan latar `#e2dfff` dan garis tepi halus.
  3. **Kolom Kanan:** Tumpukan dua foto workshop mekanik dengan *corner frame accents* di kanan atas dan kanan bawah.
* **Verdict:** **ACHIEVED (Lolos)**

---

## 5. Seksi Katalog Layanan (Services Section)

*From the visual evidence, I observe:*
* Judul: *"Katalog Layanan Spesialis"* dengan deskripsi pengantar transparan.
* Kontainer kartu layanan horisontal dengan tombol navigasi lingkaran biru gelap (`#0a005d`) di sisi kiri dan kanan.
* Tiga kartu pertama yang terlihat di layar:
  * **Kartu 1 (Kelistrikan & Aki):** **GAMBAR RUSAK**. Alt text *"Servis Kelistrikan & Aki"* muncul dengan garis batas broken image.
  * **Kartu 2 (Sistem Rem & ABS):** Tampil sempurna, foto mekanik mengencangkan baut roda ter-render tajam.
  * **Kartu 3 (Engine Tune-Up Plus):** Tampil sempurna, foto mekanik dengan scanner mobil ter-render tajam.
* Elemen badge mekanik kotak melayang tepat di tengah batas sambungan gambar dan bodi kartu (*floating mechanical badge*) terpasang presisi dengan border 2px putih.
* **Defek Aksesibilitas:** Tombol teks *"KONSULTASI LAYANAN"* di bawah kartu hanya memiliki tinggi bounding box 16px, di bawah standar WCAG 2.5.5 untuk kenyamanan klik.
* **Verdict:** **PARTIALLY ACHIEVED (Parsial)** karena gambar kartu 1 rusak dan touch target terlalu tipis.

---

## 6. Seksi Portofolio Video (Portfolio Section)

*From the visual evidence, I observe:*
* Header portofolio dilengkapi indikator status *"WORKSHOP LIVE"* dengan animasi titik hijau berkedip (*ping pulse*).
* Menampilkan 4 kartu video dengan rasio vertikal 9:16:
  1. *Overhaul Mesin Kijang Innova Reborn Diesel* (TikTok Feed)
  2. *Solusi Getar Kaki-kaki Honda CR-V* (Instagram Reels)
  3. *Diagnostik & Solusi Transmisi Matik Pajero Sport* (YouTube Shorts)
  4. *Restorasi Kompresor AC Avanza Dingin Menggigil* (TikTok Feed)
* **DEFEK KRITIS:** Seluruh 4 kartu **hanya menampilkan kotak gradien ungu-hitam kosong** dengan tombol putar (play button) oranye di tengahnya. Tidak ada satupun foto *thumbnail* video yang muncul!
* **Akar Masalah:** Di [PortfolioSection.tsx](file:///c:/Users/Wissenchaften/Desktop/Web%20Bengkel%20Bunul/src/components/sections/PortfolioSection.tsx#L21-L32), `IntersectionObserver` mengamati kelas `.video-card-target` pada elemen induk, tetapi atribut `data-video-id` ditaruh pada elemen anak `div`. Akibatnya `entry.target.getAttribute("data-video-id")` selalu bernilai `null` dan gambar tidak pernah dimuat (*infinite placeholder*).
* **Verdict:** **NOT ACHIEVED (Gagal)**

---

## 7. Seksi Testimoni Kustomer (Testimonials Section)

*From the visual evidence, I observe:*
* Lencana rating: *"RATING GOOGLE MAPS 4.9/5.0"* warna hijau sukses.
* 4 kartu ulasan otentik berjajar:
  * Budi Santoso (Toyota Innova 2020)
  * Hendra Kusuma (Honda CR-V Turbo 2019)
  * dr. Aditya Pratama (Mitsubishi Pajero 2021)
  * Rina Wulandari (Suzuki Ertiga 2022)
* Setiap kartu memiliki 5 bintang oranye, teks ulasan spesifik teknis dalam tanda kutip, dan inisial avatar melingkar berwarna.
* Tombol panah navigasi bulat di kanan atas header berfungsi untuk pergeseran horisontal.
* **Verdict:** **ACHIEVED (Lolos)**

---

## 8. Seksi Formulir Reservasi (Reservation Section)

*From the visual evidence, I observe:*
* Kartu form didesain rapi dengan pita header biru tua (`#0a005d`) bertuliskan *"Formulir Reservasi Servis"*.
* Grid 2 kolom rapi untuk 8 field input:
  1. Nama Lengkap
  2. Nomor Telepon / WhatsApp
  3. Merek & Tipe Kendaraan
  4. Nomor Plat (Opsional) — format hint monospaced `Format: N 1234 AB`
  5. Kategori Layanan (Dropdown)
  6. Keluhan & Gejala Kendaraan (Textarea 3 baris)
  7. Tanggal Rencana Kedatangan (Date picker native min H+1)
  8. Preferensi Sesi Waktu (Segmented button toggle: *Pagi 08:00 - 12:00* vs *Siang 12:00 - 16:00*)
* Tombol CTA utama: *"Kirim Reservasi ke WhatsApp Resmi"* (`bg-whatsapp-green` `#25d366`) berukuran penuh, tebal, dan memiliki kontras tinggi.
* **Verdict:** **ACHIEVED (Lolos)**

---

## 9. Seksi Lokasi & Peta (Location Section)

*From the visual evidence, I observe:*
* Background kontras gelap (`#1e1b4b` Chassis Midnight) dengan teks putih.
* Kolom kiri: alamat lengkap di Jl. Warinoi III Bunulrejo, jam kerja 08:00 - 17:00, nomor kontak, serta 4 kartu fasilitas (*Ruang Ber-AC*, *Free WiFi*, *Kopi & Teh*, *Musholla*).
* Kolom kanan: frame Google Maps interaktif dengan pin lokasi bengkel, card rute mengambang di bawah peta, dan tombol *"Petunjuk Arah Google Maps"*.
* **Verdict:** **ACHIEVED (Lolos)**

---

## 10. Footer

*From the visual evidence, I observe:*
* Terbagi 4 kolom terstruktur: Informasi Bengkel, Navigasi Cepat, Layanan Spesialis (7 item berpeluru oranye), dan Jam Operasional + WhatsApp CTA button.
* Teks copyright `© 2026 Bengkel Mobil Bunul` dan rincian garansi di baris penutup.
* **Verdict:** **ACHIEVED (Lolos)**
