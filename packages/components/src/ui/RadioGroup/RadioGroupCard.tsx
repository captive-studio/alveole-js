import React, { CSSProperties, useId } from 'react';
import { Label, TamaguiElement, RadioGroupItemProps as TamaguiRadioGroupCardProps } from 'tamagui';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './RadioGroup.styles';
import { useRadioGroup } from './RadioGroupContext';
import { RadioInput } from './RadioInput';

export type RadioGroupCardElement = TamaguiElement;

export type RadioGroupCardProps = Pick<TamaguiRadioGroupCardProps, 'value'> & {
  label: string;
  icon?: LucideIconProps['name'];
  style?: CSSProperties;
  separator?: boolean;
};

export const RadioGroupCard = (props: RadioGroupCardProps) => {
  const { label, style, icon, value, separator = true } = props;
  const rid = useId();
  const id = React.useMemo(() => `radiogroup-${value}-${rid}`, [value, rid]);

  const styles = useStyles();
  useRadioGroup();

  return (
    <Box tag="radio-group-card" style={styles.card}>
      <Label unstyled htmlFor={id} display="flex" flexDirection="row" width={'100%'}>
        <Box style={{ ...styles.itemCard, ...style }} hoverStyle={styles.itemCardHover}>
          <Box style={styles.radioGroupCardContent}>
            <RadioInput value={value} id={id} size="sm" />
            {icon && (
              <Box display="flex" flexDirection="row" gap={'050'} style={styles.itemCardIcon}>
                <LucideIcon size="sm" name={icon} />
              </Box>
            )}
            <Box style={{ ...styles.radioGroupCardLabelContainer, ...(separator ? styles.itemCardSeparator : {}) }}>
              <Typography style={styles.radioGroupCardLabel}>{label}</Typography>
            </Box>
          </Box>
        </Box>
      </Label>
    </Box>
  );
};
