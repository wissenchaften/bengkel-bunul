"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Zap,
  Disc,
  Wrench,
  Wind,
  Crosshair,
  Cog,
  Thermometer,
  ClipboardCheck,
  Hammer,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import servicesData from "@/data/services.json";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { smoothScrollTo } from "@/lib/scroll";

function subscribeCardsPerPage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mqLg = window.matchMedia("(min-width: 1024px)");
  const mqSm = window.matchMedia("(min-width: 640px)");
  mqLg.addEventListener("change", callback);
  mqSm.addEventListener("change", callback);
  return () => {
    mqLg.removeEventListener("change", callback);
    mqSm.removeEventListener("change", callback);
  };
}

function getCardsPerPageSnapshot(): number {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function getServiceIcon(iconName: string) {
  switch (iconName) {
    case "BatteryCharging":
      return <BatteryCharging className="w-6 h-6 text-white" />;
    case "Zap":
      return <Zap className="w-6 h-6 text-white" />;
    case "Disc":
      return <Disc className="w-6 h-6 text-white" />;
    case "Wrench":
      return <Wrench className="w-6 h-6 text-white" />;
    case "Wind":
      return <Wind className="w-6 h-6 text-white" />;
    case "Crosshair":
      return <Crosshair className="w-6 h-6 text-white" />;
    case "Cog":
      return <Cog className="w-6 h-6 text-white" />;
    case "Thermometer":
      return <Thermometer className="w-6 h-6 text-white" />;
    case "ClipboardCheck":
      return <ClipboardCheck className="w-6 h-6 text-white" />;
    case "Hammer":
      return <Hammer className="w-6 h-6 text-white" />;
    default:
      return <Wrench className="w-6 h-6 text-white" />;
  }
}

function ServiceCardImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      unoptimized
      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
      className={`object-cover group-hover:scale-105 transition-transform duration-300 ease-industrial ${
        hasError ? "p-6 object-contain bg-surface-container-high opacity-80" : ""
      }`}
      onError={() => {
        setHasError(true);
        setImgSrc("/images/logo-bengkel-bunul.png");
      }}
    />
  );
}

