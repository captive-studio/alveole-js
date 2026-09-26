import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { RadioGroup } from './index';
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
