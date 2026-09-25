// ---------------------------------------------------------------------------
// Pages activités. Textes repris de l'ancien site, dédoublonnés et corrigés ;
// les mots-clés et les titres (title/description) sont conservés pour ne pas
// perdre le positionnement acquis.
// ---------------------------------------------------------------------------

const AVANTAGES_JET_SKI = [
  { titre: "Liberté totale", texte: "Nos jet skis sont accessibles sans permis ! Pilotez sans tracas administratifs." },
  { titre: "Le meilleur tarif", texte: "Seul ou à deux sur un jet ski, le prix reste le même : vous êtes doublement gagnants !" },
  { titre: "Équipements de qualité", texte: "L’équipement pour votre confort et votre sécurité est inclus." },
  { titre: "Cadre exceptionnel", texte: "Vous découvrez la baie de Théoule depuis la mer et, qui sait, peut-être croiserez-vous des dauphins ?" },
  { titre: "On s’adapte à vous !", texte: "Sortie en duo ou en groupe : nos différentes formules vous offrent une flexibilité totale." },
];

export const activites = {
  "parachute-ascensionnel": {
    url: "/parachute-ascensionnel/",
    title: "Parachute ascensionnel Mandelieu | Mandelieu Watersports",
    description: "Venez découvrir la pratique du parachute ascensionnel Mandelieu avec vos amis ! Parachute ascensionnel Mandelieu Watersports",
    nom: "Parachute ascensionnel",
    h1: "Parachute ascensionnel à Mandelieu – Théoule",
    kicker: "Envolez-vous avec nous !",
    tagline: "Baie de Cannes · Mandelieu · Théoule-sur-Mer",
    hero: "parachute-ascensionnel-mandelieu",
    faits: [["Dès", "3 ans"], ["Jusqu’à", "5 personnes"], ["À partir de", "40 €"]],
    categories: ["parachute"],
    intro: {
      eyebrow: "Une expérience sensationnelle",
      titre: "Parachute ascensionnel Mandelieu Théoule, une expérience sensationnelle !",
      textes: [
        "Bienvenue à Mandelieu Watersports, où le ciel devient votre terrain de jeu. Envolez-vous au-dessus des eaux scintillantes de la baie de Mandelieu, Cannes et Théoule-sur-Mer : ce n’est pas pour rien que parachute ascensionnel rime avec sensationnel !",
        "Admirez un panorama à 360° entre ciel et mer. Vous découvrirez la baie comme vous ne l’avez jamais vue, entre le majestueux massif de l’Esterel et les îles de Lérins.",
      ],
      image: "parachute-vol-ciel",
    },
    essentiel: {
      titre: "L’essentiel",
      items: [
        ["Dès 3 ans", "Accessible aux enfants accompagnés d’un adulte."],
        ["Jusqu’à 5 sous la voile", "Volez à deux, trois, quatre ou cinq, dans la limite de 240 kg cumulés."],
        ["Pilote breveté d’État", "Une équipe professionnelle vous équipe et vous accompagne à chaque étape."],
        ["Pas de vertige", "Aucun contact direct avec le sol : la sensation de vertige n’existe pas. Pas besoin de savoir nager."],
      ],
    },
    comment: {
      titre: "Comment ça marche ?",
      etapes: [
        { titre: "Le briefing", texte: "À votre arrivée sur la base nautique, un briefing vous explique le fonctionnement du parachute et la réglementation sur l’eau." },
        { titre: "À bord", texte: "Vous embarquez sur notre bateau de parachute ascensionnel dernier cri. Ambiance musicale et sourires garantis, entre les mains d’un pilote expérimenté et breveté d’État." },
        { titre: "Décollage !", texte: "Vous vous envolez à deux, trois, quatre ou cinq depuis la plateforme du bateau. Vos mains restent libres pour profiter de chaque instant, puis vous atterrissez en douceur à bord." },
      ],
    },
    avantages: {
      titre: "Avantages du parachute ascensionnel",
      intro: "Chez Mandelieu Watersports, nous sommes déterminés à rendre votre vol inoubliable. Voici ce que vous apprécierez :",
      items: [
        { titre: "Liberté totale", texte: "Vous volez comme un oiseau au-dessus de la baie de Cannes – Mandelieu – Théoule-sur-Mer !" },
        { titre: "Pas de vertige !", texte: "Déconnexion totale garantie, sans vertige : vous n’avez aucun contact direct avec le sol." },
        { titre: "Équipements de qualité", texte: "Votre confort et votre sécurité sont garantis par notre équipe de professionnels." },
        { titre: "Cadre exceptionnel", texte: "La baie de Cannes – Mandelieu – Théoule-sur-Mer vue du ciel. Qui dit mieux ?" },
        { titre: "On s’adapte à vous !", texte: "En duo ou en groupe, nos différentes formules vous offrent une flexibilité totale." },
      ],
    },
    sections: [
      {
        eyebrow: "Informations utiles",
        titre: "Parachute ascensionnel à Mandelieu Théoule, le ciel est votre terrain de jeu",
        textes: [
          "Le parachute ascensionnel chez Mandelieu Watersports vous offre le ciel ! Ressentez la liberté de flotter au-dessus des eaux turquoise de la Méditerranée sans contraintes, sans vertige et sans besoin de savoir nager.",
          "Accessible à tous à partir de 3 ans (accompagné d’un adulte). Décollage et atterrissage en douceur directement depuis la plateforme du bateau.",
        ],
        image: "parachute-atterrissage",
      },
      {
        eyebrow: "Sécurité",
        titre: "Des pilotes brevetés d’État",
        textes: [
          "Nos pilotes de parachute ascensionnel, expérimentés et brevetés d’État, vous accompagnent à chaque étape de cette aventure palpitante.",
          "Nos équipes assurent un contrôle rigoureux de l’équipement pour garantir votre confort et votre sécurité. L’ambiance sera au rendez-vous sur le bateau ! Réservation conseillée.",
        ],
        image: "parachute-pilote",
        inverse: true,
      },
    ],
    video: { cle: "video-parachute", titre: "Un vol en images", texte: "Décollage, vue à 360° sur l’Esterel et les îles de Lérins, atterrissage en douceur : revivez un vol comme si vous y étiez." },
    galerie: ["parachute-trois-amies", "parachute-selfie-coucher-soleil", "parachute-bateau-amies", "parachute-fou-rire"],
  },

  "location-jet-ski": {
    url: "/location-jet-ski/",
    title: "Location Jet Ski à Cannes Mandelieu | Mandelieu Watersports",
    description: "Venez découvrir la pratique du jet ski en location à Cannes, Mandelieu avec vos amis ! Location Jet ski Cannes Mandelieu Watersports",
    nom: "Location jet ski",
    h1: "Location jet ski sans permis à Cannes – Mandelieu",
    kicker: "Plaisir illimité à Mandelieu – Théoule !",
    tagline: "Sans permis · Encadré par des moniteurs agréés",
    hero: "jet-ski-duo-baie",
    faits: [["Sans", "permis"], ["Seul ou à deux", "même tarif"], ["À partir de", "90 €"]],
    categories: ["jetski"],
    intro: {
      eyebrow: "Location jet ski sans permis",
      titre: "Location jet ski sans permis : plaisir illimité à Mandelieu – Théoule !",
      textes: [
        "Bienvenue chez Mandelieu Watersports, votre port d’attache pour la location de jet ski sans permis ! Vous rêvez de ressentir l’adrénaline des vagues sans les tracas d’un permis ? Notre location de jet ski sans permis est la réponse.",
        "Plongez dans un monde de vitesse et de fun, où chaque virage et chaque éclaboussure vous rapprochent de la liberté absolue.",
      ],
      image: "jet-ski-location-ponton",
    },
    essentiel: {
      titre: "L’essentiel",
      items: [
        ["Sans permis bateau", "Nos machines sont puissantes et faciles à manœuvrer, même pour les novices."],
        ["Seul ou à deux", "Le prix reste le même, que vous soyez un ou deux sur le jet ski."],
        ["Tout compris", "Carburant, équipement et assurance inclus."],
        ["Pièce d’identité", "Obligatoire pour tous les conducteurs, avec ou sans réservation. Autorisation parentale pour les moins de 16 ans."],
      ],
    },
    comment: {
      titre: "Comment ça marche ?",
      etapes: [
        { titre: "Le briefing", texte: "À votre arrivée sur la base nautique, un briefing vous explique le fonctionnement de la machine et la réglementation sur l’eau." },
        { titre: "C’est parti !", texte: "Vous partez sur votre jet ski, carburant, équipement et assurance compris, pour 30 minutes, 45 minutes ou 1 heure de navigation libre." },
        { titre: "Pièces d’identité", texte: "Accessible à partir de 16 ans (autorisation parentale obligatoire pour les mineurs). Pièces d’identité obligatoires pour tous les conducteurs !" },
      ],
    },
    avantages: {
      titre: "Avantages de la location de jet ski",
      intro: "Chez Mandelieu Watersports, nous sommes déterminés à rendre votre expérience en jet ski inoubliable :",
      items: AVANTAGES_JET_SKI,
    },
    sections: [
      {
        eyebrow: "Vivez la vitesse sans contraintes",
        titre: "Nos locations de jet ski sans permis à Mandelieu – Théoule – Cannes",
        textes: [
          "Louez votre jet ski sans permis pour 30 minutes, 45 minutes ou 1 heure de navigation libre depuis la plage de la Rague.",
          "La location de jet ski sans permis vous offre la liberté de naviguer sur les eaux turquoise de la Méditerranée sans les contraintes administratives d’un permis. Nos machines sont puissantes et faciles à manœuvrer : une conduite agréable, même pour les novices.",
        ],
        image: "jet-ski-femme-pilote",
      },
      {
        eyebrow: "Pour tous les amoureux d’adrénaline",
        titre: "Si Rambo y arrive, vous aussi !",
        textes: [
          "Le jet ski est accessible à tous à partir de 4 ans (accompagnés d’un adulte). Nos sessions sont conçues pour vous plonger dans un univers de sensations fortes, où la baie de Mandelieu – Théoule devient votre terrain de jeu. Débutant ou pilote expert, après tout, si notre mascotte Rambo y arrive…",
          "Nos moniteurs expérimentés vous accompagnent à chaque étape : briefing détaillé pour une prise en main en toute confiance et conseils avisés pour profiter au mieux de votre location.",
        ],
        image: "jet-ski-chien-rambo",
        inverse: true,
      },
    ],
    video: { cle: "video-location-jet-ski", titre: "La location en images", texte: "Imaginez-vous glisser sur les vagues, le vent dans les cheveux : c’est la promesse d’une expérience unique au départ de la plage de la Rague." },
    galerie: ["jet-ski-duo-esterel", "jet-ski-pilote", "jet-ski-drone", "jet-ski-chateau-napoule"],
  },

  "randonnee-jet-ski": {
    url: "/randonnee-jet-ski/",
    title: "Randonnée Jet Ski Cannes Mandelieu | Mandelieu Watersports",
    description: "Venez découvrir la randonnée jet ski à Cannes, Mandelieu, Théoule avec vos amis ! Randonnée Jet Ski Cannes Mandelieu Watersports",
    nom: "Randonnée jet ski",
    h1: "Randonnée jet ski à Cannes – Mandelieu",
    kicker: "Randonnées en jet ski sans permis !",
    tagline: "Îles de Lérins · Massif de l’Esterel",
    hero: "jet-ski-randonnee-esterel",
    faits: [["Sans", "permis"], ["3 randonnées", "1 h à 2 h"], ["À partir de", "130 €"]],
    categories: ["randonnee"],
    tarifsTitre: "3 randonnées uniques dans un cadre exceptionnel",
    intro: {
      eyebrow: "Encadré par des moniteurs agréés",
      titre: "Des randonnées en jet ski sans permis inoubliables",
      textes: [
        "Bienvenue chez Mandelieu Watersports, votre passerelle vers des randonnées en jet ski sans permis inoubliables dans la baie de Cannes – Mandelieu – Théoule ! Nos randonnées allient l’excitation du jet ski à la splendeur des paysages méditerranéens.",
        "Préparez-vous à vibrer au rythme des vagues, à découvrir des criques secrètes et à vous immerger dans une aventure incomparable sur nos jet skis sans permis dernière génération.",
      ],
      image: "jet-ski-randonnee-groupe",
    },
    avantages: {
      titre: "Avantages de la randonnée en jet ski",
      intro: "Chez Mandelieu Watersports, nous sommes déterminés à rendre votre randonnée inoubliable :",
      items: AVANTAGES_JET_SKI,
    },
    sections: [
      {
        eyebrow: "Randonnée petit déjeuner",
        titre: "Îles de Lérins et massif de l’Esterel",
        textes: [
          "Commencez votre journée en beauté avec un petit déjeuner face à la mer sur notre ponton. Profitez de ce moment privilégié pour échanger avec nos moniteurs expérimentés et rencontrer d’autres passionnés d’aventure.",
          "Partez ensuite pour deux heures de déconnexion totale : plongez dans les eaux cristallines qui entourent les îles de Lérins et le massif de l’Esterel. Une fusion parfaite entre l’excitation du jet ski sans permis et la beauté naturelle des îles.",
        ],
        image: "iles-lerins-saint-honorat",
        lien: { href: "/produit/randonnee-jet-ski-petit-dejeuner/", label: "Réserver la randonnée petit déjeuner" },
      },
      {
        eyebrow: "Randonnée coucher de soleil",
        titre: "Le massif de l’Esterel au crépuscule",
        textes: [
          "Plongez dans une palette de couleurs éblouissantes. Imaginez-vous sur un jet ski, traversant les eaux calmes tandis que le soleil embrase le ciel et teinte l’horizon de nuances éclatantes.",
          "Explorez les paysages mystérieux et les criques cachées de l’Esterel, joyau secret de la Côte d’Azur. Accessible dès 16 ans, en solo ou en duo : carburant, équipement et assurance inclus.",
        ],
        image: "jet-ski-coucher-soleil",
        inverse: true,
        lien: { href: "/produit/randonnee-jet-ski-coucher-de-soleil/", label: "Réserver la randonnée coucher de soleil" },
      },
      {
        eyebrow: "Randonnée du midi",
        titre: "L’Esterel sous le soleil au zénith",
        textes: [
          "La randonnée du midi vous plonge au cœur d’une aventure ensoleillée entre mer turquoise et falaises volcaniques. Explorez les criques cachées et les paysages sauvages de l’Esterel sous une lumière éclatante.",
          "Une sortie dynamique et rafraîchissante, idéale pour faire le plein de sensations entre amis, en couple ou en famille. Rendez-vous à 11 h 30 pour un départ à midi.",
        ],
        image: "esterel-roches-rouges",
        lien: { href: "/produit/randonnee-midi/", label: "Réserver la randonnée du midi" },
      },
    ],
    choisir: {
      titre: "Quelle randonnée choisir ?",
      intro: "Chacune offre des avantages distincts, que ce soit au crépuscule dans l’Esterel ou au lever du jour vers les îles de Lérins. Choisissez celle qui résonne le plus avec votre sens de l’aventure :",
      items: [
        { titre: "Petit déjeuner (2 h)", texte: "L’énergie fraîche du matin et le double de sensations : une heure de plus pour une déconnexion totale jusqu’aux îles de Lérins." },
        { titre: "Midi (1 h)", texte: "Une sortie dynamique sous le soleil, entre mer turquoise et falaises volcaniques de l’Esterel." },
        { titre: "Coucher de soleil (1 h)", texte: "Les couleurs chaudes du soir sur des eaux calmes : idéale pour un souvenir romantique ou un moment entre amis." },
      ],
    },
    destinations: {
      titre: "Les randonnées en jet ski à Cannes, Mandelieu, Théoule",
      items: [
        { titre: "En direction de l’Esterel", texte: "Site volcanique remarquable de la Côte d’Azur : le rouge flamboyant des roches plonge dans le bleu intense de la mer, entre collines de maquis, criques secrètes et calanques impressionnantes." },
        { titre: "En direction des îles de Lérins", texte: "Un cadre idyllique à la nature préservée, où les piscines d’eau turquoise côtoient les pins parasols, entre les mystères du Masque de fer et la quiétude des moines cisterciens." },
      ],
      conclusion: "Si la chance est avec nous, vous croiserez peut-être des dauphins et des poissons-lunes lors des pauses baignade dans la chaleur accueillante de la Méditerranée.",
    },
    video: { cle: "video-jet-ski", titre: "La randonnée en images", texte: "Criques secrètes, calanques, eaux turquoises… le combo parfait pour une journée inoubliable." },
    galerie: ["jet-ski-randonnee-duo", "jet-ski-calanque", "petit-dejeuner-ponton", "jet-ski-sunset"],
  },

  "bouee-tractee": {
    url: "/bouee-tractee/",
    title: "Bouées tractées Mandelieu - Théoule | Mandelieu Watersports",
    description: "Tracté par le bateau, la bouée tractée procure des sensations de vitesse ! Amusez-vous entre amis ou en famille à Mandelieu, Théoule",
    nom: "Bouée tractée",
    h1: "Les bouées tractées à Mandelieu – Théoule",
    kicker: "Accrochez-vous bien, ça va secouer !",
    tagline: "Bouée · Canapé tracté · Jusqu’à 8 personnes",
    hero: "bouee-tractee-groupe",
    faits: [["Jusqu’à", "8 personnes"], ["Sans", "réservation"], ["À partir de", "20 €"]],
    categories: ["bouee"],
    intro: {
      eyebrow: "Vous aimez les sensations fortes ?",
      titre: "Fous rires en perspective sur Mandelieu, Théoule !",
      textes: [
        "Disponible sans réservation : venez directement nous voir à la base nautique pour faire de la bouée tractée. Le fun sera au rendez-vous !",
        "Tractée par le bateau, la bouée vous apporte des sensations de vitesse et d’adrénaline intenses. Vous aimerez cette activité entouré de vos amis, en famille, pour un anniversaire ou un enterrement de vie de garçon ou de jeune fille.",
      ],
      image: "bouee-tractee-joie",
    },
    essentiel: {
      titre: "L’essentiel",
      items: [
        ["Dès 3 ans", "Encadrée et accessible à tous, les enfants accompagnés d’un adulte."],
        ["Jusqu’à 8 personnes", "Choisissez la bouée que vous préférez en arrivant : canapé (8 places) ou plate (6 places)."],
        ["Vitesse adaptée", "Notre équipe de professionnels vous conduit à votre allure, en toute sécurité."],
        ["Matériel contrôlé", "Notre équipe technique vérifie l’équipement et les conditions de mer avant chaque sortie."],
      ],
    },
    sections: [
      {
        eyebrow: "Un cadre contrôlé et sécurisé",
        titre: "Des moments de folie, en toute sécurité",
        textes: [
          "Vous voulez vivre des moments de folie en vous amusant ? Nous sommes là pour vous, dans un cadre contrôlé et sécurisé.",
          "Avant tout, notre équipe technique assure le contrôle de l’équipement et des conditions nécessaires à sa mise en œuvre pour votre sécurité. Venez vous amuser avec une équipe et un matériel de professionnels.",
        ],
        image: "bouee-tractee-vitesse",
      },
    ],
    galerie: ["bouee-canape", "bouee-tractee-famille", "bouee-tractee-mer", "bouee-tractee-groupe"],
  },

  wakeboard: {
    url: "/wakeboard/",
    title: "Wakeboard Mandelieu, Théoule - Mandelieu WaterSports",
    description: "Dès vos premiers tours de wakeboard découvrez des sensations de glisse uniques ! Amateur ou professionnel, le wakeboard à Mandelieu, Théoule.",
    nom: "Wakeboard",
    h1: "Wakeboard à Mandelieu – Théoule",
    kicker: "Des sensations de glisse uniques",
    tagline: "Initiation · Perfectionnement · Moniteur breveté d’État",
    hero: "wakeboard",
    faits: [["Tour simple", "35 €"], ["Leçon", "dès 45 €"], ["Le matin", "mer calme"]],
    categories: ["wakeboard", "wakesurf"],
    tarifsTitre: "Wakeboard & wakesurf : nos tarifs",
    intro: {
      eyebrow: "Session glisse",
      titre: "Dès vos premiers tours, découvrez le wakeboard",
      textes: [
        "Tracté par un bateau comme en ski nautique, mais en position « de côté » (comme en snowboard ou en skateboard), vous surfez la vague après quelques essais, voire tentez des sauts en prenant appui sur celle-ci.",
        "Le wakeboard est sans aucun doute un des sports de glisse aquatique les plus accessibles. Dans une ambiance conviviale, de l’initiation au perfectionnement, encadré par un moniteur breveté d’État : un sport de glisse pour tous.",
      ],
      image: "wakesurf",
    },
    essentiel: {
      titre: "Pourquoi le wakeboard chez nous ?",
      items: [
        ["Des sensations uniques", "Le wakeboard procure des sensations de glisse très rapidement. Les sessions sont privilégiées le matin, sur une mer calme."],
        ["Des conseils de qualité", "Votre pilote est un vrai pro de la glisse : il vous donne les clés pour sortir de l’eau, puis pour maîtriser de nouveaux tricks."],
        ["Forfait 10 tours", "299 € uniquement sur demande : idéal pour progresser toute la saison."],
      ],
    },
    sections: [
      {
        eyebrow: "Wakesurf",
        titre: "Envie de surfer la vague sans corde ?",
        textes: [
          "Le wakesurf se pratique à l’arrière du bateau : après quelques essais, vous lâchez la corde et surfez la vague créée par le sillage.",
          "Tour simple, leçon enfant ou adulte : le wakesurf se réserve par téléphone au 06 65 48 06 06.",
        ],
        image: "wakesurf",
        inverse: true,
      },
    ],
    galerie: [],
  },

  "ski-nautique": {
    url: "/ski-nautique/",
    title: "Ski Nautique Mandelieu, Théoule | Mandelieu WaterSports",
    description: "Dès vos premiers tours découvrez des sensations de glisse unique avec le ski nautique. Amateur ou professionnel, le ski nautique à Mandelieu.",
    nom: "Ski nautique",
    h1: "Ski nautique à Mandelieu – Théoule",
    kicker: "Le sport de glisse le plus rapide à assimiler",
    tagline: "Dès le plus jeune âge · Moniteur diplômé d’État",
    hero: "ski-nautique",
    faits: [["Tour simple", "35 €"], ["Leçon", "dès 45 €"], ["Sans", "limite d’âge"]],
    categories: ["ski"],
    intro: {
      eyebrow: "Session glisse",
      titre: "Découvrez le ski nautique dès le plus jeune âge",
      textes: [
        "Dès vos premiers tours, découvrez des sensations de glisse uniques avec le ski nautique. L’activité est très instinctive : c’est le sport de glisse le plus rapide à assimiler !",
        "Tracté par un bateau comme en wakeboard, mais en position « de face », vous skiez la vague après quelques essais, voire tentez des sauts en prenant appui sur celle-ci.",
      ],
      image: "ski-nautique-enfant",
    },
    essentiel: {
      titre: "Pourquoi le ski nautique chez nous ?",
      items: [
        ["Pas de limite d’âge", "Un sport de glisse pour tous, de l’initiation au perfectionnement."],
        ["Moniteur diplômé d’État", "Dans une ambiance conviviale, votre pilote vous guide dès le premier tour."],
        ["Forfait 10 tours", "299 € uniquement sur demande : idéal pour progresser toute la saison."],
      ],
    },
    sections: [
      {
        eyebrow: "Le ski nautique, une activité encadrée par des professionnels",
        titre: "Le plus facile des sports de glisse",
        textes: [
          "Le ski nautique est sans aucun doute le sport de glisse aquatique le plus facile. Les sessions sont privilégiées le matin, quand les conditions sont propices, pour optimiser votre expérience sur une mer calme.",
          "Votre pilote vous donne les clés pour sortir de l’eau si vous débutez, et des conseils pour maîtriser de nouvelles figures si vous êtes plus avancé.",
        ],
        image: "ski-nautique-baie",
        inverse: true,
      },
    ],
    galerie: [],
  },
};
