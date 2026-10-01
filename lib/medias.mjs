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
    alt: "Vol en parachute ascensionnel au-dessus du bateau dans le golfe de la Napoule, entre Mandelieu et Théoule-sur-Mer",
  },
  "parachute-trois-amies": {
    src: U("2026/02/parachute-ascensionnel-cannes-theoule-mandelieu-watersports-mws-10.jpg"),
    alt: "Trois amies prêtes pour un vol en parachute ascensionnel à trois depuis le bateau, à Mandelieu",
  },
  "parachute-vol-ciel": {
    src: U("2025/07/parachute-ascensionnel-adulte-mandelieu-reserver-theoule-mandelieu-watersports.jpg"),
    alt: "Vol en parachute ascensionnel à trois au-dessus de la baie de Cannes, près de Théoule-sur-Mer",
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
    alt: "Duo en jet ski sans permis devant les roches rouges de l'Esterel, près de Théoule-sur-Mer",
  },
  "jet-ski-duo-baie": {
    src: U("2026/02/location-jet-ski-cannes-theoule-mandelieu-watersports-mws-1.jpg"),
    alt: "Location de jet ski sans permis à Mandelieu : deux amies dans le golfe de la Napoule",
  },
  "jet-ski-location-ponton": {
    src: U("2026/02/randonnee-jet-ski-cannes-mandelieu-watersports-theoule-mws-9.jpg"),
    alt: "Location de jet ski sans permis au départ de la plage de la Rague",
  },
  "jet-ski-randonnee-esterel": {
    src: U("2026/02/randonnee-jet-ski-cannes-mandelieu-watersports-theoule-mws-3.jpg"),
    alt: "Randonnée en jet ski sans permis le long des criques de l'Esterel, au départ de Mandelieu",
  },
  "jet-ski-randonnee-groupe": {
    src: U("2026/02/randonnee-jet-ski-cannes-mandelieu-watersports-theoule-mws-7.jpg"),
    alt: "Randonnée en jet ski sans permis dans la baie de Cannes depuis Mandelieu",
  },
  "jet-ski-randonnee-duo": {
    src: U("2026/02/randonnee-jet-ski-cannes-mandelieu-watersports-theoule-mws-2.jpg"),
    alt: "Couple en randonnée jet ski sans permis entre Mandelieu et Théoule",
  },
  "jet-ski-coucher-soleil": {
    src: U("2026/02/randonnee-jet-ski-cannes-mandelieu-watersports-theoule-mws.png"),
    alt: "Randonnée jet ski au coucher du soleil face au massif de l'Esterel, baie de Cannes",
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
    alt: "Île Saint-Honorat vue du ciel : étape de la randonnée jet ski aux îles de Lérins, au large de Cannes",
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
  "jet-ski-location-couple": {
    src: U("2026/02/location-jet-ski-cannes-theoule-mandelieu-watersports-mws-4.jpg"),
    alt: "Couple en location de jet ski sans permis à pleine vitesse dans le golfe de la Napoule, face à Théoule-sur-Mer",
  },
  "jet-ski-location-amies": {
    src: U("2026/02/randonnee-jet-ski-cannes-mandelieu-watersports-theoule-mws-5.jpg"),
    alt: "Deux amies en jet ski sans permis au départ de Mandelieu, devant les villas de Théoule-sur-Mer",
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
    alt: "Base nautique Mandelieu Watersports, plage de la Rague à Mandelieu-la-Napoule, près de Théoule-sur-Mer",
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
    alt: "Bouée tractée à Mandelieu : groupe d'amis bras levés dans le golfe de la Napoule, près de Cannes",
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
    alt: "Ski nautique à Mandelieu : jeune skieuse devant le massif de l'Esterel",
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
    alt: "Wakeboard à Mandelieu – Théoule : rider dans le sillage du bateau",
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
  "poster-accueil": {
    src: U("revslider/video-media/video-accueil-mandelieu-watersports_7.jpeg"),
    alt: "",
  },
};

/** Logos : conservés en PNG (transparence) + WebP. */
export const logos = {
  "logo-horizontal": { src: U("2024/03/LOGOS_ORANGE_GRIS-mandelieu-watersports-jet-ski-parachute-accueil-bandeau.png"), alt: "Mandelieu WaterSports" },
  "logo-horizontal-blanc": { src: U("2024/03/LOGOS_ORANGE_BLANC-mandelieu-watersports-jet-ski-parachute-accueil-bandeau.png"), alt: "Mandelieu WaterSports" },
  adrenactive: { src: U("2026/07/logo-adrenactive-blanc.png"), alt: "Adrenactive" },
};

/** Vidéos : ré-encodées en H.264 720p sans piste son (lues en muet).
 *  `debut` / `fin` (s) : extrait conservé. `hero: true` : vidéo de fond du hero,
 *  produite en deux versions depuis un original vertical (9:16) :
 *    <cle>.mp4           paysage 16:9 (1080×606), recadrée à `cadrageY` (0 = haut, 1 = bas)
 *                        ou plan par plan avec `cadrages` : [[début du plan (s, dans l'original), cadrageY], …]
 *    <cle>-portrait.mp4  verticale 720×1280, pour les écrans en portrait (téléphones)
 *  Débit plafonné (`debit`, 1,6 Mb/s par défaut) : chaque fichier reste sous 5 Mo. */
export const videos = {
  // Reel jet ski : de 16,4 s à 39,8 s (sans l'intro texte, l'écran partagé ni le logo de fin).
  "hero-jet-ski": { src: U("2026/02/JET-SKI-reel-mandelieu-watersports.mp4"), hero: true, debut: 16.44, fin: 39.8,
    cadrages: [[16.44, 0.43], [18.4, 0.81], [20.4, 0.5], [22.4, 0.5], [24.24, 0.39], [26.2, 0.58], [28.12, 0.68], [30.12, 0.5], [32, 0.76], [33.04, 0.47], [34.96, 0.58], [37.88, 0.39]] },
  // Reel parachute : les 27,5 premières secondes (avant les plans au ponton et le logo de fin).
  "hero-parachute": { src: U("2026/02/PARACHUTE-REEL-video-mandelieu-watersports-cannes-theoule-evjf.mp4"), hero: true, debut: 0, fin: 27.5, debit: "1450k",
    cadrages: [[0, 0.39], [0.84, 0.29], [1.6, 0.35], [2.24, 0.39], [3.04, 0.57], [3.72, 0.57], [4.44, 0.32], [5.2, 0.5], [5.96, 0.21], [7.32, 0.28], [8.72, 0.58], [15.16, 0.24], [17.28, 0.35], [19.4, 0.58], [21.76, 0.58]] },
  "video-accueil": { src: U("2024/02/video-accueil-mandelieu-watersports.mp4"), poster: "poster-accueil" },
  "video-parachute": { src: U("2026/02/PARACHUTE-REEL-video-mandelieu-watersports-cannes-theoule-evjf.mp4"), portrait: true },
  "video-jet-ski": { src: U("2024/01/jet-ski-video-mandelieu-watersports.mp4") },
  "video-location-jet-ski": { src: U("2024/01/location-jet-ski-mandelieu-watersports.mp4") },
};
