"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import testimonialsData from "@/data/testimonials.json";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const GOOGLE_MAPS_REVIEWS_URL =
  "https://maps.google.com/?q=Bengkel+Mobil+Bunul+Malang";

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const settledIndexRef = useRef(0);
  const pendingTargetRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const totalSlides = testimonialsData.length;

  const getNearestSlideIndex = useCallback((track: HTMLDivElement): number => {
    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length === 0) return 0;

    const currentScroll = track.scrollLeft;
    let nearestIdx = 0;
    let minDistance = Infinity;

    for (let i = 0; i < slides.length; i++) {
      const distance = Math.abs(slides[i].offsetLeft - currentScroll);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIdx = i;
      }
    }

    return nearestIdx;
  }, []);

  const scrollToSlide = useCallback(
    (targetIndex: number, announceMove = true) => {
      const track = trackRef.current;
      if (!track) return;

      const slides = Array.from(track.children) as HTMLElement[];
      if (slides.length === 0) return;

      const normalizedIndex =
        ((targetIndex % slides.length) + slides.length) % slides.length;
      const targetSlide = slides[normalizedIndex];
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const targetLeft = Math.min(targetSlide.offsetLeft, maxScroll);

      pendingTargetRef.current = normalizedIndex;
      activeIndexRef.current = normalizedIndex;
      setActiveIndex(normalizedIndex);

      const behavior: ScrollBehavior = shouldReduceMotion ? "auto" : "smooth";
      track.scrollTo({ left: targetLeft, behavior });

      if (behavior === "auto" || Math.abs(track.scrollLeft - targetLeft) < 2) {
        pendingTargetRef.current = null;
        if (announceMove && settledIndexRef.current !== normalizedIndex) {
          settledIndexRef.current = normalizedIndex;
          setAnnouncement(
            `Menampilkan ulasan ${normalizedIndex + 1} dari ${slides.length}`
          );
        }
      }
    },
    [shouldReduceMotion]
  );

  // Sync active marker & polite status announcement from track scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleSettled = () => {
      const nearest =
        pendingTargetRef.current ?? getNearestSlideIndex(track);
      pendingTargetRef.current = null;

      if (activeIndexRef.current !== nearest) {
        activeIndexRef.current = nearest;
        setActiveIndex(nearest);
      }

      if (settledIndexRef.current !== nearest) {
        settledIndexRef.current = nearest;
        setAnnouncement(
          `Menampilkan ulasan ${nearest + 1} dari ${totalSlides}`
        );
      }
    };

    const handleScroll = () => {
      if (pendingTargetRef.current !== null) {
        if (!("onscrollend" in window)) {
          if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
          settleTimerRef.current = setTimeout(handleSettled, 150);
        }
        return;
      }

      if (rafIdRef.current !== null) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        const nearest = getNearestSlideIndex(track);
        if (activeIndexRef.current !== nearest) {
          activeIndexRef.current = nearest;
          setActiveIndex(nearest);
        }
      });

      if (!("onscrollend" in window)) {
        if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
        settleTimerRef.current = setTimeout(handleSettled, 150);
      }
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    if ("onscrollend" in window) {
      track.addEventListener("scrollend", handleSettled);
    }

    return () => {
      track.removeEventListener("scroll", handleScroll);
      if ("onscrollend" in window) {
        track.removeEventListener("scrollend", handleSettled);
      }
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
      }
    };
  }, [getNearestSlideIndex, totalSlides]);

  // Auto-slide every 5000ms, pause on hover / focus / touch or reduced motion preference
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const interval = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;

      const current = pendingTargetRef.current ?? activeIndexRef.current;
      const isAtEnd = track.scrollLeft >= maxScroll - 10;
      const nextIndex = isAtEnd ? 0 : (current + 1) % totalSlides;

      scrollToSlide(nextIndex, false);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion, scrollToSlide, totalSlides]);

  const handleManualScroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    const current = pendingTargetRef.current ?? activeIndexRef.current;

    if (direction === "right") {
      const isAtEnd = track.scrollLeft >= maxScroll - 10;
      scrollToSlide(isAtEnd ? 0 : current + 1);
      return;
    }

    const isAtStart = track.scrollLeft <= 10;
    scrollToSlide(isAtStart ? totalSlides - 1 : current - 1);
  };

  return (
    <section
      id="testimoni"
      aria-roledescription="carousel"
      aria-label="Ulasan pelanggan Bengkel Mobil Bunul"
      className="w-full py-16 sm:py-24 bg-surface-container-low"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4 text-center md:text-left">
          <div className="flex-1 max-w-2xl mx-auto md:mx-0">
            <span className="inline-flex items-center gap-1.5 font-label text-xs font-bold bg-status-success/15 text-status-success px-3 py-1 rounded tracking-wider uppercase mb-2.5">
              <Star
                className="w-3.5 h-3.5 fill-status-success text-status-success"
                aria-hidden="true"
              />
              <span>RATING GOOGLE MAPS 4.9/5.0</span>
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-primary font-extrabold tracking-tight">
              Kepercayaan Kustomer Adalah Bukti Kualitas Kami
            </h2>
            <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
              Ulasan otentik dari para pemilik kendaraan yang mengandalkan
              keandalan servis di Bengkel Mobil Bunul.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2.5 self-center md:self-end shrink-0">
            <button
              type="button"
              onClick={() => handleManualScroll("left")}
              className="w-11 h-11 rounded-full bg-white border border-border-medium flex items-center justify-center text-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 cursor-pointer shadow-sm touch-manipulation"
              aria-label="Testimoni sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleManualScroll("right")}
              className="w-11 h-11 rounded-full bg-white border border-border-medium flex items-center justify-center text-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 cursor-pointer shadow-sm touch-manipulation"
              aria-label="Testimoni selanjutnya"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={trackRef}
          tabIndex={0}
          role="group"
          aria-label="Daftar ulasan pelanggan"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="w-full flex gap-5 sm:gap-6 overflow-x-auto overflow-y-hidden py-3 snap-x snap-mandatory overscroll-x-contain touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {testimonialsData.map((testi, idx) => (
            <ScrollReveal
              key={testi.id}
              delay={idx < 3 ? idx * 0.08 : 0.08}
              className="w-[85vw] sm:w-[340px] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start bg-white p-6 rounded-xl border border-border-light shadow-[0px_4px_12px_rgba(30,27,75,0.04)] flex flex-col justify-between hover-industrial-card"
            >
              <div
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} dari ${totalSlides}`}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Row: Star Ratings & Google Maps Source Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className="flex items-center gap-1 text-accent-amber-deep"
                      aria-label={`Rating ${testi.rating} dari 5 bintang`}
                    >
                      {[...Array(testi.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-accent-amber-deep text-accent-amber-deep"
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 font-label text-[11px] font-semibold text-on-surface-variant bg-surface-container-low px-2.5 py-0.5 rounded-full border border-border-light shrink-0">
                      <MapPin
                        className="w-3 h-3 text-status-success"
                        aria-hidden="true"
                      />
                      <span>Google Maps</span>
                    </span>
                  </div>

                  {/* Review Text */}
                  <div className="relative mb-6">
                    <Quote
                      className="w-6 h-6 text-primary-fixed-dim/70 absolute -top-1 -left-1 -z-0 opacity-40"
                      aria-hidden="true"
                    />
                    <p className="font-body text-sm text-on-surface leading-relaxed italic relative z-10 pl-2">
                      &ldquo;{testi.review}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Author & Context */}
                <div className="pt-3.5 border-t border-border-light flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${testi.avatarBg} ${testi.textColor} font-headline flex items-center justify-center font-bold text-sm shrink-0`}
                    aria-hidden="true"
                  >
                    {testi.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-headline text-sm font-bold text-primary leading-snug truncate">
                      {testi.name}
                    </div>
                    <div className="font-body text-xs text-on-surface-variant truncate">
                      {testi.context} · {testi.date}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Polite screen-reader slide status */}
        <p className="sr-only" role="status" aria-live="polite">
          {announcement}
        </p>

        {/* Footer Controls: Pagination Dots & Google Maps CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav
            aria-label="Pilih ulasan pelanggan"
            className="flex items-center gap-2"
          >
            {testimonialsData.map((testi, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={testi.id}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Ulasan ${idx + 1} dari ${totalSlides}: ${testi.name}`}
                  className="min-w-6 min-h-6 p-1.5 flex items-center justify-center rounded-full cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? "w-6 bg-primary"
                        : "w-2 bg-border-medium hover:bg-primary/50"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <a
            href={GOOGLE_MAPS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-2 inline-flex items-center gap-1.5 font-label text-xs sm:text-sm font-bold text-primary hover:text-primary-container transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          >
            <span>Lihat Semua Ulasan di Google Maps</span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
