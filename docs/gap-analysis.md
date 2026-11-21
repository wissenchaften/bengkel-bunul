# GAP ANALYSIS — PLAN vs. SOURCE OF TRUTH

**Tanggal Audit:** 21 November 2026
**Sumber yang di-audit:**
- `prd-fase-1.md` (PRD 550 baris)
- `DESIGN.md` (Design System 527 baris)
- Stitch Project "Bengkel Bunul Design System" (10 screens)
  - Desktop HTML (~95KB)
  - Mobile HTML (13888px height)
  - Spesifikasi Animasi & Interaksi (Motion System Spec)
  - Panduan Anti-Slop Copywriting
  - Perbandingan Sebelum/Sesudah Copywriting

---

## TEMUAN GAP (Item yang Miss dari Plan Awal)

### 🔴 GAP KRITIS (Harus ada di plan)

| # | Item yang Miss | Sumber | Dampak |
|---|---|---|---|
| G-01 | **Motion Tokens & ScrollReveal component** — Plan belum menyebutkan file `tokens/motion.ts` dan komponen reusable `ScrollReveal.tsx` yang sudah didefinisikan lengkap di Stitch Motion Spec. | Stitch: Motion Spec §2.1, §4.1 | Animasi akan inconsistent tanpa token terpusat |
| G-02 | **Stagger container component** — Plan menyebut animasi stagger tapi belum ada komponen wrapper `StaggerContainer` untuk children. | Stitch: Motion Spec §3.3, §3.4 | Kartu layanan & USP tidak akan stagger masuk |
| G-03 | **Mobile Sheet drawer animation spec** — Plan menyebut Sheet shadcn/ui tapi belum detail spring config drawer (`stiffness: 350, damping: 32`). | Stitch: Motion Spec §3.1 | Drawer terasa generic, bukan "industrial snap" |
| G-04 | **Google Maps gesture protection (mobile)** — Plan belum menyebutkan `pointer-events-none` default pada iframe peta di mobile untuk mencegah user terjebak saat scroll. | Stitch: Motion Spec §3.8, PRD §3.7 | UX mobile kritis: user bisa stuck di peta |
| G-05 | **`NEXT_PUBLIC_GMAPS_EMBED_URL`** — Plan hanya punya 2 env vars tapi PRD §6.8 mendefinisikan 3 env vars termasuk URL embed Google Maps. | PRD §6.8 | Peta hardcoded, sulit diganti tanpa edit kode |
| G-06 | **Shimmer skeleton loader** — Stitch Motion Spec mendefinisikan `animate-shimmer` keyframe untuk lazy-loaded sections (video embeds). Plan tidak menyebutkan. | Stitch: Motion Spec §2.2 | Video section akan flash/jump tanpa placeholder |
| G-07 | **Panduan Anti-Slop sebagai project rule** — Stitch memiliki dokumen Anti-Slop Copywriting lengkap + tabel perbandingan Before/After. Plan belum mengintegrasikan ini sebagai aturan proyek. | Stitch: Anti-Slop doc, Before/After doc | Risiko AI-generated text lolos ke produksi |
| G-08 | **Body Repair (Layanan ke-9)** — PRD §3.4 mendaftar 9 layanan termasuk "Body Repair: Perbaikan penyok, dempul, pengecatan panel & full body". Plan awal hanya menyebut 8 kategori di services.json. | PRD §3.4 baris 151 | Layanan tidak lengkap |

### 🟡 GAP SEDANG (Sebaiknya ada di plan)

| # | Item yang Miss | Sumber | Dampak |
|---|---|---|---|
| G-09 | **Aksesibilitas WCAG 2.1 AA** — PRD §6.7 mendefinisikan standar lengkap (kontras 4.5:1, keyboard nav, ARIA landmarks, focus visible). Plan hanya menyebut `prefers-reduced-motion` secara sepintas. | PRD §6.7 | Risiko gagal accessibility audit |
| G-10 | **JSON-LD Structured Data detail** — Plan menyebut JSON-LD tapi belum detail field `telephone`, `address` lengkap, dan `openingHoursSpecification` sesuai PRD §6.4. | PRD §6.4 baris 409-433 | SEO lokal kurang optimal |
| G-11 | **Lazy load video via Intersection Observer** — PRD §3.5 dan Motion Spec §3.5 menekankan video embed wajib lazy load dengan threshold 200px. Plan menyebut tapi belum detail implementasinya. | PRD §3.5, Motion Spec §3.5 | LCP/Performance bisa buruk |
| G-12 | **Fallback video embed** — PRD §3.5 mensyaratkan fallback: "Jika embed gagal, tampilkan thumbnail statis + tombol 'Tonton di [Platform]'". Stitch HTML sudah mengimplementasikan ini. | PRD §3.5 | Video blank jika platform block embed |
| G-13 | **Date picker constraint H+30** — PRD §3.3 mensyaratkan tanggal maks H+30. Plan hanya menyebut min H+1. | PRD §3.3 baris 111 | User bisa booking 6 bulan ke depan |
| G-14 | **Form reset setelah 3 detik** — PRD §3.3 mensyaratkan "Form di-reset setelah 3 detik dari klik tombol WhatsApp". | PRD §3.3 baris 135 | Form tetap terisi setelah submit |
| G-15 | **Service card auto-fill highlight** — Stitch HTML menunjukkan ring highlight sementara pada dropdown setelah auto-fill kategori (`ring-2 ring-primary-container` selama 1.2 detik). | Stitch JS line ~service-select-btn | User tidak tahu field mana yang terisi otomatis |

### 🟢 GAP MINOR (Nice to have)

| # | Item yang Miss | Sumber | Dampak |
|---|---|---|---|
| G-16 | **Testimoni auto-slide interval** — PRD menyebut 5 detik, Stitch HTML menggunakan 4.5 detik. Perlu sinkronisasi. | PRD §3.6 vs Stitch JS | Inkonsistensi kecil |
| G-17 | **Plat nomor uppercase auto-format** — Stitch HTML memiliki event listener untuk auto-uppercase saat mengetik plat. | Stitch JS | Minor UX improvement |
| G-18 | **Corner frame accents di About** — Stitch desktop HTML menampilkan border sudut arsitektural pada foto workshop (`border-t-2 border-l-2`). Detail visual ini belum di-plan. | Stitch HTML, DESIGN.md §Layout | Detail visual industrial kurang |

---

## RINGKASAN

| Severity | Jumlah | Status |
|---|---|---|
| 🔴 Kritis | 8 | Harus diperbaiki di plan |
| 🟡 Sedang | 7 | Sebaiknya diperbaiki |
| 🟢 Minor | 3 | Opsional |
| **Total** | **18** | — |

---

## REKOMENDASI

Semua 18 gap di atas telah diintegrasikan ke dalam plan revisi (`plan-v2.md`).
