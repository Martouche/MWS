// Pages : tarifs, packs, événements, privatisation, contact, FAQ, légal,
// formulaire mineur, 404.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../../content/site.mjs";
import { produits, parCategorie, categories, tousProduits } from "../../content/produits.mjs";
import { questions, toutesQuestions } from "../../content/faq.mjs";
import { t, u } from "../langue.mjs";
import { esc, ico, pic, paras, btn, urlImage } from "../html.mjs";
import { icone } from "../icones.mjs";
import {
  heroPage, enTetePage, teteSection, grilleProduits, grilleFeats, split, faq, schemaFaq,
  packsDuo, bestSellers, bandeauPacks, duoConfiance, blocContact, schemaOffres,
} from "../composants.mjs";

const racine = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const ACCUEIL = { nom: "Accueil", url: "/" };
const accueilL = () => ({ nom: t("Accueil", "Home"), url: u("/") });
const TTC = "Tous nos prix sont toutes taxes comprises, TVA de 20 % incluse.";
const ttc = () => t(TTC, "All prices include VAT (20%).");
const telL = () => t(site.telephoneAffiche, "+33 " + site.telephoneAffiche.slice(1));

// --- Tarifs ------------------------------------------------------------------
const ordreTarifs = () => [
  ["parachute", t("Parachute ascensionnel", "Parasailing"), u("/parachute-ascensionnel/")],
  ["jetski", t("Location jet ski", "Jet ski rental"), u("/location-jet-ski/")],
  ["randonnee", t("Randonnée jet ski", "Jet ski tours"), u("/randonnee-jet-ski/")],
  ["bouee", t("Bouées tractées", "Tube rides"), u("/bouee-tractee/")],
  ["wakeboard", "Wakeboard", u("/wakeboard/")],
  ["wakesurf", "Wakesurf", u("/wakeboard/")],
  ["ski", t("Ski nautique", "Water skiing"), u("/ski-nautique/")],
  ["packs", t("Nos packs", "Packages"), u("/nos-packs/")],
];

export function tarifs() {
  const ORDRE_TARIFS = ordreTarifs();
  const fil = [accueilL(), { nom: t("Nos tarifs", "Prices"), url: u("/nos-tarifs/") }];
  const corps = `
    ${heroPage({
      h1: t("Tarifs jet ski & parachute ascensionnel à Mandelieu", "Jet ski & parasailing prices near Cannes"),
      kicker: t("Tarifs & réservation", "Prices & booking"),
      tagline: t("Parachute · Jet ski · Bouée · Glisse · Packs", "Parasailing · Jet ski · Tube rides · Board sports · Packages"),
      image: "parachute-deux-bateaux",
      fil,
      faits: [[t("Parachute", "Parasailing"), t("dès 40 €", "from €40")], ["Jet ski", t("dès 90 €", "from €90")], [t("Bouée", "Tube ride"), t("dès 20 €", "from €20")]],
      cta: { href: "#categories", label: t("Voir toutes les catégories", "See all categories") },
    })}

    <section class="section" aria-labelledby="cat-title">
      ${teteSection({
        eyebrow: t("Nos tarifs", "Our prices"),
        titre: t("Tous nos tarifs, activité par activité", "All our prices, activity by activity"),
        id: "cat-title",
        lead: [
          t("Voici tous nos tarifs : le parachute ascensionnel, la location et la randonnée jet ski, les bouées tractées, le wakeboard, le wakesurf et le ski nautique. En dehors de nos tarifs classiques, découvrez aussi nos <a href=\"/nos-packs/\">packs</a> !", `Here are all our prices: parasailing, jet ski rental and tours, tube rides, wakeboarding, wakesurfing and water skiing. Also check out our <a href="${u("/nos-packs/")}">packages</a>!`),
          t(`Pour réserver un créneau sur n’importe quelle activité ou pack, appelez-nous au <a href="tel:${site.telephone}">${site.telephoneAffiche}</a>.`, `To book a slot for any activity or package, call us on <a href="tel:${site.telephone}">${telL()}</a>.`),
        ],
      })}
      <nav class="chips" id="categories" aria-label="${t("Nos catégories", "Categories")}">
        ${ORDRE_TARIFS.map(([c, nom]) => `<a href="#${c}">${nom}</a>`).join("\n        ")}
      </nav>
      ${ORDRE_TARIFS.map(([c, nom, page]) => {
        const liste = parCategorie(c);
        return `<div class="cat-block" id="${c}">
        <div class="activities__head" style="margin:clamp(40px,6vw,64px) 0 0">
          <h2 class="h2">${nom}</h2>
          <div><a class="btn btn--ghost" href="${page}">${c === "packs" ? t("Tout savoir sur nos packs", "All about our packages") : t("Découvrir l’activité", "Discover the activity")} ${ico.fleche}</a></div>
        </div>
        ${grilleProduits(liste, { cls: liste.length === 4 ? "tarifs--4" : "" })}
        ${["wakeboard", "wakesurf", "ski"].includes(c) ? `<p class="note">${t("Forfait 10 tours : 299 €, uniquement sur demande. Le ski nautique et le wakeboard se pratiquent avec un moniteur breveté d’État, le matin de préférence quand les conditions sont propices.", "10-ride pass: €299, on request only. Water skiing and wakeboarding are supervised by a state-qualified instructor, preferably in the morning when conditions are best.")}</p>` : ""}
      </div>`;
      }).join("\n      ")}
      <p class="note">${ttc()}</p>
    </section>

    ${duoConfiance()}
    ${blocContact()}`;
  return {
    url: u("/nos-tarifs/"),
    title: t("Tarifs Jet Ski & Parachute Ascensionnel Mandelieu", "Jet Ski & Parasailing Prices near Cannes – Mandelieu"),
    description: t("Tous nos prix à Mandelieu, près de Cannes : parachute ascensionnel dès 40 €, location jet ski dès 90 €, rando jet ski dès 130 €, bouée dès 20 €. Réservez !", "All our prices in Mandelieu, near Cannes: parasailing from €40, jet ski rental from €90, jet ski tours from €130, tube rides from €20. Book online!"),
    image: "parachute-deux-bateaux",
    fil,
    corps,
    schema: { "@type": "OfferCatalog", name: t("Tarifs Mandelieu Watersports", "Mandelieu Watersports prices"), url: site.domaine + u("/nos-tarifs/"), itemListElement: schemaOffres(tousProduits()) },
  };
}

