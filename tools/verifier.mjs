#!/usr/bin/env node
// Contrôles avant mise en ligne : node build.mjs && node tools/verifier.mjs
//  1. chaque URL des anciens sitemaps existe encore ou est redirigée en 301
//  2. title, description, canonical, un seul H1 par page
//  3. 100 % des images avec alt, width et height ; hero sans lazy
//  4. liens internes et ressources existants
//  5. JSON-LD valide
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { redirections } from "../content/redirections.mjs";

const racine = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(racine, "dist");
let erreurs = 0, alertes = 0;
const ko = (m) => { erreurs++; console.log("  ✗ " + m); };
const warn = (m) => { alertes++; console.log("  ! " + m); };
const ok = (m) => console.log("  ✓ " + m);

async function fichiers(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await fichiers(p, out); else out.push(p);
  }
  return out;
}
const urlDe = (f) => {
  const r = "/" + relative(dist, f).split("\\").join("/");
  return r.endsWith("/index.html") ? r.slice(0, -10) : r;
};
const redirige = (u) => redirections.some(([de]) => (de.endsWith("*") ? u.startsWith(de.slice(0, -1)) : u === de));

const htmls = (await fichiers(dist)).filter((f) => f.endsWith(".html"));
const urls = new Set(htmls.map(urlDe));

// 1. -----------------------------------------------------------------------------
console.log("\n1. URLs de l'ancien site (sitemaps Yoast)");
const anciennes = JSON.parse(await readFile(join(racine, "scrape", "urls.json"), "utf8"));
let conservees = 0, redirigees = 0;
const titresAnciens = new Map();
for (const { url } of anciennes) {
  const u = new URL(url).pathname;
  if (urls.has(u)) conservees++;
  else if (redirige(u)) redirigees++;
  else ko(`${u} — ni conservée ni redirigée : perte de référencement`);
  const f = join(racine, "scrape", "pages", (u.replace(/^\/|\/$/g, "").replace(/\//g, "__") || "accueil") + ".json");
  if (existsSync(f)) titresAnciens.set(u, JSON.parse(await readFile(f, "utf8")).seo);
}
ok(`${conservees} URLs conservées à l'identique, ${redirigees} redirigées en 301`);

// 2-5. ------------------------------------------------------------------------------
console.log("\n2. Balises SEO, images, liens, données structurées");
const vus = new Map();
let nImg = 0, titresModifies = [];
for (const f of htmls) {
  const html = await readFile(f, "utf8");
  const u = urlDe(f);
  const titre = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (!titre) ko(`${u} — pas de <title>`); else if (titre.length > 70) warn(`${u} — title de ${titre.length} caractères`);
  if (!desc) ko(`${u} — pas de meta description`); else if (desc.length > 170) warn(`${u} — description de ${desc.length} caractères`);
  if (!canon && u !== "/404.html") ko(`${u} — pas de canonical`);
  if (h1 !== 1) ko(`${u} — ${h1} H1`);
  if (vus.has(titre)) warn(`title dupliqué : ${vus.get(titre)} et ${u}`); else vus.set(titre, u);
  const ancien = titresAnciens.get(u);
  if (ancien && ancien.title && ancien.title.replace(/&#039;/g, "'").replace(/&amp;/g, "&") !== titre.replace(/&#039;/g, "'").replace(/&amp;/g, "&")) titresModifies.push(`${u}\n      avant : ${ancien.title}\n      après : ${titre}`);

  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    nImg++;
    if (!/\balt="/.test(img)) ko(`${u} — image sans alt : ${img.slice(0, 90)}`);
    if (!/\bwidth="\d+"/.test(img) || !/\bheight="\d+"/.test(img)) ko(`${u} — image sans dimensions : ${img.slice(0, 90)}`);
  }
  const heroImg = (html.match(/<(?:section class="hero[^"]*"|div class="pdp__main")[\s\S]*?<img\b[^>]*>/) || [])[0];
  if (heroImg && !/fetchpriority="high"/.test(heroImg.slice(heroImg.lastIndexOf("<img")))) ko(`${u} — image principale sans fetchpriority="high"`);

  for (const [, lien] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const cible = lien.endsWith("/") ? join(dist, lien, "index.html") : join(dist, lien);
    if (!existsSync(cible) && !redirige(lien)) ko(`${u} — lien ou ressource cassé : ${lien}`);
  }
  for (const [, s] of html.matchAll(/(?:srcset)="([^"]*)"/g)) {
    for (const part of s.split(",")) {
      const src = part.trim().split(/\s+/)[0];
      if (src.startsWith("/") && !existsSync(join(dist, src))) ko(`${u} — image manquante : ${src}`);
    }
  }
  for (const [, j] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(j); } catch { ko(`${u} — JSON-LD invalide`); }
  }
}
ok(`${htmls.length} pages, ${nImg} images contrôlées (alt + dimensions)`);

console.log("\n3. Titles modifiés par rapport à l'ancien site (à valider)");
titresModifies.forEach((t) => console.log("  · " + t));
if (!titresModifies.length) ok("aucun");

console.log(`\n${erreurs ? "✗" : "✓"} ${erreurs} erreur(s), ${alertes} alerte(s)\n`);
process.exit(erreurs ? 1 : 0);
