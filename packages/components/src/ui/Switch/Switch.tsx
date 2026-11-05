import { focusRingProps } from '@alveole/theme';
import React, { CSSProperties, useId } from 'react';
import { Platform, Pressable } from 'react-native';
import { TamaguiElement, Switch as TamaguiSwitch, SwitchProps as TamaguiSwitchProps } from 'tamagui';
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
  /** `md` par défaut ; `lg` reprend la taille d'avant la 2.0. */
  size?: SwitchTaille;
};

export type SwitchTaille = 'sm' | 'md' | 'lg';

type SwitchLabelProps = React.PropsWithChildren<{
  id: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}>;

const SwitchLabel = ({ id, checked, disabled, onChange, children }: SwitchLabelProps) =>
  Platform.OS === 'web' ? (
    <Label htmlFor={id} width="100%">
      {children}
    </Label>
  ) : (
    // Un Label natif est un Text : la piste ne doit pas devenir une vue inline.
    <Pressable accessible={false} disabled={disabled} pointerEvents="box-only" onPress={() => onChange(!checked)}>
      {children}
    </Pressable>
  );

// La piste du pouce, comme Tamagui v1 la dimensionnait : deux pouces de large, un de haut, plus
// 4 px pour le padding et la bordure qu'Alveole pose de chaque cote. La v2 ne compte plus ces
// 4 px, et le pouce debordait de sa piste. La taille de reference etait le token `$true` de la
// config de l'application, 44 px ; la config v5 de Tamagui v3 ne le fournit plus, Alveole la fixe.
// `lg` garde ce pouce historique ; `md` et `sm` le réduisent.
const POUCES: Record<SwitchTaille, number> = { sm: 16, md: 22, lg: Math.round(44 * 0.65) };
const dimensionsDeLaPiste = (pouce: number) => ({ width: 2 * pouce + 4, height: pouce + 4, minHeight: pouce + 4 });

export const Switch = React.forwardRef<SwitchElement, SwitchProps>(function Switch(props, ref) {
  const {
    checked,
    style,
    label,
    error,
    success,
    disabled,
    noPadding,
    size = 'md',
    onCheckedChange,
    ...switchProps
  } = props;
  let { id } = props;

  const isControlled = checked !== undefined;
  const [model, setModel] = React.useState(Boolean(checked));
  const value = isControlled ? checked : model;

  const styles = useStyles();
  const pouceTaille = POUCES[size];

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
      {...dimensionsDeLaPiste(pouceTaille)}
      checked={value}
      onCheckedChange={onChange}
      style={bouton}
      disabled={disabled}
      accessibilityLabel={label}
      accessibilityRole="switch"
      accessibilityState={{ checked: Boolean(value), disabled: Boolean(disabled) }}
      // La bague passe par la seule marque du theme (ADR 0017, amendement Tamagui v3).
      {...focusRingProps()}
      {...switchProps}
    >
      <TamaguiSwitch.Thumb {...animer('quicker')} width={pouceTaille} height={pouceTaille} style={pouce} />
    </TamaguiSwitch>
  );

  const ToggleWithLabel = (
    <>
      <SwitchLabel id={id} checked={value} disabled={disabled} onChange={onChange}>
        <Box tag="switch" style={styles.switch}>
          {Toggle}

          {!!label && (
            <Typography htmlFor={id} style={libelle}>
              {label}
            </Typography>
          )}
        </Box>
      </SwitchLabel>

      {(error ?? success) && <FormControlCaption error={error} success={success} />}
    </>
  );

  return (
    <Box tag="switch" gap={error || success ? '1W' : '0V'} style={styles.switchContainer}>
      {!label ? Toggle : ToggleWithLabel}
    </Box>
  );
});
