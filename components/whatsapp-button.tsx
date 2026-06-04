"use client"

import { useState } from "react"
import { MessageCircle, X, MapPin } from "lucide-react"

const contacts = [
  {
    name: "Sanremo",
    phone: "+39 334 349 1273",
    whatsapp: "https://wa.me/393343491273",
  },
  {
    name: "Genova",
    phone: "+39 375 771 6820",
    whatsapp: "https://wa.me/393757716820",
  },
]

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Panel */}
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 w-72 bg-background border border-border shadow-xl rounded-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <p className="font-serif text-lg text-foreground">Contatta Florlife</p>
          </div>

          {/* Contact Options */}
          <div className="divide-y divide-border">
            {contacts.map((contact) => (
              <a
                key={contact.name}
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-green-600/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.phone}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-foreground text-background rotate-0"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
        aria-label={isOpen ? "Chiudi contatti" : "Apri contatti WhatsApp"}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>
    </div>
  )
}
