// Composants partagés, tous dérivés du fichier de style validé
// (index-style2-final_1.html) : mêmes classes, mêmes structures.
import { site } from "../content/site.mjs";
import { produits, produit, categories, categorie, tousProduits } from "../content/produits.mjs";
import { packsEn } from "../content/en.mjs";
import { t, u, locale, estEn, fusion } from "./langue.mjs";
import { avisGoogle } from "../content/avis.mjs";
import { esc, ico, pic, btn, paras, eur, manifeste } from "./html.mjs";
import { icone } from "./icones.mjs";

export const urlProduit = (p) => u(`/produit/${p.slug}/`);
const telLien = `tel:${site.telephone}`;
/** Numéro au format international (version anglaise). */
export const telInter = "+33 " + site.telephoneAffiche.slice(1);

// --- Fil d'Ariane ------------------------------------------------------------
export function filAriane(fil) {
  return `<nav class="crumbs" aria-label="${t("Fil d’Ariane", "Breadcrumb")}"><ol>${fil
    .map((f, i) => (i === fil.length - 1 ? `<li><span aria-current="page">${f.nom}</span></li>` : `<li><a href="${f.url}">${f.nom}</a></li>`))
    .join("")}</ol></nav>`;
}

// --- Hero de page (même composition que le hero d'accueil) --------------------
export function heroPage({ h1, kicker, tagline, image, video, fil, faits, cta }) {
  return `<section class="hero hero--page" aria-labelledby="hero-title">
      <div class="hero__slides">
        <figure class="hero__slide is-active">${pic(image, { priorite: true, sizes: "100vw", largeur: 1024 })}${video ? videoFond(video) : ""}</figure>
      </div>
      <div class="hero__content">
        ${fil ? filAriane(fil) : ""}
        ${kicker ? `<p class="hero__kicker">${kicker}</p>` : ""}
        <h1 class="hero__title" id="hero-title">${h1}</h1>
        ${tagline ? `<p class="hero__tagline">${tagline.split(" · ").join("<span>·</span>")}</p>` : ""}
      </div>
      ${faits ? `<div class="factbar">
        <dl class="facts">${faits.map(([dt, dd]) => `<div><dt>${dt}</dt><dd>${dd}</dd></div>`).join("")}</dl>
        ${btn(cta?.href || "#tarifs", cta?.label || t("Voir les tarifs & réserver", "See prices & book"))}
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
  note ? `<p class="stars">${ico.etoiles}<span>${t(note.valeur.toFixed(1).replace(".", ","), note.valeur.toFixed(1))}/5 · ${note.nombre} ${t("avis", "reviews")}</span></p>` : "";

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
            <p class="kicker">${categorie(p.categorie).nom}</p>
            <${titre}><a href="${urlProduit(p)}">${p.court || p.nom}</a></${titre}>
            <p class="price"><strong>${eur(p.prix)}</strong><span>${t("Prix", "Price")} ${p.unite}</span></p>
            ${meta.length ? `<ul class="meta">${meta.map((m) => `<li>${m}</li>`).join("")}</ul>` : ""}
            <p class="desc">${p.accroche}</p>
            <div class="price-card__cta">
              <a class="btn btn--primary" href="${urlProduit(p)}" aria-label="${t("Réserver", "Book")} : ${esc(p.nom)}">${t("Réserver", "Book")} ${ico.fleche}</a>
            </div>
          </div>
        </article>`;
}

export function grilleProduits(liste, { cls = "" } = {}) {
  if (!cls && liste.length === 2) cls = "tarifs--2";
  return `<ul class="tarifs ${cls}">${liste.map((p) => `<li>${carteProduit(p)}</li>`).join("\n")}</ul>`;
}

// --- Essentiel / avantages (cartes .feat) ------------------------------------------
// Chaque point fort porte son propre pictogramme (lib/icones.mjs) :
// [titre, texte, pictogramme] ou { titre, texte, icone }.
export function grilleFeats(items, { cls = "", numeros = false, niveau = 3 } = {}) {
  const noms = items.map((it) => (Array.isArray(it) ? it[2] : it.icone));
  const doublon = noms.find((n, i) => noms.indexOf(n) !== i);
  if (doublon) throw new Error(`Pictogramme « ${doublon} » utilisé deux fois dans le même bloc`);
  return `<ul class="grid-feats ${cls}">${items
    .map((it, i) => {
      const [titre, texte] = Array.isArray(it) ? it : [it.titre, it.texte];
      const num = numeros ? `<span class="feat__num">${t("Étape", "Step")} ${i + 1}</span>` : "";
      return `<li class="feat"><span class="feat__ico">${icone(noms[i])}</span><div>${num}<h${niveau}>${titre}</h${niveau}><p>${texte}</p></div></li>`;
    })
    .join("\n")}</ul>`;
}

// --- Section texte + image (reprend .extra) --------------------------------------------
export function split({ eyebrow, titre, textes, image, video, inverse, lien, niveau = 2, id }) {
  const media = video
    ? videoBloc(video)
    : `<div class="split__media">${pic(image, { sizes: "(min-width:860px) 50vw, 100vw", recadrage: 4 / 3 })}</div>`;
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

/**
 * Vidéo d'ambiance en arrière-plan (hero) : muette, en boucle, sans contrôles.
 * La source n'est chargée par app.js qu'après l'affichage de la page, jamais si
 * l'utilisateur a demandé de réduire les animations ; la photo reste en dessous.
 */
// Pas d'attribut `poster` : la photo de la diapositive, dessous (AVIF/WebP responsive,
// prioritaire), sert d'affiche et de repli ; la vidéo n'apparaît (fondu) qu'une fois lancée.
export function videoFond(cle) {
  const v = manifeste[cle];
  if (!v) throw new Error(`Vidéo inconnue : « ${cle} »`);
  const portrait = v.portrait ? ` data-video-portrait="/assets/videos/${v.portrait}.mp4"` : "";
  return `<video class="hero__video" autoplay muted loop playsinline preload="none" disablepictureinpicture disableremoteplayback aria-hidden="true" tabindex="-1" data-video-src="/assets/videos/${cle}.mp4"${portrait}></video>`;
}

/** Vidéo : preload="none", rien n'est téléchargé avant le clic. */
export function videoBloc(cle, { label } = {}) {
  const v = manifeste[cle];
  if (!v) return "";
  const portrait = v.h > v.w;
  const poster = `/assets/images/${v.poster}-${(manifeste[v.poster]?.largeurs || [768]).find((l) => l >= 768) || manifeste[v.poster].largeurs.at(-1)}.webp`;
  return `<div class="extra__video${portrait ? " extra__video--portrait" : ""}">
          <video controls preload="none" playsinline muted data-poster="${poster}" width="${v.w}" height="${v.h}" aria-label="${esc(label || t("Vidéo Mandelieu Watersports", "Mandelieu Watersports video"))}">
            <source src="/assets/videos/${cle}.mp4" type="video/mp4">
          </video>
        </div>`;
}

// --- Galerie balayable -----------------------------------------------------------
export function galerie(images) {
  if (!images?.length) return "";
  return `<ul class="gallery" aria-label="${t("Galerie photos", "Photo gallery")}">${images
    .map((i) => `<li>${pic(i, { sizes: "(min-width:1100px) 310px, (min-width:640px) 44vw, 78vw", largeur: 768, recadrage: 4 / 5 })}</li>`)
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
    cadrage: "38% 50%",
    cadrageMobile: "50% 85%",
    ticks: ["<strong>Parachute Ascensionnel + Bouée :</strong> un tour en parachute + un tour en bouée tractée (30 min d’activités)", "Activité pour 2 personnes", "Le poids cumulé maximum pour voler en parachute est de 240 kg (jusqu’à 5 personnes)"],
    mini: "carte-pack-bouee",
    resume: "Un tour en parachute + un tour en bouée tractée · pour 2 personnes",
  },
  "parachute-ascensionnel-jet-ski": {
    kicker: "Parachute Ascensionnel + Location Jet Ski",
    cadrage: "50% 80%",
    cadrageMobile: "50% 78%",
    ticks: ["<strong>Parachute ascensionnel + jet ski :</strong> un tour en parachute + 30 minutes de jet ski", "Activité pour 2 personnes", "Le poids cumulé maximum pour voler en parachute est de 240 kg", "Jet ski encadré par un moniteur, sans permis bateau et en toute sécurité"],
    mini: "carte-pack-jet-ski",
    resume: "Un tour en parachute + 30 min de jet ski sans permis · pour 2 personnes",
  },
};

