// Gabarit commun : <head>, en-tête pilule, tiroir mobile, pied de page, JSON-LD.
import { site, activitesMenu, evenementsMenu } from "../content/site.mjs";
import { categories, categorie, tousProduits } from "../content/produits.mjs";
import { activitesMenuEn } from "../content/en.mjs";
import { t, u, estEn, urlEn, urlFr } from "./langue.mjs";
import { esc, ico, logo, pic, urlImage } from "./html.mjs";
import { icone } from "./icones.mjs";

/** Page de réservation en ligne (cible par défaut des boutons « Réserver »). */
export const URL_RESERVATION = "/reservation/";
const urlResa = () => u(URL_RESERVATION);
/** Menu des activités dans la langue de rendu. */
const menuActivites = () => activitesMenu.map((a, i) => (estEn() ? { ...a, ...activitesMenuEn[i], href: u(a.href) } : a));
/** Numéro au format international pour la version anglaise. */
const telAffiche = () => t(site.telephoneAffiche, "+33 " + site.telephoneAffiche.slice(1));
const appel = () => icone("telephone", "ico ico--tel");

/** Noms des fichiers CSS/JS (avec empreinte) : renseignés par build.mjs. */
export const assets = { js: "/app.js", css: "" };

const abs = (u) => (u.startsWith("http") ? u : site.domaine + u);

// --- Données structurées --------------------------------------------------
export const idEntreprise = `${site.domaine}/#entreprise`;

/** Catalogue d'offres par activité, avec les tarifs de content/produits.mjs. */
function catalogue() {
  return {
    "@type": "OfferCatalog",
    name: t("Activités nautiques à Mandelieu-la-Napoule", "Water sports in Mandelieu-la-Napoule"),
    itemListElement: Object.keys(categories).map((cle) => ({
      "@type": "OfferCatalog",
      name: categorie(cle).nom,
      itemListElement: tousProduits().filter((p) => p.categorie === cle).map((p) => ({
        "@type": "Offer",
        name: p.nom,
        url: site.domaine + u(`/produit/${p.slug}/`),
        price: p.prix,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        itemOffered: { "@type": "Service", name: p.nom, serviceType: categorie(cle).nom },
      })),
    })),
  };
}

export function schemaEntreprise({ avecCatalogue = false } = {}) {
  return {
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    "@id": idEntreprise,
    name: site.nom,
    alternateName: "MWS",
    description: t("Base nautique de Mandelieu-la-Napoule (plage de la Rague), à 5 min de Théoule-sur-Mer et 15 min de Cannes : jet ski sans permis, randonnées jet ski, parachute ascensionnel, bouée tractée, wakeboard, wakesurf et ski nautique.", "Water sports centre in Mandelieu-la-Napoule (La Rague beach), 5 min from Théoule-sur-Mer and 15 min from Cannes: jet ski rental with no licence, jet ski tours, parasailing, tube rides, wakeboarding, wakesurfing and water skiing."),
    url: site.domaine + "/",
    telephone: site.telephone,
    email: site.email,
    image: abs(urlImage("parachute-ascensionnel-mandelieu", 1600, "webp")),
    logo: abs("/assets/images/logo-horizontal.png"),
    priceRange: "20 € – 299 €",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.adresse.rue,
      addressLocality: site.adresse.ville,
      postalCode: site.adresse.codePostal,
      addressRegion: site.adresse.region,
      addressCountry: site.adresse.pays,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lon },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.ouverture.jours,
      opens: site.ouverture.de,
      closes: site.ouverture.a,
    }],
    areaServed: [
      ...site.villes.map((v) => ({ "@type": "City", name: v })),
      { "@type": "Place", name: "Golfe de la Napoule" },
      { "@type": "Place", name: "Baie de Cannes" },
      { "@type": "Place", name: "Îles de Lérins" },
      { "@type": "Place", name: "Massif de l'Esterel" },
    ],
    knowsLanguage: ["fr", "en", "de", "it", "ru"],
    hasMap: site.googleMaps,
    ...(avecCatalogue ? { hasOfferCatalog: catalogue() } : {}),
  };
}

function schemaFilAriane(fil) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: fil.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: f.nom,
      item: abs(f.url),
    })),
  };
}

