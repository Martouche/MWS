// ---------------------------------------------------------------------------
// Langue de rendu. build.mjs génère d'abord le site français, puis la version
// anglaise (/en/…) en basculant L.code. Les gabarits écrivent leurs textes avec
// t("français", "English") et leurs liens avec u("/url-francaise/").
//
// Le contenu anglais (content/en.mjs) ne contient que les textes : il est fusionné
// sur le contenu français (prix, images, identifiants Resamare restent communs).
// ---------------------------------------------------------------------------
import { URLS_EN } from "../content/en.mjs";

export const L = { code: "fr" };
export const estEn = () => L.code === "en";

/** Texte selon la langue courante. */
export const t = (fr, en) => (L.code === "en" ? en : fr);

/** Correspondances FR → EN et EN → FR des pages traduites. */
const VERS_FR = Object.fromEntries(Object.entries(URLS_EN).map(([fr, en]) => [en, fr]));
export const urlEn = (fr) => URLS_EN[fr];
export const urlFr = (en) => VERS_FR[en];

/**
 * Lien interne dans la langue courante. En anglais, une page sans traduction
 * garde son URL française (pages légales, événements, guides…).
 */
export function u(url) {
  if (L.code !== "en" || !url.startsWith("/")) return url;
  const [base, ancre] = url.split("#");
  const en = URLS_EN[base];
  return en ? en + (ancre ? "#" + ancre : "") : url;
}

/** Format de date et de nombres. */
export const locale = () => (L.code === "en" ? "en-GB" : "fr-FR");

/**
 * Fusion profonde du contenu traduit sur le contenu français :
 * objets fusionnés clé par clé, tableaux élément par élément avec la longueur
 * du tableau anglais (il fixe le nombre de paragraphes, d'items… ; les tuples
 * [titre, texte, pictogramme] se traduisent donc en entier), valeurs simples
 * remplacées quand la traduction les définit.
 */
export function fusion(fr, en) {
  if (en === undefined || en === null) return fr;
  if (Array.isArray(fr) && Array.isArray(en)) {
    return en.map((v, i) => fusion(fr[i], v));
  }
  if (fr && en && typeof fr === "object" && typeof en === "object" && !Array.isArray(fr) && !Array.isArray(en)) {
    const out = { ...fr };
    for (const [k, v] of Object.entries(en)) out[k] = fusion(fr[k], v);
    return out;
  }
  return en;
}
