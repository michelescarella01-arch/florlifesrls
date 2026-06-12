
"use client"

import { useEffect, useRef, useState } from "react"

import { useFlorlifeLang } from "@/lib/use-florlife-lang"

const content = {

  it: {

    eyebrow: "Le nostre radici",

    title: "Dalla Riviera dei Fiori ai mercati europei.",

    text: "Florlife nasce a Sanremo, nel cuore della Riviera dei Fiori. Da qui abbiamo costruito nel tempo una rete di produttori locali, partner internazionali e mercati specializzati, con l'obiettivo di offrire ai professionisti un prodotto fresco, selezionato e disponibile con continuità.",

    years: "Anni di esperienza",

    locations: "Sedi operative",

    imageAlt: "Sanremo - La Riviera dei Fiori",

  },

  en: {

    eyebrow: "Our roots",

    title: "From the Riviera dei Fiori to the European markets.",

    text: "Florlife was born in Sanremo, in the heart of the Riviera dei Fiori. From here, we have built a network of local growers, international partners and specialized markets with the aim of offering professionals fresh, selected products with reliable availability.",

    years: "Years of experience",

    locations: "Operating locations",

    imageAlt: "Sanremo - The Riviera dei Fiori",

  },

}

export function AboutSection() {

  const { lang } = useFlorlifeLang()

  const sectionRef = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)

  const t = content[lang]

  useEffect(() => {

    const observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) setIsVisible(true)

      },

      { threshold: 0.2 }

    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()

  }, [])

  return (

    <section ref={sectionRef} id="chi-siamo" className="py-32 md:py-48 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div

            className={`relative aspect-[4/5] overflow-hidden transition-all duration-1000 ${

              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"

            }`}

          >

            <img

              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9039-ofXCHA0UffQlUBtaYt1SyMVjg07WAt.jpeg"

              alt={t.imageAlt}

              className="w-full h-full object-cover"

            />

          </div>

          <div

            className={`lg:pl-8 transition-all duration-1000 delay-200 ${

              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"

            }`}

          >

            <p className="text-sm tracking-widest uppercase text-muted-foreground mb-6">

              {t.eyebrow}

            </p>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-10 text-balance">

              {t.title}

            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">

              {t.text}

            </p>

            <div className="mt-16 flex gap-16">

              <div>

                <p className="font-serif text-5xl text-foreground">25+</p>

                <p className="text-sm text-muted-foreground mt-2">{t.years}</p>

              </div>

              <div>

                <p className="font-serif text-5xl text-foreground">2</p>

                <p className="text-sm text-muted-foreground mt-2">{t.locations}</p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}

