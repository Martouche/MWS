// Gabarit des pages activités (parachute, jet ski, bouée, glisse).
import { site } from "../../content/site.mjs";
import { activiteLoc } from "../../content/activites.mjs";
import { parCategorie, categorie } from "../../content/produits.mjs";
import { t, u, estEn } from "../langue.mjs";
import { questionsPour } from "../../content/faq.mjs";
import { btn } from "../html.mjs";
import { icone } from "../icones.mjs";
import {
  heroPage, teteSection, grilleProduits, grilleFeats, split, galerie, faq, schemaFaq,
  packsDuo, bestSellers, duoConfiance, blocContact, videoBloc, schemaOffres, sectionZone,
} from "../composants.mjs";
import { idEntreprise as ID } from "../layout.mjs";
import { blocGuides } from "./guide.mjs";

// Guides mis en avant sur les pages jet ski (maillage interne).
const GUIDES = {
  "location-jet-ski": ["/guides/jet-ski-sans-permis/", "/guides/prix-jet-ski-cannes/", "/randonnee-jet-ski-iles-de-lerins/"],
  "randonnee-jet-ski": ["/randonnee-jet-ski-iles-de-lerins/", "/guides/que-voir-en-jet-ski-cannes/", "/guides/prix-jet-ski-cannes/"],
};

