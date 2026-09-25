// Composants partagés, tous dérivés du fichier de style validé
// (index-style2-final_1.html) : mêmes classes, mêmes structures.
import { site } from "../content/site.mjs";
import { produits, produit, categories } from "../content/produits.mjs";
import { avisGoogle } from "../content/avis.mjs";
import { esc, ico, pic, picto, btn, paras, eur, manifeste } from "./html.mjs";

export const urlProduit = (p) => `/produit/${p.slug}/`;
const telLien = `tel:${site.telephone}`;

// --- Fil d'Ariane ------------------------------------------------------------
export function filAriane(fil) {
  return `<nav class="crumbs" aria-label="Fil d’Ariane"><ol>${fil
    .map((f, i) => (i === fil.length - 1 ? `<li><span aria-current="page">${f.nom}</span></li>` : `<li><a href="${f.url}">${f.nom}</a></li>`))
    .join("")}</ol></nav>`;
}

// --- Hero de page (même composition que le hero d'accueil) --------------------
export function heroPage({ h1, kicker, tagline, image, fil, faits, cta }) {
  return `<section class="hero hero--page" aria-labelledby="hero-title">
      <div class="hero__slides">
        <figure class="hero__slide is-active">${pic(image, { priorite: true, sizes: "100vw", largeur: 1024 })}</figure>
      </div>
      <div class="hero__content">
        ${fil ? filAriane(fil) : ""}
        ${kicker ? `<p class="hero__kicker">${kicker}</p>` : ""}
        <h1 class="hero__title" id="hero-title">${h1}</h1>
        ${tagline ? `<p class="hero__tagline">${tagline.split(" · ").join("<span>·</span>")}</p>` : ""}
      </div>
      ${faits ? `<div class="factbar">
        <dl class="facts">${faits.map(([dt, dd]) => `<div><dt>${dt}</dt><dd>${dd}</dd></div>`).join("")}</dl>
        ${btn(cta?.href || "#tarifs", cta?.label || "Voir les tarifs & réserver")}
      </div>` : ""}
      <svg class="hero__wave" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0,40 C180,95 420,110 720,100 C1020,90 1260,60 1440,0 V110 H0 Z"/>
      </svg>
    </section>`;
}

/** En-tête de page simple (pages légales, formulaire). */
export function enTetePage({ h1, eyebrow, lead, fil }) {
  return `<header class="page-head">
      ${fil ? filAriane(fil) : ""}
      ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
      <h1 class="h2">${h1}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
    </header>`;
}

// --- Tête de section (reprend .activities__head) --------------------------------
export function teteSection({ eyebrow, titre, id, lead, action, niveau = 2 }) {
  return `<div class="activities__head">
        <div>
          ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
          <h${niveau} class="h2"${id ? ` id="${id}"` : ""}>${titre}</h${niveau}>
        </div>
        ${lead || action ? `<div>
          ${lead ? (Array.isArray(lead) ? paras(lead, "lead") : `<p class="lead">${lead}</p>`) : ""}
          ${action || ""}
        </div>` : ""}
      </div>`;
}

// --- Étoiles -------------------------------------------------------------------
export const etoiles = (note) =>
  note ? `<p class="stars">${ico.etoiles}<span>${note.valeur.toFixed(1).replace(".", ",")}/5 · ${note.nombre} avis</span></p>` : "";

// --- Carte tarif (reprend .price-card) -----------------------------------------------
export function carteProduit(p, { titre = "h3", image = true } = {}) {
  const img = p.images[0];
  const ratio = manifeste[img] ? manifeste[img].w / manifeste[img].h : 1.6;
  const meta = [p.age, p.dureeTexte].filter(Boolean);
  return `<article class="price-card">
          ${image ? `<div class="price-card__media"${ratio < 1.2 ? "" : ` style="aspect-ratio:1031/586"`}>
            ${pic(img, { sizes: "(min-width:1100px) 380px, (min-width:640px) 50vw, 100vw", largeur: 480 })}
            ${p.bestSeller ? `<span class="badge">Best seller</span>` : ""}
          </div>` : ""}
          <div class="price-card__body">
            <p class="kicker">${categories[p.categorie].nom}</p>
            <${titre}><a href="/produit/${p.slug}/">${p.court || p.nom}</a></${titre}>
            <p class="price"><strong>${eur(p.prix)}</strong><span>Prix ${p.unite}</span></p>
            ${meta.length ? `<ul class="meta">${meta.map((m) => `<li>${m}</li>`).join("")}</ul>` : ""}
            <p class="desc">${p.accroche}</p>
            <div class="price-card__cta">
              <a class="btn btn--primary" href="/produit/${p.slug}/" aria-label="Réserver : ${esc(p.nom)}">Réserver ${ico.fleche}</a>
            </div>
          </div>
        </article>`;
}

