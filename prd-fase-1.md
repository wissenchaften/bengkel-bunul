# PRODUCT REQUIREMENTS DOCUMENT (PRD) — FASE 1

**Proyek:** Website Bengkel Mobil Bunul
**Versi Dokumen:** 2.0
**Terakhir Diperbarui:** 19 November 2026
**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, shadcn/ui, Framer Motion, React Hook Form + Zod

---

## 1. Ringkasan Eksekutif

Pengembangan website Bengkel Mobil Bunul difokuskan sebagai **landing page berkinerja tinggi** yang mengonversi trafik — termasuk dari funnel media sosial (TikTok, Instagram, YouTube) — menjadi **prospek riil** berupa reservasi servis melalui WhatsApp.

Pada Fase 1, website berjalan **tanpa sistem backend atau basis data internal**. Seluruh alur reservasi ditangani melalui formulir publik sisi klien yang menghasilkan pesan terformat ke WhatsApp Admin.

### Target Utama Fase 1

- Membangun kehadiran digital profesional untuk Bengkel Bunul
- Mengonversi pengunjung organik & sosial media menjadi reservasi WhatsApp
- Menampilkan portofolio kerja melalui embed video sosial media
- Membangun kepercayaan melalui testimoni dan katalog layanan

---

## 2. Arsitektur Halaman & Sitemap

Website Fase 1 adalah **single-page application** dengan navigasi anchor-link antar seksi. Satu halaman utama (`/`) memuat seluruh konten.

### Urutan Seksi Halaman

```
┌─────────────────────────────────┐
│  Navbar (sticky, transparan)    │
├─────────────────────────────────┤
│  Hero Section                   │
│  → Headline, sub-headline, CTA │
├─────────────────────────────────┤
│  Tentang Kami                   │
│  → Narasi bengkel, keunggulan  │
├─────────────────────────────────┤
│  Katalog Layanan                │
│  → Grid layanan + CTA          │
├─────────────────────────────────┤
│  Portofolio (Video Embeds)      │
│  → Carousel video sosmed       │
├─────────────────────────────────┤
│  Testimoni Kustomer             │
│  → Carousel ulasan             │
├─────────────────────────────────┤
│  Formulir Reservasi             │
│  → Form + kirim ke WhatsApp    │
├─────────────────────────────────┤
│  Informasi & Lokasi             │
│  → Alamat, jam, peta           │
├─────────────────────────────────┤
│  Footer                        │
│  → Link, sosmed, copyright     │
└─────────────────────────────────┘
```

### Navigasi

| Elemen | Perilaku |
|---|---|
| Navbar | Sticky top, blur background saat scroll. Item: Beranda, Layanan, Portofolio, Testimoni, Reservasi, Lokasi |
| Mobile | Hamburger menu dengan slide-in drawer (shadcn/ui Sheet) |
| Scroll | Smooth scroll ke seksi via `id` anchor |
| CTA Navbar | Tombol "Reservasi Sekarang" selalu terlihat, scroll ke form |

---

## 3. Kebutuhan Fungsional (Fitur Utama)

### 3.1 Hero Section

| Aspek | Spesifikasi |
|---|---|
| **Headline** | Teks utama yang menekankan keahlian & kepercayaan (contoh: "Bengkel Spesialis Perbaikan Mobil — Terpercaya Sejak [tahun]") |
| **Sub-headline** | Satu kalimat pendukung yang mengarahkan ke aksi |
| **CTA Primer** | Tombol "Reservasi Jadwal Servis" → scroll ke formulir |
| **CTA Sekunder** | Tombol "Lihat Layanan Kami" → scroll ke katalog |
| **Visual** | Background image bengkel berkualitas tinggi, overlay gradient |
| **Animasi** | Fade-in + slide-up teks saat halaman dimuat (Framer Motion) |

### 3.2 Tentang Kami

| Aspek | Spesifikasi |
|---|---|
| **Konten** | Narasi singkat sejarah bengkel, filosofi kerja, keunggulan |
| **Keunggulan** | 3–4 poin USP dengan ikon (contoh: "Mekanik Bersertifikasi", "Garansi Servis", "Sparepart Original", "Transparan & Jujur") |
| **Layout** | Split layout — teks kiri, gambar/ilustrasi kanan (stack di mobile) |

