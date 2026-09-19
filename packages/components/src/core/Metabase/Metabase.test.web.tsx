import { renderHookOnDesktop, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Metabase } from './Metabase';
import { useStyles } from './Metabase.styles';

test('donne un nom accessible au cadre du tableau de bord', () => {
  renderWeb(<Metabase source="https://exemple.test/dashboard" />);

  expect(screen.getByTitle('Tableau de bord Metabase')).toBeTruthy();
});

test('utilise le rayon de bordure de l echelle du theme sur le cadre du tableau de bord', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.metabase.borderRadius).toBe('var(--radius-lg)');
});

test("injecte le script d'embed de l'instance Metabase", () => {
  renderWeb(<Metabase token="jeton" instanceUrl="https://metabase.exemple.test" />);

  expect(document.querySelector('script[src="https://metabase.exemple.test/app/embed.js"]')).toBeTruthy();
});
