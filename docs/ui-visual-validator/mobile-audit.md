# Audit Visual Mobile (390×844) — Bengkel Mobil Bunul

> **Environment:** Chrome 157.0 Headless (CDP Mobile Emulation)  
> **Device Emulasi:** iPhone 12 / 13 / 14 (390px × 844px, DPR: 2.0)  
> **Tangkapan Layar:** `screenshots/mobile-fullpage.png` & `screenshots/mobile-02-drawer-open.png`

---

## 1. Navigasi & Drawer Menu Mobile

*From the visual evidence, I observe:*
* **Header Mobile:**
  * Logo dan teks bengkel termuat di sisi kiri.
  * Tombol hamburger (*hamburger icon* 3 baris) muncul di sisi kanan dengan ukuran sentuh `44×44px` (`min-w-[44px] min-h-[44px]` dengan border tipis dan padding nyaman).
* **Interaksi Drawer Saat Terbuka (`mobile-02-drawer-open.png`):**
  * Latar belakang luar diredupkan oleh overlay gelap (`bg-black/65 backdrop-blur-sm`).
  * Sheet drawer meluncur dari sisi kanan dengan lebar 84vw (maks 384px) menggunakan transisi spring kencang (*stiffness: 350, damping: 32*).
  * Di dalam drawer:
    * Header menu dengan logo kecil, judul *"MENU NAVIGASI"*, dan tombol silang `X` penutup.
    * 6 item menu bertumpuk vertikal dengan padding lebar (`py-3.5 px-4`), teks jelas, dan panah `ArrowRight` di ujung kanan.
    * Seksi aktif (*Beranda*) disorot dengan latar belakang biru tua `#1d1583` dan teks putih tebal.
    * Bagian bawah drawer memiliki 2 tombol aksi:
      1. *"Reservasi Jadwal Servis"* (oranye dengan ikon pesan)
      2. *"Telepon: (0851) 0020-7777"* (abu-abu dengan ikon telepon hijau)
      3. Teks jam operasional: *"Buka Setiap Hari: 08:00 - 17:00 WIB"*.
* **Verdict:** **ACHIEVED (Sangat Baik / Lolos)**

---

## 2. Pemeriksaan Horizontal Scroll & Overflow

*From the visual evidence and automated DOM metrics:*
* `scrollWidth`: **390px**
* `clientWidth`: **390px**
* `windowWidth`: **390px**
* `hasHorizontalScroll`: **FALSE (Tidak ada kebocoran lebar / horizontal scrollbar)**
* Tidak ada elemen statis yang memecahkan layout atau menyebabkan halaman goyang ke samping.
* Kontainer kartu pada *Layanan*, *Portofolio*, dan *Testimoni* menggunakan `overflow-x-auto snap-x snap-mandatory` yang terisolasi dengan rapi di dalam batas kontainer masing-masing.
* **Verdict:** **ACHIEVED (Lolos)**

---

## 3. Hero Section pada Layar Ponsel

*From the visual evidence, I observe:*
* **Tipografi:**
  * Headline: *"Perbaikan dan Perawatan Mobil Standar Presisi Pabrikan"* membungkus rapi ke 3 baris:
    * Baris 1: *"Perbaikan dan Perawatan"*
    * Baris 2: *"Mobil"*
    * Baris 3: *"Standar Presisi Pabrikan"* (warna aksen indigo).
  * Ukuran font mengecil secara proporsional dari 54px (desktop) menjadi 30px (mobile), sehingga tidak ada pemotongan kata (*clipping*).
* **Penyusunan Tombol (Button Stacking):**
  * Tombol 1 *"Reservasi Jadwal Servis"* membentang penuh (*full-width block*).
  * Tombol 2 *"Lihat Katalog Layanan"* membentang penuh di bawah tombol pertama.
  * Tombol 3 hotline telepon `(0851) 0020-7777` terpusat rapi.
* **Tiga Poin Unggulan:**
  * Beralih dari susunan horizontal menjadi susunan vertikal 3 baris yang mudah dibaca (*8 Teknisi Bersertifikasi*, *1.000 KM / 30 Hari Garansi*, *Inspeksi Diagnostik OBD-2 Digital*).
* **Defek Visual:**
  * Gambar bengkel pada kartu kanan tetap rusak (*broken image placeholder*), sama seperti di desktop.
* **Verdict:** **PARTIALLY ACHIEVED (Parsial)** karena gambar mekanik rusak.

---

## 4. Baris Statistik (Stats Counter) pada Ponsel

