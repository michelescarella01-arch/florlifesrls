"use client"

import { Snowflake, Warehouse, Users, Scissors } from "lucide-react"
import { useFlorlifeLang } from "@/lib/use-florlife-lang"

const points = [
  {
    icon: Warehouse,
    title: { it: "Spazi operativi", en: "Working spaces" },
    text: {
      it: "Mettiamo a disposizione aree dedicate all'interno dei nostri magazzini per preparazioni, composizioni e lavori su ordinazione.",
      en: "We provide dedicated areas inside our warehouses for preparation, arrangements and custom work.",
    },
  },
  {
    icon: Snowflake,
    title: { it: "Celle frigo disponibili", en: "Cold storage available" },
    text: {
      it: "I prodotti possono essere conservati in celle frigo professionali, mantenendo freschezza e qualità fino al momento della consegna.",
      en: "Products can be stored in professional cold rooms, preserving freshness and quality until delivery.",
    },
  },
  {
    icon: Scissors,
    title: { it: "Ideale per eventi", en: "Ideal for events" },
    text: {
      it: "Una soluzione pensata per fioristi e wedding planner che devono gestire allestimenti, matrimoni ed eventi importanti.",
      en: "A solution designed for florists and wedding planners handling setups, weddings and important events.",
    },
  },
  {
    icon: Users,
    title: { it: "Supporto Florlife", en: "Florlife support" },
    text: {
      it: "Il nostro team resta a disposizione per prodotto, logistica, ritiro e organizzazione del materiale.",
      en: "Our team remains available for product support, logistics, pickup and material organization.",
    },
  },
]

export function WorkspaceSection() {
  const { lang } = useFlorlifeLang()

  return (
    <section className="py-24 md:py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
              {lang === "it" ? "Spazi per professionisti" : "Spaces for professionals"}
            </p>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
              {lang === "it"
                ? "Lavora direttamente nei nostri magazzini."
                : "Work directly inside our warehouses."}
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              {lang === "it"
                ? "Offriamo a fioristi e wedding planner la possibilità di utilizzare spazi dedicati all'interno delle nostre sedi, con celle frigo comprese, per organizzare e preparare lavori floreali in modo pratico e professionale."
                : "We offer florists and wedding planners the possibility to use dedicated spaces inside our locations, including cold storage, to organize and prepare floral work in a practical and professional environment."}
            </p>

            <a
              href="/richiedi-accesso"
              className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background text-sm tracking-widest uppercase hover:bg-foreground/90 transition-all"
            >
              {lang === "it" ? "Richiedi informazioni" : "Request information"}
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {points.map((point) => {
              const Icon = point.icon

              return (
                <div
                  key={point.title.it}
                  className="bg-background border border-border p-7 hover:border-foreground/20 transition-all"
                >
                  <Icon className="h-7 w-7 text-muted-foreground mb-6" />
                  <h3 className="font-serif text-xl text-foreground mb-3">
                    {point.title[lang]}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {point.text[lang]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
