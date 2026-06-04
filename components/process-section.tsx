"use client"

import { useEffect, useRef, useState } from "react"

const pillars = [
  {
    title: "Produzione",
    subtitle: "Italia",
  },
  {
    title: "Importazione",
    subtitle: "Olanda · Sud America",
  },
  {
    title: "Distribuzione",
    subtitle: "Sanremo · Genova",
  },
]

export function ProcessSection() {
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
    <section ref={sectionRef} id="come-lavoriamo" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9044-PMYmCSKE2YoeHU6ICNmaMJIQlcUlqQ.jpeg"
          alt="Magazzino fiori Florlife"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-32 md:py-48 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div 
            className={`text-center mb-24 md:mb-32 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-[1.1] tracking-tight">
              Ogni giorno nei principali<br />mercati floricoli
            </h2>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {pillars.map((pillar, index) => (
              <div 
                key={pillar.title}
                className={`bg-black/40 backdrop-blur-sm p-12 md:p-16 text-center transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                  {pillar.title}
                </h3>
                <p className="text-white/60 text-sm tracking-[0.2em] uppercase">
                  {pillar.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
