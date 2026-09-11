import { Typography } from '@alveole/components';
import { Label, LabelProps } from 'tamagui';
import { useStyles } from './Checkbox.styles';
import { CheckboxSize, CheckboxVariant, resolveCheckboxSize } from './Checkbox.utils';

export type CheckboxLabelProps = {
  size?: CheckboxSize;
  /** @deprecated use `size` ('sm' | 'md') instead */
  variant?: CheckboxVariant;
  label?: string;
  error?: string;
  success?: string;
};

export const CheckboxLabel = (props: CheckboxLabelProps & LabelProps) => {
  const { size, variant, disabled, error, success, label, ...labelProps } = props;

  const styles = useStyles();

  const resolvedSize = resolveCheckboxSize(size, variant);

  return (
    <Label unstyled disabled={disabled} {...labelProps} width={'100%'}>
      <Typography
        style={{
          ...styles.label,
          ...(resolvedSize === 'sm' ? styles.labelSm : {}),
          ...(disabled ? styles.labelDisabled : {}),
          ...(success ? styles.labelSuccess : {}),
          ...(error ? styles.labelError : {}),
        }}
        tag="check-box-label"
      >
        {label}
      </Typography>
    </Label>
  );
};