// --- Réservation en ligne (cible des boutons « Réserver ») ---------------------------
export function reservation() {
  const fil = [accueilL(), { nom: t("Réservation", "Booking"), url: u("/reservation/") }];
  const enLigne = (p) => p.resaId && !p.telephone;
  const cats = ordreTarifs().filter(([c]) => parCategorie(c).some(enLigne));
  const corps = `
    ${heroPage({
      h1: t("Réservez votre activité en ligne", "Book your activity online"),
      kicker: t("Réservation", "Booking"),
      tagline: t("Parachute · Jet ski · Bouée · Glisse · Packs", "Parasailing · Jet ski · Tube rides · Board sports · Packages"),
      image: "jet-ski-duo-esterel",
      fil,
      faits: [[t("Paiement", "Payment"), t("acompte sécurisé", "secure deposit")], [t("Solde", "Balance"), t("sur place", "on site")], [t("Météo", "Weather"), t("100 % remboursé", "100% refunded")]],
      cta: { href: "#activites-resa", label: t("Choisir mon activité", "Choose my activity") },
    })}

    <section class="booking" aria-labelledby="etapes-title">
      <p class="eyebrow">${t("Comment ça marche ?", "How does it work?")}</p>
      <h2 class="h2" id="etapes-title">${t("Réservez en 3 étapes", "Book in 3 steps")}</h2>
      ${grilleFeats([
        [t("Choisissez votre activité", "Choose your activity"), t("Parachute, jet ski, bouée, glisse ou pack : ouvrez la fiche de l’activité qui vous tente.", "Parasailing, jet ski, tube ride, board sports or package: open the page of the activity you fancy."), "repere"],
        [t("Sélectionnez votre créneau", "Select your slot"), t("Le calendrier affiche les disponibilités de la base nautique en temps réel.", "The calendar shows the centre’s availability in real time."), "calendrier"],
        [t("Réglez l’acompte en ligne", "Pay the deposit online"), t("Paiement sécurisé ; le solde se règle sur place le jour de l’activité.", "Secure payment; the balance is paid on site on the day."), "cadenas"],
      ], { cls: "grid-feats--3", numeros: true })}
    </section>

    <section class="section" id="activites-resa" aria-labelledby="resa-title">
      ${teteSection({
        eyebrow: t("Réserver en ligne", "Book online"),
        titre: t("Quelle activité souhaitez-vous réserver ?", "Which activity would you like to book?"),
        id: "resa-title",
        lead: t(`Le wakesurf, la privatisation du bateau et les demandes de groupe se réservent par téléphone au <a href="tel:${site.telephone}">${site.telephoneAffiche}</a>.`, `Wakesurfing, private boat hire and group requests are booked by phone on <a href="tel:${site.telephone}">${telL()}</a>.`),
        action: `<a class="btn btn--ghost" href="tel:${site.telephone}" aria-label="${t("Appel direct au", "Call us on")} ${telL()}">${icone("telephone", "ico ico--tel")} ${t("Appel direct", "Call us")}</a>`,
      })}
      <nav class="chips" aria-label="${t("Catégories", "Categories")}">
        ${cats.map(([c, nom]) => `<a href="#resa-${c}">${nom}</a>`).join("\n        ")}
      </nav>
      ${cats.map(([c, nom]) => {
        const liste = parCategorie(c).filter(enLigne);
        return `<div class="cat-block" id="resa-${c}">
        <h3 class="h2" style="font-size:clamp(22px,3vw,30px);margin:clamp(36px,5vw,56px) 0 0">${nom}</h3>
        ${grilleProduits(liste, { cls: liste.length === 4 ? "tarifs--4" : "" })}
      </div>`;
      }).join("\n      ")}
      <p class="note">${ttc()}</p>
    </section>

    ${blocContact()}`;
  return {
    url: u("/reservation/"),
    title: t("Réserver Jet Ski & Parachute en ligne | Mandelieu", "Book Jet Ski & Parasailing Online | Cannes – Mandelieu"),
    description: t("Réservez en ligne votre activité nautique à Mandelieu : parachute ascensionnel, jet ski, bouée tractée, wakeboard, ski nautique et packs. Acompte sécurisé.", "Book your water sports activity online in Mandelieu, near Cannes: parasailing, jet ski, tube rides, wakeboarding, water skiing and packages."),
    image: "jet-ski-duo-esterel",
    fil,
    corps,
    reservation: "#activites-resa",
    mcta: { href: "#activites-resa", label: t("Réserver", "Book") },
  };
}