### 3.3 Sistem Reservasi via WhatsApp (Guest Access)

**Alur utama:**

```
Isi Form → Validasi Client-side → Generate URL wa.me → Redirect ke WhatsApp
```

**Field formulir:**

| Field | Tipe | Validasi (Zod) | Wajib |
|---|---|---|---|
| Nama Lengkap | `text` | Min 3 karakter, maks 50 | ✅ |
| Nomor Telepon | `tel` | Format Indonesia (08xx / +628xx), 10–13 digit | ✅ |
| Merek & Tipe Mobil | `text` | Min 3 karakter (contoh: "Toyota Avanza 2019") | ✅ |
| Nomor Plat | `text` | Format plat Indonesia (contoh: "AG 1234 XX"), opsional | ❌ |
| Kategori Layanan | `select` | Pilih dari daftar layanan | ✅ |
| Keluhan / Deskripsi | `textarea` | Min 10 karakter, maks 500 | ✅ |
| Tanggal Rencana Kedatangan | `date` | Date picker, minimal H+1, maks H+30 | ✅ |
| Preferensi Waktu | `select` | Pagi (08:00–12:00) / Siang (12:00–16:00) | ✅ |

**Template Pesan WhatsApp yang Di-generate:**

```
🔧 *RESERVASI SERVIS — BENGKEL BUNUL*

👤 Nama: {nama}
📱 Telepon: {telepon}
🚗 Kendaraan: {merek_tipe}
🔢 Plat: {plat || "Tidak diisi"}
🔩 Layanan: {kategori_layanan}
📋 Keluhan: {keluhan}
📅 Rencana Datang: {tanggal}, {waktu}

_Dikirim melalui website bengkelbunul.com_
```

**Nomor WhatsApp Target:** Dikonfigurasi via environment variable `NEXT_PUBLIC_WA_ADMIN_NUMBER`.

**Perilaku setelah submit:**
1. Tombol submit berubah menjadi "Buka WhatsApp" dengan ikon WhatsApp
2. Klik membuka `https://wa.me/{nomor}?text={encoded_message}` di tab baru
3. Form di-reset setelah 3 detik dari klik tombol WhatsApp

### 3.4 Katalog Layanan & Estimasi (Call for Estimate)

**Daftar Layanan:**

| No | Layanan | Deskripsi Singkat | Ikon |
|---|---|---|---|
| 1 | Servis Mesin | Tune-up, overhaul, perbaikan mesin bensin & diesel | 🔧 |
| 2 | Sistem Rem | Penggantian kampas rem, cakram, master rem, bleeding | 🛑 |
| 3 | Transmisi | Perbaikan & penggantian transmisi manual/otomatis | ⚙️ |
| 4 | Sistem Kelistrikan | Dinamo, alternator, wiring, ECU, sensor | ⚡ |
| 5 | AC Mobil | Isi freon, perbaikan kompresor, evaporator, kondensor | ❄️ |
| 6 | Kaki-kaki & Suspensi | Shockbreaker, ball joint, tie rod, bushing, alignment | 🔩 |
| 7 | Sistem Pendingin | Radiator, thermostat, water pump, selang radiator | 🌡️ |
| 8 | Perawatan Berkala | Ganti oli, filter, busi, timing belt, servis rutin | 📋 |
| 9  | Body Repair                  | Perbaikan penyok, dempul, pengecatan panel & full body                                                   | 🔨   |

> [!NOTE]
> Daftar layanan ini bersifat awal dan perlu dikonfirmasi dengan pemilik bengkel. Layanan dapat ditambah/dikurangi sesuai kapabilitas aktual.

**Perilaku per kartu layanan:**
- Layout grid responsif: 4 kolom (desktop), 2 kolom (tablet), 1 kolom (mobile)
- Setiap kartu memiliki ikon, judul, deskripsi singkat 1–2 kalimat
- CTA per kartu: "Konsultasi Layanan Ini" → scroll ke form dengan field Kategori Layanan otomatis terisi
- **Tidak ada harga** — semua menggunakan pendekatan "Call for Estimate" karena biaya aktual memerlukan inspeksi teknis langsung

