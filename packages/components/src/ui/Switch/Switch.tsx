import { useTheme } from '@alveole/theme';
import React, { CSSProperties, useId } from 'react';
import { Label, TamaguiElement, Switch as TamaguiSwitch, SwitchProps as TamaguiSwitchProps } from 'tamagui';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { FormControlCaption } from '../FormControl';
import { apparenceDuSwitch } from './Switch.apparence';
import { useStyles } from './Switch.styles';

export type SwitchElement = TamaguiElement;
export type SwitchProps = Omit<TamaguiSwitchProps, 'value' | 'onChange'> & {
  id?: string;
  label?: string;
  style?: CSSProperties;
  error?: string;
  success?: string;
  noPadding?: boolean;
};

export const Switch = React.forwardRef<SwitchElement, SwitchProps>(function Switch(props, ref) {
  const { checked, style, label, error, success, disabled, noPadding, onCheckedChange, ...switchProps } = props;
  let { id } = props;

  const isControlled = checked !== undefined;
  const [model, setModel] = React.useState(Boolean(checked));
  const value = isControlled ? checked : model;

  const { spacingValue } = useTheme();
  const styles = useStyles();

  const uniqId = useId();
  id = id || `switch--${uniqId}`;

  const onChange = (newValue: boolean) => {
    if (!isControlled) setModel(newValue);
    onCheckedChange?.(newValue);
  };

  const { bouton, pouce, libelle } = apparenceDuSwitch(styles, { value, disabled, noPadding, style });

  const Toggle = (
    <TamaguiSwitch
      id={id}
      ref={ref}
      borderWidth={1}
      checked={value}
      onCheckedChange={onChange}
      style={bouton}
      disabled={disabled}
      focusVisibleStyle={styles.switchButtonFocused}
      {...switchProps}
    >
      <TamaguiSwitch.Thumb animation="quicker" style={pouce} />
    </TamaguiSwitch>
  );

  const ToggleWithLabel = (
    <>
      <Label unstyled htmlFor={id} width={'100%'}>
        <Box tag="switch" style={styles.switch}>
          {Toggle}

          {!!label && (
            <Typography htmlFor={id} style={libelle}>
              {label}
            </Typography>
          )}
        </Box>
      </Label>

      {(error ?? success) && <FormControlCaption error={error} success={success} />}
    </>
  );

  return (
    <Box tag="switch" gap={error || success ? spacingValue('050') : 0} style={styles.switchContainer}>
      {!label ? Toggle : ToggleWithLabel}
    </Box>
  );
});
