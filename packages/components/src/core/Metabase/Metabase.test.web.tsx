import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Metabase } from './Metabase';

test('donne un nom accessible au cadre du tableau de bord', () => {
  renderWeb(<Metabase source="https://exemple.test/dashboard" />);

  expect(screen.getByTitle('Tableau de bord Metabase')).toBeTruthy();
});
