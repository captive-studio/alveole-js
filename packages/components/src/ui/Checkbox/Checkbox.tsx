import { Box, FormControlCaption } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React, { useId } from 'react';
import { useStyles } from './Checkbox.styles';
import { CheckboxContainer, CheckboxContainerProps, CheckboxElement } from './CheckboxContainer';
import { CheckboxIndicator, CheckboxIndicatorProps } from './CheckboxIndicator';
import { CheckboxLabel, CheckboxLabelProps } from './CheckboxLabel';

export type CheckboxProps = CheckboxContainerProps & CheckboxIndicatorProps & CheckboxLabelProps;

export const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>(function Checkbox(props, ref) {
  const { size, variant, label, error, success, disabled, onCheckedChange } = props;
  const baseProps = { size, variant, label, error, success, disabled, onCheckedChange };

  const { spacingValue } = useTheme();
  const styles = useStyles();

  const id = useId();

  return (
    <Box tag="check-box-container" gap={error || success ? spacingValue('050') : 0} style={styles.checkboxContainer}>
      <Box tag="check-box" style={styles.container}>
        <CheckboxContainer id={id} ref={ref} {...props}>
          <CheckboxIndicator {...baseProps} indeterminate={props.checked === 'indeterminate'} />
        </CheckboxContainer>

        {!!label && <CheckboxLabel htmlFor={id} {...baseProps} />}
      </Box>

      {(error ?? success) && <FormControlCaption error={error} success={success} />}
    </Box>
  );
});
