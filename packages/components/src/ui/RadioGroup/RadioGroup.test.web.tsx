import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { RadioGroup } from './index';
import { RadioGroupCard } from './RadioGroupCard';
import { RadioInput } from './RadioInput';

// Voir Checkbox : un seul mecanisme de bague, donc un seul bleu. Le test qui figeait la table
// `itemContainerFocused` a disparu avec elle : la bague ne vit plus dans les styles.
test('demande la bague de focus au theme plutot que de la peindre lui-meme', () => {
  renderWeb(
    <RadioGroup value="a" label="Choix">
      <RadioInput value="a" id="a" size="md" label="Premier" />
    </RadioGroup>,
  );

  expect(screen.getByRole('radio').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});

test('nomme le groupe de son libellé', () => {
  renderWeb(
    <RadioGroup value="a" label="Civilité">
      <RadioInput value="a" id="a" size="md" label="Madame" />
    </RadioGroup>,
  );

  expect(screen.getByRole('radiogroup', { name: 'Civilité' })).toBeTruthy();
});

// Le survol de la carte passe par une clause de Tamagui v3, rendue en classe atomique :
// sans elle, la carte ne reagit plus au pointeur.
test('pose le fond de survol de la carte en classe Tamagui', () => {
  const { container } = renderWeb(
    <RadioGroup value="a" label="Choix">
      <RadioGroupCard value="a" label="Premier" />
    </RadioGroup>,
  );
  const carte = container.querySelector('radio-group-card label > *');

  expect(carte?.className).toMatch(/_b-/);
});
