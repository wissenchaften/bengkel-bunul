"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import videosData from "@/data/videos.json";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { parseVideoEmbed, type ParsedVideoEmbed } from "@/lib/video-embed";

interface VideoItem {
  id: string;
  vehicle: string;
  title: string;
  description: string;
  platform: string;
  platformUrl: string;
  thumbnail?: string;
}

const FALLBACK_POSTER = "/images/hero/hero-workshop.webp";

function IframePlayer({
  video,
  parsed,
  iframeSrc,
  imgSrc,
  onImgError,
  onEmbedError,
  onClose,
}: {
  video: VideoItem;
  parsed: ParsedVideoEmbed;
  iframeSrc: string;
  imgSrc: string;
  onImgError: () => void;
  onEmbedError: () => void;
  onClose: () => void;
}) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-[#0f0d26]">
      {/* Close / return to poster control */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center border border-white/20 shadow-md transition-colors cursor-pointer"
        aria-label={`Tutup pemutar ${video.title}`}
      >
        <X className="w-4 h-4" />
      </button>

      {/* Fallback layer visible while iframe initializes or if third-party iframe is blocked */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-5 text-center transition-opacity duration-300 ${
          iframeLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Image
          src={imgSrc}
          alt={video.title}
          fill
          loading="lazy"
          fetchPriority="low"
          sizes="(max-width: 640px) 78vw, 280px"
          className="object-cover opacity-35"
          onError={onImgError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-black/50" />
        <div className="relative z-10 flex flex-col items-center gap-3 text-white">
          <span className="font-label text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50">
            {parsed.platformLabel}
          </span>
          <p className="font-body text-xs text-white/90 max-w-[200px]">
            Memuat pemutar {parsed.platformLabel}...
          </p>
          <a
            href={video.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full bg-accent-amber-deep hover:bg-tertiary-container text-white font-label text-xs font-bold shadow-md transition-colors"
          >
            <span>Tonton di {parsed.platformLabel}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>
      </div>

      <iframe
        src={iframeSrc}
        title={video.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setIframeLoaded(true)}
        onError={onEmbedError}
        className="relative z-10 w-full h-full border-0 bg-transparent"
      />
    </div>
  );
}

function VideoPortfolioCard({
  video,
  delay,
  isActive,
  onActivate,
  onDeactivate,
}: {
  video: VideoItem;
  delay: number;
  isActive: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  const parsed = parseVideoEmbed(video.platformUrl);
  const initialThumbnail = video.thumbnail || parsed.defaultThumbnail || "";
  const [imgSrc, setImgSrc] = useState(initialThumbnail || FALLBACK_POSTER);

  // Lazy-load poster media only when the card enters or nears the viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeEmbedUrl = parsed.autoplayEmbedUrl || parsed.embedUrl;
  const shouldRenderIframe =
    isInView && isActive && !embedError && Boolean(activeEmbedUrl);

  return (
    <ScrollReveal
      delay={delay}
      className="w-[78vw] sm:w-[280px] lg:w-[calc((100%-72px)/4)] shrink-0 snap-start group relative rounded-xl overflow-hidden bg-white shadow-md border border-border-light flex flex-col hover-industrial-card"
    >
      <div
        ref={cardRef}
        className="relative w-full aspect-[9/16] overflow-hidden bg-[#0f0d26]"
      >
        {!isInView ? (
          <div className="w-full h-full animate-shimmer bg-surface-container-high" />
        ) : shouldRenderIframe && activeEmbedUrl ? (
          <IframePlayer
            video={video}
            parsed={parsed}
            iframeSrc={activeEmbedUrl}
            imgSrc={imgSrc}
            onImgError={() => setImgSrc(FALLBACK_POSTER)}
            onEmbedError={() => setEmbedError(true)}
            onClose={onDeactivate}
          />
        ) : (
          <>
            <Image
              src={imgSrc}
              alt={video.title}
              fill
              loading="lazy"
              fetchPriority="low"
              sizes="(max-width: 640px) 78vw, 280px"
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-industrial"
              onError={() => setImgSrc(FALLBACK_POSTER)}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-black/40 pointer-events-none" />

            {/* Platform Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-accent-amber-deep" />
              <span>{video.platform}</span>
            </div>

            {/* Centered Play Button / Fallback Action */}
            <div className="absolute inset-0 flex items-center justify-center">
              {parsed.embedUrl && !embedError ? (
                <button
                  type="button"
                  onClick={() => onActivate(video.id)}
                  className="w-14 h-14 rounded-full bg-accent-amber-deep/95 hover:bg-accent-amber-deep text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ease-industrial cursor-pointer"
                  aria-label={`Putar video ${video.title}`}
                >
                  <Play className="w-7 h-7 translate-x-0.5 fill-white" />
                </button>
              ) : (
                <a
                  href={video.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full bg-accent-amber-deep/95 hover:bg-accent-amber-deep text-white font-label text-xs font-bold shadow-lg transition-transform group-hover:scale-105"
                  aria-label={`Tonton video ${video.title} di ${video.platform}`}
                >
                  <Play className="w-4 h-4 fill-white shrink-0" />
                  <span>Tonton di {parsed.platformLabel}</span>
                </a>
              )}
            </div>

            {/* Video Meta Info */}
            <div className="absolute bottom-3 inset-x-3 text-white pointer-events-none">
              <div className="font-label text-[10px] text-tertiary-fixed-dim uppercase tracking-wider mb-1 font-extrabold">
                {video.vehicle}
              </div>
              <h3 className="font-headline text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                {video.title}
              </h3>
              <p className="font-body text-xs text-surface-container-highest mt-1 line-clamp-1">
                {video.description}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Card Bottom Action (Consistent Platform + External Link) */}
      <div className="px-3 py-2 bg-white flex items-center justify-between gap-2 border-t border-border-light">
        <span className="font-label text-[11px] font-bold text-outline uppercase truncate">
          {video.platform}
        </span>
        <a
          href={video.platformUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] px-2 font-label text-xs text-primary hover:text-accent-amber-deep font-bold inline-flex items-center gap-1 group/btn shrink-0"
        >
          <span>Tonton di {parsed.platformLabel}</span>
          <ExternalLink className="w-3.5 h-3.5 arrow-nudge shrink-0" />
        </a>
      </div>
    </ScrollReveal>
  );
}

export function PortfolioSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handleScrollTrack = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.8;
    trackRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="portofolio" className="w-full py-16 sm:py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1 font-label text-xs font-bold bg-primary-fixed text-primary px-3 py-1 rounded tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-accent-amber-deep" />
              <span>PORTOFOLIO DIGITAL</span>
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-primary font-extrabold tracking-tight">
              Lihat Langsung Hasil Kerja Kami
            </h2>
            <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1.5 leading-relaxed">
              Dokumentasi pengerjaan teknis, uji performa, dan transparansi overhaul nyata dari bay bengkel kami di media sosial.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-outline font-label uppercase">
              <span>WORKSHOP LIVE</span>
              <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-ping" />
            </div>

            <div className="flex items-center gap-1.5 ml-2">
              <button
                type="button"
                onClick={() => handleScrollTrack("left")}
                className="w-11 h-11 rounded-full bg-surface-container border border-border-medium flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                aria-label="Slide sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTrack("right")}
                className="w-11 h-11 rounded-full bg-surface-container border border-border-medium flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                aria-label="Slide selanjutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 9:16 Video Cards Track */}
        <div
          ref={trackRef}
          className="w-full flex gap-5 sm:gap-6 overflow-x-auto overflow-y-hidden pb-4 pt-1 snap-x snap-mandatory md:snap-none overscroll-x-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {(videosData as VideoItem[]).slice(0, 6).map((video, idx) => (
            <VideoPortfolioCard
              key={video.id}
              video={video}
              delay={idx * 0.08}
              isActive={activeVideoId === video.id}
              onActivate={(id) => setActiveVideoId(id)}
              onDeactivate={() => setActiveVideoId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
