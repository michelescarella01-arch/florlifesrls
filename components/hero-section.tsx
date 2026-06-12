"use client"

import Link from "next/link"
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { useFlorlifeLang } from "@/lib/use-florlife-lang"

const slides = [
  {
    title: { it: "PRODUZIONE LOCALE", en: "LOCAL PRODUCTION" },
    subtitle: { it: "Dal cuore della Riviera dei Fiori.", en: "From the heart of the Riviera dei Fiori." },
    text: {
      it: "Collaboriamo ogni giorno con produttori di Sanremo, Piemonte, Toscana, Campania e Puglia.",
      en: "Every day, we work with growers from Sanremo, Piedmont, Tuscany, Campania and Puglia.",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9172-GY1JHSjR2ZzaxGGMP4Tk0nLFMa7Rfx.jpeg",
    brightness: "brightness-100",
  },
  {
    title: { it: "IMPORTAZIONE SUD AMERICA", en: "SOUTH AMERICAN IMPORTS" },
    subtitle: {
      it: "Rose, Alstroemeria, Garofani e Gypsophila.",
      en: "Roses, Alstroemeria, Carnations and Gypsophila.",
    },
    text: {
      it: "Arrivi diretti da Ecuador e Colombia.",
      en: "Direct arrivals from Ecuador and Colombia.",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9080-MW15gvth1ozEQ5xfYSYGVmypwzeTKt.jpeg",
    brightness: "brightness-100",
  },
  {
    title: { it: "ASTA OLANDESE", en: "DUTCH AUCTION" },
    subtitle: {
      it: "Accesso quotidiano ai principali mercati floricoli europei.",
      en: "Daily access to the main European flower markets.",
    },
    text: {
      it: "Disponibilità aggiornata e ampia scelta di prodotto.",
      en: "Updated availability and a wide product selection.",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9098-ZCbTxnziGYcf9YMBwU5FJtmX9fBkXt.jpeg",
    brightness: "brightness-100",
  },
  {
    title: { it: "VERDE ORNAMENTALE", en: "ORNAMENTAL GREENERY" },
    subtitle: {
      it: "Disponibilità costante durante tutto l'anno.",
      en: "Reliable availability throughout the year.",
    },
    text: {
      it: "Eucalipto, Gunny, Pittosporo, Ruscus e molto altro.",
      en: "Eucalyptus, Gunny, Pittosporum, Ruscus and much more.",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9035-3IOZtFbv11ndOvvpk7m5TfftYGQTbE.jpeg",
    brightness: "brightness-125",
  },
  {
    title: { it: "PIANTE DA INTERNO ED ESTERNO", en: "INDOOR AND OUTDOOR PLANTS" },
    subtitle: {
      it: "Una selezione professionale per il settore floricolo.",
      en: "A professional selection for the flower industry.",
    },
    text: {
      it: "Piante selezionate per fioristi, garden center e rivenditori.",
      en: "Plants selected for florists, garden centers and professional retailers.",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9082-GA8jZEMAH8VqcCIPVn9CSlmN2673LF.jpeg",
    brightness: "brightness-100",
  },
]

export function HeroSection() {
  const { lang } = useFlorlifeLang()
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
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title[lang]}
            className={`w-full h-full object-cover scale-105 ${slide.brightness}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
      ))}

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="min-h-[320px] flex flex-col items-center justify-center">
          <h1
            key={`title-${currentSlide}-${lang}`}
            className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-wider text-white mb-4 animate-fade-in"
          >
            {slides[currentSlide].title[lang]}
          </h1>

          <p
            key={`subtitle-${currentSlide}-${lang}`}
            className="text-white text-lg md:text-xl lg:text-2xl font-light tracking-wide mb-4 animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            {slides[currentSlide].subtitle[lang]}
          </p>

          <p
            key={`text-${currentSlide}-${lang}`}
            className="text-white/80 text-sm md:text-base font-light tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            {slides[currentSlide].text[lang]}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#chi-siamo"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-foreground text-sm tracking-widest uppercase hover:bg-white/90 transition-all duration-300"
          >
            {lang === "it" ? "Scopri Florlife" : "Discover Florlife"}
          </Link>
          <Link
            href="/richiedi-accesso"
            className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-foreground transition-all duration-300"
          >
            {lang === "it" ? "Richiedi accesso" : "Request access"}
          </Link>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white transition-colors"
        aria-label={lang === "it" ? "Slide precedente" : "Previous slide"}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/60 hover:text-white transition-colors"
        aria-label={lang === "it" ? "Slide successiva" : "Next slide"}
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 transition-all duration-500 ${
              index === currentSlide ? "w-10 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={lang === "it" ? `Vai alla slide ${index + 1}` : `Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <ArrowDown className="h-5 w-5 text-white/40 animate-bounce" />
      </div>
    </section>
  )
}
