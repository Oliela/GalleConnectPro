import { NextResponse } from "next/server"
import { createAgence } from "../../../services/agenceServices"
import { Resend } from "resend"

export const dynamic = "force-dynamic" // 

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const agence = await createAgence(data)

    // L'email est secondaire — un échec ne doit pas bloquer l'inscription
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      resend.emails.send({
      from: "GalleConnect Pro <noreply@galleconnect.com>",
      to: process.env.RESEND_TO_EMAIL!,
      subject: "Nouvelle inscription sur la liste d'attente",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">
          <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:8px;">
            <h2 style="color:#374250;">Nouvelle agence inscrite sur la waitlist</h2>

            <p><strong>Nom complet :</strong> ${data.nomComplet}</p>
            <p><strong>Email :</strong> ${data.email}</p>
            <p><strong>Téléphone :</strong> ${data.telephone}</p>
            <p><strong>Nom de l'agence :</strong> ${data.nomAgence}</p>
            <p><strong>Pays :</strong> ${data.pays}</p>
            <p><strong>Ville :</strong> ${data.ville}</p>
            <p><strong>Taille de l'agence :</strong> ${data.tailleAgence} agent(s)</p>
            <p><strong>Logiciel de gestion :</strong> ${data.logicielGestion ? "Oui" : "Non"}</p>
            ${data.commentaire ? `<p><strong>Commentaire :</strong> ${data.commentaire}</p>` : ""}

            <hr style="margin-top:30px; border:none; border-top:1px solid #eee;" />
            <p style="font-size:12px; color:#888;">GalleConnect Pro — Notification automatique</p>
          </div>
        </div>
      `,
      }).catch((err) => console.error("Resend waitlist email error:", err))
    } else {
      console.error("RESEND_API_KEY est absente : notification de waitlist non envoyée")
    }

    return NextResponse.json(agence, { status: 201 })
  } catch (error: any) {
    console.error("Erreur API:", error)
    return NextResponse.json({ message: error.message || "Erreur interne" }, { status: 500 })
  }
}
