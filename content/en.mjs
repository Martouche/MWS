// ---------------------------------------------------------------------------
// English version (/en/). Text only: it is merged over the French content
// (prices, photos, booking IDs stay in content/produits.mjs and activites.mjs).
// Arrays are translated in full: their length is the English length, and
// [title, text, icon] tuples keep their icon name.
// ---------------------------------------------------------------------------

/** French URL → English URL of every translated page. */
export const URLS_EN = {
  "/": "/en/",
  "/parachute-ascensionnel/": "/en/parasailing-cannes/",
  "/location-jet-ski/": "/en/jet-ski-rental-cannes/",
  "/randonnee-jet-ski/": "/en/jet-ski-tours-cannes/",
  "/bouee-tractee/": "/en/towable-tube-rides/",
  "/wakeboard/": "/en/wakeboarding/",
  "/ski-nautique/": "/en/water-skiing/",
  "/nos-tarifs/": "/en/prices/",
  "/nos-packs/": "/en/packages/",
  "/reservation/": "/en/booking/",
  "/contact/": "/en/contact/",
  "/faq/": "/en/faq/",
  "/randonnee-jet-ski-iles-de-lerins/": "/en/jet-ski-lerins-islands/",
};

/** English slug of each product page (/en/product/<slug>/). */
export const SLUGS_EN = {
  "parachute-ascensionnel": "parasailing-adult",
  "parachute-ascensionnel-enfant": "parasailing-child",
  "location-jet-ski-30-minutes": "jet-ski-rental-30-minutes",
  "location-jet-ski-45-minutes": "jet-ski-rental-45-minutes",
  "location-jet-ski-1-heure": "jet-ski-rental-1-hour",
  "randonnee-jet-ski-coucher-de-soleil": "sunset-jet-ski-tour",
  "randonnee-midi": "midday-jet-ski-tour",
  "randonnee-jet-ski-petit-dejeuner": "breakfast-jet-ski-tour-lerins",
  "bouee-tractee-adulte": "tube-ride-adult",
  "bouee-tractee-enfant": "tube-ride-child",
  "wakeboard-tour-simple": "wakeboard-single-ride",
  "wakeboard-lecon-enfant": "wakeboard-lesson-child",
  "wakeboard-lecon-adulte": "wakeboard-lesson-adult",
  "wakesurf-tour-simple": "wakesurf-single-ride",
  "wakesurf-lecon-enfant": "wakesurf-lesson-child",
  "wakesurf-lecon-adulte": "wakesurf-lesson-adult",
  "ski-nautique-tour-simple": "water-ski-single-ride",
  "ski-nautique-lecon-enfant": "water-ski-lesson-child",
  "ski-nautique-lecon-adulte": "water-ski-lesson-adult",
  "pack-parachute-ascensionnel-bouee-tractee": "parasailing-tube-ride-package",
  "parachute-ascensionnel-jet-ski": "parasailing-jet-ski-package",
};
for (const [fr, en] of Object.entries(SLUGS_EN)) URLS_EN[`/produit/${fr}/`] = `/en/product/${en}/`;

export const categoriesEn = {
  parachute: { nom: "Parasailing" },
  jetski: { nom: "Jet Ski Rental" },
  randonnee: { nom: "Jet Ski Tours" },
  bouee: { nom: "Towable tube rides" },
  wakeboard: { nom: "Wakeboard" },
  wakesurf: { nom: "Wakesurf" },
  ski: { nom: "Water skiing" },
  packs: { nom: "Packages" },
};

// --- Shared product blocks ---------------------------------------------------------
const JET_SKI_HOW = [
  "When you arrive at the water sports centre, a briefing explains how the machine works and the rules on the water.",
  "Then off you go on your jet ski: fuel, equipment and insurance included!",
  "Drivers from 16 years old (parental consent required for minors). ID required for every driver.",
];
const PARASAILING_POINTS = [
  "No need to be able to swim: you never go in the water.",
  "Your hands are completely free for the whole flight.",
  "Fly in your swimsuit or in your clothes.",
  "Take-off and landing on the boat’s platform.",
  "No feeling of vertigo: you have no direct contact with the ground.",
];
const WATERSPORTS_POINTS = [
  "Supervised by a state-qualified instructor.",
  "Morning sessions preferred, when the sea is calm.",
  "Expert tips: your driver is a real board-sports pro.",
];
const TOUR_DESTINATIONS = [
  { titre: "Towards the Esterel", texte: "A remarkable volcanic coastline: the fiery red rocks plunge into the deep blue sea, between maquis-covered hills, hidden coves and impressive calanques." },
  { titre: "Towards the Lérins Islands", texte: "An idyllic, unspoilt setting where turquoise pools meet umbrella pines. The two islands combine unique wildlife with the mystery of the Man in the Iron Mask and the peace of the Cistercian monks." },
];

