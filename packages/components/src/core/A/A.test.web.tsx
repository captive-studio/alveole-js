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
