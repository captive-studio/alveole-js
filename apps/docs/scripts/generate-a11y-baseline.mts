import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
import { auditRoute, blockThirdParties } from '../e2e/audit.ts';
import { BASELINE_PATH, type Baseline } from '../e2e/baseline.ts';
import { auditedRoutes } from '../e2e/pages.ts';
import { countByRule } from '../e2e/violations.ts';

// Génère le fichier de référence du cliquet d'accessibilité. Volontairement séparé du
// runner Playwright : les tests s'exécutent en parallèle et écriraient tous dans le même
// fichier. Ici un seul navigateur parcourt les routes en série, puis écrit une fois.
// Prérequis : `npm run build --workspace=apps/docs` et un serveur sur BASE_URL.
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4173';

const browser = await chromium.launch();
// axe refuse une page ouverte directement sur le navigateur : il lui faut un contexte.
const context = await browser.newContext({ baseURL: BASE_URL });
const page = await context.newPage();
await blockThirdParties(page);
const baseline: Baseline = {};

for (const route of auditedRoutes()) {
  const counts = countByRule(await auditRoute(page, route));
  if (Object.keys(counts).length > 0) baseline[route] = counts;
  console.log(`${route} : ${Object.values(counts).reduce((a, b) => a + b, 0)}`);
}

await browser.close();

// Clés triées pour que deux régénérations successives produisent le même diff.
const sorted = Object.fromEntries(
  Object.keys(baseline)
    .sort()
    .map(route => [route, baseline[route]]),
);

writeFileSync(BASELINE_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`baseline écrite : ${Object.keys(baseline).length} routes avec violations`);
