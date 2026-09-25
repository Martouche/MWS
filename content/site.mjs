// ---------------------------------------------------------------------------
// Informations générales du site. Modifier ici un téléphone, un horaire, une
// adresse : tout le site (pages, pied de page, données structurées) suit.
// ---------------------------------------------------------------------------

export const site = {
  nom: "Mandelieu Watersports",
  nomCourt: "Mandelieu WaterSports",
  domaine: "https://www.mandelieu-watersports.com",
  langue: "fr",

  telephone: "+33665480606",
  telephoneAffiche: "06 65 48 06 06",
  email: "contact@mandelieu-watersports.com",

  adresse: {
    rue: "157-305 rue du Capitaine Corvette Marché",
    lieu: "Plage de la Rague",
    codePostal: "06210",
    ville: "Mandelieu-la-Napoule",
    region: "Provence-Alpes-Côte d'Azur",
    pays: "FR",
  },
  geo: { lat: 43.5181991, lon: 6.9398808 },
  googleMaps: "https://www.google.com/maps/dir/?api=1&destination=Mandelieu+Watersports+Plage+de+la+Rague+Mandelieu-la-Napoule",

  horaires: "Lundi - Dimanche | 8 h – 20 h",
  horairesCourt: "Lundi - Dimanche : 8h - 20h",
  ouverture: { jours: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], de: "08:00", a: "20:00" },
  langues: ["Anglais", "Allemand", "Italien", "Russe"],
  villes: ["Mandelieu-la-Napoule", "Cannes", "Théoule-sur-Mer"],

  societe: {
    raison: "WA NAUTIQUE",
    forme: "SASU",
    capital: "1 000 €",
    siren: "829 289 081",
    tva: "FR03829289081",
    directeur: "Andy Winterhalter",
    siege: "467 boulevard des Écureuils, 06210 Mandelieu-la-Napoule",
  },

  carteCadeau: "https://mandelieu-watersports.resactivity.com/carte-cadeau/",
  partenaire: { nom: "Adrenactive", url: "https://www.adrenactive.com/" },

  // Conservé depuis l'ancien site : sans elle, la Search Console perd la propriété.
  googleVerification: "cgMre7YhrLilmPtTqNjAvN3t0miKjrhGVTnJm2W8IEQ",
  // Conteneurs Google Tag Manager de l'ancien site. Chargés uniquement après
  // consentement (bandeau cookies), jamais avant.
  gtm: ["GTM-5MLCCH8", "GTM-P7DLK2XP"],

  // Force le HTTPS et le www dans le .htaccess généré.
  forcerHttps: true,
  hote: "www",
};

/** Widget de réservation Resamare (Lagenza) utilisé par l'ancien site. */
export const resamare = {
  script: "https://webservice.lagenza.fr/assets/widgets/calendrier/index.js",
  api: "https://mandelieu-watersports.resactivity.com/resaApi",
  couleur: "#2f60ea",
};

/** Menu principal (en-tête desktop, tiroir mobile, pied de page). */
export const activitesMenu = [
  { href: "/randonnee-jet-ski/", label: "Randonnée Jet Ski", sous: "Îles de Lérins, Esterel", img: "carte-randonnee-petit-dejeuner" },
  { href: "/location-jet-ski/", label: "Location Jetski", sous: "Sans permis, encadré", img: "jet-ski-portrait" },
  { href: "/parachute-ascensionnel/", label: "Parachute Ascensionnel", sous: "Dès 3 ans, jusqu’à 5 personnes", img: "parachute-ascensionnel-mandelieu" },
  { href: "/bouee-tractee/", label: "Bouée Tractée", sous: "Bouée & canapé tracté", img: "bouee-tractee-mer" },
  { href: "/wakeboard/", label: "Wakeboard", sous: "Session glisse", img: "wakeboard" },
  { href: "/ski-nautique/", label: "Ski Nautique", sous: "Session glisse", img: "ski-nautique-enfant" },
];

export const evenementsMenu = [
  { href: "/evenement-evg-evgf-mandelieu-cannes/", label: "Evènements Privés" },
  { href: "/privatisation-parachute-ascensionnel/", label: "Privatisation" },
  { href: "/evenement-evg-evgf-mandelieu-cannes/seminaires/", label: "Séminaire" },
  { href: "/evenement-evg-evgf-mandelieu-cannes/evjf/", label: "EVJF" },
];
