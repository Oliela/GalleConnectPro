import Link from "next/link"
import { Building2, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

const siteLinks = [
  { href: "/", label: "Accueil" },
  { href: "/plateforme", label: "Plateforme" },
  { href: "/solutions", label: "Solutions" },
  // { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
  { href: "/waitlist", label: "Liste d’attente" },
]

const solutions = [
  { href: "/solutions#proprietes", label: "Gestion des biens" },
  { href: "/solutions#clients", label: "Suivi clients" },
  { href: "/solutions#contrats", label: "Contrats" },
  { href: "/solutions#factures", label: "Facturation" },
  { href: "/solutions#calendrier", label: "Calendrier" },
  { href: "/solutions#agents", label: "Gestion des agents" },
]

const legal = [
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
  { href: "/conditions-utilisation", label: "Conditions d’utilisation" },
  // { href: "#", label: "Mentions légales" },
]

export function Footer() {
  return (
    <footer className="bg-[#374250] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d99306] transition-transform group-hover:scale-105">
                <Building2 className="h-6 w-6 text-white" />
              </div> */}
              <Image
                src="/img/logo-dark.svg"
                alt="Gallé Connect Pro logo"
                width={130}
                height={50}
                className="rounded-lg"
              />
              {/* <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight">Gallé</span>
                <span className="text-lg -mt-1 tracking-wide">Connect Pro</span>
              </div> */}
            </Link>

            <p className="text-sm leading-relaxed text-gray-400">
              La plateforme tout-en-un pour les agences immobilières. Gérez vos biens, clients et contrats en toute simplicité.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=61583920536390" target="_blank" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-all hover:bg-[#d99306] hover:text-white" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/galle_connect/" target="_blank" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-all hover:bg-[#d99306] hover:text-white" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/gall%C3%A9-connect" target="_blank" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-all hover:bg-[#d99306] hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>

            </div>
          </div>

          {/* Site Links */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#d99306]">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {siteLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-gray-400 transition-colors hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#d99306]">
              Solutions
            </h4>
            <ul className="flex flex-col gap-3">
              {solutions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-gray-400 transition-colors hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#d99306]">
              Légal
            </h4>
            <ul className="mb-8 flex flex-col gap-3">
              {legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-gray-400 transition-colors hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#d99306]">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a
                href="mailto:support@galleconnect.com"
                className="block transition-colors hover:text-white"
              >
                support@galleconnect.com
              </a>
              {/* <a
                href="tel:+221338001234"
                className="block transition-colors hover:text-white"
              >
                +221 33 800 12 34
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Gallé Connect Pro. Tous droits réservés.
          </p>
          <p className="text-sm text-gray-400">
            Fait avec passion par{" "}
            <a href="https://www.talcoanalytics.com/fr" target="_blank" className="font-medium text-[#d99306]">TalcoAnalytics</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
