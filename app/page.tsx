import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { MarketsSection } from "@/components/markets-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ArrivalsSection } from "@/components/arrivals-section"
import { SeasonalityPreview } from "@/components/seasonality-preview"
import { LocationsSection } from "@/components/locations-section"
import { ClientAreaSection } from "@/components/client-area-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MarketsSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <ArrivalsSection />
      <SeasonalityPreview />
      <LocationsSection />
      <ClientAreaSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
