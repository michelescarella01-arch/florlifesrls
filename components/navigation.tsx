"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useFlorlifeLang } from "@/lib/use-florlife-lang"

const navItems = {
  it: [
    { label: "Chi siamo", href: "#chi-siamo" },
    { label: "I nostri mercati", href: "#mercati" },
    { label: "Stagionalità", href: "/stagionalita" },
    { label: "Sedi", href: "#sedi" },
  ],
  en: [
    { label: "About us", href: "#chi-siamo" },
    { label: "Our markets", href: "#mercati" },
    { label: "Seasonality", href: "/stagionalita" },
    { label: "Locations", href: "#sedi" },
  ],
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, changeLang } = useFlorlifeLang()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const clientAreaLabel = lang === "it" ? "Area clienti" : "Client area"

  const LanguageSwitch = () => (
    <div
      className={`flex items-center gap-1 px-6 py-2.5 text-sm tracking-wide uppercase border transition-all ${
        scrolled
          ? "border-foreground text-foreground hover:bg-foreground hover:text-background"
          : "border-white text-white hover:bg-white hover:text-foreground"
      }`}
    >
      <button
        onClick={() => changeLang("it")}
        className={lang === "it" ? "font-semibold opacity-100" : "opacity-50 hover:opacity-80"}
      >
        IT
      </button>
      <span className="opacity-40">/</span>
      <button
        onClick={() => changeLang("en")}
        className={lang === "en" ? "font-semibold opacity-100" : "opacity-50 hover:opacity-80"}
      >
        EN
      </button>
    </div>
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/florlife-logo-transparent.png"
              alt="Florlife - Import Export Sanremo Genova"
              className="h-16 w-auto transition-all"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems[lang].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide uppercase transition-colors hover:opacity-70 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <LanguageSwitch />

            <Link
              href="/richiedi-accesso"
              className={`px-6 py-2.5 text-sm tracking-wide uppercase border transition-all ${
                scrolled
                  ? "border-foreground text-foreground hover:bg-foreground hover:text-background"
                  : "border-white text-white hover:bg-white hover:text-foreground"
              }`}
            >
              {clientAreaLabel}
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 top-20 bg-background transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems[lang].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-serif text-3xl text-foreground hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <div className="flex items-center gap-2 border-2 border-foreground px-5 py-3 text-sm tracking-[0.18em] uppercase">
            <button onClick={() => changeLang("it")} className={lang === "it" ? "font-semibold" : "opacity-50"}>
              IT
            </button>
            <span className="opacity-40">/</span>
            <button onClick={() => changeLang("en")} className={lang === "en" ? "font-semibold" : "opacity-50"}>
              EN
            </button>
          </div>

          <Link
            href="/richiedi-accesso"
            onClick={() => setIsOpen(false)}
            className="mt-4 px-8 py-3 border border-foreground text-foreground text-sm tracking-wide uppercase hover:bg-foreground hover:text-background transition-all"
          >
            {clientAreaLabel}
          </Link>
        </div>
      </div>
    </header>
  )
}