export function grilleProduits(liste, { cls = "" } = {}) {
  if (!cls && liste.length === 2) cls = "tarifs--2";
  return `<ul class="tarifs ${cls}">${liste.map((p) => `<li>${carteProduit(p)}</li>`).join("\n")}</ul>`;
}

// --- Essentiel / avantages (cartes .feat) ------------------------------------------
export function grilleFeats(items, { cls = "", numeros = false, niveau = 3 } = {}) {
  return `<ul class="grid-feats ${cls}">${items
    .map((it, i) => {
      const [titre, texte] = Array.isArray(it) ? it : [it.titre, it.texte];
      const icone = numeros ? `<span class="feat__ico" aria-hidden="true">${i + 1}</span>` : `<span class="feat__ico">${ico.check}</span>`;
      return `<li class="feat">${icone}<div><h${niveau}>${titre}</h${niveau}><p>${texte}</p></div></li>`;
    })
    .join("\n")}</ul>`;
}

// --- Section texte + image (reprend .extra) --------------------------------------------
export function split({ eyebrow, titre, textes, image, video, inverse, lien, niveau = 2, id }) {
  const media = video
    ? videoBloc(video)
    : `<div class="split__media">${pic(image, { sizes: "(min-width:860px) 50vw, 100vw" })}</div>`;
  return `<div class="split${inverse ? " split--rev" : ""}"${id ? ` id="${id}"` : ""}>
        ${media}
        <div>
          ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
          <h${niveau}>${titre}</h${niveau}>
          ${paras(textes)}
          ${lien ? btn(lien.href, lien.label, lien.variante || "primary") : ""}
        </div>
      </div>`;
}

/** Vidéo : preload="none", rien n'est téléchargé avant le clic. */
export function videoBloc(cle, { label } = {}) {
  const v = manifeste[cle];
  if (!v) return "";
  const portrait = v.h > v.w;
  const poster = `/assets/images/${v.poster}-${(manifeste[v.poster]?.largeurs || [768]).find((l) => l >= 768) || manifeste[v.poster].largeurs.at(-1)}.webp`;
  return `<div class="extra__video${portrait ? " extra__video--portrait" : ""}">
          <video controls preload="none" playsinline muted data-poster="${poster}" width="${v.w}" height="${v.h}" aria-label="${esc(label || "Vidéo Mandelieu Watersports")}">
            <source src="/assets/videos/${cle}.mp4" type="video/mp4">
          </video>
        </div>`;
}

// --- Galerie balayable -----------------------------------------------------------
export function galerie(images) {
  if (!images?.length) return "";
  return `<ul class="gallery" aria-label="Galerie photos">${images
    .map((i) => `<li>${pic(i, { sizes: "(min-width:1100px) 300px, (min-width:640px) 44vw, 78vw", largeur: 480 })}</li>`)
    .join("")}</ul>`;
}

// --- FAQ (details/summary, sans JavaScript) -------------------------------------------
export function faq(questions, niveau = 3) {
  return `<div class="faq">${questions
    .map((q) => `<details>
          <summary><h${niveau} style="margin:0;font-size:inherit">${q.q}</h${niveau}>${ico.chev}</summary>
          <div class="faq__a">${q.html || paras([].concat(q.r))}</div>
        </details>`)
    .join("\n")}</div>`;
}

export const schemaFaq = (questions) => ({
  "@type": "FAQPage",
  mainEntity: questions.map((q) => ({
    "@type": "Question",
    name: q.q,
    acceptedAnswer: { "@type": "Answer", text: [].concat(q.r).join(" ") },
  })),
});

