// Pages : tarifs, packs, événements, privatisation, contact, FAQ, légal,
// formulaire mineur, 404.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../../content/site.mjs";
import { produits, parCategorie, categories } from "../../content/produits.mjs";
import { questions } from "../../content/faq.mjs";
import { esc, ico, pic, paras, btn, urlImage } from "../html.mjs";
import {
  heroPage, enTetePage, teteSection, grilleProduits, grilleFeats, split, faq, schemaFaq,
  packsDuo, bestSellers, bandeauPacks, duoConfiance, blocContact, schemaOffres,
} from "../composants.mjs";

const racine = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const ACCUEIL = { nom: "Accueil", url: "/" };
const TTC = "Tous nos prix sont toutes taxes comprises, TVA de 20 % incluse.";

// --- Tarifs ------------------------------------------------------------------
const ORDRE_TARIFS = [
  ["parachute", "Parachute ascensionnel", "/parachute-ascensionnel/"],
  ["jetski", "Location jet ski", "/location-jet-ski/"],
  ["randonnee", "Randonnée jet ski", "/randonnee-jet-ski/"],
  ["bouee", "Bouées tractées", "/bouee-tractee/"],
  ["wakeboard", "Wakeboard", "/wakeboard/"],
  ["wakesurf", "Wakesurf", "/wakeboard/"],
  ["ski", "Ski nautique", "/ski-nautique/"],
  ["packs", "Nos packs", "/nos-packs/"],
];

export function tarifs() {
  const fil = [ACCUEIL, { nom: "Nos tarifs", url: "/nos-tarifs/" }];
  const corps = `
    ${heroPage({
      h1: "Nos tarifs : parachute, jet ski et activités nautiques",
      kicker: "Tarifs & réservation",
      tagline: "Parachute · Jet ski · Bouée · Glisse · Packs",
      image: "parachute-deux-bateaux",
      fil,
      faits: [["Parachute", "dès 40 €"], ["Jet ski", "dès 90 €"], ["Bouée", "dès 20 €"]],
      cta: { href: "#categories", label: "Voir toutes les catégories" },
    })}

    <section class="section" aria-labelledby="cat-title">
      ${teteSection({
        eyebrow: "Nos tarifs",
        titre: "Tous nos tarifs, activité par activité",
        id: "cat-title",
        lead: [
          "Voici tous nos tarifs : le parachute ascensionnel, la location et la randonnée jet ski, les bouées tractées, le wakeboard, le wakesurf et le ski nautique. En dehors de nos tarifs classiques, découvrez aussi nos <a href=\"/nos-packs/\">packs</a> !",
          `Pour réserver un créneau sur n’importe quelle activité ou pack, appelez-nous au <a href="tel:${site.telephone}">${site.telephoneAffiche}</a>.`,
        ],
      })}
      <nav class="chips" id="categories" aria-label="Nos catégories">
        ${ORDRE_TARIFS.map(([c, nom]) => `<a href="#${c}">${nom}</a>`).join("\n        ")}
      </nav>
      ${ORDRE_TARIFS.map(([c, nom, page]) => {
        const liste = parCategorie(c);
        return `<div class="cat-block" id="${c}">
        <div class="activities__head" style="margin:clamp(40px,6vw,64px) 0 0">
          <h2 class="h2">${nom}</h2>
          <div><a class="btn btn--ghost" href="${page}">${c === "packs" ? "Tout savoir sur nos packs" : "Découvrir l’activité"} ${ico.fleche}</a></div>
        </div>
        ${grilleProduits(liste, { cls: liste.length === 4 ? "tarifs--4" : "" })}
        ${["wakeboard", "wakesurf", "ski"].includes(c) ? `<p class="note">Forfait 10 tours : 299 €, uniquement sur demande. Le ski nautique et le wakeboard se pratiquent avec un moniteur breveté d’État, le matin de préférence quand les conditions sont propices.</p>` : ""}
      </div>`;
      }).join("\n      ")}
      <p class="note">${TTC}</p>
    </section>

    ${duoConfiance()}
    ${blocContact()}`;
  return {
    url: "/nos-tarifs/",
    title: "Nos Tarifs Parachute, Jetski et activités | Mandelieu WaterSports",
    description: "Découvrez nos tarifs pour le parachute ascensionnel, la location et randonnée Jet Ski et d'autres activités à Mandelieu ! Mandelieu Watersports",
    image: "parachute-deux-bateaux",
    fil,
    corps,
    schema: { "@type": "OfferCatalog", name: "Tarifs Mandelieu Watersports", url: `${site.domaine}/nos-tarifs/`, itemListElement: schemaOffres(produits) },
  };
}

