import { expect, test, type Page } from '@playwright/test';
import { ControlSizes } from '../../../packages/theme/src/constants/Control';
import { blockThirdParties } from './audit';
import { valeurCalculee } from './mesures';
import { releverExemple } from './releve';

// Le relevé des écarts de maquette (ADR 0030) compare un nœud Figma aux valeurs calculées d'un
// exemple d'axe. Ce spec prouve la partie mesure sur le bouton `variant=secondary` de la fiche
// Button : chaque propriété relevée vaut ce que le thème donne.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

const releverLeSecondaire = (page: Page) => releverExemple(page, 'Button', 'Secondary');

test('relève la hauteur de l exemple', async ({ page }) => {
  const releve = await releverLeSecondaire(page);

  expect(releve.hauteur).toBe(`${ControlSizes.desktop.md.height}px`);
});

test('relève les marges intérieures de l exemple', async ({ page }) => {
  const releve = await releverLeSecondaire(page);

  expect(releve.margesInterieures).toBe(`0px ${ControlSizes.desktop.md.paddingInline}px`);
});

test('relève la police de l exemple', async ({ page }) => {
  const releve = await releverLeSecondaire(page);

  expect(releve.police).toEqual({
    famille: await valeurCalculee(page, 'fontFamily', 'var(--typography-corps-de-texte-sm-medium-font-family)'),
    taille: await valeurCalculee(page, 'fontSize', 'var(--typography-corps-de-texte-sm-medium-font-size)'),
  });
});

test('relève la graisse de l exemple', async ({ page }) => {
  const releve = await releverLeSecondaire(page);

  expect(releve.graisse).toBe(
    await valeurCalculee(page, 'fontWeight', 'var(--typography-corps-de-texte-sm-medium-font-weight)'),
  );
});

test('relève la couleur de l exemple', async ({ page }) => {
  const releve = await releverLeSecondaire(page);

  expect(releve.couleur).toEqual({
    texte: await valeurCalculee(page, 'color', 'var(--text-action-high-grey)'),
    fond: await valeurCalculee(page, 'backgroundColor', 'var(--background-default-grey)'),
  });
});

test('relève le rayon de l exemple', async ({ page }) => {
  const releve = await releverLeSecondaire(page);

  expect(releve.rayon).toBe(await valeurCalculee(page, 'borderTopLeftRadius', 'var(--radius-md)'));
});

test('relève la bordure de l exemple', async ({ page }) => {
  const releve = await releverLeSecondaire(page);

  expect(releve.bordure).toBe(await valeurCalculee(page, 'borderTop', '1px solid var(--border-default-grey)'));
});
