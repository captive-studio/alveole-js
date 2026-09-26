import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE, LINK_ATTRIBUTE } from '@alveole/theme';
import { LinkAccessContext } from '../../core/A';
import { Link } from './Link';

test('rend un lien vers sa destination, avec son texte', () => {
  renderWeb(<Link href="/quelque-part">Aller</Link>);

  expect(screen.getByRole('link', { name: 'Aller' }).getAttribute('href')).toBe('/quelque-part');
});

test('demande la bague de focus au theme', () => {
  renderWeb(<Link href="/quelque-part">Aller</Link>);

  expect(screen.getByRole('link').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});

test("n'affiche que son texte quand la destination est interdite", () => {
  renderWeb(
    <LinkAccessContext.Provider value={() => false}>
      <Link href="/interdit">Aller</Link>
    </LinkAccessContext.Provider>,
  );

  expect(screen.queryByRole('link')).toBeNull();
  expect(screen.getByText('Aller')).toBeTruthy();
});

// Sans écart, le navigateur colle le trait aux lettres. `text-underline-offset` n'a pas
// d'équivalent React Native : Tamagui et react-native-web le retirent de tout `style`. L'écart
// vient donc de la feuille du thème, qui ne vise que les éléments marqués.
test('porte la marque qui écarte le soulignement du texte', () => {
  renderWeb(<Link href="/quelque-part">Aller</Link>);

  expect(screen.getByRole('link').hasAttribute(LINK_ATTRIBUTE)).toBe(true);
});