// --- Packs -------------------------------------------------------------------
export function packs() {
  const fil = [ACCUEIL, { nom: "Nos packs", url: "/nos-packs/" }];
  const liste = parCategorie("packs");
  const corps = `
    ${heroPage({
      h1: "Nos packs parachute, jet ski et bouée",
      kicker: "Parachute – Bouée – Jet ski",
      tagline: "Meilleur prix · Pour 2 personnes",
      image: "parachute-bateau-amies",
      fil,
      faits: [["Parachute + bouée", "65 €"], ["Parachute + jet ski", "85 €"], ["Pour", "2 personnes"]],
      cta: { href: "#packs", label: "Choisir mon pack" },
    })}

    <section class="section" id="packs" aria-labelledby="packs-title">
      <p class="eyebrow">Nos packs</p>
      <h2 class="h2" id="packs-title">Choisissez les activités sous forme de packs pour avoir le meilleur prix</h2>
      <p class="lead">Pour réserver un créneau sur n’importe quelle activité ou pack, appelez-nous au <a href="tel:${site.telephone}">${site.telephoneAffiche}</a> ou réservez en ligne.</p>
      ${packsDuo()}
      <p class="note">* Prix par personne, pack prévu pour 2 personnes. ${TTC} <a class="linkbtn" href="/nos-tarifs/">Voir nos autres tarifs sans pack</a></p>
      ${bestSellers({ exclure: liste.map((p) => p.slug) })}
    </section>

    <section class="section section--tight" aria-label="Les activités des packs">
      ${split({ eyebrow: "Dans le pack", titre: "Le parachute ascensionnel", textes: ["Envolez-vous jusqu’à 5 personnes en même temps et admirez un panorama à 360° sur la baie de Cannes – Mandelieu – Théoule. Pas besoin de savoir nager, pas de vertige : décollage et atterrissage sur la plateforme du bateau."], image: "parachute-vol-ciel", lien: { href: "/parachute-ascensionnel/", label: "Découvrir le parachute", variante: "ghost" } })}
      ${split({ eyebrow: "Dans le pack", titre: "La bouée tractée ou le jet ski", textes: ["Complétez votre vol par un tour de bouée tractée, fous rires garantis, ou par 30 minutes de jet ski sans permis encadrées par un moniteur."], image: "bouee-tractee-joie", inverse: true, lien: { href: "/location-jet-ski/", label: "Découvrir le jet ski", variante: "ghost" } })}
    </section>

    ${duoConfiance()}
    ${blocContact()}`;
  return {
    url: "/nos-packs/",
    title: "Nos Packs Parachute & Jet Ski & Bouée - Mandelieu WaterSports",
    description: "Profitez de nos packs pour avoir vos activités encore moins chères ! Le parachute ascensionnel, le jet ski et la bouée tractée à Mandelieu",
    image: "parachute-bateau-amies",
    fil,
    corps,
    schema: { "@type": "OfferCatalog", name: "Packs Mandelieu Watersports", itemListElement: schemaOffres(liste) },
  };
}

