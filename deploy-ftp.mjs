#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Envoi du site sur l'hébergement OVH par FTP.
//
//   npm run deploy:essai    simulation : se connecte, contrôle, n'écrit rien
//   npm run deploy:recette  build noindex → dossier de recette (FTP_DOSSIER_RECETTE)
//   npm run deploy          build production → dossier de production (FTP_DOSSIER)
//
// Identifiants lus dans .env (jamais versionné) : copier env-exemple.txt en .env.
//
// SÉCURITÉ : le script refuse d'écrire dans un dossier qui contient encore le
// WordPress (wp-config.php) et n'écrit jamais dans /www. L'ancien site reste
// intact tant que le domaine n'a pas été rebasculé vers le nouveau dossier
// dans l'espace client OVH (Multisite) — et on peut revenir en arrière.
// ---------------------------------------------------------------------------
import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as ftp from "basic-ftp";

const racine = dirname(fileURLToPath(import.meta.url));
const dist = join(racine, "dist");
const ESSAI = process.argv.includes("--essai");
const RECETTE = process.argv.includes("--recette");

// --- .env ------------------------------------------------------------------
const envPath = join(racine, ".env");
if (!existsSync(envPath)) {
  console.error("\n✗ Fichier .env introuvable : copiez env-exemple.txt en .env et remplissez-le.\n");
  process.exit(1);
}
const env = {};
for (const ligne of (await readFile(envPath, "utf8")).split(/\r?\n/)) {
  const t = ligne.trim();
  if (!t || t.startsWith("#")) continue;
  const i = t.indexOf("=");
  if (i > 0) env[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}
for (const cle of ["FTP_HOTE", "FTP_UTILISATEUR", "FTP_MOTDEPASSE"]) {
  if (!env[cle]) { console.error(`\n✗ ${cle} manquant dans .env\n`); process.exit(1); }
}
const DOSSIER = "/" + (RECETTE ? env.FTP_DOSSIER_RECETTE || "recette" : env.FTP_DOSSIER || "site-statique").replace(/^\/+|\/+$/g, "");
const SECURISE = String(env.FTP_SECURISE ?? "true").toLowerCase() !== "false";

if (DOSSIER === "/www" || DOSSIER === "/") {
  console.error(`\n✗ Envoi dans ${DOSSIER} refusé : c'est là que tourne le WordPress actuel.
  Utilisez un dossier dédié (ex. /site-statique) puis rebasculez le domaine dans
  l'espace client OVH → Hébergements → Multisite → Modifier → Dossier racine.\n`);
  process.exit(1);
}

// --- Contrôle du build ----------------------------------------------------------
if (!existsSync(join(dist, "index.html")) || !existsSync(join(dist, ".htaccess"))) {
  console.error("\n✗ dist/ incomplet. Lancez d'abord le build.\n");
  process.exit(1);
}
const robots = await readFile(join(dist, "robots.txt"), "utf8");
if (RECETTE && !robots.includes("Disallow: /")) {
  console.error("\n✗ dist/ est un build de production : pour la recette, utilisez npm run deploy:recette.\n");
  process.exit(1);
}
if (!RECETTE && robots.includes("Disallow: /")) {
  console.error("\n✗ dist/ est un build de RECETTE (noindex) : il ne doit pas partir en production.\n");
  process.exit(1);
}

async function inventaire(dir) {
  let n = 0, octets = 0;
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { const r = await inventaire(p); n += r.n; octets += r.octets; }
    else { n++; octets += (await stat(p)).size; }
  }
  return { n, octets };
}
const { n, octets } = await inventaire(dist);

console.log(`
  Serveur   ${env.FTP_HOTE}${SECURISE ? "  (FTPS)" : "  (FTP simple)"}
  Compte    ${env.FTP_UTILISATEUR}
  Cible     ${DOSSIER}   ${RECETTE ? "(recette, noindex)" : "(production)"}
  Envoi     ${n} fichiers, ${(octets / 1048576).toFixed(1)} Mo
`);

// --- Envoi -------------------------------------------------------------------------
const client = new ftp.Client(30000);
let envoyes = 0;
client.trackProgress((info) => {
  if (info.type === "upload" && info.name) {
    envoyes++;
    process.stdout.write(`\r  ↑ ${String(envoyes).padStart(4)}/${n}  ${info.name.slice(-50).padEnd(50)}`);
  }
});

try {
  await client.access({
    host: env.FTP_HOTE, user: env.FTP_UTILISATEUR, password: env.FTP_MOTDEPASSE,
    secure: SECURISE, secureOptions: { rejectUnauthorized: false },
  });
  await client.ensureDir(DOSSIER);
  const contenu = (await client.list()).map((f) => f.name);
  if (contenu.includes("wp-config.php") || contenu.includes("wp-admin")) {
    throw new Error(`${DOSSIER} contient un WordPress : envoi annulé pour ne rien écraser.`);
  }
  if (ESSAI) {
    console.log(`  Connexion OK. ${DOSSIER} contient actuellement ${contenu.length} élément(s).`);
    console.log("  --essai : rien n'a été envoyé.\n");
  } else {
    await client.clearWorkingDir(); // dossier dédié au site statique : repart propre
    await client.uploadFromDir(dist);
    process.stdout.write("\r" + " ".repeat(80) + "\r");
    console.log(`✓ ${n} fichiers envoyés dans ${DOSSIER}\n`);
  }
} catch (e) {
  process.stdout.write("\n");
  console.error("✗ Échec :", e.message);
  if (/530/.test(e.message)) console.error("  → identifiants refusés, vérifiez .env");
  if (/ENOTFOUND|EAI_AGAIN/.test(e.message)) console.error("  → serveur introuvable, vérifiez FTP_HOTE");
  if (/certificate|SSL|TLS/i.test(e.message)) console.error("  → essayez FTP_SECURISE=false dans .env");
  process.exitCode = 1;
} finally {
  client.close();
}