export const produitsEn = {
  "parachute-ascensionnel": {
    nom: "Parasailing – Adult",
    unite: "per person",
    age: "Over 13 years old",
    title: "Parasailing Flight near Cannes – Mandelieu | Adult",
    description: "Parasailing in Mandelieu, near Cannes and Théoule: views over the Bay of Cannes and the Lérins Islands. €50 per person. Book online!",
    accroche: "Fly up to 5 people at once and enjoy a 360° panorama between sky and sea.",
    texte: [
      "Fly off for new thrills and enjoy a 360° panorama between sky and sea with your friends, your children or your parents. Gentle take-off and return on the boat: you will feel safe from start to finish.",
      "Ever dreamt of seeing the bays of Mandelieu and Cannes like never before? Step aboard our new-generation platform boat, with an experienced state-licensed pilot: the view is breathtaking.",
    ],
    points: PARASAILING_POINTS,
    pointsTitre: "Parasailing from 3 years old",
  },
  "parachute-ascensionnel-enfant": {
    nom: "Parasailing – Child",
    unite: "per person",
    age: "Aged 3 to 12",
    title: "Parasailing for Kids near Cannes – Mandelieu",
    description: "Parasailing for children aged 3 to 12 in Mandelieu, near Cannes: views over the Bay of Cannes and the Lérins Islands. €40 per person. Book online!",
    accroche: "An unforgettable first flight for children aged 3 to 12, with an adult.",
    texte: [
      "Fly together as a family and enjoy a 360° panorama between sky and sea. Gentle take-off and landing on the boat’s platform: children feel safe from start to finish.",
      "Up to 5 people fly under the same canopy: parents and children share the moment above the bays of Mandelieu, Cannes and Théoule-sur-Mer.",
    ],
    points: PARASAILING_POINTS,
    pointsTitre: "A flight designed for children",
  },
  "location-jet-ski-30-minutes": {
    nom: "Jet Ski Rental 30 minutes",
    unite: "per jet ski",
    dureeTexte: "30 minutes",
    age: "From 16 years old",
    title: "Jet Ski Rental 30 min near Cannes – No Licence",
    description: "30-minute jet ski rental near Cannes, in Mandelieu: no licence needed, alone or for two, after an instructor briefing. €90 per jet ski. Book online!",
    accroche: "Thirty minutes of free riding in the Bay of Mandelieu, no boat licence needed. Alone or for two, same price.",
    texte: [
      "Thrill-seekers will love the jet ski. No licence is needed thanks to your BPJEPS-qualified instructor.",
      "On your own, with friends or family, set off to discover the beautiful bay of La Rague. After a briefing on how to handle the jet ski, you put on your life jacket and start at your own pace. For the sportier riders, it is time to open the throttle!",
    ],
    encart: {
      titre: "Explore the Bay of Cannes!",
      texte: "One of the most beautiful places to ride a jet ski. The Lérins Islands are also an exceptional spot, reachable with the one-hour rental. We give you our best tips to make the most of your rental.",
    },
    comment: JET_SKI_HOW,
    horaires: "Come whenever you like between 9 am and 7 pm.",
  },
  "location-jet-ski-45-minutes": {
    nom: "Jet Ski Rental 45 minutes",
    unite: "per jet ski",
    dureeTexte: "45 minutes",
    age: "From 16 years old",
    title: "Jet Ski Rental 45 min near Cannes – No Licence",
    description: "45-minute jet ski rental near Cannes, in Mandelieu: no licence needed, alone or for two, after an instructor briefing. €120 per jet ski. Book online!",
    accroche: "Double the fun with 45 minutes of jet ski, no licence needed, alone or for two at the same price.",
    texte: [
      "Go for a 45-minute session, ideal to multiply the thrills at the best rate, alone or for two on your jet ski, no licence needed.",
      "After a briefing with your state-qualified instructor, you put on your life jacket and head off to discover the bay of La Rague, as far as the first coves of the Esterel.",
    ],
    encart: {
      titre: "Explore the Bay of Cannes!",
      texte: "One of the most beautiful places to ride a jet ski. We give you our best tips to make the most of your jet ski rental.",
    },
    comment: JET_SKI_HOW,
    horaires: "Come whenever you like between 9 am and 7 pm.",
  },
  "location-jet-ski-1-heure": {
    nom: "Jet Ski Rental 1 hour",
    unite: "per jet ski",
    dureeTexte: "1 hour",
    age: "From 16 years old",
    title: "Jet Ski Rental 1 Hour near Cannes – No Licence",
    description: "One-hour jet ski rental near Cannes, in Mandelieu: no licence needed, alone or for two, ride to the Lérins Islands. €160 per jet ski. Book online!",
    accroche: "One hour of freedom on a jet ski, no licence needed, as far as the Lérins Islands. Alone or for two, same price.",
    texte: [
      "Thrill-seekers will love the jet ski. No licence is needed thanks to your BPJEPS-qualified instructor.",
      "One hour is the ideal time to ride out to the Lérins Islands or along the Esterel coast. After the briefing, you put on your life jacket and set off at your own pace.",
    ],
    encart: {
      titre: "Head for the Lérins Islands!",
      texte: "The Lérins Islands are an exceptional place to see by jet ski, reachable only with the one-hour rental. We give you our best route tips before you leave.",
    },
    comment: JET_SKI_HOW,
    horaires: "Come whenever you like between 9 am and 7 pm.",
  },
  "randonnee-jet-ski-coucher-de-soleil": {
    nom: "Sunset Jet Ski Tour (1h)",
    unite: "per jet ski",
    dureeTexte: "Over 1 hour",
    age: "From 16 years old",
    title: "Sunset Jet Ski Tour near Cannes – Esterel (1h)",
    description: "Sunset jet ski tour from Mandelieu, near Cannes: red rocks of the Esterel, no licence needed, guided by an instructor. €130 per jet ski. Book online!",
    accroche: "Hidden coves, calanques, turquoise water… and the sun setting the Esterel ablaze.",
    sousTitre: "Sunset jet ski tour – Esterel massif",
    texte: [
      "Dive into a palette of dazzling colours with our sunset jet ski tour along the Esterel massif. This twilight excursion of over an hour promises an unrivalled experience.",
      "Picture yourself on a jet ski, crossing calm waters while the sun sets the sky alight and paints the horizon with vivid shades. Explore the mysterious landscapes and hidden coves of the Esterel, a secret gem of the French Riviera.",
      "From 16 years old, solo or for two: take turns driving with your partner. Fuel, quality equipment and insurance included. The meeting time is set with the centre depending on the season.",
    ],
    comment: JET_SKI_HOW,
    destinations: TOUR_DESTINATIONS,
    horaires: "Meeting time set with the centre depending on the season.",
  },
  "randonnee-midi": {
    nom: "Midday Jet Ski Tour (1h)",
    unite: "per jet ski",
    dureeTexte: "Over 1 hour",
    age: "From 16 years old",
    title: "Midday Jet Ski Tour near Cannes – Esterel (1h)",
    description: "Midday jet ski tour from Mandelieu, near Cannes and Théoule: Esterel coves, no licence needed, guided by an instructor. €130 per jet ski. Book online!",
    accroche: "The Esterel under the midday sun: red cliffs, wild coves and a swim break.",
    sousTitre: "Midday jet ski tour – Esterel massif",
    texte: [
      "Discover the Esterel massif with our midday jet ski tour. This excursion of over an hour shows you the iconic landscapes of the French Riviera in brilliant light.",
      "Riding your jet ski, no licence needed, cruise the turquoise water between wild coves, red rocks and spectacular views. Speed, swimming and unique scenery: a friendly, refreshing outing in the middle of the day.",
      "From 16 years old, solo or for two. Fuel, quality equipment and insurance included. Meet at 11:30 am for a noon departure.",
    ],
    comment: JET_SKI_HOW,
    destinations: TOUR_DESTINATIONS,
    horaires: "Meet at 11:30 am for a 12 pm departure.",
  },
  "randonnee-jet-ski-petit-dejeuner": {
    nom: "Breakfast Jet Ski Tour (2h)",
    unite: "per jet ski",
    dureeTexte: "2 hours",
    age: "From 16 years old",
    title: "Breakfast Jet Ski Tour to the Lérins Islands (2h)",
    description: "Breakfast by the sea, then a 2-hour guided jet ski tour to the Lérins Islands and the Esterel from Mandelieu, near Cannes. €200 per jet ski. Book online!",
    accroche: "Breakfast facing the sea, then two hours of jet ski to the Lérins Islands.",
    sousTitre: "Breakfast jet ski tour – Lérins Islands and Esterel massif",
    texte: [
      "Start your day in style with breakfast facing the sea on our pontoon: hot coffee, fruit juice, croissants, pains au chocolat and a plate of fresh fruit. The perfect moment to meet the group and get your instructor’s briefing.",
      "Then set off for two hours of total escape on our latest-generation jet skis, no licence needed. Dive into the crystal-clear waters around the Lérins Islands and the Esterel massif.",
      "Let our qualified instructors guide you for a safe and memorable experience in the bay of Cannes – Mandelieu – Théoule-sur-Mer.",
    ],
    comment: JET_SKI_HOW,
    destinations: TOUR_DESTINATIONS,
    horaires: "Meet at 8:30 am at the centre for a 9 am departure.",
  },
  "bouee-tractee-adulte": {
    nom: "Tube Ride – Adult",
    unite: "per person",
    age: "From 10 years old",
    title: "Towable Tube Ride near Cannes – Mandelieu | Adult",
    description: "Towable tube ride in Mandelieu, near Cannes and Théoule: up to 8 people, no booking needed. €25 per person. Come and have a laugh!",
    accroche: "Up to 8 people on the tube at once. Hold on tight, it’s going to be bumpy!",
    texte: [
      "Towed by the boat, the tube gives you intense speed and adrenaline. Plenty of laughs with friends, family, for a birthday or a stag or hen party.",
      "Our driver adapts the speed to your group, and our technical team checks the equipment and sea conditions for your safety.",
    ],
    encart: {
      titre: "Choose your tube when you arrive!",
      texte: "Two models: the easier “sofa” tube for up to 8 people, and the slightly more physical “flat” tube for up to 6 people.",
    },
    horaires: "No booking needed: just come to the water sports centre.",
  },
  "bouee-tractee-enfant": {
    nom: "Tube Ride – Child",
    unite: "per person",
    age: "Aged 3 to 10",
    title: "Towable Tube Ride for Kids near Cannes – Mandelieu",
    description: "Tube rides for kids in Mandelieu, near Cannes and Théoule: speed adapted to their age, up to 8 people, no booking needed. €20 per person.",
    accroche: "Kids love it: speed adapted to their age, laughs guaranteed.",
    texte: [
      "Towed by the boat, the tube gives a feeling of speed… adapted to the youngest. Our driver sets the pace to the group so everyone enjoys it safely.",
      "Have fun on the water with friends or family, in the beautiful setting of the bay of Mandelieu – Théoule.",
    ],
    encart: {
      titre: "Choose your tube when you arrive!",
      texte: "The “sofa” tube seats up to 8 people and is perfect for children; the more physical “flat” tube takes up to 6 people.",
    },
    horaires: "No booking needed: just come to the water sports centre.",
  },
  "wakeboard-tour-simple": {
    nom: "Wakeboard Single Ride",
    unite: "per person",
    age: "All ages",
    title: "Wakeboarding near Cannes – Mandelieu | Single Ride",
    description: "Wakeboard ride in Mandelieu, near Cannes and Théoule, with a state-qualified instructor. €35 per person. Book online!",
    accroche: "A wakeboard ride behind the boat, with a professional driver.",
    texte: [
      "Towed by a boat like water skiing, but standing “sideways” (like snowboarding or skateboarding), you ride the wake after a few tries, and may even try jumps off it.",
      "Wakeboarding is without doubt one of the most accessible and exhilarating water board sports. A board sport for everyone.",
    ],
    points: WATERSPORTS_POINTS,
  },
  "wakeboard-lecon-enfant": {
    nom: "Wakeboard Lesson – Child",
    unite: "per person",
    age: "From 10 years old",
    title: "Wakeboard Lesson for Kids near Cannes – Mandelieu",
    description: "Wakeboard lesson for children in Mandelieu, near Cannes and Théoule, with a state-qualified instructor. €45 per person. Book online!",
    accroche: "Progress from the very first ride with a professional instructor.",
    texte: [
      "Make progress with a professional instructor from your first ride. He gives young riders the keys to get up, find their balance and gain confidence.",
      "In a friendly atmosphere, from beginner to improver: have fun on the water while learning.",
    ],
    points: WATERSPORTS_POINTS,
  },
  "wakeboard-lecon-adulte": {
    nom: "Wakeboard Lesson – Adult",
    unite: "per person",
    age: "From 13 years old",
    title: "Wakeboard Lesson near Cannes – Mandelieu | Adult",
    description: "Wakeboard lesson in Mandelieu, near Cannes and Théoule, with a state-qualified instructor, beginner or advanced. €55 per person. Book online!",
    accroche: "Beginner or advanced: a state-qualified instructor just for you.",
    texte: [
      "Beginners learn to get up and hold the wake. More advanced riders get help from their driver to master new tricks.",
      "Wakeboarding gives you that gliding feeling very quickly: in a friendly atmosphere, progress at your own pace in the Bay of Mandelieu.",
    ],
    points: WATERSPORTS_POINTS,
  },
  "wakesurf-tour-simple": {
    nom: "Wakesurf Single Ride",
    unite: "per person",
    age: "All ages",
    title: "Wakesurfing near Cannes – Mandelieu | Single Ride",
    description: "Wakesurf ride in Mandelieu, near Cannes and Théoule, with a state-qualified instructor. €35 per person. Book by phone!",
    accroche: "Surf the boat’s wake, rope-free, in the Bay of Mandelieu.",
    texte: [
      "Towed by a boat then released on its wake, you surf behind the boat standing sideways. After a few tries, you hold the wave and may even try jumps.",
      "Wakesurfing is without doubt one of the most accessible and exhilarating water board sports. A board sport for everyone.",
    ],
    points: WATERSPORTS_POINTS,
  },
  "wakesurf-lecon-enfant": {
    nom: "Wakesurf Lesson – Child",
    unite: "per person",
    age: "Aged 3 to 10",
    title: "Wakesurf Lesson for Kids near Cannes – Mandelieu",
    description: "Wakesurf lesson for children in Mandelieu, near Cannes and Théoule, with a state-qualified instructor. €40 per person. Book by phone!",
    accroche: "A wakesurf lesson for children, with a state-qualified instructor.",
    texte: [
      "Make progress with a professional instructor from the first ride. He guides children step by step to stand up on the board and glide in the boat’s wake.",
      "Laughs guaranteed: have fun on the water while learning.",
    ],
    points: WATERSPORTS_POINTS,
  },
  "wakesurf-lecon-adulte": {
    nom: "Wakesurf Lesson – Adult",
    unite: "per person",
    age: "From 13 years old",
    title: "Wakesurf Lesson near Cannes – Mandelieu | Adult",
    description: "Wakesurf lesson in Mandelieu, near Cannes and Théoule, with a state-qualified instructor, beginner or advanced. €55 per person. Book by phone!",
    accroche: "Beginner or advanced wakesurfing with a state-qualified instructor.",
    texte: [
      "Towed by a boat like water skiing but standing sideways, you learn to move on the wave behind the boat, then to surf it without the rope.",
      "In a friendly atmosphere, from beginner to improver: wakesurfing, a board sport for everyone.",
    ],
    points: WATERSPORTS_POINTS,
  },
  "ski-nautique-tour-simple": {
    nom: "Water Ski Single Ride",
    unite: "per person",
    age: "All ages",
    title: "Water Skiing near Cannes – Mandelieu | Single Ride",
    description: "Water ski ride in Mandelieu, near Cannes and Théoule, with a state-qualified instructor. €35 per person. Book online!",
    accroche: "A water ski ride in the Bay of Mandelieu, with a professional driver.",
    texte: [
      "From your very first rides, discover a unique gliding feeling with water skiing: it is the quickest board sport to learn!",
      "Towed by a boat facing forward, you ski the wake after a few tries, and may even try jumps off it.",
    ],
    points: WATERSPORTS_POINTS,
  },
  "ski-nautique-lecon-enfant": {
    nom: "Water Ski Lesson – Child",
    unite: "per lesson",
    age: "From 10 years old",
    title: "Water Ski Lesson for Kids near Cannes – Mandelieu",
    description: "Water ski lesson for children in Mandelieu, near Cannes and Théoule, with a state-qualified instructor. €45 per lesson. Book online!",
    accroche: "Water skiing, the most instinctive board sport: ideal to start young.",
    texte: [
      "From the first rides, children discover a unique gliding feeling: water skiing is the quickest board sport to learn.",
      "Their instructor helps them get up, keep their balance and follow the boat with confidence. Book a morning slot, when the sea is calm.",
    ],
    points: WATERSPORTS_POINTS,
  },
  "ski-nautique-lecon-adulte": {
    nom: "Water Ski Lesson – Adult",
    unite: "per person",
    age: "From 13 years old",
    title: "Water Ski Lesson near Cannes – Mandelieu | Adult",
    description: "Water ski lesson in Mandelieu, near Cannes and Théoule, with a state-qualified instructor, beginner or advanced. €55 per person. Book online!",
    accroche: "From beginner to advanced: progress with a state-qualified instructor.",
    texte: [
      "Water skiing gives you that gliding feeling very quickly because it is so instinctive. Beginners get the keys to get up; more advanced skiers get help to master new moves.",
      "In a friendly atmosphere, from beginner to improver, with a state-qualified instructor.",
    ],
    points: WATERSPORTS_POINTS,
  },
  "pack-parachute-ascensionnel-bouee-tractee": {
    nom: "Parasailing + Tube Ride Package",
    court: "Parasailing & Tube*",
    unite: "per person",
    age: "Activity for 2 people",
    title: "Parasailing + Tube Ride Package near Cannes",
    description: "Parasailing and tube ride package in Mandelieu, near Cannes: for 2 people, at the best price. €65 per person. Book online!",
    accroche: "One parasailing flight + one tube ride: 30 minutes of activities at the best price.",
    texte: [
      "Fly off for new thrills and enjoy a 360° panorama between sky and sea, then hold on tight to the handles: the tube ride is going to be bumpy!",
      "Maximum combined weight for parasailing: 240 kg (up to 5 people). Package for 2 people.",
    ],
    points: PARASAILING_POINTS,
    pointsTitre: "Enjoy parasailing and a tube ride",
  },
  "parachute-ascensionnel-jet-ski": {
    nom: "Parasailing + Jet Ski Package",
    court: "Parasailing & Jet Ski*",
    unite: "per person",
    age: "Activity for 2 people",
    title: "Parasailing + Jet Ski Package near Cannes",
    description: "Parasailing and jet ski package in Mandelieu, near Cannes and Théoule: for 2 people, at the best price. €85 per person. Book online!",
    accroche: "One parasailing flight + 30 minutes of jet ski, no licence needed: the perfect combo.",
    texte: [
      "Fly off for new thrills and enjoy a 360° panorama between sky and sea, then take the controls of a jet ski for 30 minutes, no licence needed, supervised by an instructor.",
      "Maximum combined weight for parasailing: 240 kg. Package for 2 people.",
    ],
    points: PARASAILING_POINTS,
    pointsTitre: "Enjoy parasailing and jet ski",
  },
};

