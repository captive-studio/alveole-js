import { renderNative } from '@/__tests__/helpers/renderNative';
import { Button } from './Button';

// Le style du bouton se teste hors rendu (buttonStyling.test.tsx) et se mesure dans le
// navigateur (apps/docs/e2e/button.spec.ts) : il ne reste ici que le contrat (ADR 0027).
it('expose un etat accessible desactive pendant le chargement', async () => {
  const { getByRole } = await renderNative(<Button variant="primary" title="Enregistrer" isLoading />);

  expect(getByRole('button').props.accessibilityState).toEqual(expect.objectContaining({ disabled: true }));
});

it('expose l etat deplie quand le bouton ouvre un menu', async () => {
  const { getByRole } = await renderNative(<Button variant="tertiary" title="Filtres" expanded />);

  expect(getByRole('button').props.accessibilityState).toEqual(expect.objectContaining({ expanded: true }));
});
