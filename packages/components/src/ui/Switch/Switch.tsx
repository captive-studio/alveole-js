import { focusRingProps, useTheme } from '@alveole/theme';
import React, { CSSProperties, useId } from 'react';
import {
  getTokens,
  getVariableValue,
  TamaguiElement,
  Switch as TamaguiSwitch,
  SwitchProps as TamaguiSwitchProps,
} from 'tamagui';
import { Label } from 'tamagui/unstyled';
import { animer } from '../../core/animation/animer';
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

// La piste du pouce, comme Tamagui v1 la dimensionnait : deux pouces de large, un de haut, plus
// 4 px pour le padding et la bordure qu'Alveole pose de chaque cote. La v2 ne compte plus ces
// 4 px, et le pouce debordait de sa piste.
const dimensionsDeLaPiste = (taille: number) => {
  const pouce = Math.round(taille * 0.65);
  return { width: 2 * pouce + 4, height: pouce + 4, minHeight: pouce + 4 };
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
      {...dimensionsDeLaPiste(getVariableValue(getTokens().size.$true))}
      checked={value}
      onCheckedChange={onChange}
      style={bouton}
      disabled={disabled}
      // La bague passe par la seule marque du theme (ADR 0017, amendement Tamagui v3).
      {...focusRingProps()}
      {...switchProps}
    >
      <TamaguiSwitch.Thumb {...animer('quicker')} style={pouce} />
    </TamaguiSwitch>
  );

  const ToggleWithLabel = (
    <>
      <Label htmlFor={id} width={'100%'}>
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