// --- Activity pages ---------------------------------------------------------------
const JET_SKI_BENEFITS = [
  { titre: "Total freedom", texte: "Our jet skis need no licence! Ride without the paperwork.", icone: "sansPermis" },
  { titre: "The best price", texte: "One or two on a jet ski, the price stays the same: double win!", icone: "etiquette" },
  { titre: "Quality equipment", texte: "Equipment for your comfort and safety is included.", icone: "gilet" },
  { titre: "Stunning setting", texte: "Discover the bay of Théoule from the sea and, who knows, you might even meet dolphins!", icone: "paysage" },
  { titre: "We adapt to you!", texte: "For two or as a group: our different options give you total flexibility.", icone: "reglage" },
];

export const activitesEn = {
  "parachute-ascensionnel": {
    title: "Parasailing Cannes – Mandelieu, Théoule | From €40",
    description: "Parasailing near Cannes, in Mandelieu: take off from the boat facing the Bay of Cannes and the Lérins Islands. From age 3, from €40. Book online!",
    nom: "Parasailing",
    h1: "Parasailing in the Bay of Cannes, from Mandelieu",
    kicker: "Fly with us!",
    tagline: "Bay of Cannes · Mandelieu · Théoule-sur-Mer",
    faits: [["From", "age 3"], ["Up to", "5 people"], ["From", "€40"]],
    intro: {
      eyebrow: "A sensational experience",
      titre: "Your parasailing flight near Cannes",
      textes: [
        "Welcome to Mandelieu Watersports, where the sky becomes your playground. Soar above the sparkling waters of the bays of Mandelieu, Cannes and Théoule-sur-Mer.",
        "Enjoy a 360° panoramic view between sky and sea. You will see the bay like never before, between the majestic Esterel massif and the Lérins Islands.",
        "Take-off from the boat, fly as a pair, a trio or up to 5 people: our water sports centre in Mandelieu-la-Napoule is 5 minutes from Théoule-sur-Mer and 15 minutes from Cannes.",
      ],
    },
    essentiel: {
      titre: "Key facts",
      items: [
        ["From age 3", "Children welcome with an adult.", "enfant"],
        ["Up to 5 under the canopy", "Fly as two, three, four or five, within 240 kg combined.", "parachute"],
        ["State-licensed pilot", "A professional team equips you and stays with you at every step.", "medaille"],
        ["No vertigo", "No direct contact with the ground, so no feeling of vertigo. No need to swim.", "nuage"],
      ],
    },
    comment: {
      titre: "How does it work?",
      etapes: [
        { titre: "The briefing", texte: "When you arrive at the centre, a briefing explains how the parasail works and the rules on the water.", icone: "briefing" },
        { titre: "On board", texte: "You board our state-of-the-art parasailing boat. Music and smiles guaranteed, with an experienced, state-licensed pilot.", icone: "bateau" },
        { titre: "Take-off!", texte: "You fly off as two, three, four or five from the boat’s platform. Your hands stay free to enjoy every moment, then you land gently on board.", icone: "envol" },
      ],
    },
    avantages: {
      titre: "Why go parasailing with us",
      intro: "At Mandelieu Watersports, we are determined to make your flight unforgettable. Here is what you will love:",
      items: [
        { titre: "Total freedom", texte: "Fly like a bird above the bay of Cannes – Mandelieu – Théoule-sur-Mer!", icone: "oiseau" },
        { titre: "No vertigo!", texte: "Total escape without vertigo: you have no direct contact with the ground.", icone: "nuage" },
        { titre: "Quality equipment", texte: "Your comfort and safety are guaranteed by our professional team.", icone: "gilet" },
        { titre: "Stunning setting", texte: "The bay of Cannes – Mandelieu – Théoule-sur-Mer seen from the sky. What could be better?", icone: "paysage" },
        { titre: "We adapt to you!", texte: "As a pair or a group, our options give you total flexibility.", icone: "reglage" },
      ],
    },
    sections: [
      {
        eyebrow: "Good to know",
        titre: "Parasailing in Théoule and Mandelieu: the sky is your playground",
        textes: [
          "Parasailing with Mandelieu Watersports gives you the sky! Feel the freedom of floating above the turquoise Mediterranean, with no vertigo and no need to swim.",
          "Open to everyone from age 3 (with an adult). Gentle take-off and landing directly from the boat’s platform.",
        ],
      },
      {
        eyebrow: "Safety",
        titre: "State-licensed pilots, from the Gulf of La Napoule to the Lérins Islands",
        textes: [
          "Our experienced, state-licensed parasailing pilots are with you at every step of this thrilling adventure.",
          "Our teams carry out rigorous equipment checks to guarantee your comfort and safety. Great atmosphere on the boat! Booking recommended.",
        ],
      },
    ],
    video: { titre: "A flight on video", texte: "Take-off, 360° views over the Esterel and the Lérins Islands, gentle landing: relive a flight as if you were there." },
  },

  "location-jet-ski": {
    title: "Jet Ski Rental Cannes – Mandelieu | No Licence",
    description: "Jet ski rental near Cannes, in Mandelieu, no licence needed: 30 min, 45 min or 1 hour from €90, alone or for two, briefing included. Book online!",
    nom: "Jet ski rental",
    h1: "Jet ski rental near Cannes, no licence needed",
    kicker: "Endless fun in Mandelieu – Théoule!",
    tagline: "No licence · Supervised by approved instructors",
    faits: [["No", "licence needed"], ["Alone or for two", "same price"], ["From", "€90"]],
    intro: {
      eyebrow: "Jet ski rental, no licence",
      titre: "Jet ski without a licence in Mandelieu, near Cannes and Théoule",
      textes: [
        "Welcome to Mandelieu Watersports, your home port for jet ski rental with no licence! Dream of feeling the adrenaline of the waves without the hassle of a licence? Our jet ski rental is the answer.",
        "Dive into a world of speed and fun, where every turn and every splash brings you closer to total freedom.",
        "No coastal licence needed: after a briefing with a state-qualified instructor, you ride your jet ski freely in the Gulf of La Napoule. Perfect for a first jet ski experience!",
      ],
    },
    essentiel: {
      titre: "Key facts",
      items: [
        ["No boat licence", "Our machines are powerful and easy to handle, even for beginners.", "sansPermis"],
        ["Alone or for two", "The price is the same, one or two on the jet ski.", "duo"],
        ["All inclusive", "Fuel, equipment and insurance included.", "carburant"],
        ["ID required", "Required for every driver, with or without a booking. Parental consent for under-18s.", "identite"],
      ],
    },
    comment: {
      titre: "How does it work?",
      etapes: [
        { titre: "The briefing", texte: "When you arrive at the centre, a briefing explains how the machine works and the rules on the water.", icone: "briefing" },
        { titre: "Off you go!", texte: "You set off on your jet ski, fuel, equipment and insurance included, for 30 minutes, 45 minutes or 1 hour of free riding.", icone: "jetski" },
        { titre: "ID", texte: "Drivers from 16 years old (parental consent required for minors). ID required for every driver!", icone: "identite" },
      ],
    },
    avantages: {
      titre: "Why rent a jet ski with us",
      intro: "At Mandelieu Watersports, we are determined to make your jet ski experience unforgettable:",
      items: JET_SKI_BENEFITS,
    },
    sections: [
      {
        eyebrow: "Speed without the hassle",
        titre: "Jet ski rental in Mandelieu, Théoule-sur-Mer and Cannes",
        textes: [
          "Rent your jet ski for 30 minutes, 45 minutes or 1 hour of free riding from La Rague beach, no licence needed.",
          "Jet ski rental gives you the freedom to ride the turquoise Mediterranean without the paperwork of a licence. Our machines are powerful and easy to handle: a pleasant ride, even for beginners.",
        ],
      },
      {
        eyebrow: "For all adrenaline lovers",
        titre: "Beginner or experienced rider, go for it!",
        textes: [
          "Jet ski is open to everyone from age 4 as a passenger (with an adult). Our sessions plunge you into a world of thrills, with the bay of Mandelieu – Théoule as your playground. Beginner or expert, everyone finds their pace.",
          "Our experienced instructors are with you at every step: a detailed briefing to get started with confidence and expert tips to make the most of your rental.",
        ],
      },
    ],
    video: { titre: "Jet ski rental on video", texte: "Picture yourself gliding over the waves, wind in your hair: the promise of a unique experience from La Rague beach." },
  },

  "randonnee-jet-ski": {
    title: "Jet Ski Tours Cannes – Lérins Islands & Esterel",
    description: "Guided jet ski tours near Cannes, no licence needed, from Mandelieu: Lérins Islands, Esterel calanques, sunset. From €130. Book online!",
    nom: "Jet ski tours",
    h1: "Jet ski tours in the Bay of Cannes, from Mandelieu",
    kicker: "Jet ski tours, no licence needed!",
    tagline: "Lérins Islands · Esterel massif",
    faits: [["No", "licence needed"], ["3 tours", "1 to 2 hours"], ["From", "€130"]],
    tarifsTitre: "3 unique tours in an exceptional setting",
    intro: {
      eyebrow: "Guided by approved instructors",
      titre: "Guided jet ski tours: Bay of Cannes, Lérins and Esterel",
      textes: [
        "Welcome to Mandelieu Watersports, your gateway to unforgettable jet ski tours, no licence needed, in the bay of Cannes – Mandelieu – Théoule! Our tours combine the thrill of jet skiing with the splendour of Mediterranean landscapes.",
        "Get ready to ride the waves, discover hidden coves and immerse yourself in a unique adventure on our latest-generation jet skis.",
      ],
    },
    avantages: {
      titre: "Why take a jet ski tour with us",
      intro: "At Mandelieu Watersports, we are determined to make your tour unforgettable:",
      items: JET_SKI_BENEFITS,
    },
    sections: [
      {
        eyebrow: "Breakfast tour",
        titre: "Breakfast, then off to the Lérins Islands and the Esterel",
        textes: [
          "Start your day in style with breakfast facing the sea on our pontoon. Enjoy this special moment to chat with our experienced instructors and meet other adventurers.",
          "Then set off for two hours of total escape: dive into the crystal-clear waters around the Lérins Islands and the Esterel massif.",
        ],
        lien: { label: "Book the breakfast tour" },
      },
      {
        eyebrow: "Sunset tour",
        titre: "Sunset over the Esterel massif, facing Théoule",
        textes: [
          "Dive into a palette of dazzling colours. Picture yourself on a jet ski, crossing calm waters while the sun sets the sky alight.",
          "Explore the mysterious landscapes and hidden coves of the Esterel, a secret gem of the French Riviera. From 16 years old, solo or for two: fuel, equipment and insurance included.",
        ],
        lien: { label: "Book the sunset tour" },
      },
      {
        eyebrow: "Midday tour",
        titre: "Midday tour: the calanques of Théoule-sur-Mer in full sun",
        textes: [
          "The midday tour takes you on a sunny adventure between turquoise sea and volcanic cliffs. Explore the hidden coves and wild landscapes of the Esterel in brilliant light.",
          "A lively, refreshing outing, ideal with friends, as a couple or with family. Meet at 11:30 am for a noon departure.",
        ],
        lien: { label: "Book the midday tour" },
      },
    ],
    choisir: {
      titre: "Which tour should you choose?",
      intro: "Each one has its own charm, from dusk in the Esterel to early morning towards the Lérins Islands. Pick the one that matches your sense of adventure:",
      items: [
        { titre: "Breakfast (2 h)", texte: "The fresh energy of the morning and twice the thrills: an extra hour of total escape as far as the Lérins Islands." },
        { titre: "Midday (1 h)", texte: "A lively outing in the sun, between turquoise sea and the volcanic cliffs of the Esterel." },
        { titre: "Sunset (1 h)", texte: "The warm evening colours on calm waters: ideal for a romantic memory or a moment with friends." },
      ],
    },
    destinations: {
      titre: "Our jet ski routes between Cannes, Mandelieu and Théoule",
      items: [
        { titre: "Towards the Esterel", texte: "A remarkable volcanic site of the French Riviera: the fiery red rocks plunge into the deep blue sea, between maquis hills, hidden coves and impressive calanques." },
        { titre: "Towards the Lérins Islands", texte: "An idyllic, unspoilt setting where turquoise pools meet umbrella pines, between the mystery of the Man in the Iron Mask and the peace of the Cistercian monks." },
      ],
      conclusion: "If luck is on our side, you may meet dolphins and sunfish during the swim breaks in the warm Mediterranean.",
    },
    video: { titre: "Jet ski tours on video", texte: "Secret coves, calanques, turquoise water… the perfect combination for an unforgettable day." },
  },

  "bouee-tractee": {
    title: "Towable Tube Rides near Cannes – Mandelieu, Théoule",
    description: "Towable tube rides in Mandelieu, near Cannes and Théoule: sofa or flat tube for up to 8 people, from €20, no booking needed. Laughs guaranteed!",
    nom: "Tube rides",
    h1: "Towable tube rides in Mandelieu, near Cannes",
    kicker: "Hold on tight, it’s going to be bumpy!",
    tagline: "Tube · Sofa · Up to 8 people",
    faits: [["Up to", "8 people"], ["No", "booking needed"], ["From", "€20"]],
    intro: {
      eyebrow: "Love a thrill?",
      titre: "Laughs guaranteed in the Gulf of La Napoule!",
      textes: [
        "No booking needed: just come and see us at the water sports centre for a tube ride. Fun guaranteed!",
        "Towed by the boat, the tube gives you intense speed and adrenaline. Perfect with friends, family, for a birthday or a stag or hen party.",
      ],
    },
    essentiel: {
      titre: "Key facts",
      items: [
        ["From age 3", "Supervised and open to all, children with an adult.", "enfant"],
        ["Up to 8 people", "Pick your favourite tube when you arrive: sofa (8 seats) or flat (6 seats).", "bouee"],
        ["Adapted speed", "Our professional team drives at your pace, safely.", "vitesse"],
        ["Checked equipment", "Our technical team checks the equipment and sea conditions before every ride.", "controle"],
      ],
    },
    sections: [
      {
        eyebrow: "Supervised and safe",
        titre: "Crazy moments, in complete safety",
        textes: [
          "Want to have a crazy time and lots of fun? We are here for you, in a supervised and safe setting.",
          "Our technical team checks the equipment and the conditions before every ride for your safety. Come and have fun with a professional team and equipment.",
        ],
      },
    ],
  },

  wakeboard: {
    title: "Wakeboarding & Wakesurfing near Cannes – Mandelieu",
    description: "Wakeboarding and wakesurfing in Mandelieu, near Cannes and Théoule: rides from €35, lessons with a state-qualified instructor, calm morning sea.",
    nom: "Wakeboard",
    h1: "Wakeboarding & wakesurfing in Mandelieu – Théoule",
    kicker: "A unique gliding feeling",
    tagline: "Beginners · Improvers · State-qualified instructor",
    faits: [["Single ride", "€35"], ["Lesson", "from €45"], ["Mornings", "calm sea"]],
    tarifsTitre: "Wakeboard & wakesurf: our prices",
    intro: {
      eyebrow: "Board sports",
      titre: "Wakeboarding in the Gulf of La Napoule: from your first rides",
      textes: [
        "Towed by a boat like water skiing, but standing sideways (like snowboarding or skateboarding), you ride the wake after a few tries, and may even try jumps off it.",
        "Wakeboarding is without doubt one of the most accessible water board sports. In a friendly atmosphere, from beginner to improver, with a state-qualified instructor: a board sport for everyone.",
      ],
    },
    essentiel: {
      titre: "Why wakeboard with us?",
      items: [
        ["A unique feeling", "Wakeboarding gives you that gliding feeling very quickly. Sessions are preferably in the morning, on a calm sea.", "glisse"],
        ["Expert tips", "Your driver is a real board-sports pro: he helps you get up, then master new tricks.", "conseil"],
        ["10-ride pass", "€299, on request only: ideal to progress all season long.", "repetition"],
      ],
    },
    sections: [
      {
        eyebrow: "Wakesurf",
        titre: "Fancy surfing the wave without a rope?",
        textes: [
          "Wakesurfing happens behind the boat: after a few tries, you let go of the rope and surf the wave created by the wake.",
          "Single ride, child or adult lesson: wakesurfing is booked by phone on +33 6 65 48 06 06.",
        ],
      },
    ],
  },

  "ski-nautique": {
    title: "Water Skiing near Cannes – Mandelieu | Lessons & Rides",
    description: "Water skiing in Mandelieu, near Théoule and Cannes: rides from €35, child and adult lessons with a state-qualified instructor, no age limit.",
    nom: "Water skiing",
    h1: "Water skiing in Mandelieu – Théoule",
    kicker: "The quickest board sport to learn",
    tagline: "From a young age · State-qualified instructor",
    faits: [["Single ride", "€35"], ["Lesson", "from €45"], ["No", "age limit"]],
    intro: {
      eyebrow: "Board sports",
      titre: "Water skiing in Mandelieu, from a young age",
      textes: [
        "From your very first rides, discover a unique gliding feeling with water skiing. It is so instinctive that it is the quickest board sport to learn!",
        "Towed by a boat like wakeboarding, but facing forward, you ski the wake after a few tries, and may even try jumps off it.",
      ],
    },
    essentiel: {
      titre: "Why water ski with us?",
      items: [
        ["No age limit", "A board sport for everyone, from beginner to improver.", "enfant"],
        ["State-qualified instructor", "In a friendly atmosphere, your driver guides you from the first ride.", "medaille"],
        ["10-ride pass", "€299, on request only: ideal to progress all season long.", "repetition"],
      ],
    },
    sections: [
      {
        eyebrow: "Water skiing, supervised by professionals",
        titre: "The easiest board sport",
        textes: [
          "Water skiing is without doubt the easiest water board sport. Sessions are preferably in the morning, when conditions are best, on a calm sea.",
          "Your driver gives you the keys to get up if you are a beginner, and tips to master new moves if you are more advanced.",
        ],
      },
    ],
  },
};

