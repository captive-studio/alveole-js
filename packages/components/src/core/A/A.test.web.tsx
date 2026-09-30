import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { A } from './A';

// `A` n'avait aucun traitement de focus : au clavier, un lien du kit montrait le contour par
// defaut du navigateur, different de la bague de tous les autres controles. C'est la primitive
// de lien, donc le defaut se voyait partout ou elle sert : barre laterale, fil d'Ariane.
test('demande la bague de focus au theme', () => {
  renderWeb(
    <A href="/quelque-part">
      <span>Aller</span>
    </A>,
  );

  expect(screen.getByRole('link').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});

test('ouvre le lien dans un nouvel onglet avec target="_blank"', () => {
  renderWeb(
    <A href="/quelque-part" target="_blank">
      <span>Aller</span>
    </A>,
  );

  const lien = screen.getByRole('link');
  expect(lien.getAttribute('target')).toBe('_blank');
  expect(lien.getAttribute('rel')).toContain('noopener');
});

test("n'impose aucune cible par defaut", () => {
  renderWeb(
    <A href="/quelque-part">
      <span>Aller</span>
    </A>,
  );

  expect(screen.getByRole('link').getAttribute('target')).toBeNull();
});

// Si le routeur interceptait le clic, il naviguerait dans l'onglet courant malgre la cible.
test('laisse le navigateur gerer le clic quand target="_blank"', () => {
  renderWeb(
    <A href="/quelque-part" target="_blank">
      <span>Aller</span>
    </A>,
  );

  const clic = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
  screen.getByRole('link').dispatchEvent(clic);
  expect(clic.defaultPrevented).toBe(false);
});
