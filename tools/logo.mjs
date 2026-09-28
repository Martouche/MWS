#!/usr/bin/env node
// Nouveau nom de fichier (logo-horizontal*) : les images sont mises en cache un an,
// un nom inchangé laisserait l'ancien logo aux visiteurs déjà venus.
// Recompose le logo horizontal (emblème + texte sur deux lignes) en haute
// définition à partir du logo empilé 2560 px de l'ancien site : la version
// « bandeau » d'origine ne fait que 249 px de large, floue sur mobile.
//   node tools/logo.mjs
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const racine = dirname(dirname(fileURLToPath(import.meta.url)));
const SOURCES = {
  "logo-horizontal": "2024__03__LOGOS_ORANGE_GRIS-mandelieu-watersports-jet-ski-parachute.png",
  "logo-horizontal-blanc": "2024__03__LOGOS_ORANGE_BLANC-mandelieu-watersports-jet-ski-parachute.png",
};
const HAUTEUR = 160; // px du fichier final (affiché ~30-36 px : net jusqu'en 4x)

/** Découpe une bande [haut, bas[ au plus près des pixels visibles (alpha). */
async function decoupe(buf, [haut, bas]) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let min = info.width, max = 0;
  for (let y = haut; y < bas; y++)
    for (let x = 0; x < info.width; x++)
      if (data[(y * info.width + x) * 4 + 3] > 40) { if (x < min) min = x; if (x > max) max = x; }
  return sharp(buf).extract({ left: min, top: haut, width: max - min + 1, height: bas - haut }).png().toBuffer();
}

async function bandes(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const runs = []; let dedans = false, debut = 0;
  for (let y = 0; y < info.height; y++) {
    let plein = false;
    for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 40) { plein = true; break; }
    if (plein && !dedans) { dedans = true; debut = y; }
    if (!plein && dedans) { dedans = false; runs.push([debut, y]); }
  }
  if (dedans) runs.push([debut, info.height]);
  return { runs, largeur: info.width };
}

for (const [cle, fichier] of Object.entries(SOURCES)) {
  const net = await sharp(join(racine, "medias-source", fichier)).trim().png().toBuffer();
  const { runs } = await bandes(net);
  const [emb, l1, l2] = runs; // emblème, « MANDELIEU », « WATERSPORTS »
  const emblème = await decoupe(net, emb);
  const ligne = (r) => decoupe(net, r);
  const e = await sharp(emblème).resize({ height: HAUTEUR }).png().toBuffer();
  const me = await sharp(e).metadata();
  // Proportions de la version « bandeau » : lignes centrées l'une sur l'autre,
  // « WATERSPORTS » juste après le cercle, texte sur ~90 % de la hauteur.
  const echelle = (HAUTEUR * 0.9) / (l2[1] - l1[0]);
  const t1 = await sharp(await ligne(l1)).resize({ height: Math.round((l1[1] - l1[0]) * echelle) }).png().toBuffer();
  const t2 = await sharp(await ligne(l2)).resize({ height: Math.round((l2[1] - l2[0]) * echelle) }).png().toBuffer();
  const [m1, m2] = [await sharp(t1).metadata(), await sharp(t2).metadata()];
  const x2 = Math.round(me.width * 1.07);
  const x1 = x2 + Math.round((m2.width - m1.width) / 2);
  const y1 = Math.round(HAUTEUR * 0.05);
  const y2 = y1 + Math.round((l2[0] - l1[0]) * echelle);
  const W = x2 + m2.width;
  const out = sharp({ create: { width: W, height: HAUTEUR, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: e, left: 0, top: 0 }, { input: t1, left: x1, top: y1 }, { input: t2, left: x2, top: y2 }]);
  const png = await out.png({ compressionLevel: 9, palette: true }).toBuffer();
  await sharp(png).toFile(join(racine, "assets", "images", `${cle}.png`));
  await sharp(png).webp({ quality: 92, alphaQuality: 100 }).toFile(join(racine, "assets", "images", `${cle}.webp`));
  console.log(`✓ ${cle} ${W}×${HAUTEUR}`);
}
