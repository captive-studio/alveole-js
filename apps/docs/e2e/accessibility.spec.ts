import { expect, test } from '@playwright/test';
import { auditNavigation, auditRoute, blockThirdParties, openRoute } from './audit';
import { BASELINE_PATH, NAVIGATION_KEY, compare, load } from './baseline';
import { auditedRoutes, navigationRoute } from './pages';
import { countByRule, describeTargets } from './violations';

const baseline = load(BASELINE_PATH);

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

for (const route of auditedRoutes()) {
  test(`accessibilité ${route}`, async ({ page }) => {
    const violations = await auditRoute(page, route);

    const gaps = compare(countByRule(violations), baseline[route] ?? {});

    expect(gaps, `${route}\n${describeTargets(violations)}`).toEqual([]);
  });
}

// La colonne pèse les deux tiers du DOM d'une fiche et ne change pas d'une fiche à l'autre,
// sinon par l'entrée qu'elle marque comme courante : elle est retirée de l'audit des fiches
// et vérifiée ici une fois, depuis une fiche, donc avec ce marquage.
test('accessibilité de la colonne, depuis une fiche', async ({ page }) => {
  await openRoute(page, navigationRoute());

  const violations = await auditNavigation(page);

  const gaps = compare(countByRule(violations), baseline[NAVIGATION_KEY] ?? {});

  expect(gaps, describeTargets(violations)).toEqual([]);
});
