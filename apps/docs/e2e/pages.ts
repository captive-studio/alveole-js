import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Résolu depuis le répertoire de travail, et non depuis ce fichier : Playwright charge
// ces modules en CommonJS tandis que le générateur de baseline les charge en ESM, où
// __dirname n'existe pas. Toutes les commandes se lancent depuis apps/docs.
const DIST = resolve(process.cwd(), 'dist');

// Les pages auditées sont celles que le build a réellement déclarées, pas une liste tenue
// à la main : une story ajoutée est auditée sans rien déclarer. La source est le sitemap,
// que `generate-sitemap.mjs` écrit dans public/ et que l'export recopie dans dist/ : il est
// produit quel que soit le mode de rendu, alors que les pages HTML par composant
// n'existent qu'en rendu statique. En contrepartie un build incomplet ne produirait aucun
// test, donc une CI verte à tort : d'où le garde-fou.
export function auditedRoutes(dist: string = DIST): string[] {
  const sitemap = resolve(dist, 'sitemap.xml');
  const xml = existsSync(sitemap) ? readFileSync(sitemap, 'utf8') : '';

  const components = [...xml.matchAll(/<loc>[^<]*\/components\/([^<]+)<\/loc>/g)]
    .map(([, name]) => `/components/${decodeURIComponent(name)}`)
    .sort();

  if (components.length === 0) {
    throw new Error(
      `Aucune page de composant dans ${sitemap} : lancer "npm run build --workspace=apps/docs" avant l'audit.`,
    );
  }

  // La page d'index du catalogue n'est pas un composant et n'apparaît donc pas parmi les
  // routes ci-dessus, mais elle est rendue par le design system et mérite d'être auditée.
  return ['/components', ...components];
}

export function matching(routes: string[], pattern?: string): string[] {
  if (!pattern) return routes;

  const selected = routes.filter(route => route.toLowerCase().includes(pattern.toLowerCase()));

  if (selected.length === 0) {
    throw new Error(`Aucune page ne correspond à "${pattern}" parmi les ${routes.length} pages exportées.`);
  }

  return selected;
}

// La colonne est auditée une fois, depuis une fiche pour couvrir le marquage de l'entrée
// courante. Laquelle importe peu : c'est la première, pour que l'audit ne dépende pas d'un
// nom de composant écrit en dur, qu'un renommage ferait disparaître en silence.
export function navigationRoute(dist: string = DIST): string {
  return auditedRoutes(dist).filter(route => route !== '/components')[0];
}
