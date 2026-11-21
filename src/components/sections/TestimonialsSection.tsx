"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import testimonialsData from "@/data/testimonials.json";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 5000ms, pause on hover / touch
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      const step = track.clientWidth * 0.8;
      if (track.scrollLeft >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleManualScroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.8;
    trackRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="testimoni" className="w-full py-16 sm:py-24 bg-surface-container-low">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between max-w-5xl mx-auto mb-10 sm:mb-12 gap-4 text-center md:text-left">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 font-label text-xs font-bold bg-status-success/15 text-status-success px-3 py-1 rounded tracking-wider uppercase mb-2">
              <Star className="w-3.5 h-3.5 fill-status-success text-status-success" />
              <span>RATING GOOGLE MAPS 4.9/5.0</span>
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-primary font-extrabold tracking-tight">
              Kepercayaan Kustomer Adalah Bukti Kualitas Kami
            </h2>
            <p className="font-body text-sm sm:text-base text-on-surface-variant mt-1.5 leading-relaxed">
              Ulasan otentik dari para pemilik kendaraan yang mengandalkan keandalan servis di Bengkel Mobil Bunul.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 self-center md:self-end">
            <button
              type="button"
              onClick={() => handleManualScroll("left")}
              className="w-10 h-10 rounded-full bg-white border border-border-medium flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
              aria-label="Testimoni sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleManualScroll("right")}
              className="w-10 h-10 rounded-full bg-white border border-border-medium flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
              aria-label="Testimoni selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={trackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="w-full flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth py-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {testimonialsData.map((testi, idx) => (
            <ScrollReveal
              key={testi.id}
              delay={idx * 0.08}
              className="w-[85vw] sm:w-[320px] lg:w-[calc((100%-72px)/4)] shrink-0 snap-start bg-white p-6 rounded-xl border border-border-light shadow-[0px_4px_12px_rgba(30,27,75,0.04)] flex flex-col justify-between hover-industrial-card"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex items-center gap-1 text-accent-amber-deep mb-3">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-accent-amber-deep text-accent-amber-deep"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-primary-fixed-dim/70 absolute -top-1 -left-1 -z-0 opacity-40" />
                  <p className="font-body text-xs sm:text-sm text-on-surface leading-relaxed italic relative z-10 pl-2">
                    &ldquo;{testi.review}&rdquo;
                  </p>
                </div>
              </div>

              {/* Author & Vehicle */}
              <div className="pt-3 border-t border-border-light flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${testi.avatarBg} ${testi.textColor} font-headline flex items-center justify-center font-bold text-sm shrink-0`}
                >
                  {testi.initials}
                </div>
                <div>
                  <div className="font-headline text-sm font-bold text-primary">
                    {testi.name}
                  </div>
                  <div className="font-body text-xs text-outline">
                    {testi.vehicle}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
