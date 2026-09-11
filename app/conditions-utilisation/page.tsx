import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

const sections = [
  {
    title: "1. Objet",
    content: "Les présentes conditions d’utilisation encadrent l’accès et l’usage de Gallé Connect Pro, une plateforme SaaS destinée aux agences immobilières. La plateforme permet notamment de centraliser la gestion des biens, clients, prospects, visites, contrats, factures et activités de l’agence.",
  },
  {
    title: "2. Acceptation des conditions",
    content: "En créant un compte, en envoyant une demande de souscription ou en utilisant la plateforme, vous reconnaissez avoir lu et accepté les présentes conditions. Vous déclarez agir pour le compte de votre agence et disposer de l’autorité nécessaire pour l’engager.",
  },
  {
    title: "3. Accès au service",
    content: "L’accès à certaines fonctionnalités est réservé aux clients disposant d’un abonnement actif. Gallé Connect Pro peut faire évoluer, maintenir ou améliorer le service afin de préserver sa sécurité, sa qualité et sa disponibilité.",
  },
  {
    title: "4. Souscription, tarifs et paiement",
    content: "Les offres, tarifs et modalités de paiement applicables sont présentés lors de la souscription. Une demande d’abonnement est soumise à validation. L’accès au service peut être conditionné à la réception et à la validation du paiement. Les tarifs et fonctionnalités peuvent évoluer ; toute modification substantielle sera communiquée aux clients concernés.",
  },
  {
    title: "5. Responsabilités de l’utilisateur",
    content: "Vous êtes responsable de l’exactitude, de la licéité et de la mise à jour des informations saisies dans la plateforme. Vous vous engagez à protéger vos identifiants, à ne pas partager vos accès de manière non autorisée et à utiliser le service dans le respect des lois applicables ainsi que des droits des tiers.",
  },
  {
    title: "6. Données de vos clients et utilisateurs",
    content: "Lorsque vous importez ou renseignez des données concernant des clients, prospects, propriétaires, biens ou agents, vous restez responsable de leur collecte et de leur utilisation. Vous devez notamment disposer d’une base légale appropriée et informer les personnes concernées lorsque cela est requis.",
  },
  {
    title: "7. Propriété intellectuelle",
    content: "La plateforme, ses marques, contenus, interfaces et éléments techniques sont protégés par les droits de propriété intellectuelle. Votre abonnement vous accorde un droit d’utilisation limité, non exclusif et non transférable, uniquement pour les besoins de votre activité professionnelle.",
  },
  {
    title: "8. Suspension ou résiliation",
    content: "Gallé Connect Pro peut suspendre l’accès au service en cas de non-paiement, d’utilisation frauduleuse, de risque de sécurité ou de violation des présentes conditions. Vous pouvez cesser d’utiliser le service et demander des précisions sur la clôture de votre compte en contactant le support.",
  },
  {
    title: "9. Limitation de responsabilité",
    content: "Gallé Connect Pro met en œuvre des moyens raisonnables pour assurer la continuité et la sécurité du service. Toutefois, le service est fourni sous réserve des interruptions nécessaires à la maintenance, des contraintes techniques et des événements indépendants de notre contrôle. L’utilisateur demeure responsable de ses décisions commerciales et de l’usage des données qu’il traite.",
  },
  {
    title: "10. Contact et évolution des conditions",
    content: "Pour toute question relative aux présentes conditions, contactez-nous à support@galleconnect.com. Ces conditions peuvent être mises à jour afin de refléter l’évolution du service ou des exigences applicables. La date de mise à jour figurant ci-dessous indique la dernière version en vigueur.",
  },
]

export default function ConditionsUtilisationPage() {
  return <><Navbar /><main className="bg-background py-16 md:py-24"><article className="mx-auto max-w-3xl px-6"><p className="text-sm font-semibold uppercase tracking-widest text-[#d99306]">Légal</p><h1 className="mt-3 font-serif text-4xl font-bold text-[#374250] md:text-5xl">Conditions d’utilisation</h1><p className="mt-5 text-sm text-muted-foreground">Dernière mise à jour : 11 septembre 2026</p><p className="mt-8 text-lg leading-relaxed text-[#3a3a3a]">Bienvenue sur Gallé Connect Pro. Ces conditions définissent les règles applicables à l’utilisation de notre plateforme par les agences immobilières.</p><div className="mt-12 space-y-10">{sections.map((section) => <section key={section.title}><h2 className="font-serif text-2xl font-bold text-[#374250]">{section.title}</h2><p className="mt-3 leading-7 text-[#3a3a3a]">{section.content}</p></section>)}</div></article></main><Footer /></>
}
