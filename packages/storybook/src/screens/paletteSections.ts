export type ColorEntry = { path: string; value: string };
export type ColorSection = { title: string; entries: ColorEntry[]; deprecated?: boolean };

/**
 * Les couleurs d'un groupe, aplaties en chemins pointes. La palette imbrique ses familles a
 * des profondeurs variables, et seule la feuille porte une valeur : tout ce qui n'est ni une
 * chaine ni un objet n'a rien a montrer et disparait.
 */
export function flattenColors(obj: Record<string, unknown>, prefix = ''): ColorEntry[] {
  const entries: ColorEntry[] = [];
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') {
      entries.push({ path, value: val });
    } else if (val && typeof val === 'object') {
      entries.push(...flattenColors(val as Record<string, unknown>, path));
    }
  }
  return entries;
}

/**
 * Les cles de premier niveau qui precedent le rangement par mode. Elles ne sont plus alimentees,
 * mais restent lues par du code existant : la palette les garde, et l'ecran les montre a part.
 */
const DEPRECATED_KEYS = [
  'primary',
  'transparent',
  'danger',
  'info',
  'success',
  'warning',
  'link',
  'text',
  'border',
  'background',
  'system',
];

/** Les cles historiques encore presentes, rassemblees en une seule liste. */
function deprecatedEntries(palette: Record<string, unknown>): ColorEntry[] {
  return DEPRECATED_KEYS.flatMap(key => {
    const val = palette[key];
    if (typeof val === 'string') return [{ path: key, value: val }];
    if (val && typeof val === 'object') return flattenColors(val as Record<string, unknown>, key);
    return [];
  });
}

/**
 * Les sections affichees : une par famille du mode clair, puis les cles historiques. Seul le
 * mode clair est montre - le catalogue ne rend pas encore le mode sombre, et l'afficher
 * laisserait croire qu'il est disponible. Une famille vide n'a pas de section : un accordeon
 * qu'on deplie sur rien se lit comme une erreur.
 */
export function buildSections(palette: Record<string, unknown>): ColorSection[] {
  const clair = (palette.light ?? {}) as Record<string, unknown>;

  const familles = Object.entries(clair)
    .map(([groupKey, groupVal]) => ({
      title: `light / ${groupKey}`,
      entries: flattenColors({ [groupKey]: groupVal }, 'light'),
    }))
    .filter(section => section.entries.length > 0);

  const historiques = deprecatedEntries(palette);
  if (historiques.length === 0) return familles;

  return [...familles, { title: 'Deprecated', entries: historiques, deprecated: true }];
}
