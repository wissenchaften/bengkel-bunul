"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Phone,
  Car,
  CreditCard,
  Wrench,
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  Loader2,
  Lock,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import {
  reservationSchema,
  type ReservationFormData,
} from "@/lib/validations";
import { generateWhatsAppURL } from "@/lib/whatsapp";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const SERVICE_OPTIONS = [
  "Servis Mesin",
  "Sistem Rem",
  "Transmisi",
  "Kelistrikan",
  "AC Mobil",
  "Kaki-kaki",
  "Sistem Pendingin",
  "Perawatan Berkala",
  "Body Repair",
];

export function ReservationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [highlightService, setHighlightService] = useState(false);

  // Calculate default min (H+1) and max (H+30) date strings (YYYY-MM-DD)
  const tomorrowStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  })();

  const maxDateStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  })();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      nama: "",
      telepon: "",
      kendaraan: "",
      plat: "",
      layanan: "",
      keluhan: "",
      tanggal: tomorrowStr,
      waktu: "pagi",
    },
  });

  // Listen to custom event from ServicesSection for auto-fill and highlight
  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: string }>;
      if (customEvent.detail && customEvent.detail.category) {
        setValue("layanan", customEvent.detail.category, {
          shouldValidate: true,
        });
        setHighlightService(true);
        setTimeout(() => setHighlightService(false), 1200);
      }
    };

    window.addEventListener("select-service-category", handleSelectCategory);
    return () =>
      window.removeEventListener("select-service-category", handleSelectCategory);
  }, [setValue]);

  const onSubmit = (data: ReservationFormData) => {
    setIsSubmitting(true);

    const targetUrl = generateWhatsAppURL(data);

    // Micro-delay for visual feedback before opening WhatsApp
    setTimeout(() => {
      window.open(targetUrl, "_blank", "noopener,noreferrer");

      // Reset form automatically after 3 seconds according to PRD §3.3
      setTimeout(() => {
        reset({
          nama: "",
          telepon: "",
          kendaraan: "",
          plat: "",
          layanan: "",
          keluhan: "",
          tanggal: tomorrowStr,
          waktu: "pagi",
        });
        setIsSubmitting(false);
      }, 3000);
    }, 400);
  };

  return (
    <section id="reservasi" className="w-full py-16 sm:py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto bg-white rounded-2xl border border-border-medium shadow-[0px_10px_24px_-4px_rgba(30,27,75,0.08)] overflow-hidden">
          {/* Form Header Ribbon */}
          <div className="bg-primary text-white p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-accent-amber-deep" />
              <span className="font-label text-xs uppercase tracking-wider text-surface-container-high font-bold">
                SISTEM RESERVASI PRIORITAS
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl text-white font-extrabold tracking-tight">
              Formulir Reservasi Servis
            </h2>
            <p className="font-body text-xs sm:text-sm text-surface-container-high mt-1.5 leading-relaxed">
              Dapatkan antrean prioritas dan estimasi inspeksi dari mekanik ahli kami tanpa antre panjang di bengkel.
            </p>
          </div>

          {/* Form Body with 8 Fields */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 sm:p-8 space-y-5"
            noValidate
          >
            {/* Field 1 & 2: Nama & Telepon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="nama"
                  className="font-label text-xs sm:text-sm text-on-surface font-semibold flex items-center gap-1.5"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span>Nama Lengkap *</span>
                </label>
                <input
                  id="nama"
                  type="text"
                  placeholder="cth. Budi Santoso"
                  {...register("nama")}
                  className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all text-sm font-body ${
                    errors.nama
                      ? "border-error focus:border-error"
                      : "border-border-medium focus:border-primary-container"
                  }`}
                />
                {errors.nama && (
                  <p className="text-xs text-error font-body animate-in fade-in slide-in-from-top-1 duration-200">
                    {errors.nama.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="telepon"
                  className="font-label text-xs sm:text-sm text-on-surface font-semibold flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>Nomor Telepon / WhatsApp *</span>
                </label>
                <input
                  id="telepon"
                  type="tel"
                  placeholder="cth. 081234567890"
                  {...register("telepon")}
                  className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all text-sm font-body ${
                    errors.telepon
                      ? "border-error focus:border-error"
                      : "border-border-medium focus:border-primary-container"
                  }`}
                />
                {errors.telepon && (
                  <p className="text-xs text-error font-body animate-in fade-in slide-in-from-top-1 duration-200">
                    {errors.telepon.message}
                  </p>
                )}
              </div>
            </div>

            {/* Field 3 & 4: Kendaraan & Plat Nomor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="kendaraan"
                  className="font-label text-xs sm:text-sm text-on-surface font-semibold flex items-center gap-1.5"
                >
                  <Car className="w-4 h-4 text-primary" />
                  <span>Merek & Tipe Kendaraan *</span>
                </label>
                <input
                  id="kendaraan"
                  type="text"
                  placeholder="cth. Toyota Avanza Veloz 2020"
                  {...register("kendaraan")}
                  className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all text-sm font-body ${
                    errors.kendaraan
                      ? "border-error focus:border-error"
                      : "border-border-medium focus:border-primary-container"
                  }`}
                />
                {errors.kendaraan && (
                  <p className="text-xs text-error font-body animate-in fade-in slide-in-from-top-1 duration-200">
                    {errors.kendaraan.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="plat"
                    className="font-label text-xs sm:text-sm text-on-surface font-semibold flex items-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span>Nomor Plat (Opsional)</span>
                  </label>
                  <span className="text-[11px] font-mono text-outline">Format: N 1234 AB</span>
                </div>
                <input
                  id="plat"
                  type="text"
                  placeholder="N 1234 AB"
                  {...register("plat")}
                  onChange={(e) => {
                    // Auto-uppercase plat number
                    e.target.value = e.target.value.toUpperCase();
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-lowest text-on-surface font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all text-sm font-bold ${
                    errors.plat
                      ? "border-error focus:border-error"
                      : "border-border-medium focus:border-primary-container"
                  }`}
                />
                {errors.plat && (
                  <p className="text-xs text-error font-body animate-in fade-in slide-in-from-top-1 duration-200">
                    {errors.plat.message}
                  </p>
                )}
              </div>
            </div>

            {/* Field 5: Kategori Layanan */}
            <div className="space-y-1.5">
              <label
                htmlFor="layanan"
                className="font-label text-xs sm:text-sm text-on-surface font-semibold flex items-center gap-1.5"
              >
                <Wrench className="w-4 h-4 text-primary" />
                <span>Kategori Layanan *</span>
              </label>
              <select
                id="layanan"
                {...register("layanan")}
                className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all text-sm font-body ${
                  highlightService
                    ? "ring-2 ring-primary-container border-primary-container"
                    : errors.layanan
                    ? "border-error focus:border-error"
                    : "border-border-medium focus:border-primary-container"
                }`}
              >
                <option value="">Pilih Kategori Layanan Spesialis</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.layanan && (
                <p className="text-xs text-error font-body animate-in fade-in slide-in-from-top-1 duration-200">
                  {errors.layanan.message}
                </p>
              )}
            </div>

            {/* Field 6: Keluhan / Deskripsi */}
            <div className="space-y-1.5">
              <label
                htmlFor="keluhan"
                className="font-label text-xs sm:text-sm text-on-surface font-semibold flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span>Keluhan & Gejala Kendaraan *</span>
              </label>
              <textarea
                id="keluhan"
                rows={3}
                placeholder="Jelaskan gejala kerusakan, bunyi getar/decit abnormal, indikator check engine, atau kebutuhan servis spesifik mobil Anda..."
                {...register("keluhan")}
                className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all text-sm font-body leading-relaxed resize-y ${
                  errors.keluhan
                    ? "border-error focus:border-error"
                    : "border-border-medium focus:border-primary-container"
                }`}
              />
              {errors.keluhan && (
                <p className="text-xs text-error font-body animate-in fade-in slide-in-from-top-1 duration-200">
                  {errors.keluhan.message}
                </p>
              )}
            </div>

            {/* Field 7 & 8: Tanggal & Sesi Waktu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="tanggal"
                  className="font-label text-xs sm:text-sm text-on-surface font-semibold flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Tanggal Rencana Kedatangan *</span>
                </label>
                <input
                  id="tanggal"
                  type="date"
                  min={tomorrowStr}
                  max={maxDateStr}
                  {...register("tanggal")}
                  className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all text-sm font-body ${
                    errors.tanggal
                      ? "border-error focus:border-error"
                      : "border-border-medium focus:border-primary-container"
                  }`}
                />
                {errors.tanggal && (
                  <p className="text-xs text-error font-body animate-in fade-in slide-in-from-top-1 duration-200">
                    {errors.tanggal.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="font-label text-xs sm:text-sm text-on-surface font-semibold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Preferensi Sesi Waktu *</span>
                </label>
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="pagi"
                      aria-label="Sesi Waktu Pagi (08:00 sampai 12:00 WIB)"
                      {...register("waktu")}
                      className="peer sr-only"
                    />
                    <div className="min-h-[44px] flex items-center justify-center px-3 py-2 text-center rounded-lg border border-border-medium bg-surface-container-lowest peer-checked:bg-primary-fixed peer-checked:border-primary-container peer-checked:text-primary font-label text-xs font-bold transition-all">
                      Pagi (08:00 - 12:00)
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="siang"
                      aria-label="Sesi Waktu Siang (12:00 sampai 16:00 WIB)"
                      {...register("waktu")}
                      className="peer sr-only"
                    />
                    <div className="min-h-[44px] flex items-center justify-center px-3 py-2 text-center rounded-lg border border-border-medium bg-surface-container-lowest peer-checked:bg-primary-fixed peer-checked:border-primary-container peer-checked:text-primary font-label text-xs font-bold transition-all">
                      Siang (12:00 - 16:00)
                    </div>
                  </label>
                </div>
                {errors.waktu && (
                  <p className="text-xs text-error font-body animate-in fade-in slide-in-from-top-1 duration-200">
                    {errors.waktu.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-full bg-whatsapp-green hover:bg-[#1ebd58] text-white font-headline text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 transition-all duration-200 ease-industrial hover:scale-[1.01] shadow-[0_4px_14px_rgba(37,211,102,0.4)] disabled:opacity-75 cursor-pointer group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Membuka WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    <span>Kirim Reservasi ke WhatsApp Resmi</span>
                    <ArrowRight className="w-5 h-5 arrow-nudge shrink-0" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-outline text-center">
                <Lock className="w-3.5 h-3.5 text-status-success shrink-0" />
                <span>
                  Data reservasi otomatis di-generate menjadi pesan WhatsApp resmi ke Admin Bengkel Bunul.
                </span>
              </div>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