// --- FAQ ------------------------------------------------------------------------------
export const questionsEn = [
  { q: "Where can I do water sports near Cannes?", r: "Just next to Cannes, Mandelieu Watersports offers a wide range of activities to make the most of the French Riviera: parasailing, jet ski rental, jet ski tours, wakeboarding, water skiing and tube rides, all from La Rague beach in Mandelieu-la-Napoule.", pages: [] },
  { q: "How do I book parasailing?", r: ["Three simple steps:", "1. Check the participants’ ages: flights are open from age 3, children with an adult.", "2. Book your slot online from the flight page (secure deposit) or by phone on +33 6 65 48 06 06.", "3. Meet us at the Mandelieu Watersports centre on La Rague beach."], pages: ["parachute-ascensionnel"] },
  { q: "Do I need to be able to swim to go parasailing?", r: "No. Take-off and landing are on the boat’s platform: you never go in the water. Your hands stay free during the whole flight, which you can do in your swimsuit or in your clothes.", pages: ["parachute-ascensionnel"] },
  { q: "Will I get vertigo while parasailing?", r: "No: you have no direct contact with the ground, so there is no feeling of vertigo.", pages: ["parachute-ascensionnel"] },
  { q: "How many people can fly together?", r: "Up to 5 people fly together under the canopy, within a combined weight of 240 kg.", pages: ["parachute-ascensionnel"] },
  { q: "Where can I ride a jet ski in Cannes?", r: "For jet ski near Cannes with no licence, come to Mandelieu Watersports. Our centre in Mandelieu offers jet ski rental and guided tours to explore the Bay of Cannes, the Lérins Islands and the Esterel.", pages: ["location-jet-ski", "randonnee-jet-ski"] },
  { q: "How much does a jet ski cost?", r: ["Jet ski rental, no licence: €90 for 30 minutes, €120 for 45 minutes and €160 for one hour (price per jet ski, alone or for two).", "Jet ski tours: €130 for the sunset or midday tour (over 1 hour), €200 for the 2-hour breakfast tour to the Lérins Islands and the Esterel."], pages: ["location-jet-ski", "randonnee-jet-ski"] },
  { q: "Can I ride a jet ski without a licence?", r: "Yes. At Mandelieu Watersports, our rentals and tours need no boat licence and are supervised by qualified instructors. Drivers must be at least 16.", pages: ["location-jet-ski", "randonnee-jet-ski"] },
  { q: "What documents should I bring for the jet ski?", r: "ID is required for every driver, with or without a booking. Drivers under 18 must bring the signed parental consent form.", pages: ["location-jet-ski", "randonnee-jet-ski"] },
  { q: "Do I need to book the tube ride?", r: "No, tube rides are available without booking: just come to the centre. Choose your tube when you arrive, up to 8 people at once.", pages: ["bouee-tractee"] },
  { q: "When is the best time for wakeboarding and water skiing?", r: "Board sports sessions are preferably in the morning, when the sea is calm. They are supervised by a state-qualified instructor.", pages: ["wakeboard", "ski-nautique"] },
  { q: "What happens if the weather is bad?", r: "Your activity is 100% refundable if the weather is unfavourable or on presentation of a medical certificate.", pages: ["parachute-ascensionnel", "location-jet-ski", "randonnee-jet-ski", "bouee-tractee", "wakeboard", "ski-nautique"] },
  { q: "Do you speak English?", r: "Yes: our team speaks English, German, Italian and Russian.", pages: [] },
];

