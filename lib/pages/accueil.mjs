// Page d'accueil — reproduction fidèle du fichier de style validé.
import { site } from "../../content/site.mjs";
import { produits } from "../../content/produits.mjs";
import { ico, pic, urlImage } from "../html.mjs";
import { icone } from "../icones.mjs";
import { packsDuo, bestSellers, bandeauPacks, duoConfiance, blocContact, videoFond, sectionZone } from "../composants.mjs";

// Diapositives du hero. `video` (facultatif) : clé d'une vidéo de assets/videos/,
// jouée en fond (autoplay, muet, en boucle, sans contrôles) par-dessus la photo,
// qui sert d'affiche et d'image de repli. Ex. : { img: "…", label: "…", video: "video-accueil" }
const SLIDES = [
  { img: "jet-ski-randonnee-groupe", label: "Jet ski" },
  { img: "parachute-ascensionnel-mandelieu", label: "Parachute ascensionnel" },
  { img: "bouee-tractee-groupe", label: "Bouée tractée" },
  { img: "ski-nautique", label: "Session glisse" },
];

const CARTES = [
  {
    img: "jet-ski-location-couple",
    href: "/location-jet-ski/",
    titre: "Location Jet Ski",
    alt: "Location de jet ski sans permis à Mandelieu, entre Cannes et Théoule-sur-Mer",
    desc: ["Pas besoin de permis : après un briefing, prenez les commandes seul ou à deux pour 30 min, 45 min ou 1 h de navigation libre dans le golfe de la Napoule. Carburant, équipement et assurance inclus."],
    inset: "jet-ski-duo-baie",
  },
  {
    img: "jet-ski-portrait",
    href: "/randonnee-jet-ski/",
    titre: "Randonnée Jet Ski",
    alt: "Randonnée en jet ski sans permis au départ de Mandelieu, vers la baie de Cannes",
    desc: ["À la recherche de liberté et d’adrénaline ? Nos jet skis sans permis vous feront vivre des sensations incroyables, en randonnée vers l’Esterel et les îles de Lérins ou en navigation libre dans la baie de Mandelieu."],
    inset: "jet-ski-coucher-soleil",
  },
  {
    img: "parachute-pilote",
    href: "/parachute-ascensionnel/",
    titre: "Parachute Ascensionnel",
    alt: "Pilote de parachute ascensionnel surveillant un vol au-dessus de la baie de Mandelieu",
    desc: ["Envolez-vous pour de nouvelles sensations et admirez un panorama à 360°. Entre ciel et mer, vous découvrirez la baie de Mandelieu comme vous ne l’avez jamais vue !"],
    inset: "parachute-ascensionnel-mandelieu",
  },
  {
    img: "bouee-tractee-mer",
    href: "/bouee-tractee/",
    titre: "Bouée Tractée",
    alt: "Bouée tractée et canapé tracté au large de Mandelieu, près de Cannes",
    desc: ["Vous voulez des fous rires et des frissons garantis dans un cadre idyllique ? La bouée tractée ne déçoit jamais…"],
    inset: "bouee-tractee-joie",
  },
  {
    img: "ski-nautique-enfant",
    href: "/wakeboard/",
    titre: "Wakeboard &amp; Ski Nautique",
    alt: "Ski nautique tracté par bateau entre Théoule-sur-Mer et Cannes",
    desc: [
      "<strong>Wakeboard —</strong> Vous souhaitez devenir un pro de la glisse ? Découvrez le wakeboard pour des sensations incroyables et uniques dans la baie de Mandelieu !",
      "<strong>Ski nautique —</strong> Le sport de glisse le plus rapide à assimiler, dès le plus jeune âge, avec un moniteur diplômé d’État.",
    ],
  },
];

