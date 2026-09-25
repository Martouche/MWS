# Mandelieu Watersports — site statique

Refonte de [mandelieu-watersports.com](https://www.mandelieu-watersports.com/) : l'ancien
WordPress (WooCommerce, WPBakery, Revolution Slider) est remplacé par un site statique
généré avec Node, sans framework. Le design suit la maquette validée
[`index-style2-final_1.html`](index-style2-final_1.html) : header pilule en verre dépoli,
cartes arrondies, vagues, palette bleue `#2f60ea`, police Plus Jakarta Sans auto-hébergée.

```bash
npm install          # sharp, cheerio, esbuild (outillage uniquement)
npm run build        # génère ./dist
npm run verify       # build + contrôles SEO (URLs, balises, images, liens, JSON-LD)
npm start            # build + serveur local sur http://localhost:8080
npm run test         # build de recette : tout en noindex, robots.txt fermé
```

## Structure

| Dossier / fichier | Rôle |
|---|---|
| `content/site.mjs` | Coordonnées, horaires, menu, GTM, vérification Search Console. |
| `content/produits.mjs` | **Les 21 activités** : prix, âge, durée, identifiant Resamare, textes, balises SEO. Une entrée = une page `/produit/<slug>/` + une carte tarif. |
| `content/activites.mjs` | Pages activités (parachute, location, randonnée, bouée, wakeboard, ski nautique). |
| `content/faq.mjs` | FAQ (page `/faq/` + questions reprises sur les pages activités, balisage `FAQPage`). |
| `content/avis.mjs` | Avis Google affichés (repris du widget Trustindex de l'ancien site). |
| `content/redirections.mjs` | Redirections 301 des anciennes URLs sans page. |
| `content/legal/*.md` | CGV, confidentialité, cookies (textes de l'ancien site). |
| `lib/layout.mjs` | `<head>`, en-tête, tiroir mobile, pied de page, JSON-LD commun. |
| `lib/composants.mjs` | Composants du style (cartes prix, packs, avis, contact, FAQ…). |
| `lib/pages/` | Gabarits : accueil, activité, fiche produit, autres pages. |
| `assets/styles.css` | CSS de la maquette + composants des pages intérieures. Minifié et inliné au build. |
| `assets/app.js` | Menus, carrousel, onglets, cookies, calendrier Resamare différé, formulaire mineur. |
| `assets/images/` | Photos en AVIF + WebP, 7 largeurs (160 → 2048 px), générées par `tools/medias.mjs`. |
| `assets/videos/` | Vidéos H.264 720p sans son (126 Mo → 16 Mo). |
| `tools/scraper.mjs` | Aspiration de l'ancien site : textes, metas, médias (`scrape/`). |
| `tools/medias.mjs` | Conversion des médias (`medias-source/` → `assets/`). |
| `tools/verifier.mjs` | Contrôles avant mise en ligne. |
| `scrape/pages/*.json` | Archive SEO de l'ancien site (title, description, OpenGraph, JSON-LD, contenu). |

## Modifier le site

- **Un tarif, un texte, un horaire** → `content/`, puis `npm run verify`.
- **Ajouter une activité** → une entrée dans `content/produits.mjs` (slug, prix, `resaId`
  Resamare, images). Page, carte tarif, sitemap et données structurées suivent.
- **Une nouvelle photo** → la déposer dans `medias-source/`, la déclarer dans
  `lib/medias.mjs` (texte alternatif obligatoire), puis `npm run medias`.

## SEO — zéro perte de trafic

- Les **40 URLs indexées** de l'ancien site sont conservées à l'identique (pages,
  activités, fiches `/produit/…`, pages légales). `npm run verify` échoue si une URL des
  anciens sitemaps n'existe plus et n'est pas redirigée.
- Les **20 URLs WooCommerce / admin / catégories** (`/shop/`, `/panier/`,
  `/categorie-produit/…`, `/contrat-mws/`…) sont redirigées en **301** vers la page la plus
  proche : `dist/.htaccess` (Apache/OVH), `dist/_redirects` (Netlify), `dist/vercel.json`.
- Titles et descriptions repris de Yoast (coquilles corrigées). Un seul `<h1>` par page,
  `alt` sur 100 % des images, canonical, OpenGraph, `sitemap.xml`, `robots.txt`.
- La balise `google-site-verification` est conservée (Search Console).
- JSON-LD : `LocalBusiness` + `SportsActivityLocation`, `Service`/`Offer` par activité,
  `Product` + `Offer` + `AggregateRating` sur les fiches, `OfferCatalog`, `FAQPage`,
  `BreadcrumbList`.

## Performance

Lighthouse (serveur local compressé) : **accessibilité, bonnes pratiques et SEO à 100**
sur toutes les pages testées ; performance 99–100 en desktop, 95–99 en mobile simulé.

- CSS minifié et inliné (aucune ressource bloquante), JS unique de 8 ko en `defer`.
- `<picture>` AVIF/WebP + `srcset`, `width`/`height` partout (CLS = 0), image principale
  en `fetchpriority="high"`, le reste en `loading="lazy"`.
- Police variable auto-hébergée, préchargée, `font-display: swap`.
- Calendrier Resamare (~400 ko de JS tiers) chargé à l'approche, après la première
  interaction ; carte Google chargée au clic ; Google Tag Manager chargé **uniquement
  après consentement**.

## Mise en ligne sur OVH (remplacement de l’ancien WordPress)

Le nouveau site n’écrase **jamais** le WordPress : il est envoyé dans un dossier à part,
puis le domaine est rebasculé vers ce dossier. Retour arrière possible en un clic.

1. **Préparer** : copier `env-exemple.txt` en `.env` et y mettre les identifiants FTP
   (espace client OVH → Hébergements → onglet « FTP - SSH »). Tester : `npm run deploy:essai`.
2. **Recette (facultatif, conseillé)** : créer dans OVH → Hébergements → Multisite un
   sous-domaine `recette.mandelieu-watersports.com` pointant vers le dossier `recette`
   (SSL activé), puis `npm run deploy:recette`. Ce build est en noindex : Google ne
   l’indexera pas. Tester réservations, liens, mobile.
3. **Production** : `npm run deploy` → envoie le site dans le dossier `site-statique`.
   Le site actuel n’est pas encore touché.
4. **Bascule** : OVH → Hébergements → Multisite → `mandelieu-watersports.com` **et**
   `www.mandelieu-watersports.com` → Modifier → dossier racine `site-statique`
   (quelques minutes de propagation). **Retour arrière** : remettre `www`.
5. **Après la bascule** : vérifier `https://www.mandelieu-watersports.com/`, une fiche
   produit (calendrier), `/shop/` (doit rediriger vers `/nos-tarifs/`) et
   `https://mandelieu-watersports.com/` (doit rediriger vers www). Puis Search Console :
   soumettre `/sitemap.xml` et suivre le rapport « Pages » quelques semaines.
6. Garder le dossier `www` (WordPress) et sa base de données au moins 1 à 2 mois avant de
   les supprimer. Les e-mails @mandelieu-watersports.com ne sont pas concernés.

Le domaine canonique reste **www.mandelieu-watersports.com**, comme sur l’ancien site :
`mandelieu-watersports.com` redirige en 301 vers la version www, HTTPS partout.
Netlify / Vercel restent possibles : `_redirects`, `_headers` et `vercel.json` sont générés.
