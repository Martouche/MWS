#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Optimisation des médias.
//
//   npm install          (installe sharp)
//   node tools/medias.mjs [--force]
//
// Lit medias-source/ (rempli par tools/scraper.mjs) et produit :
//   assets/images/<cle>-<largeur>.avif|webp   photos, plusieurs largeurs
//   assets/images/<picto>.webp               pictogrammes ronds 112 px
//   assets/images/<logo>.png|webp            logos (transparence conservée)
//   assets/videos/<cle>.mp4 + poster         vidéos H.264 720p via ffmpeg
//   static/favicon-*.png, favicon.ico
//   assets/images/manifest.json              dimensions réelles, lu par le build
//
// Sans --force, un fichier déjà produit n'est pas régénéré.
// ---------------------------------------------------------------------------
import { mkdir, writeFile, stat, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

import { medias, pictos, logos, videos, LARGEURS } from "../lib/medias.mjs";

const exec = promisify(execFile);
const racine = dirname(dirname(fileURLToPath(import.meta.url)));
const SRC = join(racine, "medias-source");
const IMG = join(racine, "assets", "images");
const VID = join(racine, "assets", "videos");
const STATIC = join(racine, "static");
const FORCE = process.argv.includes("--force");

const mo = (n) => (n / 1048576).toFixed(1) + " Mo";
const aFaire = (f) => FORCE || !existsSync(f);
let avant = 0, apres = 0;

async function taille(f) { try { return (await stat(f)).size; } catch { return 0; } }

async function photos(manifeste) {
  for (const [cle, m] of Object.entries(medias)) {
    const src = join(SRC, m.src);
    if (!existsSync(src)) { console.warn(`  ! ${cle} : source introuvable (${m.src})`); continue; }
    avant += await taille(src);
    const meta = await sharp(src).rotate().metadata();
    // Une photo EXIF tournée : on raisonne sur les dimensions affichées.
    const tourne = (meta.orientation || 1) >= 5;
    const W = tourne ? meta.height : meta.width;
    const H = tourne ? meta.width : meta.height;
    const plafond = Math.min(W, m.max || Infinity);
    const largeurs = LARGEURS.filter((l) => l < plafond);
    if (!largeurs.length || plafond - largeurs[largeurs.length - 1] > 200) largeurs.push(Math.min(plafond, 2048));
    const uniques = [...new Set(largeurs)].filter((l) => l <= 2048);

    for (const l of uniques) {
      const base = sharp(src, { limitInputPixels: false }).rotate().resize({ width: l, withoutEnlargement: true });
      const webp = join(IMG, `${cle}-${l}.webp`);
      const avif = join(IMG, `${cle}-${l}.avif`);
      if (aFaire(webp)) await base.clone().webp({ quality: 76, effort: 5 }).toFile(webp);
      if (aFaire(avif)) await base.clone().avif({ quality: 50, effort: 4 }).toFile(avif);
      if (l === uniques[uniques.length - 1]) apres += await taille(webp);
    }
    manifeste[cle] = { w: W, h: H, largeurs: uniques };
    console.log(`  ✓ ${cle.padEnd(34)} ${W}×${H} → ${uniques.join(", ")}`);
  }
}

async function pictogrammes(manifeste) {
  for (const [cle, f] of Object.entries(pictos)) {
    const src = join(SRC, f);
    const out = join(IMG, `${cle}.webp`);
    if (aFaire(out)) {
      const { width, height } = await sharp(src).metadata();
      const c = Math.min(width, height);
      await sharp(src)
        .extract({ left: Math.round((width - c) / 2), top: Math.round((height - c) / 2), width: c, height: c })
        .resize(112, 112)
        .webp({ quality: 85 })
        .toFile(out);
    }
    manifeste[cle] = { w: 112, h: 112, picto: true };
  }
  console.log(`  ✓ ${Object.keys(pictos).length} pictogrammes`);
}

async function logosEtFavicons(manifeste) {
  for (const [cle, l] of Object.entries(logos)) {
    const src = join(SRC, l.src);
    const { width, height } = await sharp(src).metadata();
    const png = join(IMG, `${cle}.png`);
    const webp = join(IMG, `${cle}.webp`);
    if (aFaire(png)) await sharp(src).png({ compressionLevel: 9, palette: true }).toFile(png);
    if (aFaire(webp)) await sharp(src).webp({ quality: 90, alphaQuality: 100 }).toFile(webp);
    manifeste[cle] = { w: width, h: height, logo: true };
  }

  // Favicon : l'emblème actuel du WordPress (192 px, niveaux de gris) posé sur
  // fond blanc arrondi pour rester lisible en onglet sombre.
  await mkdir(STATIC, { recursive: true });
  const fav = join(SRC, "favicon-192x192.png");
  if (existsSync(fav)) {
    for (const s of [32, 180, 192, 512]) {
      const out = join(STATIC, `favicon-${s}.png`);
      if (aFaire(out)) await sharp(fav).resize(s, s, { kernel: "lanczos3" }).png().toFile(out);
    }
    const ico = join(STATIC, "favicon.ico");
    if (aFaire(ico)) {
      // ICO contenant un PNG 32×32 (format accepté par tous les navigateurs).
      const png = await sharp(fav).resize(32, 32).png().toBuffer();
      const h = Buffer.alloc(22);
      h.writeUInt16LE(0, 0); h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4);
      h.writeUInt8(32, 6); h.writeUInt8(32, 7); h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12);
      h.writeUInt32LE(png.length, 14); h.writeUInt32LE(22, 18);
      await writeFile(ico, Buffer.concat([h, png]));
    }
    console.log("  ✓ logos et favicons");
  }
}

