// ---------------------------------------------------------------------------
// Pictogrammes SVG sur mesure (24×24, trait 1.7, couleur héritée).
// Un pictogramme par idée : chaque bloc de points forts en utilise des
// différents, pour qu'aucune icône ne se répète côte à côte.
// ---------------------------------------------------------------------------
const VAGUE = "M2 20c1.7 0 1.7-.9 3.3-.9s1.7.9 3.4.9 1.6-.9 3.3-.9 1.7.9 3.3.9 1.7-.9 3.4-.9 1.6.9 3.3.9";

const P = {
  // Activités
  jetski: `<path d="M2.5 16.5h14.8a3.8 3.8 0 0 0 3.4-2.1l1-2.1h-7.4l-2.6-2.8H8.3L6.6 12.3H3.5z"/><path d="m14.4 9.5 1.7-3.3h2.6M8.3 12.3h6"/><path d="M1 6.5h4.5M2 9.3h3"/><path d="${VAGUE}"/>`,
  parachute: `<path d="M3 10a9 7 0 0 1 18 0"/><path d="M3 10c1.5-1 3-1 4.5 0 1.5-1 3-1 4.5 0 1.5-1 3-1 4.5 0 1.5-1 3-1 4.5 0"/><path d="m3 10 7.6 7.4M21 10l-7.6 7.4M12 10v7"/><rect x="10.3" y="17" width="3.4" height="4" rx="1.2"/>`,
  bouee: `<ellipse cx="12" cy="10.5" rx="8" ry="4.3"/><ellipse cx="12" cy="10" rx="3" ry="1.4"/><path d="${VAGUE}"/>`,
  glisse: `<path d="m4 14.6 14-5a1.8 1.8 0 0 1 1.2 3.4l-14 5A1.8 1.8 0 0 1 4 14.6z"/><circle cx="14.8" cy="4.3" r="1.8"/><path d="m13.3 7.4-2 4.2"/><path d="${VAGUE}"/>`,
  bateau: `<path d="M3 14.5 4.8 18h14.4l1.8-3.5z"/><path d="M6 14.5V9h8l3 5.5"/><path d="M8.5 9V5.5H11"/><path d="${VAGUE}"/>`,

  // Sensations
  adrenaline: `<path d="M12 20s-7.4-4.5-9.1-9.3C1.7 7.3 4 4 7.3 4c2 0 3.6 1.1 4.7 2.8C13.1 5.1 14.7 4 16.7 4 20 4 22.3 7.3 21.1 10.7 19.4 15.5 12 20 12 20z"/><path d="M3.6 12.2h4.1l1.7-3 2.5 6 1.7-3h6.7"/>`,
  vitesse: `<path d="M4.9 19a9 9 0 1 1 14.2 0"/><path d="m12 14 4.2-5.2"/><circle cx="12" cy="14" r="1.6"/><path d="M12 5v1.6M5.6 9.3l1.3.8M18.4 9.3l-1.3.8"/>`,
  etincelles: `<path d="M10 3c.8 3.6 2.9 5.7 6.5 6.5-3.6.8-5.7 2.9-6.5 6.5-.8-3.6-2.9-5.7-6.5-6.5C7.1 8.7 9.2 6.6 10 3z"/><path d="M18 14c.3 1.5 1 2.2 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.3 2.2-1 2.5-2.5z"/>`,
  oiseau: `<path d="M2 9.5c2.5-1.6 5-1.6 7 0 1 .8 2 2 3 3.5 1-1.5 2-2.7 3-3.5 2-1.6 4.5-1.6 7 0"/><path d="M5 16.5c1.4-.8 2.9-.8 4.2 0M14.8 16.5c1.4-.8 2.9-.8 4.2 0"/>`,
  nuage: `<path d="M7 18h10.5a4 4 0 0 0 .6-8A6 6 0 0 0 6.6 11.2 3.5 3.5 0 0 0 7 18z"/><path d="M9 21.5h6"/>`,
  paysage: `<circle cx="17" cy="6.5" r="2.5"/><path d="m2 16.5 6-8 4 5 2.5-3 5.5 6"/><path d="${VAGUE}"/>`,
  lever: `<path d="M5 16a7 7 0 0 1 14 0"/><path d="M12 4v3M4.2 8.2l2 2M19.8 8.2l-2 2M2 16h2M20 16h2M3 20h18"/>`,

  // Personnes
  groupe: `<circle cx="12" cy="8" r="3"/><path d="M6.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="5" cy="10.5" r="2.1"/><circle cx="19" cy="10.5" r="2.1"/><path d="M1.5 19.5a3.8 3.8 0 0 1 4.8-3.6M22.5 19.5a3.8 3.8 0 0 0-4.8-3.6"/>`,
  duo: `<circle cx="8.5" cy="7.5" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M3 20a5.5 5.5 0 0 1 11 0M14 20a4.5 4.5 0 0 1 7-3.8"/>`,
  enfant: `<circle cx="8" cy="5.5" r="2.5"/><path d="M4 21v-6.5a4 4 0 0 1 8 0V21"/><circle cx="17" cy="10.5" r="2"/><path d="M14 21v-4.5a3 3 0 0 1 6 0V21"/>`,
  nageur: `<circle cx="16.5" cy="6.5" r="1.8"/><path d="m4 13 5-3.5 3 2.5 3-2"/><path d="M2 16.5c1.7 0 1.7-.9 3.3-.9s1.7.9 3.4.9 1.6-.9 3.3-.9 1.7.9 3.3.9 1.7-.9 3.4-.9 1.6.9 3.3.9"/><path d="${VAGUE}"/>`,
  main: `<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10.5V4a1.5 1.5 0 0 1 3 0v7M14 10.5V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7h-.5a6 6 0 0 1-5-2.7L2.8 15a1.5 1.5 0 0 1 2.4-1.8L8 16"/>`,
  tshirt: `<path d="M8 3 3 6l2 4 2-1v12h10V9l2 1 2-4-5-3c0 1.7-1.3 3-3 3S8 4.7 8 3z"/>`,

  // Encadrement & sécurité
  bouclier: `<path d="m12 3 7.5 3v5.5c0 4.5-3.2 8.1-7.5 9.5-4.3-1.4-7.5-5-7.5-9.5V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>`,
  medaille: `<circle cx="12" cy="9" r="5.5"/><path d="m12 6.4.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3z"/><path d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5"/>`,
  conseil: `<path d="M4 4.5h11a2 2 0 0 1 2 2V13a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2z"/><path d="M20 8.5h.5A1.5 1.5 0 0 1 22 10v6a1.5 1.5 0 0 1-1.5 1.5H20V20l-3-2.5h-3"/><path d="M6 8.5h7M6 11.5h4"/>`,
  gilet: `<path d="M8 3 5 5.5V20a1 1 0 0 0 1 1h4.5V11zM16 3l3 2.5V20a1 1 0 0 1-1 1h-4.5V11z"/><path d="M8 3c1 2 2.5 3 4 3s3-1 4-3M5 14h5.5M13.5 14H19"/>`,
  controle: `<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.8h6V4"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>`,
  reglage: `<path d="M4 7h10M18 7h2M4 17h4M12 17h8M4 12h5M13 12h7"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/><circle cx="11" cy="12" r="2"/>`,
  briefing: `<rect x="3" y="3" width="18" height="12" rx="1.5"/><path d="M12 15v3M8 21l4-3 4 3"/><path d="m7 11 3-3 2.5 2L17 6.5"/>`,
  envol: `<path d="M12 21V10"/><path d="M7.5 14.5 12 10l4.5 4.5"/><path d="M4.5 7a8.5 5 0 0 1 15 0"/>`,

  // Pratique
  sansPermis: `<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h5M7 14h3M4 20 20 4"/>`,
  identite: `<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5 16.5a3.8 3.8 0 0 1 7 0M14.5 10h4M14.5 13.5h3"/>`,
  carburant: `<path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M7 8h4"/><path d="M14 10h2a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0V8l-3-3"/>`,
  etiquette: `<path d="m20.6 13.4-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>`,
  repetition: `<path d="m17 2 3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/>`,
  calendrier: `<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 14h2M12 14h2M16 14h.5M8 17.5h2M12 17.5h2"/>`,
  cadenas: `<rect x="4.5" y="10.5" width="15" height="10.5" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5M12 14.3v2.7"/>`,
  remboursement: `<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4.5h-4.5"/><path d="M14.5 9.3a3 3 0 1 0 0 5.4M8.5 11h4.5M8.5 13h4.5"/>`,

  // Accès
  parking: `<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M9.5 17V7.5h3.2a2.8 2.8 0 0 1 0 5.6H9.5"/>`,
  pieton: `<circle cx="13" cy="4.5" r="1.8"/><path d="m11 21 2-6-2.5-2.5 1-4.5 3 3 3 1M10.5 8.5 7.5 10l-1 3.5M13 15l3 6"/>`,
  repere: `<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>`,
  autoroute: `<path d="M8 3 4 21M16 3l4 18M12 4v2.5M12 10v3M12 17v3"/>`,
  voiture: `<path d="M5 16v-4.5l2-5h10l2 5V16M3.5 16h17v3h-3v-1.5h-11V19h-3zM5 11.5h14"/>`,
  corniche: `<path d="M3 5c6 0 4 7 9 7s3 7 9 7"/><path d="M2 21c1.5 0 1.5-.8 3-.8s1.5.8 3 .8M16 5l1.5-1.5L19 5"/>`,
  telephone: `<path d="M21 16.4v3a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3 19.2 19.2 0 0 1-5.9-5.9 19.5 19.5 0 0 1-3-8.6A2 2 0 0 1 3.4 1.8h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L7.3 9.6a16 16 0 0 0 5.9 5.9l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>`,
};

/** SVG d'un pictogramme. `cls` : classe CSS éventuelle. */
export function icone(nom, cls = "") {
  const p = P[nom];
  if (!p) throw new Error(`Pictogramme inconnu : « ${nom} »`);
  return `<svg${cls ? ` class="${cls}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

export const nomsIcones = Object.keys(P);
