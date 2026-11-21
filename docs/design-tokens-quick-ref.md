# DESIGN TOKEN QUICK REFERENCE

Ringkasan cepat token dari `DESIGN.md` dan Stitch project untuk implementasi Tailwind.

---

## Warna

### Primary (Brand Indigo)
| Token | Hex | Tailwind Class | Penggunaan |
|---|---|---|---|
| `primary` | `#0a005d` | `text-primary`, `bg-primary` | Heading, link aktif |
| `primary-container` | `#1d1583` | `bg-primary-container` | CTA fill, focus border |
| `on-primary` | `#ffffff` | `text-on-primary` | Teks di atas primary |
| `primary-fixed` | `#e2dfff` | `bg-primary-fixed` | Ikon container bg |

### Secondary (Chassis Midnight)
| Token | Hex | Tailwind Class | Penggunaan |
|---|---|---|---|
| `secondary` | `#1E1B4B` | `bg-secondary` | Dark section bg, footer |
| `border-dark` | `#312E81` | `border-border-dark` | Border di dark section |

### Tertiary (Amber Accent)
| Token | Hex | Tailwind Class | Penggunaan |
|---|---|---|---|
| `accent-amber-deep` | `#f99632` | `text-accent-amber-deep` | CTA aksen, badge, rating |
| `tertiary-accent` | `#FD9935` | — | CTA terang |
| `whatsapp-green` | `#25D366` | `bg-whatsapp-green` | Tombol WhatsApp |

### Semantic
| Token | Hex | Tailwind Class | Penggunaan |
|---|---|---|---|
| `status-success` | `#16a34a` | `text-status-success` | Checkmark, status buka |
| `error` | `#ba1a1a` | `text-error` | Pesan error form |

### Surface
| Token | Hex | Tailwind Class | Penggunaan |
|---|---|---|---|
| `surface` / `background` | `#f8f9fc` | `bg-surface` | Background utama |
| `surface-container-lowest` | `#ffffff` | `bg-surface-container-lowest` | Kartu, form |
| `surface-container-low` | `#f2f4f6` | `bg-surface-container-low` | Seksi alternating |
| `on-surface` | `#191c1e` | `text-on-surface` | Body text |
| `on-surface-variant` | `#464552` | `text-on-surface-variant` | Teks sekunder |
| `border-light` | `#E2E8F0` | `border-border-light` | Border kartu |
| `border-medium` | `#CBD5E1` | `border-border-medium` | Border input |

---

## Tipografi

| Token | Font | Size | Weight | Line Height | Penggunaan |
|---|---|---|---|---|---|
| `display-lg` | Plus Jakarta Sans | 56px (mobile: 36px) | 800 | 64px | Hero headline |
| `headline-xl` | Plus Jakarta Sans | 40px (mobile: 28px) | 800 | 48px | Section heading |
| `headline-lg` | Plus Jakarta Sans | 32px (mobile: 24px) | 700 | 40px | Sub-section |
| `headline-sm` | Plus Jakarta Sans | 20px | 600 | 28px | Card title |
| `title-md` | Plus Jakarta Sans | 18px | 600 | 26px | Subtitle, nav |
| `body-lg` | Inter | 18px | 400 | 28px | Sub-headline |
| `body-md` | Inter | 15px | 400 | 24px | Paragraf |
| `body-sm` | Inter | 13px | 400 | 20px | Caption, helper |
| `label-md` | Public Sans | 14px | 600 | 20px | Tombol, label |
| `label-sm` | Public Sans | 12px | 600 | 16px | Small label |
| `technical-badge` | Public Sans | 11px | 800 | 16px | Badge uppercase |

---

## Spacing

| Token | Nilai | Penggunaan |
|---|---|---|
| `space-xs` | 0.25rem (4px) | Micro gap |
| `space-sm` | 0.5rem (8px) | Small gap |
| `space-md` | 1rem (16px) | Default gap |
| `space-lg` | 1.5rem (24px) | Section inner |
| `space-xl` | 2.5rem (40px) | Section padding |
| `gutter` | 1.5rem | Grid gutter desktop |
| `gutter-mobile` | 1rem | Grid gutter mobile |
| `margin` | 2rem | Container margin |
| `section-gap` | 5rem (mobile: 3rem) | Antar seksi |

---

## Motion

| Property | Value | Penggunaan |
|---|---|---|
| Industrial ease | `cubic-bezier(0.16, 1, 0.3, 1)` | Default transisi |
| Snap ease | `cubic-bezier(0.4, 0, 0.2, 1)` | Tombol, switch |
| Smooth ease | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Carousel |
| Duration instant | 100ms | Micro feedback |
| Duration fast | 200ms | Hover, dropdown |
| Duration normal | 350ms | Card elevation |
| Duration deliberate | 500ms | Section entrance |
| Spring tight | stiffness: 400, damping: 30 | Sheet drawer |
| Stagger delay | 100ms | Card children |
| Carousel interval | 5000ms (PRD) / 4500ms (Stitch) | Auto-slide testimoni |
