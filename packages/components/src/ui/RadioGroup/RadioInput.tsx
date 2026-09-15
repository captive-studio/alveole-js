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
  const indicatorStyle = { ...styles.itemContainer, ...(isSelected ? styles.itemContainerActive : {}) };

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
      focusStyle={styles.itemContainerActive}
      hoverStyle={indicatorStyle as any}
      pressStyle={styles.itemContainerActive}
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
