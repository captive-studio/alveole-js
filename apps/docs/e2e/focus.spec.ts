import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';
import { BORDURE_DE_FOCUS, CONTROLES, mesurer } from './focus';

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// Ce qu'on attend de chaque champ et de chaque sélecteur du kit, sur sa fiche : la bordure
// prend le token de focus sans s'épaissir, rien ne déborde du cadre, et le repos revient au
// blur. L'amendement de l'ADR 0016 rend un anneau aux champs, mais encastré : l'invariant
// tient à l'écart négatif et à l'absence d'ombre, non à l'absence de contour.
//
// Le champ de prix fait exception : son `containerFocused` ne reprend de `focusBorder()`
// que l'épaisseur et la couleur. Il n'a donc pas d'anneau du tout, et la ligne ci-dessous
// fige le rendu réel : elle tombera le jour où il en recevra un.
for (const [nom, controle] of Object.entries(CONTROLES)) {
  test(`focus ${nom}`, async ({ page }) => {
    await openRoute(page, `/components/${nom}`);

    const mesure = await mesurer(page, controle);

    const { repos, ...auFocus } = mesure;
    expect(auFocus).toEqual({ focus: BORDURE_DE_FOCUS, apresBlur: repos, anneau: controle.anneau, ombre: 'none' });
  });
}

// `editable={false}` est le mot de React Native pour « on n'écrit pas ici » : atteint au
// clavier, le champ ne doit pas prendre l'apparence d'un champ actif. La fiche TextInput
// en montre un ; la règle elle-même, `readOnly` compris, est tenue par `useFieldFocus`
// (packages/components/src/ui/FormControl/useFieldFocus.test.tsx).
test('focus TextInput non modifiable', async ({ page }) => {
  await openRoute(page, '/components/TextInput');

  const mesure = await mesurer(page, { champ: 'input[readonly]', cadre: 'parent' });

  expect(mesure.focus).toEqual(mesure.repos);
});
