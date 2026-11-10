// ---------------------------------------------------------------------------
// Guides jet ski (contenu éditorial pour le référencement naturel) et page
// « Îles de Lérins en jet ski ». Chaque guide répond à une question réellement
// posée dans Google (« Autres questions ») et renvoie vers les offres.
//
// Les informations pratiques (âges, prix, horaires, déroulement) reprennent
// celles de content/produits.mjs et content/faq.mjs : les modifier ensemble.
//
// sections[].html : paragraphes ou listes en HTML (liens internes autorisés).
// ---------------------------------------------------------------------------

export const MAJ = "2026-11-10"; // date de dernière mise à jour affichée et balisée

export const guides = {
  "jet-ski-sans-permis": {
    url: "/guides/jet-ski-sans-permis/",
    nom: "Jet ski sans permis",
    title: "Jet ski sans permis à Cannes – Mandelieu : âge, règles",
    description: "Jet ski sans permis près de Cannes : âge minimum, pièce d’identité, briefing, déroulement et sécurité. Le guide complet de Mandelieu Watersports.",
    h1: "Jet ski sans permis : âge, règles et déroulement",
    kicker: "Guide pratique",
    image: "jet-ski-location-couple",
    resume: "Âge minimum, documents, briefing, sécurité : tout ce qu’il faut savoir avant de piloter un jet ski sans permis près de Cannes.",
    intro: "Piloter un jet ski sans avoir le permis bateau, c’est possible : il suffit de passer par une base nautique qui encadre l’activité. Voici comment cela se passe chez Mandelieu Watersports, sur la plage de la Rague, entre Cannes et Théoule-sur-Mer.",
    sections: [
      {
        titre: "Peut-on vraiment faire du jet ski sans permis ?",
        html: [
          "<p>Oui. Le permis côtier n’est pas demandé lorsque vous louez un jet ski auprès d’une base nautique qui encadre la sortie : un moniteur diplômé vous explique la machine et les règles de navigation, et la sortie se déroule dans le cadre fixé par la base (zone de navigation, consignes, horaires).</p>",
          "<p>Deux formules existent chez nous : la <a href=\"/location-jet-ski/\">location de jet ski sans permis</a> (30 min, 45 min ou 1 h de navigation libre dans le golfe de la Napoule) et la <a href=\"/randonnee-jet-ski/\">randonnée jet ski</a>, où vous suivez un moniteur vers l’Esterel ou les îles de Lérins.</p>",
        ],
      },
      {
        titre: "À partir de quel âge ?",
        html: [
          "<ul><li><strong>Conducteur :</strong> à partir de 16 ans. Les conducteurs mineurs présentent une <a href=\"/formulaire-attestation-dautorisation-mineure/\">autorisation parentale</a>.</li><li><strong>Passager :</strong> les enfants peuvent monter derrière un adulte à partir de 4 ans.</li></ul>",
          "<p>Le prix est le même que vous soyez seul ou à deux sur le jet ski : idéal pour partager la conduite en couple, entre amis ou avec un ado.</p>",
        ],
      },
      {
        titre: "Quels documents apporter ?",
        html: [
          "<p>Une <strong>pièce d’identité est obligatoire pour chaque conducteur</strong>, avec ou sans réservation. Pour un conducteur de 16 ou 17 ans, ajoutez l’autorisation parentale signée.</p>",
          "<p>Prévoyez un maillot de bain, de la crème solaire et des lunettes de soleil avec un cordon. Le gilet de sauvetage, le carburant et l’assurance sont fournis.</p>",
        ],
      },
      {
        titre: "Comment se passe une sortie ?",
        html: [
          "<ol><li><strong>Accueil et briefing</strong> à la base nautique : fonctionnement de la machine, accélération, freinage, règles de priorité et zones à respecter.</li><li><strong>Départ accompagné</strong> : le moniteur vous aide à prendre la machine en main près du ponton.</li><li><strong>Navigation</strong> : libre dans la zone indiquée pour la location, ou en file derrière le moniteur pour une randonnée.</li><li><strong>Retour</strong> au ponton à l’heure prévue.</li></ol>",
        ],
        image: "jet-ski-duo-baie",
      },
      {
        titre: "Les règles de sécurité à connaître",
        html: [
          "<ul><li>Près du rivage, la vitesse est limitée à 5 nœuds dans la bande des 300 mètres : on sort et on rentre doucement.</li><li>Gilet de sauvetage porté en permanence et coupe-circuit attaché au poignet.</li><li>On garde ses distances avec les baigneurs, les plongeurs et les autres bateaux.</li><li>Pas d’alcool avant de piloter.</li></ul>",
          "<p>En cas de mauvais temps, votre sortie est reportée ou intégralement remboursée.</p>",
        ],
      },
      {
        titre: "Location ou randonnée : que choisir ?",
        html: [
          "<p>Pour un premier essai ou un moment de liberté, la <strong>location de 30 minutes</strong> suffit pour se faire plaisir. Pour découvrir la côte, la <strong>randonnée encadrée</strong> vous emmène plus loin en toute sécurité : calanques de l’Esterel, coucher de soleil face à Théoule ou <a href=\"/randonnee-jet-ski-iles-de-lerins/\">îles de Lérins</a>.</p>",
        ],
      },
    ],
    produits: ["location-jet-ski-30-minutes", "location-jet-ski-1-heure", "randonnee-jet-ski-coucher-de-soleil"],
    faq: [
      { q: "Faut-il savoir nager pour faire du jet ski ?", r: "Le gilet de sauvetage est obligatoire et porté pendant toute la sortie. Signalez-nous si vous n’êtes pas à l’aise dans l’eau : le moniteur adaptera ses conseils." },
      { q: "Peut-on faire du jet ski à deux sans permis ?", r: "Oui : le jet ski accueille deux personnes et le prix reste le même. Les deux passagers peuvent alterner la conduite s’ils ont tous les deux au moins 16 ans et une pièce d’identité." },
      { q: "Faut-il réserver ?", r: "C’est conseillé en été pour garantir votre créneau. La location reste possible sans réservation selon les disponibilités, entre 9 h et 19 h." },
    ],
  },

  "prix-jet-ski-cannes": {
    url: "/guides/prix-jet-ski-cannes/",
    nom: "Prix du jet ski à Cannes",
    title: "Prix d’un jet ski à Cannes : location et randonnée",
    description: "Combien coûte un jet ski à Cannes ? Location sans permis dès 90 € les 30 min, randonnée dès 130 € : tarifs détaillés, ce qui est inclus, nos conseils.",
    h1: "Combien coûte un jet ski à Cannes ?",
    kicker: "Guide des tarifs",
    image: "jet-ski-location-amies",
    resume: "Location à la demi-heure ou à l’heure, randonnées, packs : les prix du jet ski autour de Cannes et ce qui est compris.",
    intro: "Dans la baie de Cannes, le prix d’un jet ski dépend surtout de la durée et de la formule : location en navigation libre ou randonnée encadrée. Voici nos tarifs, toutes taxes comprises, et ce qu’ils incluent.",
    sections: [
      {
        titre: "Prix d’une location de jet ski sans permis",
        html: [
          "<table class=\"tableau\"><thead><tr><th scope=\"col\">Durée</th><th scope=\"col\">Prix par jet ski</th></tr></thead><tbody><tr><td><a href=\"/produit/location-jet-ski-30-minutes/\">30 minutes</a></td><td>90 €</td></tr><tr><td><a href=\"/produit/location-jet-ski-45-minutes/\">45 minutes</a></td><td>120 €</td></tr><tr><td><a href=\"/produit/location-jet-ski-1-heure/\">1 heure</a></td><td>160 €</td></tr></tbody></table>",
          "<p>Le prix s’entend <strong>par jet ski, seul ou à deux</strong> : à deux, la demi-heure revient donc à 45 € par personne.</p>",
        ],
      },
      {
        titre: "Prix d’une randonnée en jet ski",
        html: [
          "<table class=\"tableau\"><thead><tr><th scope=\"col\">Randonnée</th><th scope=\"col\">Durée</th><th scope=\"col\">Prix par jet ski</th></tr></thead><tbody><tr><td><a href=\"/produit/randonnee-midi/\">Randonnée du midi</a> (Esterel)</td><td>Plus d’1 h</td><td>130 €</td></tr><tr><td><a href=\"/produit/randonnee-jet-ski-coucher-de-soleil/\">Coucher de soleil</a> (Esterel)</td><td>Plus d’1 h</td><td>130 €</td></tr><tr><td><a href=\"/produit/randonnee-jet-ski-petit-dejeuner/\">Petit déjeuner</a> (îles de Lérins)</td><td>2 h</td><td>200 €</td></tr></tbody></table>",
          "<p>La randonnée est encadrée par un moniteur qui choisit l’itinéraire selon la météo : elle permet d’aller plus loin qu’en location, en toute sécurité.</p>",
        ],
        image: "jet-ski-coucher-soleil",
      },
      {
        titre: "Ce qui est inclus dans le prix",
        html: [
          "<ul><li>Le carburant</li><li>Le gilet de sauvetage et l’équipement</li><li>L’assurance</li><li>Le briefing par un moniteur diplômé</li><li>Le petit déjeuner sur le ponton pour la randonnée du matin</li></ul>",
          "<p>Nos prix sont TTC (TVA 20 % incluse). En cas de météo défavorable, l’activité est reportée ou remboursée à 100 %.</p>",
        ],
      },
      {
        titre: "Comment payer moins cher ?",
        html: [
          "<ul><li><strong>Partagez le jet ski à deux</strong> : le prix est le même pour une ou deux personnes.</li><li><strong>Combinez les activités</strong> : le <a href=\"/produit/parachute-ascensionnel-jet-ski/\">pack parachute ascensionnel + jet ski</a> est à 85 € par personne (pour 2 personnes).</li><li><strong>Offrez-le</strong> : une carte cadeau est disponible à l’achat en ligne.</li></ul>",
        ],
      },
      {
        titre: "Et ailleurs autour de Cannes ?",
        html: [
          "<p>À titre indicatif, autour de la baie de Cannes, la demi-heure de jet ski sans permis se situe généralement entre 90 € et 120 € selon la puissance de la machine et le lieu de départ. Comparez toujours ce qui est inclus (carburant, assurance, briefing) et vérifiez si le prix est par personne ou par jet ski.</p>",
          "<p>Partir de Mandelieu, au fond du golfe de la Napoule, offre un accès rapide à la fois à l’Esterel, à Théoule-sur-Mer et aux îles de Lérins, avec un parking à proximité de la base.</p>",
        ],
      },
    ],
    produits: ["location-jet-ski-30-minutes", "randonnee-jet-ski-coucher-de-soleil", "randonnee-jet-ski-petit-dejeuner"],
    faq: [
      { q: "Quel est le prix d’une heure de jet ski ?", r: "160 € par jet ski pour une heure de location sans permis, seul ou à deux, carburant, équipement et assurance compris." },
      { q: "Le prix est-il par personne ou par jet ski ?", r: "Par jet ski. Une ou deux personnes peuvent monter sur la même machine pour le même prix." },
      { q: "Comment réserver ?", r: "En ligne depuis la page de l’activité (acompte sécurisé), ou par téléphone au 06 65 48 06 06." },
    ],
  },

  "que-voir-en-jet-ski-cannes": {
    url: "/guides/que-voir-en-jet-ski-cannes/",
    nom: "Que voir en jet ski autour de Cannes",
    title: "Que voir en jet ski autour de Cannes : Lérins, Esterel",
    description: "Îles de Lérins, roches rouges de l’Esterel, Théoule-sur-Mer, château de la Napoule : les plus beaux spots à voir en jet ski autour de Cannes.",
    h1: "Que voir en jet ski autour de Cannes ?",
    kicker: "Itinéraires",
    image: "esterel-roches-rouges",
    resume: "Îles de Lérins, Esterel, Théoule-sur-Mer : les plus beaux paysages à découvrir en jet ski depuis Mandelieu.",
    intro: "Entre Cannes et Théoule-sur-Mer, la côte change de visage en quelques minutes de navigation : îles boisées, falaises rouges, criques turquoise. Voici les incontournables à découvrir en jet ski au départ de Mandelieu-la-Napoule.",
    sections: [
      {
        titre: "Les îles de Lérins",
        html: [
          "<p>Face à Cannes, l’archipel de Lérins réunit deux îles principales. <strong>Sainte-Marguerite</strong>, la plus grande, est couverte de pins et abrite le Fort Royal, où fut enfermé le célèbre Masque de fer. <strong>Saint-Honorat</strong> est habitée depuis des siècles par une communauté de moines cisterciens qui y cultivent la vigne.</p>",
          "<p>Entre les deux, l’eau prend des teintes turquoise au-dessus des fonds sableux. C’est la destination de notre <a href=\"/randonnee-jet-ski-iles-de-lerins/\">randonnée jet ski aux îles de Lérins</a>.</p>",
        ],
        image: "iles-lerins-saint-honorat",
      },
      {
        titre: "Le massif de l’Esterel et ses roches rouges",
        html: [
          "<p>À l’ouest du golfe, le massif de l’Esterel plonge dans la mer : ses roches volcaniques d’un rouge vif contrastent avec le bleu profond de l’eau. Criques secrètes, calanques et petites plages inaccessibles par la route se découvrent depuis la mer.</p>",
          "<p>C’est le terrain de jeu de nos randonnées <a href=\"/produit/randonnee-midi/\">du midi</a> et <a href=\"/produit/randonnee-jet-ski-coucher-de-soleil/\">coucher de soleil</a>.</p>",
        ],
        image: "jet-ski-calanque",
      },
      {
        titre: "Théoule-sur-Mer et ses calanques",
        html: [
          "<p>Juste après la plage de la Rague, Théoule-sur-Mer aligne ses villas les pieds dans l’eau, ses criques et ses calanques. Depuis la mer, on profite d’un point de vue unique sur ce village de l’Esterel.</p>",
        ],
      },
      {
        titre: "Le château de la Napoule et le golfe",
        html: [
          "<p>Au fond du golfe, le château de la Napoule et ses tours crénelées dominent la mer à Mandelieu. Il est visible dès les premières minutes de navigation depuis notre base, comme toute la baie de Cannes.</p>",
        ],
        image: "jet-ski-chateau-napoule",
      },
      {
        titre: "Le coucher de soleil sur l’Esterel",
        html: [
          "<p>En fin de journée, le soleil se couche derrière les crêtes de l’Esterel et embrase la mer. C’est l’un des plus beaux moments pour naviguer : la mer est souvent plus calme et la lumière dorée.</p>",
        ],
        image: "jet-ski-sunset",
      },
      {
        titre: "Nos conseils pour en profiter",
        html: [
          "<ul><li>Pour aller jusqu’aux îles de Lérins en navigation libre, choisissez au minimum la <a href=\"/produit/location-jet-ski-1-heure/\">location d’une heure</a> : nous vous donnons l’itinéraire au départ.</li><li>Le matin, la mer est généralement plus calme : idéal pour la <a href=\"/produit/randonnee-jet-ski-petit-dejeuner/\">randonnée petit déjeuner</a>.</li><li>Ouvrez l’œil : avec un peu de chance, on croise des dauphins ou des poissons-lunes.</li><li>Respectez la vitesse limitée près des côtes et les zones de baignade.</li></ul>",
        ],
      },
    ],
    produits: ["randonnee-jet-ski-petit-dejeuner", "randonnee-midi", "location-jet-ski-1-heure"],
    faq: [
      { q: "Peut-on aller aux îles de Lérins en location de jet ski ?", r: "Oui, avec la location d’une heure, la durée nécessaire pour faire l’aller-retour depuis Mandelieu. Nous vous indiquons l’itinéraire avant le départ." },
      { q: "Quelle randonnée pour voir l’Esterel ?", r: "La randonnée du midi et la randonnée coucher de soleil longent les roches rouges et les calanques de l’Esterel, encadrées par un moniteur." },
    ],
  },
};

