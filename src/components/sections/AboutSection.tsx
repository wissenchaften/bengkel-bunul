"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Wrench, Shield, Cpu, Disc } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerContainer, staggerItemVariants } from "@/components/motion/StaggerContainer";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="tentang-kami" className="w-full py-16 sm:py-24 bg-surface">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Workshop Image with Left Corner Accents */}
          <div className="lg:col-span-4 relative flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Corner Frame Accents */}
              <div className="absolute -top-3 -left-3 w-14 h-14 border-t-2 border-l-2 border-[#1d1583] pointer-events-none z-10" />
              <div className="absolute -bottom-3 -left-3 w-14 h-14 border-b-2 border-l-2 border-[#1d1583] pointer-events-none z-10" />

              <div className="relative w-full h-[400px] sm:h-[460px] rounded-xl overflow-hidden shadow-xl bg-surface-container">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv0qFnxCD9ha-lXHPGokQkS2orqWKmh74p1t7kbbX776pWJNfnPPn3s47G6xFUEk_xmd81GQ7OOdPU-V6Xy2MRSzeJbQqL_znUO4cyK-C8wq-k_WBgI2xdq_Iu9kn2blWGnjOAQbFg1t-zowmcaMxkywFe-2F8b-aT7kkYmSwXMfaEEmcPsOL9rbsfjxOeJ4GPfGFTN0hLT2RdAc3t6zaW7TJZ0snLdYTYSYTNOiEy"
                  alt="Mekanik profesional sedang melakukan inspeksi balancing roda dan ban mobil"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Center Column: Narrative & 3 USP Cards */}
          <div className="lg:col-span-4 flex flex-col items-start px-2">
            <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6 mt-0">
              Berdiri di kawasan Bunul sejak 2008, Bengkel Mobil Bunul memadukan keahlian mekanik berpengalaman dengan teknologi scanner diagnostik OBD-2 presisi. Seluruh taksiran pengerjaan sparepart dan biaya jasa disepakati tertulis di awal sebelum baut pertama dibuka.
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
                    Penggantian oli mesin berstandar OEM, filter orisinal, dan pembersihan kerak carbon ruang bakar.
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
                    Uji scanner live data DTC OBD-2 komprehensif, kalibrasi sistem injeksi, serta spooring 3D akurat.
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
                    Pemeriksaan kampas rem OEM, bubut piringan rotor cakram presisi, dan peremajaan suspensi tanpa biaya gaib.
                  </p>
                </div>
              </motion.div>
            </StaggerContainer>

            <div className="mt-6 w-full">
              <Link
                href="#reservasi"
                className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-white font-label text-sm font-bold px-7 py-3.5 rounded-xl transition-all duration-200 ease-industrial shadow-md group"
              >
                <span>KONSULTASI SEKARANG</span>
                <ArrowUpRight className="w-4 h-4 arrow-nudge shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right Column: Workshop Image Stack with Right Corner Accents */}
          <div className="lg:col-span-4 relative flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] flex flex-col gap-4">
              {/* Right Corner Accents */}
              <div className="absolute -top-3 -right-3 w-14 h-14 border-t-2 border-r-2 border-[#1d1583] pointer-events-none z-10" />
              <div className="absolute -bottom-3 -right-3 w-14 h-14 border-b-2 border-r-2 border-[#1d1583] pointer-events-none z-10" />

              <div className="relative w-full h-[220px] sm:h-[240px] rounded-xl overflow-hidden shadow-md bg-surface-container">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnCV-heNhgSA2bAaOtELsBcXSkSoSOG_VwyLXPC_lCqPeK8pZ-fVXv2WPcxV9YeRFJ9Cfaec0Tk5g8aMJithcKUl6P2wzXjx-l_Js4QIhMObckgM7b_XRvcGnIVkkZWxILDrcJnNK-XmB4YDs0jvmy4oPrlX2EI5qrem-3s-uhCrmOjeF-Ro2dYTpua6D9QcwuLiBZpAk5LPaUAyoU2iaWO_k3nqToDwuU69hHdPme"
                  alt="Mekanik memeriksa mesin mobil menggunakan laptop scanner OBD-2"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative w-full h-[180px] sm:h-[200px] rounded-xl overflow-hidden shadow-md bg-surface-container">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe4ENqhx-sSZHcHts_0hyY23CiqmWQolBeFlgS-B7p8AWPzxqSp2seR0cpxUlDGC7LYm1J3bFZil0sDLRnsUlEm3YqhB62x3e7REbhqpumg5K1hhb1LPZBzVVR-_ntZ1MkydvaTltcqGBrO6YPZWgB2McNkq1hlH2CpqEOTbR79thEmQongJqEStSS71ZK-8QDkweI6cgRKF71huhtsX_5tofi6xo8o_BmibZTsElJ"
                  alt="Pengecekan teknis komponen mesin kendaraan oleh mekanik bersertifikat"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
