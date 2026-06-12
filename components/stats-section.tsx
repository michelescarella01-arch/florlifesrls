"use client"

import { useEffect, useRef, useState } from "react"
import { useFlorlifeLang } from "@/lib/use-florlife-lang"

const stats = [
  { value: 500, suffix: "+", label: { it: "Km coperti dalle consegne", en: "Km covered by deliveries" } },
  { value: 9, suffix: "", label: { it: "Canali di approvvigionamento", en: "Sourcing channels" } },
  { value: 6, suffix: "", label: { it: "Arrivi settimanali", en: "Weekly arrivals" } },
  { value: 365, suffix: "", label: { it: "Giorni al servizio dei professionisti", en: "Days serving professionals" } },
]

function AnimatedNumber({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const duration = 1500
    const steps = 40
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, isVisible])

  return <span className="tabular-nums">{count}{suffix}</span>
}

export function StatsSection() {
  const { lang } = useFlorlifeLang()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.3 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label.it}
              className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="font-serif text-4xl md:text-5xl text-foreground mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <p className="text-sm text-muted-foreground tracking-wide">
                {stat.label[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
