import { render, screen } from '@/__tests__/helpers/render.web';
import { Metabase } from './Metabase';

test('donne un nom accessible au cadre du tableau de bord', () => {
  render(<Metabase source="https://exemple.test/dashboard" />);

  expect(screen.getByTitle('Tableau de bord Metabase')).toBeTruthy();
});
