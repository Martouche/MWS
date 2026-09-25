// ---------------------------------------------------------------------------
// Redirections 301 des URLs de l'ancien WordPress qui n'ont plus de page.
// Toutes les autres URLs indexées sont conservées à l'identique (voir
// tools/verifier.mjs, qui contrôle chaque URL des anciens sitemaps).
// Format : [ancienne URL, nouvelle URL]. Un « * » final couvre tout un dossier.
// ---------------------------------------------------------------------------
export const redirections = [
  // Boutique WooCommerce : la réservation se fait désormais sur chaque fiche.
  ["/shop/", "/nos-tarifs/"],
  ["/boutique/", "/nos-tarifs/"],
  ["/cart/", "/nos-tarifs/"],
  ["/panier/", "/nos-tarifs/"],
  ["/checkout/", "/nos-tarifs/"],
  ["/commander/", "/nos-tarifs/"],
  ["/fin-de-commande/", "/"],
  ["/mon-compte/", "/"],
  ["/produit/rendez-vous/", "/contact/"],

  // Catégories de produits → page activité correspondante.
  ["/categorie-produit/bouee/", "/bouee-tractee/"],
  ["/categorie-produit/jetski/", "/location-jet-ski/"],
  ["/categorie-produit/packs/", "/nos-packs/"],
  ["/categorie-produit/parachute-ascensionnel/", "/parachute-ascensionnel/"],
  ["/categorie-produit/ski-nautique/", "/ski-nautique/"],
  ["/categorie-produit/wakeboard/", "/wakeboard/"],
  ["/categorie-produit/wakesurf/", "/wakeboard/"],
  ["/categorie-produit/*", "/nos-tarifs/"],

  // Pages internes / de test de l'ancien site.
  ["/employe-admin/", "/"],
  ["/client-admin/", "/"],
  ["/contrat-mws/", "/"],

  // WordPress.
  ["/wp-admin/*", "/"],
  ["/wp-login.php", "/"],
  ["/feed/", "/"],
  ["/comments/feed/", "/"],
];
