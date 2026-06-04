"use client"

import { useEffect, useRef, useState } from "react"
import { Globe, Leaf, Package, MapPin, Clock, Users } from "lucide-react"

const reasons = [
  {
    icon: Globe,
    title: "Accesso diretto ai mercati europei",
    description: "Acquistiamo direttamente dalle aste olandesi e dai principali mercati floricoli europei.",
  },
  {
    icon: Leaf,
    title: "Produzione italiana selezionata",
    description: "Collaboriamo con i migliori produttori della Riviera dei Fiori e delle altre regioni italiane.",
  },
  {
    icon: Package,
    title: "Ampia disponibilità quotidiana",
    description: "Ogni giorno offriamo un assortimento vasto e aggiornato di fiori, piante e verde ornamentale.",
  },
  {
    icon: MapPin,
    title: "Due sedi operative",
    description: "Con Sanremo e Genova copriamo un ampio territorio, garantendo rapidità nelle consegne.",
  },
  {
    icon: Clock,
    title: "Esperienza nel settore floricolo",
    description: "Oltre 25 anni di attività e relazioni solide con produttori e clienti in tutta Europa.",
  },
  {
    icon: Users,
    title: "Supporto dedicato ai professionisti",
    description: "Il nostro team assiste fioristi, garden center e rivenditori con competenza e attenzione.",
  },
]

export function FeaturesSection() {
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
    <section ref={sectionRef} className="py-32 md:py-48 px-6 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm tracking-widest uppercase text-background/50 mb-6">
            I nostri punti di forza
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background">
            Perché scegliere Florlife
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div 
                key={reason.title} 
                className={`group transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <Icon className="h-8 w-8 text-background/70 transition-transform duration-300 group-hover:scale-110" />
                </div>
                
                {/* Title */}
                <h3 className="font-serif text-xl text-background mb-4 text-balance">
                  {reason.title}
                </h3>
                
                {/* Description */}
                <p className="text-background/60 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
