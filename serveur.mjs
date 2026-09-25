#!/usr/bin/env node
// Serveur local de prévisualisation de ./dist : node serveur.mjs [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { redirections } from "./content/redirections.mjs";

const dist = join(fileURLToPath(new URL(".", import.meta.url)), "dist");
const port = +process.argv[2] || 8080;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json",
  ".xml": "application/xml", ".txt": "text/plain", ".webp": "image/webp", ".avif": "image/avif", ".png": "image/png",
  ".jpg": "image/jpeg", ".ico": "image/x-icon", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

createServer(async (req, res) => {
  const chemin = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const r = redirections.find(([de]) => (de.endsWith("*") ? chemin.startsWith(de.slice(0, -1)) : chemin === de || chemin + "/" === de));
  if (r) { res.writeHead(301, { Location: r[1] }); return res.end(); }
  let f = normalize(join(dist, chemin));
  if (!f.startsWith(dist)) { res.writeHead(403); return res.end(); }
  try {
    const s = await stat(f);
    if (s.isDirectory()) {
      if (!chemin.endsWith("/")) { res.writeHead(301, { Location: chemin + "/" }); return res.end(); }
      f = join(f, "index.html");
    }
    let corps = await readFile(f);
    const type = TYPES[extname(f)] || "application/octet-stream";
    const entetes = { "Content-Type": type, "Cache-Control": /\.(html|xml|txt)$/.test(f) ? "no-cache" : "public, max-age=31536000, immutable" };
    // Compression comme en production (Apache mod_deflate, Netlify, Vercel).
    if (/text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] || "")) { corps = gzipSync(corps); entetes["Content-Encoding"] = "gzip"; }
    res.writeHead(200, entetes);
    res.end(corps);
  } catch {
    res.writeHead(404, { "Content-Type": TYPES[".html"] });
    res.end(await readFile(join(dist, "404.html")));
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
