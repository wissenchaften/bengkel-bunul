"use client";

import Image from "next/image";
import { ArrowRight, Wrench, Disc, Cog, Zap, Wind, Crosshair, Thermometer, ClipboardCheck, Hammer } from "lucide-react";
import servicesData from "@/data/services.json";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

// Helper icon resolver
function getServiceIcon(iconName: string) {
  switch (iconName) {
    case "Wrench":
      return <Wrench className="w-6 h-6 text-white" />;
    case "Disc":
      return <Disc className="w-6 h-6 text-white" />;
    case "Cog":
      return <Cog className="w-6 h-6 text-white" />;
    case "Zap":
      return <Zap className="w-6 h-6 text-white" />;
    case "Wind":
      return <Wind className="w-6 h-6 text-white" />;
    case "Crosshair":
      return <Crosshair className="w-6 h-6 text-white" />;
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
  const handleSelectService = (category: string) => {
    // Dispatch custom event to notify ReservationSection
    const event = new CustomEvent("select-service-category", {
      detail: { category },
    });
    window.dispatchEvent(event);

    // Smooth scroll to form
    const formElem = document.getElementById("reservasi");
    if (formElem) {
      formElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="layanan" className="w-full py-16 sm:py-24 bg-surface-container-low">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <ScrollReveal
              key={service.id}
              delay={index * 0.05}
              className="bg-white rounded-xl shadow-[0px_4px_16px_rgba(30,27,75,0.06)] border border-border-light overflow-hidden flex flex-col group hover-industrial-card"
            >
              {/* Card Thumbnail */}
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-surface-container">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-industrial"
                />
                <div className="absolute bottom-0 inset-x-0 h-1 bg-primary-container" />

                {/* Floating Centered Icon */}
                <div className="absolute -bottom-6 inset-x-0 flex justify-center z-20">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-xl shadow-md border-2 border-white flex items-center justify-center text-white">
                    {getServiceIcon(service.icon)}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-9 pb-6 px-5 sm:px-6 flex-1 flex flex-col items-center text-center">
                <span className="font-label text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full mb-2">
                  {service.badge}
                </span>

                <h3 className="font-headline text-lg sm:text-xl font-bold text-primary mb-2">
                  {service.title}
                </h3>

                <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed flex-1 mb-5">
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
