import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ReservationSection } from "@/components/sections/ReservationSection";
import { LocationSection } from "@/components/sections/LocationSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full selection:bg-primary-container selection:text-white">
      {/* Sticky Header & Navigation */}
      <Navbar />

      {/* Main Single-Page Sections Landmark */}
      <main className="flex-1 w-full" role="main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ReservationSection />
        <LocationSection />
      </main>

      {/* Footer Landmark */}
      <Footer />
    </div>
  );
}
