import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createSouscription, SouscriptionExistanteError } from "@/services/souscriptionServices"

const offres = ["STARTER", "BUSINESS", "PRO", "LICENCE"]
const modesPaiement = ["ORANGE_MONEY", "WAVE", "VIREMENT_BANCAIRE"]

const offreLabels: Record<string, string> = {
  STARTER: "Starter — 20 000 FCFA",
  BUSINESS: "Business — 35 000 FCFA",
  PRO: "Pro — 50 000 FCFA",
  LICENCE: "Licence — à partir de 2 500 000 FCFA",
}

const paiementLabels: Record<string, string> = {
  ORANGE_MONEY: "Orange Money",
  WAVE: "Wave",
  VIREMENT_BANCAIRE: "Virement bancaire",
}

const escapeHtml = (value: string) => value.replace(/[&<>"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
}[character] ?? character))

export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (
      !data.conditionsAcceptees ||
      !offres.includes(data.offre) ||
      !modesPaiement.includes(data.modePaiement)
    ) {
      return NextResponse.json({ message: "Les informations de souscription sont invalides." }, { status: 400 })
    }

    const souscription = await createSouscription(data)

    // La souscription reste valide même si le service d'e-mail est indisponible.
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      resend.emails.send({
      from: "GalleConnect Pro <noreply@galleconnect.com>",
      to: process.env.RESEND_TO_EMAIL ?? "info@galleconnect.com",
      replyTo: data.email,
      subject: `Nouvelle demande de souscription — ${offreLabels[data.offre]}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:40px;">
          <div style="max-width:600px;margin:auto;background:#ffffff;padding:30px;border-radius:8px;">
            <h2 style="color:#374250;">Nouvelle demande de souscription</h2>
            <p><strong>Agence :</strong> ${escapeHtml(data.nomAgence)}</p>
            <p><strong>Contact :</strong> ${escapeHtml(data.nomComplet)}</p>
            <p><strong>E-mail :</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Téléphone :</strong> ${escapeHtml(data.telephone)}</p>
            <p><strong>Localisation :</strong> ${escapeHtml(data.ville)}, ${escapeHtml(data.pays)}</p>
            <p><strong>Taille de l'agence :</strong> ${escapeHtml(data.tailleAgence)}</p>
            <p><strong>Offre :</strong> ${offreLabels[data.offre]}</p>
            <p><strong>Mode de paiement :</strong> ${paiementLabels[data.modePaiement]}</p>
            <p><strong>Conditions générales :</strong> Acceptées</p>
            <hr style="margin-top:30px;border:none;border-top:1px solid #eeeeee;" />
            <p style="font-size:12px;color:#888888;">Gallé Connect Pro — Notification automatique</p>
          </div>
        </div>
      `,
      }).catch((error) => console.error("Resend souscription email error:", error))
    } else {
      console.error("RESEND_API_KEY est absente : notification de souscription non envoyée")
    }

    return NextResponse.json(souscription, { status: 201 })
  } catch (error: unknown) {
    console.error("Erreur de souscription:", error)
    if (error instanceof SouscriptionExistanteError) {
      return NextResponse.json({ message: error.message }, { status: 409 })
    }
    return NextResponse.json({ message: "Une erreur est survenue. Veuillez réessayer plus tard." }, { status: 500 })
  }
}
