"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Clock, Phone, Mail } from "lucide-react"
import { useFlorlifeLang } from "@/lib/use-florlife-lang"

const locations = [
  {
    name: "Sanremo",
    address: "Via Quinto Mansuino, Box 5",
    city: "18038 Sanremo (IM)",
    phone: "+39 334 349 1273",
    email: "infosr@florlifesrl.com",
    hours: [
      { day: "Lunedì", slots: ["05:00–13:00", "17:00–19:00"] },
      { day: "Martedì", slots: ["07:00–10:00", "16:00–19:00"] },
      { day: "Mercoledì", slots: ["05:00–13:00", "17:00–19:00"] },
      { day: "Giovedì", slots: ["07:00–10:00", "16:00–19:00"] },
      { day: "Venerdì", slots: ["05:00–13:00", "17:00–19:00"] },
      { day: "Sabato", slots: ["07:00–10:00", "16:00–19:00"] },
    ],
    mapUrl: "https://www.google.com/maps/place/Via+Quinto+Mansuino,+18038+Sanremo+IM",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d7.7683!3d43.8156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdc94fcbe73f1f%3A0x4d7d8f8e8e8e8e8e!2sVia%20Quinto%20Mansuino%2C%2018038%20Sanremo%20IM!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit",
  },
  {
    name: "Genova",
    address: "Via Luigi Perini 26/28",
    city: "16152 Genova (GE)",
    phone: "+39 375 771 6820",
    email: "infoge@florlifesrl.com",
    hours: [
      { day: "Lunedì", slots: ["06:00–12:00", "16:00–18:00"] },
      { day: "Martedì", slots: ["06:00–12:00", "16:00–18:00"] },
      { day: "Mercoledì", slots: ["06:00–12:00"] },
      { day: "Giovedì", slots: ["06:00–12:00", "16:00–18:00"] },
      { day: "Venerdì", slots: ["06:00–12:00"] },
      { day: "Sabato", slots: ["06:00–12:00"] },
    ],
    mapUrl: "https://www.google.com/maps/place/Via+Luigi+Perini,+26,+16152+Genova+GE",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d8.8524!3d44.4185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d343f2c8d85c35%3A0x7f1e3a5b9c4d2e6f!2sVia%20Luigi%20Perini%2C%2026%2C%2016152%20Genova%20GE!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit",
  },
]

export function LocationsSection() {
  const { lang } = useFlorlifeLang()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="sedi" className="py-32 md:py-48 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-20 md:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
            {lang === "it" ? "Dove trovarci" : "Where to find us"}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            {lang === "it" ? "Le nostre sedi" : "Our locations"}
          </h2>
        </div>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {locations.map((location, index) => (
            <div
              key={location.name}
              className={`group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Map */}
              <div className="relative aspect-square md:aspect-[4/3] overflow-hidden mb-10">
                <iframe
                  src={location.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mappa ${location.name}`}
                  className="grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                  {location.name}
                </h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-foreground">{location.address}</p>
                      <p className="text-muted-foreground text-sm mt-0.5">{location.city}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a 
                      href={`tel:${location.phone.replace(/\s/g, '')}`}
                      className="text-foreground hover:text-secondary transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a 
                      href={`mailto:${location.email}`}
                      className="text-foreground hover:text-secondary transition-colors"
                    >
                      {location.email}
                    </a>
                  </div>

                  {/* Hours - Daily Schedule */}
                  <div className="flex items-start gap-4 pt-2">
                    <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-foreground text-sm font-medium mb-3">{lang === "it" ? "Orari di apertura" : "Opening hours"}</p>
                      <div className="space-y-0">
                        {location.hours.map((schedule, idx) => (
                          <div 
                            key={idx} 
                            className={`flex items-center justify-between py-2 ${
                              idx < location.hours.length - 1 ? "border-b border-border/50" : ""
                            }`}
                          >
                            <span className="text-muted-foreground text-sm">{schedule.day}</span>
                            <span className="text-foreground text-sm">
                              {schedule.slots.join(" / ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={`mailto:${location.email}?subject=Richiesta informazioni - Sede ${location.name}`}
                  className="inline-flex items-center justify-center mt-10 px-8 py-4 bg-foreground text-background text-sm tracking-widest uppercase hover:bg-foreground/90 transition-all"
                >
                  {lang === "it" ? "Contatta" : "Contact"} {location.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
