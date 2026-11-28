# Log Defek Visual & Status Remediasi

Dokumen ini mencatat riwayat temuan defek visual, aksesibilitas, dan UI/UX pada Bengkel Mobil Bunul beserta status perbaikannya hingga audit verifikasi ulang tanggal **25 November 2026**.

---

## Ringkasan Status Seluruh Temuan

| ID | Tingkat Keparahan | Komponen | Deskripsi Masalah | Status | File Terkait |
|---|---|---|---|---|---|
| **BUG-01** | 🔴 Kritis | Hero Section | Gambar mekanik bengkel gagal dimuat (URL privat `/aida/`). | ✅ **Selesai** | `src/components/sections/HeroSection.tsx` |
| **BUG-02** | 🔴 Kritis | Portfolio Section | `IntersectionObserver` mismatch (`data-video-id` di elemen anak), integrasi 6 link video asli, tampilan seragam YT Shorts, & single active player. | ✅ **Selesai** | `src/components/sections/PortfolioSection.tsx`, `src/lib/video-embed.ts`, `src/data/videos.json` |
| **BUG-03** | 🔴 Kritis | Services Section | Gambar Kartu *Kelistrikan* & *Berkala* rusak. | ✅ **Selesai** | `src/data/services.json` |
| **BUG-04** | 🟡 Sedang | Services Section | Tombol *"KONSULTASI LAYANAN"* memiliki touch target `< 44px`. | ✅ **Selesai** | `src/components/sections/ServicesSection.tsx` |
| **BUG-05** | 🟡 Sedang | Reservation Section | Radio input sesi waktu (*Pagi/Siang*) belum memiliki `aria-label` dan tinggi `< 44px`. | ✅ **Selesai** | `src/components/sections/ReservationSection.tsx` |
| **BUG-06** | 🟢 Minor | Navbar | `#reservasi` belum masuk ke `useScrollSpy`, membuat link *Testimoni* tetap aktif di form reservasi. | ✅ **Selesai** | `src/components/layout/Navbar.tsx` |
| **UX-07** | 🟡 Sedang | Testimonials, Location, Footer, Navbar | 14 elemen interaktif utama masih di bawah standar sentuh mobile `44×44px`. | ✅ **Selesai** | `TestimonialsSection.tsx`, `LocationSection.tsx`, `Footer.tsx`, `Navbar.tsx` |
| **UX-08** | 🟡 Sedang | Footer, Testimonials, Location | Teks `text-outline` pada background `#1E1B4B` (Footer) dan subtitle kartu putih memiliki kontras redup (`< 4.5:1`). | ✅ **Selesai** | `Footer.tsx`, `TestimonialsSection.tsx`, `LocationSection.tsx` |
| **UX-09** | 🟢 Minor | Portfolio, Location, Footer | Lompatan level heading HTML (`H2 -> H4`) pada judul kartu video, sub-heading fasilitas lokasi, dan kolom footer. | ✅ **Selesai** | `PortfolioSection.tsx`, `LocationSection.tsx`, `Footer.tsx` |
| **UX-10** | 🟢 Minor | Services Section (Mobile) | Tombol panah melayang kiri/kanan menimpa tepi kartu di layar mobile `390px`. | ✅ **Selesai** | `ServicesSection.tsx` |

---

## Ringkasan Verifikasi Akhir (25 November 2026)

- `npm run lint` & `npx tsc --noEmit`: Lulus (0 error).
- `npm run build`: Lulus (`/` static prerendered).
- `AUDIT_URL=http://localhost:3005 node scripts/visual-audit.mjs`:
  - `brokenImages`: `[]` (`0`)
  - `mobileOverflow.hasHorizontalScroll`: `false` (`unexpectedOverflowCount: 0`)
  - `a11y.smallPrimaryTouchTargets`: `[]` (`0`)
  - `a11y.smallPaginationDots`: `[]` (`0`)
  - `a11y.headingSkips`: `[]` (`0`)
  - `serviceAutoFill.success`: `true` (`"Perawatan Berkala"`)
  - `portfolioCheck.singleActiveVerified`: `true`
  - `testimonialsCheck.dotSwitchWorked`: `true` (`7` kartu, `7` dots)
  - `mapGuardCheck`: `initiallyPointerEventsNone: true`, `activatedPointerEventsAuto: true`