async function ffmpegDispo() {
  try { await exec("ffmpeg", ["-version"]); return true; } catch { return false; }
}

async function traiterVideos(manifeste) {
  if (!(await ffmpegDispo())) { console.warn("  ! ffmpeg absent : vidéos non traitées"); return; }
  await mkdir(VID, { recursive: true });
  for (const [cle, v] of Object.entries(videos)) {
    const src = join(SRC, v.src);
    if (!existsSync(src)) { console.warn(`  ! ${cle} : source introuvable`); continue; }
    const out = join(VID, `${cle}.mp4`);
    const echelle = v.portrait ? "scale=-2:'min(1280,ih)'" : "scale='min(1280,iw)':-2";
    if (aFaire(out)) {
      await exec("ffmpeg", [
        "-y", "-i", src, "-an",
        "-vf", `${echelle},fps=30`,
        "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-profile:v", "high", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", out,
      ], { maxBuffer: 1 << 26 });
    }
    // Poster : image extraite à 1 s, puis passée dans la chaîne photo.
    const poster = join(SRC, `poster-${cle}.jpg`);
    if (!v.poster && aFaire(poster)) {
      await exec("ffmpeg", ["-y", "-ss", "1", "-i", out, "-frames:v", "1", "-q:v", "3", poster]);
    }
    const { stdout } = await exec("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:format=duration", "-of", "json", out]);
    const p = JSON.parse(stdout);
    manifeste[cle] = {
      w: p.streams[0].width, h: p.streams[0].height,
      duree: Math.round(+p.format.duration), poids: await taille(out),
      poster: v.poster || `poster-${cle}`,
    };
    console.log(`  ✓ ${cle.padEnd(24)} ${mo(await taille(src))} → ${mo(await taille(out))}`);
  }
}

/** Les posters extraits des vidéos passent ensuite par la chaîne photo. */
async function postersVideos(manifeste) {
  for (const cle of Object.keys(videos)) {
    const f = `poster-${cle}.jpg`;
    if (videos[cle].poster || !existsSync(join(SRC, f))) continue;
    medias[`poster-${cle}`] = { src: f, alt: "", max: 1280 };
  }
}

await mkdir(IMG, { recursive: true });
const cheminManifeste = join(IMG, "manifest.json");
const manifeste = existsSync(cheminManifeste) && !FORCE ? JSON.parse(await readFile(cheminManifeste, "utf8")) : {};

console.log("\nVidéos");
await traiterVideos(manifeste);
await postersVideos(manifeste);
console.log("\nPhotos");
await photos(manifeste);
await pictogrammes(manifeste);
await logosEtFavicons(manifeste);

await writeFile(cheminManifeste, JSON.stringify(manifeste, null, 1));
console.log(`\nPhotos : ${mo(avant)} à la source → ${mo(apres)} (plus grande variante WebP de chaque image)`);
