import React, { useId } from 'react';
import { Platform, Pressable, ViewStyle } from 'react-native';
import { TamaguiElement, RadioGroupItemProps as TamaguiRadioGroupItemProps } from 'tamagui';
import { Label } from 'tamagui/unstyled';
import { Box } from '../../core/Box';
import { versStyleNatif } from '../../core/styleNatif/versStyleNatif';
import { Typography } from '../../core/Typography';
import { useRadioGroup } from './RadioGroupContext';
import { useStyles } from './RadioGroupItem.styles';
import { RadioInput } from './RadioInput';

export type RadioGroupItemElement = TamaguiElement;

export type RadioGroupItemProps = Pick<TamaguiRadioGroupItemProps, 'value'> & {
  children?: string;
};

export const RadioGroupItem = (props: RadioGroupItemProps) => {
  const { children, value } = props;
  const rid = useId();
  const id = React.useMemo(() => `radiogroup-${value}-${rid}`, [value, rid]);

  const styles = useStyles();
  const { onChange, disabled } = useRadioGroup();

  const contenu = (
    <>
      <Box>
        <RadioInput value={value} id={id} size="md" label={children} />
      </Box>

      <Box>
        <Typography style={styles.itemLabel}>{children}</Typography>
      </Box>
    </>
  );

  return (
    <Box tag="radio-group-item" style={styles.item}>
      {Platform.OS === 'web' ? (
        <Label htmlFor={id} style={styles.labelContainer}>
          {contenu}
        </Label>
      ) : (
        // Label est un Text natif : les vues du bouton y deviennent des pièces
        // inline, dont la hauteur dépasse celle du texte et peut être rognée.
        <Pressable
          accessible={false}
          disabled={disabled}
          pointerEvents="box-only"
          style={versStyleNatif<ViewStyle>(styles.labelContainer)}
          onPress={() => onChange?.(value)}
        >
          {contenu}
        </Pressable>
      )}
    </Box>
  );
};