// --- Packs -------------------------------------------------------------------
export function packs() {
  const fil = [accueilL(), { nom: t("Nos packs", "Packages"), url: u("/nos-packs/") }];
  const liste = parCategorie("packs");
  const corps = `
    ${heroPage({
      h1: t("Packs parachute ascensionnel, jet ski & bouée à Mandelieu", "Parasailing, jet ski & tube ride packages near Cannes"),
      kicker: t("Parachute – Bouée – Jet ski", "Parasailing – Tube – Jet ski"),
      tagline: t("Meilleur prix · Pour 2 personnes", "Best price · For 2 people"),
      image: "parachute-bateau-amies",
      fil,
      faits: [[t("Parachute + bouée", "Parasailing + tube"), "65 €"], [t("Parachute + jet ski", "Parasailing + jet ski"), "85 €"], [t("Pour", "For"), t("2 personnes", "2 people")]],
      cta: { href: "#packs", label: t("Choisir mon pack", "Choose my package") },
    })}

    <section class="section" id="packs" aria-labelledby="packs-title">
      <p class="eyebrow">${t("Nos packs", "Our packages")}</p>
      <h2 class="h2" id="packs-title">${t("Choisissez les activités sous forme de packs pour avoir le meilleur prix", "Combine activities in a package for the best price")}</h2>
      <p class="lead">${t(`Pour réserver un créneau sur n’importe quelle activité ou pack, appelez-nous au <a href="tel:${site.telephone}">${site.telephoneAffiche}</a> ou réservez en ligne.`, `To book a slot for any activity or package, call us on <a href="tel:${site.telephone}">${telL()}</a> or book online.`)}</p>
      ${packsDuo()}
      <p class="note">${t("* Prix par personne, pack prévu pour 2 personnes.", "* Price per person, package for 2 people.")} ${ttc()} <a class="linkbtn" href="${u("/nos-tarifs/")}">${t("Voir nos autres tarifs sans pack", "See our other prices")}</a></p>
      ${bestSellers({ exclure: liste.map((p) => p.slug) })}
    </section>

    <section class="section section--tight" aria-label="${t("Les activités des packs", "Activities in the packages")}">
      ${split({ eyebrow: t("Dans le pack", "In the package"), titre: t("Le parachute ascensionnel", "Parasailing"), textes: [t("Envolez-vous jusqu’à 5 personnes en même temps et admirez un panorama à 360° sur la baie de Cannes – Mandelieu – Théoule. Pas besoin de savoir nager, pas de vertige : décollage et atterrissage sur la plateforme du bateau.", "Fly up to 5 people at once and enjoy a 360° panorama over the bay of Cannes – Mandelieu – Théoule. No need to swim, no vertigo: take-off and landing on the boat’s platform.")], image: "parachute-vol-ciel", lien: { href: u("/parachute-ascensionnel/"), label: t("Découvrir le parachute", "Discover parasailing"), variante: "ghost" } })}
      ${split({ eyebrow: t("Dans le pack", "In the package"), titre: t("La bouée tractée ou le jet ski", "A tube ride or the jet ski"), textes: [t("Complétez votre vol par un tour de bouée tractée, fous rires garantis, ou par 30 minutes de jet ski sans permis encadrées par un moniteur.", "Complete your flight with a tube ride, laughs guaranteed, or with 30 minutes of jet ski, no licence needed, supervised by an instructor.")], image: "bouee-tractee-joie", inverse: true, lien: { href: u("/location-jet-ski/"), label: t("Découvrir le jet ski", "Discover jet ski rental"), variante: "ghost" } })}
    </section>

    ${duoConfiance()}
    ${blocContact()}`;
  return {
    url: u("/nos-packs/"),
    title: t("Packs Parachute + Jet Ski ou Bouée | Mandelieu – Cannes", "Parasailing + Jet Ski or Tube Packages | Cannes"),
    description: t("Combinez parachute ascensionnel et jet ski (85 €) ou bouée tractée (65 €) à Mandelieu, près de Cannes : le meilleur prix pour 2 personnes. Réservez !", "Combine parasailing with jet ski (€85) or a tube ride (€65) in Mandelieu, near Cannes: the best price for 2 people. Book online!"),
    image: "parachute-bateau-amies",
    fil,
    corps,
    schema: { "@type": "OfferCatalog", name: t("Packs Mandelieu Watersports", "Mandelieu Watersports packages"), itemListElement: schemaOffres(liste) },
  };
}

// --- Événements ------------------------------------------------------------------
const PARACHUTE_EVENEMENT = [
  ["Pas besoin de savoir nager", "Il n’y a aucun moment dans l’eau.", "nageur"],
  ["Les mains libres", "Pendant la totalité du vol.", "main"],
  ["En maillot ou habillé", "Le vol se fait dans la tenue de votre choix.", "tshirt"],
  ["Depuis le bateau", "Décollage et atterrissage sur la plateforme du bateau.", "bateau"],
  ["Pas de vertige", "La sensation de vertige n’existe pas : vous n’avez aucun contact direct avec le sol.", "nuage"],
  ["Jusqu’à 5 sous la voile", "Volez ensemble, dans la limite de 240 kg cumulés.", "parachute"],
];

