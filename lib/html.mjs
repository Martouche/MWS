// Petits utilitaires de génération HTML : échappement, images responsives, icônes.
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { medias, logos } from "./medias.mjs";

const racine = dirname(dirname(fileURLToPath(import.meta.url)));
const cheminManifeste = join(racine, "assets", "images", "manifest.json");

/** Dimensions réelles produites par tools/medias.mjs. */
export const manifeste = existsSync(cheminManifeste)
  ? JSON.parse(readFileSync(cheminManifeste, "utf8"))
  : {};

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const eur = (n) => `${n}€`;

const IMG = "/assets/images";

function infos(cle) {
  const m = manifeste[cle];
  if (!m) throw new Error(`Média inconnu ou non généré : « ${cle} » (lancer node tools/medias.mjs)`);
  return m;
}

/** Plus petite variante ≥ largeur visée (sinon la plus grande). */
export function urlImage(cle, largeur = 1024, format = "webp") {
  const m = infos(cle);
  const l = m.largeurs.find((x) => x >= largeur) || m.largeurs[m.largeurs.length - 1];
  return `${IMG}/${cle}-${l}.${format}`;
}

export const altDe = (cle) => medias[cle]?.alt ?? "";

/**
 * <picture> AVIF + WebP avec srcset complet et dimensions explicites (CLS = 0).
 * @param {string} cle
 * @param {{sizes?:string, alt?:string, cls?:string, priorite?:boolean, largeur?:number}} o
 *   priorite : image au-dessus de la ligne de flottaison (pas de lazy, fetchpriority=high)
 *   largeur  : largeur de la variante par défaut du src
 */
export function pic(cle, o = {}) {
  const m = infos(cle);
  const sizes = o.sizes || "100vw";
  const set = (f) => m.largeurs.map((l) => `${IMG}/${cle}-${l}.${f} ${l}w`).join(", ");
  const alt = o.alt ?? altDe(cle);
  const hauteur = Math.round((m.h * m.largeurs[m.largeurs.length - 1]) / m.w);
  const attrs = [
    `src="${urlImage(cle, o.largeur || 768)}"`,
    `width="${m.largeurs[m.largeurs.length - 1]}" height="${hauteur}"`,
    `alt="${esc(alt)}"`,
    o.cls ? `class="${o.cls}"` : "",
    o.priorite ? `fetchpriority="high" decoding="async"` : `loading="lazy" decoding="async"`,
  ].filter(Boolean).join(" ");
  if (o.differe) {
    // Chargée par app.js après l'affichage initial (diapositives cachées du carrousel).
    return `<picture><source type="image/avif" data-srcset="${set("avif")}" sizes="${sizes}"><source type="image/webp" data-srcset="${set("webp")}" sizes="${sizes}"><img ${attrs.replace(/^src=/, "data-src=")}></picture>`;
  }
  return `<picture><source type="image/avif" srcset="${set("avif")}" sizes="${sizes}"><source type="image/webp" srcset="${set("webp")}" sizes="${sizes}"><img ${attrs}></picture>`;
}

/** Pictogramme rond 56 px (.feat img). */
export function picto(cle) {
  return `<img src="${IMG}/${cle}.webp" width="56" height="56" loading="lazy" decoding="async" alt="">`;
}

/** Logo PNG/WebP à hauteur donnée. */
export function logo(cle, hauteur, o = {}) {
  const m = infos(cle);
  const largeur = Math.round((m.w * hauteur) / m.h);
  const alt = o.alt ?? logos[cle]?.alt ?? "";
  return `<picture><source type="image/webp" srcset="${IMG}/${cle}.webp"><img src="${IMG}/${cle}.png" width="${largeur}" height="${hauteur}" alt="${esc(alt)}"${o.priorite ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}></picture>`;
}

// --- Icônes (reprises du fichier de style) ---------------------------------
export const ico = {
  fleche: `<svg class="ico" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 9h12M10 4l5 5-5 5"/></svg>`,
  flecheCarte: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 8h12M9 3l5 5-5 5"/></svg>`,
  chev: `<svg class="chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5"/></svg>`,
  prec: `<svg class="ico" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M11 4L6 9l5 5"/></svg>`,
  suiv: `<svg class="ico" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 4l5 5-5 5"/></svg>`,
  tel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  etoiles: `<svg viewBox="0 0 84 16" fill="currentColor" aria-hidden="true">${[0, 1, 2, 3, 4].map((i) => `<path transform="translate(${i * 17} 0)" d="M8 .8l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L.8 6.1l5-.7z"/>`).join("")}</svg>`,
};

/** Bouton lien avec flèche. */
export const btn = (href, label, variante = "primary", attrs = "") =>
  `<a class="btn btn--${variante}" href="${href}"${attrs ? " " + attrs : ""}>${label} ${ico.fleche}</a>`;

/** Paragraphes. */
export const paras = (liste = [], cls = "") => liste.map((t) => `<p${cls ? ` class="${cls}"` : ""}>${t}</p>`).join("\n");
