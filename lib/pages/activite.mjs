// Gabarit des pages activités (parachute, jet ski, bouée, glisse).
import { site } from "../../content/site.mjs";
import { activites } from "../../content/activites.mjs";
import { parCategorie, categories } from "../../content/produits.mjs";
import { questionsPour } from "../../content/faq.mjs";
import { btn } from "../html.mjs";
import {
  heroPage, teteSection, grilleProduits, grilleFeats, split, galerie, faq, schemaFaq,
  packsDuo, bestSellers, duoConfiance, blocContact, videoBloc, schemaOffres,
} from "../composants.mjs";
import { idEntreprise as ID } from "../layout.mjs";

export function activite(cle) {
  const a = activites[cle];
  const fil = [{ nom: "Accueil", url: "/" }, { nom: a.nom, url: a.url }];
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
        eyebrow: "Tarifs & réservation",
        titre: a.tarifsTitre || `Nos tarifs – ${a.nom}`,
        id: "tarifs-title",
        lead: "Réservez en ligne votre créneau, ou appelez-nous pour le bloquer immédiatement. Tous nos prix sont toutes taxes comprises (TVA 20 % incluse).",
        action: `<a class="btn btn--ghost" href="tel:${site.telephone}">Réserver au ${site.telephoneAffiche}</a>`,
      })}
      ${a.categories.length > 1
        ? a.categories.map((c) => `<div class="cat-block" id="${c}">
        <h3 style="font-size:clamp(20px,2.6vw,26px);font-weight:700;margin:28px 0 0">${categories[c].nom}</h3>
        ${grilleProduits(parCategorie(c))}
      </div>`).join("")
        : grilleProduits(liste, { cls: colonnes })}
      ${a.categories.some((c) => ["wakeboard", "ski"].includes(c)) ? `<p class="note">Forfait 10 tours : 299 €, uniquement sur demande au ${site.telephoneAffiche}.</p>` : ""}
    </section>`);

  // 5. Comment ça marche
  if (a.comment) {
    blocs.push(`<section class="section section--tight" aria-labelledby="comment-title">
      <p class="eyebrow">Étape par étape</p>
      <h2 class="h2" id="comment-title">${a.comment.titre}</h2>
      ${grilleFeats(a.comment.etapes, { cls: "grid-feats--3", numeros: true })}
    </section>`);
  }

  // 6. Avantages
  if (a.avantages) {
    blocs.push(`<section class="section section--tight" aria-labelledby="avantages-title">
      ${teteSection({ eyebrow: "Pourquoi nous choisir", titre: a.avantages.titre, id: "avantages-title", lead: a.avantages.intro })}
      ${grilleFeats(a.avantages.items, { cls: "grid-feats--5" })}
    </section>`);
  }

  // 7. Sections éditoriales + vidéo
  blocs.push(`<section class="section section--tight" aria-label="En savoir plus">
      ${a.sections.map((s) => split({ ...s, niveau: 2 })).join("\n")}
      ${a.video ? `<div class="split${a.sections.length % 2 ? " split--rev" : ""}">
        ${videoBloc(a.video.cle, { label: a.video.titre })}
        <div>
          <p class="eyebrow">Vidéo</p>
          <h2>${a.video.titre}</h2>
          <p>${a.video.texte}</p>
          ${btn("#tarifs", "Je réserve !")}
        </div>
      </div>` : ""}
      ${galerie(a.galerie)}
    </section>`);

  // 8. Randonnées : choisir / destinations
  if (a.choisir) {
    blocs.push(`<section class="section section--tight" aria-labelledby="choisir-title">
      ${teteSection({ eyebrow: "Nos conseils", titre: a.choisir.titre, id: "choisir-title", lead: a.choisir.intro })}
      <div class="panels panels--3">${a.choisir.items.map((i) => `<div class="panel"><h3>${i.titre}</h3><p>${i.texte}</p></div>`).join("")}</div>
    </section>`);
  }
  if (a.destinations) {
    blocs.push(`<section class="section section--tight" aria-labelledby="dest-title">
      <p class="eyebrow">Itinéraires</p>
      <h2 class="h2" id="dest-title">${a.destinations.titre}</h2>
      <div class="panels">${a.destinations.items.map((i) => `<div class="panel"><h3>${i.titre}</h3><p>${i.texte}</p></div>`).join("")}</div>
      <p class="lead" style="margin-top:22px">${a.destinations.conclusion}</p>
    </section>`);
  }

  // 9. Packs + best sellers
  blocs.push(`<section class="section section--tight" aria-labelledby="packs-title">
      <p class="eyebrow">Nos packs</p>
      <h2 class="h2" id="packs-title">Vous n’arrivez pas à vous décider ?</h2>
      <p class="lead">Nos <strong>packs</strong> vous permettront de combiner les activités au <strong>meilleur prix</strong> !</p>
      ${packsDuo()}
      ${bestSellers({ exclure: liste.map((p) => p.slug) })}
    </section>`);

  // 10. FAQ
  if (questions.length) {
    blocs.push(`<section class="section section--tight" aria-labelledby="faq-title">
      <p class="eyebrow">FAQ</p>
      <h2 class="h2" id="faq-title">Questions fréquentes – ${a.nom}</h2>
      ${faq(questions)}
      <p class="note"><a class="linkbtn" href="/faq/">Toutes nos questions fréquentes</a></p>
    </section>`);
  }

  blocs.push(duoConfiance(), blocContact());

  const schema = [
    {
      "@type": "Service",
      name: a.nom,
      serviceType: a.nom,
      url: site.domaine + a.url,
      provider: { "@id": ID },
      areaServed: site.villes.map((v) => ({ "@type": "City", name: v })),
      offers: schemaOffres(liste),
    },
  ];
  if (questions.length) schema.push(schemaFaq(questions));

  return {
    url: a.url,
    title: a.title,
    description: a.description,
    image: a.hero,
    fil,
    corps: blocs.join("\n\n    "),
    schema,
    mcta: { href: "#tarifs", label: "Réserver" },
  };
}