// --- Événements ------------------------------------------------------------------
const PARACHUTE_EVENEMENT = [
  ["Pas besoin de savoir nager", "Il n’y a aucun moment dans l’eau."],
  ["Les mains libres", "Pendant la totalité du vol."],
  ["En maillot ou habillé", "Le vol se fait dans la tenue de votre choix."],
  ["Depuis le bateau", "Décollage et atterrissage sur la plateforme du bateau."],
  ["Pas de vertige", "La sensation de vertige n’existe pas : vous n’avez aucun contact direct avec le sol."],
  ["Jusqu’à 5 sous la voile", "Volez ensemble, dans la limite de 240 kg cumulés."],
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
    title: "Evénement EVG, EVGF, Séminaire | Mandelieu Watersports",
    description: "On organise pour vous, l'événement parfait : EVG, EVGF, séminaire. Spécialiste dans l'organisation de jeux nautiques autour de Mandelieu.",
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
      ${split({ ...EVJF, lien: { href: `tel:${site.telephone}`, label: `Réservations : ${site.telephoneAffiche}` } })}
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
    title: "EVJF Mandelieu Cannes | Enterrement vie de jeune fille - Watersports",
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
      ${split({ ...SEMINAIRE, titre: "Organisez vos séminaires ou incentives sur la Côte d’Azur à Mandelieu Théoule", lien: { href: `tel:${site.telephone}`, label: `Réservations : ${site.telephoneAffiche}` } })}
      ${split({ eyebrow: "Idées d’activités", titre: "Des défis qui soudent les équipes", textes: ["Parachute ascensionnel à plusieurs, randonnée en jet ski vers les îles de Lérins, bouée tractée : des idées d’activités spéciales pour vos journées de séminaire, d’étude, colloques ou journées d’affaires.", "Privatisez notre bateau de parachute ascensionnel jusqu’à 10 personnes pour un moment unique."], image: "jet-ski-randonnee-duo", inverse: true, lien: { href: "/privatisation-parachute-ascensionnel/", label: "La privatisation", variante: "ghost" } })}
      <p class="note">${TTC}</p>
    </section>
    ${bandeauPacks()}
    ${blocContact()}`;
  return {
    url: "/evenement-evg-evgf-mandelieu-cannes/seminaires/",
    title: "Séminaire Mandelieu Théoule | Mandelieu Watersports - séminaire",
    description: "On organise pour vous le séminaire parfait ! Spécialiste dans l'organisation de jeux nautiques et de bonne humeur autour de Mandelieu, Théoule.",
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
          <a class="btn btn--primary" href="tel:${site.telephone}">Réserver ${ico.fleche}</a>
        </div></article></li>`).join("")}
        <li><article class="price-card"><div class="price-card__body">
          <p class="kicker">Sur devis</p><h3>Demi-journée ou journée</h3>
          <p class="desc">Consultez-nous pour que nous puissions vous faire un devis.</p>
          <a class="btn btn--primary" href="tel:${site.telephone}">Nous contacter ${ico.fleche}</a>
        </div></article></li>
      </ul>
      <p class="note">${TTC}</p>
    </section>
    ${duoConfiance()}
    ${blocContact()}`;
  return {
    url: "/privatisation-parachute-ascensionnel/",
    title: "Privatisation Parachute Ascensionnel | Théoule Mandelieu Watersports",
    description: "Privatisez le bateau de parachute ascensionnel à Mandelieu, Théoule : jusqu'à 10 personnes, départ de la base nautique ou prise en charge. Devis sur demande.",
    image: "privatisation-bateau",
    fil,
    corps,
    schema: { "@type": "Service", name: "Privatisation bateau parachute ascensionnel", provider: { "@id": `${site.domaine}/#entreprise` }, offers: offres.map((o) => ({ "@type": "Offer", name: o.nom, price: o.prix, priceCurrency: "EUR" })) },
  };
}

