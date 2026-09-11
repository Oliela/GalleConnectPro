"use client"

import { useState } from "react"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const etapes = ["Informations de l'agence", "Formule", "Conditions générales"]

const offres = [
  { value: "STARTER", label: "Starter", description: "Pour démarrer simplement", prix: "20 000 FCFA" },
  { value: "BUSINESS", label: "Business", description: "Pour les agences en croissance", prix: "35 000 FCFA" },
  { value: "PRO", label: "Pro", description: "Pour piloter votre activité", prix: "50 000 FCFA" },
  { value: "LICENCE", label: "Licence", description: "Pour un besoin sur mesure", prix: "2 500 000 FCFA" },
]

const numeroPaiement = "78 181 65 50"

export default function SouscriptionPage() {
  const [etape, setEtape] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    nomComplet: "",
    telephone: "",
    email: "",
    nomAgence: "",
    pays: "",
    ville: "",
    tailleAgence: "",
    offre: "",
    modePaiement: "",
    conditionsAcceptees: false,
  })

  const update = (name: string, value: string | boolean) => setForm((current) => ({ ...current, [name]: value }))

  const prochaineEtape = () => {
    const agenceComplete = [form.nomComplet, form.telephone, form.email, form.nomAgence, form.pays, form.ville, form.tailleAgence].every(Boolean)
    const formuleComplete = form.offre && form.modePaiement

    if ((etape === 1 && !agenceComplete) || (etape === 2 && !formuleComplete)) {
      toast.error("Veuillez renseigner tous les champs obligatoires avant de continuer.")
      return
    }
    setEtape((current) => current + 1)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    if (!form.conditionsAcceptees) {
      toast.error("Vous devez accepter les conditions générales pour signer votre demande.")
      return
    }
    console.log("Formulaire soumis:", form) // Pour le débogage, à retirer en production
    try {
      const response = await fetch("/api/souscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      setSubmitted(true)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer plus tard.")
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#d99306]">Souscription</p>
            <h1 className="mt-3 font-serif text-4xl font-bold text-[#374250] md:text-5xl">Demandez votre abonnement</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#3a3a3a]">
              Complétez les étapes ci-dessous pour envoyer votre demande de souscription à Gallé Connect Pro.
            </p>
          </div>

          {!submitted && (
            <ol className="mt-12 grid grid-cols-3 gap-2" aria-label="Étapes de souscription">
              {etapes.map((titre, index) => {
                const numero = index + 1
                const actif = numero === etape
                const termine = numero < etape
                return (
                  <li key={titre} className="text-center">
                    <div className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${termine || actif ? "bg-[#d99306] text-white" : "bg-muted text-muted-foreground"}`}>
                      {termine ? "✓" : numero}
                    </div>
                    <p className={`mt-2 text-xs font-medium sm:text-sm ${actif ? "text-[#374250]" : "text-muted-foreground"}`}>{titre}</p>
                  </li>
                )
              })}
            </ol>
          )}

          <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-lg shadow-[#d99306]/5 sm:p-8">
            {submitted ? (
              <Paiement offre={form.offre} modePaiement={form.modePaiement} />
            ) : (
              <form noValidate onSubmit={handleSubmit}>
                {etape === 1 && <InformationsAgence form={form} update={update} />}
                {etape === 2 && <Formule form={form} update={update} />}
                {etape === 3 && <Conditions form={form} update={update} />}

                <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
                  {etape > 1 ? <Button type="button" variant="outline" onClick={() => setEtape((current) => current - 1)}><ChevronLeft /> Retour</Button> : <span />}
                  {etape < 3 ? <Button type="button" className="bg-[#d99306] text-white hover:bg-[#c08505]" onClick={(event) => { event.preventDefault(); prochaineEtape() }}>Continuer <ChevronRight /></Button> : <Button type="submit" className="bg-[#d99306] text-white hover:bg-[#c08505]">Signer ma demande</Button>}
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function InformationsAgence({ form, update }: { form: Record<string, string | boolean>; update: (name: string, value: string | boolean) => void }) {
  return <section><h2 className="text-2xl font-bold text-[#374250]">Informations de l'agence</h2><p className="mt-2 text-sm text-muted-foreground">Ces informations nous permettent d'identifier votre agence.</p><div className="mt-7 grid gap-5 sm:grid-cols-2">
    <Champ label="Nom complet *" name="nomComplet" value={form.nomComplet as string} update={update} placeholder="Ex. Jamil Seye" />
    <Champ label="Téléphone *" name="telephone" value={form.telephone as string} update={update} placeholder="Ex. 77 000 00 00" />
    <Champ label="Email professionnel *" name="email" type="email" value={form.email as string} update={update} placeholder="contact@agence.sn" />
    <Champ label="Nom de l'agence *" name="nomAgence" value={form.nomAgence as string} update={update} placeholder="Ex. Immobilier Dakar Centre" />
    <Champ label="Pays  *" name="pays" value={form.pays as string} update={update} placeholder="Ex. Sénégal" />
    <Champ label="Ville  *" name="ville" value={form.ville as string} update={update} placeholder="Ex. Dakar" />
    <div className="flex flex-col gap-2"><Label>Taille de l'agence</Label><Select value={form.tailleAgence as string} onValueChange={(value) => update("tailleAgence", value)}><SelectTrigger><SelectValue placeholder="Nombre d'agents" /></SelectTrigger><SelectContent><SelectItem value="1">1 agent</SelectItem><SelectItem value="2-5">2 à 5 agents</SelectItem><SelectItem value="6-15">6 à 15 agents</SelectItem><SelectItem value="16-50">16 à 50 agents</SelectItem><SelectItem value="50+">Plus de 50 agents</SelectItem></SelectContent></Select></div>
  </div></section>
}

function Formule({ form, update }: { form: Record<string, string | boolean>; update: (name: string, value: string | boolean) => void }) {
  return <section>
    <h2 className="text-2xl font-bold text-[#374250]">Votre formule</h2>
    <p className="mt-2 text-sm text-muted-foreground">Choisissez l'offre et le moyen de paiement souhaité.</p>
    <div className="mt-7 space-y-7">
      <div>
        <Label>Offre</Label>
        <RadioGroup className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2" value={form.offre as string} onValueChange={(value) => update("offre", value)}>{offres.map((offre) =>
          <Label key={offre.value} htmlFor={offre.value} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${form.offre === offre.value ? "border-[#d99306] bg-[#fef3db]" : "border-border"}`}>
            <RadioGroupItem value={offre.value} id={offre.value} />
            <span>
              <span className="block font-semibold text-[#374250]">{offre.label}
                <span className="text-[#d99306]">— {offre.prix}</span>
              </span>
              <span className="mt-1 block text-xs font-normal text-muted-foreground">{offre.description}
              </span>
            </span>
          </Label>)}
        </RadioGroup>
      </div>
      <div>
        <Label>Mode de paiement souhaité</Label>
        <RadioGroup className="mt-3 grid gap-3" value={form.modePaiement as string} onValueChange={(value) => update("modePaiement", value)}>{[["ORANGE_MONEY", "Orange Money"], ["WAVE", "Wave"], ["VIREMENT_BANCAIRE", "Virement bancaire"]].map(([value, label]) =>
          <Label key={value} htmlFor={value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4">
            <RadioGroupItem value={value} id={value} />{label}
          </Label>)}
        </RadioGroup>
      </div>
    </div></section>
}

function Conditions({ form, update }: { form: Record<string, string | boolean>; update: (name: string, value: string | boolean) => void }) {
  return <section>
    <h2 className="text-2xl font-bold text-[#374250]">Conditions générales</h2>
    <p className="mt-2 text-sm text-muted-foreground">Lisez et acceptez les conditions avant de signer votre demande.</p>

    <div className="mt-7 max-h-96 overflow-y-auto rounded-lg border border-border bg-muted/30 p-5 text-sm leading-relaxed text-[#3a3a3a]">
      <h3 className="text-lg font-semibold text-[#374250]">
        Conditions Générales d'Utilisation et d'Abonnement
      </h3>

      <p className="mt-4">
        Les présentes Conditions Générales d'Utilisation et d'Abonnement régissent
        l'accès et l'utilisation de la plateforme Gallé Connect Pro, éditée par
        Talco Analytics. En soumettant cette demande de souscription, vous
        reconnaissez avoir lu, compris et accepté l'ensemble des conditions
        suivantes.
      </p>

      <h4 className="mt-5 font-semibold">1. Objet</h4>

      <p className="mt-2">
        Gallé Connect Pro est une plateforme SaaS destinée aux agences immobilières.
        Elle permet notamment la gestion des biens immobiliers, des propriétaires,
        des clients, des contrats, des visites, de la gestion locative, de la
        facturation et de l'ensemble des activités liées à la gestion immobilière.
      </p>

      <h4 className="mt-5 font-semibold">2. Période d'essai</h4>

      <p className="mt-2">
        Une période d'essai gratuite d'un (1) mois est offerte à toute agence
        souhaitant découvrir la plateforme. Durant cette période, aucun abonnement
        n'est facturé. À l'issue de cette période, l'agence est libre de poursuivre
        ou non son utilisation de Gallé Connect Pro.
      </p>

      <h4 className="mt-5 font-semibold">3. Souscription et activation</h4>

      <p className="mt-2">
        Si l'agence souhaite continuer à utiliser Gallé Connect Pro après la période
        d'essai, elle devra souscrire à l'une des offres proposées. L'activation du
        compte est effectuée après validation de la demande de souscription et
        réception du paiement.
      </p>

      <h4 className="mt-5 font-semibold">4. Paiement</h4>

      <p className="mt-2">
        Pour activer définitivement son abonnement, le Client s'engage à régler une
        première période de trois (3) mois d'abonnement correspondant à la formule
        choisie. Ce paiement est exigé avant l'activation du compte.
      </p>

      <h4 className="mt-5 font-semibold">5. Durée d'engagement</h4>

      <p className="mt-2">
        La souscription à Gallé Connect Pro implique un engagement minimum de douze
        (12) mois à compter de la date d'activation de l'abonnement. Durant cette
        période, le Client peut continuer à utiliser la plateforme conformément à
        son offre.
      </p>

      <h4 className="mt-5 font-semibold">6. Changement de forfait</h4>

      <p className="mt-2">
        Le Client peut demander à tout moment un changement de formule
        d'abonnement. Le passage vers une offre supérieure ou inférieure est
        possible selon les offres disponibles et les conditions tarifaires en
        vigueur. Le changement de forfait n'entraîne pas la résiliation du contrat
        ni la remise à zéro de la période d'engagement.
      </p>

      <h4 className="mt-5 font-semibold">7. Résiliation</h4>

      <p className="mt-2">
        Le Client ne peut pas résilier définitivement son abonnement avant
        l'expiration de la période minimale d'engagement de douze (12) mois. À
        l'issue de cette période, il pourra demander la résiliation de son
        abonnement par écrit. Toute période d'abonnement déjà payée reste acquise et
        ne pourra faire l'objet d'un remboursement, sauf disposition légale
        contraire.
      </p>

      <h4 className="mt-5 font-semibold">8. Obligations du Client</h4>

      <p className="mt-2">
        Le Client s'engage à fournir des informations exactes lors de la
        souscription, à préserver la confidentialité de ses identifiants, à utiliser
        la plateforme conformément à sa destination professionnelle et à ne pas
        tenter de compromettre son fonctionnement ou sa sécurité.
      </p>

      <h4 className="mt-5 font-semibold">9. Protection des données</h4>

      <p className="mt-2">
        Les données enregistrées par le Client restent sa propriété. Talco
        Analytics met en œuvre des mesures de sécurité raisonnables afin d'assurer
        leur confidentialité et leur protection. Le Client demeure responsable des
        données qu'il enregistre dans la plateforme.
      </p>

      <h4 className="mt-5 font-semibold">10. Disponibilité du service</h4>

      <p className="mt-2">
        Talco Analytics s'efforce d'assurer une disponibilité continue de la
        plateforme. Des interruptions temporaires peuvent toutefois intervenir dans
        le cadre d'opérations de maintenance, de mises à jour ou en cas de force
        majeure.
      </p>

      <h4 className="mt-5 font-semibold">11. Suspension du compte</h4>

      <p className="mt-2">
        Talco Analytics se réserve le droit de suspendre temporairement ou
        définitivement un compte en cas de non-paiement, de fraude, d'utilisation
        abusive de la plateforme ou de non-respect des présentes Conditions
        Générales.
      </p>

      <h4 className="mt-5 font-semibold">12. Propriété intellectuelle</h4>

      <p className="mt-2">
        Gallé Connect Pro, son interface, son code source, ses éléments graphiques,
        ses fonctionnalités et sa documentation demeurent la propriété exclusive de
        Talco Analytics. La souscription n'accorde qu'un droit personnel,
        non exclusif et non transférable d'utilisation de la plateforme.
      </p>

      <h4 className="mt-5 font-semibold">13. Acceptation</h4>

      <p className="mt-2">
        En cochant la case ci-dessous, le Client reconnaît avoir lu l'intégralité
        des présentes Conditions Générales d'Utilisation et d'Abonnement, les
        comprendre et les accepter sans réserve. Cette acceptation vaut engagement
        contractuel entre le Client et Talco Analytics.
      </p>
    </div>

    <div className="mt-6 p-2 items-start gap-3">
      <Checkbox id="conditionsAcceptees" checked={form.conditionsAcceptees as boolean} onCheckedChange={(checked) => update("conditionsAcceptees", checked === true)} />
      <Label
        htmlFor="conditionsAcceptees"
        className="cursor-pointer leading-relaxed"
      >
        Je déclare avoir lu et accepté les Conditions Générales d'Utilisation et
        d'Abonnement de Gallé Connect Pro. Je reconnais notamment :
        <ul className="mt-2 ml-5 list-disc text-sm">
          <li>avoir bénéficié d'une période d'essai gratuite d'un mois ;</li>
          <li>que l'activation de mon abonnement nécessite le paiement initial de trois (3) mois ;</li>
          <li>que mon abonnement est soumis à un engagement minimum de douze (12) mois ;</li>
          <li>qu'un changement de forfait est possible pendant cette période ;</li>
          <li>qu'une résiliation ne peut intervenir qu'à l'issue de la période d'engagement, sauf disposition contraire prévue par les Conditions Générales.</li>
        </ul>
      </Label>

    </div>
  </section>
}

function Paiement({ offre, modePaiement }: { offre: string; modePaiement: string }) {
  const offreSelectionnee = offres.find((item) => item.value === offre)
  const paiementMobile = modePaiement === "ORANGE_MONEY" || modePaiement === "WAVE"
  const libelleMode = modePaiement === "ORANGE_MONEY" ? "Orange Money" : modePaiement === "WAVE" ? "Wave" : "virement bancaire"
  const contactNecessaire = offre === "LICENCE" || !paiementMobile

  return <div className="py-5 text-center">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fef3db]"><CheckCircle2 className="h-8 w-8 text-[#d99306]" /></div>
    <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-[#d99306]">Demande envoyée</p>
    <h2 className="mt-2 text-2xl font-bold text-[#374250]">Finalisez votre paiement</h2>
    <div className="mx-auto mt-6 max-w-md rounded-xl bg-[#fef3db] p-5 text-left">
      <p className="text-sm text-[#3a3a3a]">Formule choisie</p>
      <p className="mt-1 text-xl font-bold text-[#374250]">{offreSelectionnee?.label} — {offreSelectionnee?.prix}</p>
    </div>
    {contactNecessaire ? (
      <div className="mx-auto mt-6 max-w-md text-left">
        <p className="leading-relaxed text-[#3a3a3a]">{offre === "LICENCE" ? "Pour la formule Licence, contactez notre agence afin de finaliser votre souscription et votre paiement." : "Contactez notre agence pour recevoir les coordonnées bancaires nécessaires au virement."}</p>
        <a className="mt-4 inline-block font-semibold text-[#d99306] hover:underline" href="tel:+221781816550">Appeler le {numeroPaiement}</a>
      </div>
    ) : (
      <div className="mx-auto mt-6 max-w-md text-left">
        <p className="leading-relaxed text-[#3a3a3a]">Effectuez un paiement de <strong>{offreSelectionnee?.prix}</strong> par <strong>{libelleMode}</strong> au numéro suivant :</p>
        <p className="mt-4 rounded-lg border border-[#d99306]/30 bg-background px-5 py-4 text-center text-2xl font-bold tracking-wider text-[#374250]">{numeroPaiement}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Utilisez le nom de votre agence comme référence de paiement. Notre équipe validera votre souscription après réception du paiement.</p>
      </div>
    )}
  </div>
}

function Champ({ label, name, value, update, placeholder, type = "text", min }: { label: string; name: string; value: string; update: (name: string, value: string) => void; placeholder: string; type?: string; min?: string }) {
  return <div className="flex flex-col gap-2">
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} name={name} type={type} min={min} value={value} onChange={(event) => update(name, event.target.value)} placeholder={placeholder} />
  </div>
}