const EVJF = {
  eyebrow: "EVJF",
  titre: "Plein d’idées pour un enterrement de vie de jeune fille",
  textes: [
    "Vous organisez l’enterrement de vie de jeune fille de votre amie et vous cherchez des idées originales ? Grâce à nos idées, vous ferez de son EVJF l’une des plus belles journées de sa vie !",
    "Que serait un EVJF sans un minimum d’originalité ? Découvrez plein d’idées de défis pour organiser un enterrement de vie de jeune fille qui restera gravé dans la mémoire de tous les participants : vol en parachute ascensionnel à plusieurs, bouée tractée, jet ski…",
  ],
  image: "evjf",
};
const EVG = {
  eyebrow: "EVG",
  titre: "Plein d’idées pour un enterrement de vie de garçon",
  textes: [
    "Vous organisez l’enterrement de vie de garçon de votre ami et vous cherchez des idées originales ? Grâce à nos idées, vous ferez de son EVG l’une des plus belles journées de sa vie !",
    "Découvrez plein d’idées de défis pour organiser un enterrement de vie de garçon qui restera gravé dans la mémoire de tous les participants : parachute ascensionnel, jet ski, bouée tractée…",
  ],
  image: "bouee-tractee-groupe",
};
const SEMINAIRE = {
  eyebrow: "Séminaires & incentives",
  titre: "Organisez vos séminaires ou incentives sur la Côte d’Azur",
  textes: [
    "Dans la baie de Mandelieu et de Théoule-sur-Mer, Mandelieu Watersports vous invite à Mandelieu, ville de tous les événements, pour réussir le vôtre : journées de séminaire, d’étude, colloques, journées d’affaires…",
    "Nous avons conscience des enjeux liés à l’organisation d’un séminaire et nous nous mettons à votre disposition pour vos événements professionnels, avec des activités qui resteront gravées dans la mémoire de tous les participants.",
  ],
  image: "seminaire",
};

export function evenements() {
  const fil = [ACCUEIL, { nom: "Événement", url: "/evenement-evg-evgf-mandelieu-cannes/" }];
  const corps = `
    ${heroPage({ h1: "Événements privés : EVG, EVJF et séminaires", kicker: "On organise pour vous l’événement parfait", tagline: "Mandelieu · Cannes · Théoule", image: "parachute-trois-amies", fil, faits: [["EVJF", "& EVG"], ["Séminaires", "incentives"], ["Bateau", "privatisable"]], cta: { href: `tel:${site.telephone}`, label: "Organiser mon événement" } })}
    <section class="section" aria-label="Nos événements">
      ${split({ ...EVJF, lien: { href: "/evenement-evg-evgf-mandelieu-cannes/evjf/", label: "Organiser un EVJF" } })}
      ${split({ ...EVG, inverse: true, lien: { href: `tel:${site.telephone}`, label: "Organiser un EVG" } })}
      ${split({ ...SEMINAIRE, lien: { href: "/evenement-evg-evgf-mandelieu-cannes/seminaires/", label: "Organiser un séminaire" } })}
      ${split({ eyebrow: "Nouveau", titre: "Privatisez le bateau de parachute ascensionnel", textes: ["Jusqu’à 10 personnes à bord de notre bateau dernière génération, en famille, entre amis ou pour un événement (anniversaire, EVJF, EVG, entreprise…)."], image: "privatisation-bateau", inverse: true, lien: { href: "/privatisation-parachute-ascensionnel/", label: "Découvrir la privatisation" } })}
      <p class="note">Réservations : <a href="tel:${site.telephone}">${site.telephoneAffiche}</a>. ${TTC}</p>
    </section>
    ${bandeauPacks()}
    ${blocContact()}`;
  return {
    url: "/evenement-evg-evgf-mandelieu-cannes/",
    title: "EVG, EVJF & Séminaire nautique Mandelieu – Cannes",
    description: "EVG, EVJF, anniversaire ou séminaire à Mandelieu, près de Cannes : parachute ascensionnel, jet ski, bouée, bateau privatisable. Demandez un devis !",
    image: "parachute-trois-amies",
    fil,
    corps,
  };
}

export function evjf() {
  const fil = [ACCUEIL, { nom: "Événement", url: "/evenement-evg-evgf-mandelieu-cannes/" }, { nom: "EVJF", url: "/evenement-evg-evgf-mandelieu-cannes/evjf/" }];
  const corps = `
    ${heroPage({ h1: "EVJF à Mandelieu – Cannes", kicker: "Enterrement de vie de jeune fille", tagline: "Parachute · Bouée · Jet ski", image: "parachute-bateau-amies", fil, faits: [["Jusqu’à", "5 sous la voile"], ["Pas de", "limite d’âge"], ["Bateau", "privatisable"]], cta: { href: `tel:${site.telephone}`, label: "Organiser l’EVJF" } })}
    <section class="section" aria-label="EVJF">
      ${split({ ...EVJF, lien: { href: `tel:${site.telephone}`, label: `Appel direct · ${site.telephoneAffiche}` } })}
    </section>
    <section class="booking" aria-labelledby="evjf-parachute">
      <p class="eyebrow">Parachute ascensionnel</p>
      <h2 class="h2" id="evjf-parachute">Pas de limite d’âge pour la pratique du parachute ascensionnel !</h2>
      ${grilleFeats(PARACHUTE_EVENEMENT, { cls: "grid-feats--3" })}
    </section>
    ${bandeauPacks()}
    ${duoConfiance()}
    ${blocContact()}`;
  return {
    url: "/evenement-evg-evgf-mandelieu-cannes/evjf/",
    title: "EVJF Mandelieu Cannes : parachute, bouée & jet ski",
    description: "On organise pour vous l'EVJF (enterrement de vie de jeune fille) parfait ! Parachute ascensionnel, bouée tractée et jet ski à Mandelieu, Cannes, Théoule.",
    image: "parachute-bateau-amies",
    fil,
    corps,
  };
}