// --- Contact --------------------------------------------------------------------
export function contact() {
  const fil = [ACCUEIL, { nom: "Contact", url: "/contact/" }];
  const carte = `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11572.957819602394!2d${site.geo.lon}!3d${site.geo.lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x437f866a0ccdf8a6!2sMandelieu%20Watersports!5e0!3m2!1sfr!2sfr`;
  const corps = `
    ${heroPage({ h1: "Contact : situez notre base nautique", kicker: "Où nous trouver ?", tagline: "Plage de la Rague · Mandelieu-la-Napoule", image: "base-nautique", fil, faits: [["Ouvert", "7j/7"], ["Horaires", "8 h – 20 h"], ["Parking", "gratuit"]], cta: { href: site.googleMaps, label: "Voir l’itinéraire" } })}

    <section class="section" aria-labelledby="infos-title">
      <div class="split">
        <div class="map" data-map="${esc(carte)}">
          ${pic("base-nautique", { sizes: "(min-width:860px) 50vw, 100vw" })}
          <button type="button" class="btn btn--white map__btn" data-map-open>Afficher la carte Google Maps</button>
        </div>
        <div>
          <p class="eyebrow">Informations</p>
          <h2 id="infos-title">Mandelieu Watersports</h2>
          <p><strong>Plage de la Rague, ${site.adresse.codePostal} ${site.adresse.ville}</strong></p>
          <p>Téléphone : <a href="tel:${site.telephone}">${site.telephoneAffiche}</a><br>Mail : <a href="mailto:${site.email}">${site.email}</a></p>
          <p>${site.horaires}</p>
          <p>Contactez-nous par téléphone, par mail, ou réservez directement vos activités sur notre site.</p>
          ${btn(site.googleMaps, "Voir l’itinéraire", "primary", 'rel="noopener" target="_blank"')}
        </div>
      </div>
    </section>

    <section class="booking" aria-labelledby="acces-title">
      <p class="eyebrow">Accès</p>
      <h2 class="h2" id="acces-title">Parking et itinéraire</h2>
      <p class="lead">La plage du Port de la Rague est l’une des plus belles plages de Mandelieu. Située à l’extérieur du centre-ville, en direction de Théoule-sur-Mer, elle est accessible depuis le Port de la Rague (très bien indiqué sur la route, attention l’entrée est dans un virage).</p>
      ${grilleFeats([
        ["Parking payant", "Au port de la Rague, vous trouverez un parking payant."],
        ["Parking gratuit", "Sur la route, garez-vous avant l’entrée du port sur la gauche (avant la descente en venant de La Napoule, indication Beach Hôtel), puis empruntez à pied le pont qui passe au-dessus de la voie ferrée. Le chemin et les escaliers vous mènent à la plage à travers une végétation agréable."],
        ["Sur votre GPS", `Indiquez : PLAGE DE LA RAGUE, ${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}.`],
      ], { cls: "grid-feats--3" })}
      ${grilleFeats([
        ["Depuis l’autoroute", "Prendre la sortie 40 – direction Saint-Raphaël, Théoule-sur-Mer."],
        ["Depuis Cannes, Nice, Mandelieu", "Suivre la direction Saint-Raphaël, Théoule-sur-Mer."],
        ["Depuis Saint-Raphaël par le bord de mer", "Prendre la direction de Cannes par la corniche de l’Esterel."],
      ], { cls: "grid-feats--3" })}
    </section>

    ${duoConfiance()}
    ${blocContact()}`;
  return {
    url: "/contact/",
    title: "Contact, Situez nous base nautique - Mandelieu WaterSports",
    description: "Contactez-nous par téléphone, mail ou réservez directement sur notre site vos activités. Jet ski et parachute Mandelieu Watersports",
    image: "base-nautique",
    fil,
    corps,
    schema: { "@type": "ContactPage", url: `${site.domaine}/contact/`, name: "Contact Mandelieu Watersports", about: { "@id": `${site.domaine}/#entreprise` } },
  };
}

// --- FAQ -------------------------------------------------------------------------
export function pageFaq() {
  const fil = [ACCUEIL, { nom: "FAQ", url: "/faq/" }];
  const corps = `
    ${enTetePage({ h1: "FAQ : vos questions sur le parachute et le jet ski", eyebrow: "Questions fréquentes", lead: "Découvrez les réponses aux questions les plus fréquentes chez Mandelieu Watersports.", fil })}
    <section class="section section--tight" aria-label="Questions fréquentes">
      <div style="max-width:920px;margin:0 auto">${faq(questions, 2)}</div>
    </section>
    ${duoConfiance()}
    ${blocContact()}`;
  return {
    url: "/faq/",
    title: "FAQ vos questions principales parachute jet ski - Mandelieu WaterSports",
    description: "Découvrez les activités nautiques à Cannes Mandelieu, du parachute ascensionnel au jet ski, dans notre FAQ complète. Mandelieu Watersports",
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
        <p style="margin-top:28px"><small>Identité du loueur : MANDELIEU WATERSPORTS – RCS ${site.societe.siren} – Tél. ${site.telephoneAffiche} – Plage de la Rague, 06210 Mandelieu-la-Napoule.</small></p>
      </div>
    </section>`;
  return {
    url,
    title: "Formulaire attestation d'autorisation mineure - Mandelieu WaterSports",
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
