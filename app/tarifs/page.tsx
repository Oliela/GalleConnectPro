"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Starter",
    priceMonthly: 20000,
    agents: "jusqu'à 3 agents",
    description: "Idéal pour les petites structures qui démarrent leur digitalisation.",
    highlighted: false,
    cta: "Souscrire",
  },
  {
    name: "Business",
    priceMonthly: 35000,
    agents: "jusqu'à 6 agents",
    description: "Le meilleur équilibre pour les agences en croissance active.",
    highlighted: true,
    cta: "Souscrire",
  },
  {
    name: "Pro",
    priceMonthly: 50000,
    agents: "jusqu'à 10 agents",
    description: "Pour les agences établies qui gèrent un volume important.",
    highlighted: false,
    cta: "Souscrire",
  },

  {
    name: "Licence entreprise",
    priceMonthly: 2500000,
    pricePrefix: "À partir de",
    agents: "Acquerir une licence pour votre entreprise",
    description: "Pour les groupes immobiliers, réseaux d'agences et besoins spécifiques.",
    features: [
      "Nombre d'agents personnalisé",
      "Déploiement adapté à votre organisation",
      "Personnalisation des fonctionnalités",
      "Accompagnement dédié",
      "Support prioritaire",
      "Conditions commerciales sur mesure",
    ],
    highlighted: false,
    cta: "Nous contacter",
  },
]

const faqs = [
  {
    q: "Y a-t-il un engagement minimum ?",
    a: "Oui, un engagement minimum de 3 mois est demandé pour bénéficier du service. Après cette période, vous pouvez renouveler ou modifier votre abonnement selon vos besoins.",
  },
  {
    q: "Comment souscrire à Galle Connect Pro ?",
    a: "Pour souscrire, remplissez simplement notre formulaire d'abonnement. Une fois votre demande envoyée, un membre de notre équipe vous contactera pour finaliser votre inscription et procéder au paiement.",
  },
  {
    q: "Quelle est la différence entre les forfaits ?",
    a: "Tous les forfaits donnent accès aux mêmes fonctionnalités principales de Galle Connect Pro. La différence se situe principalement au niveau du nombre d'agents autorisés et du niveau d'accompagnement proposé.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Oui. Nous mettons en place des mesures de sécurité pour protéger vos données et garantir la confidentialité des informations liées à votre agence, vos biens, vos clients et vos propriétaires.",
  },
  {
    q: "Proposez-vous une formation ?",
    a: "Oui, une formation est incluse dans tous les forfaits afin de vous accompagner dans la prise en main de Galle Connect Pro et vous permettre d'utiliser efficacement toutes les fonctionnalités.",
  },
  {
    q: "Puis-je changer de forfait plus tard ?",
    a: "Oui, vous pouvez faire évoluer votre abonnement selon la croissance de votre agence et vos besoins en nombre d'agents.",
  },
]

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#d99306]">Tarifs</p>
            <h1 className="mt-3 font-serif text-4xl font-bold text-[#374250] md:text-3xl lg:text-6xl text-balance">
              Des tarifs simples et transparents
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#3a3a3a]">
              Choisissez le forfait adapté à la taille de votre agence. Tous les forfaits incluent les mises à jour et le support.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="bg-card pb-5 pt-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative min-h-[500px] rounded-[2.25rem] border-2 p-5 sm:p-10 ${plan.highlighted
                    ? "border-[#f5a000] bg-[#22313f] text-white shadow-xl shadow-[#d99306]/10"
                    : "border-[#e7ebf0] bg-background text-[#22313f]"
                    }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-[#f5a000] px-9 py-2 text-lg font-bold uppercase tracking-[0.18em] text-[#22313f]">
                        Populaire
                      </span>
                    </div>
                  )}
                  <h3 className={`text-2xl font-bold sm:text-3xl ${plan.highlighted ? "text-white" : "text-[#22313f]"}`}>{plan.name}</h3>
                  <p className={`mt-2 text sm:text ${plan.highlighted ? "text-slate-300" : "text-slate-500"}`}>{plan.agents}</p>

                  <div className="mt-10">
                    {"pricePrefix" in plan && <p className={`mb-2 text-lg ${plan.highlighted ? "text-slate-300" : "text-slate-500"}`}>{plan.pricePrefix}</p>}
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className={`text-4xl font-bold sm:text-3xl ${plan.highlighted ? "text-[#f5a000]" : "text-[#22313f]"}`}>
                        {plan.priceMonthly.toLocaleString("fr-FR")}
                      </span>
                      <span className={`text-xl font-bold ${plan.highlighted ? "text-slate-300" : "text-slate-500"}`}>FCFA</span>
                      {plan.name !== "Licence entreprise" && <span className={`text-lg ${plan.highlighted ? "text-slate-300" : "text-slate-500"}`}>/ mois</span>}
                    </div>
                  </div>
                  <Button size="lg" asChild className={`mt-8 w-full ${plan.highlighted ? "bg-[#f5a000] text-[#22313f] hover:bg-[#df9000]" : "bg-[#22313f] text-white hover:bg-[#17232d]"}`}>
                    <Link href={plan.name === "Licence entreprise" ? "/contact" : "/souscription"}>{plan.cta} <ArrowRight className="h-4 w-4" /></Link>
                  </Button>

                  <div className={`mt-10 border-t pt-5 ${plan.highlighted ? "border-slate-600" : "border-[#e7ebf0]"}`}>
                    <p className={`text leading-relaxed ${plan.highlighted ? "text-slate-200" : "text-slate-500"}`}>{plan.description}</p>
                  </div>


                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#374250] md:text-4xl text-balance">
                Questions fréquentes
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#3a3a3a]">
                Tout ce que vous devez savoir sur nos tarifs et notre offre.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-[#374250]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3a3a3a]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