export function seminaires() {
  const fil = [ACCUEIL, { nom: "Événement", url: "/evenement-evg-evgf-mandelieu-cannes/" }, { nom: "Séminaires", url: "/evenement-evg-evgf-mandelieu-cannes/seminaires/" }];
  const corps = `
    ${heroPage({ h1: "Séminaires à Mandelieu – Théoule", kicker: "Séminaires & incentives", tagline: "Cannes · Mandelieu · Théoule-sur-Mer", image: "jet-ski-randonnee-groupe", fil, faits: [["Groupes", "sur mesure"], ["Activités", "nautiques"], ["Bateau", "privatisable"]], cta: { href: `tel:${site.telephone}`, label: "Demander un devis" } })}
    <section class="section" aria-label="Séminaires">
      ${split({ ...SEMINAIRE, titre: "Organisez vos séminaires ou incentives sur la Côte d’Azur à Mandelieu Théoule", lien: { href: `tel:${site.telephone}`, label: `Appel direct · ${site.telephoneAffiche}` } })}
      ${split({ eyebrow: "Idées d’activités", titre: "Des défis qui soudent les équipes", textes: ["Parachute ascensionnel à plusieurs, randonnée en jet ski vers les îles de Lérins, bouée tractée : des idées d’activités spéciales pour vos journées de séminaire, d’étude, colloques ou journées d’affaires.", "Privatisez notre bateau de parachute ascensionnel jusqu’à 10 personnes pour un moment unique."], image: "jet-ski-randonnee-duo", inverse: true, lien: { href: "/privatisation-parachute-ascensionnel/", label: "La privatisation", variante: "ghost" } })}
      <p class="note">${TTC}</p>
    </section>
    ${bandeauPacks()}
    ${blocContact()}`;
  return {
    url: "/evenement-evg-evgf-mandelieu-cannes/seminaires/",
    title: "Séminaire & incentive nautique Mandelieu – Cannes",
    description: "Séminaire ou incentive nautique à Mandelieu, entre Cannes et Théoule : parachute, rando jet ski, bouée, bateau privatisé jusqu’à 10. Demandez un devis !",
    image: "jet-ski-randonnee-groupe",
    fil,
    corps,
  };
}

export function privatisation() {
  const fil = [ACCUEIL, { nom: "Privatisation", url: "/privatisation-parachute-ascensionnel/" }];
  const offres = [
    { nom: "Privatisation 1 heure", prix: 600 },
    { nom: "Privatisation 2 heures", prix: 1000 },
  ];
  const corps = `
    ${heroPage({ h1: "Privatisation bateau parachute ascensionnel Mandelieu Cannes", kicker: "Nouveau !", tagline: "Mandelieu · Cannes · Théoule", image: "privatisation-bateau", fil, faits: [["Jusqu’à", "10 personnes"], ["1 heure", "600 €"], ["2 heures", "1 000 €"]], cta: { href: `tel:${site.telephone}`, label: "Demander un devis" } })}
    <section class="section" aria-label="Privatisation">
      ${split({
        eyebrow: "Privatisez votre vol",
        titre: "Privatisez votre vol en parachute ascensionnel à Mandelieu, Cannes",
        textes: [
          "Il est désormais possible de privatiser le bateau de parachute ascensionnel à Mandelieu, Cannes ! Le départ se fait de notre base nautique, ou nous pouvons venir vous chercher où que vous soyez.",
          "Jusqu’à 10 personnes peuvent embarquer dans notre bateau dernière génération. En famille, entre amis ou pour un événement (anniversaire, EVJF, EVG, entreprise…), vivez un moment unique.",
          "Notre équipe souriante, professionnelle et conviviale vous accompagne du début à la fin de votre vol.",
        ],
        image: "parachute-famille",
      })}
    </section>
    <section class="section section--tight" aria-labelledby="priv-tarifs">
      <p class="eyebrow">Tarifs</p>
      <h2 class="h2" id="priv-tarifs">Jusqu’à 10 personnes</h2>
      <ul class="tarifs">
        ${offres.map((o) => `<li><article class="price-card"><div class="price-card__body">
          <p class="kicker">Bateau privatisé</p><h3>${o.nom}</h3>
          <p class="price"><strong>${o.prix.toLocaleString("fr-FR")}€</strong><span>Prix pour le bateau</span></p>
          <ul class="ticks"><li>Jusqu’à 10 personnes à bord</li><li>Départ de la base ou prise en charge</li></ul>
          <a class="btn btn--primary" href="tel:${site.telephone}">${icone("telephone", "ico ico--tel")} Appel direct</a>
        </div></article></li>`).join("")}
        <li><article class="price-card"><div class="price-card__body">
          <p class="kicker">Sur devis</p><h3>Demi-journée ou journée</h3>
          <p class="desc">Consultez-nous pour que nous puissions vous faire un devis.</p>
          <a class="btn btn--primary" href="tel:${site.telephone}">${icone("telephone", "ico ico--tel")} Nous contacter</a>
        </div></article></li>
      </ul>
      <p class="note">${TTC}</p>
    </section>
    ${duoConfiance()}
    ${blocContact()}`;
  return {
    url: "/privatisation-parachute-ascensionnel/",
    title: "Privatisation bateau parachute ascensionnel Mandelieu",
    description: "Privatisez le bateau de parachute ascensionnel à Mandelieu, près de Cannes et Théoule : jusqu’à 10 personnes, 1 h dès 600 €. Demandez un devis !",
    image: "privatisation-bateau",
    fil,
    corps,
    schema: { "@type": "Service", name: "Privatisation bateau parachute ascensionnel", provider: { "@id": `${site.domaine}/#entreprise` }, offers: offres.map((o) => ({ "@type": "Offer", name: o.nom, price: o.prix, priceCurrency: "EUR" })) },
  };
}

