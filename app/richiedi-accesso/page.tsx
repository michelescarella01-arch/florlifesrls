"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { useFlorlifeLang } from "@/lib/use-florlife-lang"

export default function RichiediAccessoPage() {
  const { lang } = useFlorlifeLang()
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
            {lang === "it" ? "Grazie per la tua richiesta" : "Thank you for your request"}
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            {lang === "it" ? "Il nostro team verificherà i dati inviati e ti contatterà." : "Our team will review the submitted details and contact you."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "it" ? "Torna alla home" : "Back to home"}
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
              {lang === "it" ? "Torna al sito" : "Back to website"}
            </Link>
          </div>
        </nav>
      </header>

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              {lang === "it" ? "Accesso professionale Florlife" : "Florlife professional access"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {lang === "it" ? "L’accesso ai servizi Florlife è riservato ai professionisti del settore." : "Access to Florlife services is reserved for industry professionals."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* {lang === "it" ? "Ragione Sociale *" : "Company name *"}/}
            <div>
              <label
                htmlFor="ragioneSociale"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                {lang === "it" ? "Ragione Sociale *" : "Company name *"}
              </label>
              <input
                type="text"
                id="ragioneSociale"
                name="ragioneSociale"
                required
                className="w-full px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                placeholder={lang === "it" ? "Nome azienda" : "Company name"}
              />
            </div>

            {/* {lang === "it" ? "Partita IVA *" : "VAT number *"}/}
            <div>
              <label
                htmlFor="partitaIva"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                {lang === "it" ? "Partita IVA *" : "VAT number *"}
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

            {/* {lang === "it" ? "Nome e Cognome *" : "Full name *"}/}
            <div>
              <label
                htmlFor="nomeCognome"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                {lang === "it" ? "Nome e Cognome *" : "Full name *"}
              </label>
              <input
                type="text"
                id="nomeCognome"
                name="nomeCognome"
                required
                className="w-full px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                placeholder={lang === "it" ? "Mario Rossi" : "John Smith"}
              />
            </div>

            {/* {lang === "it" ? "Telefono *" : "Phone *"}/}
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                {lang === "it" ? "Telefono *" : "Phone *"}
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

            {/* {lang === "it" ? "Città *" : "City *"}/}
            <div>
              <label
                htmlFor="citta"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                {lang === "it" ? "Città *" : "City *"}
              </label>
              <input
                type="text"
                id="citta"
                name="citta"
                required
                className="w-full px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                placeholder={lang === "it" ? "Milano" : "Milan"}
              />
            </div>

            {/* {lang === "it" ? "Messaggio" : "Message"} */}
            <div>
              <label
                htmlFor="messaggio"
                className="block text-sm tracking-wide uppercase text-muted-foreground mb-3"
              >
                {lang === "it" ? "Messaggio" : "Message"}
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                rows={4}
                className="w-full px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors resize-none"
                placeholder={lang === "it" ? "Informazioni aggiuntive (opzionale)" : "Additional information (optional)"}
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
                {lang === "it" ? "Confermo di essere un operatore professionale del settore." : "I confirm that I am an industry professional."}
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-12 py-5 bg-foreground text-background text-sm tracking-widest uppercase hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (lang === "it" ? "Invio in corso..." : "Sending...") : (lang === "it" ? "Richiedi accesso" : "Request access")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
