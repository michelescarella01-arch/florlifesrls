"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useFlorlifeLang } from "@/lib/use-florlife-lang"

export function SeasonalityPreview() {
  const { lang } = useFlorlifeLang()

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/30" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-foreground/30" />
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {lang === "it" ? "Calendario annuale" : "Annual calendar"}
            </span>
            <span className="w-8 h-px bg-foreground/30" />
          </div>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
          {lang === "it" ? "Guida alla Stagionalità" : "Seasonality Guide"}
        </h2>

        <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
          {lang === "it"
            ? "Scopri quali prodotti sono disponibili durante l'anno in base a origine, produzione e andamento dei mercati."
            : "Discover which products are available throughout the year according to origin, production and market trends."}
        </p>

        <Link
          href="/stagionalita"
          className="group inline-flex items-center gap-3 px-10 py-4 bg-foreground text-background text-sm tracking-widest uppercase hover:bg-foreground/90 transition-all"
        >
          {lang === "it" ? "Esplora la stagionalità" : "Explore seasonality"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
