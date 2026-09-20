import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { Switch } from './Switch';

// Voir Checkbox : un seul mecanisme de bague, donc un seul bleu. `focusVisibleStyle` peignait
// l'ancien `#0379EF` la ou la regle CSS du theme pose `#0A76F6`. Le test qui figeait la table
// `switchButtonFocused` a disparu avec elle : la bague ne vit plus dans les styles.
test('demande la bague de focus au theme plutot que de la peindre lui-meme', () => {
  renderWeb(<Switch />);

  expect(screen.getByRole('switch').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});
