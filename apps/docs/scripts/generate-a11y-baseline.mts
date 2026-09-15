import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
import { auditRoute, blockThirdParties } from '../e2e/audit.ts';
import { BASELINE_PATH, type Baseline, load, merge } from '../e2e/baseline.ts';
import { auditedRoutes, matching } from '../e2e/pages.ts';
import { countByRule } from '../e2e/violations.ts';

// Génère le fichier de référence du cliquet d'accessibilité. Volontairement séparé du
// runner Playwright : les tests s'exécutent en parallèle et écriraient tous dans le même
// fichier. Ici un seul navigateur parcourt les routes en série, puis écrit une fois.
// Prérequis : `npm run build --workspace=apps/docs` et un serveur sur BASE_URL.
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4173';

// Un motif facultatif restreint l'audit aux pages qui l'incluent : parcourir les 77 pages
// coûte deux minutes, alors qu'une correction n'en concerne qu'une poignée. Les pages non
// auditées gardent leur relevé précédent, sans quoi un audit filtré effacerait la baseline.
const pattern = process.argv[2];
const routes = matching(auditedRoutes(), pattern);

const browser = await chromium.launch();
// axe refuse une page ouverte directement sur le navigateur : il lui faut un contexte.
const context = await browser.newContext({ baseURL: BASE_URL });
const page = await context.newPage();
await blockThirdParties(page);
const baseline: Baseline = {};

for (const route of routes) {
  const counts = countByRule(await auditRoute(page, route));
  if (Object.keys(counts).length > 0) baseline[route] = counts;
  console.log(`${route} : ${Object.values(counts).reduce((a, b) => a + b, 0)}`);
}

await browser.close();

const merged = merge(load(BASELINE_PATH), baseline, routes);

// Clés triées pour que deux régénérations successives produisent le même diff.
const sorted = Object.fromEntries(
  Object.keys(merged)
    .sort()
    .map(route => [route, merged[route]]),
);

writeFileSync(BASELINE_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`baseline écrite : ${Object.keys(sorted).length} routes avec violations, ${routes.length} auditées`);
