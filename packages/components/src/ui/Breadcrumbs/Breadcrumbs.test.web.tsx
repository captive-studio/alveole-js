import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Breadcrumbs } from './Breadcrumbs';

jest.mock('expo-router', () => ({ ...jest.requireActual('expo-router'), usePathname: () => '/missions/detail' }));

// Tamagui v3 abandonne la clause d'une propriete que `style` pose aussi : le soulignement du
// survol doit vivre sur sa seule prop, jamais en inline.
test('ne pose pas le soulignement des liens en inline, pour que le survol le pose', () => {
  renderWeb(<Breadcrumbs />);

  expect(screen.getByText('Accueil').style.textDecoration).toBe('');
});