// --- Packs (reprend .pricing et .packband) -----------------------------------------------
const PACKS = ["pack-parachute-ascensionnel-bouee-tractee", "parachute-ascensionnel-jet-ski"];
const PACK_DETAILS = {
  "pack-parachute-ascensionnel-bouee-tractee": {
    kicker: "Parachute Ascensionnel + Bouée Tractée",
    ticks: ["<strong>Parachute Ascensionnel + Bouée :</strong> un tour en parachute + un tour en bouée tractée (30 min d’activités)", "Activité pour 2 personnes", "Le poids cumulé maximum pour voler en parachute est de 240 kg (jusqu’à 5 personnes)"],
    mini: "carte-pack-bouee",
  },
  "parachute-ascensionnel-jet-ski": {
    kicker: "Parachute Ascensionnel + Location Jet Ski",
    ticks: ["<strong>Parachute ascensionnel + jet ski :</strong> un tour en parachute + 30 minutes de jet ski", "Activité pour 2 personnes", "Le poids cumulé maximum pour voler en parachute est de 240 kg", "Jet ski encadré par un moniteur, sans permis bateau et en toute sécurité"],
    mini: "carte-pack-jet-ski",
  },
};

export function packsDuo({ niveau = 3 } = {}) {
  const carte = (slug) => {
    const p = produit(slug);
    const d = PACK_DETAILS[slug];
    return `<article class="price-card">
          <div class="price-card__media">${pic(p.images[0], { sizes: "(min-width:860px) 45vw, 100vw", largeur: 768 })}</div>
          <div class="price-card__body">
            <p class="kicker">${d.kicker}</p>
            <h${niveau}>${p.court}</h${niveau}>
            <p class="price"><strong>${eur(p.prix)}</strong><span>Prix par personne</span></p>
            <ul class="ticks">${d.ticks.map((t) => `<li>${t}</li>`).join("")}</ul>
            <a class="btn btn--primary" href="/produit/${slug}/" aria-label="Réserver : ${esc(p.nom)}">Réserver ${ico.fleche}</a>
          </div>
        </article>`;
  };
  return `<div class="pricing">
        ${carte(PACKS[0])}
        <p class="or" aria-hidden="true">OU</p>
        ${carte(PACKS[1])}
      </div>`;
}

export function bandeauPacks() {
  return `<section class="section" aria-labelledby="packband-title">
      <div class="packband">
        <div>
          <p class="eyebrow">Meilleur prix</p>
          <h2 class="h2" id="packband-title">Découvrez nos packs</h2>
          <p>Choisissez les activités sous forme de packs pour avoir le meilleur prix. Nos packs sont pour 2 personnes.</p>
          <p>Entre le parachute ascensionnel, le jet ski et la bouée tractée, nous vous proposons les meilleurs prix possibles.</p>
          <a class="btn btn--white" href="/nos-packs/" style="margin-top:10px">Découvrir nos packs ${ico.fleche}</a>
        </div>
        <ul class="mini-packs">
          ${PACKS.map((slug) => {
            const p = produit(slug);
            const d = PACK_DETAILS[slug];
            return `<li class="mini">
            ${pic(d.mini, { sizes: "96px", largeur: 480, alt: "" })}
            <div>
              <h3>${p.court} · <span class="p">${eur(p.prix)}</span> <small>prix par personne</small></h3>
              <ul class="ticks">${d.ticks.slice(0, 3).map((t) => `<li>${t}</li>`).join("")}</ul>
              <a href="/produit/${slug}/" aria-label="Réserver : ${esc(p.nom)}">Réserver</a>
            </div>
          </li>`;
          }).join("\n          ")}
        </ul>
      </div>
    </section>`;
}