/** Page d'atterrissage « Îles de Lérins en jet ski » (même gabarit que les guides). */
export const lerins = {
  url: "/randonnee-jet-ski-iles-de-lerins/",
  nom: "Îles de Lérins en jet ski",
  title: "Jet Ski Îles de Lérins depuis Mandelieu – Cannes",
  description: "Randonnée jet ski vers les îles de Lérins depuis Mandelieu, près de Cannes : Sainte-Marguerite, Saint-Honorat, eaux turquoise. Sans permis, dès 160 €.",
  h1: "Les îles de Lérins en jet ski, au départ de Mandelieu",
  kicker: "Randonnée jet ski sans permis",
  tagline: "Sainte-Marguerite · Saint-Honorat",
  image: "iles-lerins-saint-honorat",
  faits: [["Sans", "permis"], ["2 formules", "1 h ou 2 h"], ["À partir de", "160 €"]],
  resume: "Sainte-Marguerite, Saint-Honorat et leurs eaux turquoise : deux façons d’y aller en jet ski depuis Mandelieu.",
  intro: "Au large de Cannes, les îles de Lérins sont l’une des plus belles destinations de la Côte d’Azur à découvrir en jet ski. Depuis notre base de la plage de la Rague, à Mandelieu-la-Napoule, deux formules vous y emmènent, sans permis bateau.",
  sections: [
    {
      titre: "Deux façons d’aller aux îles de Lérins en jet ski",
      html: [
        "<ul><li><strong><a href=\"/produit/randonnee-jet-ski-petit-dejeuner/\">La randonnée petit déjeuner (2 h, 200 € par jet ski)</a></strong> : petit déjeuner face à la mer sur notre ponton, puis deux heures de randonnée encadrée par un moniteur vers les îles de Lérins et l’Esterel. Rendez-vous à 8 h 30, départ à 9 h.</li><li><strong><a href=\"/produit/location-jet-ski-1-heure/\">La location d’une heure (160 € par jet ski)</a></strong> : la seule durée de location qui permet de rejoindre les îles en navigation libre. Nous vous donnons les meilleurs conseils d’itinéraire avant le départ.</li></ul>",
        "<p>Dans les deux cas, le prix est par jet ski, seul ou à deux, carburant, équipement et assurance compris. Conducteur dès 16 ans, avec une pièce d’identité.</p>",
      ],
      image: "petit-dejeuner-ponton",
    },
    {
      titre: "L’île Sainte-Marguerite et le Fort Royal",
      html: [
        "<p>La plus grande des îles de Lérins est couverte d’une forêt de pins et d’eucalyptus. Sur sa pointe nord se dresse le Fort Royal, prison d’État où fut enfermé le mystérieux Masque de fer à la fin du XVIIe siècle. Depuis la mer, on longe ses côtes rocheuses et ses petites criques.</p>",
      ],
    },
    {
      titre: "L’île Saint-Honorat et ses moines",
      html: [
        "<p>Plus petite et plus sauvage, Saint-Honorat appartient à une communauté de moines cisterciens qui y vivent et cultivent la vigne. Son abbaye et son monastère fortifié, posé au bord de l’eau, offrent l’une des plus belles vues de la baie de Cannes.</p>",
      ],
      image: "jet-ski-drone",
    },
    {
      titre: "Entre les deux îles : des eaux turquoise",
      html: [
        "<p>Le passage entre Sainte-Marguerite et Saint-Honorat est célèbre pour ses eaux claires aux reflets turquoise, au-dessus de fonds sableux et d’herbiers de posidonie protégés. Ralentissez pour profiter du paysage et respecter ce milieu fragile.</p>",
        "<p>Avec un peu de chance, vous croiserez des dauphins ou des poissons-lunes en chemin.</p>",
      ],
    },
    {
      titre: "Le trajet depuis Mandelieu",
      html: [
        "<p>Au départ de la plage de la Rague, vous traversez le golfe de la Napoule en longeant la côte, avec la vue sur le château de la Napoule, la baie de Cannes et l’Esterel. Près du rivage, la vitesse est limitée : le briefing vous indique où vous pouvez accélérer.</p>",
        "<p>En cas de mer agitée, l’itinéraire peut être adapté vers l’Esterel ; si la sortie ne peut avoir lieu, elle est reportée ou remboursée à 100 %.</p>",
      ],
      image: "jet-ski-groupe-baie",
    },
  ],
  produits: ["randonnee-jet-ski-petit-dejeuner", "location-jet-ski-1-heure"],
  faq: [
    { q: "Combien de temps faut-il pour aller aux îles de Lérins en jet ski ?", r: "Prévoyez au minimum une heure de location pour l’aller-retour depuis Mandelieu. La randonnée petit déjeuner de 2 heures laisse le temps de profiter des îles et de l’Esterel." },
    { q: "Faut-il un permis pour aller aux îles de Lérins en jet ski ?", r: "Non : nos randonnées et locations se font sans permis bateau, après un briefing par un moniteur diplômé. Conducteur à partir de 16 ans." },
  ],
};

/** Hub /guides/. */
export const hubGuides = {
  url: "/guides/",
  nom: "Guides jet ski",
  title: "Guides jet ski Cannes – Mandelieu : conseils, prix",
  description: "Nos guides pour préparer votre sortie en jet ski près de Cannes : jet ski sans permis, prix, îles de Lérins et plus beaux spots de l’Esterel.",
  h1: "Guides jet ski autour de Cannes",
  lead: "Âge, prix, itinéraires : nos conseils pour préparer votre sortie en jet ski sans permis entre Cannes, Mandelieu et Théoule-sur-Mer.",
};
