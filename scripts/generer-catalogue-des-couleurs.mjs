import fs from 'node:fs/promises';
import { extraireCatalogueDesCouleurs } from './catalogue-des-couleurs.mjs';

const racine = new URL('..', import.meta.url);
const constantes = new URL('packages/theme/src/constants/', racine);
const sortie = new URL('packages/storybook/src/couleurs/catalogueDesCouleurs.generated.ts', racine);

const catalogue = extraireCatalogueDesCouleurs({
  palette: await fs.readFile(new URL('Palette.ts', constantes), 'utf8'),
  echelles: await fs.readFile(new URL('Color.ts', constantes), 'utf8'),
});

const contenu = [
  '// Ce fichier est genere par scripts/generer-catalogue-des-couleurs.mjs. Ne pas le modifier.',
  "import type { CatalogueDesCouleurs } from './catalogueDesCouleurs';",
  '',
  // Un token par ligne : le fichier reste lisible et sous la limite de longueur du lint.
  'export const catalogueDuTheme: CatalogueDesCouleurs = {',
  '  tokens: [',
  ...catalogue.tokens.map(token => `    ${JSON.stringify(token)},`),
  '  ],',
  // Une echelle par ligne : ses nuances se lisent cote a cote et le fichier reste sous la
  // limite de taille du lint, que deux cents nuances une par ligne depasseraient.
  '  nuances: [',
  ...Object.values(Object.groupBy(catalogue.nuances, nuance => nuance.echelle)).map(
    nuances => `    ${nuances.map(nuance => JSON.stringify(nuance)).join(', ')},`,
  ),
  '  ],',
  '};',
  '',
].join('\n');

// Un fichier identique garde sa date : Metro et les outils qui surveillent les sources ne se
// reveillent pas pour rien, comme pour le generateur des sources des stories.
const precedent = await fs.readFile(sortie, 'utf8').catch(() => null);
if (precedent !== contenu) await fs.writeFile(sortie, contenu, 'utf8');
