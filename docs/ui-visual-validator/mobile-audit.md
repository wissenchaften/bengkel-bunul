# Audit Visual Mobile (`390×844`) — Bengkel Mobil Bunul

> **Environment:** Chrome Headless (CDP Mobile Emulation, DPR `2.0`, `hasTouch: true`) pada fresh production build (`http://localhost:3005`)  
> **Tanggal Verifikasi:** 25 November 2026  
> **Viewport:** `390px` × `844px`  
> **Data Pendukung:** `screenshots/audit-results.json`

---

## 1. Navigasi & Drawer Menu Mobile
*From the visual evidence (`mobile-01-hero.png`, `mobile-02-drawer-open.png`), I observe:*
- Logo navbar memiliki area sentuh `≥ 44px` (`py-1.5 px-1 min-h-[44px]`) dan tombol hamburger berukuran `≥ 44×44px`.
- Saat drawer dibuka (`mobile-02-drawer-open.png`), overlay meredupkan latar belakang dengan rapi, 6 menu navigasi memiliki padding sentuh lebar, serta tombol CTA *"Reservasi Jadwal Servis"* dan *"Telepon: (0851) 0020-7777"* tersusun jelas di bawah.
- **Verdict:** **ACHIEVED**

## 2. Pemeriksaan Horizontal Scroll & Overflow
*From the visual evidence and automated DOM metrics:*
- `scrollWidth`: **390px**, `clientWidth`: **390px**, `hasHorizontalScroll`: **false**.
- `unexpectedOverflowCount`: **0** (tidak ada elemen statis di luar kontainer carousel horizontal yang melebar melewati viewport `390px`).
- **Verdict:** **ACHIEVED**

## 3. Hero Section pada Layar Ponsel
*From the visual evidence (`mobile-01-hero.png`), I observe:*
- Headline 26px membungkus rapi dalam 3 baris tanpa clipping.
- CTA disusun ergonomis: tombol primer *"Reservasi Jadwal Servis"* full-width (`46px` tinggi), diikuti grid 2-kolom untuk *"Lihat Layanan"* (`44px`) dan *"0851-0020-7777"* (`44px`).
- Foto workshop WebP di bawah CTA menampilkan kartu status live WIB (*"Sedang Tutup • Buka Besok 08:00 WIB"*), dan baris atas Stats Bar terlihat rapi di bagian bawah layar.
- **Verdict:** **ACHIEVED**

## 4. Seksi Tentang Kami (`#tentang-kami`)
*From the visual evidence (`mobile-tentang-kami.png`), I observe:*
- Kolase foto workshop (1 foto utama + grid 2 foto di bawahnya) dengan *corner frame accents* tampil proporsional di atas paragraf narasi dan 3 kartu USP.
- **Verdict:** **ACHIEVED**

## 5. Seksi Katalog Layanan (`#layanan`)
*From the visual evidence (`mobile-layanan.png`), I observe:*
- Tombol panah melayang kiri/kanan kini disembunyikan di mobile (`hidden sm:flex`), sehingga tepi kartu bersih dan tidak tertimpa tombol panah.
- Kartu berukuran `85vw` memperlihatkan cuplikan kartu berikutnya di kanan (*peek pattern*) untuk mendorong swipe sentuh, dengan tombol *"KONSULTASI LAYANAN"* `≥ 44px`.
- **Verdict:** **ACHIEVED**

## 6. Seksi Portofolio Video (`#portofolio`)
*From the visual evidence (`mobile-portofolio.png`), I observe:*
- Kartu `9:16` selebar `78vw` menampilkan poster foto workshop, badge platform, tombol Play oranye terpusat, judul `<h3>`, serta footer tautan eksternal *"Tonton di [Platform]"* `≥ 44px`.
- **Verdict:** **ACHIEVED**

## 7. Seksi Testimoni (`#testimoni`)
*From the visual evidence (`mobile-testimoni.png`), I observe:*
- Kartu testimoni bergaya `Google Maps` tampil jelas satu per satu (`85vw`), dengan tombol navigasi panah `44×44px`, 7 pagination dots `≥ 24×24px` (`gap-2`), dan tautan *"Lihat Semua Ulasan di Google Maps"* `≥ 44px`.
- **Verdict:** **ACHIEVED**

## 8. Seksi Formulir Reservasi (`#reservasi`)
*From the visual evidence (`mobile-reservasi.png`), I observe:*
- 8 field tersusun dalam 1 kolom penuh dengan seluruh 9 kontrol input terlabeli (`aria-label` eksplisit pada radio *Pagi* / *Siang* + area sentuh `min-h-[44px]`).
- **Verdict:** **ACHIEVED**

## 9. Seksi Lokasi & Peta (`#lokasi`)
*From the visual evidence (`mobile-lokasi.png`), I observe:*
- Informasi kontak dan 4 kartu fasilitas di bawah `<h3>` tersusun rapi dalam grid 2×2.
- Proteksi gestur peta aktif (`pointer-events-none` default -> `pointer-events-auto` saat diklik), dengan tombol *"Aktifkan Interaksi Peta"* dan *"Buka Rute"* berukuran `≥ 44px`.
- **Verdict:** **ACHIEVED**

## 10. Footer pada Ponsel
*From the visual evidence (`mobile-footer.png`), I observe:*
- Seluruh 7 link *Navigasi Cepat* dan tombol *"Chat Admin Bengkel"* memiliki area sentuh `≥ 44px` (`smallPrimaryTouchTargets: 0`).
- Teks jam operasional dan copyright menggunakan `text-secondary-container` sehingga kontras terbaca jelas di atas latar `#1E1B4B`.
- **Verdict:** **ACHIEVED**
