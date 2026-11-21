"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, MessageSquare, Phone } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const emptySubscribe = () => () => {};

const NAV_ITEMS = [
  { id: "hero", label: "Beranda" },
  { id: "tentang-kami", label: "Tentang Kami" },
  { id: "layanan", label: "Layanan" },
  { id: "portofolio", label: "Portofolio" },
  { id: "testimoni", label: "Testimoni" },
  { id: "lokasi", label: "Lokasi" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const activeSection = useScrollSpy(
    NAV_ITEMS.map((item) => item.id),
    "-20% 0px -60% 0px"
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ease-industrial ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border-light py-2.5"
            : "bg-surface/85 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] py-3 sm:py-4"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <Link
            href="#hero"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-container rounded-lg p-1"
            aria-label="Bengkel Mobil Bunul Beranda"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
              <Image
                src="/images/logo-bengkel-bunul.png"
                alt="Logo Bengkel Mobil Bunul"
                fill
                className="object-contain transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-extrabold text-base sm:text-lg uppercase text-primary tracking-tight leading-none">
                Bengkel Bunul
              </span>
              <span className="font-label text-[10px] sm:text-[11px] uppercase tracking-wider text-accent-amber-deep font-bold mt-0.5">
                Spesialis Servis & Reparasi
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            role="navigation"
            aria-label="Navigasi Utama"
            className="hidden xl:flex items-center gap-1.5 lg:gap-2 bg-surface-container-low/80 p-1 rounded-full border border-border-light"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`transition-all duration-200 font-label text-xs sm:text-sm px-3.5 py-1.5 rounded-full ${
                    isActive
                      ? "bg-primary-container text-on-primary font-bold shadow-sm"
                      : "text-on-surface-variant hover:text-primary hover:bg-white/60 font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button & Mobile Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="#reservasi"
              className="hidden sm:inline-flex items-center justify-center bg-accent-amber-deep hover:bg-tertiary-container text-white font-label text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 ease-industrial hover:scale-[1.02] shadow-[0_4px_12px_rgba(249,150,50,0.35)] group"
            >
              <span>Reservasi Sekarang</span>
              <ArrowRight className="w-4 h-4 ml-1.5 inline-block arrow-nudge shrink-0" />
            </Link>

            {/* Mobile Hamburger Button (Min 44x44px Touch Target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-primary hover:bg-surface-container border border-border-light focus:outline-none focus:ring-2 focus:ring-primary-container flex items-center justify-center cursor-pointer transition-colors"
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Teleported to document.body via Portal to prevent backdrop-blur containment) */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="xl:hidden">
                {/* Full-Screen Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 cursor-pointer"
                  aria-hidden="true"
                />

                {/* Full-Height Slide-in Sheet Drawer */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  className="fixed top-0 right-0 bottom-0 w-[84vw] max-w-sm bg-white z-[60] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-border-light"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Menu Navigasi Mobile"
                >
                  <div>
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-border-light">
                      <div className="flex items-center gap-2">
                        <div className="relative w-7 h-7">
                          <Image
                            src="/images/logo-bengkel-bunul.png"
                            alt="Logo Bengkel Bunul"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-headline font-bold text-base text-primary uppercase">
                          Menu Navigasi
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                        }}
                        className="min-w-[40px] min-h-[40px] p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container flex items-center justify-center focus:outline-none cursor-pointer"
                        aria-label="Tutup menu"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="mt-6 flex flex-col space-y-2">
                      {NAV_ITEMS.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full px-4 py-3.5 rounded-xl font-label text-sm flex items-center justify-between transition-colors text-left cursor-pointer ${
                              isActive
                                ? "bg-primary-container text-white font-bold"
                                : "text-on-surface hover:bg-surface-container font-medium"
                            }`}
                          >
                            <span>{item.label}</span>
                            <ArrowRight className="w-4 h-4 opacity-70 shrink-0" />
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="pt-6 border-t border-border-light space-y-3">
                    <button
                      type="button"
                      onClick={() => handleNavClick("reservasi")}
                      className="w-full flex items-center justify-center gap-2 bg-accent-amber-deep text-white font-label text-sm font-bold py-3.5 px-4 rounded-xl shadow-md active:scale-95 transition-transform cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Reservasi Jadwal Servis</span>
                    </button>

                    <a
                      href="tel:085100207777"
                      className="w-full flex items-center justify-center gap-2 bg-surface-container text-on-surface font-label text-sm font-semibold py-3 px-4 rounded-xl border border-border-light hover:border-whatsapp-green transition-colors"
                    >
                      <Phone className="w-4 h-4 text-whatsapp-green" />
                      <span>Telepon: (0851) 0020-7777</span>
                    </a>

                    <p className="text-center text-[11px] text-outline font-body pt-1">
                      Buka Setiap Hari: 08:00 - 17:00 WIB
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
