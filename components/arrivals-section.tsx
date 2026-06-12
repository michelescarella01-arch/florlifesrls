"use client"

import { useEffect, useRef, useState } from "react"
import { useFlorlifeLang } from "@/lib/use-florlife-lang"

const days = [
  { short: "LUN", shortEn: "MON", full: { it: "Lunedì", en: "Monday" } },
  { short: "MAR", shortEn: "TUE", full: { it: "Martedì", en: "Tuesday" } },
  { short: "MER", shortEn: "WED", full: { it: "Mercoledì", en: "Wednesday" } },
  { short: "GIO", shortEn: "THU", full: { it: "Giovedì", en: "Thursday" } },
  { short: "VEN", shortEn: "FRI", full: { it: "Venerdì", en: "Friday" } },
  { short: "SAB", shortEn: "SAT", full: { it: "Sabato", en: "Saturday" } },
]

const arrivalsByDay: Record<string, string[]> = {
  LUN: ["Produzione locale"],
  MAR: ["Importazione Sud America", "Asta Olandese"],
  MER: ["Produzione locale"],
  GIO: ["Asta Olandese"],
  VEN: ["Produzione locale", "Importazione Sud America"],
  SAB: ["Asta Olandese"],
}

const labels: Record<string, { it: string; en: string }> = {
  "Produzione locale": { it: "Produzione locale", en: "Local production" },
  "Importazione Sud America": { it: "Importazione Sud America", en: "South American imports" },
  "Asta Olandese": { it: "Asta Olandese", en: "Dutch auction" },
}

const tagStyles: Record<string, string> = {
  "Produzione locale": "bg-emerald-600/10 text-emerald-700 border-emerald-600/20",
  "Importazione Sud America": "bg-amber-600/10 text-amber-700 border-amber-600/20",
  "Asta Olandese": "bg-orange-500/10 text-orange-700 border-orange-500/20",
}

export function ArrivalsSection() {
  const { lang } = useFlorlifeLang()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string>("LUN")

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const arrivals = arrivalsByDay[selectedDay] || []
  const selectedDayObject = days.find((d) => d.short === selectedDay)

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            {lang === "it" ? "Calendario Arrivi" : "Arrival Calendar"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {lang === "it" ? "Seleziona un giorno per vedere gli arrivi previsti." : "Select a day to view expected arrivals."}
          </p>
        </div>

        <div className={`flex justify-center gap-2 md:gap-3 mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "150ms" }}>
          {days.map((day) => (
            <button
              key={day.short}
              onClick={() => setSelectedDay(day.short)}
              className={`relative px-4 md:px-6 py-3 text-sm md:text-base tracking-wider transition-all duration-300 ${
                selectedDay === day.short ? "text-foreground" : "text-muted-foreground/60 hover:text-muted-foreground"
              }`}
            >
              {lang === "it" ? day.short : day.shortEn}
              {selectedDay === day.short && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-px bg-foreground transition-all" />
              )}
            </button>
          ))}
        </div>

        <div className={`min-h-[160px] flex flex-col items-center justify-center transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "300ms" }}>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            {selectedDayObject?.full[lang]}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {arrivals.map((arrival, index) => (
              <span
                key={arrival}
                className={`px-5 py-2.5 text-sm border rounded-sm transition-all duration-300 ${tagStyles[arrival]}`}
                style={{ animationDelay: `${index * 100}ms`, animation: "fade-in 0.4s ease-out forwards" }}
              >
                {labels[arrival][lang]}
              </span>
            ))}
          </div>
        </div>

        <p className={`text-center text-xs text-muted-foreground/70 mt-12 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "450ms" }}>
          {lang === "it"
            ? "Gli arrivi possono variare in base a disponibilità e condizioni logistiche."
            : "Arrivals may vary depending on availability and logistics conditions."}
        </p>
      </div>
    </section>
  )
}
