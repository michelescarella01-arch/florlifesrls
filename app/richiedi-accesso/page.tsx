"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

export default function RichiediAccessoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-accent" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Grazie per la tua richiesta
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            Il nostro team verificherà i dati inviati e ti contatterà.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dac5076b-74bc-48a9-9074-051c803c7763-oC6dbnX5bLg3NuEgCFBxD4H9BOyvEt.jpeg"
                alt="Florlife"
                className="h-12 w-auto"
              />
            </Link>
            <Link
              href="/"
              className="text-sm tracking-wide uppercase text-foreground hover:opacity-70 transition-opacity flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna al sito
            </Link>
          </div>
        </nav>
      </header>

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Accesso professionale Florlife
            </h1>
            <p className="text-muted-foreground text-lg">
              L&apos;accesso ai servizi Florlife è riservato ai professionisti del settore.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ragione Sociale */}
            <div>
              <label
                htmlFor="ragioneSociale"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                Ragione Sociale *
              </label>
              <input
                type="text"
                id="ragioneSociale"
                name="ragioneSociale"
                required
                className="w-full px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                placeholder="Nome azienda"
              />
            </div>

            {/* Partita IVA */}
            <div>
              <label
                htmlFor="partitaIva"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                Partita IVA *
              </label>
              <input
                type="text"
                id="partitaIva"
                name="partitaIva"
                required
                className="w-full px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                placeholder="IT00000000000"
              />
            </div>

            {/* Nome e Cognome */}
            <div>
              <label
                htmlFor="nomeCognome"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                Nome e Cognome *
              </label>
              <input
                type="text"
                id="nomeCognome"
                name="nomeCognome"
                required
                className="w-full px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                placeholder="Mario Rossi"
              />
            </div>

            {/* Telefono */}
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                Telefono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                className="w-full px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                placeholder="+39 000 000 0000"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                placeholder="email@azienda.it"
              />
            </div>

            {/* Città */}
            <div>
              <label
                htmlFor="citta"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                Città *
              </label>
              <input
                type="text"
                id="citta"
                name="citta"
                required
                className="w-full px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                placeholder="Milano"
              />
            </div>

            {/* Messaggio */}
            <div>
              <label
                htmlFor="messaggio"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                Messaggio
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                rows={4}
                className="w-full px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors resize-none"
                placeholder="Informazioni aggiuntive (opzionale)"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-4 pt-4">
              <input
                type="checkbox"
                id="conferma"
                name="conferma"
                required
                className="mt-1 w-5 h-5 border border-border bg-transparent checked:bg-foreground checked:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
              <label htmlFor="conferma" className="text-foreground text-sm">
                Confermo di essere un operatore professionale del settore.
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-12 py-5 bg-foreground text-background text-sm tracking-widest uppercase hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Invio in corso..." : "Richiedi accesso"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
