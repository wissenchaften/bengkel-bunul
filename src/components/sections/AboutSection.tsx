"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Wrench, Shield, Cpu, Disc } from "lucide-react";
import { smoothScrollTo } from "@/lib/scroll";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  StaggerContainer,
  staggerItemVariants,
} from "@/components/motion/StaggerContainer";
import { motion } from "framer-motion";

function AboutCardImage({
  src,
  alt,
  className = "object-cover",
  sizes = "(max-width: 1024px) 100vw, 33vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      unoptimized
      sizes={sizes}
      className={`${className} ${
        hasError ? "p-6 object-contain bg-surface-container-high opacity-80" : ""
      }`}
      onError={() => {
        setHasError(true);
        setImgSrc("/images/logo-bengkel-bunul.png");
      }}
    />
  );
}

export function AboutSection() {
  return (
    <section id="tentang-kami" className="w-full py-16 sm:py-24 bg-surface overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 font-label text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed px-3.5 py-1.5 rounded uppercase tracking-widest mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>MENGAPA MEMILIH KAMI</span>
            <Wrench className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-primary font-extrabold tracking-tight max-w-2xl">
            Transparansi Total di Setiap Putaran Baut & Diagnostik Mesin
          </h2>
        </ScrollReveal>

        {/* 3-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center">
          {/* Left Column: Workshop Image with Left Corner Accents */}
          <div className="order-1 lg:order-1 lg:col-span-4 relative flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Corner Frame Accents */}
              <div className="absolute -top-3 -left-3 w-12 h-12 sm:w-14 sm:h-14 border-t-2 border-l-2 border-[#1d1583] pointer-events-none z-10" />
              <div className="hidden lg:block absolute -bottom-3 -left-3 w-14 h-14 border-b-2 border-l-2 border-[#1d1583] pointer-events-none z-10" />

              <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[460px] rounded-xl overflow-hidden shadow-xl bg-surface-container">
                <AboutCardImage
                  src="/images/about/about-inspection.webp"
                  alt="Mekanik profesional sedang melakukan inspeksi balancing roda dan ban mobil"
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 380px, 380px"
                />
              </div>
            </div>
          </div>

          {/* Center Column: Narrative & 3 USP Cards (order-3 on mobile to stay below the image collage) */}
          <div className="order-3 lg:order-2 lg:col-span-4 flex flex-col items-start px-2 mt-2 lg:mt-0">
            <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6 mt-0">
              Berdiri di kawasan Bunul sejak 2016, Bengkel Mobil Bunul memadukan
              keahlian mekanik berpengalaman dengan teknologi scanner diagnostik
              OBD-2 presisi. Seluruh taksiran pengerjaan sparepart dan biaya
              jasa disepakati tertulis di awal sebelum baut pertama dibuka.
            </p>

            <StaggerContainer className="w-full space-y-4">
              {/* USP 1 */}
              <motion.div
                variants={staggerItemVariants}
                className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-border-light shadow-sm"
              >
                <div className="w-11 h-11 rounded-full border border-primary-fixed-dim bg-primary-fixed flex items-center justify-center text-primary-container shrink-0 mt-0.5 shadow-sm">
                  <Shield className="w-5 h-5 text-primary-container" />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-sm sm:text-base font-bold text-primary">
                    Proteksi Kendaraan & Part OEM
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                    Penggantian oli mesin berstandar OEM, filter orisinal, dan
                    pembersihan kerak carbon ruang bakar.
                  </p>
                </div>
              </motion.div>

              {/* USP 2 */}
              <motion.div
                variants={staggerItemVariants}
                className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-border-light shadow-sm"
              >
                <div className="w-11 h-11 rounded-full border border-primary-fixed-dim bg-primary-fixed flex items-center justify-center text-primary-container shrink-0 mt-0.5 shadow-sm">
                  <Cpu className="w-5 h-5 text-primary-container" />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-sm sm:text-base font-bold text-primary">
                    Diagnostik Mesin & Sensor OBD-2
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                    Uji scanner live data DTC OBD-2 komprehensif, kalibrasi
                    sistem injeksi, serta spooring 3D akurat.
                  </p>
                </div>
              </motion.div>

              {/* USP 3 */}
              <motion.div
                variants={staggerItemVariants}
                className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-border-light shadow-sm"
              >
                <div className="w-11 h-11 rounded-full border border-primary-fixed-dim bg-primary-fixed flex items-center justify-center text-primary-container shrink-0 mt-0.5 shadow-sm">
                  <Disc className="w-5 h-5 text-primary-container" />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-sm sm:text-base font-bold text-primary">
                    Sistem Rem & Kaki-kaki Andal
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                    Pemeriksaan kampas rem OEM, bubut piringan rotor cakram
                    presisi, dan peremajaan suspensi tanpa biaya gaib.
                  </p>
                </div>
              </motion.div>
            </StaggerContainer>

            <div className="mt-6 w-full">
              <Link
                href="#reservasi"
                onClick={(e) => smoothScrollTo("reservasi", e)}
                className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-white font-label text-sm font-bold px-7 py-3.5 rounded-xl transition-all duration-200 ease-industrial shadow-md group cursor-pointer w-full sm:w-auto text-center"
              >
                <span>KONSULTASI SEKARANG</span>
                <ArrowUpRight className="w-4 h-4 arrow-nudge shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right Column: Workshop Image Stack (order-2 on mobile, placed side-by-side with Left image) */}
          <div className="order-2 lg:order-3 lg:col-span-4 relative flex justify-center -mt-2 sm:-mt-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Right Corner Accents */}
              <div className="hidden lg:block absolute -top-3 -right-3 w-14 h-14 border-t-2 border-r-2 border-[#1d1583] pointer-events-none z-10" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 border-b-2 border-r-2 border-[#1d1583] pointer-events-none z-10" />

              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-col lg:gap-4">
                <div className="relative w-full h-[130px] sm:h-[160px] lg:h-[240px] rounded-xl overflow-hidden shadow-md bg-surface-container">
                  <AboutCardImage
                    src="/images/about/about-scanner.webp"
                    alt="Mekanik memeriksa mesin mobil menggunakan laptop scanner OBD-2"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 190px, 380px"
                  />
                </div>

                <div className="relative w-full h-[130px] sm:h-[160px] lg:h-[200px] rounded-xl overflow-hidden shadow-md bg-surface-container">
                  <AboutCardImage
                    src="/images/about/about-engine.webp"
                    alt="Pengecekan teknis komponen mesin kendaraan oleh mekanik bersertifikat"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 190px, 380px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
