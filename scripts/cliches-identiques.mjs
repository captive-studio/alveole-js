import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

/** Le seuil par defaut de `toHaveScreenshot`, que `accessibility.spec.ts` ne surcharge pas. */
const SEUIL_DE_LA_CI = 0.2;

/** Vrai si la comparaison de la CI tiendrait les deux PNG pour la meme image. */
export const memeImagePourLaCI = (avant, apres) => {
  const [a, b] = [avant, apres].map(contenu => PNG.sync.read(contenu));

  return (
    a.width === b.width &&
    a.height === b.height &&
    pixelmatch(a.data, b.data, null, a.width, a.height, { threshold: SEUIL_DE_LA_CI }) === 0
  );
};

/** Les cliches modifies que la CI tiendrait pour inchanges : le diff ne doit montrer que les autres. */
export const clichesARestaurer = (chemins, lireAvant, lireApres) =>
  chemins.filter(chemin => memeImagePourLaCI(lireAvant(chemin), lireApres(chemin)));

const git = (...args) => execFileSync('git', args, { maxBuffer: 1 << 30 });

// Lance depuis la racine du depot, apres la capture : `node scripts/cliches-identiques.mjs <dossier>`.
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const modifies = git('diff', '--name-only', '--diff-filter=M', '--', process.argv[2])
    .toString()
    .split('\n')
    .filter(Boolean);
  const identiques = clichesARestaurer(
    modifies,
    chemin => git('show', `HEAD:${chemin}`),
    chemin => readFileSync(chemin),
  );

  if (identiques.length > 0) git('checkout', '--', ...identiques);
  console.log(`${identiques.length} cliché(s) sans changement visible pour la CI, restauré(s).`);
}