const detailsPack = (slug) => (estEn() ? fusion(PACK_DETAILS[slug], packsEn[slug]) : PACK_DETAILS[slug]);

export function packsDuo({ niveau = 3 } = {}) {
  const carte = (slug) => {
    const p = produit(slug);
    const d = detailsPack(slug);
    return `<article class="price-card price-card--fondu">
          <div class="price-card__media" style="--cadrage:${d.cadrage};--cadrage-mobile:${d.cadrageMobile}">${pic(p.images[0], { sizes: "(min-width:860px) 45vw, 100vw", largeur: 1024, recadrage: 3 / 4 })}</div>
          <div class="price-card__body">
            <p class="kicker">${d.kicker}</p>
            <h${niveau}>${p.court}</h${niveau}>
            <p class="price"><strong>${eur(p.prix)}</strong><span>${t("Prix par personne", "Price per person")}</span></p>
            <ul class="ticks">${d.ticks.map((x) => `<li>${x}</li>`).join("")}</ul>
            <a class="btn btn--primary" href="${urlProduit(p)}" aria-label="${t("Réserver", "Book")} : ${esc(p.nom)}">${t("Réserver", "Book")} ${ico.fleche}</a>
          </div>
        </article>`;
  };
  return `<div class="pricing">
        ${carte(PACKS[0])}
        <p class="or" aria-hidden="true">${t("OU", "OR")}</p>
        ${carte(PACKS[1])}
      </div>`;
}

