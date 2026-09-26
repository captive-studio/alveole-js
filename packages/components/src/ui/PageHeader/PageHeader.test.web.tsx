import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { PageHeader } from './PageHeader';

// Le cran typographique du titre se mesure au navigateur (apps/docs/e2e/typographie.spec.ts) :
// il ne reste ici que ce que l'en-tete montre (ADR 0027).
test('montre le titre de la page', () => {
  renderWeb(<PageHeader title="Suivi RH" />);

  expect(screen.getByText('Suivi RH')).toBeTruthy();
});
