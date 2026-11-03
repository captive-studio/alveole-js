import { expect, test } from '@playwright/test';
import { auditNavigation, auditRoute, blockThirdParties, openRoute } from './audit';
import { BASELINE_PATH, NAVIGATION_KEY, compare, load } from './baseline';
import {
  DEMONSTRATION_PREFIX,
  FROZEN_TIME,
  animatedZones,
  byDemonstration,
  revealWhole,
  snapshotName,
} from './cliches';
import { auditedRoutes, navigationRoute } from './pages';
import { countByRule, describeTargets } from './violations';

const baseline = load(BASELINE_PATH);

// `toHaveScreenshot` doit stabiliser son repère avant de capturer, dans le délai de 5 s
// d'`expect` par défaut. La fiche /theme/css-variables (994 x 39 197 px) le dépassait sur un
// nœud chargé, sans qu'aucune image ne soit prise : 16 échecs sur 40 au délai par défaut,
// 0 sur 40 à 30 s (run 41557337988, ALV-185). 30 s laisse l'audit tenir dans les 90 s du
// test, ces pages tournant entre 22 et 29 s au total.
// Le délai se passe à l'appel : la configuration de Playwright ne type pas `timeout` sous
// `expect.toHaveScreenshot`.
const SCREENSHOT_TIMEOUT = 30_000;

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
  await page.clock.setFixedTime(FROZEN_TIME);
});

for (const route of auditedRoutes()) {
  test(`accessibilité et rendu ${route}`, async ({ page }) => {
    const violations = await auditRoute(page, route);

    const gaps = compare(countByRule(violations), baseline[route] ?? {});

    expect.soft(gaps, `${route}\n${describeTargets(violations)}`).toEqual([]);

    // La page vient d'être attendue jusqu'à ses images pour l'audit : la capturer ici ne
    // coûte que la capture. Seul le repère <main> est comparé, le gabarit autour change
    // trop souvent pour ce qu'il apprendrait (ADR 0011).
    const main = page.getByRole('main');
    await revealWhole(page, main);
    const mask = animatedZones(route).map(selector => main.locator(selector));

    if (!byDemonstration(route)) {
      await expect(main).toHaveScreenshot(snapshotName(route), { mask, timeout: SCREENSHOT_TIMEOUT });
      return;
    }

    // Une démonstration par cliché, sans la documentation qui l'entoure (ADR 0036). Elles se
    // comptent sur la page : un exemple ajouté à la fiche est capturé sans rien déclarer.
    const demonstrations = main.locator(`[data-testid^="${DEMONSTRATION_PREFIX}"]`);
    expect(await demonstrations.count(), `${route} n'expose aucune démonstration`).toBeGreaterThan(0);

    for (const demonstration of await demonstrations.all()) {
      const testId = (await demonstration.getAttribute('data-testid')) ?? '';
      const exemple = testId.slice(DEMONSTRATION_PREFIX.length);

      await expect(demonstration).toHaveScreenshot(snapshotName(route, exemple), { mask, timeout: SCREENSHOT_TIMEOUT });
    }
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
