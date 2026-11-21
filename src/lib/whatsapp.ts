import { ReservationFormData } from "./validations";

export function formatWhatsAppMessage(data: ReservationFormData): string {
  const waktuText =
    data.waktu === "pagi"
      ? "Sesi Pagi (08:00 - 12:00 WIB)"
      : "Sesi Siang (12:00 - 16:00 WIB)";

  const platText = data.plat && data.plat.trim() ? data.plat.toUpperCase() : "Tidak diisi";

  return `🔧 *RESERVASI SERVIS: BENGKEL MOBIL BUNUL*

👤 *Nama:* ${data.nama}
📱 *Telepon / WA:* ${data.telepon}
🚗 *Kendaraan:* ${data.kendaraan}
🔢 *Plat Nomor:* ${platText}
🔩 *Layanan:* ${data.layanan}
📋 *Keluhan:* ${data.keluhan}
📅 *Rencana Datang:* ${data.tanggal}, ${waktuText}

_Mohon konfirmasi ketersediaan antrean teknisi. Dikirim melalui website resmi bengkelbunul.com_`;
}

export function generateWhatsAppURL(data: ReservationFormData): string {
  const adminNumber = process.env.NEXT_PUBLIC_WA_ADMIN_NUMBER || "6285100207777";
  const message = formatWhatsAppMessage(data);
  return `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
}
