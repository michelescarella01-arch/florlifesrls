"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ArrowLeft, X } from "lucide-react"
import { useFlorlifeLang } from "@/lib/use-florlife-lang"

const monthsShort = {
  it: ["GEN", "FEB", "MAR", "APR", "MAG", "GIU", "LUG", "AGO", "SET", "OTT", "NOV", "DIC"],
  en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
}
const monthsFull = {
  it: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
}

// Seasonal featured products by month
const seasonalBanners: Record<number, { description: string; featured: string[] }> = {
  1: { description: "I fiori invernali più pregiati", featured: ["Ranuncoli", "Anemoni", "Tulipani", "Fresie"] },
  2: { description: "Prime fioriture e nuovi arrivi", featured: ["Ranuncoli", "Tulipani", "Mimosa", "Violacciocca"] },
  3: { description: "La primavera inizia a sbocciare", featured: ["Tulipani", "Fresie", "Ranuncoli", "Anemoni"] },
  4: { description: "Esplosione di colori primaverili", featured: ["Peonie", "Ranuncoli", "Tulipani", "Godezia"] },
  5: { description: "Il momento delle peonie", featured: ["Peonie", "Lisianthus", "Delphinium", "Calla"] },
  6: { description: "Estate alle porte", featured: ["Peonie", "Ortensie", "Agapanthus", "Girasoli"] },
  7: { description: "I colori caldi dell'estate", featured: ["Girasoli", "Ortensie", "Lisianthus", "Dalie"] },
  8: { description: "Fiori estivi al culmine", featured: ["Girasoli", "Ortensie", "Dalie", "Celosia"] },
  9: { description: "L'autunno si avvicina", featured: ["Dalie", "Ortensie", "Crisantemi", "Hypericum"] },
  10: { description: "Atmosfere autunnali", featured: ["Crisantemi", "Dalie", "Hypericum", "Brassica"] },
  11: { description: "Verso l'inverno", featured: ["Crisantemi", "Amarillis", "Ilex", "Anemoni"] },
  12: { description: "Fiori per le feste", featured: ["Amarillis", "Tulipani", "Ilex", "Cymbidium"] },
}

type OriginKey = "italia" | "olanda" | "ecuador" | "colombia" | "sudamerica" | "verde"

interface FlowerAvailability {
  origin: OriginKey
  label: string
  period: string
  months: number[]
}

interface Flower {
  name: string
  category: "reciso" | "verde"
  availability: FlowerAvailability[]
}

const originColors: Record<OriginKey, string> = {
  italia: "bg-emerald-600",
  olanda: "bg-orange-500",
  ecuador: "bg-amber-500",
  colombia: "bg-yellow-500",
  sudamerica: "bg-amber-600",
  verde: "bg-green-700",
}

