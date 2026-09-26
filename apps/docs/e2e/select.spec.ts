import { expect, test, type Locator, type Page } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';
import { BORDURE_DE_FOCUS, finDesTransitions } from './focus';
import { bords } from './mesures';

// Le rendu de Select monté de jsdom au navigateur (ADR 0027) : la hauteur et la bordure
// selon l'état n'y valaient que ce que le style déclaré disait. La règle de priorité des
// bordures est tenue au niveau 1 (selectControlStyle.test.web.tsx) ; ici, on vérifie
// qu'elle arrive jusqu'au cadre que react-select rend.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

const FICHE = '/components/Select';

const selecteur = (page: Page, nom: string) => page.getByRole('main').getByRole('combobox', { name: nom, exact: true });

// react-select compose ses styles lui-même : la bordure se lit sur le `control` qu'il rend,
// l'élément qui contient le combobox.
const cadre = async (page: Page, nom: string) => {
  await finDesTransitions(page);
  return selecteur(page, nom).evaluate(element => {
    const style = window.getComputedStyle(element.closest('div[class*="control"]')!);
    return { couleur: style.borderTopColor, epaisseur: style.borderTopWidth };
  });
};

// Le bouton est passé à `control('md').height` (32px) ; le champ était resté à 42px en dur.
test('aligne la hauteur du champ sur celle du bouton md', async ({ page }) => {
  const hauteur = async (element: Locator) => {
    const { haut, bas } = await bords(element);
    return bas - haut;
  };
  await openRoute(page, '/components/Button');
  const bouton = await hauteur(page.getByRole('main').getByRole('button', { name: 'Bouton md' }));
  await openRoute(page, FICHE);
  const champ = await hauteur(
    selecteur(page, 'Sélection').locator('xpath=ancestor::div[contains(@class, "control")][1]'),
  );

  expect(bouton).toBeGreaterThan(0);
  expect(champ).toBe(bouton);
});

test('ne colore pas la bordure d un sélecteur désactivé', async ({ page }) => {
  await openRoute(page, FICHE);
  const repos = await cadre(page, 'Désactivé');

  await selecteur(page, 'Désactivé').focus();

  expect(await cadre(page, 'Désactivé')).toEqual(repos);
});

// Pendant que le sélecteur est actif, c'est lui qu'il faut pouvoir désigner sans ambiguïté ;
// le verdict de validation reprend la main au blur.
//
// `Autocomplete`, `AutocompleteChip` et `AutocompleteAddress` survivent comme préréglages de
// `Select` (ADR 0007). L'adresse passe par `CreatableSelect` et non par `ReactSelect` : c'est
// un point d'intégration distinct, qui doit rendre le même cadre.
for (const nom of ['Erreur', 'Succès', 'Ville', 'Sélection multiple', 'Adresse']) {
  test(`colore la bordure de ${nom} au focus, puis rend celle du repos`, async ({ page }) => {
    await openRoute(page, FICHE);
    const repos = await cadre(page, nom);

    await selecteur(page, nom).focus();
    const focus = await cadre(page, nom);
    await selecteur(page, nom).blur();

    expect({ focus, apresBlur: await cadre(page, nom) }).toEqual({ focus: BORDURE_DE_FOCUS, apresBlur: repos });
  });
}
