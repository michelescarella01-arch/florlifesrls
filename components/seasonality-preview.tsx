import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function SeasonalityPreview() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/30" />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Small decorative element */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-foreground/30" />
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Calendario annuale</span>
            <span className="w-8 h-px bg-foreground/30" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
          Guida alla Stagionalità
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Scopri quali prodotti sono disponibili durante l&apos;anno in base a origine, produzione e andamento dei mercati.
        </p>

        {/* CTA Button */}
        <Link
          href="/stagionalita"
          className="group inline-flex items-center gap-3 px-10 py-4 bg-foreground text-background text-sm tracking-widest uppercase hover:bg-foreground/90 transition-all"
        >
          Esplora la stagionalità
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
