import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Heading } from './Heading';

test('rend la balise demandee par `as`', () => {
  renderWeb(<Heading as="h3">Variantes</Heading>);

  expect(screen.getByRole('heading', { level: 3, name: 'Variantes' })).toBeTruthy();
});

test('rend un h2 par defaut', () => {
  renderWeb(<Heading>Variantes</Heading>);

  expect(screen.getByRole('heading', { level: 2 })).toBeTruthy();
});
