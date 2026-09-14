import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import type { Result } from 'axe-core';

// Ces règles portent sur la structure du document qui héberge un composant : un unique
// <main>, un <h1>, tout le contenu dans une région. C'est la responsabilité de l'app qui
// consomme le design system, pas celle des composants publiés ; les laisser actives
// noierait les violations réelles sous des centaines d'occurrences propres au catalogue.
export const PAGE_STRUCTURE_RULES = ['region', 'landmark-one-main', 'page-has-heading-one', 'landmark-unique'];

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1']);

// axe descend dans les iframes. Les stories qui en embarquent une vers un service tiers
// (Metabase) faisaient donc auditer du HTML distant : des violations qui ne sont pas les
// nôtres, et intermittentes selon que le chargement distant avait abouti avant le scan.
// L'iframe reste vide, mais les règles portant sur l'élément <iframe> lui-même, celui que
// le design system produit, restent évaluées. À installer une fois par page.
export async function blockThirdParties(page: Page): Promise<void> {
  await page.route('**/*', route =>
    LOCAL_HOSTS.has(new URL(route.request().url()).hostname) ? route.continue() : route.abort(),
  );
}

// L'app est hydratée côté client : au `load`, le document ne contient encore que la
// coquille, et auditer là ne verrait aucun composant. On attend le premier titre rendu
// plutôt qu'un délai fixe. Les pages d'index n'en ont pas : leur absence n'est pas une
// erreur, l'audit qui suit se chargera de constater ce qui est effectivement rendu.
export async function auditRoute(page: Page, route: string): Promise<Result[]> {
  await page.goto(route);
  await page
    .getByRole('heading')
    .first()
    .waitFor({ timeout: 10_000 })
    .catch(() => undefined);

  const { violations } = await new AxeBuilder({ page }).disableRules(PAGE_STRUCTURE_RULES).analyze();

  return violations;
}
