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

// La piste se dimensionnait sur le token `$true` de la config de l'application, que la config
// v5 de Tamagui v3 ne fournit plus : la piste perdait sa taille. Elle garde celle de la v2.
test('garde à la piste la taille de Tamagui v2', () => {
  renderWeb(<Switch />);

  const { width, height } = getComputedStyle(screen.getByRole('switch'));
  expect({ width, height }).toEqual({ width: '62px', height: '33px' });
});

// Le pouce tirait lui aussi sa taille du token `$true` : sans lui, Tamagui v3 le pose a 18 px
// et il flotte dans la piste. Il en occupe la moitie, padding et bordure deduits.
test('dimensionne le pouce sur la moitie de la piste', () => {
  renderWeb(<Switch />);

  const pouce = screen.getByRole('switch').querySelector('[data-disable-theme]')!;
  const { width, height } = getComputedStyle(pouce);
  expect({ width, height }).toEqual({ width: '29px', height: '29px' });
});