export function ServicesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const activePageRef = useRef(0);
  const settledPageRef = useRef(0);
  const pendingTargetRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activePage, setActivePage] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const cardsPerPage = useSyncExternalStore(
    subscribeCardsPerPage,
    getCardsPerPageSnapshot,
    () => 3
  );
  const totalPages = Math.ceil(servicesData.length / cardsPerPage);
  const safeActivePage = Math.min(activePage, totalPages - 1);

  const getNearestPageIndex = useCallback(
    (track: HTMLDivElement): number => {
      const slides = Array.from(track.children) as HTMLElement[];
      if (slides.length === 0) return 0;

      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const currentScroll = track.scrollLeft;
      let nearestPage = 0;
      let minDistance = Infinity;

      for (let page = 0; page < totalPages; page++) {
        const startIdx = Math.min(page * cardsPerPage, slides.length - 1);
        const pageLeft = Math.min(slides[startIdx].offsetLeft, maxScroll);
        const distance = Math.abs(pageLeft - currentScroll);
        if (distance < minDistance) {
          minDistance = distance;
          nearestPage = page;
        }
      }

      return nearestPage;
    },
    [cardsPerPage, totalPages]
  );

  const scrollToPage = useCallback(
    (targetPage: number, announceMove = true) => {
      const track = carouselRef.current;
      if (!track) return;

      const slides = Array.from(track.children) as HTMLElement[];
      if (slides.length === 0) return;

      const normalizedPage =
        ((targetPage % totalPages) + totalPages) % totalPages;
      const startSlideIdx = Math.min(
        normalizedPage * cardsPerPage,
        slides.length - 1
      );
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const targetLeft = Math.min(slides[startSlideIdx].offsetLeft, maxScroll);

      pendingTargetRef.current = normalizedPage;
      activePageRef.current = normalizedPage;
      setActivePage(normalizedPage);

      const behavior: ScrollBehavior = shouldReduceMotion ? "auto" : "smooth";
      track.scrollTo({ left: targetLeft, behavior });

      if (behavior === "auto" || Math.abs(track.scrollLeft - targetLeft) < 2) {
        pendingTargetRef.current = null;
        if (announceMove && settledPageRef.current !== normalizedPage) {
          settledPageRef.current = normalizedPage;
          setAnnouncement(
            `Menampilkan halaman layanan ${normalizedPage + 1} dari ${totalPages}`
          );
        }
      }
    },
    [cardsPerPage, shouldReduceMotion, totalPages]
  );

  // Sync active pagination dot & polite screen-reader announcement from scroll position
  useEffect(() => {
    const track = carouselRef.current;
    if (!track) return;

    const handleSettled = () => {
      const nearest =
        pendingTargetRef.current ?? getNearestPageIndex(track);
      pendingTargetRef.current = null;

      if (activePageRef.current !== nearest) {
        activePageRef.current = nearest;
        setActivePage(nearest);
      }

      if (settledPageRef.current !== nearest) {
        settledPageRef.current = nearest;
        setAnnouncement(
          `Menampilkan halaman layanan ${nearest + 1} dari ${totalPages}`
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
        const nearest = getNearestPageIndex(track);
        if (activePageRef.current !== nearest) {
          activePageRef.current = nearest;
          setActivePage(nearest);
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
  }, [getNearestPageIndex, totalPages]);

  const handleSlide = (direction: "prev" | "next") => {
    const track = carouselRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    const current = Math.min(
      pendingTargetRef.current ?? activePageRef.current,
      totalPages - 1
    );

    if (direction === "next") {
      const isAtEnd = track.scrollLeft >= maxScroll - 10;
      scrollToPage(isAtEnd ? 0 : current + 1);
      return;
    }

    const isAtStart = track.scrollLeft <= 10;
    scrollToPage(isAtStart ? totalPages - 1 : current - 1);
  };

  const handleSelectService = (category: string) => {
    const event = new CustomEvent("select-service-category", {
      detail: { category },
    });
    window.dispatchEvent(event);

    smoothScrollTo("reservasi");
  };

  return (
    <section
      id="layanan"
      aria-roledescription="carousel"
      aria-label="Katalog layanan spesialis Bengkel Mobil Bunul"
      className="w-full py-16 sm:py-24 bg-surface-container-low"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="font-label text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1.5 rounded tracking-widest uppercase mb-2">
            KATALOG RESMI SPESIALIS
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-primary font-extrabold tracking-tight">
            Katalog Layanan Spesialis
          </h2>
          <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 max-w-xl">
            Penanganan presisi standar pabrikan dengan estimasi biaya transparan setelah inspeksi digital langsung oleh mekanik bersertifikasi.
          </p>
        </ScrollReveal>

        {/* Carousel Slider Wrapper */}
        <div className="relative flex items-center justify-center">
          {/* Circular Previous Button */}
          <button
            type="button"
            onClick={() => handleSlide("prev")}
            className="hidden sm:flex absolute -left-3 sm:-left-5 xl:-left-6 z-20 w-11 h-11 sm:w-12 sm:h-12 bg-[#0a005d] hover:bg-primary-container text-white items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer border border-white/20"
            aria-label="Halaman layanan sebelumnya"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Horizontal Slides Track */}
          <div
            ref={carouselRef}
            tabIndex={0}
            role="group"
            aria-label="Daftar layanan spesialis"
            className="w-full flex gap-6 overflow-x-auto overflow-y-hidden py-6 snap-x snap-mandatory md:snap-none overscroll-x-contain touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {servicesData.map((service, idx) => (
              <div
                key={service.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} dari ${servicesData.length}: ${service.title}`}
                className="w-[85vw] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start bg-white rounded-xl shadow-[0px_10px_24px_-4px_rgba(30,27,75,0.08)] border border-border-light overflow-hidden flex flex-col group hover-industrial-card"
              >
                {/* Thumbnail Image & Floating Badge Area */}
                <div className="relative w-full h-48 sm:h-52">
                  {/* Inner container with overflow-hidden for image zoom */}
                  <div className="relative w-full h-full overflow-hidden rounded-t-xl bg-surface-container">
                    <ServiceCardImage src={service.image} alt={service.title} />
                    {/* 3px Solid Line Accent */}
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-[#1d1583] z-10" />
                  </div>

                  {/* Centered Floating Badge positioned on top of the thumbnail seam */}
                  <div className="absolute -bottom-7 inset-x-0 flex justify-center z-30 pointer-events-none">
                    <div className="w-14 h-14 bg-[#0a005d] rounded-xl shadow-lg border-2 border-white flex items-center justify-center text-white">
                      {getServiceIcon(service.icon)}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-11 pb-6 px-6 flex-1 flex flex-col items-center text-center">
                  <h3 className="font-headline text-xl sm:text-[22px] font-bold text-primary mb-2">
                    {service.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed flex-1 mb-6 max-w-xs">
                    {service.description}
                  </p>

                  <div className="pt-2 w-full flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleSelectService(service.category)}
                      className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg font-label text-xs sm:text-sm font-bold text-primary hover:text-accent-amber-deep hover:bg-surface-container tracking-wider uppercase transition-colors group/btn cursor-pointer"
                    >
                      <span>KONSULTASI LAYANAN</span>
                      <ArrowRight className="w-4 h-4 arrow-nudge shrink-0" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Circular Next Button */}
          <button
            type="button"
            onClick={() => handleSlide("next")}
            className="hidden sm:flex absolute -right-3 sm:-right-5 xl:-right-6 z-20 w-11 h-11 sm:w-12 sm:h-12 bg-[#0a005d] hover:bg-primary-container text-white items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer border border-white/20"
            aria-label="Halaman layanan selanjutnya"
          >
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Polite screen-reader slide status */}
        <p className="sr-only" role="status" aria-live="polite">
          {announcement}
        </p>

        {/* Responsive Pagination Dots */}
        <nav
          aria-label="Pilih halaman layanan"
          className="mt-4 flex items-center justify-center gap-1.5"
        >
          {Array.from({ length: totalPages }).map((_, pageIdx) => {
            const isActive = safeActivePage === pageIdx;
            return (
              <button
                key={pageIdx}
                type="button"
                onClick={() => scrollToPage(pageIdx)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Halaman layanan ${pageIdx + 1} dari ${totalPages}`}
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
      </div>
    </section>
  );
}
