import Link from "next/link"

const markets = [
  {
    title: "Produzione Locale",
    description: "Collaboriamo ogni giorno con produttori di Sanremo, Piemonte, Toscana, Campania e Puglia per offrire fiori stagionali di alta qualità.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9040-AlgJzQvFM7b76YLO6lzy3icPE7BKN1.jpeg",
  },
  {
    title: "Asta Olandese",
    description: "Accesso quotidiano ai principali mercati floricoli olandesi attraverso acquisti diretti in asta.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9043-yXseACHkGhT1vRI4spK5WsoIV7Gv8N.jpeg",
  },
  {
    title: "Importazione Sud America",
    description: "Rose, alstroemeria, garofani e gypsophila provenienti da Ecuador e Colombia.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_1427-KsFh4KyCYhBFRbn02kjwGnfJGgemO4.jpeg",
  },
  {
    title: "Piante da Interno ed Esterno",
    description: "Selezione professionale di piante da interno ed esterno per fioristi, garden center e rivenditori.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9082-GA8jZEMAH8VqcCIPVn9CSlmN2673LF.jpeg",
  },
  {
    title: "Fiori Recisi Premium",
    description: "Una selezione premium di fiori recisi scelti per qualità, durata e valore estetico.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5560-S4sw1qKppJmWBECAOfF7ke2MqNdw40.jpeg",
  },
]

export function MarketsSection() {
  return (
    <section id="mercati" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            I nostri mercati
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cinque aree di specializzazione per offrire ai professionisti del settore la massima scelta e qualità.
          </p>
        </div>

        {/* Cards Grid - 3 on first row, 2 centered on second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.slice(0, 3).map((market) => (
            <div
              key={market.title}
              className="group bg-card border border-border overflow-hidden hover:border-foreground/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={market.image}
                  alt={market.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl text-foreground mb-2">
                  {market.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {market.description}
                </p>
                <Link
                  href="/richiedi-accesso"
                  className="inline-flex items-center text-xs tracking-widest uppercase text-foreground hover:text-foreground/70 transition-colors"
                >
                  Scopri di più
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Second row - 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto lg:max-w-none lg:grid-cols-2 lg:px-[16.666%]">
          {markets.slice(3, 5).map((market) => (
            <div
              key={market.title}
              className="group bg-card border border-border overflow-hidden hover:border-foreground/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={market.image}
                  alt={market.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl text-foreground mb-2">
                  {market.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {market.description}
                </p>
                <Link
                  href="/richiedi-accesso"
                  className="inline-flex items-center text-xs tracking-widest uppercase text-foreground hover:text-foreground/70 transition-colors"
                >
                  Scopri di più
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
