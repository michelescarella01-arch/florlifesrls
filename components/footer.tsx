import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-20 md:py-24 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dac5076b-74bc-48a9-9074-051c803c7763-oC6dbnX5bLg3NuEgCFBxD4H9BOyvEt.jpeg"
                alt="Florlife - Import Export Sanremo Genova"
                className="h-20 w-auto"
              />
            </Link>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Fiori recisi · Verde ornamentale · Piante · Importazione diretta
            </p>
          </div>

          {/* Sanremo */}
          <div>
            <p className="text-sm font-medium tracking-wide text-foreground mb-4">
              Florlife Sanremo
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Via Quinto Mansuino, Box 5</p>
              <p>18038 Sanremo (IM)</p>
              <div className="pt-2 space-y-2">
                <a 
                  href="tel:+393343491273" 
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  +39 334 349 1273
                </a>
                <a 
                  href="mailto:infosr@florlifesrl.com" 
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  infosr@florlifesrl.com
                </a>
              </div>
            </div>
          </div>

          {/* Genova */}
          <div>
            <p className="text-sm font-medium tracking-wide text-foreground mb-4">
              Florlife Genova
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Via Luigi Perini 26/28</p>
              <p>16152 Genova (GE)</p>
              <div className="pt-2 space-y-2">
                <a 
                  href="tel:+393757716820" 
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  +39 375 771 6820
                </a>
                <a 
                  href="mailto:infoge@florlifesrl.com" 
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  infoge@florlifesrl.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-medium tracking-wide text-foreground mb-4">
              Navigazione
            </p>
            <nav className="space-y-3 text-sm text-muted-foreground">
              <Link href="/" className="block hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="#mercati" className="block hover:text-foreground transition-colors">
                Mercati
              </Link>
              <Link href="/stagionalita" className="block hover:text-foreground transition-colors">
                Stagionalità
              </Link>
              <Link href="#area-professionisti" className="block hover:text-foreground transition-colors">
                Area Professionisti
              </Link>
              <Link href="/richiedi-accesso" className="block hover:text-foreground transition-colors">
                Richiedi Accesso
              </Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-medium tracking-wide text-foreground mb-4">
              Link Utili
            </p>
            <nav className="space-y-3 text-sm text-muted-foreground">
              <Link href="#sedi" className="block hover:text-foreground transition-colors">
                Le Nostre Sedi
              </Link>
              <Link href="#chi-siamo" className="block hover:text-foreground transition-colors">
                Chi Siamo
              </Link>
              <Link href="#calendario" className="block hover:text-foreground transition-colors">
                Calendario Arrivi
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Florlife S.r.l. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
