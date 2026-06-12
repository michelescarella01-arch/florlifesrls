"use client"

import { useEffect, useRef, useState } from "react"

const categories = [
  {
    flag: "🇮🇹",
    title: "Produzione Italiana",
    description: "Dalla Riviera dei Fiori",
  },
  {
    flag: "🇳🇱",
    title: "Importazione Olandese",
    description: "Asta diretta ogni giorno",
  },
  {
    flags: ["🇪🇨", "🇨🇴"],
    title: "Importazione Sud America",
    description: "Rose e varietà premium",
  },
  {
    icon: "🌿",
    title: "Verde Ornamentale",
    description: "Eucalipto, ruscus e fogliame",
  },
]

export function IntroSection() {
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
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className={`group relative p-8 md:p-10 border border-border/50 hover:border-foreground/30 transition-all duration-500 cursor-default ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Flag/Icon */}
              <div className="text-3xl md:text-4xl mb-6 transition-transform duration-300 group-hover:scale-110">
                {"flags" in category ? (
                  <span>{category.flags.join(" ")}</span>
                ) : "flag" in category ? (
                  <span>{category.flag}</span>
                ) : (
                  <span>{category.icon}</span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg md:text-xl text-foreground mb-2">
                {category.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm">
                {category.description}
              </p>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
