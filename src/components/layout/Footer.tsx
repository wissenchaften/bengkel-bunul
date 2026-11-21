import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Phone,
  ShieldCheck,
  Wrench,
  Navigation,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#1E1B4B] text-white pt-12 sm:pt-16 pb-8 border-t border-border-dark" role="contentinfo">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 p-1 bg-white rounded">
                <Image
                  src="/images/logo-bengkel-bunul.png"
                  alt="Logo Bengkel Mobil Bunul"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <span className="font-headline font-extrabold text-lg text-white uppercase tracking-tight">
                Bengkel Bunul
              </span>
            </div>

            <p className="font-body text-xs sm:text-sm text-surface-container-high leading-relaxed">
              Pusat reparasi, diagnostik mesin komputerisasi, dan perawatan performa kendaraan bergaransi dengan integritas mekanik bersertifikat terpercaya sejak 2008.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 font-label text-[11px] font-bold bg-primary-container text-white px-3 py-1.5 rounded uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-status-success" />
                <span>Bengkel Resmi Berizin</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 className="font-headline font-bold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-accent-amber-deep" />
              <span>Navigasi Cepat</span>
            </h4>
            <ul className="space-y-2.5 font-body text-xs sm:text-sm">
              {[
                { href: "#hero", label: "Beranda" },
                { href: "#tentang-kami", label: "Tentang Kami" },
                { href: "#layanan", label: "Katalog Layanan" },
                { href: "#portofolio", label: "Portofolio Kerja" },
                { href: "#testimoni", label: "Testimoni Kustomer" },
                { href: "#reservasi", label: "Formulir Reservasi" },
                { href: "#lokasi", label: "Lokasi & Peta" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-surface-container-high hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-outline group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Categories */}
          <div>
            <h4 className="font-headline font-bold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-accent-amber-deep" />
              <span>Layanan Spesialis</span>
            </h4>
            <ul className="space-y-2 font-body text-xs text-surface-container-high">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber-deep" />
                <span>Servis Mesin & Tune Up</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber-deep" />
                <span>Sistem Rem & ABS</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber-deep" />
                <span>Transmisi Otomatis & Manual</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber-deep" />
                <span>Kelistrikan & ECU Scanning</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber-deep" />
                <span>Servis & Flushing AC Mobil</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber-deep" />
                <span>Kaki-kaki & Suspensi 3D</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber-deep" />
                <span>Body Repair & Cat Oven</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Operating Hours & Direct WhatsApp */}
          <div>
            <h4 className="font-headline font-bold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-amber-deep" />
              <span>Jam Operasional</span>
            </h4>
            <div className="space-y-2 font-body text-xs sm:text-sm text-surface-container-high mb-5">
              <div className="flex justify-between pb-1 border-b border-border-dark">
                <span>Setiap Hari:</span>
                <span className="font-bold text-white">08:00 - 17:00 WIB</span>
              </div>
              <p className="text-[11px] text-outline pt-1">
                Melayani servis terjadwal dan darurat di jam kerja workshop.
              </p>
            </div>

            <h5 className="font-label text-xs uppercase tracking-wider text-surface-container-high mb-2 font-bold">
              Hubungi WhatsApp Resmi
            </h5>
            <a
              href="https://wa.me/6285100207777"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-full justify-center bg-whatsapp-green hover:bg-[#1ebd58] text-white font-label text-xs font-bold py-2.5 px-4 rounded-lg shadow-sm transition-all hover:scale-[1.01]"
            >
              <Phone className="w-4 h-4" />
              <span>Chat Admin Bengkel</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-3 text-outline font-body text-xs text-center sm:text-left">
          <p>© 2026 Bengkel Mobil Bunul. Seluruh hak dilindungi.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-surface-container-high cursor-pointer transition-colors">
              Standar Servis Resmi
            </span>
            <span>•</span>
            <span className="hover:text-surface-container-high cursor-pointer transition-colors">
              Garansi 1.000 KM / 30 Hari
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