function jsonLd(page) {
  const graphe = [
    {
      "@type": "WebSite",
      "@id": `${site.domaine}/#site`,
      url: site.domaine + "/",
      name: site.nomCourt,
      inLanguage: ["fr-FR", "en-GB"],
      publisher: { "@id": idEntreprise },
    },
    schemaEntreprise({ avecCatalogue: page.url === "/" }),
    {
      "@type": "WebPage",
      "@id": abs(page.url) + "#page",
      url: abs(page.url),
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${site.domaine}/#site` },
      about: { "@id": idEntreprise },
      inLanguage: t("fr-FR", "en-GB"),
      ...(page.image ? { primaryImageOfPage: abs(urlImage(page.image, 1600)) } : {}),
    },
  ];
  if (page.fil && page.fil.length > 1) graphe.push(schemaFilAriane(page.fil));
  if (page.schema) graphe.push(...[].concat(page.schema));
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graphe }).replace(/</g, "\\u003c")}</script>`;
}

// --- En-tête ------------------------------------------------------------------
const estActif = (href, url) => (href === url ? ' aria-current="page"' : "");

function entete(url, resa, autreLangue) {
  const dd = menuActivites()
    .map((a) => `<li><a href="${a.href}"${estActif(a.href, url)}><img src="${urlImage(a.img, 160)}" width="52" height="40" loading="lazy" decoding="async" alt=""><span>${a.label}<small>${a.sous}</small></span></a></li>`)
    .join("\n          ");
  return `<header class="header" id="header">
    <a href="${u("/")}" class="logo" aria-label="${t("Mandelieu Watersports – accueil", "Mandelieu Watersports – home")}">
      ${logo("logo-horizontal", 31)}
    </a>
    <nav class="nav" aria-label="${t("Navigation principale", "Main navigation")}">
      <ul class="nav__list">
        <li class="dropdown">
          <button class="nav__link" type="button" aria-expanded="false" aria-controls="dd-activites" data-dropdown>
            ${t("Nos Activités", "Activities")}
            ${ico.chev}
          </button>
          <ul class="dropdown__panel" id="dd-activites">
          ${dd}
          </ul>
        </li>
        <li><a class="nav__link" href="${u("/nos-packs/")}"${estActif(u("/nos-packs/"), url)}>${t("Nos Packs", "Packages")}</a></li>
        <li><a class="nav__link" href="${u("/nos-tarifs/")}"${estActif(u("/nos-tarifs/"), url)}>${t("Nos Tarifs", "Prices")}</a></li>
        ${estEn() ? `<li><a class="nav__link" href="${u("/randonnee-jet-ski-iles-de-lerins/")}"${estActif(u("/randonnee-jet-ski-iles-de-lerins/"), url)}>Lérins Islands</a></li>` : `<li><a class="nav__link" href="/evenement-evg-evgf-mandelieu-cannes/"${estActif("/evenement-evg-evgf-mandelieu-cannes/", url)}>Evènements Privés</a></li>`}
        <li><a class="nav__link" href="${u("/contact/")}"${estActif(u("/contact/"), url)}>${t("Où Nous Trouver ?", "Find Us")}</a></li>
      </ul>
    </nav>
    <a class="lang" href="${autreLangue.href}" hreflang="${autreLangue.code}" lang="${autreLangue.code}">${autreLangue.code.toUpperCase()}<span class="sr-only"> – ${autreLangue.label}</span></a>
    <a href="tel:${site.telephone}" class="btn btn--ghost header__call" aria-label="${t("Appel direct au", "Call us on")} ${telAffiche()}">${appel()}<span>${t("Appel direct", "Call us")}</span></a>
    <a href="${resa}" class="btn btn--primary header__cta">${t("Réserver", "Book")}
      ${ico.fleche}
    </a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${t("Ouvrir le menu", "Open the menu")}">
      <span></span><span></span><span></span>
    </button>
  </header>

  <div class="drawer" id="drawer" aria-hidden="true">
    <div class="drawer__backdrop" data-close></div>
    <nav class="drawer__panel" aria-label="Menu">
      <ul>
        <li><a href="${u("/")}">${t("Accueil", "Home")}</a></li>
        <li>
          <button class="drawer__acc" type="button" aria-expanded="false" aria-controls="drawer-sub-1">${t("Nos Activités", "Activities")}
            ${ico.chev}
          </button>
          <div class="drawer__sub" id="drawer-sub-1">
            <ul>
              ${menuActivites().map((a) => `<li><a href="${a.href}">${a.label}</a></li>`).join("\n              ")}
            </ul>
          </div>
        </li>
        <li><a href="${u("/nos-packs/")}">${t("Nos Packs", "Packages")}</a></li>
        <li><a href="${u("/nos-tarifs/")}">${t("Nos Tarifs", "Prices")}</a></li>
        ${estEn() ? `<li><a href="${u("/randonnee-jet-ski-iles-de-lerins/")}">Lérins Islands by jet ski</a></li>` : ""}
        <li>
          <button class="drawer__acc" type="button" aria-expanded="false" aria-controls="drawer-sub-2">${t("Evènements Privés", "Private events")}
            ${ico.chev}
          </button>
          <div class="drawer__sub" id="drawer-sub-2">
            <ul>
              ${evenementsMenu.map((a) => `<li><a href="${a.href}">${a.label}</a></li>`).join("\n              ")}
            </ul>
          </div>
        </li>
        <li><a href="${u("/contact/")}">${t("Où Nous Trouver ?", "Find Us")}</a></li>
        <li><a href="${u("/faq/")}">FAQ</a></li>
        <li><a href="${u("/guides/")}">${t("Guides jet ski", "Jet ski guides")}</a></li>
        <li><a href="${site.carteCadeau}" rel="noopener">${t("Carte cadeau", "Gift card")}</a></li>
        <li><a href="${autreLangue.href}" hreflang="${autreLangue.code}" lang="${autreLangue.code}">${autreLangue.label}</a></li>
      </ul>
      <a href="${urlResa()}" class="btn btn--primary">${t("Réserver en ligne", "Book online")}
        ${ico.fleche}
      </a>
      <a href="tel:${site.telephone}" class="btn btn--ghost drawer__call">${appel()} ${t("Appel direct", "Call us")} · ${telAffiche()}</a>
      <p class="drawer__note">${t(site.horaires, "Monday – Sunday | 8 am – 8 pm")} · ${site.adresse.rue}, Mandelieu</p>
    </nav>
  </div>`;
}

// --- Pied de page ----------------------------------------------------------
function pied() {
  return `<footer class="footer">
    <div class="footer__grid">
      <div>
        <a href="${u("/")}" class="logo" aria-label="${t("Mandelieu Watersports – accueil", "Mandelieu Watersports – home")}">
          ${logo("logo-horizontal-blanc", 40)}
        </a>
        <h3 style="margin-top:28px">${t("Nos Partenaires", "Our partners")}</h3>
        <a class="partner" href="${site.partenaire.url}" rel="noopener" target="_blank" aria-label="${site.partenaire.nom} (${t("nouvelle fenêtre", "new window")})">
          ${logo("adrenactive", 40, { alt: site.partenaire.nom })}
        </a>
      </div>
      <nav aria-label="${t("Nos activités", "Our activities")}">
        <h3>${t("Nos Activités", "Activities")}</h3>
        <ul>
          <li><a href="${u("/parachute-ascensionnel/")}">${t("Parachute Ascensionnel", "Parasailing")}</a></li>
          <li><a href="${u("/randonnee-jet-ski/")}">${t("Randonnée Jet Ski", "Jet Ski Tours")}</a></li>
          <li><a href="${u("/location-jet-ski/")}">${t("Location Jet Ski", "Jet Ski Rental")}</a></li>
          <li><a href="${u("/bouee-tractee/")}">${t("Bouée tractée", "Tube rides")}</a></li>
          <li><a href="${u("/wakeboard/")}">Wakeboard</a></li>
          <li><a href="${u("/ski-nautique/")}">${t("Ski nautique", "Water skiing")}</a></li>
          <li><a href="${u("/nos-packs/")}">${t("Nos packs", "Packages")}</a></li>
          ${estEn() ? `<li><a href="${u("/randonnee-jet-ski-iles-de-lerins/")}">Lérins Islands by jet ski</a></li>` : ""}
        </ul>
      </nav>
      <nav aria-label="${t("Nos services", "Services")}">
        <h3>${t("Nos Services", "Services")}</h3>
        <ul>
          <li><a href="/privatisation-parachute-ascensionnel/"${estEn() ? ' hreflang="fr"' : ""}>${t("Privatisation", "Private boat hire (FR)")}</a></li>
          <li><a href="${u("/nos-tarifs/")}">${t("Tarifs", "Prices")}</a></li>
          <li><a href="/evenement-evg-evgf-mandelieu-cannes/"${estEn() ? ' hreflang="fr"' : ""}>${t("Evènements Privés", "Private events (FR)")}</a></li>
          <li><a href="${u("/faq/")}">FAQ</a></li>
          <li><a href="${u("/guides/")}">${t("Guides jet ski", "Jet ski guides")}</a></li>
          <li><a href="${u("/contact/")}">Contact</a></li>
          <li><a href="/formulaire-attestation-dautorisation-mineure/"${estEn() ? ' hreflang="fr"' : ""}>${t("Formulaire autorisation mineur", "Parental consent form (FR)")}</a></li>
          <li><a href="${site.carteCadeau}" rel="noopener">${t("Carte cadeau", "Gift card")}</a></li>
        </ul>
      </nav>
      <div>
        <h3>Contact</h3>
        <address>
          <span>${site.adresse.rue}<br>${site.adresse.codePostal} ${site.adresse.ville}${estEn() ? ", France" : ""}</span>
          <span>${t("Téléphone", "Phone")} : <a href="tel:${site.telephone}">+33 ${site.telephoneAffiche.slice(1)}</a></span>
          <span>${t("Mail", "Email")} : <a href="mailto:${site.email}">${site.email}</a></span>
          <span>${t(site.horairesCourt, "Monday – Sunday: 8 am – 8 pm")}</span>
        </address>
      </div>
    </div>
    <div class="footer__copy">
      <span>© <span data-year>${new Date().getFullYear()}</span> MANDELIEU WATERSPORTS // ${t("Tous nos droits sont réservés.", "All rights reserved.")}</span>
      <span class="footer__legal">
        <a href="/conditions-generales-de-vente/">${t("CGV", "Terms of sale (FR)")}</a> ·
        <a href="/politique-de-confidentialite/">${t("Confidentialité", "Privacy (FR)")}</a> ·
        <a href="/politique-de-cookies-ue/">Cookies</a> ·
        <button type="button" class="linkbtn" data-consent-open>${t("Gérer les cookies", "Manage cookies")}</button>
      </span>
      <a href="#contenu">${t("Aller en haut ↑", "Back to top ↑")}</a>
    </div>
  </footer>`;
}

function bandeauCookies() {
  return `<div class="consent" id="consent" role="region" aria-label="Cookies" hidden>
    <p>${t("Nous utilisons des cookies de mesure d’audience pour améliorer le site. Ils ne sont déposés qu’avec votre accord.", "We use audience measurement cookies to improve the site. They are only set with your consent.")} <a href="/politique-de-cookies-ue/">${t("En savoir plus", "Read our cookie policy")}</a></p>
    <div class="consent__btns">
      <button type="button" class="btn btn--ghost" data-consent="non">${t("Refuser", "Decline")}</button>
      <button type="button" class="btn btn--primary" data-consent="oui">${t("Accepter", "Accept")}</button>
    </div>
  </div>`;
}

/**
 * Page complète.
 * @param {{url:string,title:string,description:string,corps:string,fil?:Array,
 *   image?:string, schema?:object|object[], noindex?:boolean, scripts?:string,
 *   mcta?:{href:string,label:string}}} page
 */
/**
 * Rendu différé (classe .cv → content-visibility:auto) des sections hors écran.
 * Exclues : la première section (au-dessus de la ligne de flottaison) et celles
 * qui contiennent des listes .ticks (l'audit de contraste les lit mal).
 */
function renduDiffere(corps) {
  const morceaux = corps.split(/(?=<section\b)/);
  return morceaux.map((m, i) => {
    if (i < 2 || !m.startsWith("<section") || m.includes("ticks")) return m;
    return /^<section class="/.test(m) ? m.replace(/^<section class="/, '<section class="cv ') : m.replace(/^<section/, '<section class="cv"');
  }).join("");
}

export function layout(page, { css, test = false }) {
  const url = abs(page.url);
  const ogImage = abs(urlImage(page.image || "parachute-ascensionnel-mandelieu", 1600, "webp"));
  const robots = test ? "noindex, nofollow" : page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const cta = page.mcta || { href: urlResa(), label: t("Réserver", "Book") };
  // Versions linguistiques : hreflang + lien du sélecteur de langue.
  const fr = estEn() ? urlFr(page.url) : page.url;
  const en = fr ? urlEn(fr) : undefined;
  const versions = fr && en && !page.noindex ? [["fr", fr], ["en", en], ["x-default", fr]] : [];
  const autreLangue = estEn()
    ? { code: "fr", href: fr || "/", label: "Version française" }
    : { code: "en", href: en || "/en/", label: "English version" };
  return `<!doctype html>
<html lang="${t("fr", "en")}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${url}">
  ${versions.map(([l, h]) => `<link rel="alternate" hreflang="${l}" href="${abs(h)}">`).join("\n  ")}
  <meta name="google-site-verification" content="${site.googleVerification}">
  <meta name="theme-color" content="#f5f8fd">
  <meta property="og:locale" content="${t("fr_FR", "en_GB")}">
  <meta property="og:type" content="${page.ogType || "website"}">
  <meta property="og:site_name" content="${site.nomCourt}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192">
  <link rel="apple-touch-icon" href="/favicon-180.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/polices/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
  <style>${css}</style>
  ${jsonLd(page)}
</head>
<body>
  <a class="skip" href="#contenu">${t("Aller au contenu", "Skip to content")}</a>
  ${entete(page.url, page.reservation || urlResa(), autreLangue)}
  <main id="contenu">
${renduDiffere(page.corps)}
  </main>
  ${pied()}
  <a class="btn btn--primary mcta" href="${cta.href}" data-mcta>${cta.label} ${ico.fleche}</a>
  ${bandeauCookies()}
  <script src="${assets.js}" defer data-gtm="${site.gtm.join(",")}"></script>
  ${page.scripts || ""}
</body>
</html>
`;
}
