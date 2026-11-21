"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Play, Sparkles } from "lucide-react";
import videosData from "@/data/videos.json";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function PortfolioSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [loadedVideos, setLoadedVideos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Intersection observer for lazy loading video cards
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-video-id");
            if (id) {
              setLoadedVideos((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { rootMargin: "200px" }
    );

    const cards = document.querySelectorAll(".video-card-target");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleScrollTrack = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = 300;
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
                className="w-9 h-9 rounded-full bg-surface-container border border-border-medium flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                aria-label="Slide sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTrack("right")}
                className="w-9 h-9 rounded-full bg-surface-container border border-border-medium flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
        >
          {videosData.map((video, idx) => {
            const isLoaded = loadedVideos[video.id];

            return (
              <ScrollReveal
                key={video.id}
                delay={idx * 0.08}
                className="snap-start video-card-target group relative rounded-xl overflow-hidden bg-primary-container shadow-md border border-border-light flex flex-col hover-industrial-card"
              >
                <div
                  data-video-id={video.id}
                  className="relative w-full aspect-[9/16] overflow-hidden bg-surface-container"
                >
                  {isLoaded ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 ease-industrial"
                    />
                  ) : (
                    <div className="w-full h-full animate-shimmer bg-surface-container-high" />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-black/40" />

                  {/* Platform Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-accent-amber-deep" />
                    <span>{video.platform}</span>
                  </div>

                  {/* Centered Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a
                      href={video.platformUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-accent-amber-deep/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ease-industrial"
                      aria-label={`Tonton video ${video.title} di ${video.platform}`}
                    >
                      <Play className="w-7 h-7 translate-x-0.5 fill-white" />
                    </a>
                  </div>

                  {/* Video Meta Info */}
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <div className="font-label text-[10px] text-tertiary-fixed-dim uppercase tracking-wider mb-1 font-extrabold">
                      {video.vehicle}
                    </div>
                    <h4 className="font-headline text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="font-body text-xs text-surface-container-highest mt-1 line-clamp-1">
                      {video.description}
                    </p>
                  </div>
                </div>

                {/* Card Bottom Action */}
                <div className="p-3 bg-white flex items-center justify-between border-t border-border-light">
                  <span className="font-label text-[11px] font-bold text-outline">
                    {video.views} DITONTON
                  </span>
                  <a
                    href={video.platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-label text-xs text-primary hover:text-accent-amber-deep font-bold flex items-center gap-1 group/btn"
                  >
                    <span>Tonton Video</span>
                    <ExternalLink className="w-3.5 h-3.5 arrow-nudge shrink-0" />
                  </a>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
