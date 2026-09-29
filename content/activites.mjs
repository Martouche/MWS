// ---------------------------------------------------------------------------
// Pages activités. Textes repris de l'ancien site, dédoublonnés et corrigés ;
// les mots-clés et les titres (title/description) sont conservés pour ne pas
// perdre le positionnement acquis.
// ---------------------------------------------------------------------------

const AVANTAGES_JET_SKI = [
  { titre: "Liberté totale", texte: "Nos jet skis sont accessibles sans permis ! Pilotez sans tracas administratifs.", icone: "sansPermis" },
  { titre: "Le meilleur tarif", texte: "Seul ou à deux sur un jet ski, le prix reste le même : vous êtes doublement gagnants !", icone: "etiquette" },
  { titre: "Équipements de qualité", texte: "L’équipement pour votre confort et votre sécurité est inclus.", icone: "gilet" },
  { titre: "Cadre exceptionnel", texte: "Vous découvrez la baie de Théoule depuis la mer et, qui sait, peut-être croiserez-vous des dauphins ?", icone: "paysage" },
  { titre: "On s’adapte à vous !", texte: "Sortie en duo ou en groupe : nos différentes formules vous offrent une flexibilité totale.", icone: "reglage" },
];

export const activites = {
  "parachute-ascensionnel": {
    url: "/parachute-ascensionnel/",
    title: "Parachute Ascensionnel Mandelieu – Cannes, Théoule",
    description: "Vol en parachute ascensionnel à Mandelieu, face à la baie de Cannes et aux îles de Lérins. Jusqu’à 5 personnes, dès 3 ans, dès 40 €. Réservez en ligne !",
    nom: "Parachute ascensionnel",
    h1: "Parachute ascensionnel à Mandelieu, Cannes & Théoule",
    kicker: "Envolez-vous avec nous !",
    tagline: "Baie de Cannes · Mandelieu · Théoule-sur-Mer",
    hero: "parachute-ascensionnel-mandelieu",
    faits: [["Dès", "3 ans"], ["Jusqu’à", "5 personnes"], ["À partir de", "40 €"]],
    categories: ["parachute"],
    intro: {
      eyebrow: "Une expérience sensationnelle",
      titre: "Vol en parachute ascensionnel dans la baie de Cannes",
      textes: [
        "Bienvenue à Mandelieu Watersports, où le ciel devient votre terrain de jeu. Envolez-vous au-dessus des eaux scintillantes de la baie de Mandelieu, Cannes et Théoule-sur-Mer : ce n’est pas pour rien que parachute ascensionnel rime avec sensationnel !",
        "Admirez une vue panoramique à 360° entre ciel et mer. Vous découvrirez la baie comme vous ne l’avez jamais vue, entre le majestueux massif de l’Esterel et les îles de Lérins.",
        "Envol depuis le bateau, vol en duo, en trio ou jusqu’à 5 personnes : notre base nautique de Mandelieu-la-Napoule est à 5 minutes de Théoule-sur-Mer et à un quart d’heure de Cannes.",
      ],
      image: "parachute-vol-ciel",
    },
    essentiel: {
      titre: "L’essentiel",
      items: [
        ["Dès 3 ans", "Accessible aux enfants accompagnés d’un adulte.", "enfant"],
        ["Jusqu’à 5 sous la voile", "Volez à deux, trois, quatre ou cinq, dans la limite de 240 kg cumulés.", "parachute"],
        ["Pilote breveté d’État", "Une équipe professionnelle vous équipe et vous accompagne à chaque étape.", "medaille"],
        ["Pas de vertige", "Aucun contact direct avec le sol : la sensation de vertige n’existe pas. Pas besoin de savoir nager.", "nuage"],
      ],
    },
    comment: {
      titre: "Comment ça marche ?",
      etapes: [
        { titre: "Le briefing", texte: "À votre arrivée sur la base nautique, un briefing vous explique le fonctionnement du parachute et la réglementation sur l’eau.", icone: "briefing" },
        { titre: "À bord", texte: "Vous embarquez sur notre bateau de parachute ascensionnel dernier cri. Ambiance musicale et sourires garantis, entre les mains d’un pilote expérimenté et breveté d’État.", icone: "bateau" },
        { titre: "Décollage !", texte: "Vous vous envolez à deux, trois, quatre ou cinq depuis la plateforme du bateau. Vos mains restent libres pour profiter de chaque instant, puis vous atterrissez en douceur à bord.", icone: "envol" },
      ],
    },
    avantages: {
      titre: "Avantages du parachute ascensionnel",
      intro: "Chez Mandelieu Watersports, nous sommes déterminés à rendre votre vol inoubliable. Voici ce que vous apprécierez :",
      items: [
        { titre: "Liberté totale", texte: "Vous volez comme un oiseau au-dessus de la baie de Cannes – Mandelieu – Théoule-sur-Mer !", icone: "oiseau" },
        { titre: "Pas de vertige !", texte: "Déconnexion totale garantie, sans vertige : vous n’avez aucun contact direct avec le sol.", icone: "nuage" },
        { titre: "Équipements de qualité", texte: "Votre confort et votre sécurité sont garantis par notre équipe de professionnels.", icone: "gilet" },
        { titre: "Cadre exceptionnel", texte: "La baie de Cannes – Mandelieu – Théoule-sur-Mer vue du ciel. Qui dit mieux ?", icone: "paysage" },
        { titre: "On s’adapte à vous !", texte: "En duo ou en groupe, nos différentes formules vous offrent une flexibilité totale.", icone: "reglage" },
      ],
    },
    sections: [
      {
        eyebrow: "Informations utiles",
        titre: "Parachute ascensionnel à Théoule et Mandelieu : le ciel est votre terrain de jeu",
        textes: [
          "Le parachute ascensionnel chez Mandelieu Watersports vous offre le ciel ! Ressentez la liberté de flotter au-dessus des eaux turquoise de la Méditerranée sans contraintes, sans vertige et sans besoin de savoir nager.",
          "Accessible à tous à partir de 3 ans (accompagné d’un adulte). Décollage et atterrissage en douceur directement depuis la plateforme du bateau.",
        ],
        image: "parachute-atterrissage",
      },
      {
        eyebrow: "Sécurité",
        titre: "Des pilotes brevetés d’État, du golfe de la Napoule aux îles de Lérins",
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
    title: "Location Jet Ski sans permis Mandelieu – Cannes",
    description: "Location de jet ski sans permis à Mandelieu, à 15 min de Cannes : 30 min, 45 min ou 1 h dès 90 €, seul ou à deux. Moniteur diplômé. Réservez en ligne !",
    nom: "Location jet ski",
    h1: "Location jet ski sans permis à Mandelieu, Cannes & Théoule",
    kicker: "Plaisir illimité à Mandelieu – Théoule !",
    tagline: "Sans permis · Encadré par des moniteurs agréés",
    hero: "jet-ski-duo-baie",
    faits: [["Sans", "permis"], ["Seul ou à deux", "même tarif"], ["À partir de", "90 €"]],
    categories: ["jetski"],
    intro: {
      eyebrow: "Location jet ski sans permis",
      titre: "Jet ski sans permis à Mandelieu : plaisir illimité jusqu’à Théoule et Cannes",
      textes: [
        "Bienvenue chez Mandelieu Watersports, votre port d’attache pour la location de jet ski sans permis ! Vous rêvez de ressentir l’adrénaline des vagues sans les tracas d’un permis ? Notre location de jet ski sans permis est la réponse.",
        "Plongez dans un monde de vitesse et de fun, où chaque virage et chaque éclaboussure vous rapprochent de la liberté absolue.",
        "Pas besoin de permis côtier : après un briefing avec un moniteur diplômé d’État, vous pilotez votre jet ski en navigation libre dans le golfe de la Napoule. Idéal pour un baptême de jet ski !",
      ],
      image: "jet-ski-location-ponton",
    },
    essentiel: {
      titre: "L’essentiel",
      items: [
        ["Sans permis bateau", "Nos machines sont puissantes et faciles à manœuvrer, même pour les novices.", "sansPermis"],
        ["Seul ou à deux", "Le prix reste le même, que vous soyez un ou deux sur le jet ski.", "duo"],
        ["Tout compris", "Carburant, équipement et assurance inclus.", "carburant"],
        ["Pièce d’identité", "Obligatoire pour tous les conducteurs, avec ou sans réservation. Autorisation parentale pour les moins de 16 ans.", "identite"],
      ],
    },
    comment: {
      titre: "Comment ça marche ?",
      etapes: [
        { titre: "Le briefing", texte: "À votre arrivée sur la base nautique, un briefing vous explique le fonctionnement de la machine et la réglementation sur l’eau.", icone: "briefing" },
        { titre: "C’est parti !", texte: "Vous partez sur votre jet ski, carburant, équipement et assurance compris, pour 30 minutes, 45 minutes ou 1 heure de navigation libre.", icone: "jetski" },
        { titre: "Pièces d’identité", texte: "Accessible à partir de 16 ans (autorisation parentale obligatoire pour les mineurs). Pièces d’identité obligatoires pour tous les conducteurs !", icone: "identite" },
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
        titre: "Nos locations de jet ski à Mandelieu, Théoule-sur-Mer et Cannes",
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
    title: "Randonnée Jet Ski Baie de Cannes, Lérins & Esterel",
    description: "Rando jet ski sans permis au départ de Mandelieu : baie de Cannes, îles de Lérins, calanques de l’Esterel. Encadrée par un moniteur, dès 130 €. Réservez !",
    nom: "Randonnée jet ski",
    h1: "Randonnée jet ski dans la baie de Cannes, depuis Mandelieu",
    kicker: "Randonnées en jet ski sans permis !",
    tagline: "Îles de Lérins · Massif de l’Esterel",
    hero: "jet-ski-randonnee-esterel",
    faits: [["Sans", "permis"], ["3 randonnées", "1 h à 2 h"], ["À partir de", "130 €"]],
    categories: ["randonnee"],
    tarifsTitre: "3 randonnées uniques dans un cadre exceptionnel",
    intro: {
      eyebrow: "Encadré par des moniteurs agréés",
      titre: "Rando jet ski encadrée : baie de Cannes, Lérins et Esterel",
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
        titre: "Petit déjeuner puis cap sur les îles de Lérins et l’Esterel",
        textes: [
          "Commencez votre journée en beauté avec un petit déjeuner face à la mer sur notre ponton. Profitez de ce moment privilégié pour échanger avec nos moniteurs expérimentés et rencontrer d’autres passionnés d’aventure.",
          "Partez ensuite pour deux heures de déconnexion totale : plongez dans les eaux cristallines qui entourent les îles de Lérins et le massif de l’Esterel. Une fusion parfaite entre l’excitation du jet ski sans permis et la beauté naturelle des îles.",
        ],
        image: "iles-lerins-saint-honorat",
        lien: { href: "/produit/randonnee-jet-ski-petit-dejeuner/", label: "Réserver la randonnée petit déjeuner" },
      },
      {
        eyebrow: "Randonnée coucher de soleil",
        titre: "Coucher de soleil sur le massif de l’Esterel, face à Théoule",
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
        titre: "Rando du midi : les calanques de Théoule-sur-Mer au zénith",
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
      titre: "Nos itinéraires de rando jet ski entre Cannes, Mandelieu et Théoule",
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
    title: "Bouée Tractée Mandelieu – Cannes, Théoule-sur-Mer",
    description: "Bouée tractée et canapé à Mandelieu, près de Cannes et Théoule : jusqu’à 8 personnes, dès 20 €, sans réservation. Fous rires entre amis ou en famille !",
    nom: "Bouée tractée",
    h1: "Bouée tractée à Mandelieu, près de Cannes & Théoule",
    kicker: "Accrochez-vous bien, ça va secouer !",
    tagline: "Bouée · Canapé tracté · Jusqu’à 8 personnes",
    hero: "bouee-tractee-groupe",
    faits: [["Jusqu’à", "8 personnes"], ["Sans", "réservation"], ["À partir de", "20 €"]],
    categories: ["bouee"],
    intro: {
      eyebrow: "Vous aimez les sensations fortes ?",
      titre: "Fous rires en perspective dans le golfe de la Napoule !",
      textes: [
        "Disponible sans réservation : venez directement nous voir à la base nautique pour faire de la bouée tractée. Le fun sera au rendez-vous !",
        "Tractée par le bateau, la bouée vous apporte des sensations de vitesse et d’adrénaline intenses. Vous aimerez cette activité entouré de vos amis, en famille, pour un anniversaire ou un enterrement de vie de garçon ou de jeune fille.",
      ],
      image: "bouee-tractee-joie",
    },
    essentiel: {
      titre: "L’essentiel",
      items: [
        ["Dès 3 ans", "Encadrée et accessible à tous, les enfants accompagnés d’un adulte.", "enfant"],
        ["Jusqu’à 8 personnes", "Choisissez la bouée que vous préférez en arrivant : canapé (8 places) ou plate (6 places).", "bouee"],
        ["Vitesse adaptée", "Notre équipe de professionnels vous conduit à votre allure, en toute sécurité.", "vitesse"],
        ["Matériel contrôlé", "Notre équipe technique vérifie l’équipement et les conditions de mer avant chaque sortie.", "controle"],
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
    title: "Wakeboard & Wakesurf Mandelieu – Théoule, Cannes",
    description: "Wakeboard et wakesurf à Mandelieu, près de Théoule et Cannes : tour dès 35 €, leçons avec moniteur breveté d’État, sur mer calme le matin. Réservez !",
    nom: "Wakeboard",
    h1: "Wakeboard & wakesurf à Mandelieu – Théoule",
    kicker: "Des sensations de glisse uniques",
    tagline: "Initiation · Perfectionnement · Moniteur breveté d’État",
    hero: "wakeboard",
    faits: [["Tour simple", "35 €"], ["Leçon", "dès 45 €"], ["Le matin", "mer calme"]],
    categories: ["wakeboard", "wakesurf"],
    tarifsTitre: "Wakeboard & wakesurf : nos tarifs",
    intro: {
      eyebrow: "Session glisse",
      titre: "Wakeboard dans le golfe de la Napoule : dès vos premiers tours",
      textes: [
        "Tracté par un bateau comme en ski nautique, mais en position « de côté » (comme en snowboard ou en skateboard), vous surfez la vague après quelques essais, voire tentez des sauts en prenant appui sur celle-ci.",
        "Le wakeboard est sans aucun doute un des sports de glisse aquatique les plus accessibles. Dans une ambiance conviviale, de l’initiation au perfectionnement, encadré par un moniteur breveté d’État : un sport de glisse pour tous.",
      ],
      image: "wakesurf",
    },
    essentiel: {
      titre: "Pourquoi le wakeboard chez nous ?",
      items: [
        ["Des sensations uniques", "Le wakeboard procure des sensations de glisse très rapidement. Les sessions sont privilégiées le matin, sur une mer calme.", "glisse"],
        ["Des conseils de qualité", "Votre pilote est un vrai pro de la glisse : il vous donne les clés pour sortir de l’eau, puis pour maîtriser de nouveaux tricks.", "conseil"],
        ["Forfait 10 tours", "299 € uniquement sur demande : idéal pour progresser toute la saison.", "repetition"],
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
    title: "Ski Nautique Mandelieu – Théoule, Cannes | Cours & Tours",
    description: "Ski nautique à Mandelieu, près de Théoule et Cannes : tour dès 35 €, leçons enfant et adulte avec moniteur diplômé d’État, sans limite d’âge. Réservez !",
    nom: "Ski nautique",
    h1: "Ski nautique à Mandelieu – Théoule",
    kicker: "Le sport de glisse le plus rapide à assimiler",
    tagline: "Dès le plus jeune âge · Moniteur diplômé d’État",
    hero: "ski-nautique",
    faits: [["Tour simple", "35 €"], ["Leçon", "dès 45 €"], ["Sans", "limite d’âge"]],
    categories: ["ski"],
    intro: {
      eyebrow: "Session glisse",
      titre: "Ski nautique à Mandelieu, dès le plus jeune âge",
      textes: [
        "Dès vos premiers tours, découvrez des sensations de glisse uniques avec le ski nautique. L’activité est très instinctive : c’est le sport de glisse le plus rapide à assimiler !",
        "Tracté par un bateau comme en wakeboard, mais en position « de face », vous skiez la vague après quelques essais, voire tentez des sauts en prenant appui sur celle-ci.",
      ],
      image: "ski-nautique-enfant",
    },
    essentiel: {
      titre: "Pourquoi le ski nautique chez nous ?",
      items: [
        ["Pas de limite d’âge", "Un sport de glisse pour tous, de l’initiation au perfectionnement.", "enfant"],
        ["Moniteur diplômé d’État", "Dans une ambiance conviviale, votre pilote vous guide dès le premier tour.", "medaille"],
        ["Forfait 10 tours", "299 € uniquement sur demande : idéal pour progresser toute la saison.", "repetition"],
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
