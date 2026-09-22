import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE, LINK_ATTRIBUTE } from '@alveole/theme';
import { LinkAccessContext } from '../../core/A';
import { Link } from './Link';

test('rend un lien vers sa destination, avec son texte', () => {
  renderWeb(<Link href="/quelque-part">Aller</Link>);

  expect(screen.getByRole('link', { name: 'Aller' }).getAttribute('href')).toBe('/quelque-part');
});

// Un lien pris dans du texte ne doit pas se distinguer par sa seule couleur (WCAG 1.4.1) : il
// est souligné au repos, comme chez Atlassian et Base.
test('souligne son texte au repos', () => {
  renderWeb(<Link href="/quelque-part">Aller</Link>);

  expect(getComputedStyle(screen.getByRole('link')).textDecoration).toBe('underline');
});

test("prend la couleur d'action du theme", () => {
  renderWeb(<Link href="/quelque-part">Aller</Link>);

  expect(getComputedStyle(screen.getByRole('link')).color).toBe('var(--text-action-high-info)');
});

// Au survol, le soulignement disparaît (comme chez Atlassian) : le changement signale le lien sous
// le pointeur sans rien déplacer.
test('retire le soulignement au survol', () => {
  renderWeb(<Link href="/quelque-part">Aller</Link>);

  expect(screen.getByRole('link').className).toContain('hover-none');
});

// Un lien de texte vit au milieu d'une phrase : aucun de ses éléments ne doit la couper.
test('reste dans le fil du texte', () => {
  renderWeb(<Link href="/quelque-part">Aller</Link>);

  expect(getComputedStyle(screen.getByRole('link')).display).toBe('inline');
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
