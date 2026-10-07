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

test('ouvre un lien externe dans un nouvel onglet avec target="_blank"', () => {
  renderWeb(
    <Link href="https://www.captive.fr" target="_blank">
      Site de Captive
    </Link>,
  );

  const lien = screen.getByRole('link');
  expect(lien.getAttribute('href')).toBe('https://www.captive.fr');
  expect(lien.getAttribute('target')).toBe('_blank');
  expect(lien.getAttribute('rel')).toContain('noopener');
});

// Si le routeur interceptait le clic, il naviguerait dans l'onglet courant malgré la cible.
test('laisse le navigateur gérer le clic quand target="_blank"', () => {
  renderWeb(
    <Link href="https://www.captive.fr" target="_blank">
      Site de Captive
    </Link>,
  );

  const clic = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
  screen.getByRole('link').dispatchEvent(clic);
  expect(clic.defaultPrevented).toBe(false);
});

// WCAG 3.2.5 : changer de contexte sans prévenir désoriente, en particulier au lecteur d'écran.
test('annonce le nouvel onglet dans le nom du lien', () => {
  renderWeb(
    <Link href="https://www.captive.fr" target="_blank">
      Site de Captive
    </Link>,
  );

  expect(screen.getByRole('link', { name: "Site de Captive (s'ouvre dans un nouvel onglet)" })).toBeTruthy();
});

test('affiche l\'icône de lien externe avec target="_blank"', () => {
  renderWeb(
    <Link href="https://www.captive.fr" target="_blank">
      Site de Captive
    </Link>,
  );

  expect(screen.getByRole('link').querySelector('svg')).not.toBeNull();
});

test("n'impose aucune cible ni icône par défaut", () => {
  renderWeb(<Link href="/quelque-part">Aller</Link>);

  const lien = screen.getByRole('link', { name: 'Aller' });
  expect(lien.getAttribute('target')).toBeNull();
  expect(lien.querySelector('svg')).toBeNull();
});
