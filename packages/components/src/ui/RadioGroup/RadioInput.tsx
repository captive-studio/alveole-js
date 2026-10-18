import { focusRingProps } from '@alveole/theme';
import { RadioGroup as TamaguiRadioGroup } from 'tamagui';
import { useStyles } from './RadioGroup.styles';
import { useRadioGroup } from './RadioGroupContext';

export type RadioInputProps = {
  value: string;
  id: string;
  size: 'sm' | 'md';
  checked?: boolean;
  onChange?: (value: string) => void;
  /** Nom accessible du bouton : le contrôle n'affiche aucun texte de lui-même. */
  label?: string;
};

export const RadioInput = (props: RadioInputProps) => {
  const { value, id, size = 'md', checked, label, onChange: onInputChange } = props;

  const { value: selectedValue, onChange: onGroupChange } = useRadioGroup();
  const isSelected = checked ?? selectedValue === value;

  const styles = useStyles();

  const itemStyles = { ...styles.itemContainer, ...(size === 'sm' ? styles.itemContainerSm : styles.itemContainerMd) };
  // Survol et appui reprenaient fond et bordure de repos pour masquer ceux de Tamagui : en v3,
  // le style inline l'emporte sur ses clauses. La bague de focus au clavier n'apparait pas :
  // `RovingFocusGroup` v3 donne le focus sans `:focus-visible` (ADR 0017, amendement Tamagui
  // v3). Son traitement est sorti d'ALV-128, a mesurer dans le kit.

  const handleChange = () => {
    onInputChange?.(value);
    onGroupChange?.(value);
  };

  const input = (
    <TamaguiRadioGroup.Item
      value={value}
      id={id}
      aria-label={label}
      style={itemStyles}
      {...focusRingProps()}
      onPress={handleChange}
    >
      <TamaguiRadioGroup.Indicator style={styles.itemIndicator} />
    </TamaguiRadioGroup.Item>
  );

  if (checked == null) {
    return input;
  }

  return <TamaguiRadioGroup value={isSelected ? value : ''}>{input}</TamaguiRadioGroup>;
};
