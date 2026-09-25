#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Générateur du site Mandelieu Watersports → ./dist (c'est ce dossier qu'on déploie).
//
//   node build.mjs          production
//   node build.mjs --test   recette : tout en noindex, robots.txt fermé
// ---------------------------------------------------------------------------
import { mkdir, writeFile, readFile, rm, readdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

import { site } from "./content/site.mjs";
import { produits } from "./content/produits.mjs";
import { activites } from "./content/activites.mjs";
import { layout, assets } from "./lib/layout.mjs";
import { accueil } from "./lib/pages/accueil.mjs";
import { activite } from "./lib/pages/activite.mjs";
import { fiche } from "./lib/pages/produit.mjs";
import * as P from "./lib/pages/autres.mjs";
import { redirections } from "./content/redirections.mjs";

const racine = dirname(fileURLToPath(import.meta.url));
const dist = join(racine, "dist");
const TEST = process.argv.includes("--test");
const empreinte = (t) => createHash("sha256").update(t).digest("hex").slice(0, 8);

/** Toutes les pages, avec leur priorité dans le sitemap (null = hors sitemap). */
function toutesLesPages() {
  return [
    [accueil(), "1.0"],
    ...Object.keys(activites).map((k) => [activite(k), "0.9"]),
    [P.tarifs(), "0.9"],
    [P.packs(), "0.8"],
    ...produits.map((p) => [fiche(p), "0.7"]),
    [P.evenements(), "0.6"],
    [P.evjf(), "0.6"],
    [P.seminaires(), "0.6"],
    [P.privatisation(), "0.6"],
    [P.contact(), "0.7"],
    [P.pageFaq(), "0.6"],
    [P.attestation(), "0.4"],
    [P.cgv(), "0.2"],
    [P.confidentialite(), "0.2"],
    [P.cookies(), "0.2"],
    [P.page404(), null],
  ];
}

const fichierPour = (url) =>
  url.endsWith(".html") ? join(dist, url.slice(1)) : join(dist, url.replace(/^\/|\/$/g, ""), "index.html");

async function ecrire(chemin, contenu) {
  await mkdir(dirname(chemin), { recursive: true });
  await writeFile(chemin, contenu);
}

async function copier(src, dest, filtre = () => true) {
  if (!existsSync(src)) return 0;
  let n = 0;
  for (const e of await readdir(src, { withFileTypes: true })) {
    const s = join(src, e.name), d = join(dest, e.name);
    if (e.isDirectory()) n += await copier(s, d, filtre);
    else if (filtre(e.name)) { await mkdir(dirname(d), { recursive: true }); await copyFile(s, d); n++; }
  }
  return n;
}

/** Minification HTML prudente : blancs entre balises et indentation. */
const minHtml = (h) =>
  h.replace(/\n\s+/g, "\n").replace(/>\s+</g, (m) => (m.includes("\n") ? ">\n<" : "> <")).replace(/\n{2,}/g, "\n");

// --- Fichiers système ----------------------------------------------------------
function sitemap(pages) {
  const jour = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.filter(([, pr]) => pr).map(([p, pr]) => `  <url><loc>${site.domaine}${p.url}</loc><lastmod>${jour}</lastmod><priority>${pr}</priority></url>`).join("\n")}
</urlset>
`;
}

const robots = () =>
  TEST
    ? "# Recette : ne doit jamais être indexé.\nUser-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${site.domaine}/sitemap.xml\n`;

const CSP = [
  "default-src 'self'",
  "script-src 'self' https://webservice.lagenza.fr https://*.lagenza.fr https://*.resactivity.com https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://webservice.lagenza.fr https://*.lagenza.fr https://*.resactivity.com https://cdn.jsdelivr.net",
  "font-src 'self' data: https://webservice.lagenza.fr https://*.lagenza.fr https://*.resactivity.com https://cdn.jsdelivr.net",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  "connect-src 'self' https://webservice.lagenza.fr https://*.lagenza.fr https://*.resactivity.com https://*.ingest.sentry.io https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
  "frame-src https://webservice.lagenza.fr https://*.lagenza.fr https://*.resactivity.com https://www.google.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://*.resactivity.com",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const ENTETES = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "Content-Security-Policy": CSP,
};

function enTetesNetlify() {
  return `/*
${Object.entries(ENTETES).map(([k, v]) => `  ${k}: ${v}`).join("\n")}
  Strict-Transport-Security: max-age=31536000; includeSubDomains
${TEST ? "  X-Robots-Tag: noindex, nofollow\n" : ""}
/app.*.js
  Cache-Control: public, max-age=31536000, immutable
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/*.html
  Cache-Control: public, max-age=0, must-revalidate
`;
}

const redirectsNetlify = () =>
  redirections.map(([de, vers]) => `${de.padEnd(48)} ${vers.padEnd(28)} 301`).join("\n") + "\n";

function vercel() {
  return JSON.stringify({
    cleanUrls: false,
    trailingSlash: true,
    redirects: redirections.map(([de, vers]) => ({ source: de.endsWith("*") ? de.slice(0, -1) + ":chemin*" : de, destination: vers, permanent: true })),
    headers: [
      { source: "/(.*)", headers: Object.entries(ENTETES).map(([key, value]) => ({ key, value })) },
      { source: "/assets/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ],
  }, null, 2);
}

function htaccess() {
  const r301 = redirections
    .map(([de, vers]) => (de.endsWith("*") ? `RedirectMatch 301 ^${de.slice(0, -1)}.*$ ${vers}` : `RedirectMatch 301 ^${de.replace(/\./g, "\\.")}?$ ${vers}`))
    .join("\n");
  return `# Mandelieu Watersports — configuration Apache (OVH, o2switch…). Généré par build.mjs.
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  # Domaine nu → www (version indexée par Google depuis toujours), en HTTPS
  RewriteCond %{HTTP_HOST} ^${new URL(site.domaine).hostname.replace(/^www\./, "").replace(/\./g, "\\.")}$ [NC]
  RewriteRule ^(.*)$ ${site.domaine}/$1 [R=301,L]
  # HTTPS partout (le sous-domaine de recette garde son nom)
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
  RewriteCond %{HTTP_HOST} !^localhost [NC]
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
</IfModule>

<IfModule mod_headers.c>
${Object.entries(ENTETES).map(([k, v]) => `  Header always set ${k} "${v}"`).join("\n")}
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
${TEST ? '  Header always set X-Robots-Tag "noindex, nofollow"\n' : ""}  <FilesMatch "\\.(webp|avif|png|jpg|svg|ico|mp4|woff2|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(html|xml|txt)$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json image/svg+xml
</IfModule>
AddType image/avif .avif
AddType image/webp .webp

# --- Redirections 301 des anciennes URLs WordPress --------------------------
${r301}
`;
}

const manifest = () => JSON.stringify({
  name: site.nom, short_name: "MWS", lang: "fr", start_url: "/", display: "standalone",
  background_color: "#f5f8fd", theme_color: "#2f60ea",
  icons: [192, 512].map((s) => ({ src: `/favicon-${s}.png`, sizes: `${s}x${s}`, type: "image/png" })),
});

// --- Build ---------------------------------------------------------------------
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const css = (await esbuild.transform(await readFile(join(racine, "assets", "styles.css"), "utf8"), { loader: "css", minify: true, target: ["chrome100", "safari15", "firefox100"] })).code;
const js = (await esbuild.transform(await readFile(join(racine, "assets", "app.js"), "utf8"), { loader: "js", minify: true, target: "es2019" })).code;
assets.js = `/app.${empreinte(js)}.js`;
await ecrire(join(dist, assets.js), js);

const pages = toutesLesPages();
const vues = new Set();
for (const [p] of pages) {
  if (vues.has(p.url)) throw new Error(`URL en double : ${p.url}`);
  vues.add(p.url);
  await ecrire(fichierPour(p.url), minHtml(layout(p, { css, test: TEST })));
}

await ecrire(join(dist, "sitemap.xml"), sitemap(pages));
await ecrire(join(dist, "robots.txt"), robots());
await ecrire(join(dist, "_redirects"), redirectsNetlify());
await ecrire(join(dist, "_headers"), enTetesNetlify());
await ecrire(join(dist, "vercel.json"), vercel());
await ecrire(join(dist, ".htaccess"), htaccess());
await ecrire(join(dist, "site.webmanifest"), manifest());

const nImages = await copier(join(racine, "assets", "images"), join(dist, "assets", "images"), (f) => !f.endsWith(".json"));
const nVideos = await copier(join(racine, "assets", "videos"), join(dist, "assets", "videos"));
await copier(join(racine, "assets", "polices"), join(dist, "assets", "polices"));
await copier(join(racine, "static"), dist);

console.log(`✓ ${pages.length} pages${TEST ? " (RECETTE, noindex)" : ""} · CSS ${(css.length / 1024).toFixed(1)} ko inline · JS ${(js.length / 1024).toFixed(1)} ko · ${nImages} images · ${nVideos} vidéos → dist/`);
