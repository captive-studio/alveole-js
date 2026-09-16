import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { PageHeader } from './PageHeader';

// Le titre d'un en-tete d'application se lit dans le registre de l'application, pas dans celui
// d'un site de documentation. Atlassian pose le sien a 24, Primer a 20 par defaut : `H4 - SM`
// nous cale sur Atlassian, au-dessus du defaut de Primer.
test('titre une page dans le registre applicatif', () => {
  renderWeb(<PageHeader title="Suivi RH" />);

  // Le theme web rend des variables CSS, pas leurs valeurs : c'est le cran qui se verifie ici,
  // la taille en pixels se mesure au navigateur.
  expect(window.getComputedStyle(screen.getByText('Suivi RH')).fontSize).toBe(
    'var(--typography-titres-h4-sm-font-size)',
  );
});
