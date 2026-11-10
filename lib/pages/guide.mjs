// Gabarit des guides jet ski (/guides/…), de leur hub et de la page « Îles de Lérins »,
// en français et en anglais (/en/guides/…).
import { site } from "../../content/site.mjs";
import { produit } from "../../content/produits.mjs";
import { guides as guidesFr, lerins as lerinsFr, hubGuides as hubFr, MAJ } from "../../content/guides.mjs";
import { lerinsEn, guidesEn, hubGuidesEn } from "../../content/en.mjs";
import { t, u, estEn, locale, fusion } from "../langue.mjs";
import { pic, ico, urlImage } from "../html.mjs";
import { heroPage, enTetePage, grilleProduits, faq, schemaFaq, duoConfiance, blocContact, schemaOffres } from "../composants.mjs";
import { idEntreprise as ID } from "../layout.mjs";

// --- Contenu dans la langue de rendu (URL traduites par u()) ---------------------------
const loc = (fr, en) => (estEn() ? { ...fusion(fr, en), url: u(fr.url) } : fr);
const guideLoc = (cle) => loc(guidesFr[cle], guidesEn[cle]);
const lerinsLoc = () => loc(lerinsFr, lerinsEn);
const hubLoc = () => loc(hubFr, hubGuidesEn);
const estLerins = (g) => g.url === u(lerinsFr.url);

const accueil = () => ({ nom: t("Accueil", "Home"), url: u("/") });
const hubFil = () => ({ nom: t("Guides", "Guides"), url: u(hubFr.url) });
const dateFr = (iso) => new Date(iso).toLocaleDateString(locale(), { day: "numeric", month: "long", year: "numeric" });

/** Toutes les pages éditoriales, pour les liens croisés. */
const tous = () => [...Object.keys(guidesFr).map(guideLoc), lerinsLoc()];

function article(g) {
  return `<article class="prose guide">
        <p class="guide__maj">${t("Mis à jour le", "Updated on")} <time datetime="${MAJ}">${dateFr(MAJ)}</time> · Mandelieu Watersports</p>
        <p class="lead">${g.intro}</p>
        ${g.sections.map((s) => `<h2>${s.titre}</h2>
        ${s.html.join("\n        ")}
        ${s.image ? `<figure class="guide__fig">${pic(s.image, { sizes: "(min-width:980px) 800px, 100vw", largeur: 1024, recadrage: 16 / 9 })}</figure>` : ""}`).join("\n        ")}
      </article>`;
}

const carteGuide = (g) => `<li class="guide-card">
        <a href="${g.url}">
          <span class="guide-card__media">${pic(g.image, { sizes: "(min-width:860px) 30vw, 100vw", largeur: 768, recadrage: 16 / 10, alt: "" })}</span>
          <span class="guide-card__body"><strong>${g.nom}</strong><span>${g.resume}</span><span class="guide-card__more">${t("Lire le guide", "Read the guide")} ${ico.fleche}</span></span>
        </a>
      </li>`;

/** Bloc « Nos guides » réutilisé par les pages activités jet ski (URL françaises en entrée). */
export function blocGuides(urlsFr) {
  const voulues = urlsFr.map(u);
  const liste = tous().filter((g) => voulues.includes(g.url));
  return `<section class="section section--tight" aria-labelledby="guides-title">
      <p class="eyebrow">${t("Nos guides", "Our guides")}</p>
      <h2 class="h2" id="guides-title">${t("Préparez votre sortie en jet ski", "Plan your jet ski outing")}</h2>
      <ul class="guides-grid">${liste.map(carteGuide).join("")}</ul>
      <p class="note"><a class="linkbtn" href="${u(hubFr.url)}">${t("Tous nos guides jet ski", "All our jet ski guides")}</a></p>
    </section>`;
}

function aLire(courant) {
  const autres = tous().filter((g) => g.url !== courant);
  return `<section class="section section--tight" aria-labelledby="alire-title">
      <p class="eyebrow">${t("À lire aussi", "Read next")}</p>
      <h2 class="h2" id="alire-title">${t("Nos autres guides jet ski", "Our other jet ski guides")}</h2>
      <ul class="guides-grid">${autres.map(carteGuide).join("")}</ul>
    </section>`;
}

/** Page guide ou page Lérins. */
function pageEditoriale(g, { fil, hero }) {
  const offres = g.produits.map(produit);
  const corps = `
    ${hero}
    <section class="section" aria-label="${g.nom}">
      ${article(g)}
    </section>
    <section class="section section--tight" id="tarifs" aria-labelledby="offres-title">
      <p class="eyebrow">${t("Réserver", "Book")}</p>
      <h2 class="h2" id="offres-title">${estLerins(g) ? t("Nos formules pour les îles de Lérins", "Our options for the Lérins Islands") : t("Nos formules jet ski", "Our jet ski options")}</h2>
      ${grilleProduits(offres)}
    </section>
    <section class="section section--tight" aria-labelledby="faq-title">
      <p class="eyebrow">FAQ</p>
      <h2 class="h2" id="faq-title">${t("Questions fréquentes", "Frequently asked questions")} – ${g.nom}</h2>
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
      inLanguage: t("fr-FR", "en-GB"),
      author: { "@id": ID },
      publisher: { "@id": ID },
      mainEntityOfPage: site.domaine + g.url,
      about: { "@type": "Thing", name: "Jet ski" },
    },
    schemaFaq(g.faq),
  ];
  if (estLerins(g)) {
    schema.push({ "@type": "Service", name: g.nom, serviceType: t("Randonnée jet ski", "Jet ski tour"), url: site.domaine + g.url, provider: { "@id": ID }, offers: schemaOffres(offres) });
  }
  return { url: g.url, title: g.title, description: g.description, image: g.image, fil, corps, schema, ogType: "article", mcta: { href: "#tarifs", label: t("Réserver", "Book") } };
}

export function guide(cle) {
  const g = guideLoc(cle);
  const fil = [accueil(), hubFil(), { nom: g.nom, url: g.url }];
  return pageEditoriale(g, { fil, hero: heroPage({ h1: g.h1, kicker: g.kicker, image: g.image, fil }) });
}

export function pageLerins() {
  const g = lerinsLoc();
  const fil = [accueil(), { nom: t("Randonnée jet ski", "Jet ski tours"), url: u("/randonnee-jet-ski/") }, { nom: g.nom, url: g.url }];
  return pageEditoriale(g, { fil, hero: heroPage({ h1: g.h1, kicker: g.kicker, tagline: g.tagline, image: g.image, fil, faits: g.faits }) });
}

export function hub() {
  const h = hubLoc();
  const fil = [accueil(), hubFil()];
  const corps = `
    ${enTetePage({ h1: h.h1, eyebrow: t("Conseils & itinéraires", "Tips & routes"), lead: h.lead, fil })}
    <section class="section section--tight" aria-label="Guides">
      <ul class="guides-grid">${tous().map(carteGuide).join("")}</ul>
    </section>
    ${blocContact()}`;
  return {
    url: h.url, title: h.title, description: h.description, image: "esterel-roches-rouges", fil, corps,
    schema: { "@type": "CollectionPage", name: h.h1, url: site.domaine + h.url, inLanguage: t("fr-FR", "en-GB"), hasPart: tous().map((g) => ({ "@type": "Article", headline: g.h1, url: site.domaine + g.url })) },
  };
}

export const guides = guidesFr;
