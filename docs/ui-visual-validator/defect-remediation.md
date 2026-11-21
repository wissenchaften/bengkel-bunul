# Log Defek Visual & Panduan Remediasi (Bug Fixes)

Dokumen ini memuat seluruh temuan defek visual dan pelanggaran aksesibilitas hasil audit `ui-visual-validator`, akar penyebab kode (*root cause*), dan instruksi perbaikan konkret (*code fix*).

---

## Daftar Defek Berdasarkan Tingkat Keparahan

| ID | Tingkat Keparahan | Komponen | Deskripsi Masalah | File Terkait |
|---|---|---|---|---|
| **BUG-01** | 🔴 Kritis | Hero Section | Gambar mekanik bengkel gagal dimuat (*broken image glyph*). | `src/components/sections/HeroSection.tsx` |
| **BUG-02** | 🔴 Kritis | Portfolio Section | Ke-4 thumbnail video tidak pernah muncul (blank gradien ungu). | `src/components/sections/PortfolioSection.tsx` |
| **BUG-03** | 🔴 Kritis | Services Section | Gambar Kartu 1 (*Kelistrikan*) dan Kartu 8 (*Berkala*) rusak. | `src/data/services.json` |
| **BUG-04** | 🟡 Sedang | Services Section | Tombol *"KONSULTASI LAYANAN"* memiliki touch target < 44px (hanya 16px). | `src/components/sections/ServicesSection.tsx` |
| **BUG-05** | 🟡 Sedang | Reservation Section | Radio input sesi waktu (*Pagi/Siang*) belum memiliki `aria-label` untuk screen reader. | `src/components/sections/ReservationSection.tsx` |
| **BUG-06** | 🟢 Minor | Navbar | Section `#reservasi` tidak terdaftar di `NAV_ITEMS`, menyebabkan link *"Testimoni"* tetap menyala saat user berada di form reservasi. | `src/components/layout/Navbar.tsx` |

---

## Rincian Defek & Solusi Kode

### 🔴 BUG-01: Gambar Utama Hero Section Rusak

* **Deskripsi:** Pada viewport desktop maupun mobile, kartu visual di kolom kanan hero menampilkan ikon gambar rusak di pojok kiri atas.
* **Akar Masalah:** Atribut `src` pada tag `<Image>` di baris 141 mengarah ke URL privat sesi sementara (`https://lh3.googleusercontent.com/aida/...`) yang tidak memiliki izin akses publik.
* **Solusi Kode:** Ganti `src` dengan URL publik yang valid dari Google Storage atau file lokal:
```tsx
// File: src/components/sections/HeroSection.tsx (Baris 141)
// SEBELUM:
src="https://lh3.googleusercontent.com/aida/ALJJyrA3GJ0zVs6pl2WSmJjFsG0BUBG9mRYinrPUKacQiBHkLTwQrwy3nLeZJnbtKMRPnDlE-vIUQ2DFMv-wF2f2qzHWA4223cMM5x2KPrZIduKwyLoktXHyDO_-JkCP1LWlytalRzV0hqPcMNoJf0enIQYZcrru4UoQjgnJDPW5zFsSKhCzheexKQku9ClTP5Hy0xvfsbQPRWiYyVFcdbU4aTnVSom66TWq0NY89BIYDlSB"

// SESUDAH:
src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv0qFnxCD9ha-lXHPGokQkS2orqWKmh74p1t7kbbX776pWJNfnPPn3s47G6xFUEk_xmd81GQ7OOdPU-V6Xy2MRSzeJbQqL_znUO4cyK-C8wq-k_WBgI2xdq_Iu9kn2blWGnjOAQbFg1t-zowmcaMxkywFe-2F8b-aT7kkYmSwXMfaEEmcPsOL9rbsfjxOeJ4GPfGFTN0hLT2RdAc3t6zaW7TJZ0snLdYTYSYTNOiEy"
```

---

### 🔴 BUG-02: Thumbnail Video Portofolio Tidak Pernah Muncul

* **Deskripsi:** Semua kartu video pada seksi Portofolio hanya menampilkan background gradien kosong dan tombol play, tanpa gambar mobil/workshop.
* **Akar Masalah:** Di `src/components/sections/PortfolioSection.tsx`:
  - Kelas `.video-card-target` dipasang pada komponen terluar (`<ScrollReveal>`).
  - Namun atribut `data-video-id` dipasang pada tag `<div>` anak di baris 107.
  - Saat `IntersectionObserver` memicu event pada `entry.target` (yaitu `<ScrollReveal>`), pemanggilan `entry.target.getAttribute("data-video-id")` menghasilkan `null`.
  - Akibatnya state `loadedVideos[video.id]` tidak pernah diubah menjadi `true`.
