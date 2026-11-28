"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Star,
  MapPin,
  Clock,
} from "lucide-react";
import { smoothScrollTo } from "@/lib/scroll";

interface WorkshopStatus {
  isOpen: boolean;
  label: string;
  schedule: string;
}

const OPEN_HOUR = 8;
const CLOSE_HOUR = 17;

/**
 * Computes live workshop operational status in Asia/Jakarta (WIB) time.
 * Open every day 08:00 - 17:00 WIB.
 */
function getWorkshopStatusWIB(date: Date): WorkshopStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const totalMinutes = hour * 60 + minute;

  const isOpen = totalMinutes >= OPEN_HOUR * 60 && totalMinutes < CLOSE_HOUR * 60;

  if (isOpen) {
    return {
      isOpen: true,
      label: "Buka Sekarang",
      schedule: "08:00 - 17:00 WIB",
    };
  }

  return {
    isOpen: false,
    label: "Sedang Tutup",
    schedule:
      totalMinutes < OPEN_HOUR * 60
        ? "Buka Hari Ini 08:00 WIB"
        : "Buka Besok 08:00 WIB",
  };
}

export function HeroSection() {
  const [heroImgSrc, setHeroImgSrc] = useState("/images/hero/hero-workshop.webp");
  const [hasError, setHasError] = useState(false);
  const [status, setStatus] = useState<WorkshopStatus | null>(null);

  useEffect(() => {
    const updateStatus = () => {
      setStatus(getWorkshopStatusWIB(new Date()));
    };

    updateStatus();
    const intervalId = window.setInterval(updateStatus, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-surface-container-low pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-16"
    >
      {/* Subtle Architectural Depth & Engineering Grid Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-24 right-0 h-[420px] w-[420px] sm:h-[560px] sm:w-[560px] rounded-full opacity-55 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(29,21,131,0.10) 0%, rgba(249,150,50,0.08) 45%, transparent 72%)",
          }}
        />
        <div
          className="hidden lg:block absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(29,21,131,0.14) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Value Prop & Thumb-Friendly CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 lg:pr-4">
            {/* Eyebrow Badge with Local City Anchor */}
            <div className="flex items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border-medium shadow-xs">
                <MapPin
                  className="w-3.5 h-3.5 text-accent-amber-deep shrink-0"
                  aria-hidden="true"
                />
                <span className="font-label text-[11px] sm:text-xs uppercase tracking-wider text-on-surface font-extrabold">
                  Bengkel Mobil Spesialis • Kota Malang
                </span>
              </div>
            </div>

            {/* Headline & Compact Scannable Subtitle */}
            <div className="space-y-2.5 sm:space-y-3.5">
              <h1 className="font-headline text-[26px] sm:text-4xl md:text-[44px] lg:text-[52px] font-extrabold text-on-surface tracking-tight leading-[1.15] text-balance">
                Perbaikan dan Perawatan Mobil{" "}
                <span className="text-primary-container font-extrabold sm:inline">
                  Standar Presisi Pabrikan
                </span>
              </h1>

              <p className="font-body text-sm sm:text-base lg:text-[17px] text-on-surface-variant max-w-xl leading-relaxed text-pretty">
                Mekanik tersertifikasi dan scanner diagnostik OBD-2 untuk mesin,
                transmisi, hingga kaki-kaki. Estimasi biaya tertulis di awal
                sebelum baut pertama dibuka.
              </p>
            </div>

            {/* CTA Group: Full-width Primary + 2-Column Secondary/Phone on Mobile */}
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3 pt-1">
              <Link
                href="#reservasi"
                onClick={(e) => smoothScrollTo("reservasi", e)}
                className="col-span-2 sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-white font-label text-sm font-bold px-5 sm:px-6 py-3 rounded-xl transition-all duration-200 ease-industrial hover:scale-[1.01] shadow-md group cursor-pointer"
              >
                <span>Reservasi Jadwal Servis</span>
                <ArrowRight
                  className="w-4 h-4 arrow-nudge shrink-0"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="#layanan"
                onClick={(e) => smoothScrollTo("layanan", e)}
                className="col-span-1 sm:w-auto min-h-[44px] min-w-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-white hover:bg-surface-container text-primary font-label text-xs sm:text-sm font-bold px-2.5 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-border-medium hover:border-primary transition-all duration-200 ease-industrial group cursor-pointer whitespace-nowrap"
              >
                <span>Lihat Layanan</span>
                <ArrowRight
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 arrow-nudge shrink-0"
                  aria-hidden="true"
                />
              </Link>

              <a
                href="tel:085100207777"
                aria-label="Telepon Bengkel Mobil Bunul di 0851-0020-7777"
                className="col-span-1 sm:w-auto min-h-[44px] min-w-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-surface-container text-on-surface font-label text-xs sm:text-sm font-semibold transition-colors border border-border-medium sm:border-border-light hover:border-whatsapp-green whitespace-nowrap"
              >
                <Phone
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-whatsapp-green shrink-0"
                  aria-hidden="true"
                />
                <span className="sm:hidden">0851-0020-7777</span>
                <span className="hidden sm:inline">(0851) 0020-7777</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <ul className="pt-3 sm:pt-4 border-t border-border-light flex flex-wrap items-center gap-y-1.5 gap-x-3 sm:gap-x-4 text-on-surface-variant font-body text-xs sm:text-sm">
              <li className="flex items-center gap-1.5">
                <CheckCircle2
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-status-success shrink-0"
                  aria-hidden="true"
                />
                <span>8 Teknisi Bersertifikasi</span>
              </li>
              <li className="text-outline hidden sm:inline" aria-hidden="true">
                •
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-status-success shrink-0"
                  aria-hidden="true"
                />
                <span>Estimasi Transparan di Awal</span>
              </li>
              <li className="text-outline hidden sm:inline" aria-hidden="true">
                •
              </li>
              <li className="flex items-center gap-1.5">
                <Cpu
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-status-success shrink-0"
                  aria-hidden="true"
                />
                <span>Diagnostik OBD-2 Digital</span>
              </li>
            </ul>
          </div>

          {/* Right Column: LCP Hero Workshop Visual & Live WIB Status Card */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[460px] xl:h-[480px] rounded-2xl overflow-hidden border border-border-light shadow-xl bg-surface-container group">
              <Image
                src={heroImgSrc}
                alt="Mekanik profesional sedang memeriksa mesin mobil di workshop modern Bengkel Mobil Bunul"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 44vw"
                className={`object-cover object-[35%_center] transition-transform duration-500 ease-industrial group-hover:scale-105 ${hasError
                    ? "p-8 object-contain bg-surface-container-high opacity-85"
                    : ""
                  }`}
                onError={() => {
                  setHasError(true);
                  setHeroImgSrc("/images/logo-bengkel-bunul.png");
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent pointer-events-none"
              />

              {/* Responsive Floating Status Card */}
              <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-4 sm:inset-x-4 bg-white/95 backdrop-blur-md p-2.5 sm:p-4 rounded-xl border border-border-light shadow-lg flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="font-headline text-xs sm:text-sm font-bold text-primary leading-tight truncate">
                    Bengkel Mobil Bunul
                  </span>
                  <span className="font-body text-[11px] sm:text-xs font-medium text-on-surface-variant mt-0.5 truncate">
                    Bunulrejo, Kota Malang
                  </span>
                </div>

                {status === null ? (
                  <div className="inline-flex items-center gap-1.5 font-label text-[11px] sm:text-xs font-bold bg-surface-container text-on-surface-variant px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shrink-0">
                    <Clock className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                    <span>Setiap Hari • 08:00 - 17:00 WIB</span>
                  </div>
                ) : status.isOpen ? (
                  <div
                    className="inline-flex items-center gap-1.5 sm:gap-2 font-label text-[11px] sm:text-xs font-bold bg-status-success/15 text-status-success px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shrink-0"
                    aria-live="polite"
                  >
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-status-success animate-status-pulse shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      {status.label} • {status.schedule}
                    </span>
                  </div>
                ) : (
                  <div
                    className="inline-flex items-center gap-1.5 sm:gap-2 font-label text-[11px] sm:text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shrink-0"
                    aria-live="polite"
                  >
                    <Clock className="w-3.5 h-3.5 text-on-tertiary-container shrink-0" aria-hidden="true" />
                    <span>
                      {status.label} • {status.schedule}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards Bar */}
        <div className="mt-8 sm:mt-10 lg:mt-12 p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-border-light shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:divide-x md:divide-border-light">
          <div className="flex flex-col items-center text-center p-1 sm:p-2">
            <div className="font-headline text-2xl sm:text-3xl lg:text-[34px] text-primary font-extrabold flex items-center leading-none">
              <span>10</span>
              <span className="text-accent-amber-deep">+</span>
            </div>
            <span className="font-label text-xs sm:text-sm text-on-surface-variant font-medium mt-1.5">
              Tahun Pengalaman
            </span>
          </div>

          <Link
            href="#testimoni"
            onClick={(e) => smoothScrollTo("testimoni", e)}
            className="flex flex-col items-center text-center p-1 sm:p-2 rounded-xl hover:bg-surface-container-low/70 transition-colors cursor-pointer group"
          >
            <div className="font-headline text-2xl sm:text-3xl lg:text-[34px] text-primary font-extrabold flex items-center gap-1 leading-none">
              <span>4.9</span>
              <span className="text-accent-amber-deep text-lg sm:text-xl font-bold">
                / 5.0
              </span>
            </div>
            <span className="font-label text-xs sm:text-sm text-on-surface-variant group-hover:text-primary font-medium mt-1.5 flex items-center gap-1 justify-center transition-colors">
              <Star
                className="w-3.5 h-3.5 fill-accent-amber-deep text-accent-amber-deep shrink-0"
                aria-hidden="true"
              />
              <span>500+ Ulasan Google</span>
            </span>
          </Link>

          <div className="flex flex-col items-center text-center p-1 sm:p-2">
            <div className="font-headline text-2xl sm:text-3xl lg:text-[34px] text-primary font-extrabold flex items-center leading-none">
              <span>100</span>
              <span className="text-accent-amber-deep">%</span>
            </div>
            <span className="font-label text-xs sm:text-sm text-on-surface-variant font-medium mt-1.5">
              Suku Cadang Original
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-1 sm:p-2">
            <div className="font-headline text-2xl sm:text-3xl lg:text-[34px] text-primary font-extrabold flex items-center gap-1.5 leading-none">
              <ShieldCheck
                className="w-5 h-5 sm:w-6 sm:h-6 text-status-success shrink-0"
                aria-hidden="true"
              />
              <span>30 Hari</span>
            </div>
            <span className="font-label text-xs sm:text-sm text-on-surface-variant font-medium mt-1.5">
              Garansi Servis / 1.000 KM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
