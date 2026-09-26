import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { ButtonIcon } from './ButtonIcon';

// `ButtonIcon` n'avait aucun traitement de focus, ni state ni style : en navigateur il
// affichait le `2px auto` gris-bleu par defaut de Chrome, la ou un `Button` pose a cote
// montrait la bague du kit. Deux boutons de la meme famille, deux focus differents.
test('demande la bague de focus au theme, comme Button', () => {
  renderWeb(<ButtonIcon variant="primary" icon="Plus" accessibilityLabel="Ajouter" />);

  expect(screen.getByRole('button').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});
