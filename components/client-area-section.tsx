"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, UserPlus, Calendar, Globe } from "lucide-react"

const services = [
  {
    icon: UserPlus,
    title: "Richiedi Accesso",
    description: "L'accesso ai servizi Florlife è riservato ai professionisti del settore.",
    href: "/richiedi-accesso",
    cta: "Richiedi accesso",
  },
  {
    icon: Calendar,
    title: "Stagionalità",
    description: "Consulta la guida stagionale dei prodotti disponibili durante l'anno.",
    href: "/stagionalita",
    cta: "Vai alla stagionalità",
  },
  {
    icon: Globe,
    title: "Mercati",
    description: "Scopri provenienze, produzioni e mercati di riferimento.",
    href: "#mercati",
    cta: "Scopri i mercati",
  },
]

export function ClientAreaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="area-clienti" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Riservato ai professionisti
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Area Professionisti
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Servizi dedicati ai clienti Florlife
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className={`group p-8 lg:p-10 border border-border bg-card hover:border-foreground/20 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <Icon className="h-7 w-7 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* CTA */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm tracking-wide text-foreground hover:opacity-70 transition-opacity"
                >
                  {service.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