// --- Contact --------------------------------------------------------------------
export function contact() {
  const fil = [accueilL(), { nom: "Contact", url: u("/contact/") }];
  const carte = `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11572.957819602394!2d${site.geo.lon}!3d${site.geo.lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x437f866a0ccdf8a6!2sMandelieu%20Watersports!5e0!3m2!1sfr!2sfr`;
  const corps = `
    ${heroPage({ h1: t("Notre base nautique à Mandelieu-la-Napoule", "Our water sports centre in Mandelieu-la-Napoule"), kicker: t("Où nous trouver ?", "Where to find us"), tagline: t("Plage de la Rague · Mandelieu-la-Napoule", "La Rague beach · Mandelieu-la-Napoule"), image: "base-nautique", fil, faits: [[t("Ouvert", "Open"), t("7j/7", "7 days a week")], [t("Horaires", "Hours"), t("8 h – 20 h", "8 am – 8 pm")], ["Parking", t("gratuit", "free")]], cta: { href: site.googleMaps, label: t("Voir l’itinéraire", "Get directions") } })}

    <section class="section" aria-labelledby="infos-title">
      <div class="split">
        <div class="map" data-map="${esc(carte)}">
          ${pic("base-nautique", { sizes: "(min-width:860px) 50vw, 100vw" })}
          <button type="button" class="btn btn--white map__btn" data-map-open>${t("Afficher la carte Google Maps", "Show Google Map")}</button>
        </div>
        <div>
          <p class="eyebrow">${t("Informations", "Information")}</p>
          <h2 id="infos-title">Mandelieu Watersports</h2>
          <p><strong>${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}</strong></p>
          <p>${t("Téléphone", "Phone")} : <a href="tel:${site.telephone}">${telL()}</a><br>${t("Mail", "Email")} : <a href="mailto:${site.email}">${site.email}</a></p>
          <p>${t(site.horaires, "Monday – Sunday | 8 am – 8 pm")}</p>
          <p>${t("Contactez-nous par téléphone, par mail, ou réservez directement vos activités sur notre site.", "Contact us by phone or email, or book your activities directly on our website.")}</p>
          ${btn(site.googleMaps, t("Voir l’itinéraire", "Get directions"), "primary", 'rel="noopener" target="_blank"')}
        </div>
      </div>
    </section>

    <section class="booking" aria-labelledby="acces-title">
      <p class="eyebrow">${t("Accès", "Access")}</p>
      <h2 class="h2" id="acces-title">${t("Parking et itinéraire", "Parking and directions")}</h2>
      <p class="lead">${t("La plage du Port de la Rague est l’une des plus belles plages de Mandelieu. Située à l’extérieur du centre-ville, en direction de Théoule-sur-Mer, elle est accessible depuis le Port de la Rague (très bien indiqué sur la route, attention l’entrée est dans un virage).", "La Rague beach is one of the most beautiful beaches in Mandelieu. Outside the town centre, towards Théoule-sur-Mer, it is reached from the port of La Rague (well signposted; careful, the entrance is on a bend).")}</p>
      ${grilleFeats([
        [t("Parking payant", "Paid parking"), t("Au port de la Rague, vous trouverez un parking payant.", "There is a paid car park at the port of La Rague."), "parking"],
        [t("Parking gratuit", "Free parking"), t("Sur la route, garez-vous avant l’entrée du port sur la gauche (avant la descente en venant de La Napoule, indication Beach Hôtel), puis empruntez à pied le pont qui passe au-dessus de la voie ferrée. Le chemin et les escaliers vous mènent à la plage à travers une végétation agréable.", "Park on the left before the port entrance (before the slope when coming from La Napoule, Beach Hôtel sign), then walk over the bridge above the railway. The path and steps lead you down to the beach through pleasant greenery."), "pieton"],
        [t("Sur votre GPS", "In your GPS"), `${t("Indiquez", "Enter")} : PLAGE DE LA RAGUE, ${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}.`, "repere"],
      ], { cls: "grid-feats--3" })}
      ${grilleFeats([
        [t("Depuis l’autoroute", "From the motorway"), t("Prendre la sortie 40 – direction Saint-Raphaël, Théoule-sur-Mer.", "Take exit 40 – towards Saint-Raphaël, Théoule-sur-Mer."), "autoroute"],
        [t("Depuis Cannes, Nice, Mandelieu", "From Cannes, Nice, Mandelieu"), t("Suivre la direction Saint-Raphaël, Théoule-sur-Mer.", "Follow signs for Saint-Raphaël, Théoule-sur-Mer."), "voiture"],
        [t("Depuis Saint-Raphaël par le bord de mer", "From Saint-Raphaël along the coast"), t("Prendre la direction de Cannes par la corniche de l’Esterel.", "Head towards Cannes along the Esterel corniche road."), "corniche"],
      ], { cls: "grid-feats--3" })}
    </section>

    ${duoConfiance()}
    ${blocContact()}`;
  return {
    url: u("/contact/"),
    title: t("Base nautique Mandelieu-la-Napoule, plage de la Rague", "Contact & Directions | Water Sports Centre near Cannes"),
    description: t("Mandelieu Watersports, plage de la Rague à Mandelieu-la-Napoule, 5 min de Théoule et 15 min de Cannes : accès, parking gratuit, horaires, 06 65 48 06 06.", "Mandelieu Watersports, La Rague beach, Mandelieu-la-Napoule, 15 min from Cannes: directions, parking, opening hours, phone +33 6 65 48 06 06."),
    image: "base-nautique",
    fil,
    corps,
    schema: { "@type": "ContactPage", url: site.domaine + u("/contact/"), name: "Contact Mandelieu Watersports", about: { "@id": `${site.domaine}/#entreprise` } },
  };
}