export function activite(cle) {
  const a = activiteLoc(cle);
  const url = u(a.url);
  const fil = [{ nom: t("Accueil", "Home"), url: u("/") }, { nom: a.nom, url }];
  const liste = a.categories.flatMap(parCategorie);
  const questions = questionsPour(cle);
  const colonnes = liste.length % 3 === 0 || liste.length > 4 ? "" : liste.length === 4 ? "tarifs--4" : "";

  const blocs = [];

  // 1. Hero
  blocs.push(heroPage({ h1: a.h1, kicker: a.kicker, tagline: a.tagline, image: a.hero, fil, faits: a.faits }));

  // 2. Introduction
  blocs.push(`<section class="section" aria-labelledby="intro-title">
      ${split({ ...a.intro, titre: a.intro.titre, id: undefined, niveau: 2 }).replace("<h2>", '<h2 id="intro-title">')}
    </section>`);

  // 3. L'essentiel
  if (a.essentiel) {
    blocs.push(`<section class="booking" aria-labelledby="essentiel-title">
      <p class="eyebrow">${a.nom}</p>
      <h2 class="h2" id="essentiel-title">${a.essentiel.titre}</h2>
      ${grilleFeats(a.essentiel.items, { cls: a.essentiel.items.length === 4 ? "grid-feats--4" : "grid-feats--3" })}
    </section>`);
  }

  // 4. Tarifs
  blocs.push(`<section class="section" id="tarifs" aria-labelledby="tarifs-title">
      ${teteSection({
        eyebrow: t("Tarifs & réservation", "Prices & booking"),
        titre: a.tarifsTitre || t(`Nos tarifs – ${a.nom}`, `Our prices – ${a.nom}`),
        id: "tarifs-title",
        lead: t("Réservez en ligne votre créneau, ou appelez-nous pour le bloquer immédiatement. Tous nos prix sont toutes taxes comprises (TVA 20 % incluse).", "Book your slot online, or call us to reserve it straight away. All prices include VAT (20%)."),
        action: `<a class="btn btn--ghost" href="tel:${site.telephone}" aria-label="${t("Appel direct au", "Call us on")} ${site.telephoneAffiche}">${icone("telephone", "ico ico--tel")} ${t("Appel direct", "Call us")}</a>`,
      })}
      ${a.categories.length > 1
        ? a.categories.map((c) => `<div class="cat-block" id="${c}">
        <h3 style="font-size:clamp(20px,2.6vw,26px);font-weight:700;margin:28px 0 0">${categorie(c).nom}</h3>
        ${grilleProduits(parCategorie(c))}
      </div>`).join("")
        : grilleProduits(liste, { cls: colonnes })}
      ${a.categories.some((c) => ["wakeboard", "ski"].includes(c)) ? `<p class="note">${t(`Forfait 10 tours : 299 €, uniquement sur demande au ${site.telephoneAffiche}.`, `10-ride pass: €299, on request only on +33 ${site.telephoneAffiche.slice(1)}.`)}</p>` : ""}
    </section>`);

  // 5. Comment ça marche
  if (a.comment) {
    blocs.push(`<section class="section section--tight" aria-labelledby="comment-title">
      <p class="eyebrow">${t("Étape par étape", "Step by step")}</p>
      <h2 class="h2" id="comment-title">${a.comment.titre}</h2>
      ${grilleFeats(a.comment.etapes, { cls: "grid-feats--3", numeros: true })}
    </section>`);
  }

  // 6. Avantages
  if (a.avantages) {
    blocs.push(`<section class="section section--tight" aria-labelledby="avantages-title">
      ${teteSection({ eyebrow: t("Pourquoi nous choisir", "Why choose us"), titre: a.avantages.titre, id: "avantages-title", lead: a.avantages.intro })}
      ${grilleFeats(a.avantages.items, { cls: "grid-feats--5" })}
    </section>`);
  }

  // 7. Sections éditoriales + vidéo
  blocs.push(`<section class="section section--tight" aria-label="En savoir plus">
      ${a.sections.map((s) => split({ ...s, niveau: 2, lien: s.lien && { ...s.lien, href: u(s.lien.href) } })).join("\n")}
      ${a.video ? `<div class="split${a.sections.length % 2 ? " split--rev" : ""}">
        ${videoBloc(a.video.cle, { label: a.video.titre })}
        <div>
          <p class="eyebrow">${t("Vidéo", "Video")}</p>
          <h2>${a.video.titre}</h2>
          <p>${a.video.texte}</p>
          ${btn("#tarifs", t("Je réserve !", "Book now!"))}
        </div>
      </div>` : ""}
      ${galerie(a.galerie)}
    </section>`);

  // 8. Randonnées : choisir / destinations
  if (a.choisir) {
    blocs.push(`<section class="section section--tight" aria-labelledby="choisir-title">
      ${teteSection({ eyebrow: t("Nos conseils", "Our tips"), titre: a.choisir.titre, id: "choisir-title", lead: a.choisir.intro })}
      <div class="panels panels--3">${a.choisir.items.map((i) => `<div class="panel"><h3>${i.titre}</h3><p>${i.texte}</p></div>`).join("")}</div>
    </section>`);
  }
  if (a.destinations) {
    blocs.push(`<section class="section section--tight" aria-labelledby="dest-title">
      <p class="eyebrow">${t("Itinéraires", "Routes")}</p>
      <h2 class="h2" id="dest-title">${a.destinations.titre}</h2>
      <div class="panels">${a.destinations.items.map((i) => `<div class="panel"><h3>${i.titre}</h3><p>${i.texte}</p></div>`).join("")}</div>
      <p class="lead" style="margin-top:22px">${a.destinations.conclusion}</p>
    </section>`);
  }

  // 9. Packs + best sellers
  blocs.push(`<section class="section section--tight" aria-labelledby="packs-title">
      <p class="eyebrow">${t("Nos packs", "Our packages")}</p>
      <h2 class="h2" id="packs-title">${t("Vous n’arrivez pas à vous décider ?", "Can’t decide?")}</h2>
      <p class="lead">${t("Nos <strong>packs</strong> vous permettront de combiner les activités au <strong>meilleur prix</strong> !", "Our <strong>packages</strong> let you combine activities at the <strong>best price</strong>!")}</p>
      ${packsDuo()}
      ${bestSellers({ exclure: liste.map((p) => p.slug) })}
    </section>`);

  // 10. Guides jet ski + zone de chalandise (SEO local)
  if (GUIDES[cle]) blocs.push(blocGuides(GUIDES[cle]));
  blocs.push(sectionZone(cle));

  // 11. FAQ
  if (questions.length) {
    blocs.push(`<section class="section section--tight" aria-labelledby="faq-title">
      <p class="eyebrow">FAQ</p>
      <h2 class="h2" id="faq-title">${t("Questions fréquentes", "Frequently asked questions")} – ${a.nom}</h2>
      ${faq(questions)}
      <p class="note"><a class="linkbtn" href="${u("/faq/")}">${t("Toutes nos questions fréquentes", "All our FAQs")}</a></p>
    </section>`);
  }

  blocs.push(duoConfiance(), blocContact());

  const schema = [
    {
      "@type": "Service",
      name: a.nom,
      serviceType: a.nom,
      url: site.domaine + url,
      provider: { "@id": ID },
      areaServed: site.villes.map((v) => ({ "@type": "City", name: v })),
      offers: schemaOffres(liste),
    },
  ];
  if (questions.length) schema.push(schemaFaq(questions));

  return {
    url,
    title: a.title,
    description: a.description,
    image: a.hero,
    fil,
    corps: blocs.join("\n\n    "),
    schema,
    mcta: { href: "#tarifs", label: t("Réserver", "Book") },
    reservation: "#tarifs",
  };
}
