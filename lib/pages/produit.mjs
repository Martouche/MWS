// Fiche produit /produit/<slug>/ : galerie, prix, calendrier Resamare, description.
import { site, resamare } from "../../content/site.mjs";
import { produits, categories } from "../../content/produits.mjs";
import { esc, ico, pic, paras, eur, urlImage } from "../html.mjs";
import { filAriane, etoiles, grilleProduits, grilleFeats, duoConfiance, blocContact, urlProduit } from "../composants.mjs";
import { idEntreprise } from "../layout.mjs";

const GARANTIES = [
  ["Transaction 100 % sécurisée", "Payez un acompte ou l’intégralité de votre activité en ligne."],
  ["Réservez votre créneau", "Choisissez votre date dans le calendrier ou appelez-nous pour planifier votre activité."],
  ["100 % remboursable", "Uniquement en cas de conditions météorologiques défavorables ou sur présentation d’un certificat médical."],
];

export function fiche(p) {
  const cat = categories[p.categorie];
  const pageCat = cat.page.split("#")[0];
  const fil = [
    { nom: "Accueil", url: "/" },
    { nom: cat.nom, url: cat.page },
    { nom: p.nom, url: urlProduit(p) },
  ];
  const similaires = produits.filter((x) => x.categorie === p.categorie && x.slug !== p.slug).slice(0, 3);
  const autres = similaires.length ? similaires : produits.filter((x) => x.bestSeller && x.slug !== p.slug).slice(0, 3);
  const [principale, ...vignettes] = p.images;
  const infos = [p.age, p.dureeTexte, p.horaires].filter(Boolean);

  const reservation = p.resaId && !p.telephone
    ? `<div class="resa" id="resa" data-resa-src="${resamare.script}">
            <p class="resa__titre">Réserver en ligne</p>
            <p class="resa__info">Choisissez votre créneau et réglez un acompte sécurisé : le solde se règle sur place le jour de l’activité. Sous réserve de disponibilité de la base nautique.</p>
            <div class="resamare-widget-calendar" data-api="${resamare.api}" data-titre-masquer="true" data-produit-id="${p.resaId}" data-calendrier-ouvrir data-couleur-principale="${resamare.couleur}" data-couleur-complementaire="#ffffff"></div>
            <noscript><p>Activez JavaScript pour réserver en ligne, ou appelez-nous au ${site.telephoneAffiche}.</p></noscript>
          </div>`
    : `<div class="resa" id="resa">
            <p class="resa__titre">Réservation par téléphone</p>
            <p class="resa__info">Cette activité se réserve directement auprès de notre équipe : appelez-nous pour choisir votre créneau.</p>
            <a class="btn btn--primary" href="tel:${site.telephone}">Appeler le ${site.telephoneAffiche} ${ico.fleche}</a>
          </div>`;

  const corps = `
    <section class="pdp" aria-labelledby="produit-titre">
      <div class="pdp__gallery">
        <div class="pdp__main">${pic(principale, { priorite: true, sizes: "(min-width:860px) 55vw, 100vw", largeur: 768 })}</div>
        ${vignettes.length ? `<ul class="pdp__thumbs">${vignettes.map((v) => `<li>${pic(v, { sizes: "(min-width:860px) 18vw, 45vw", largeur: 480 })}</li>`).join("")}</ul>` : ""}
      </div>
      <div class="pdp__card">
        ${filAriane(fil)}
        <p class="kicker">${cat.nom}</p>
        <h1 id="produit-titre">${p.nom}</h1>
        ${etoiles(p.note)}
        <p class="price"><strong>${eur(p.prix)}</strong><span>Prix ${p.unite}</span></p>
        <p class="lead">${p.accroche}</p>
        ${infos.length ? `<ul class="ticks">${infos.map((i) => `<li>${i}</li>`).join("")}${p.categorie === "jetski" || p.categorie === "randonnee" ? "<li>Pièces d’identité obligatoires</li><li>Seul ou à deux sur le jet ski, même tarif</li>" : ""}</ul>` : ""}
        ${reservation}
        <div class="phone-box">
          ${ico.tel}
          <div>
            <p>Vous préférez réserver par téléphone ? Nous bloquons votre créneau immédiatement.</p>
            <a href="tel:${site.telephone}">${site.telephoneAffiche}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section pdp__desc" aria-labelledby="desc-titre">
      <div class="split">
        <div>
          <p class="eyebrow">Description</p>
          <h2 id="desc-titre">${p.sousTitre || `${p.nom} à Mandelieu – Théoule`}</h2>
          ${paras(p.texte)}
          ${p.encart ? `<div class="encart"><h3>${p.encart.titre}</h3><p>${p.encart.texte}</p></div>` : ""}
        </div>
        <div>
          ${p.points ? `<div class="panel"><h3>${p.pointsTitre || "Bon à savoir"}</h3><ul class="ticks" style="margin:14px 0 0">${p.points.map((x) => `<li>${x}</li>`).join("")}</ul></div>` : ""}
          ${p.comment ? `<div class="panel" style="margin-top:20px"><h3>Comment ça marche ?</h3><ul class="ticks" style="margin:14px 0 0">${p.comment.map((x) => `<li>${x}</li>`).join("")}</ul></div>` : ""}
          ${!p.points && !p.comment && vignettes[0] ? `<div class="split__media">${pic(vignettes[0], { sizes: "(min-width:860px) 45vw, 100vw" })}</div>` : ""}
        </div>
      </div>
      ${p.destinations ? `<div class="panels">${p.destinations.map((d) => `<div class="panel"><h3>${d.titre}</h3><p>${d.texte}</p></div>`).join("")}</div>` : ""}
      ${grilleFeats(GARANTIES, { cls: "grid-feats--3" })}
      <p class="note"><a class="linkbtn" href="${pageCat}">Tout savoir sur ${cat.nom.toLowerCase()}</a> · <a class="linkbtn" href="/nos-tarifs/">Voir tous nos tarifs</a></p>
    </section>

    <section class="section section--tight" aria-labelledby="similaires-titre">
      <p class="eyebrow">À découvrir aussi</p>
      <h2 class="h2" id="similaires-titre">${similaires.length ? "Produits similaires" : "Nos best sellers"}</h2>
      ${grilleProduits(autres)}
    </section>

    ${duoConfiance()}
    ${blocContact()}`;

  const schema = {
    "@type": "Product",
    "@id": `${site.domaine}${urlProduit(p)}#produit`,
    name: p.nom,
    description: p.description,
    image: p.images.map((i) => site.domaine + urlImage(i, 1024)),
    category: cat.nom,
    brand: { "@type": "Brand", name: site.nom },
    offers: {
      "@type": "Offer",
      url: site.domaine + urlProduit(p),
      price: p.prix,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@id": idEntreprise },
    },
    ...(p.note ? { aggregateRating: { "@type": "AggregateRating", ratingValue: p.note.valeur, reviewCount: p.note.nombre, bestRating: 5, worstRating: 1 } } : {}),
  };

  return {
    url: urlProduit(p),
    title: p.title,
    description: p.description,
    image: principale,
    fil,
    corps,
    schema,
    ogType: "product",
    mcta: { href: "#resa", label: "Réserver" },
    // Le calendrier Resamare (≈ 400 ko de JS tiers) est chargé par app.js à
    // l'approche de son affichage, pas au chargement de la page.
    scripts: p.resaId && !p.telephone ? `<link rel="preconnect" href="https://webservice.lagenza.fr"><link rel="preconnect" href="https://mandelieu-watersports.resactivity.com">` : "",
  };
}