// --- FAQ -------------------------------------------------------------------------
export function pageFaq() {
  const questions = toutesQuestions();
  const fil = [accueilL(), { nom: "FAQ", url: u("/faq/") }];
  const corps = `
    ${enTetePage({ h1: t("FAQ jet ski & parachute ascensionnel à Mandelieu", "FAQ: jet ski & parasailing near Cannes"), eyebrow: t("Questions fréquentes", "Frequently asked questions"), lead: t("Découvrez les réponses aux questions les plus fréquentes chez Mandelieu Watersports.", "Answers to the most frequently asked questions at Mandelieu Watersports."), fil })}
    <section class="section section--tight" aria-label="${t("Questions fréquentes", "Frequently asked questions")}">
      <div style="max-width:920px;margin:0 auto">${faq(questions, 2)}</div>
    </section>
    ${duoConfiance()}
    ${blocContact()}`;
  return {
    url: u("/faq/"),
    title: t("FAQ Jet Ski & Parachute Ascensionnel Mandelieu – Cannes", "FAQ Jet Ski & Parasailing near Cannes – Mandelieu"),
    description: t("Âge, permis, tarifs, météo, documents : toutes les réponses sur le jet ski et le parachute ascensionnel à Mandelieu, près de Cannes et Théoule-sur-Mer.", "Age, licence, prices, weather, documents: all the answers about jet ski and parasailing in Mandelieu, near Cannes and Théoule-sur-Mer."),
    fil,
    corps,
    schema: schemaFaq(questions),
  };
}

