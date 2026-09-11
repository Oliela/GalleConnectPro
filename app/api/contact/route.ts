import { Resend } from "resend"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message, sujet, phone } = body

    if (!name || !email || !message || !sujet || !phone) {
      return Response.json({ error: "Champs manquants" }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY est absente")
      return Response.json({ error: "Le service d'e-mail est temporairement indisponible." }, { status: 503 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "GalleConnect Pro <noreply@galleconnect.com>",
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: email,
      subject: "Nouveau message depuis galleconnectpro.com",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">
          <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:8px;">
            <h2 style="color:#374250;">Nouveau message de contact</h2>

            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Sujet :</strong> ${sujet}</p>

            <div style="margin-top:20px; padding:15px; background:#f9f9f9; border-radius:6px;">
              <p>${message}</p>
            </div>

            <div style="margin-top:30px; text-align:center;">
              <a href="mailto:${email}"
                 style="background:#d99306; color:white; padding:12px 20px; text-decoration:none; border-radius:5px;">
                Répondre au message
              </a>
            </div>

            <hr style="margin-top:30px; border:none; border-top:1px solid #eee;" />
            <p style="font-size:12px; color:#888;">GalleConnect Pro — Notification automatique</p>
          </div>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Erreur email:", error)
    return Response.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
