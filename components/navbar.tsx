"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/plateforme", label: "Plateforme" },
  { href: "/solutions", label: "Solutions" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          {/* logo image, replace `/img/logo.png` with your actual logo file */}
          <Image
            src="/img/logo1.svg"
            alt="Gallé Connect Pro logo"
            width={130}
            height={50}
            className="rounded-lg"
          />
          {/* <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-[#374250] tracking-tight">Gallé</span>
            <span className="text-sm text-[#374250] -mt-1">Connect Pro</span>
          </div> */}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button size="sm" asChild className="bg-[#d99306] text-white hover:bg-[#c08505]">
            <Link href="/souscription">Souscrire</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Afficher le menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button size="sm" asChild className="bg-[#d99306] text-white hover:bg-[#c08505]">
                <Link href="/souscription" onClick={() => setMobileMenuOpen(false)}>Souscrire</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