// --- Local area -------------------------------------------------------------------------
export const zoneEn = {
  lieux: [
    { titre: "Mandelieu-la-Napoule & Port la Napoule", texte: "Our centre is on La Rague beach, at the port of La Rague, between Port la Napoule and Théoule-sur-Mer, at the far end of the Gulf of La Napoule. Parking nearby.", icone: "repere" },
    { titre: "From Cannes", texte: "About fifteen minutes from central Cannes (A8, exit 40): our outings take you straight into the Bay of Cannes and out to the Lérins Islands.", icone: "voiture" },
    { titre: "From Théoule-sur-Mer", texte: "5 minutes from Théoule-sur-Mer along the coast road: the red coves of the Esterel start right next to the centre.", icone: "corniche" },
  ],
};
export const zonePourEn = {
  accueil: { titre: "Water sports in Mandelieu, next to Cannes and Théoule-sur-Mer", intro: "Holidaying in Cannes, staying in Mandelieu-la-Napoule or Théoule-sur-Mer: our centre on the Gulf of La Napoule is just minutes away. Jet ski, parasailing, tube rides, wakeboarding and water skiing in one place." },
  "parachute-ascensionnel": { titre: "Parasailing in Mandelieu, near Cannes and Théoule-sur-Mer", intro: "Flights take off from La Rague beach and soar over the whole Gulf of La Napoule: views over the Bay of Cannes, the Lérins Islands and the Esterel, minutes from Cannes and Théoule-sur-Mer." },
  "location-jet-ski": { titre: "Jet ski rental in Mandelieu, next to Cannes and Théoule", intro: "Fancy a jet ski in Cannes or Théoule-sur-Mer? Our centre in Mandelieu-la-Napoule is the ideal starting point: the Bay of Cannes and the coves of the Esterel are minutes away by water." },
  "randonnee-jet-ski": { titre: "Jet ski tours in the Bay of Cannes from Mandelieu", intro: "Our jet ski tours leave from Mandelieu-la-Napoule to explore the Bay of Cannes, the Lérins Islands and the calanques of Théoule-sur-Mer, guided by a state-qualified instructor." },
  "bouee-tractee": { titre: "Tube rides in Mandelieu, between Cannes and Théoule-sur-Mer", intro: "Laughs guaranteed in the Gulf of La Napoule: tube rides leave from La Rague beach, minutes from Cannes and Théoule-sur-Mer, no booking needed." },
  wakeboard: { titre: "Wakeboarding in Mandelieu, near Cannes and Théoule-sur-Mer", intro: "In the morning, the Gulf of La Napoule offers a calm sea, ideal for wakeboarding and wakesurfing: a spot minutes from Cannes and Théoule-sur-Mer." },
  "ski-nautique": { titre: "Water skiing in Mandelieu, near Cannes and Théoule-sur-Mer", intro: "Learn or improve your water skiing in the Gulf of La Napoule, on the calm morning water, minutes from Cannes and Théoule-sur-Mer." },
};