* **Solusi Kode:** Pindahkan `data-video-id={video.id}` ke elemen yang memiliki kelas `.video-card-target` atau gunakan selector query pada anaknya:
```tsx
// File: src/components/sections/PortfolioSection.tsx (Baris 20-25)
// SEBELUM:
const id = entry.target.getAttribute("data-video-id");
if (id) {
  setLoadedVideos((prev) => ({ ...prev, [id]: true }));
}

// SESUDAH:
const id = entry.target.getAttribute("data-video-id") || entry.target.querySelector("[data-video-id]")?.getAttribute("data-video-id");
if (id) {
  setLoadedVideos((prev) => ({ ...prev, [id]: true }));
}
```

---

### 🔴 BUG-03: Gambar Rusak pada Data Layanan (services.json)

* **Deskripsi:** Layanan ke-1 (*Servis Kelistrikan & Aki*) dan layanan ke-8 (*Perawatan Servis Berkala*) memiliki gambar broken.
* **Akar Masalah:** Kedua item tersebut menggunakan URL privat `/aida/` bukan `/aida-public/`.
* **Solusi Kode:** Perbarui `src/data/services.json` dengan URL publik yang aktif:
```json
// File: src/data/services.json
// Item "kelistrikan" (baris 8):
"image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCe4ENqhx-sSZHcHts_0hyY23CiqmWQolBeFlgS-B7p8AWPzxqSp2seR0cpxUlDGC7LYm1J3bFZil0sDLRnsUlEm3YqhB62x3e7REbhqpumg5K1hhb1LPZBzVVR-_ntZ1MkydvaTltcqGBrO6YPZWgB2McNkq1hlH2CpqEOTbR79thEmQongJqEStSS71ZK-8QDkweI6cgRKF71huhtsX_5tofi6xo8o_BmibZTsElJ"

// Item "berkala" (baris 71):
"image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCv0qFnxCD9ha-lXHPGokQkS2orqWKmh74p1t7kbbX776pWJNfnPPn3s47G6xFUEk_xmd81GQ7OOdPU-V6Xy2MRSzeJbQqL_znUO4cyK-C8wq-k_WBgI2xdq_Iu9kn2blWGnjOAQbFg1t-zowmcaMxkywFe-2F8b-aT7kkYmSwXMfaEEmcPsOL9rbsfjxOeJ4GPfGFTN0hLT2RdAc3t6zaW7TJZ0snLdYTYSYTNOiEy"
```

---

### 🟡 BUG-04: Touch Target Tombol Layanan Terlalu Kecil

* **Deskripsi:** Tombol *"KONSULTASI LAYANAN"* pada kartu katalog layanan hanya memiliki tinggi sentuh 16px. Standar WCAG 2.5.5 mensyaratkan target sentuh interaktif minimum 44×44px (atau 24×24px dengan padding sentuh) agar mudah diakses di ponsel.
* **Solusi Kode:** Berikan padding vertikal dan area sentuh minimum pada tombol:
```tsx
// File: src/components/sections/ServicesSection.tsx (Baris 145)
// SEBELUM:
className="inline-flex items-center gap-1.5 font-label text-xs sm:text-sm font-bold text-primary hover:text-accent-amber-deep tracking-wider uppercase transition-colors group/btn cursor-pointer"

// SESUDAH:
className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg font-label text-xs sm:text-sm font-bold text-primary hover:text-accent-amber-deep tracking-wider uppercase transition-colors group/btn cursor-pointer hover:bg-surface-container"
```

---

### 🟡 BUG-05: Label Aksesibilitas pada Radio Button Sesi Waktu

* **Deskripsi:** Input `<input type="radio" value="pagi">` dan `value="siang"` menggunakan kelas `sr-only` tanpa atribut `aria-label`.
* **Solusi Kode:** Tambahkan `aria-label` pada tag input:
```tsx
// File: src/components/sections/ReservationSection.tsx (Baris 363 & 373)
<input
  type="radio"
  value="pagi"
  aria-label="Sesi Waktu Pagi (08:00 sampai 12:00 WIB)"
  {...register("waktu")}
  className="peer sr-only"
/>

<input
  type="radio"
  value="siang"
  aria-label="Sesi Waktu Siang (12:00 sampai 16:00 WIB)"
  {...register("waktu")}
  className="peer sr-only"
/>
```

---

### 🟢 BUG-06: Indikator Navbar Tidak Sinkron pada Seksi Reservasi

* **Deskripsi:** Saat user scroll ke seksi `#reservasi`, indikator aktif di navbar tetap menyorot *"Testimoni"* karena `reservasi` belum diikutsertakan dalam array scroll spy.
* **Solusi Kode:** Tambahkan `"reservasi"` ke dalam array target `useScrollSpy` di `src/components/layout/Navbar.tsx`.
