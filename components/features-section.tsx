"use client"

import { useEffect, useRef, useState } from "react"
import { Globe, Leaf, Package, MapPin, Clock, Users } from "lucide-react"
import { useFlorlifeLang } from "@/lib/use-florlife-lang"

const reasons = [
  {
    icon: Globe,
    title: { it: "Accesso diretto ai mercati europei", en: "Direct access to European markets" },
    description: {
      it: "Acquistiamo direttamente dalle aste olandesi e dai principali mercati floricoli europei.",
      en: "We purchase directly from Dutch auctions and the main European flower markets.",
    },
  },
  {
    icon: Leaf,
    title: { it: "Produzione italiana selezionata", en: "Selected Italian production" },
    description: {
      it: "Collaboriamo con i migliori produttori della Riviera dei Fiori e delle altre regioni italiane.",
      en: "We work with selected growers from the Riviera dei Fiori and other Italian regions.",
    },
  },
  {
    icon: Package,
    title: { it: "Ampia disponibilità quotidiana", en: "Wide daily availability" },
    description: {
      it: "Ogni giorno offriamo un assortimento vasto e aggiornato di fiori, piante e verde ornamentale.",
      en: "Every day we offer a wide and updated assortment of flowers, plants and ornamental greenery.",
    },
  },
  {
    icon: MapPin,
    title: { it: "Due sedi operative", en: "Two operating locations" },
    description: {
      it: "Con Sanremo e Genova copriamo un ampio territorio, garantendo rapidità nelle consegne.",
      en: "With Sanremo and Genoa, we cover a wide area and ensure fast deliveries.",
    },
  },
  {
    icon: Clock,
    title: { it: "Esperienza nel settore floricolo", en: "Experience in the flower industry" },
    description: {
      it: "Oltre 25 anni di attività e relazioni solide con produttori e clienti in tutta Europa.",
      en: "Over 25 years of activity and strong relationships with growers and customers across Europe.",
    },
  },
  {
    icon: Users,
    title: { it: "Supporto dedicato ai professionisti", en: "Dedicated professional support" },
    description: {
      it: "Il nostro team assiste fioristi, garden center e rivenditori con competenza e attenzione.",
      en: "Our team supports florists, garden centers and retailers with experience and care.",
    },
  },
]

export function FeaturesSection() {
  const { lang } = useFlorlifeLang()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-6 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-sm tracking-widest uppercase text-background/50 mb-6">
            {lang === "it" ? "I nostri punti di forza" : "Our strengths"}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background">
            {lang === "it" ? "Perché scegliere Florlife" : "Why choose Florlife"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={reason.title.it}
                className={`group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="mb-6">
                  <Icon className="h-8 w-8 text-background/70 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-serif text-xl text-background mb-4 text-balance">
                  {reason.title[lang]}
                </h3>
                <p className="text-background/60 text-sm leading-relaxed">
                  {reason.description[lang]}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
