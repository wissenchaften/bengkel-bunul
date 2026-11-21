import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Public_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bengkelbunul.com"),
  title: "Bengkel Mobil Bunul: Spesialis Servis & Reparasi Mobil Terpercaya",
  description:
    "Bengkel mobil spesialis resmi di Kota Malang dengan mekanik tersertifikasi, scanner diagnostik OBD-2 presisi, dan garansi tertulis 1.000 KM / 30 Hari. Reservasi servis cepat via WhatsApp.",
  keywords: [
    "bengkel mobil malang",
    "bengkel mobil bunul",
    "servis mobil malang",
    "tune up mobil malang",
    "overhaul mesin malang",
    "bengkel spesialis ac mobil",
    "spooring balancing malang",
    "bengkel mobil bunulrejo",
  ],
  authors: [{ name: "Bengkel Mobil Bunul" }],
  openGraph: {
    title: "Bengkel Mobil Bunul: Spesialis Servis & Reparasi Mobil Terpercaya",
    description:
      "Standar servis presisi pabrikan dengan mekanik bersertifikasi dan estimasi biaya transparan tertulis di awal.",
    url: "https://bengkelbunul.com",
    siteName: "Bengkel Mobil Bunul",
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/images/logo-bengkel-bunul.png",
    apple: "/images/logo-bengkel-bunul.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Bengkel Mobil Bunul",
  image: "https://bengkelbunul.com/images/logo-bengkel-bunul.png",
  telephone: "+6285100207777",
  url: "https://bengkelbunul.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Warinoi III, Bunulrejo",
    addressLocality: "Kec. Blimbing, Kota Malang",
    addressRegion: "Jawa Timur",
    postalCode: "65126",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -7.9623831,
    longitude: 112.6372074,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "128",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${inter.variable} ${publicSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-body bg-background text-on-surface">
        {children}
      </body>
    </html>
  );
}
