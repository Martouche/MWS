// Fiche produit /produit/<slug>/ : galerie, prix, calendrier Resamare, description.
import { site, resamare } from "../../content/site.mjs";
import { tousProduits, categorie } from "../../content/produits.mjs";
import { t, u } from "../langue.mjs";
import { esc, ico, pic, paras, eur, urlImage, sources } from "../html.mjs";
import { filAriane, etoiles, grilleProduits, grilleFeats, duoConfiance, blocContact, urlProduit } from "../composants.mjs";
import { idEntreprise } from "../layout.mjs";
import { icone } from "../icones.mjs";

const garanties = () => [
  [t("Transaction 100 % sécurisée", "100% secure payment"), t("Payez un acompte ou l’intégralité de votre activité en ligne.", "Pay a deposit or the full price of your activity online."), "cadenas"],
  [t("Réservez votre créneau", "Book your slot"), t("Choisissez votre date dans le calendrier ou appelez-nous pour planifier votre activité.", "Pick your date in the calendar or call us to plan your activity."), "calendrier"],
  [t("100 % remboursable", "100% refundable"), t("Uniquement en cas de conditions météorologiques défavorables ou sur présentation d’un certificat médical.", "Only in case of bad weather or on presentation of a medical certificate."), "remboursement"],
];