export function bandeauPacks() {
  return `<section class="section" aria-labelledby="packband-title">
      <div class="packband">
        <div>
          <p class="eyebrow">${t("Meilleur prix", "Best price")}</p>
          <h2 class="h2" id="packband-title">${t("Découvrez nos packs", "Discover our packages")}</h2>
          <p>${t("Choisissez les activités sous forme de packs pour avoir le meilleur prix. Nos packs sont pour 2 personnes.", "Combine activities in a package for the best price. Our packages are for 2 people.")}</p>
          <p>${t("Entre le parachute ascensionnel, le jet ski et la bouée tractée, nous vous proposons les meilleurs prix possibles.", "Parasailing, jet ski and tube rides: we offer you the best possible prices.")}</p>
          <a class="btn btn--white" href="${u("/nos-packs/")}" style="margin-top:10px">${t("Découvrir nos packs", "Discover our packages")} ${ico.fleche}</a>
        </div>
        <ul class="mini-packs">
          ${PACKS.map((slug) => {
            const p = produit(slug);
            const d = detailsPack(slug);
            return `<li class="mini">
            <div class="mini__media">
              ${pic(d.mini, { sizes: "(min-width:860px) 140px, (min-width:640px) 45vw, 90vw", largeur: 480, alt: "", recadrage: 16 / 9 })}
              <span class="mini__prix">${eur(p.prix)} <small>/ ${t("pers.", "pp")}</small></span>
            </div>
            <div class="mini__body">
              <h3>${p.court}</h3>
              <p class="mini__desc">${d.resume}</p>
              <a class="btn btn--white mini__btn" href="${urlProduit(p)}" aria-label="${t("Réserver", "Book")} : ${esc(p.nom)}">${t("Réserver", "Book")} ${ico.fleche}</a>
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
        <h3>${t("Nos Best Sellers :", "Our best sellers:")}</h3>
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
                  <li>${t("Prix", "Price")} ${p.unite}</li>
                  ${p.categorie === "randonnee" ? t("<li>Montez seul ou à deux au même tarif !</li><li>Accessible à partir de 16 ans.</li>", "<li>Ride alone or for two, same price!</li><li>Drivers from 16 years old.</li>") : t("<li>Activité pour 2 personnes</li><li>Jet ski encadré par un moniteur, sans permis bateau.</li>", "<li>Activity for 2 people</li><li>Jet ski supervised by an instructor, no boat licence needed.</li>")}
                </ul>
                <a class="btn btn--primary" href="${urlProduit(p)}" aria-label="${t("Réserver", "Book")} : ${esc(p.nom)}">${t("Réserver", "Book")} ${ico.fleche}</a>
              </div>
            </article>
          </li>`).join("\n          ")}
        </ul>
      </div>`;
}

