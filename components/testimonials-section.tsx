"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Marco",
    profession: "Fiorista",
    quote: "Lavoriamo con Florlife da anni. Sapere di poter contare ogni mattina su disponibilità, qualità e puntualità ci permette di concentrarci sul nostro lavoro e sui nostri clienti.",
  },
  {
    name: "Laura",
    profession: "Fiorista per Eventi",
    quote: "Quando organizziamo matrimoni ed eventi importanti abbiamo bisogno di affidabilità. Florlife ci garantisce continuità e una scelta sempre all'altezza delle richieste.",
  },
  {
    name: "Andrea",
    profession: "Garden Center",
    quote: "Apprezziamo la varietà dell'assortimento e la possibilità di trovare sia prodotto locale che importazione. È un partner che ci accompagna durante tutto l'anno.",
  },
  {
    name: "Chiara",
    profession: "Fiorista",
    quote: "Non è solo una questione di prodotto. La differenza la fanno la disponibilità, i consigli e la rapidità con cui vengono gestite le richieste.",
  },
  {
    name: "Stefano",
    profession: "Vivaio",
    quote: "Negli anni abbiamo costruito un rapporto di fiducia. Sappiamo che dietro ogni ordine c'è attenzione, esperienza e una reale conoscenza del settore.",
  },
  {
    name: "Giulia",
    profession: "Fiorista per Eventi",
    quote: "Per noi è fondamentale poter offrire ai clienti fiori sempre freschi e selezionati. Florlife è diventato un riferimento importante per il nostro lavoro.",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Cosa dicono di noi
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto" />
        </div>

        {/* Slider Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Cards */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className={`transition-all duration-700 ease-out ${
                    index === currentIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 absolute pointer-events-none translate-x-8"
                  }`}
                  style={{ display: index === currentIndex ? "block" : "none" }}
                >
                  <div className="bg-card p-12 md:p-16 shadow-sm border border-border/30">
                    {/* Quote Mark */}
                    <div className="mb-8">
                      <span className="font-serif text-8xl text-secondary/30 leading-none">"</span>
                    </div>

                    {/* Quote */}
                    <blockquote className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed mb-12 -mt-8">
                      {testimonial.quote}
                    </blockquote>

                    {/* Attribution */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px bg-secondary" />
                      <div>
                        <p className="text-foreground font-medium tracking-wide">
                          {testimonial.name}
                        </p>
                        <p className="text-muted-foreground text-sm tracking-wide">
                          {testimonial.profession}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors"
            aria-label="Testimonianza precedente"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors"
            aria-label="Testimonianza successiva"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-foreground w-8"
                  : "bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Vai alla testimonianza ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
