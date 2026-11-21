"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Star,
} from "lucide-react";
import { motionTokens } from "@/lib/motion";
import { smoothScrollTo } from "@/lib/scroll";

export function HeroSection() {
  const [heroImgSrc, setHeroImgSrc] = useState("/images/hero/hero-workshop.webp");
  const [hasError, setHasError] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-surface-container-low pt-24 pb-16 lg:pt-32 lg:pb-24"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pr-6">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex items-center"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border-medium shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-amber-deep" />
                <span className="font-label text-xs uppercase tracking-wider text-on-surface font-extrabold">
                  Bengkel Mobil Spesialis Resmi
                </span>
              </div>
            </motion.div>

            {/* Headline & Subtitle */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                  ease: motionTokens.ease.industrial,
                }}
                className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-on-surface tracking-tight leading-[1.15]"
              >
                Perbaikan dan Perawatan Mobil{" "}
                <span className="text-primary-container font-extrabold block sm:inline">
                  Standar Presisi Pabrikan
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className="font-body text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed"
              >
                Didukung mekanik tersertifikasi dan scanner diagnostik OBD-2 presisi. Kami memeriksa mesin, transmisi, serta kaki-kaki mobil dengan estimasi biaya tertulis di awal sebelum baut pertama dibuka.
              </motion.p>
            </div>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="#reservasi"
                onClick={(e) => smoothScrollTo("reservasi", e)}
                className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-white font-label text-sm font-bold px-6 py-3.5 rounded-xl transition-all duration-200 ease-industrial hover:scale-[1.01] shadow-md group cursor-pointer"
              >
                <span>Reservasi Jadwal Servis</span>
                <ArrowRight className="w-4 h-4 arrow-nudge shrink-0" />
              </Link>

              <Link
                href="#layanan"
                onClick={(e) => smoothScrollTo("layanan", e)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-surface-container text-primary font-label text-sm font-bold px-5 py-3.5 rounded-xl border border-border-medium hover:border-primary transition-all duration-200 ease-industrial group cursor-pointer"
              >
                <span>Lihat Katalog Layanan</span>
                <ArrowRight className="w-4 h-4 arrow-nudge shrink-0" />
              </Link>

              <a
                href="tel:085100207777"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white hover:bg-surface-container text-on-surface font-label text-sm font-semibold transition-colors border border-border-light hover:border-whatsapp-green"
              >
                <Phone className="w-4 h-4 text-whatsapp-green shrink-0" />
                <span>(0851) 0020-7777</span>
              </a>
            </motion.div>

            {/* Bullet Proof Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="pt-4 border-t border-border-light flex flex-wrap items-center gap-y-2 gap-x-4 text-on-surface-variant font-body text-xs sm:text-sm"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                <span>8 Teknisi Bersertifikasi</span>
              </div>
              <span className="text-outline hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-status-success shrink-0" />
                <span>1.000 KM / 30 Hari Garansi Resmi</span>
              </div>
              <span className="text-outline hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-status-success shrink-0" />
                <span>Inspeksi Diagnostik OBD-2 Digital</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual & Floating Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: motionTokens.ease.industrial,
            }}
            className="lg:col-span-5 relative w-full h-[360px] sm:h-[440px] lg:h-[500px]"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border-light shadow-xl bg-surface-container group">
              <Image
                src={heroImgSrc}
                alt="Mekanik profesional sedang memeriksa mesin mobil di workshop modern Bengkel Mobil Bunul"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 45vw"
                className={`object-cover object-center transition-transform duration-500 ease-industrial group-hover:scale-105 ${
                  hasError ? "p-8 object-contain bg-surface-container-high opacity-85" : ""
                }`}
                priority
                onError={() => {
                  setHasError(true);
                  setHeroImgSrc("/images/logo-bengkel-bunul.png");
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating Status Card */}
              <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-border-light shadow-lg flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label text-[11px] font-bold text-outline uppercase tracking-wider">
                    Standar Servis Resmi
                  </span>
                  <span className="font-headline text-sm font-bold text-primary mt-0.5">
                    Bengkel Mobil Bunul
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 font-label text-xs font-bold bg-status-success/15 text-status-success px-3 py-1.5 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-status-pulse" />
                  <span>Buka 08:00 - 17:00 WIB</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Stats Cards Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 sm:mt-16 p-4 sm:p-6 lg:p-8 rounded-2xl bg-white border border-border-light shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          <div className="flex flex-col items-center text-center p-2">
            <div className="font-headline text-3xl sm:text-4xl text-primary font-extrabold flex items-center">
              <span>10</span>
              <span className="text-accent-amber-deep">+</span>
            </div>
            <span className="font-label text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
              Tahun Pengalaman
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-2">
            <div className="font-headline text-3xl sm:text-4xl text-primary font-extrabold flex items-center gap-1">
              <span>4.9</span>
              <span className="text-accent-amber-deep text-xl sm:text-2xl font-bold">/ 5.0</span>
            </div>
            <span className="font-label text-xs sm:text-sm text-on-surface-variant font-medium mt-1 flex items-center gap-1 justify-center">
              <Star className="w-3.5 h-3.5 fill-accent-amber-deep text-accent-amber-deep" />
              <span>Google Maps Rating</span>
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-2">
            <div className="font-headline text-3xl sm:text-4xl text-primary font-extrabold flex items-center">
              <span>100</span>
              <span className="text-accent-amber-deep">%</span>
            </div>
            <span className="font-label text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
              Suku Cadang Original
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-2">
            <div className="font-headline text-2xl sm:text-3xl text-status-success font-extrabold flex items-center gap-1.5">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
              <span>Resmi</span>
            </div>
            <span className="font-label text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
              Garansi Servis Tertulis
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