export function fiche(p) {
  const cat = categorie(p.categorie);
  const pageCat = u(cat.page.split("#")[0]);
  const fil = [
    { nom: t("Accueil", "Home"), url: u("/") },
    { nom: cat.nom, url: pageCat },
    { nom: p.nom, url: urlProduit(p) },
  ];
  const produits = tousProduits();
  const similaires = produits.filter((x) => x.categorie === p.categorie && x.slug !== p.slug).slice(0, 3);
  const autres = similaires.length ? similaires : produits.filter((x) => x.bestSeller && x.slug !== p.slug).slice(0, 3);
  const [principale, ...vignettes] = p.images;
  const infos = [p.age, p.dureeTexte, p.horaires].filter(Boolean);

  const reservation = p.resaId && !p.telephone
    ? `<div class="resa" id="resa" data-resa-src="${resamare.script}">
            <p class="resa__titre">${t("Réserver en ligne", "Book online")}</p>
            <p class="resa__info">${t("Choisissez votre créneau et réglez un acompte sécurisé : le solde se règle sur place le jour de l’activité. Sous réserve de disponibilité de la base nautique.", "Choose your slot and pay a secure deposit: the balance is paid on site on the day. Subject to availability.")}</p>
            <div class="resamare-widget-calendar" data-api="${resamare.api}" data-titre-masquer="true" data-produit-id="${p.resaId}" data-calendrier-ouvrir data-couleur-principale="${resamare.couleur}" data-couleur-complementaire="#ffffff"></div>
            <noscript><p>${t("Activez JavaScript pour réserver en ligne, ou appelez-nous au", "Enable JavaScript to book online, or call us on")} ${site.telephoneAffiche}.</p></noscript>
          </div>`
    : `<div class="resa" id="resa">
            <p class="resa__titre">${t("Réservation par téléphone", "Booking by phone")}</p>
            <p class="resa__info">${t("Cette activité se réserve directement auprès de notre équipe : appelez-nous pour choisir votre créneau.", "This activity is booked directly with our team: call us to choose your slot.")}</p>
            <a class="btn btn--primary" href="tel:${site.telephone}">${icone("telephone", "ico ico--tel")} ${t("Appel direct", "Call us")} · ${t(site.telephoneAffiche, "+33 " + site.telephoneAffiche.slice(1))}</a>
          </div>`;

  const corps = `
    <section class="pdp" aria-labelledby="produit-titre">
      <div class="pdp__gallery">
        <div class="pdp__main" data-galerie>${pic(principale, { priorite: true, sizes: "(min-width:860px) 55vw, 100vw", largeur: 768, recadrage: 16 / 11 })}</div>
        ${p.images.length > 1 ? `<ul class="pdp__thumbs" aria-label="${t("Photos : cliquez pour agrandir", "Photos: click to enlarge")}">${p.images.map((v, k) => {
          const s = sources(v);
          return `<li><button type="button" class="pdp__thumb${k ? "" : " is-active"}" aria-pressed="${k === 0}" aria-label="${t("Afficher la photo", "Show photo")} ${k + 1} : ${esc(s.alt)}" data-avif="${s.avif}" data-webp="${s.webp}" data-src="${s.src}" data-alt="${esc(s.alt)}" data-w="${s.w}" data-h="${s.h}">${pic(v, { sizes: "(min-width:860px) 220px, 30vw", largeur: 480, alt: "", recadrage: 4 / 3 })}</button></li>`;
        }).join("")}</ul>` : ""}
      </div>
      <div class="pdp__card">
        ${filAriane(fil)}
        <p class="kicker">${cat.nom}</p>
        <h1 id="produit-titre">${p.nom}</h1>
        ${etoiles(p.note)}
        <p class="price"><strong>${eur(p.prix)}</strong><span>${t("Prix", "Price")} ${p.unite}</span></p>
        <p class="lead">${p.accroche}</p>
        ${infos.length ? `<ul class="ticks">${infos.map((i) => `<li>${i}</li>`).join("")}${p.categorie === "jetski" || p.categorie === "randonnee" ? t("<li>Pièces d’identité obligatoires</li><li>Seul ou à deux sur le jet ski, même tarif</li>", "<li>ID required</li><li>Alone or for two on the jet ski, same price</li>") : ""}</ul>` : ""}
        ${reservation}
        <div class="phone-box">
          ${ico.tel}
          <div>
            <p>${t("Vous préférez réserver par téléphone ? Nous bloquons votre créneau immédiatement.", "Prefer to book by phone? We reserve your slot straight away.")}</p>
            <a href="tel:${site.telephone}">${t(site.telephoneAffiche, "+33 " + site.telephoneAffiche.slice(1))}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section pdp__desc" aria-labelledby="desc-titre">
      <div class="split">
        <div>
          <p class="eyebrow">Description</p>
          <h2 id="desc-titre">${p.sousTitre || t(`${p.nom} à Mandelieu – Théoule`, `${p.nom} in Mandelieu, near Cannes`)}</h2>
          ${paras(p.texte)}
          ${p.encart ? `<div class="encart"><h3>${p.encart.titre}</h3><p>${p.encart.texte}</p></div>` : ""}
        </div>
        <div>
          ${p.points ? `<div class="panel"><h3>${p.pointsTitre || t("Bon à savoir", "Good to know")}</h3><ul class="ticks" style="margin:14px 0 0">${p.points.map((x) => `<li>${x}</li>`).join("")}</ul></div>` : ""}
          ${p.comment ? `<div class="panel" style="margin-top:20px"><h3>${t("Comment ça marche ?", "How does it work?")}</h3><ul class="ticks" style="margin:14px 0 0">${p.comment.map((x) => `<li>${x}</li>`).join("")}</ul></div>` : ""}
          ${!p.points && !p.comment && vignettes[0] ? `<div class="split__media">${pic(vignettes[0], { sizes: "(min-width:860px) 45vw, 100vw", recadrage: 4 / 3 })}</div>` : ""}
        </div>
      </div>
      ${p.destinations ? `<div class="panels">${p.destinations.map((d) => `<div class="panel"><h3>${d.titre}</h3><p>${d.texte}</p></div>`).join("")}</div>` : ""}
      ${grilleFeats(garanties(), { cls: "grid-feats--3" })}
      <p class="note"><a class="linkbtn" href="${pageCat}">${t("Tout savoir sur", "All about")} ${cat.nom.toLowerCase()}</a> · <a class="linkbtn" href="${u("/nos-tarifs/")}">${t("Voir tous nos tarifs", "See all our prices")}</a></p>
    </section>

    <section class="section section--tight" aria-labelledby="similaires-titre">
      <p class="eyebrow">${t("À découvrir aussi", "You may also like")}</p>
      <h2 class="h2" id="similaires-titre">${similaires.length ? t("Produits similaires", "Similar activities") : t("Nos best sellers", "Our best sellers")}</h2>
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
    mcta: { href: "#resa", label: t("Réserver", "Book") },
    reservation: "#resa",
    // Le calendrier Resamare (≈ 400 ko de JS tiers) est chargé par app.js à
    // l'approche de son affichage, pas au chargement de la page.
    scripts: p.resaId && !p.telephone ? `<link rel="preconnect" href="https://webservice.lagenza.fr"><link rel="preconnect" href="https://mandelieu-watersports.resactivity.com">` : "",
  };
}
