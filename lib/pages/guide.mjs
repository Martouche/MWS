// Gabarit des guides jet ski (/guides/…), de leur hub et de la page « Îles de Lérins ».
import { site } from "../../content/site.mjs";
import { produit } from "../../content/produits.mjs";
import { guides, lerins, hubGuides, MAJ } from "../../content/guides.mjs";
import { pic, ico, urlImage } from "../html.mjs";
import { heroPage, enTetePage, grilleProduits, faq, schemaFaq, duoConfiance, blocContact, schemaOffres } from "../composants.mjs";
import { idEntreprise as ID } from "../layout.mjs";

const ACCUEIL = { nom: "Accueil", url: "/" };
const HUB = { nom: "Guides", url: hubGuides.url };
const dateFr = (iso) => new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

/** Toutes les pages éditoriales, pour les liens croisés. */
const tous = () => [...Object.values(guides), lerins];

function article(g) {
  return `<article class="prose guide">
        <p class="guide__maj">Mis à jour le <time datetime="${MAJ}">${dateFr(MAJ)}</time> · Mandelieu Watersports</p>
        <p class="lead">${g.intro}</p>
        ${g.sections.map((s) => `<h2>${s.titre}</h2>
        ${s.html.join("\n        ")}
        ${s.image ? `<figure class="guide__fig">${pic(s.image, { sizes: "(min-width:980px) 800px, 100vw", largeur: 1024, recadrage: 16 / 9 })}</figure>` : ""}`).join("\n        ")}
      </article>`;
}

/** Bloc « Nos guides » réutilisé par les pages activités jet ski. */
export function blocGuides(urls, { titre = "Préparez votre sortie en jet ski" } = {}) {
  const liste = tous().filter((g) => urls.includes(g.url));
  return `<section class="section section--tight" aria-labelledby="guides-title">
      <p class="eyebrow">Nos guides</p>
      <h2 class="h2" id="guides-title">${titre}</h2>
      <ul class="guides-grid">${liste.map(carteGuide).join("")}</ul>
      <p class="note"><a class="linkbtn" href="${hubGuides.url}">Tous nos guides jet ski</a></p>
    </section>`;
}

function aLire(courant) {
  const autres = tous().filter((g) => g.url !== courant);
  return `<section class="section section--tight" aria-labelledby="alire-title">
      <p class="eyebrow">À lire aussi</p>
      <h2 class="h2" id="alire-title">Nos autres guides jet ski</h2>
      <ul class="guides-grid">${autres.map(carteGuide).join("")}</ul>
    </section>`;
}

const carteGuide = (g) => `<li class="guide-card">
        <a href="${g.url}">
          <span class="guide-card__media">${pic(g.image, { sizes: "(min-width:860px) 30vw, 100vw", largeur: 768, recadrage: 16 / 10, alt: "" })}</span>
          <span class="guide-card__body"><strong>${g.nom}</strong><span>${g.resume}</span><span class="guide-card__more">Lire le guide ${ico.fleche}</span></span>
        </a>
      </li>`;

/** Page guide ou page Lérins. */
function pageEditoriale(g, { fil, hero }) {
  const offres = g.produits.map(produit);
  const corps = `
    ${hero}
    <section class="section" aria-label="${g.nom}">
      ${article(g)}
    </section>
    <section class="section section--tight" id="tarifs" aria-labelledby="offres-title">
      <p class="eyebrow">Réserver</p>
      <h2 class="h2" id="offres-title">Nos formules ${g === lerins ? "pour les îles de Lérins" : "jet ski"}</h2>
      ${grilleProduits(offres)}
    </section>
    <section class="section section--tight" aria-labelledby="faq-title">
      <p class="eyebrow">FAQ</p>
      <h2 class="h2" id="faq-title">Questions fréquentes – ${g.nom}</h2>
      ${faq(g.faq)}
    </section>
    ${aLire(g.url)}
    ${duoConfiance()}
    ${blocContact()}`;
  const schema = [
    {
      "@type": "Article",
      "@id": site.domaine + g.url + "#article",
      headline: g.h1,
      description: g.description,
      image: site.domaine + urlImage(g.image, 1024),
      datePublished: MAJ,
      dateModified: MAJ,
      inLanguage: "fr-FR",
      author: { "@id": ID },
      publisher: { "@id": ID },
      mainEntityOfPage: site.domaine + g.url,
      about: { "@type": "Thing", name: "Jet ski" },
    },
    schemaFaq(g.faq),
  ];
  if (g === lerins) {
    schema.push({ "@type": "Service", name: g.nom, serviceType: "Randonnée jet ski", url: site.domaine + g.url, provider: { "@id": ID }, offers: schemaOffres(offres) });
  }
  return { url: g.url, title: g.title, description: g.description, image: g.image, fil, corps, schema, ogType: "article", mcta: { href: "#tarifs", label: "Réserver" } };
}

export function guide(cle) {
  const g = guides[cle];
  const fil = [ACCUEIL, HUB, { nom: g.nom, url: g.url }];
  return pageEditoriale(g, { fil, hero: heroPage({ h1: g.h1, kicker: g.kicker, image: g.image, fil }) });
}

export function pageLerins() {
  const g = lerins;
  const fil = [ACCUEIL, { nom: "Randonnée jet ski", url: "/randonnee-jet-ski/" }, { nom: g.nom, url: g.url }];
  return pageEditoriale(g, { fil, hero: heroPage({ h1: g.h1, kicker: g.kicker, tagline: g.tagline, image: g.image, fil, faits: g.faits }) });
}

export function hub() {
  const h = hubGuides;
  const fil = [ACCUEIL, HUB];
  const corps = `
    ${enTetePage({ h1: h.h1, eyebrow: "Conseils & itinéraires", lead: h.lead, fil })}
    <section class="section section--tight" aria-label="Guides">
      <ul class="guides-grid">${tous().map(carteGuide).join("")}</ul>
    </section>
    ${blocContact()}`;
  return {
    url: h.url, title: h.title, description: h.description, image: "esterel-roches-rouges", fil, corps,
    schema: { "@type": "CollectionPage", name: h.h1, url: site.domaine + h.url, hasPart: tous().map((g) => ({ "@type": "Article", headline: g.h1, url: site.domaine + g.url })) },
  };
}

export { guides };