// --- Best sellers (reprend .bestsellers) --------------------------------------------
export function bestSellers({ exclure = [] } = {}) {
  const liste = ["randonnee-jet-ski-petit-dejeuner", "parachute-ascensionnel-jet-ski", "randonnee-jet-ski-coucher-de-soleil"]
    .filter((s) => !exclure.includes(s))
    .map(produit);
  return `<div class="bestsellers">
        <h3>Nos Best Sellers :</h3>
        <ul class="bs-grid">
          ${liste.map((p) => `<li>
            <article class="price-card bs-card">
              <div class="price-card__media">
                ${pic(p.images.find((i) => i.startsWith("carte-")) || p.images[0], { sizes: "(min-width:1100px) 380px, (min-width:640px) 50vw, 100vw", largeur: 480 })}
                <span class="badge">${eur(p.prix)}</span>
              </div>
              <div class="price-card__body">
                <p class="kicker">Best seller</p>
                <h4 style="font-size:20px;font-weight:700;margin:0 0 12px;letter-spacing:-.01em">${p.court || p.nom}</h4>
                <p class="desc">${p.accroche}</p>
                <ul class="ticks">
                  <li>Prix ${p.unite}</li>
                  ${p.categorie === "randonnee" ? "<li>Montez seul ou à deux au même tarif !</li><li>Accessible à partir de 16 ans.</li>" : "<li>Activité pour 2 personnes</li><li>Jet ski encadré par un moniteur, sans permis bateau.</li>"}
                </ul>
                <a class="btn btn--primary" href="/produit/${p.slug}/" aria-label="Réserver : ${esc(p.nom)}">Réserver ${ico.fleche}</a>
              </div>
            </article>
          </li>`).join("\n          ")}
        </ul>
      </div>`;
}

// --- Avis + souvenir GoPro (reprend .duo) ---------------------------------------------
export function duoConfiance() {
  return `<section class="section duo" aria-label="Avis clients et souvenir vidéo" style="padding-top:0">
      <div class="panel">
        <p class="eyebrow">Avis clients</p>
        <h2>Vous nous faites déjà confiance</h2>
        <p>Nous restons proches de nos clients, vos avis nous permettent de nous améliorer tous les jours !</p>
        <div class="reviews" id="avis">
          <p class="reviews__score"><strong>${avisGoogle.resume}</strong> ${ico.etoiles} <span>Basée sur <strong>${avisGoogle.nombre} avis</strong> Google</span></p>
          <ul class="reviews__list">${avisGoogle.avis
            .map((a) => `<li><blockquote><p>« ${esc(a.texte)} »</p><footer>${esc(a.nom)} · <time>${a.date}</time></footer></blockquote></li>`)
            .join("")}</ul>
          <a class="reviews__more" href="${avisGoogle.lien}" rel="noopener" target="_blank">Lire tous nos avis sur Google <span class="sr-only">(nouvelle fenêtre)</span></a>
        </div>
      </div>
      <div class="panel panel--gopro">
        ${pic("gopro", { sizes: "120px", largeur: 150 })}
        <div>
          <p class="eyebrow">Souvenir vidéo</p>
          <h2>Gardez un souvenir pour 25€</h2>
          <p>Profitez de nos dernières GoPro pour garder ce moment magique avec vous.</p>
        </div>
      </div>
    </section>`;
}

// --- Contact (reprend .contact) -----------------------------------------------------
export function blocContact({ niveau = 2 } = {}) {
  return `<section class="section" id="contact" aria-labelledby="contact-title" style="padding-top:0">
      <div class="contact">
        <div>
          <p class="eyebrow">Réservation</p>
          <h${niveau} id="contact-title">Contactez-nous</h${niveau}>
          <p>Pour <strong>RÉSERVER</strong> un créneau sur n’importe quelle activité ou pack, appelez-nous au ${site.telephoneAffiche}</p>
          <h3>Appelez-nous pour réserver chez Mandelieu Watersports</h3>
          <a class="phone" href="${telLien}">${ico.tel} ${site.telephoneAffiche}</a>
        </div>
        <div>
          <h3 style="margin-top:0">Nous parlons aussi</h3>
          <ul class="langs">${site.langues.map((l) => `<li>${l}</li>`).join("")}</ul>
          <h3>Horaires</h3>
          <p>${site.horaires}</p>
          <h3>Où nous trouver ?</h3>
          <p><a href="/contact/">Port de la Rague<br>${site.adresse.ville}, ${site.adresse.codePostal}</a></p>
        </div>
      </div>
    </section>`;
}

/** Offres Schema.org d'une liste de produits. */
export const schemaOffres = (liste) =>
  liste.map((p) => ({
    "@type": "Offer",
    name: p.nom,
    url: site.domaine + urlProduit(p),
    price: p.prix,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    seller: { "@id": `${site.domaine}/#entreprise` },
  }));

export { produits, produit, categories, picto };
