import type { NumberInputProps } from './NumberInput';
import { NumberInputControlButton } from './NumberInputControlButton';

/**
 * Avec `controlButton`, les boutons moins et plus prennent la place des adornments : ils
 * encadrent la valeur. Le moins s'efface au minimum, ou il ne rendrait qu'une valeur refusee.
 */
export const adornmentsDePas = (props: NumberInputProps) => {
  const { controlButton, value, step, min, onChange, startAdornment, endAdornment } = props;
  if (!controlButton) return { startAdornment, endAdornment };

  const avancer = (pas: number) => onChange?.((value ?? 0) + pas);

  return {
    startAdornment: (
      <NumberInputControlButton action="moins" step={step} disabled={min != null && min === value} onPress={avancer} />
    ),
    endAdornment: <NumberInputControlButton action="plus" step={step} onPress={avancer} />,
  };
};
