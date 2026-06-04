"use client"

import Link from "next/link"
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState, useCallback } from "react"

const slides = [
  {
    title: "PRODUZIONE LOCALE",
    subtitle: "Dal cuore della Riviera dei Fiori.",
    text: "Collaboriamo ogni giorno con produttori di Sanremo, Piemonte, Toscana, Campania e Puglia.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9172-GY1JHSjR2ZzaxGGMP4Tk0nLFMa7Rfx.jpeg",
    brightness: "brightness-100",
  },
  {
    title: "IMPORTAZIONE SUD AMERICA",
    subtitle: "Rose, Alstroemeria, Garofani e Gypsophila.",
    text: "Arrivi diretti da Ecuador e Colombia.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9080-MW15gvth1ozEQ5xfYSYGVmypwzeTKt.jpeg",
    brightness: "brightness-100",
  },
  {
    title: "ASTA OLANDESE",
    subtitle: "Accesso quotidiano ai principali mercati floricoli europei.",
    text: "Disponibilità aggiornata e ampia scelta di prodotto.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9098-ZCbTxnziGYcf9YMBwU5FJtmX9fBkXt.jpeg",
    brightness: "brightness-100",
  },
  {
    title: "VERDE ORNAMENTALE",
    subtitle: "Disponibilità costante durante tutto l'anno.",
    text: "Eucalipto, Gunny, Pittosporo, Ruscus e molto altro.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9035-3IOZtFbv11ndOvvpk7m5TfftYGQTbE.jpeg",
    brightness: "brightness-125",
  },
  {
    title: "PIANTE DA INTERNO ED ESTERNO",
    subtitle: "Una selezione professionale per il settore floricolo.",
    text: "Piante selezionate per fioristi, garden center e rivenditori.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9082-GA8jZEMAH8VqcCIPVn9CSlmN2673LF.jpeg",
    brightness: "brightness-100",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }, [isTransitioning])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, goToSlide])

  // Auto-rotate every 5.5 seconds
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextSlide, 5500)
    return () => clearInterval(interval)
  }, [nextSlide, isPaused])

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover scale-105 ${slide.brightness}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Slide Content with Fade Transition */}
        <div className="min-h-[320px] flex flex-col items-center justify-center">
          <h1 
            key={`title-${currentSlide}`}
            className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-wider text-white mb-4 animate-fade-in"
          >
            {slides[currentSlide].title}
          </h1>

          <p 
            key={`subtitle-${currentSlide}`}
            className="text-white text-lg md:text-xl lg:text-2xl font-light tracking-wide mb-4 animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            {slides[currentSlide].subtitle}
          </p>

          <p 
            key={`text-${currentSlide}`}
            className="text-white/80 text-sm md:text-base font-light tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            {slides[currentSlide].text}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#chi-siamo"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-foreground text-sm tracking-widest uppercase hover:bg-white/90 transition-all duration-300"
          >
            Scopri Florlife
          </Link>
          <Link
            href="/richiedi-accesso"
            className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-foreground transition-all duration-300"
          >
            Richiedi accesso
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white transition-colors"
        aria-label="Slide precedente"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white transition-colors"
        aria-label="Slide successiva"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 transition-all duration-500 ${
              index === currentSlide 
                ? "w-10 bg-white" 
                : "w-4 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Vai alla slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <ArrowDown className="h-5 w-5 text-white/40 animate-bounce" />
      </div>
    </section>
  )
}