// --- Packages ---------------------------------------------------------------------------
export const packsEn = {
  "pack-parachute-ascensionnel-bouee-tractee": {
    kicker: "Parasailing + Tube Ride",
    ticks: ["<strong>Parasailing + tube:</strong> one parasailing flight + one tube ride (30 min of activities)", "Activity for 2 people", "Maximum combined weight for parasailing: 240 kg (up to 5 people)"],
    resume: "One parasailing flight + one tube ride · for 2 people",
  },
  "parachute-ascensionnel-jet-ski": {
    kicker: "Parasailing + Jet Ski Rental",
    ticks: ["<strong>Parasailing + jet ski:</strong> one parasailing flight + 30 minutes of jet ski", "Activity for 2 people", "Maximum combined weight for parasailing: 240 kg", "Jet ski supervised by an instructor, no boat licence needed"],
    resume: "One parasailing flight + 30 min of jet ski, no licence · for 2 people",
  },
};

// --- Menus --------------------------------------------------------------------------------
export const activitesMenuEn = [
  { label: "Jet Ski Tours", sous: "Lérins Islands, Esterel" },
  { label: "Jet Ski Rental", sous: "No licence, supervised" },
  { label: "Parasailing", sous: "From age 3, up to 5 people" },
  { label: "Tube Rides", sous: "Tube & sofa" },
  { label: "Wakeboard", sous: "Board sports" },
  { label: "Water Skiing", sous: "Board sports" },
];

