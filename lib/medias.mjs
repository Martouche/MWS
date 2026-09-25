// ---------------------------------------------------------------------------
// Inventaire des médias du site.
//
// Chaque entrée : fichier source dans medias-source/ (téléchargé depuis l'ancien
// WordPress par tools/scraper.mjs), texte alternatif, et largeur maximale utile.
// `node tools/medias.mjs` produit dans assets/images/ un AVIF et un WebP par
// largeur, puis écrit assets/images/manifest.json (dimensions réelles).
// ---------------------------------------------------------------------------

/** Largeurs générées (bornées par la largeur de l'original et par `max`). */
export const LARGEURS = [160, 320, 480, 768, 1024, 1600, 2048];

const U = (chemin) => chemin.replace(/\//g, "__");

export const medias = {
  // --- Parachute ascensionnel --------------------------------------------
  "parachute-ascensionnel-mandelieu": {
    src: U("2023/01/parachute-ascensionnel-couverture-mandelieu-watersports-scaled.jpg"),
    alt: "Parachute ascensionnel orange au-dessus du bateau dans la baie de Mandelieu – Théoule",
  },
  "parachute-trois-amies": {
    src: U("2026/02/parachute-ascensionnel-cannes-theoule-mandelieu-watersports-mws-10.jpg"),
    alt: "Trois amies harnachées sous le parachute ascensionnel, prêtes à décoller du bateau",
  },
  "parachute-vol-ciel": {
    src: U("2025/07/parachute-ascensionnel-adulte-mandelieu-reserver-theoule-mandelieu-watersports.jpg"),
    alt: "Vol à trois en parachute ascensionnel au-dessus de la baie de Cannes – Théoule",
  },
  "parachute-fou-rire": {
    src: U("2025/07/parachute-ascensionnel-fun-vol-mandelieu-watersports.jpg"),
    alt: "Fou rire au retour d'un vol en parachute ascensionnel à Mandelieu",
    max: 1600,
  },
  "parachute-selfie-coucher-soleil": {
    src: U("2026/02/parachute-ascensionnel-cannes-theoule-mandelieu-watersports-mws.jpeg"),
    alt: "Selfie en plein vol de parachute ascensionnel au coucher du soleil sur la Méditerranée",
  },
  "parachute-atterrissage": {
    src: U("2023/01/atterissage-parachute-ascensionnel-mandelieu-watersports-theoule-scaled.jpg"),
    alt: "Atterrissage en douceur du parachute ascensionnel sur la plateforme du bateau",
  },
  "parachute-pilote": {
    src: U("2023/01/securite-parachute-ascensionnel-mandelieu-watersports-theoule.jpg"),
    alt: "Pilote breveté d'État surveillant un vol de parachute ascensionnel en toute sécurité",
  },
  "parachute-bateau-amies": {
    src: U("2026/02/parachute-ascensionnel-cannes-theoule-mandelieu-watersports-mws-12.jpg"),
    alt: "Amies souriantes à bord du bateau de parachute ascensionnel avant leur vol",
  },
  "parachute-famille": {
    src: U("2026/05/groupe-privatisation-bateau-parachute-enfant-vol-mandelieu-watersports.webp"),
    alt: "Famille avec enfants équipée pour un vol en parachute ascensionnel",
  },
  "parachute-deux-bateaux": {
    src: U("2024/02/double-bateau-parachute-ascensionnel-mandelieu-watersports.png"),
    alt: "Deux bateaux de parachute ascensionnel devant Théoule-sur-Mer",
  },
  "parachute-vol-4-personnes": {
    src: U("2023/01/vol-4-personnes-mandelie-watersports.jpeg"),
    alt: "Vol à quatre personnes en parachute ascensionnel, mains libres",
  },
  "parachute-carte-adulte": {
    src: U("2025/07/parachute-ascensionnel-adulte-mandelieu-go-pricing-theoule-mandelieu-watersports.jpg"),
    alt: "Parachute ascensionnel adulte au-dessus de Théoule",
  },
  "parachute-carte-enfant": {
    src: U("2024/02/parachute-ascensionnel-4-personnes-depart-mandelieu-watersports.jpeg"),
    alt: "Départ en parachute ascensionnel à quatre, enfants et adultes",
  },

  // --- Jet ski -------------------------------------------------------------
  "jet-ski-duo-esterel": {
    src: U("2026/02/location-jet-ski-cannes-theoule-mandelieu-watersports-mws.jpg"),
    alt: "Duo en jet ski sans permis devant les roches rouges de l'Esterel",
  },
  "jet-ski-duo-baie": {
    src: U("2026/02/location-jet-ski-cannes-theoule-mandelieu-watersports-mws-1.jpg"),
    alt: "Deux amies en jet ski sans permis dans la baie de Mandelieu",
  },
  "jet-ski-location-ponton": {
    src: U("2026/02/randonnee-jet-ski-cannes-mandelieu-watersports-theoule-mws-9.jpg"),
    alt: "Location de jet ski sans permis au départ de la plage de la Rague",
  },
  "jet-ski-randonnee-esterel": {
    src: U("2026/02/randonnee-jet-ski-cannes-mandelieu-watersports-theoule-mws-3.jpg"),
    alt: "Randonnée jet ski le long des criques sauvages de l'Esterel",
  },
  "jet-ski-randonnee-groupe": {
    src: U("2026/02/randonnee-jet-ski-cannes-mandelieu-watersports-theoule-mws-7.jpg"),
    alt: "Groupe en randonnée jet ski dans la baie de Cannes",
  },
  "jet-ski-randonnee-duo": {
    src: U("2026/02/randonnee-jet-ski-cannes-mandelieu-watersports-theoule-mws-2.jpg"),
    alt: "Couple en randonnée jet ski sans permis entre Mandelieu et Théoule",
  },
  "jet-ski-coucher-soleil": {
    src: U("2026/02/randonnee-jet-ski-cannes-mandelieu-watersports-theoule-mws.png"),
    alt: "Randonnée jet ski au coucher du soleil face au massif de l'Esterel",
  },
  "jet-ski-sunset": {
    src: U("2024/01/jet-ski-sunset.png"),
    alt: "Jet ski sur une mer dorée au coucher du soleil, baie de Mandelieu",
  },
  "jet-ski-drone": {
    src: U("2024/01/jet-ski-image-drone-mandelieu-watersports.png"),
    alt: "Vue drone de jet skis traçant des courbes sur l'eau turquoise",
  },
  "iles-lerins-saint-honorat": {
    src: U("2026/05/saint-honorat-vue-du-ciel-mairie-de-cannes-axis-drone-mandelieu-watersports.jpg"),
    alt: "Île Saint-Honorat vue du ciel, étape de la randonnée jet ski aux îles de Lérins",
  },
  "petit-dejeuner-ponton": {
    src: U("2024/01/petit-dejeuner-randonnee-jet-ski-mandelieu-watersports.png"),
    alt: "Petit déjeuner servi sur le ponton avant la randonnée jet ski",
  },
  "esterel-roches-rouges": {
    src: U("2024/01/massif-esterel-randonnee-jet-ski-mandelieu-watersports.png"),
    alt: "Roches rouges du massif de l'Esterel plongeant dans la mer turquoise",
  },
  "jet-ski-calanque": {
    src: U("2024/01/jet-ski-soleil-randonnee-mandelieu-watersports.png"),
    alt: "Jet ski au pied d'une falaise de l'Esterel en contre-jour",
  },
  "jet-ski-chien-rambo": {
    src: U("2024/01/location-randonnee-jet-ski-chien-mandelieu-watersports.png"),
    alt: "Rambo, la mascotte de Mandelieu Watersports, en jet ski avec une cliente",
  },
  "jet-ski-chateau-napoule": {
    src: U("2024/01/randonnee-jet-ski-mandelieu-watersports-chateau-scaled.jpg"),
    alt: "Jet skis devant le château de La Napoule",
  },
  "jet-ski-groupe-baie": {
    src: U("2024/01/randonnee-jet-ski-mandelieu-watersports-scaled.jpg"),
    alt: "Groupe de jet skis en randonnée dans la baie de Mandelieu",
  },
  "jet-ski-pilote": {
    src: U("2024/01/location-jet-ski-cannes-theoule-mandelieu-watersports.png"),
    alt: "Pilote de jet ski sans permis dans la baie de Cannes",
  },
  "jet-ski-femme-pilote": {
    src: U("2024/01/femme-location-jet-ski-1h-theoule-mandelieu-watersports.png"),
    alt: "Femme pilotant un jet ski lors d'une location d'une heure à Théoule",
  },
  "jet-ski-portrait": {
    src: U("2024/02/location-randonnee-jet-ski-theoule-cannes-mandelieu-watersports.png"),
    alt: "Location et randonnée jet ski entre Théoule, Cannes et Mandelieu",
  },
  "base-nautique": {
    src: U("2026/02/base-nautique-mandelieu-watersports-scaled.jpg"),
    alt: "Base nautique Mandelieu Watersports sur la plage de la Rague",
  },
  "accueil-base": {
    src: U("2023/01/conseil-accompagnement-mandelieu-watersports.jpg"),
    alt: "Accueil et conseils à la base nautique Mandelieu Watersports",
  },

  // --- Visuels « carte » (format 1031×586 conçus pour les tarifs) -------------
  "carte-randonnee-coucher-soleil": {
    src: U("2024/02/jet-ski-best-seller-mandelieu-watersports-cannes-theoule.png"),
    alt: "Randonnée jet ski coucher de soleil à Cannes, Mandelieu, Théoule",
  },
  "carte-randonnee-petit-dejeuner": {
    src: U("2024/02/jet-ski-randonnee-petit-dejeuner-best-seller-mandelieu-watersports.png"),
    alt: "Randonnée jet ski petit déjeuner vers les îles de Lérins",
  },
  "carte-randonnee-midi": {
    src: U("2025/07/randonnee-jet-ski-du-midi-mandelieu-cannes-watersport-go-pricing.png"),
    alt: "Randonnée jet ski du midi dans le massif de l'Esterel",
  },
  "carte-location-30": {
    src: U("2024/02/location-jet-ski-30-min-mandelieu-watersports-cannes-theoule.png"),
    alt: "Location jet ski 30 minutes sans permis à Mandelieu",
  },
  "carte-location-1h": {
    src: U("2024/02/location-jet-ski-1-heure-mandelieu-watersports-cannes-theoule.png"),
    alt: "Location jet ski 1 heure sans permis entre Cannes et Théoule",
  },
  "carte-pack-bouee": {
    src: U("2024/02/pack-parachute-bouee-mandelieu-watersports.png"),
    alt: "Pack parachute ascensionnel et bouée tractée – Mandelieu Watersports",
  },
  "carte-pack-jet-ski": {
    src: U("2024/02/pack-parachute-jet-ski-mandelieu-watersports.png"),
    alt: "Pack parachute ascensionnel et jet ski – Mandelieu Watersports",
  },
  "pack-parachute-bouee": {
    src: U("2026/03/pack-parachute-bouee-tractee-mandelieu-watersports-cannes-theoule.png"),
    alt: "Pack parachute ascensionnel et bouée tractée – Mandelieu Watersports, Cannes, Théoule",
  },
  "pack-parachute-jet-ski": {
    src: U("2026/02/pack-jet-ski-parachute-ascensionnel-mandelieu-watersports.png"),
    alt: "Pack jet ski et parachute ascensionnel – Mandelieu Watersports",
  },

  // --- Bouée tractée ------------------------------------------------------
  "bouee-tractee-groupe": {
    src: U("2026/02/bouee-tractee-mandelieu-watersports-cannes-theoule-activite-nautique-9.jpeg"),
    alt: "Groupe d'amis bras levés sur la bouée tractée dans la baie de Mandelieu",
  },
  "bouee-tractee-joie": {
    src: U("2026/02/bouee-tractee-mandelieu-watersports-cannes-theoule-activite-nautique-7.jpeg"),
    alt: "Explosion de joie sur la bouée tractée à Mandelieu – Théoule",
  },
  "bouee-tractee-vitesse": {
    src: U("2026/02/bouee-tractee-mandelieu-watersports-cannes-theoule-activite-nautique-2.jpeg"),
    alt: "Bouée tractée lancée à pleine vitesse derrière le bateau",
  },
  "bouee-canape": {
    src: U("2026/02/bouee-tractee-mandelieu-watersports-cannes-theoule-activite-nautique-5.jpeg"),
    alt: "Canapé tracté dans le sillage du bateau",
  },
  "bouee-tractee-mer": {
    src: U("2023/01/Bouee-tractee-bouee-tractee-mandelieu-watersports.jpg"),
    alt: "Bouée tractée et canapé tracté au large de Mandelieu",
  },
  "bouee-tractee-famille": {
    src: U("2026/02/bouee-tractee-mandelieu-watersports-cannes-theoule-activite-nautique-13-scaled.jpeg"),
    alt: "Famille sur la bouée tractée, prête à partir",
  },

  // --- Glisse --------------------------------------------------------------
  "ski-nautique": {
    src: U("2023/01/ski-nautique-mandelieu-watersports.jpg"),
    alt: "Jeune skieuse en ski nautique devant le massif de l'Esterel",
  },
  "ski-nautique-baie": {
    src: U("2023/01/ski-nautique-cannes-mandelieu-watersports.jpg"),
    alt: "Ski nautique dans la baie de Cannes – Mandelieu",
  },
  "ski-nautique-enfant": {
    src: U("2024/02/ski-nautique-tracte-bateau-theoule-cannes-mandelieu-watersports.png"),
    alt: "Ski nautique tracté par bateau entre Théoule et Cannes",
  },
  wakeboard: {
    src: U("2023/01/wakeboard-wakesurf-ski-nautique-mandelieu-watersports.jpg"),
    alt: "Rider de wakeboard dans le sillage du bateau à Mandelieu",
  },
  wakesurf: {
    src: U("2023/01/wakesurf-mandelieu-watersports-theoule.jpg"),
    alt: "Wakesurf derrière le bateau dans la baie de Théoule",
  },

  // --- Événements ------------------------------------------------------------
  evjf: {
    src: U("2017/07/EVJF-boat-evasion.jpg"),
    alt: "Groupe d'amies en enterrement de vie de jeune fille sur la plage",
  },
  seminaire: {
    src: U("2017/07/SEMINAIRE-CANNES-MANDELIEU.jpg"),
    alt: "Séminaire d'entreprise sur la plage à Mandelieu",
  },
  "privatisation-bateau": {
    src: U("2023/01/groupe-privatisation-bateau-parachute-mandelieu-watersports.jpg"),
    alt: "Groupe à bord du bateau de parachute ascensionnel privatisé",
  },

  // --- Divers ----------------------------------------------------------------
  gopro: {
    src: U("revslider/souvenir/gopro-hero-8-black-150x150.png"),
    alt: "Caméra GoPro pour filmer votre activité",
    max: 150,
  },
  "poster-accueil": {
    src: U("revslider/video-media/video-accueil-mandelieu-watersports_7.jpeg"),
    alt: "",
  },
};

/**
 * Pictogrammes ronds du style (.feat img, 56 px) : recadrés au centre en carré.
 */
export const pictos = {
  "picto-jet-ski": U("2024/01/9-min.png"),
  "picto-confiance": U("2024/01/24-min-min.png"),
  "picto-parachute": U("2024/01/13-min.png"),
  "picto-bouee": U("2024/01/5-min-min.png"),
  "picto-glisse": U("2024/01/25-min-min.png"),
};

/** Logos : conservés en PNG (transparence) + WebP. */
export const logos = {
  logo: { src: U("2024/03/LOGOS_ORANGE_GRIS-mandelieu-watersports-jet-ski-parachute-accueil-bandeau.png"), alt: "Mandelieu WaterSports" },
  "logo-blanc": { src: U("2024/03/LOGOS_ORANGE_BLANC-mandelieu-watersports-jet-ski-parachute-accueil-bandeau.png"), alt: "Mandelieu WaterSports" },
  adrenactive: { src: U("2026/07/logo-adrenactive-blanc.png"), alt: "Adrenactive" },
};

/** Vidéos : ré-encodées en H.264 720p sans piste son (lues en muet). */
export const videos = {
  "video-accueil": { src: U("2024/02/video-accueil-mandelieu-watersports.mp4"), poster: "poster-accueil" },
  "video-parachute": { src: U("2026/02/PARACHUTE-REEL-video-mandelieu-watersports-cannes-theoule-evjf.mp4"), portrait: true },
  "video-jet-ski": { src: U("2024/01/jet-ski-video-mandelieu-watersports.mp4") },
  "video-location-jet-ski": { src: U("2024/01/location-jet-ski-mandelieu-watersports.mp4") },
};