// --- Avis clients (reprend .panel) --------------------------------------------------
export function duoConfiance() {
  const live = site.avisGoogle?.cleApi && site.avisGoogle?.placeId ? site.avisGoogle : null;
  const noteFr = t(avisGoogle.note.toFixed(1).replace(".", ","), avisGoogle.note.toFixed(1));
  const nombreFr = avisGoogle.nombre.toLocaleString(locale()); // « 1 477 » / "1,477"
  return `<section class="section" aria-labelledby="avis-title" style="padding-top:0">
      <div class="panel panel--avis">
        <p class="eyebrow">${t("Avis clients", "Customer reviews")}</p>
        <h2 id="avis-title">${t("Vous nous faites déjà confiance", "They already trust us")}</h2>
        <p>${t("Nous restons proches de nos clients, vos avis nous permettent de nous améliorer tous les jours !", "We stay close to our customers: your reviews help us improve every day!")}</p>
        <div class="reviews" id="avis"${live ? ` data-avis-live data-cle="${esc(live.cleApi)}" data-place="${esc(live.placeId)}"` : ""}>
          <p class="reviews__score"><strong data-avis-note>${noteFr}/5</strong>
            <span class="reviews__stars" data-avis-etoiles style="--note:${avisGoogle.note}" role="img" aria-label="${t("Note Google", "Google rating")} : ${noteFr} ${t("sur", "out of")} 5">${ico.etoiles}${ico.etoiles}</span>
            <span data-avis-total>${t(`Basée sur <strong>${nombreFr} avis</strong> Google`, `Based on <strong>${nombreFr} Google reviews</strong>`)}</span></p>
          <ul class="reviews__list" data-avis-liste tabindex="0" aria-label="${t("Avis Google : faites défiler", "Google reviews: scroll")}">${avisGoogle.avis
            .map((a) => `<li><blockquote><p>« ${esc(a.texte)} »</p><footer>${esc(a.nom)}</footer></blockquote></li>`)
            .join("")}</ul>
          <div class="reviews__nav" data-avis-nav hidden>
            <button type="button" class="reviews__btn" data-avis-prec aria-label="${t("Avis précédents", "Previous reviews")}">${ico.prec}</button>
            <div class="reviews__piste" aria-hidden="true"><span class="reviews__curseur" data-avis-curseur></span></div>
            <button type="button" class="reviews__btn" data-avis-suiv aria-label="${t("Avis suivants", "Next reviews")}">${ico.suiv}</button>
          </div>
          <a class="reviews__more" data-avis-lien href="${avisGoogle.lien}" rel="noopener" target="_blank">${t("Lire tous nos avis sur Google", "Read all our Google reviews")} <span class="sr-only">(${t("nouvelle fenêtre", "new window")})</span></a>
        </div>
      </div>

    </section>`;
}

// --- Contact (reprend .contact) -----------------------------------------------------
export function blocContact({ niveau = 2 } = {}) {
  return `<section class="section" id="contact" aria-labelledby="contact-title" style="padding-top:0">
      <div class="contact">
        <div>
          <p class="eyebrow">${t("Réservation", "Booking")}</p>
          <h${niveau} id="contact-title">${t("Contactez-nous", "Contact us")}</h${niveau}>
          <p>${t(`Pour <strong>RÉSERVER</strong> un créneau sur n’importe quelle activité ou pack, appelez-nous au ${site.telephoneAffiche}`, `To <strong>BOOK</strong> a slot for any activity or package, call us on ${telInter}`)}</p>
          <h3>${t("Appelez-nous pour réserver chez Mandelieu Watersports", "Call us to book with Mandelieu Watersports")}</h3>
          <a class="phone" href="${telLien}">${ico.tel} ${t(site.telephoneAffiche, telInter)}</a>
        </div>
        <div>
          <h3 style="margin-top:0">${t("Nous parlons aussi", "We also speak")}</h3>
          <ul class="langs">${t(site.langues, ["French", "German", "Italian", "Russian"]).map((l) => `<li>${l}</li>`).join("")}</ul>
          <h3>${t("Horaires", "Opening hours")}</h3>
          <p>${t(site.horaires, "Monday – Sunday | 8 am – 8 pm")}</p>
          <h3>${t("Où nous trouver ?", "Where to find us")}</h3>
          <p><a href="${u("/contact/")}">${site.adresse.rue}<br>${site.adresse.codePostal} ${site.adresse.ville}</a></p>
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

export { produits, produit, categories, categorie, tousProduits };

// --- Zone de chalandise (SEO local) ---------------------------------------------------
import { zoneLoc, zonePourLoc } from "../content/zone.mjs";

export function sectionZone(cle) {
  const z = zonePourLoc(cle) || zonePourLoc("accueil");
  return `<section class="section section--tight" aria-labelledby="zone-title">
      ${teteSection({ eyebrow: t("Golfe de la Napoule", "Gulf of La Napoule"), titre: z.titre, id: "zone-title", lead: z.intro })}
      ${grilleFeats(zoneLoc().lieux, { cls: "grid-feats--3" })}
    </section>`;
}