### 3.5 Integrasi Funnel Media Sosial (Portofolio Video)

| Aspek | Spesifikasi |
|---|---|
| **Layout** | Horizontal scrollable carousel, kartu video vertikal (rasio 9:16) |
| **Sumber** | Embed dari TikTok, Instagram Reels, atau YouTube Shorts |
| **Jumlah** | Maksimal **6 video** ditampilkan (hardcoded URL) |
| **Loading** | Lazy load menggunakan Intersection Observer — video embed baru dimuat saat masuk viewport |
| **Fallback** | Jika embed gagal, tampilkan thumbnail statis + tombol "Tonton di [Platform]" yang membuka link eksternal |
| **Data** | URL video disimpan dalam file JSON statis (`/data/videos.json`) |
| **Heading** | "Lihat Langsung Hasil Kerja Kami" |

### 3.6 Testimoni Kustomer (Static Data)

| Aspek | Spesifikasi |
|---|---|
| **Layout** | Carousel horizontal dengan auto-slide (interval 5 detik), pause on hover |
| **Jumlah** | 6–10 testimoni |
| **Data per item** | Nama kustomer, inisial/avatar, tipe mobil, rating (1–5 bintang), teks ulasan |
| **Data source** | File JSON statis (`/data/testimonials.json`) |
| **Visual** | Kartu dengan kutipan, bintang rating, nama + tipe mobil di bawah |

**Contoh struktur data:**

```json
{
  "name": "Budi Santoso",
  "vehicle": "Toyota Innova 2020",
  "rating": 5,
  "review": "Servis transmisi di sini hasilnya rapi dan mekaniknya jujur soal kondisi mobil.",
  "date": "Oktober 2026"
}
```

### 3.7 Informasi Bisnis & Lokasi

| Aspek | Spesifikasi |
|---|---|
| **Alamat** | Jl. Warinoi III, Bunulrejo, Kec. Blimbing, Kota Malang, Jawa Timur 65126 |
| **Jam Operasional** | Setiap Hari: 08:00–17:00 WIB |
| **Telepon** | (0851) 0020-7777 |
| **Peta** | Google Maps embed (iframe) dengan pin lokasi bengkel |
| **Layout** | Split — info kontak kiri, peta kanan (stack di mobile) |

### 3.8 Footer

| Elemen | Konten |
|---|---|
| Logo + tagline | Logo bengkel + satu kalimat tagline |
| Link navigasi | Replikasi link navbar |
| Sosial media | Ikon link ke TikTok, Instagram, YouTube (jika ada) |
| Copyright | "© 2026 Bengkel Mobil Bunul. Seluruh hak dilindungi." |

---

## 4. Ruang Lingkup (Scope Management)

### ✅ In-Scope (Fase 1)

- Desain UI/UX mengacu pada design token di `DESIGN.md`
- Single-page responsive landing page
- Validasi formulir sisi klien (react-hook-form + Zod)
- Integrasi eksternal WhatsApp API (wa.me)
- Optimasi aset gambar (next/image, format WebP)
- Optimasi performa (lazy loading, code splitting)
- Responsivitas penuh (mobile-first)
- SEO dasar (meta tags, Open Graph, structured data)
- Google Maps embed untuk lokasi
- Animasi halus (Framer Motion) untuk interaksi & transisi seksi

### ❌ Out-of-Scope (Fase 1)

- Blog / artikel / konten editorial
- Integrasi Headless CMS (konten dikelola langsung di kode)
- Ketersediaan kalender real-time / booking system
- Payment gateway / transaksi online
- Dashboard admin
- Sistem notifikasi otomatis
- Multi-bahasa (hanya Bahasa Indonesia)
- Progressive Web App (PWA)

### 🔮 Future Plan (Fase 2+)

- Portal akun kustomer (sistem otentikasi)
- Dashboard riwayat servis kendaraan
- Integrasi CMS untuk konten dinamis
- Sistem booking kalender real-time
- Notifikasi status servis (WhatsApp Business API)
- Blog/artikel tips perawatan mobil (SEO content)

---

## 5. Spesifikasi Desain & Antarmuka

### 5.1 Design Tokens

