import { prisma } from "../lib/prisma"

export class SouscriptionExistanteError extends Error {
  constructor() {
    super("Votre demande a déjà été envoyée avec cette adresse e-mail.")
  }
}

type SouscriptionData = {
  nomComplet: string
  telephone: string
  email: string
  nomAgence: string
  pays: string
  ville: string
  tailleAgence: string
  offre: string
  modePaiement: string
  conditionsAcceptees: boolean
}

export async function createSouscription(data: SouscriptionData) {
  const agenceExistante = await prisma.agence.findUnique({
    where: { email: data.email },
    include: { souscriptions: { select: { id: true } } },
  })

  if (agenceExistante?.souscriptions.length) {
    throw new SouscriptionExistanteError()
  }

  const agence = await prisma.agence.upsert({
    where: { email: data.email },
    update: {
      nomComplet: data.nomComplet,
      telephone: data.telephone,
      nomAgence: data.nomAgence,
      pays: data.pays,
      ville: data.ville,
      tailleAgence: data.tailleAgence,
      logicielGestion: false,
    },
    create: {
      nomComplet: data.nomComplet,
      telephone: data.telephone,
      email: data.email,
      nomAgence: data.nomAgence,
      pays: data.pays,
      ville: data.ville,
      tailleAgence: data.tailleAgence,
      logicielGestion: false,
    },
  })

  return prisma.souscription.create({
    data: {
      agenceId: agence.id,
      offre: data.offre,
      modePaiement: data.modePaiement,
      conditionsAcceptees: data.conditionsAcceptees,
    },
  })
}