// --- Pages légales (textes repris de l'ancien site) ---------------------------------
function markdown(md) {
  const lignes = md.split("\n").map((l) => l.trim()).filter(Boolean);
  const out = [];
  let liste = false;
  const lien = (t) => esc(t)
    .replace(/(https?:\/\/[^\s,)]+)/g, '<a href="$1" rel="noopener">$1</a>')
    .replace(/([\w.+-]+@[\w-]+\.[\w.]+)/g, '<a href="mailto:$1">$1</a>');
  for (const l of lignes) {
    const estListe = l.startsWith("- ");
    if (liste && !estListe) { out.push("</ul>"); liste = false; }
    if (l.startsWith("#")) {
      const n = Math.min(3, l.match(/^#+/)[0].length);
      out.push(`<h${n}>${lien(l.replace(/^#+\s*/, ""))}</h${n}>`);
    } else if (estListe) {
      if (!liste) { out.push("<ul>"); liste = true; }
      out.push(`<li>${lien(l.slice(2))}</li>`);
    } else if (/^[A-ZÀ-ÖØ-Ý0-9 ’'&-]{8,}$/.test(l)) {
      out.push(`<h2>${lien(l.charAt(0) + l.slice(1).toLowerCase())}</h2>`);
    } else {
      out.push(`<p>${lien(l)}</p>`);
    }
  }
  if (liste) out.push("</ul>");
  return out.join("\n");
}

function pageLegale({ fichier, url, h1, title, description, avant = "" }) {
  const fil = [ACCUEIL, { nom: h1, url }];
  const md = readFileSync(join(racine, "content", "legal", fichier), "utf8");
  return {
    url, title, description, fil,
    corps: `
    ${enTetePage({ h1, fil })}
    <section class="section section--tight">
      <div class="prose">${avant}${markdown(md)}</div>
    </section>`,
  };
}

export const cgv = () => pageLegale({
  fichier: "conditions-generales-de-vente.md",
  url: "/conditions-generales-de-vente/",
  h1: "Conditions Générales de Vente",
  title: "Conditions Générales de Vente - Mandelieu WaterSports",
  description: "Conditions générales de vente de Mandelieu Watersports : réservations, tarifs, annulation, paiement et sécurité des activités nautiques.",
});
export const confidentialite = () => pageLegale({
  fichier: "politique-de-confidentialite.md",
  url: "/politique-de-confidentialite/",
  h1: "Politique de confidentialité",
  title: "Politique de confidentialité - Mandelieu WaterSports",
  description: "Politique de confidentialité de Mandelieu Watersports : données collectées, utilisation, sécurité et exercice de vos droits.",
});
export const cookies = () => pageLegale({
  fichier: "politique-de-cookies-ue.md",
  url: "/politique-de-cookies-ue/",
  h1: "Politique de cookies (UE)",
  title: "Politique de cookies (UE) - Mandelieu WaterSports",
  description: "Politique de cookies de Mandelieu Watersports : cookies utilisés, consentement et gestion de vos préférences.",
  avant: `<p><button type="button" class="btn btn--ghost" data-consent-open>Gérer mes préférences cookies</button></p>`,
});

// --- Formulaire d'autorisation mineur -------------------------------------------------
export function attestation() {
  const url = "/formulaire-attestation-dautorisation-mineure/";
  const fil = [ACCUEIL, { nom: "Formulaire autorisation mineur", url }];
  const aptitudes = [
    "Acuité visuelle satisfaisante, les verres correcteurs ou lentilles cornéennes sont admis.",
    "Acuité auditive satisfaisante, prothèses auditives tolérées.",
    "État neuropsychiatrique et vasculaire satisfaisant.",
    "Membres supérieurs : la fonction de préhension nécessaire à la conduite doit être satisfaisante.",
    "Membres inférieurs : intégrité des deux membres, ou intégrité de l’un des membres et appareillage mécanique satisfaisant de l’autre.",
  ];
  const obligations = [
    "Le participant déclare avoir pris connaissance des conditions d’aptitude physique minimales ci-dessus.",
    "Le participant s’engage à respecter les consignes données par le moniteur.",
    "Le port du gilet de sauvetage est obligatoire pendant toute la durée de l’activité.",
    "Le participant déclare ne pas être sous l’emprise d’alcool, de médicament(s) ou de produit(s) illicite(s).",
    "Le non-respect des consignes du moniteur entraîne l’entière responsabilité du participant ; la prestation pourra être arrêtée sans possibilité de remboursement.",
    "Le participant déclare ne pas avoir de contre-indication à la pratique des activités nautiques.",
    "Le participant déclare ne pas avoir subi d’opération chirurgicale dans les 3 derniers mois.",
    "Le participant déclare ne pas être enceinte.",
  ];
  const corps = `
    ${enTetePage({ h1: "Formulaire d’autorisation parentale pour mineur", eyebrow: "Jet ski", fil })}
    <section class="section section--tight">
      <div class="prose">
        <h2>Chers parents,</h2>
        <p>Pour permettre à votre enfant de participer à l’activité de jet ski, il est impératif de remplir ce formulaire d’autorisation parentale. Cette démarche est essentielle pour garantir la sécurité et le bien-être de tous les participants, et pour respecter la réglementation en vigueur. Nous vous remercions de votre compréhension et de votre collaboration.</p>
        <p><strong>Important :</strong> cette autorisation est à nous remettre complétée et signée, avec la pièce d’identité du père ou de la mère et la pièce d’identité du mineur.</p>
        <h2>Conditions d’aptitude physique minimales requises du mineur</h2>
        <ul>${aptitudes.map((a) => `<li>${a}</li>`).join("")}</ul>
        <h2>Obligations du mineur</h2>
        <ul>${obligations.map((a) => `<li>${a}</li>`).join("")}</ul>

        <form class="form" id="attestation" novalidate>
          <fieldset>
            <legend>Responsable légal</legend>
            <div class="row">
              <div class="field"><label for="parent">Nom et prénom du parent</label><input id="parent" name="parent" autocomplete="name" required></div>
              <div class="field"><label for="tel">Téléphone</label><input id="tel" name="tel" type="tel" autocomplete="tel" required></div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Mineur(s) concerné(s)</legend>
            <div class="row">
              <div class="field"><label for="enfant1">Nom et prénom du premier enfant</label><input id="enfant1" name="enfant1" required></div>
              <div class="field"><label for="naissance1">Date de naissance</label><input id="naissance1" name="naissance1" type="date" required></div>
            </div>
            <div class="row">
              <div class="field"><label for="enfant2">Nom et prénom du deuxième enfant (facultatif)</label><input id="enfant2" name="enfant2"></div>
              <div class="field"><label for="naissance2">Date de naissance</label><input id="naissance2" name="naissance2" type="date"></div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Activité</legend>
            <div class="row">
              <div class="field"><label for="date">Date de l’activité</label><input id="date" name="date" type="date" required></div>
              <div class="field"><label for="activite">Activité</label>
                <select id="activite" name="activite"><option>Location jet ski</option><option>Randonnée jet ski</option></select></div>
            </div>
          </fieldset>
          <label class="check"><input type="checkbox" name="accord" required> J’autorise mon enfant à participer à l’activité de jet ski et je certifie qu’il remplit les conditions d’aptitude et s’engage à respecter les obligations ci-dessus.</label>
          <div class="field">
            <label for="signature">Signature du parent</label>
            <canvas class="sig" id="signature" width="800" height="240" role="img" aria-label="Zone de signature : signez avec le doigt ou la souris"></canvas>
            <div class="sig-tools no-print"><span>Signez avec le doigt ou la souris.</span><button type="button" data-sig-clear>Effacer</button></div>
          </div>
          <p>Fait le <span data-today></span>.</p>
          <div class="form-actions no-print">
            <button type="submit" class="btn btn--primary">Imprimer ou enregistrer en PDF ${ico.fleche}</button>
            <a class="btn btn--ghost" href="mailto:${site.email}?subject=Autorisation%20parentale%20mineur">Envoyer par mail</a>
          </div>
          <p class="note no-print">Aucune donnée n’est envoyée depuis cette page : imprimez ou enregistrez le document en PDF, puis apportez-le à la base nautique ou envoyez-le par mail à ${site.email} avec les pièces d’identité.</p>
        </form>
        <p style="margin-top:28px"><small>Identité du loueur : MANDELIEU WATERSPORTS – RCS ${site.societe.siren} – Tél. ${site.telephoneAffiche} – ${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}.</small></p>
      </div>
    </section>`;
  return {
    url,
    title: "Autorisation parentale jet ski mineur | Mandelieu",
    description: "Formulaire d'autorisation parentale pour la pratique du jet ski par un mineur chez Mandelieu Watersports : conditions, obligations et signature.",
    fil,
    corps,
  };
}

// --- 404 ------------------------------------------------------------------------------
export function page404() {
  return {
    url: "/404.html",
    title: "Page introuvable - Mandelieu WaterSports",
    description: "Cette page n'existe pas ou a été déplacée.",
    noindex: true,
    corps: `
    <section class="notfound">
      <div>
        <p class="eyebrow">Erreur 404</p>
        <h1 class="h2">Cette vague n’existe pas…</h1>
        <p class="lead" style="margin:0 auto 24px">La page que vous cherchez a été déplacée ou n’existe plus.</p>
        <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
          ${btn("/", "Retour à l’accueil")}
          <a class="btn btn--ghost" href="/nos-tarifs/">Voir nos tarifs</a>
        </div>
      </div>
    </section>`,
  };
}
