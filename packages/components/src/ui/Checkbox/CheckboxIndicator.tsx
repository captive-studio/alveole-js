import { LucideIcon } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { Checkbox as TamaguiCheckbox } from 'tamagui';
import { useStyles } from './Checkbox.styles';
import { CheckboxSize, CheckboxVariant, resolveCheckboxSize } from './Checkbox.utils';

export type CheckboxIndicatorProps = {
  size?: CheckboxSize;
  /** @deprecated use `size` ('sm' | 'md') instead */
  variant?: CheckboxVariant;
  indeterminate?: boolean;
  disabled?: boolean;
};

export const CheckboxIndicator = (props: CheckboxIndicatorProps) => {
  const { size, variant, disabled, indeterminate } = props;

  const { color } = useTheme();
  const styles = useStyles();

  const resolvedSize = resolveCheckboxSize(size, variant);

  return (
    <TamaguiCheckbox.Indicator
      style={{
        ...styles.indicator,
        ...(resolvedSize === 'sm' ? styles.checkboxSm : {}),
        ...(disabled ? styles.indicatorDisabled : {}),
      }}
    >
      <LucideIcon
        size={resolvedSize === 'sm' ? 'xs' : 'sm'}
        name={indeterminate ? 'Minus' : 'Check'}
        color={disabled ? color.text['default-grey'] : '#FFFFFF'}
        style={{ margin: 'auto' }}
      />
    </TamaguiCheckbox.Indicator>
  );
};
