import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const NOM_DU_GEL = 'eslint-suppressions.json';
const IGNORES = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', '.expo']);

const cheminsDesGels = dossier =>
  readdirSync(dossier, { withFileTypes: true }).flatMap(entree => {
    if (entree.isDirectory()) {
      return IGNORES.has(entree.name) ? [] : cheminsDesGels(join(dossier, entree.name));
    }

    return entree.name === NOM_DU_GEL ? [join(dossier, entree.name)] : [];
  });

/** Ce qu'un gel retient : le nombre d'offenses et les regles qu'elles enfreignent. */
const contenuDuGel = chemin => {
  const parFichier = Object.values(JSON.parse(readFileSync(chemin, 'utf8')));
  const regles = [...new Set(parFichier.flatMap(Object.keys))].sort();
  const offenses = parFichier.flatMap(Object.values).reduce((total, { count }) => total + count, 0);

  return { offenses, regles };
};

/** Les gels du depot qui retiennent encore une offense, avec ce qu'ils retiennent. */
export const gelsNonVides = racine =>
  cheminsDesGels(racine)
    .map(chemin => ({ fichier: relative(racine, chemin).split(sep).join('/'), ...contenuDuGel(chemin) }))
    .filter(({ offenses }) => offenses > 0)
    .sort((gauche, droite) => gauche.fichier.localeCompare(droite.fichier));

const accorde = (nombre, mot) => `${nombre} ${mot}${nombre > 1 ? 's' : ''}`;

/**
 * Ce que la CI affiche quand un gel a rouvert. Le message dit ou regarder et quelles regles sont
 * en cause : un dev qui le lit doit pouvoir corriger sans relire ce script.
 */
export const rapport = gels =>
  [
    'Le gel ESLint est ferme : aucun eslint-suppressions.json ne peut retenir d offense.',
    '',
    ...gels.map(
      ({ fichier, offenses, regles }) => `  ✗ ${fichier} — ${accorde(offenses, 'offense')} (${regles.join(', ')})`,
    ),
    '',
    'Corrigez la violation plutot que de la geler. Une exception se decide en revue, pas avec --suppress-all.',
  ].join('\n');

// Lance depuis la racine du depot : `node scripts/check-suppressions.mjs`.
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const gels = gelsNonVides(new URL('..', import.meta.url).pathname);

  if (gels.length > 0) {
    console.error(rapport(gels));
    process.exitCode = 1;
  }
}
