// FAQ : questions de l'ancienne page /faq/ (réponses mises à jour avec les tarifs
// actuels) + questions tirées des informations pratiques du site.
// `pages` : pages activités qui reprennent la question.

export const questions = [
  {
    q: "Où faire des activités à Cannes ?",
    r: "À deux pas de Cannes, Mandelieu Watersports offre une multitude d’activités pour profiter pleinement de la Côte d’Azur : parachute ascensionnel, location de jet ski, randonnées en jet ski, wakeboard, ski nautique et bouée tractée. Quelle que soit votre envie, notre équipe expérimentée vous garantit des moments inoubliables depuis la plage de la Rague, à Mandelieu-la-Napoule.",
    pages: [],
  },
  {
    q: "Comment réserver le parachute ascensionnel ?",
    r: [
      "Pour réserver le parachute ascensionnel avec Mandelieu Watersports, trois étapes simples :",
      "1. Vérifiez l’âge des participants : le vol est accessible dès 3 ans, les enfants étant accompagnés d’un adulte.",
      "2. Réservez votre créneau en ligne depuis la page du vol (acompte sécurisé) ou par téléphone au 06 65 48 06 06.",
      "3. Rendez-vous à la base nautique Mandelieu Watersports, sur la plage de la Rague, où notre équipe vous accueille.",
    ],
    pages: ["parachute-ascensionnel"],
  },
  {
    q: "Faut-il savoir nager pour faire du parachute ascensionnel ?",
    r: "Non. Le décollage et l’atterrissage se font sur la plateforme du bateau : il n’y a aucun moment dans l’eau. Vos mains restent libres pendant tout le vol, que vous pouvez faire en maillot ou habillé.",
    pages: ["parachute-ascensionnel"],
  },
  {
    q: "A-t-on le vertige en parachute ascensionnel ?",
    r: "Non : vous n’avez aucun contact direct avec le sol, la sensation de vertige n’existe donc pas en parachute ascensionnel.",
    pages: ["parachute-ascensionnel"],
  },
  {
    q: "Combien de personnes peuvent voler ensemble ?",
    r: "Jusqu’à 5 personnes volent en même temps sous la voile, dans la limite de 240 kg cumulés.",
    pages: ["parachute-ascensionnel"],
  },
  {
    q: "Où faire du jet ski à Cannes ?",
    r: "Pour du jet ski sans permis près de Cannes, rendez-vous chez Mandelieu Watersports. Notre base nautique de Mandelieu propose la location de jet ski sans permis et des randonnées encadrées pour explorer la baie de Cannes, les îles de Lérins et l’Esterel.",
    pages: ["location-jet-ski", "randonnee-jet-ski"],
  },
  {
    q: "Où faire du jet ski à Théoule ?",
    r: "Pour du jet ski sans permis à Théoule-sur-Mer, rendez-vous chez Mandelieu Watersports, sur la plage de la Rague, en direction de Théoule. Profitez de nos jet skis pour explorer les magnifiques environs de Théoule-sur-Mer et ses eaux scintillantes.",
    pages: ["location-jet-ski"],
  },
  {
    q: "Quels sont les tarifs du jet ski ?",
    r: [
      "Location de jet ski sans permis : 90 € les 30 minutes, 120 € les 45 minutes et 160 € l’heure (prix par jet ski, seul ou à deux).",
      "Randonnées en jet ski : 130 € pour la randonnée coucher de soleil ou du midi (plus d’1 heure), 200 € pour la randonnée petit déjeuner de 2 heures vers les îles de Lérins et l’Esterel.",
    ],
    pages: ["location-jet-ski", "randonnee-jet-ski"],
  },
  {
    q: "Peut-on conduire un jet ski sans permis ?",
    r: "Oui. Chez Mandelieu Watersports, nos locations et nos randonnées en jet ski se font sans permis bateau, encadrées par des moniteurs diplômés. Vous découvrez les environs de Cannes et de Théoule-sur-Mer depuis la mer, même sans permis de conduire maritime.",
    pages: ["location-jet-ski", "randonnee-jet-ski"],
  },
  {
    q: "Quels documents apporter pour le jet ski ?",
    r: "Une pièce d’identité est obligatoire pour tous les conducteurs, avec ou sans réservation. Les conducteurs mineurs doivent présenter l’autorisation parentale, disponible sur notre page « Formulaire autorisation mineur ».",
    html: `<p>Une pièce d’identité est obligatoire pour tous les conducteurs, avec ou sans réservation. Les conducteurs mineurs doivent présenter l’autorisation parentale, à remplir sur notre page <a href="/formulaire-attestation-dautorisation-mineure/">formulaire d’autorisation mineur</a>.</p>`,
    pages: ["location-jet-ski", "randonnee-jet-ski"],
  },
  {
    q: "Faut-il réserver la bouée tractée ?",
    r: "Non, la bouée tractée est disponible sans réservation : venez directement à la base nautique. Vous choisissez votre bouée en arrivant, jusqu’à 8 personnes en même temps.",
    pages: ["bouee-tractee"],
  },
  {
    q: "Quand pratiquer le wakeboard et le ski nautique ?",
    r: "Les sessions de glisse sont privilégiées le matin, quand la mer est calme et les conditions propices. Elles se pratiquent avec un moniteur breveté d’État.",
    pages: ["wakeboard", "ski-nautique"],
  },
  {
    q: "Que se passe-t-il en cas de mauvais temps ?",
    r: "Votre activité est 100 % remboursable en cas de conditions météorologiques défavorables ou sur présentation d’un certificat médical.",
    pages: ["parachute-ascensionnel", "location-jet-ski", "randonnee-jet-ski", "bouee-tractee", "wakeboard", "ski-nautique"],
  },
];

export const questionsPour = (cle) => questions.filter((q) => q.pages.includes(cle));
