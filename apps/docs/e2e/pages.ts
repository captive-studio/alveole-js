import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Résolu depuis le répertoire de travail, et non depuis ce fichier : Playwright charge
// ces modules en CommonJS tandis que le générateur de baseline les charge en ESM, où
// __dirname n'existe pas. Toutes les commandes se lancent depuis apps/docs.
const DIST = resolve(process.cwd(), 'dist');

// Les pages auditées sont celles que `expo export` a réellement produites, pas une liste
// tenue à la main : une story ajoutée est auditée sans rien déclarer. En contrepartie un
// export incomplet ne produirait aucun test, donc une CI verte à tort : d'où le garde-fou.
export function auditedRoutes(dist: string = DIST): string[] {
  const components = resolve(dist, 'components');
  const routes = existsSync(components)
    ? readdirSync(components)
        .filter(file => file.endsWith('.html'))
        .map(file => `/components/${file.replace(/\.html$/, '')}`)
        .sort()
    : [];

  if (routes.length === 0) {
    throw new Error(
      `Aucune page de composant dans ${dist} : lancer "npm run build --workspace=apps/docs" avant l'audit.`,
    );
  }

  return routes;
}
