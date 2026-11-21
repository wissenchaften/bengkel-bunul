"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  AirVent,
  Wifi,
  Coffee,
  Building,
  Navigation,
  Compass,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function LocationSection() {
  const [mapInteractive, setMapInteractive] = useState(false);

  const mapsUrl =
    process.env.NEXT_PUBLIC_GMAPS_EMBED_URL ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3533463990664!2d112.6372074!3d-7.9623831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62908f51ec129%3A0x6b4fb24e6ff6eb18!2sJl.%20Warinoi%20III%2C%20Bunulrejo%2C%20Kec.%20Blimbing%2C%20Kota%20Malang%2C%20Jawa%20Timur%2065126!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid";

  return (
    <section
      id="lokasi"
      className="w-full py-16 sm:py-24 bg-[#1E1B4B] text-white"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Workshop Information & Facilities */}
          <ScrollReveal className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 font-label text-xs font-bold bg-primary-container text-white px-3.5 py-1.5 rounded uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-accent-amber-deep" />
              <span>PUSAT WORKSHOP KOTA MALANG</span>
            </div>

            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-white font-extrabold tracking-tight">
              Kunjungi Workshop Bengkel Mobil Bunul
            </h2>

            <p className="font-body text-sm sm:text-base text-surface-container-high leading-relaxed">
              Lokasi strategis di pusat kota dengan akses mudah untuk segala
              tipe kendaraan roda empat. Ruang kerja bengkel luas dan peralatan
              angkat hidrolik berstandar keselamatan tinggi.
            </p>

            {/* Contact Specs Card */}
            <div className="space-y-4 bg-[#161338] p-5 sm:p-6 rounded-xl border border-border-dark">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-amber-deep shrink-0 mt-0.5" />
                <div>
                  <div className="font-headline text-sm font-bold text-white">
                    Alamat Bengkel
                  </div>
                  <p className="font-body text-xs sm:text-sm text-surface-container-high mt-0.5 leading-relaxed">
                    Jl. Warinoi III, Bunulrejo, Kec. Blimbing, Kota Malang, Jawa
                    Timur 65126
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-border-dark">
                <Clock className="w-5 h-5 text-accent-amber-deep shrink-0 mt-0.5" />
                <div>
                  <div className="font-headline text-sm font-bold text-white">
                    Jam Kerja Mekanik
                  </div>
                  <p className="font-body text-xs sm:text-sm text-surface-container-high mt-0.5">
                    Setiap Hari: 08:00 - 17:00 WIB
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-border-dark">
                <Phone className="w-5 h-5 text-whatsapp-green shrink-0 mt-0.5" />
                <div>
                  <div className="font-headline text-sm font-bold text-white">
                    Hotline Servis / WhatsApp
                  </div>
                  <p className="font-body text-xs sm:text-sm text-surface-container-high mt-0.5">
                    (0851) 0020-7777 (Layanan Konsultasi Cepat & Booking)
                  </p>
                </div>
              </div>
            </div>

            {/* Workshop Facilities Grid */}
            <div>
              <h4 className="font-label text-xs uppercase tracking-wider text-surface-container-high font-bold mb-3">
                Fasilitas Kenyamanan Pelanggan
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-[#161338] p-3 rounded-lg border border-border-dark flex items-center gap-2">
                  <AirVent className="w-4 h-4 text-accent-amber-deep shrink-0" />
                  <span className="font-body text-xs text-white">
                    Ruang Ber-AC
                  </span>
                </div>
                <div className="bg-[#161338] p-3 rounded-lg border border-border-dark flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-accent-amber-deep shrink-0" />
                  <span className="font-body text-xs text-white">
                    Free WiFi
                  </span>
                </div>
                <div className="bg-[#161338] p-3 rounded-lg border border-border-dark flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-accent-amber-deep shrink-0" />
                  <span className="font-body text-xs text-white">
                    Kopi & Teh
                  </span>
                </div>
                <div className="bg-[#161338] p-3 rounded-lg border border-border-dark flex items-center gap-2">
                  <Building className="w-4 h-4 text-accent-amber-deep shrink-0" />
                  <span className="font-body text-xs text-white">Musholla</span>
                </div>
              </div>
            </div>

            {/* Action Direct Directions */}
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Bengkel+Mobil+Bunul+Malang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent-amber-deep hover:bg-tertiary-container text-white font-label text-sm font-bold transition-all ease-industrial shadow-[0_4px_12px_rgba(249,150,50,0.35)] group"
              >
                <Navigation className="w-4 h-4" />
                <span>Petunjuk Arah Google Maps</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Google Maps Container with Mobile Gesture Protection */}
          <ScrollReveal delay={0.15} className="lg:col-span-6 w-full">
            <div className="rounded-2xl overflow-hidden border border-border-dark shadow-2xl bg-[#161338] p-2.5">
              <div className="relative w-full h-[380px] sm:h-[460px] rounded-xl overflow-hidden bg-surface-container">
                {/* Embedded Iframe with Gesture Guard */}
                <iframe
                  title="Peta Lokasi Bengkel Mobil Bunul Malang"
                  src={mapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={`w-full h-full transition-opacity duration-200 ${
                    mapInteractive ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                />

                {/* Gesture Guard Overlay (Click to activate) */}
                {!mapInteractive && (
                  <button
                    type="button"
                    onClick={() => setMapInteractive(true)}
                    className="absolute inset-0 z-10 w-full h-full cursor-pointer bg-transparent"
                    aria-label="Klik untuk mengaktifkan interaksi peta"
                  />
                )}

                {/* Gesture Overlay Guard Button (Desktop & Mobile) */}
                <div className="absolute top-3 right-3 z-20">
                  <button
                    type="button"
                    onClick={() => setMapInteractive(!mapInteractive)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 hover:bg-primary text-white font-label text-xs font-semibold shadow-lg backdrop-blur-sm border border-white/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-accent-amber-deep" />
                    <span>
                      {mapInteractive ? "Kunci Geser / Zoom" : "Aktifkan Interaksi Peta"}
                    </span>
                  </button>
                </div>

                {/* Bottom Floating Pin Info */}
                <div className="absolute bottom-3 inset-x-3 z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-border-light text-on-surface shadow-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-primary font-headline text-xs sm:text-sm font-bold">
                      <MapPin className="w-4 h-4 text-accent-amber-deep shrink-0" />
                      <span>Bengkel Mobil Bunul Malang</span>
                    </div>
                    <div className="font-body text-[11px] text-outline mt-0.5">
                      Bunulrejo, Kec. Blimbing, Kota Malang
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Bengkel+Mobil+Bunul+Malang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary-container text-white text-xs font-label font-bold transition-colors"
                  >
                    Buka Rute
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
