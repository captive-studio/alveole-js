import { expect, test, type Page } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// Les dimensions du Skeleton montées de jsdom au navigateur (ADR 0027) : un style déclaré ne
// disait pas la place que le bloc prend à l'écran.

/** La taille rendue de chaque skeleton de la fiche, et la largeur de son parent. */
const blocs = (page: Page) =>
  page.getByRole('main').evaluate(main =>
    Array.from(main.querySelectorAll('skeleton')).map(bloc => ({
      largeur: bloc.getBoundingClientRect().width,
      hauteur: bloc.getBoundingClientRect().height,
      parent: bloc.parentElement!.getBoundingClientRect().width,
    })),
  );

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Skeleton');
});

// L'exemple Paragraphe est la seule boîte qui aligne quatre skeletons ; le deuxième n'a aucune
// dimension.
test('rend un bloc de 16 px sur toute la largeur par défaut', async ({ page }) => {
  const parDefaut = await page.getByRole('main').evaluate(main => {
    const paragraphe = Array.from(main.querySelectorAll('skeleton'))
      .map(bloc => bloc.parentElement!)
      .find(boite => boite.querySelectorAll(':scope > skeleton').length === 4);
    if (!paragraphe) throw new Error('exemple Paragraphe introuvable');

    const bloc = paragraphe.children[1].getBoundingClientRect();

    return { largeur: bloc.width, hauteur: bloc.height, parent: paragraphe.getBoundingClientRect().width };
  });

  expect({ hauteur: parDefaut.hauteur, largeur: parDefaut.largeur }).toEqual({
    hauteur: 16,
    largeur: parDefaut.parent,
  });
});

// L'exemple Carré demande 64 × 64.
test('applique les dimensions demandées', async ({ page }) => {
  expect(await blocs(page)).toContainEqual(expect.objectContaining({ largeur: 64, hauteur: 64 }));
});
