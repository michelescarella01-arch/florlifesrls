"use client"

import { useEffect, useState } from "react"

export type FlorlifeLang = "it" | "en"

export function useFlorlifeLang() {
  const [lang, setLang] = useState<FlorlifeLang>("it")

  useEffect(() => {
    const saved = localStorage.getItem("florlife-lang")
    if (saved === "it" || saved === "en") setLang(saved)

    const handler = (event: Event) => {
      const custom = event as CustomEvent<FlorlifeLang>
      setLang(custom.detail)
    }

    window.addEventListener("florlife-language-change", handler)
    return () => window.removeEventListener("florlife-language-change", handler)
  }, [])

  const changeLang = (nextLang: FlorlifeLang) => {
    setLang(nextLang)
    localStorage.setItem("florlife-lang", nextLang)
    window.dispatchEvent(new CustomEvent("florlife-language-change", { detail: nextLang }))
  }

  return { lang, changeLang }
}
