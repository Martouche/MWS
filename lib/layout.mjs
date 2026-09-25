// Gabarit commun : <head>, en-tête pilule, tiroir mobile, pied de page, JSON-LD.
import { site, activitesMenu, evenementsMenu } from "../content/site.mjs";
import { esc, ico, logo, pic, urlImage } from "./html.mjs";

/** Noms des fichiers CSS/JS (avec empreinte) : renseignés par build.mjs. */
export const assets = { js: "/app.js", css: "" };

const abs = (u) => (u.startsWith("http") ? u : site.domaine + u);

// --- Données structurées --------------------------------------------------
export const idEntreprise = `${site.domaine}/#entreprise`;

export function schemaEntreprise() {
  return {
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    "@id": idEntreprise,
    name: site.nom,
    url: site.domaine + "/",
    telephone: site.telephone,
    email: site.email,
    image: abs(urlImage("parachute-ascensionnel-mandelieu", 1600, "webp")),
    logo: abs("/assets/images/logo.png"),
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
    areaServed: site.villes.map((v) => ({ "@type": "City", name: v })),
    knowsLanguage: ["fr", "en", "de", "it", "ru"],
    hasMap: site.googleMaps,
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
      inLanguage: "fr-FR",
      publisher: { "@id": idEntreprise },
    },
    schemaEntreprise(),
    {
      "@type": "WebPage",
      "@id": abs(page.url) + "#page",
      url: abs(page.url),
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${site.domaine}/#site` },
      about: { "@id": idEntreprise },
      inLanguage: "fr-FR",
      ...(page.image ? { primaryImageOfPage: abs(urlImage(page.image, 1600)) } : {}),
    },
  ];
  if (page.fil && page.fil.length > 1) graphe.push(schemaFilAriane(page.fil));
  if (page.schema) graphe.push(...[].concat(page.schema));
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graphe }).replace(/</g, "\\u003c")}</script>`;
}

// --- En-tête ------------------------------------------------------------------
const estActif = (href, url) => (href === url ? ' aria-current="page"' : "");

function entete(url) {
  const dd = activitesMenu
    .map((a) => `<li><a href="${a.href}"${estActif(a.href, url)}><img src="${urlImage(a.img, 160)}" width="52" height="40" loading="lazy" decoding="async" alt=""><span>${a.label}<small>${a.sous}</small></span></a></li>`)
    .join("\n          ");
  return `<header class="header" id="header">
    <a href="/" class="logo" aria-label="Mandelieu Watersports – accueil">
      ${logo("logo", 40, { priorite: true })}
    </a>
    <nav class="nav" aria-label="Navigation principale">
      <ul class="nav__list">
        <li class="dropdown">
          <button class="nav__link" type="button" aria-expanded="false" aria-controls="dd-activites" data-dropdown>
            Nos Activités
            ${ico.chev}
          </button>
          <ul class="dropdown__panel" id="dd-activites">
          ${dd}
          </ul>
        </li>
        <li><a class="nav__link" href="/nos-packs/"${estActif("/nos-packs/", url)}>Nos Packs</a></li>
        <li><a class="nav__link" href="/nos-tarifs/"${estActif("/nos-tarifs/", url)}>Nos Tarifs</a></li>
        <li><a class="nav__link" href="/evenement-evg-evgf-mandelieu-cannes/"${estActif("/evenement-evg-evgf-mandelieu-cannes/", url)}>Evènements Privés</a></li>
        <li><a class="nav__link" href="/contact/"${estActif("/contact/", url)}>Où Nous Trouver ?</a></li>
      </ul>
    </nav>
    <a href="tel:${site.telephone}" class="btn btn--primary header__cta" aria-label="Réserver par téléphone au ${site.telephoneAffiche}">Réserver
      ${ico.fleche}
    </a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Ouvrir le menu">
      <span></span><span></span><span></span>
    </button>
  </header>

  <div class="drawer" id="drawer" aria-hidden="true">
    <div class="drawer__backdrop" data-close></div>
    <nav class="drawer__panel" aria-label="Menu">
      <ul>
        <li><a href="/">Accueil</a></li>
        <li>
          <button class="drawer__acc" type="button" aria-expanded="false" aria-controls="drawer-sub-1">Nos Activités
            ${ico.chev}
          </button>
          <div class="drawer__sub" id="drawer-sub-1">
            <ul>
              ${activitesMenu.map((a) => `<li><a href="${a.href}">${a.label}</a></li>`).join("\n              ")}
            </ul>
          </div>
        </li>
        <li><a href="/nos-packs/">Nos Packs</a></li>
        <li><a href="/nos-tarifs/">Nos Tarifs</a></li>
        <li>
          <button class="drawer__acc" type="button" aria-expanded="false" aria-controls="drawer-sub-2">Evènements Privés
            ${ico.chev}
          </button>
          <div class="drawer__sub" id="drawer-sub-2">
            <ul>
              ${evenementsMenu.map((a) => `<li><a href="${a.href}">${a.label}</a></li>`).join("\n              ")}
            </ul>
          </div>
        </li>
        <li><a href="/contact/">Où Nous Trouver ?</a></li>
        <li><a href="/faq/">FAQ</a></li>
        <li><a href="${site.carteCadeau}" rel="noopener">Carte cadeau</a></li>
      </ul>
      <a href="tel:${site.telephone}" class="btn btn--primary">Réserver · ${site.telephoneAffiche}
        ${ico.fleche}
      </a>
      <p class="drawer__note">${site.horaires} · Port de la Rague, Mandelieu</p>
    </nav>
  </div>`;
}

// --- Pied de page ----------------------------------------------------------
function pied() {
  return `<footer class="footer">
    <div class="footer__grid">
      <div>
        <a href="/" class="logo" aria-label="Mandelieu Watersports – accueil">
          ${logo("logo-blanc", 50)}
        </a>
        <h3 style="margin-top:28px">Nos Partenaires</h3>
        <a class="partner" href="${site.partenaire.url}" rel="noopener" target="_blank" aria-label="${site.partenaire.nom} (nouvelle fenêtre)">
          ${logo("adrenactive", 40, { alt: site.partenaire.nom })}
        </a>
      </div>
      <nav aria-label="Nos activités">
        <h3>Nos Activités</h3>
        <ul>
          <li><a href="/parachute-ascensionnel/">Parachute Ascensionnel</a></li>
          <li><a href="/randonnee-jet-ski/">Randonnée Jet Ski</a></li>
          <li><a href="/location-jet-ski/">Location Jet Ski</a></li>
          <li><a href="/bouee-tractee/">Bouée tractée</a></li>
          <li><a href="/wakeboard/">Wakeboard</a></li>
          <li><a href="/ski-nautique/">Ski nautique</a></li>
          <li><a href="/nos-packs/">Nos packs</a></li>
        </ul>
      </nav>
      <nav aria-label="Nos services">
        <h3>Nos Services</h3>
        <ul>
          <li><a href="/privatisation-parachute-ascensionnel/">Privatisation</a></li>
          <li><a href="/nos-tarifs/">Tarifs</a></li>
          <li><a href="/evenement-evg-evgf-mandelieu-cannes/">Evènements Privés</a></li>
          <li><a href="/faq/">FAQ</a></li>
          <li><a href="/contact/">Contact</a></li>
          <li><a href="/formulaire-attestation-dautorisation-mineure/">Formulaire autorisation mineur</a></li>
          <li><a href="${site.carteCadeau}" rel="noopener">Carte cadeau</a></li>
        </ul>
      </nav>
      <div>
        <h3>Contact</h3>
        <address>
          <span>Port de la Rague<br>${site.adresse.ville}, ${site.adresse.codePostal}</span>
          <span>Téléphone : <a href="tel:${site.telephone}">+33 ${site.telephoneAffiche}</a></span>
          <span>Mail : <a href="mailto:${site.email}">${site.email}</a></span>
          <span>${site.horairesCourt}</span>
        </address>
      </div>
    </div>
    <div class="footer__copy">
      <span>© <span data-year>${new Date().getFullYear()}</span> MANDELIEU WATERSPORTS // Tous nos droits sont réservés.</span>
      <span class="footer__legal">
        <a href="/conditions-generales-de-vente/">CGV</a> ·
        <a href="/politique-de-confidentialite/">Confidentialité</a> ·
        <a href="/politique-de-cookies-ue/">Cookies</a> ·
        <button type="button" class="linkbtn" data-consent-open>Gérer les cookies</button>
      </span>
      <a href="#contenu">Aller en haut ↑</a>
    </div>
  </footer>`;
}

function bandeauCookies() {
  return `<div class="consent" id="consent" role="region" aria-label="Cookies" hidden>
    <p>Nous utilisons des cookies de mesure d’audience pour améliorer le site. Ils ne sont déposés qu’avec votre accord. <a href="/politique-de-cookies-ue/">En savoir plus</a></p>
    <div class="consent__btns">
      <button type="button" class="btn btn--ghost" data-consent="non">Refuser</button>
      <button type="button" class="btn btn--primary" data-consent="oui">Accepter</button>
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
  const robots = page.noindex || test ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const cta = page.mcta || { href: `tel:${site.telephone}`, label: "Réserver" };
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${url}">
  <meta name="google-site-verification" content="${site.googleVerification}">
  <meta name="theme-color" content="#f5f8fd">
  <meta property="og:locale" content="fr_FR">
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
  <a class="skip" href="#contenu">Aller au contenu</a>
  ${entete(page.url)}
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
