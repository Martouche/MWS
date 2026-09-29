// ---------------------------------------------------------------------------
// Zone de chalandise (SEO local) : Mandelieu-la-Napoule, Port la Napoule,
// Cannes, Théoule-sur-Mer, golfe de la Napoule. Distances réelles depuis la
// base nautique (plage de la Rague) : Théoule ≈ 2 km, centre de Cannes ≈ 12 km.
// Le texte d'introduction varie selon l'activité pour éviter le contenu dupliqué.
// ---------------------------------------------------------------------------

export const zone = {
  lieux: [
    {
      titre: "Mandelieu-la-Napoule & Port la Napoule",
      texte: "Notre base nautique est installée sur la plage de la Rague, au port de la Rague, entre Port la Napoule et Théoule-sur-Mer, au fond du golfe de la Napoule. Parking gratuit à proximité.",
      icone: "repere",
    },
    {
      titre: "Depuis Cannes",
      texte: "À une quinzaine de minutes du centre de Cannes (A8, sortie 40) : nos sorties vous emmènent directement dans la baie de Cannes et jusqu’aux îles de Lérins.",
      icone: "voiture",
    },
    {
      titre: "Depuis Théoule-sur-Mer",
      texte: "À 5 minutes de Théoule-sur-Mer par la route du bord de mer : les criques rouges du massif de l’Esterel commencent juste à côté de la base.",
      icone: "corniche",
    },
  ],
};

/** Titre et introduction de la section, selon l'activité. */
export const zonePour = {
  accueil: {
    titre: "Activités nautiques à Mandelieu, à deux pas de Cannes et Théoule-sur-Mer",
    intro: "Vacanciers à Cannes, résidents de Mandelieu-la-Napoule ou de Théoule-sur-Mer : notre base nautique du golfe de la Napoule est à quelques minutes de chez vous. Jet ski, parachute ascensionnel, bouée tractée, wakeboard et ski nautique au même endroit.",
  },
  "parachute-ascensionnel": {
    titre: "Parachute ascensionnel à Mandelieu, près de Cannes et Théoule-sur-Mer",
    intro: "Le vol décolle de la plage de la Rague et survole tout le golfe de la Napoule : vue sur la baie de Cannes, les îles de Lérins et le massif de l’Esterel, à quelques minutes de Cannes et de Théoule-sur-Mer.",
  },
  "location-jet-ski": {
    titre: "Location de jet ski à Mandelieu, à deux pas de Cannes et Théoule",
    intro: "Envie de jet ski à Cannes ou à Théoule-sur-Mer ? Notre base de Mandelieu-la-Napoule est le point de départ idéal : la baie de Cannes et les criques de l’Esterel sont à quelques minutes de navigation.",
  },
  "randonnee-jet-ski": {
    titre: "Rando jet ski dans la baie de Cannes au départ de Mandelieu",
    intro: "Nos randonnées en jet ski partent de Mandelieu-la-Napoule pour explorer la baie de Cannes, les îles de Lérins et les calanques de Théoule-sur-Mer, encadrées par un moniteur diplômé d’État.",
  },
  "bouee-tractee": {
    titre: "Bouée tractée à Mandelieu, entre Cannes et Théoule-sur-Mer",
    intro: "Fous rires garantis dans le golfe de la Napoule : la bouée tractée part de la plage de la Rague, à quelques minutes de Cannes et de Théoule-sur-Mer, sans réservation.",
  },
  wakeboard: {
    titre: "Wakeboard à Mandelieu, près de Cannes et Théoule-sur-Mer",
    intro: "Le golfe de la Napoule offre le matin une mer calme, idéale pour le wakeboard et le wakesurf : un spot à quelques minutes de Cannes et de Théoule-sur-Mer.",
  },
  "ski-nautique": {
    titre: "Ski nautique à Mandelieu, près de Cannes et Théoule-sur-Mer",
    intro: "Apprenez ou perfectionnez le ski nautique dans le golfe de la Napoule, sur l’eau calme du matin, à quelques minutes de Cannes et de Théoule-sur-Mer.",
  },
};