> Referensi lengkap ada di [`DESIGN.md`](file:///c:/Users/Wissenchaften/Desktop/Web%20Bengkel%20Bunul/DESIGN.md). Tabel ini adalah ringkasan token utama yang digunakan.

**Warna:**

| Token | Nilai | Penggunaan |
|---|---|---|
| **Primary (Brand Indigo)** | `#1d1583` | Brand identity, heading, link aktif |
| **Primary Container (Cobalt)** | `#353299` | CTA primer fill, interactive fills, focus border |
| **Secondary (Chassis Midnight)** | `#1E1B4B` | Dark section bg, badge fill, footer |
| **Tertiary Accent (Amber)** | `#FD9935` / `#f99632` | CTA aksen, badge, rating bintang, highlight |
| **Success (Emerald Green)** | `#16a34a` | Konfirmasi sukses, checkmark |
| **Error** | `#ba1a1a` | Pesan error validasi form |
| **Surface** | `#f7f9fb` | Background utama halaman |
| **Surface Card** | `#ffffff` | Kartu, form background |
| **On Surface** | `#191c1e` | Body text utama |
| **On Surface Variant** | `#464552` | Teks sekunder, caption |
| **Border Light** | `#E2E8F0` | Border kartu, separator |
| **Border Medium** | `#CBD5E1` | Border input field |

**Tipografi (3 Font Family):**

| Peran | Font | Contoh Token |
|---|---|---|
| Headlines & Titles | Plus Jakarta Sans | `display-lg`, `headline-xl`, `headline-sm`, `title-md` |
| Body & Data | Inter | `body-lg`, `body-md`, `body-sm` |
| Labels & Badges | Public Sans | `label-md`, `technical-badge` |

| Token | Weight | Size (Desktop) | Size (Mobile) |
|---|---|---|---|
| `display-lg` (Hero) | 800 | 56px | 36px |
| `headline-xl` (Section) | 800 / 700 | 40px | 28px |
| `headline-sm` (Card title) | 600 | 20px | 20px |
| `body-lg` (Sub-headline) | 400 | 18px | 18px |
| `body-md` (Paragraf) | 400 | 15px | 15px |
| `label-md` (Tombol, label) | 600 | 14px | 14px |
| `technical-badge` (Badge) | 800 | 11px | 11px |

### 5.2 Prinsip Copywriting

- **Profesional & lugas** — hindari bahasa hiperbola atau slang
- **Teknis tapi mudah dipahami** — gunakan istilah otomotif yang umum
- **Hindari kata pasaran** — tidak menggunakan "GRATIS", "MURAH", "DISKON"
- **Bangun kepercayaan** — tekankan keahlian, transparansi, kualitas
- **Action-oriented CTA** — gunakan kata kerja aktif ("Reservasi Sekarang", "Konsultasi Layanan")

### 5.3 Komponen UI (shadcn/ui)

| Komponen | Penggunaan |
|---|---|
| `Button` | CTA primer & sekunder |
| `Input` | Field teks form |
| `Textarea` | Field keluhan |
| `Select` | Dropdown kategori layanan, preferensi waktu |
| `Calendar` / `DatePicker` | Pemilihan tanggal kedatangan |
| `Card` | Kartu layanan, kartu testimoni |
| `Sheet` | Mobile navigation drawer |
| `Carousel` | Slider testimoni & video |
| `Badge` | Label kategori layanan |
| `Separator` | Pembatas antar seksi |

### 5.4 Animasi (Framer Motion)

| Elemen | Animasi | Trigger |
|---|---|---|
| Seksi halaman | Fade-in + slide-up (y: 30 → 0) | Scroll into view (once) |
| Kartu layanan | Stagger children (delay 0.1s) | Scroll into view |
| Hero text | Fade-in sequential (judul → subjudul → CTA) | Page load |
| Tombol CTA | Scale on hover (1.02) + subtle shadow | Hover |
| Navbar | Background blur + opacity transition | Scroll > 50px |
| Testimoni | Slide horizontal | Auto-play + swipe |

---

## 6. Kebutuhan Teknis & Infrastruktur

### 6.1 Arsitektur Next.js

| Aspek | Strategi |
|---|---|
| **Rendering** | Static Site Generation (SSG) — `generateStaticParams` tidak diperlukan (single page), gunakan default static rendering |
| **Server Components** | Layout utama, navbar, footer, seksi konten statis |
| **Client Components** | Form reservasi (`"use client"`), carousel video, carousel testimoni, animasi Framer Motion |
| **Data** | File JSON statis di `/data/` — `services.json`, `testimonials.json`, `videos.json` |

### 6.2 Struktur Folder

```
src/
├── app/
│   ├── layout.tsx          # Root layout (font, metadata)
│   ├── page.tsx            # Halaman utama (komposisi seksi)
│   └── globals.css         # Tailwind directives + custom styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ReservationSection.tsx
│   │   └── LocationSection.tsx
│   ├── ui/                 # shadcn/ui components
│   └── shared/             # Komponen reusable
├── data/
│   ├── services.json
│   ├── testimonials.json
│   └── videos.json
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── validations.ts      # Zod schemas
│   └── whatsapp.ts         # WA URL generator
└── hooks/
    └── useScrollSpy.ts     # Active nav tracking
```

### 6.3 Validasi Form (Zod Schema)

```typescript
const reservationSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter").max(50),
  telepon: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{7,10}$/, "Format nomor telepon tidak valid"),
  kendaraan: z.string().min(3, "Masukkan merek dan tipe mobil"),
  plat: z.string().regex(/^[A-Z]{1,2}\s?\d{1,4}\s?[A-Z]{1,3}$/, "Format plat tidak valid").optional().or(z.literal("")),
  layanan: z.string().min(1, "Pilih kategori layanan"),
  keluhan: z.string().min(10, "Jelaskan keluhan minimal 10 karakter").max(500),
  tanggal: z.date().min(new Date(), "Tanggal harus di masa depan"),
  waktu: z.enum(["pagi", "siang"], { required_error: "Pilih preferensi waktu" }),
});
```

### 6.4 SEO & Metadata

**Meta Tags Dasar:**

```typescript
export const metadata: Metadata = {
  title: "Bengkel Mobil Bunul — Spesialis Perbaikan & Servis Mobil Terpercaya",
  description: "Bengkel mobil terpercaya dengan mekanik berpengalaman. Layanan servis mesin, rem, transmisi, AC, kelistrikan, dan perawatan berkala. Reservasi mudah via WhatsApp.",
  keywords: ["bengkel mobil", "servis mobil", "perbaikan mobil", "bengkel bunul"],
  openGraph: {
    title: "Bengkel Mobil Bunul",
    description: "Spesialis Perbaikan & Servis Mobil Terpercaya",
    type: "website",
    locale: "id_ID",
  },
};
```

**Structured Data (JSON-LD):**

```json
{
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Bengkel Mobil Bunul",
  "description": "Bengkel spesialis perbaikan dan servis mobil",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[Kota]",
    "addressRegion": "[Provinsi]",
    "addressCountry": "ID"
  },
  "telephone": "[Nomor Telepon]",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "08:00",
      "closes": "16:00"
    }
  ]
}
```

### 6.5 Performa & Optimasi

| Metrik | Target |
|---|---|
| **Lighthouse Score** | ≥ 90 (Performance, Accessibility, Best Practices, SEO) |
| **LCP** | < 2.5 detik |
| **CLS** | < 0.1 |
| **INP** | < 200ms |

**Strategi optimasi:**

- `next/image` dengan format otomatis (WebP/AVIF) untuk semua gambar
- Lazy loading video embed via Intersection Observer (hanya load saat masuk viewport)
- Font preload dengan `next/font/google`
- Minimal JavaScript di initial bundle — Server Components untuk konten statis
- CSS Tailwind purge otomatis (hanya kelas yang dipakai)

### 6.6 Responsivitas (Breakpoints)

| Breakpoint | Tailwind | Target Perangkat |
|---|---|---|
| Default | `< 640px` | Ponsel (portrait) |
| `sm` | `≥ 640px` | Ponsel (landscape) |
| `md` | `≥ 768px` | Tablet |
| `lg` | `≥ 1024px` | Laptop |
| `xl` | `≥ 1280px` | Desktop |

**Pendekatan:** Mobile-first — style dasar untuk ponsel, lalu progressive enhancement ke atas.

### 6.7 Aksesibilitas

| Aspek | Standar |
|---|---|
| Level | WCAG 2.1 Level AA |
| Kontras teks | Minimum rasio 4.5:1 (body), 3:1 (large text) |
| Navigasi keyboard | Semua interaksi dapat diakses via Tab, Enter, Escape |
| Alt text | Semua gambar memiliki deskripsi alt yang bermakna |
| Form labels | Semua input memiliki label eksplisit (`htmlFor`) |
| Focus visible | Outline fokus terlihat jelas pada semua elemen interaktif |
| ARIA | Landmark roles untuk setiap seksi (`main`, `nav`, `footer`) |
| Reduced motion | Gunakan `prefers-reduced-motion` untuk menonaktifkan animasi |

### 6.8 Environment Variables

| Variable | Deskripsi | Contoh |
|---|---|---|
| `NEXT_PUBLIC_WA_ADMIN_NUMBER` | Nomor WhatsApp admin (format internasional) | `6281234567890` |
| `NEXT_PUBLIC_GMAPS_EMBED_URL` | URL embed Google Maps | `https://maps.google.com/...` |
| `NEXT_PUBLIC_SITE_URL` | URL produksi website | `https://bengkelbunul.com` |

### 6.9 Hosting & Deployment

Keputusan infrastruktur peladen ditunda hingga arsitektur frontend rampung secara lokal. Kandidat yang direkomendasikan:

| Platform | Alasan |
|---|---|
| **Vercel** | Native Next.js, CDN global, free tier memadai |
| **Netlify** | Alternatif solid, mudah setup |
| **Cloudflare Pages** | Performa tinggi, edge rendering |

---

## 7. Metrik Keberhasilan (Success Criteria)

| Metrik | Target | Cara Ukur |
|---|---|---|
| **Konversi reservasi** | ≥ 5% pengunjung klik tombol WhatsApp | Analytics event tracking |
| **Bounce rate** | < 50% | Google Analytics |
| **Waktu di halaman** | > 2 menit rata-rata | Google Analytics |
| **Lighthouse Performance** | ≥ 90 | Lighthouse audit |
| **Mobile Usability** | 0 error | Google Search Console |
| **Page Load (LCP)** | < 2.5 detik pada 3G | WebPageTest |

---

## 8. Asumsi & Dependensi

### Asumsi

1. Pemilik bengkel menyediakan konten (foto bengkel, daftar layanan final, testimoni real)
2. Nomor WhatsApp admin aktif dan responsif di jam operasional
3. Konten video sosial media sudah tersedia dan publik
4. Domain belum ditentukan (kandidat: bengkelbunul.com)

### Dependensi

1. **Konten dari pemilik:** Foto, daftar layanan final, alamat lengkap, jam operasional
2. **Aset visual:** Logo bengkel (format SVG), foto bengkel berkualitas tinggi
3. **DESIGN.md:** Referensi design token (sudah ada / akan dibuat terpisah)
4. **Nomor WhatsApp:** Nomor yang akan menerima pesan reservasi

---

## 9. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konten dari pemilik terlambat | Delay implementasi | Gunakan placeholder, paralel development |
| WhatsApp down / nomor berubah | Reservasi gagal | Tampilkan nomor telepon sebagai fallback |
| Video embed di-blok platform | Portofolio tidak muncul | Fallback thumbnail + link eksternal |
| Performa buruk di device low-end | UX jelek, bounce tinggi | Progressive enhancement, lazy loading agresif |

---

## 10. Timeline Estimasi

| Minggu | Milestone | Deliverable |
|---|---|---|
| 1 | Setup & Fondasi | Project init, design system, layout, navbar, footer |
| 2 | Seksi Utama | Hero, Tentang Kami, Katalog Layanan |
| 3 | Interaksi | Form reservasi + WA integration, portofolio video |
| 4 | Polish | Testimoni, lokasi, animasi, SEO, performa, responsif |
| 5 | QA & Launch | Testing cross-browser, accessibility audit, deployment |

> [!IMPORTANT]
> Timeline bersifat estimasi dan tergantung ketersediaan konten dari pemilik bengkel.
