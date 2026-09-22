import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const require = createRequire(import.meta.url);

/**
 * La marge toleree entre la couverture mesuree et le cliquet, en points. Elle absorbe le bruit
 * d'une mesure a l'autre sans laisser dormir un vrai gain.
 */
export const TOLERANCE = 2;

/** Le cliquet d'un paquet : les taux inscrits dans `coverageThreshold.global` de sa config Jest. */
const cliquetDe = dossier => require(join(dossier, 'jest.config.js')).coverageThreshold?.global ?? {};

/** La couverture mesuree au dernier `--coverage`, par metrique. */
const mesureDe = dossier => {
  const fichier = join(dossier, 'coverage', 'coverage-summary.json');
  if (!existsSync(fichier)) return null;

  return JSON.parse(readFileSync(fichier, 'utf8')).total;
};

/**
 * Les cliquets qu'un gain de couverture a laisses derriere lui. Un gain non reporte dans
 * `coverageThreshold` n'est protege par rien : la CI le reclame plutot que de compter sur
 * la discipline de celui qui l'a obtenu. La tolerance absorbe le bruit d'une mesure a l'autre.
 */
export const cliquetsDepasses = (racine, tolerance) => {
  const paquets = join(racine, 'packages');

  return readdirSync(paquets).flatMap(paquet => {
    const dossier = join(paquets, paquet);
    const mesure = mesureDe(dossier);
    if (!mesure) return [];

    return Object.entries(cliquetDe(dossier))
      .filter(([metrique, cliquet]) => mesure[metrique].pct - cliquet > tolerance)
      .map(([metrique, cliquet]) => ({ paquet, metrique, cliquet, mesure: mesure[metrique].pct }));
  });
};

/**
 * Ce que la CI affiche quand un cliquet traine. Le message donne le chiffre a recopier :
 * la CI ne demande pas d'ecrire des tests, elle demande d'enregistrer ceux qui existent.
 */
export const rapport = cliquets =>
  [
    'Des gains de couverture ne sont proteges par aucun cliquet.',
    '',
    ...cliquets.map(
      ({ paquet, metrique, cliquet, mesure }) =>
        `  ✗ ${paquet} : ${metrique} mesure a ${mesure} %, cliquet reste a ${cliquet} % (portez-le a ${Math.floor(mesure)})`,
    ),
    '',
    'Reportez ces valeurs dans le coverageThreshold du paquet. Sans cela, le prochain code',
    'non teste ramenera la couverture au niveau du cliquet sans que rien ne le signale.',
  ].join('\n');

// Lance depuis la racine du depot, apres un `test:unit` : `node scripts/check-coverage-ratchet.mjs`.
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const cliquets = cliquetsDepasses(new URL('..', import.meta.url).pathname, TOLERANCE);

  if (cliquets.length > 0) {
    console.error(rapport(cliquets));
    process.exitCode = 1;
  }
}
