# Laporan Validasi UI Visual Desktop & Mobile — Bengkel Mobil Bunul

> **Status Audit:** SELESAI (Audited per 21 November 2026)  
> **Peran:** UI Visual QA Validator  
> **Metodologi:** Zero-Trust Visual Verification, Headless Chrome DevTools Protocol (CDP), Pixel & Layout Analysis, WCAG 2.1/2.2 Compliance Check.

---

## Ringkasan Eksekutif (Executive Summary)

*From the visual evidence, I observe* bahwa antarmuka web Bengkel Mobil Bunul telah mengimplementasikan struktur komponen Next.js 16 + Tailwind CSS 4 dengan tata letak visual industrial yang kuat, hierarki tipografi *Plus Jakarta Sans* dan *Public Sans*, serta palet warna Material You (`#0a005d` Deep Indigo, `#1e1b4b` Chassis Midnight, `#f99632` Amber Accent).

Namun, berdasarkan prinsip **Zero-Trust Visual Evidence**, target visual **BELUM SEPENUHNYA TERCAPAI (PARTIALLY ACHIEVED)** karena ditemukan beberapa **defek visual kritis** pada aset gambar, mekanisme rendering lazy-load video portofolio, serta kepatuhan aksesibilitas target sentuh (touch target) pada perangkat bergerak.

---

## Matriks Hasil Evaluasi Komponen

| Komponen / Seksi | Desktop (1440×900) | Mobile (390×844) | Status Verifikasi | Catatan Visual Utama |
|---|---|---|---|---|
| **Header & Navbar** | ✅ Lolos | ✅ Lolos | **ACHIEVED** | Sticky glassmorphism aktif, navigasi desktop rapi, drawer mobile responsif dengan portal. |
| **Hero Section** | ❌ Gagal | ❌ Gagal | **NOT ACHIEVED** | Foto utama workshop gagal dimuat (*broken image icon* akibat URL privat `/aida/`). |
| **Stats Counter** | ✅ Lolos | ✅ Lolos | **ACHIEVED** | 4 kartu metrik (10+ Tahun, 4.9/5.0, 100%, Garansi Tertulis) ter-render seimbang. |
| **About Section** | ✅ Lolos | ✅ Lolos | **ACHIEVED** | Aksen sudut arsitektural (*corner frame accents*), gambar mekanik balancing & laptop scanner tampil sempurna. |
| **Services Section** | ⚠️ Parsial | ⚠️ Parsial | **PARTIALLY ACHIEVED** | Kartu 1 (*Kelistrikan*) dan Kartu 8 (*Berkala*) memiliki gambar rusak. Tombol touch target terlalu kecil (16px). |
| **Portfolio Section** | ❌ Gagal | ❌ Gagal | **NOT ACHIEVED** | Ke-4 thumbnail video tidak muncul (blank gradient) karena *IntersectionObserver selector target bug*. |
| **Testimonials** | ✅ Lolos | ✅ Lolos | **ACHIEVED** | Carousel card dengan bintang rating, kutipan kustomer, dan inisial avatar berfungsi dengan baik. |
| **Reservation Form** | ✅ Lolos | ⚠️ Parsial | **PARTIALLY ACHIEVED** | Form 8 field rapi di desktop; pada mobile radio button waktu memerlukan standardisasi WCAG name. |
| **Location & Maps** | ✅ Lolos | ✅ Lolos | **ACHIEVED** | Google Maps iframe render dengan proteksi gestur mobile (*Aktifkan Peta* button). |
| **Footer** | ✅ Lolos | ✅ Lolos | **ACHIEVED** | 4 kolom informasi, badge bengkel resmi, link navigasi, dan WhatsApp CTA terpasang presisi. |

---

## Indeks Dokumen Audit

1. **[Laporan Audit Desktop (1440×900)](file:///c:/Users/Wissenchaften/Desktop/Web%20Bengkel%20Bunul/docs/ui-visual-validator/desktop-audit.md)**: Analisis detail seluruh seksi desktop, pengukuran alignment, grid spacing, dan status visual.
2. **[Laporan Audit Mobile (390×844)](file:///c:/Users/Wissenchaften/Desktop/Web%20Bengkel%20Bunul/docs/ui-visual-validator/mobile-audit.md)**: Analisis interaksi drawer mobile, touch targets, pembungkusan teks (*text wrap*), dan gesture protection.
3. **[Log Defek & Panduan Remediasi](file:///c:/Users/Wissenchaften/Desktop/Web%20Bengkel%20Bunul/docs/ui-visual-validator/defect-remediation.md)**: Rincian bug visual, akar masalah kode (*root cause*), dan kode perbaikan (*drop-in fix*).

---

## Tangkapan Layar Bukti Visual

Semua tangkapan layar bukti audit tersimpan secara lokal di folder:
`docs/ui-visual-validator/screenshots/`

- **Full Page Desktop:** `desktop-fullpage.png` (1440×7500)
- **Full Page Mobile:** `mobile-fullpage.png` (390×11000)
- **Desktop Hero:** `desktop-01-hero.png`
- **Mobile Drawer Open:** `mobile-02-drawer-open.png`
- **Audit Data JSON:** `audit-results.json`
