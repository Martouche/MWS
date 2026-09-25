#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Aspiration du WordPress actuel de mandelieu-watersports.com.
//
//   node tools/scraper.mjs
//
// Lit les sitemaps Yoast, télécharge chaque page, et produit :
//   scrape/raw/<slug>.html     HTML brut (ignoré par git)
//   scrape/pages/<slug>.json   metas SEO + contenu structuré (versionné : c'est
//                              la mémoire de l'ancien site, utile pour vérifier
//                              qu'aucun title/description n'a été perdu)
//   scrape/medias.json         inventaire de toutes les images/vidéos trouvées
//   scrape/urls.json           toutes les URLs de l'ancien site
// ---------------------------------------------------------------------------
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const racine = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(racine, "scrape");
const ORIGINE = "https://www.mandelieu-watersports.com";
const SITEMAPS = ["page-sitemap.xml", "product-sitemap.xml", "product_cat-sitemap.xml"];
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36";

const slugDe = (u) => new URL(u).pathname.replace(/^\/|\/$/g, "").replace(/\//g, "__") || "accueil";
const net = (s = "") => s.replace(/\s+/g, " ").trim();

async function get(url) {
  const r = await fetch(url, { headers: { "user-agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  return { html: await r.text(), final: r.url };
}

async function lireSitemaps() {
  const urls = [];
  for (const s of SITEMAPS) {
    const { html } = await get(`${ORIGINE}/${s}`);
    const $ = cheerio.load(html, { xmlMode: true });
    $("url").each((_, el) => {
      urls.push({
        url: $(el).children("loc").text().trim(),
        lastmod: $(el).children("lastmod").text().trim(),
        sitemap: s,
      });
    });
  }
  return urls;
}

/** Normalise une URL d'image WordPress vers l'original (sans -768x437, -scaled). */
function original(src) {
  return src.replace(/-\d+x\d+(?=\.\w+$)/, "");
}

function extraire(html, url) {
  const $ = cheerio.load(html);
  const meta = (sel) => $(sel).attr("content") || "";

  const seo = {
    url,
    title: net($("title").first().text()),
    description: meta('meta[name="description"]'),
    robots: meta('meta[name="robots"]'),
    canonical: $('link[rel="canonical"]').attr("href") || "",
    og: {},
    jsonld: [],
  };
  $('meta[property^="og:"], meta[name^="twitter:"]').each((_, el) => {
    const k = $(el).attr("property") || $(el).attr("name");
    seo.og[k] = $(el).attr("content");
  });
  $('script[type="application/ld+json"]').each((_, el) => {
    try { seo.jsonld.push(JSON.parse($(el).text())); } catch {}
  });

  // Médias : toutes les sources, y compris srcset, data-lazy, fonds CSS et vidéos.
  const medias = new Map();
  const ajouter = (src, alt = "", type = "image") => {
    if (!src || src.startsWith("data:")) return;
    try { src = new URL(src, ORIGINE).href; } catch { return; }
    if (!/wp-content\/uploads/.test(src)) return;
    const cle = original(src.split("?")[0]);
    const m = medias.get(cle) || { src: cle, alts: new Set(), variantes: new Set(), type };
    if (alt) m.alts.add(net(alt));
    m.variantes.add(src);
    medias.set(cle, m);
  };
  $("img").each((_, el) => {
    const $el = $(el);
    const alt = $el.attr("alt") || "";
    for (const a of ["src", "data-src", "data-lazy-src", "data-lazyload"]) ajouter($el.attr(a), alt);
    for (const a of ["srcset", "data-srcset", "data-lazy-srcset"]) {
      ($el.attr(a) || "").split(",").forEach((p) => ajouter(p.trim().split(/\s+/)[0], alt));
    }
  });
  $("source").each((_, el) => {
    const t = $(el).attr("type") || "";
    ($(el).attr("srcset") || $(el).attr("src") || "").split(",").forEach((p) =>
      ajouter(p.trim().split(/\s+/)[0], "", t.startsWith("video") ? "video" : "image"));
  });
  $("video").each((_, el) => {
    ajouter($(el).attr("src"), "", "video");
    ajouter($(el).attr("poster"), "", "image");
  });
  // Revolution Slider et fonds en style inline
  for (const m of html.matchAll(/https?:\\?\/\\?\/[^"'()\s]+?wp-content\\?\/uploads\\?\/[^"'()\s]+?\.(?:jpe?g|png|webp|gif|svg|mp4|webm)/gi)) {
    ajouter(m[0].replace(/\\\//g, "/"), "", /\.(mp4|webm)$/i.test(m[0]) ? "video" : "image");
  }

  // Contenu : on retire l'habillage (header, footer, menus, scripts, popups)
  $("script, style, noscript, header, footer, nav, #wpadminbar, .cmplz-cookiebanner, #cmplz-cookiebanner-container, .ti-widget, .woocommerce-breadcrumb, form").remove();
  const racineContenu = $("main").length ? $("main") : $("#main, #content, .site-content, body").first();

  const blocs = [];
  const vus = new Set();
  racineContenu.find("h1,h2,h3,h4,h5,h6,p,li,img,a.button,a.vc_btn3,a.elementor-button,.price,.amount,blockquote,td,th").each((_, el) => {
    const $el = $(el);
    const tag = el.tagName.toLowerCase();
    if (tag === "img") {
      const src = $el.attr("data-lazy-src") || $el.attr("data-src") || $el.attr("src");
      if (src && !src.startsWith("data:")) blocs.push({ t: "img", src: original(new URL(src, ORIGINE).href), alt: $el.attr("alt") || "" });
      return;
    }
    // Éviter les doublons parent/enfant (li contenant p, etc.)
    if (tag === "li" && $el.find("p,li").length) return;
    const texte = net($el.text());
    if (!texte || texte.length < 2) return;
    const cle = tag[0] === "h" ? tag + texte : texte;
    if (vus.has(cle)) return;
    vus.add(cle);
    const bloc = { t: tag, x: texte };
    if (tag === "a") bloc.href = $el.attr("href");
    const lien = $el.find("a[href]").first().attr("href");
    if (lien && tag !== "a") bloc.href = lien;
    blocs.push(bloc);
  });

  return {
    seo,
    blocs,
    medias: [...medias.values()].map((m) => ({ ...m, alts: [...m.alts], variantes: [...m.variantes] })),
  };
}

async function main() {
  await mkdir(join(out, "raw"), { recursive: true });
  await mkdir(join(out, "pages"), { recursive: true });

  const urls = await lireSitemaps();
  console.log(`${urls.length} URLs dans les sitemaps`);
  await writeFile(join(out, "urls.json"), JSON.stringify(urls, null, 2));

  const inventaire = new Map();
  for (const { url } of urls) {
    const slug = slugDe(url);
    const brut = join(out, "raw", slug + ".html");
    let html, final = url;
    try {
      if (existsSync(brut)) html = await readFile(brut, "utf8");
      else {
        ({ html, final } = await get(url));
        await writeFile(brut, html);
      }
    } catch (e) {
      console.log(`  ✗ ${url} — ${e.message}`);
      continue;
    }
    const data = extraire(html, url);
    data.seo.redirigeVers = final !== url ? final : null;
    await writeFile(join(out, "pages", slug + ".json"), JSON.stringify(data, null, 2));
    for (const m of data.medias) {
      const e = inventaire.get(m.src) || { ...m, pages: [] };
      e.alts = [...new Set([...e.alts, ...m.alts])];
      e.pages.push(new URL(url).pathname);
      inventaire.set(m.src, e);
    }
    console.log(`  ✓ ${new URL(url).pathname}  — ${data.blocs.length} blocs, ${data.medias.length} médias  « ${data.seo.title} »`);
  }
  await writeFile(join(out, "medias.json"), JSON.stringify([...inventaire.values()], null, 2));
  console.log(`\n${inventaire.size} médias distincts inventoriés → scrape/medias.json`);
}

main();