const RESA = [
  {
    onglet: "Jet Ski",
    img: "jet-ski-duo-baie",
    badge: "Encadré par des moniteurs",
    titre: "Réservez votre jet ski",
    lead: "Venez faire du jet ski entre amis, en famille, en couple et tout ça sans permis !",
    feats: [
      ["jetski", "On met les gaz !", "Pour les sportifs, vient le moment de mettre les gaz tout en sécurité."],
      ["adrenaline", "Sensations fortes", "Pour les amateurs de sensations fortes et de randonnées."],
    ],
    cta: [["/randonnee-jet-ski/", "Découvrir la randonnée jet ski"], ["/location-jet-ski/", "Location Jet Ski"]],
  },
  {
    onglet: "Parachute ascensionnel",
    img: "parachute-trois-amies",
    badge: "Dès 3 ans · jusqu’à 5 personnes",
    titre: "Réservez votre vol en parachute ascensionnel",
    lead: "Envolez-vous dès 3 ans et jusqu’à 5 personnes en même temps sous la voile du parachute ascensionnel.",
    feats: [
      ["bouclier", "Un vol en toute sécurité", "Notre équipe de professionnels vous équipe du matériel nécessaire pour un vol en toute sécurité."],
      ["etincelles", "Une expérience magique", "Vivez une expérience inégalée en toute sécurité dans la baie de Mandelieu, Théoule."],
    ],
    cta: [["/parachute-ascensionnel/", "Découvrir le parachute ascensionnel"]],
  },
  {
    onglet: "Bouée tractée",
    img: "bouee-tractee-joie",
    badge: "En couple, en famille ou entre amis",
    titre: "Réservez votre tour de bouée tractée",
    lead: "Faites un tour de bouée tractée en couple, en famille ou entre amis. Disponible sans réservation : venez directement nous voir !",
    feats: [
      ["groupe", "Jusqu’à 8 personnes", "Choisissez la bouée que vous préférez en arrivant, jusqu’à 8 personnes en même temps."],
      ["vitesse", "Vitesse adaptée pour votre sécurité", "Notre équipe de professionnels vous conduit à votre allure, en toute sécurité."],
    ],
    cta: [["/bouee-tractee/", "Découvrir la bouée tractée"]],
  },
  {
    onglet: "Session glisse",
    img: "ski-nautique",
    badge: "Sessions le matin, mer calme",
    titre: "Réservez votre session glisse",
    lead: "Nous proposons des sessions de wakeboard, de wakesurf et de ski nautique dans la baie de Mandelieu. Débutant ou pro de la glisse, venez mettre vos compétences à l’œuvre dans un cadre magique !",
    feats: [
      ["glisse", "Des sensations uniques", "Le ski nautique et le wakeboard procurent des sensations de glisse incroyables. Les sessions sont privilégiées le matin, sur une mer calme !"],
      ["conseil", "Des conseils de qualité", "Votre pilote est un vrai pro de la glisse : il vous donne les clés pour sortir de l’eau et maîtriser de nouveaux tricks."],
    ],
    cta: [["/ski-nautique/", "Ski nautique"], ["/wakeboard/", "Wakeboard"]],
    avant: "Vous êtes plutôt …",
  },
];

