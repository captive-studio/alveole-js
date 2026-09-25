import { InputButtonAdornment } from '../InputButtonAdornment';

export type NumberInputControlButtonProps = {
  step?: number;
  action: 'plus' | 'moins';
  disabled?: boolean;
  onPress: (addValue: number) => void;
};

export const NumberInputControlButton = (props: NumberInputControlButtonProps) => {
  const { step = 1, action, disabled, onPress } = props;

  return (
    <InputButtonAdornment
      icon={action === 'plus' ? 'Plus' : 'Minus'}
      accessibilityLabel={action === 'plus' ? `Augmenter de ${step}` : `Diminuer de ${step}`}
      position={action === 'moins' ? 'start' : 'end'}
      disabled={disabled}
      onPress={() => onPress(action === 'plus' ? step : -step)}
    />
  );
};