*From the visual evidence, I observe:*
* Beralih dari 4 kolom menjadi **grid 2×2** yang seimbang:
  * Baris 1: `10+` Tahun Pengalaman | `4.9 / 5.0` Rating Bintang
  * Baris 2: `100%` Suku Cadang Original | `Resmi` Garansi Tertulis
* Jarak antar kartu cukup luas (`gap-4`), tidak ada angka yang bertumpuk.
* **Verdict:** **ACHIEVED (Lolos)**

---

## 5. Seksi Katalog Layanan pada Ponsel

*From the visual evidence, I observe:*
* Setiap kartu berukuran `w-[85vw]` (lebar 331px pada layar 390px), memungkinkan kustomer melihat cuplikan kartu berikutnya di tepi kanan layar (*peek pattern*).
* Kartu dapat digeser secara alami menggunakan sentuhan (*touch swipe*).
* **Defek Visual & Aksesibilitas:**
  1. Kartu 1 memiliki gambar yang rusak (*alt text placeholder*).
  2. Tombol panah geser melingkar (panah kiri dan kanan) menempel di tepi layar dan dapat mengganggu jempol saat menggeser kartu.
  3. Tombol *"KONSULTASI LAYANAN"* memiliki tinggi sentuh hanya 16px, rentan salah sentuh bagi pengguna jempol (*touch target failure*).
* **Verdict:** **PARTIALLY ACHIEVED (Parsial)**

---

## 6. Seksi Portofolio Video pada Ponsel

*From the visual evidence, I observe:*
* Setiap kartu video 9:16 berukuran lebar `78vw` (lebar ~304px), ideal untuk format vertikal TikTok/Reels/Shorts.
* **DEFEK KRITIS:** Seluruh gambar video tidak muncul (blank gradien ungu) karena `IntersectionObserver` target bug.
* **Verdict:** **NOT ACHIEVED (Gagal)**

---

## 7. Seksi Testimoni pada Ponsel

*From the visual evidence, I observe:*
* Kartu testimoni tampil satu per satu dengan lebar `85vw`.
* Teks kutipan ulasan kustomer tampil proporsional dengan font 13px yang mudah dibaca di ponsel.
* Avatar inisial kustomer berukuran `40×40px` dengan kontras warna yang baik.
* Geser kartu dengan jari terasa mulus berkat kelas `snap-x snap-mandatory`.
* **Verdict:** **ACHIEVED (Lolos)**

---

## 8. Seksi Formulir Reservasi pada Ponsel

*From the visual evidence, I observe:*
* Form beralih dari 2 kolom menjadi **1 kolom penuh vertikal**.
* Semua field input (*Nama*, *Telepon*, *Kendaraan*, *Plat*, *Layanan*, *Keluhan*, *Tanggal*) memiliki tinggi sentuh minimal `42px` yang nyaman untuk mengetik.
* Segmented control sesi waktu (*Pagi 08:00 - 12:00* vs *Siang 12:00 - 16:00*) berjajar 2 kolom dengan radio button tersembunyi yang estetik.
* Tombol hijau *"Kirim Reservasi ke WhatsApp Resmi"* membentang penuh dengan tinggi 52px dan bayangan hijau pekat.
* **Catatan Aksesibilitas:** Tag `<input type="radio">` memerlukan penambahan `aria-label` eksplisit agar pembaca layar (screen reader) ponsel dapat membaca nama pilihannya.
* **Verdict:** **ACHIEVED (Lolos dengan catatan aksesibilitas)**

---

## 9. Seksi Lokasi & Peta (Gesture Protection)

*From the visual evidence, I observe:*
* **Mobile Gesture Protection:**
  * Iframe Google Maps secara default memiliki kelas `pointer-events-none md:pointer-events-auto` pada ponsel.
  * Terdapat tombol mengambang di pojok kanan atas peta: **"Aktifkan Peta"** dengan ikon kompas.
  * Saat tombol belum ditekan, pengguna bebas men-scroll halaman melewati peta tanpa resiko terjebak (*scroll trap*).
  * Saat tombol ditekan, tombol berubah menjadi **"Kunci Geser"** dan peta dapat digeser atau di-zoom.
* Tombol *"Petunjuk Arah Google Maps"* di bawah informasi workshop membentang nyaman untuk sentuhan jempol.
* **Verdict:** **ACHIEVED (Sangat Baik / Lolos)**

---

## 10. Footer pada Ponsel

*From the visual evidence, I observe:*
* Keempat kolom footer tersusun rapi satu di bawah yang lain.
* Tombol *"Chat Admin Bengkel"* WhatsApp membentang penuh di bawah informasi jam operasional.
* Jarak antar baris cukup longgar sehingga tautan tidak berdempetan.
* **Verdict:** **ACHIEVED (Lolos)**
