"use client"

import Link from "next/link"
import { useFlorlifeLang } from "@/lib/use-florlife-lang"

const markets = [
  {
    title: { it: "Produzione Locale", en: "Local Production" },
    description: {
      it: "Collaboriamo ogni giorno con produttori di Sanremo, Piemonte, Toscana, Campania e Puglia per offrire fiori stagionali di alta qualità.",
      en: "Every day, we work with growers from Sanremo, Piedmont, Tuscany, Campania and Puglia to offer high-quality seasonal flowers.",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9040-AlgJzQvFM7b76YLO6lzy3icPE7BKN1.jpeg",
  },
  {
    title: { it: "Asta Olandese", en: "Dutch Auction" },
    description: {
      it: "Accesso quotidiano ai principali mercati floricoli olandesi attraverso acquisti diretti in asta.",
      en: "Daily access to the main Dutch flower markets through direct auction purchasing.",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9043-yXseACHkGhT1vRI4spK5WsoIV7Gv8N.jpeg",
  },
  {
    title: { it: "Importazione Sud America", en: "South American Imports" },
    description: {
      it: "Rose, alstroemeria, garofani e gypsophila provenienti da Ecuador e Colombia.",
      en: "Roses, alstroemeria, carnations and gypsophila sourced from Ecuador and Colombia.",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_1427-KsFh4KyCYhBFRbn02kjwGnfJGgemO4.jpeg",
  },
  {
    title: { it: "Piante da Interno ed Esterno", en: "Indoor and Outdoor Plants" },
    description: {
      it: "Selezione professionale di piante da interno ed esterno per fioristi, garden center e rivenditori.",
      en: "A professional selection of indoor and outdoor plants for florists, garden centers and retailers.",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9082-GA8jZEMAH8VqcCIPVn9CSlmN2673LF.jpeg",
  },
  {
    title: { it: "Fiori Recisi Premium", en: "Premium Cut Flowers" },
    description: {
      it: "Una selezione premium di fiori recisi scelti per qualità, durata e valore estetico.",
      en: "A premium selection of cut flowers chosen for quality, durability and aesthetic value.",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5560-S4sw1qKppJmWBECAOfF7ke2MqNdw40.jpeg",
  },
]

export function MarketsSection() {
  const { lang } = useFlorlifeLang()

  const t = {
    title: lang === "it" ? "I nostri mercati" : "Our markets",
    subtitle:
      lang === "it"
        ? "Cinque aree di specializzazione per offrire ai professionisti del settore la massima scelta e qualità."
        : "Five areas of specialization designed to offer industry professionals a wide choice and consistent quality.",
    cta: lang === "it" ? "Scopri di più" : "Discover more",
  }

  const MarketCard = ({ market }: { market: (typeof markets)[number] }) => (
    <div className="group bg-card border border-border overflow-hidden hover:border-foreground/20 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={market.image}
          alt={market.title[lang]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="font-serif text-xl text-foreground mb-2">
          {market.title[lang]}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {market.description[lang]}
        </p>
        <Link
          href="/richiedi-accesso"
          className="inline-flex items-center text-xs tracking-widest uppercase text-foreground hover:text-foreground/70 transition-colors"
        >
          {t.cta}
          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )

  return (
    <section id="mercati" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.slice(0, 3).map((market) => (
            <MarketCard key={market.title.it} market={market} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto lg:max-w-none lg:grid-cols-2 lg:px-[16.666%]">
          {markets.slice(3, 5).map((market) => (
            <MarketCard key={market.title.it} market={market} />
          ))}
        </div>
      </div>
    </section>
  )
}
