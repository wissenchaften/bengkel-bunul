"use client";

import { useRef } from "react";
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
import servicesData from "@/data/services.json";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

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

export function ServicesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleSlide = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.85;
    carouselRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleSelectService = (category: string) => {
    const event = new CustomEvent("select-service-category", {
      detail: { category },
    });
    window.dispatchEvent(event);

    const formElem = document.getElementById("reservasi");
    if (formElem) {
      formElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="layanan" className="w-full py-16 sm:py-24 bg-surface-container-low">
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
            className="absolute -left-3 sm:-left-5 xl:-left-6 z-20 w-11 h-11 sm:w-12 sm:h-12 bg-[#0a005d] hover:bg-primary-container text-white flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
            aria-label="Layanan Sebelumnya"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Horizontal Slides Track */}
          <div
            ref={carouselRef}
            className="w-full flex gap-6 overflow-x-auto scroll-smooth py-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="w-[85vw] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start bg-white rounded-xl shadow-[0px_10px_24px_-4px_rgba(30,27,75,0.08)] border border-border-light overflow-hidden flex flex-col group hover-industrial-card"
              >
                {/* Thumbnail Image & Floating Badge Area */}
                <div className="relative w-full h-48 sm:h-52">
                  {/* Inner container with overflow-hidden for image zoom */}
                  <div className="relative w-full h-full overflow-hidden rounded-t-xl bg-surface-container">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 ease-industrial"
                    />
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
                      className="inline-flex items-center gap-1.5 font-label text-xs sm:text-sm font-bold text-primary hover:text-accent-amber-deep tracking-wider uppercase transition-colors group/btn cursor-pointer"
                    >
                      <span>KONSULTASI LAYANAN</span>
                      <ArrowRight className="w-4 h-4 arrow-nudge shrink-0" />
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
            className="absolute -right-3 sm:-right-5 xl:-right-6 z-20 w-11 h-11 sm:w-12 sm:h-12 bg-[#0a005d] hover:bg-primary-container text-white flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
            aria-label="Layanan Selanjutnya"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
