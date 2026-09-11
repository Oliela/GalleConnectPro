"use client"

import { useState, FormEvent } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send } from "lucide-react"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@galleconnect.com",
    href: "mailto:support@galleconnect.com",
  },
  // {
  //   icon: Phone,
  //   label: "Téléphone",
  //   value: "+221 33 123 45 67",
  //   href: "tel:+221331234567",
  // },
  {
    icon: MapPin,
    label: "Adresse",
    value: "LOT 6760, Rue LIB 80 Liberté 6, 11280 Dakar",
    href: null,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun - Ven : 10h00 - 18h00",
    href: null,
  },
]

const subjects = [
  { value: "Demander une démo", label: "Demander une démo" },
  { value: "Questions sur les tarifs", label: "Questions sur les tarifs" },
  { value: "Partenariat", label: "Partenariat" },
  // { value: "Support technique", label: "Support technique" },
  { value: "Question sur la licence", label: "Question sur la licence" },
  { value: "Autre demande", label: "Autre demande" },

]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  // form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const name = `${firstName} ${lastName}`.trim()

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          sujet: subject,
          phone,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        // clear fields for next message
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setSubject("")
        setMessage("")
      } else {
        const data = await res.json()
        toast.error(data?.error || "Une erreur est survenue")
      }
    } catch (err) {
      console.error(err)
      toast.error("Impossible d'envoyer le message. Réessayez plus tard.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#d99306] animate-fade-in-down">Contact</p>
            <h1 className="mt-3 font-serif text-4xl font-bold text-[#374250] md:text-5xl lg:text-6xl text-balance animate-fade-in-up animation-delay-100">
              Parlons de votre projet
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#3a3a3a] animate-fade-in-up animation-delay-200">
              Une question sur Gallé Connect Pro ? Besoin d'une démonstration ? Notre équipe est la pour vous accompagner.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#374250] md:text-3xl">
                  Nos coordonnées
                </h2>
                <p className="mt-4 text-[#3a3a3a] leading-relaxed">
                  N'hésitez pas à nous contacter par email ou téléphone. Nous répondons généralement sous 24 heures.
                </p>

                <div className="mt-10 flex flex-col gap-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={info.label}
                      className="flex items-start gap-4 group transition-transform duration-300 hover:translate-x-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fef3db] transition-all duration-300 group-hover:bg-[#d99306] group-hover:scale-110">
                        <info.icon className="h-5 w-5 text-[#d99306] transition-colors duration-300 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#3a3a3a]">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-lg font-semibold text-[#374250] hover:text-[#d99306] transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-lg font-semibold text-[#374250]">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div className="mt-12">
                  <p className="text-sm font-medium text-[#3a3a3a]">Suivez-nous sur les réseaux sociaux</p>
                  <div className="mt-4 flex gap-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61583920536390"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#374250] text-white transition-colors hover:bg-[#d99306]"
                      aria-label="Facebook"
                      target="_blank"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/galle_connect/"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#374250] text-white transition-colors hover:bg-[#d99306]"
                      aria-label="Instagram"
                      target="_blank"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/gall%C3%A9-connect"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#374250] text-white transition-colors hover:bg-[#d99306]"
                      aria-label="LinkedIn"
                      target="_blank"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-2xl border border-border bg-card p-8 shadow-lg shadow-[#d99306]/5 animate-fade-in-right animation-delay-300 transition-all duration-300 hover:shadow-xl hover:shadow-[#d99306]/10">
                {submitted ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fef3db]">
                      <CheckCircle2 className="h-8 w-8 text-[#d99306]" />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold text-[#374250]">Message envoyé !</h2>
                    <p className="mt-3 text-[#3a3a3a] leading-relaxed max-w-sm">
                      Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 bg-[#d99306] text-white hover:bg-[#c08505]"
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-[#374250]">Envoyez-nous un message</h2>
                    <p className="mt-2 text-sm text-[#3a3a3a]">
                      Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                      {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                      )}
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-[#374250]">
                            Prénom
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="Jamil"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="bg-background"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-[#374250]">
                            Nom
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Seye"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-sm font-medium text-[#374250]">
                          Adresse email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jamil.seye@email.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-background"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-[#374250]">
                          Téléphone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+221 77 123 45 67"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-background"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="subject" className="text-sm font-medium text-[#374250]">
                          Sujet
                        </Label>
                        <Select
                          required
                          value={subject}
                          onValueChange={(v) => setSubject(v)}
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Sélectionnez un sujet" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="message" className="text-sm font-medium text-[#374250]">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Décrivez votre demande..."
                          required
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="bg-background resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="mt-2 w-full bg-[#d99306] text-white hover:bg-[#c08505] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#d99306]/25"
                      >
                        <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        Envoyer le message
                      </Button>

                      <p className="text-center text-xs text-[#3a3a3a]">
                        En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
