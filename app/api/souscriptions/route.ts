import { NextResponse } from "next/server"
import { createSouscription, SouscriptionExistanteError } from "@/services/souscriptionServices"

const offres = ["STARTER", "BUSINESS", "PRO", "LICENCE"]
const modesPaiement = ["ORANGE_MONEY", "WAVE", "VIREMENT_BANCAIRE"]

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
    return NextResponse.json(souscription, { status: 201 })
  } catch (error: unknown) {
    console.error("Erreur de souscription:", error)
    if (error instanceof SouscriptionExistanteError) {
      return NextResponse.json({ message: error.message }, { status: 409 })
    }
    return NextResponse.json({ message: "Une erreur est survenue. Veuillez réessayer plus tard." }, { status: 500 })
  }
}
