"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="chi-siamo" className="py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div 
            className={`relative aspect-[4/5] overflow-hidden transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9039-ofXCHA0UffQlUBtaYt1SyMVjg07WAt.jpeg"
              alt="Sanremo - La Riviera dei Fiori"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className={`lg:pl-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <p className="text-sm tracking-widest uppercase text-muted-foreground mb-6">
              Le nostre radici
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-10 text-balance">
              Dalla Riviera dei Fiori ai mercati europei.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              Florlife nasce a Sanremo, nel cuore della Riviera dei Fiori. Da qui abbiamo 
              costruito nel tempo una rete di produttori locali, partner internazionali e 
              mercati specializzati, con l&apos;obiettivo di offrire ai professionisti un 
              prodotto fresco, selezionato e disponibile con continuità.
            </p>
            <div className="mt-16 flex gap-16">
              <div>
                <p className="font-serif text-5xl text-foreground">25+</p>
                <p className="text-sm text-muted-foreground mt-2">Anni di esperienza</p>
              </div>
              <div>
                <p className="font-serif text-5xl text-foreground">2</p>
                <p className="text-sm text-muted-foreground mt-2">Sedi operative</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
