import { z } from "zod";

export const reservationSchema = z.object({
  nama: z
    .string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(50, "Nama lengkap maksimal 50 karakter"),
  telepon: z
    .string()
    .regex(
      /^(\+62|62|0)8[1-9][0-9]{7,11}$/,
      "Format nomor telepon tidak valid (contoh: 081234567890)"
    ),
  kendaraan: z
    .string()
    .min(3, "Masukkan merek dan tipe mobil (contoh: Toyota Avanza 2020)"),
  plat: z
    .string()
    .regex(
      /^[A-Za-z]{1,2}\s?[0-9]{1,4}\s?[A-Za-z]{1,3}$/,
      "Format plat nomor tidak valid (contoh: N 1234 AB)"
    )
    .optional()
    .or(z.literal("")),
  layanan: z.string().min(1, "Pilih salah satu kategori layanan"),
  keluhan: z
    .string()
    .min(10, "Jelaskan keluhan atau kebutuhan servis minimal 10 karakter")
    .max(500, "Deskripsi keluhan maksimal 500 karakter"),
  tanggal: z
    .string()
    .min(1, "Pilih tanggal rencana kedatangan")
    .refine((val) => {
      const selected = new Date(val);
      selected.setHours(0, 0, 0, 0);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return selected >= tomorrow;
    }, "Tanggal kedatangan minimal H+1 dari hari ini")
    .refine((val) => {
      const selected = new Date(val);
      selected.setHours(0, 0, 0, 0);
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);
      maxDate.setHours(0, 0, 0, 0);
      return selected <= maxDate;
    }, "Tanggal kedatangan maksimal H+30 hari"),
  waktu: z.enum(["pagi", "siang"] as const, {
    message: "Pilih sesi waktu kedatangan",
  }),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