export function accueil() {
  const slides = SLIDES.map((s, i) => `<figure class="hero__slide${i ? "" : " is-active"}" id="slide-${i + 1}" role="tabpanel" aria-labelledby="tab-${i + 1}">
          ${pic(s.img, { priorite: i === 0, differe: i > 0, sizes: "100vw", largeur: 1024 })}
          ${s.video ? videoFond(s.video) : ""}
        </figure>`).join("\n        ");

  const onglets = SLIDES.map((s, i) => `<button class="tab" role="tab" id="tab-${i + 1}" aria-controls="slide-${i + 1}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}">
            <img src="${urlImage(s.img, 160)}" width="64" height="44" loading="lazy" decoding="async" alt="">
            <span class="tab__label">${s.label}</span>
          </button>`).join("\n          ");

  const cartes = CARTES.map((c) => `<li class="card">
          ${pic(c.img, { cls: "card__bg", sizes: "(min-width:1100px) 50vw, (min-width:640px) 50vw, 100vw", largeur: 768, recadrage: 0.9, alt: c.alt })}
          <a class="card__link" href="${c.href}">
            <h3 class="card__title">${c.titre}</h3>
            <span class="card__arrow" aria-hidden="true">${ico.flecheCarte}</span>
            ${c.desc.map((d) => `<p class="card__desc">${d}</p>`).join("\n            ")}
          </a>
          ${c.inset ? `<div class="card__inset" aria-hidden="true">${pic(c.inset, { sizes: "(min-width:640px) 150px, 30vw", largeur: 320, alt: "" })}</div>` : ""}
        </li>`).join("\n        ");

  const resaOnglets = RESA.map((r, i) => `<button class="btab" role="tab" id="bt-${i + 1}" aria-controls="bp-${i + 1}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}">${r.onglet}</button>`).join("\n        ");
  const resaPanneaux = RESA.map((r, i) => `<div class="bpanel" role="tabpanel" id="bp-${i + 1}" aria-labelledby="bt-${i + 1}" tabindex="0"${i ? " hidden" : ""}>
        <div class="bpanel__media">
          ${pic(r.img, { sizes: "(min-width:860px) 42vw, 100vw", largeur: 768, recadrage: 1 })}
          <span class="bpanel__badge">${r.badge}</span>
        </div>
        <div>
          <h2>${r.titre}</h2>
          <p class="lead">${r.lead}</p>
          <ul class="feats">
            ${r.feats.map(([p, t, d]) => `<li class="feat"><span class="feat__ico">${icone(p)}</span>
              <div><h3>${t}</h3><p>${d}</p></div></li>`).join("\n            ")}
          </ul>
          <div class="bpanel__cta">
            ${r.avant ? `<small>${r.avant}</small>` : ""}
            ${r.cta.map(([h, l], j) => `<a class="btn btn--${j ? "ghost" : "primary"}" href="${h}">${l}${j ? "" : " " + ico.fleche}</a>`).join("\n            ")}
          </div>
        </div>
      </div>`).join("\n\n      ");

  const corps = `
    <section class="hero" id="hero" aria-roledescription="carrousel" aria-labelledby="hero-title">
      <div class="hero__slides">
        ${slides}
      </div>

      <div class="hero__content">
        <p class="hero__kicker">Faites le plein de sensations sur la Côte d’Azur !</p>
        <h1 class="hero__title" id="hero-title">Jet ski & parachute ascensionnel à Mandelieu Théoule</h1>
        <p class="hero__tagline">Plage de la Rague<span>·</span>Mandelieu</p>
      </div>

      <button class="hero__arrow hero__arrow--prev" type="button" data-action="prev" aria-label="Activité précédente">${ico.prec}</button>
      <button class="hero__arrow hero__arrow--next" type="button" data-action="next" aria-label="Activité suivante">${ico.suiv}</button>

      <div class="tabbar">
        <div class="tabs" role="tablist" aria-label="Choisir une activité">
          ${onglets}
        </div>
      </div>

      <svg class="hero__wave" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0,40 C180,95 420,110 720,100 C1020,90 1260,60 1440,0 V110 H0 Z"/>
      </svg>
    </section>

    <section class="activities" id="activites" aria-labelledby="activities-title">
      <div class="activities__head">
        <div>
          <p class="eyebrow">Nos activités</p>
          <h2 class="h2" id="activities-title">Nos activités nautiques entre Cannes et Théoule-sur-Mer</h2>
        </div>
        <div>
          <p class="lead">Nous vous proposons dans une ambiance conviviale, en exclusivité sur Mandelieu, le parachute ascensionnel. À proximité de Théoule, venez profiter de toutes nos activités : parachute ascensionnel, jet ski, bouée &amp; canapé tracté, wakeboard, wakesurf et ski nautique.</p>
          <a href="/nos-tarifs/" class="btn btn--ghost">Voir nos tarifs ${ico.fleche}</a>
        </div>
      </div>

      <ul class="cards">
        ${cartes}
      </ul>

      <div class="extra">
        <div class="extra__video extra__media">${pic("jet-ski-groupe-baie", { sizes: "(min-width:860px) 55vw, 100vw" })}</div>
        <div>
          <p class="eyebrow">Plus que du parachute</p>
          <h3>Découvrez toutes nos activités en plus du parachute</h3>
          <p>Nous proposons toutes sortes d’activités en plus du parachute ascensionnel. Louez des jet skis ou venez faire des randonnées avec nous pour voir les plus beaux endroits de la Côte d’Azur.</p>
          <p>Faites-vous plaisir en vous faisant tirer derrière nos bateaux avec la bouée tractée ou le canapé tracté (moins sportif).</p>
          <p>Pour les aventuriers de nouvelles sensations, glissez sur l’eau avec le wakeboard !</p>
        </div>
      </div>
    </section>

    <section class="section" id="packs" aria-labelledby="packs-title">
      <p class="eyebrow">Nos packs</p>
      <h2 class="h2" id="packs-title">Vous n’arrivez pas à vous décider ?</h2>
      <p class="lead">Nos <strong>packs</strong> vous permettront de combiner les activités au <strong>meilleur prix</strong> !</p>
      ${packsDuo()}
      ${bestSellers()}
    </section>

    <section class="booking" id="reserver" aria-labelledby="booking-title">
      <p class="eyebrow" id="booking-title">Réservez votre activité</p>
      <div class="btabs" role="tablist" aria-label="Activités à réserver">
        ${resaOnglets}
      </div>

      ${resaPanneaux}
    </section>

    ${bandeauPacks()}
    ${sectionZone("accueil")}
    ${duoConfiance()}
    ${blocContact()}`;

  return {
    url: "/",
    title: "Jet Ski & Parachute Ascensionnel Mandelieu, Cannes, Théoule",
    description: "Base nautique de Mandelieu-la-Napoule, à 15 min de Cannes et 5 min de Théoule : jet ski sans permis, parachute ascensionnel, bouée. Réservez en ligne !",
    image: "parachute-ascensionnel-mandelieu",
    corps,
  };
}
