import { expect, test } from '@playwright/test';
import { auditRoute, blockThirdParties } from './audit';
import { BASELINE_PATH, compare, load } from './baseline';
import { auditedRoutes } from './pages';
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