// --- Lérins Islands landing page ----------------------------------------------------------
export const lerinsEn = {
  nom: "Lérins Islands by jet ski",
  title: "Jet Ski to the Lérins Islands from Mandelieu – Cannes",
  description: "Jet ski to the Lérins Islands from Mandelieu, near Cannes: Sainte-Marguerite, Saint-Honorat, turquoise water. No licence needed, from €160.",
  h1: "The Lérins Islands by jet ski, from Mandelieu",
  kicker: "Jet ski tour, no licence needed",
  tagline: "Sainte-Marguerite · Saint-Honorat",
  faits: [["No", "licence needed"], ["2 options", "1 h or 2 h"], ["From", "€160"]],
  intro: "Off the coast of Cannes, the Lérins Islands are one of the most beautiful places on the French Riviera to discover by jet ski. From our centre on La Rague beach, in Mandelieu-la-Napoule, two options take you there, no boat licence needed.",
  sections: [
    {
      titre: "Two ways to reach the Lérins Islands by jet ski",
      html: [
        "<ul><li><strong><a href=\"/en/product/breakfast-jet-ski-tour-lerins/\">The breakfast tour (2 h, €200 per jet ski)</a></strong>: breakfast facing the sea on our pontoon, then a two-hour tour guided by an instructor to the Lérins Islands and the Esterel. Meet at 8:30 am, departure at 9 am.</li><li><strong><a href=\"/en/product/jet-ski-rental-1-hour/\">The one-hour rental (€160 per jet ski)</a></strong>: the only rental length that lets you reach the islands on your own. We give you our best route tips before you leave.</li></ul>",
        "<p>In both cases the price is per jet ski, alone or for two, fuel, equipment and insurance included. Drivers from 16, with ID.</p>",
      ],
    },
    {
      titre: "Sainte-Marguerite island and the Fort Royal",
      html: ["<p>The largest of the Lérins Islands is covered with pine and eucalyptus forest. On its northern tip stands the Fort Royal, the state prison where the mysterious Man in the Iron Mask was held at the end of the 17th century. From the sea, you ride along its rocky shores and small coves.</p>"],
    },
    {
      titre: "Saint-Honorat island and its monks",
      html: ["<p>Smaller and wilder, Saint-Honorat belongs to a community of Cistercian monks who live there and grow vines. Its abbey and its fortified monastery, standing at the water’s edge, offer one of the finest views of the Bay of Cannes.</p>"],
    },
    {
      titre: "Between the two islands: turquoise water",
      html: [
        "<p>The passage between Sainte-Marguerite and Saint-Honorat is famous for its clear, turquoise water over sandy seabeds and protected Posidonia seagrass meadows. Slow down to enjoy the scenery and respect this fragile environment.</p>",
        "<p>With a bit of luck, you will meet dolphins or sunfish on the way.</p>",
      ],
    },
    {
      titre: "The ride from Mandelieu",
      html: [
        "<p>From La Rague beach, you cross the Gulf of La Napoule along the coast, with views of the Château de la Napoule, the Bay of Cannes and the Esterel. Near the shore the speed is limited: the briefing tells you where you can open the throttle.</p>",
        "<p>If the sea is rough, the route can be switched to the Esterel; if the outing cannot go ahead, it is postponed or 100% refunded.</p>",
      ],
    },
  ],
  faq: [
    { q: "How long does it take to reach the Lérins Islands by jet ski?", r: "Allow at least a one-hour rental for the round trip from Mandelieu. The 2-hour breakfast tour gives you time to enjoy both the islands and the Esterel." },
    { q: "Do I need a licence to ride a jet ski to the Lérins Islands?", r: "No: our tours and rentals need no boat licence, after a briefing by a qualified instructor. Drivers from 16 years old." },
  ],
};
