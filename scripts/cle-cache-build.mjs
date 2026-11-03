import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, matchesGlob, relative } from 'node:path';

/** Le premier groupe capturé de chaque correspondance de `motif` dans `texte`. */
const captures = (texte, motif) => [...texte.matchAll(motif)].map(([, capture]) => capture);

const lire = (racine, fichier) => readFileSync(join(racine, fichier), 'utf8');

const indentation = ligne => ligne.length - ligne.trimStart().length;

/** Les lignes de chaque bloc `path: |`, dans l'ordre des étapes. */
const blocsDeChemins = action => {
  const blocs = [];
  let ouverture = null;
  for (const ligne of action.split('\n')) {
    if (/^\s*path: \|\s*$/.test(ligne)) {
      ouverture = indentation(ligne);
      blocs.push([]);
    } else if (ouverture !== null && indentation(ligne) > ouverture) blocs.at(-1).push(ligne.trim());
    else ouverture = null;
  }

  return blocs;
};

/** Chemins déclarés dans une seule des étapes restore et save : le cache ne serait jamais trouvé. */
export const cheminsDivergents = action => {
  const [restauration, sauvegarde] = blocsDeChemins(action).map(bloc => new Set(bloc));

  return [...restauration.symmetricDifference(sauvegarde)];
};

/** Fichiers lus par le build qu'aucun motif de la clé ne hache : leur changement servirait un build périmé. */
export const entreesNonCouvertes = (action, fichiers) => {
  const motifs = captures(action.match(/hashFiles\(([^)]*)\)/)[1], /'([^']+)'/g);

  return fichiers.filter(fichier => !motifs.some(motif => matchesGlob(fichier, motif)));
};

/** Les commandes que `build` exécute, en suivant ses `pnpm run <script>`. */
const commandesDuBuild = scripts => {
  const commandes = [];
  const aSuivre = ['build'];
  while (aSuivre.length > 0) {
    const commande = scripts[aSuivre.pop()] ?? '';
    commandes.push(commande);
    aSuivre.push(...captures(commande, /pnpm run ([\w:-]+)/g));
  }

  return commandes;
};

/** Le fichier et, récursivement, les fichiers qu'il importe par un chemin relatif. */
const avecSesImports = (racine, fichier) => {
  const imports = captures(lire(racine, fichier), /^import .* from '(\.\.?\/[^']+)'/gm);

  return [fichier, ...imports.flatMap(importe => avecSesImports(racine, join(dirname(fichier), importe)))];
};

/** Les configs TypeScript dont hérite `config`, en suivant ses `extends`. */
const configsHeritees = (racine, config) => {
  const { extends: parent } = JSON.parse(lire(racine, config));
  if (!parent) return [];
  const chemin = relative(racine, join(racine, dirname(config), parent));

  return [chemin, ...configsHeritees(racine, chemin)];
};

/** Scripts racine et configs héritées que lit le build d'un paquet. */
const entreesDuPaquet = (racine, paquet) => {
  const { scripts = {} } = JSON.parse(lire(racine, join('packages', paquet, 'package.json')));

  return commandesDuBuild(scripts).flatMap(commande => [
    ...captures(commande, /\.\.\/\.\.\/(scripts\/[\w.-]+)/g).flatMap(fichier => avecSesImports(racine, fichier)),
    ...captures(commande, /tsc -p ([\w.-]+)/g).flatMap(config =>
      configsHeritees(racine, join('packages', paquet, config)),
    ),
  ]);
};

/** Fichiers hors de `packages/` que lisent les builds des paquets, sans doublon. */
export const entreesDuBuild = racine => [
  ...new Set(
    readdirSync(join(racine, 'packages'), { withFileTypes: true })
      .filter(entree => entree.isDirectory())
      .flatMap(({ name }) => entreesDuPaquet(racine, name)),
  ),
];
