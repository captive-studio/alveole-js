import { expect, test } from '@playwright/test';
import { auditNavigation, auditPage, blockThirdParties, openRoute } from './audit';

// Une violation plantée dans la colonne : si l'audit de la fiche la rapporte, c'est qu'il
// lit encore la navigation. Une image sans alternative textuelle est la plus lisible.
const plantInNavigation = (selector: string) =>
  `document.querySelector(${JSON.stringify(selector)}).insertAdjacentHTML('beforeend', '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">')`;

test('l’audit d’une fiche ne lit pas la colonne', async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Divider');
  await page.evaluate(plantInNavigation('nav'));

  expect(await auditPage(page)).toEqual([]);
});

test('l’audit de la colonne, lui, la lit', async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Divider');
  await page.evaluate(plantInNavigation('nav'));

  expect((await auditNavigation(page)).map(violation => violation.id)).toEqual(['image-alt']);
});