const flowerDatabase: Flower[] = [
  // Fiori recisi
  { name: "Lilium", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Girasole", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Giu–Set", months: [6,7,8,9] },
  ]},
  { name: "Garofano", category: "reciso", availability: [
    { origin: "sudamerica", label: "Sud America", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Rosa", category: "reciso", availability: [
    { origin: "ecuador", label: "Ecuador", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { origin: "colombia", label: "Colombia", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { origin: "olanda", label: "Olanda", period: "Apr–Ott", months: [4,5,6,7,8,9,10] },
  ]},
  { name: "Alstroemeria", category: "reciso", availability: [
    { origin: "sudamerica", label: "Sud America", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Statice", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Mag–Ott", months: [5,6,7,8,9,10] },
  ]},
  { name: "Limonium", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Mag–Ott", months: [5,6,7,8,9,10] },
  ]},
  { name: "Eryngium", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Santini", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Peonia", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Apr–Giu", months: [4,5,6] },
    { origin: "olanda", label: "Olanda", period: "Apr–Giu", months: [4,5,6] },
  ]},
  { name: "Ranuncolo", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Gen–Apr", months: [1,2,3,4] },
  ]},
  { name: "Anemone", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Nov–Apr", months: [11,12,1,2,3,4] },
  ]},
  { name: "Godezia", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Apr–Giu", months: [4,5,6] },
  ]},
  { name: "Tulipano", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Dic–Apr", months: [12,1,2,3,4] },
    { origin: "olanda", label: "Olanda", period: "Nov–Mag", months: [11,12,1,2,3,4,5] },
  ]},
  { name: "Crisantemo", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Anthurium", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Gerbera", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Germini", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Allium", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Apr–Lug", months: [4,5,6,7] },
  ]},
  { name: "Fresia", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Gen–Mag", months: [1,2,3,4,5] },
    { origin: "olanda", label: "Olanda", period: "Gen–Mag", months: [1,2,3,4,5] },
  ]},
  { name: "Violacciocca", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Feb–Mag", months: [2,3,4,5] },
  ]},
  { name: "Lepidium", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Apr–Lug", months: [4,5,6,7] },
  ]},
  { name: "Lisianthus", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Mag–Ott", months: [5,6,7,8,9,10] },
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Green Trick", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Camomilla", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Mag–Lug", months: [5,6,7] },
  ]},
  { name: "Cymbidium", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Set–Apr", months: [9,10,11,12,1,2,3,4] },
  ]},
  { name: "Fior di Riso", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Feb–Mag", months: [2,3,4,5] },
  ]},
  { name: "Delphinium", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Mag–Ago", months: [5,6,7,8] },
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Solidago", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Lug–Ott", months: [7,8,9,10] },
  ]},
  { name: "Achillea", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Giu–Set", months: [6,7,8,9] },
  ]},
  { name: "Agapanthus", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Giu–Ago", months: [6,7,8] },
  ]},
  { name: "Ageratum", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Giu–Set", months: [6,7,8,9] },
  ]},
  { name: "Ammi Majus", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Mag–Lug", months: [5,6,7] },
  ]},
  { name: "Bocca di Leone", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Apr–Set", months: [4,5,6,7,8,9] },
  ]},
  { name: "Astrantia", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Mag–Set", months: [5,6,7,8,9] },
  ]},
  { name: "Carthamus", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Giu–Ago", months: [6,7,8] },
  ]},
  { name: "Celosia", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Lug–Ott", months: [7,8,9,10] },
  ]},
  { name: "Wax Flower", category: "reciso", availability: [
    { origin: "sudamerica", label: "Sud America", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Curcuma", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Mag–Ott", months: [5,6,7,8,9,10] },
  ]},
  { name: "Dalia", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Lug–Ott", months: [7,8,9,10] },
  ]},
  { name: "Craspedia", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Ortensia", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Giu–Ott", months: [6,7,8,9,10] },
    { origin: "olanda", label: "Olanda", period: "Mag–Nov", months: [5,6,7,8,9,10,11] },
  ]},
  { name: "Lysimachia", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Giu–Ago", months: [6,7,8] },
  ]},
  { name: "Molucella", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Mag–Ago", months: [5,6,7,8] },
  ]},
  { name: "Ornithogalum", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Scabiosa", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Mag–Set", months: [5,6,7,8,9] },
  ]},
  { name: "Veronica", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Giu–Set", months: [6,7,8,9] },
  ]},
  { name: "Calla", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Mar–Lug", months: [3,4,5,6,7] },
  ]},
  { name: "Hypericum", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Brassica", category: "reciso", availability: [
    { origin: "olanda", label: "Olanda", period: "Set–Mar", months: [9,10,11,12,1,2,3] },
  ]},
  { name: "Amarillis", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Nov–Feb", months: [11,12,1,2] },
  ]},
  { name: "Ilex", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Nov–Dic", months: [11,12] },
  ]},
  { name: "Nutan", category: "reciso", availability: [
    { origin: "sudamerica", label: "Sud America", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Protea", category: "reciso", availability: [
    { origin: "sudamerica", label: "Sud America", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Gentiana", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Lug–Ott", months: [7,8,9,10] },
  ]},
  { name: "Gypsophila", category: "reciso", availability: [
    { origin: "sudamerica", label: "Sud America", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Mimosa", category: "reciso", availability: [
    { origin: "italia", label: "Italia", period: "Feb–Mar", months: [2,3] },
  ]},
  
  // {lang === "it" ? "Verde" : "Greenery"} ornamentale
  { name: "Eucalipto", category: "verde", availability: [
    { origin: "verde", label: "Verde", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Pittosporo", category: "verde", availability: [
    { origin: "verde", label: "Verde", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Lentisco", category: "verde", availability: [
    { origin: "verde", label: "Verde", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Ruscus", category: "verde", availability: [
    { origin: "verde", label: "Verde", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Grevillea", category: "verde", availability: [
    { origin: "verde", label: "Verde", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Skimmia", category: "verde", availability: [
    { origin: "verde", label: "Verde", period: "Ott–Feb", months: [10,11,12,1,2] },
  ]},
  { name: "Siegras", category: "verde", availability: [
    { origin: "verde", label: "Verde", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Ginestra", category: "verde", availability: [
    { origin: "verde", label: "Verde", period: "Feb–Mag", months: [2,3,4,5] },
  ]},
  { name: "Gunny", category: "verde", availability: [
    { origin: "verde", label: "Verde", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
  { name: "Cocculus", category: "verde", availability: [
    { origin: "verde", label: "Verde", period: "Tutto l'anno", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  ]},
]


function translatePeriod(period: string, lang: "it" | "en") {
  if (lang === "it") return period

  return period
    .replaceAll("Tutto l'anno", "All year")
    .replaceAll("Gen", "Jan")
    .replaceAll("Feb", "Feb")
    .replaceAll("Mar", "Mar")
    .replaceAll("Apr", "Apr")
    .replaceAll("Mag", "May")
    .replaceAll("Giu", "Jun")
    .replaceAll("Lug", "Jul")
    .replaceAll("Ago", "Aug")
    .replaceAll("Set", "Sep")
    .replaceAll("Ott", "Oct")
    .replaceAll("Nov", "Nov")
    .replaceAll("Dic", "Dec")
}

function translateOrigin(label: string, lang: "it" | "en") {
  if (lang === "it") return label

  const map: Record<string, string> = {
    Italia: "Italy",
    Olanda: "Netherlands",
    "Sud America": "South America",
    Ecuador: "Ecuador",
    Colombia: "Colombia",
    Verde: "Greenery",
  }

  return map[label] || label
}

export default function StagionalitaPage() {
  const { lang } = useFlorlifeLang()
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [selectedOrigin, setSelectedOrigin] = useState<string>("all")
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Scroll selected month into view
  useEffect(() => {
    if (selectedMonth !== null && timelineRef.current) {
      const activeButton = timelineRef.current.querySelector(`[data-month="${selectedMonth}"]`)
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }, [selectedMonth])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedFlower(null)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const filteredFlowers = useMemo(() => {
    return flowerDatabase.filter(flower => {
      const matchesMonth = selectedMonth === null || 
        flower.availability.some(a => a.months.includes(selectedMonth))
      
      let matchesOrigin = true
      if (selectedOrigin !== "all") {
        if (selectedOrigin === "sudamerica") {
          matchesOrigin = flower.availability.some(a => 
            a.origin === "sudamerica" || a.origin === "ecuador" || a.origin === "colombia"
          )
        } else if (selectedOrigin === "verde") {
          matchesOrigin = flower.category === "verde"
        } else {
          matchesOrigin = flower.availability.some(a => a.origin === selectedOrigin)
        }
      }
      
      return matchesMonth && matchesOrigin
    })
  }, [selectedMonth, selectedOrigin])

  // Sort flowers alphabetically
  const sortedFlowers = useMemo(() => {
    return [...filteredFlowers].sort((a, b) => a.name.localeCompare(b.name))
  }, [filteredFlowers])

  const currentBanner = selectedMonth ? seasonalBanners[selectedMonth] : null

  return (
    <>
      <Navigation />
      <main className="bg-background min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === "it" ? "Torna alla home" : "Back to home"}
            </Link>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-tight max-w-4xl">
              {lang === "it" ? "Guida alla Stagionalità" : "Seasonality Guide"}
            </h1>
            
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {lang === "it" ? "Scopri quali fiori sono disponibili durante l’anno, le loro origini e i periodi migliori di raccolta." : "Discover which flowers are available throughout the year, their origins and the best harvest periods."}
            </p>
          </div>
        </section>

        {/* Sticky Filters */}
        <div className="sticky top-[73px] z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          {/* Month Timeline */}
          <div 
            ref={timelineRef}
            className="overflow-x-auto scrollbar-hide"
          >
            <div className="flex items-center justify-center min-w-max px-6 py-8">
              {monthsShort[lang].map((month, index) => (
                <button
                  key={month}
                  data-month={index + 1}
                  onClick={() => setSelectedMonth(selectedMonth === index + 1 ? null : index + 1)}
                  className={`relative px-3 md:px-5 py-2 text-xs md:text-sm tracking-[0.2em] font-light transition-all duration-300 ${
                    selectedMonth === index + 1
                      ? "text-foreground font-normal"
                      : "text-muted-foreground/60 hover:text-muted-foreground"
                  }`}
                >
                  {month}
                  {index < monthsShort.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-border/40 font-extralight">—</span>
                  )}
                  {selectedMonth === index + 1 && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-px bg-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Origin Filters */}
          <div className="flex gap-6 md:gap-10 px-6 py-5 overflow-x-auto scrollbar-hide border-t border-border/30 justify-center">
            {[
              { key: "all", label: lang === "it" ? "Tutti" : "All" },
              { key: "italia", label: lang === "it" ? "Italia" : "Italy", color: "bg-emerald-600" },
              { key: "olanda", label: lang === "it" ? "Olanda" : "Netherlands", color: "bg-orange-500" },
              { key: "sudamerica", label: lang === "it" ? "Sud America" : "South America", color: "bg-amber-600" },
              { key: "verde", label: lang === "it" ? "Verde" : "Greenery", color: "bg-green-700" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedOrigin(filter.key)}
                className={`flex items-center gap-2.5 flex-shrink-0 text-xs tracking-widest uppercase transition-all duration-300 ${
                  selectedOrigin === filter.key
                    ? "text-foreground"
                    : "text-muted-foreground/60 hover:text-muted-foreground"
                }`}
              >
                {filter.color && (
                  <span className={`w-2 h-2 rounded-full ${filter.color}`} />
                )}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Seasonal Banner */}
        {currentBanner && (
          <section className="py-12 px-6 bg-muted/30 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                    {monthsFull[lang][selectedMonth! - 1]}
                  </h2>
                  <p className="text-muted-foreground">
                    {currentBanner.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentBanner.featured.map((product) => (
                    <span
                      key={product}
                      className="px-4 py-2 bg-background border border-border text-sm text-foreground"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Results Header */}
            <div className="flex items-baseline justify-between mb-12 pb-6 border-b border-border/50">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                  {selectedMonth ? monthsFull[lang][selectedMonth - 1] : "Tutto l'anno"}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {sortedFlowers.length} {lang === "it" ? "varietà disponibili" : "varieties available"}
                </p>
              </div>
              {(selectedMonth || selectedOrigin !== "all") && (
                <button
                  onClick={() => { setSelectedMonth(null); setSelectedOrigin("all") }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {lang === "it" ? "Rimuovi filtri" : "Clear filters"}
                </button>
              )}
            </div>

            {/* Flower List */}
            {sortedFlowers.length > 0 ? (
              <div className="grid gap-0 divide-y divide-border/50">
                {sortedFlowers.map((flower) => (
                  <article 
                    key={flower.name}
                    onClick={() => setSelectedFlower(flower)}
                    className="py-5 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 md:gap-8 items-center cursor-pointer hover:bg-muted/30 -mx-4 px-4 transition-colors"
                  >
                    {/* Name */}
                    <h3 className="font-serif text-xl text-foreground">
                      {flower.name}
                    </h3>
                    
                    {/* Origins */}
                    <div className="flex items-center gap-4 flex-wrap">
                      {flower.availability.map((avail) => (
                        <div key={avail.origin} className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${originColors[avail.origin]}`} />
                          <span className="text-sm text-muted-foreground">
                            {translateOrigin(avail.label, lang)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Period */}
                    <p className="text-sm text-muted-foreground md:text-right md:min-w-[140px]">
                      {flower.availability.map(a => translatePeriod(a.period, lang)).join(" · ")}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-muted-foreground text-lg">
                  {lang === "it" ? "Nessuna varietà trovata con i filtri selezionati." : "No varieties found with the selected filters."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              {lang === "it" ? "La disponibilità indicata è orientativa e può variare in base a origine, qualità, condizioni climatiche e andamento dei mercati." : "The indicated availability is approximate and may vary depending on origin, quality, weather conditions and market trends."}
            </p>
            <Link
              href="/richiedi-accesso"
              className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background text-sm tracking-widest uppercase hover:bg-foreground/90 transition-all"
            >
              {lang === "it" ? "Richiedi accesso" : "Request access"}
            </Link>
          </div>
        </section>
      </main>

      {/* Flower Detail Modal */}
      {selectedFlower && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedFlower(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          
          {/* Modal */}
          <div 
            className="relative bg-background border border-border max-w-md w-full p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFlower(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
              {selectedFlower.name}
            </h3>

            <div className="space-y-6">
              {/* Origins */}
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  {lang === "it" ? "Origini disponibili" : "Available origins"}
                </p>
                <div className="space-y-2">
                  {selectedFlower.availability.map((avail) => (
                    <div key={avail.origin} className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${originColors[avail.origin]}`} />
                      <span className="text-foreground">{translateOrigin(avail.label, lang)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  {lang === "it" ? "Disponibilità" : "Availability"}
                </p>
                <p className="text-foreground">
                  {selectedFlower.availability.length > 1 
                    ? "Variabile in base all'origine"
                    : translatePeriod(selectedFlower.availability[0].period, lang)
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </>
  )
}
