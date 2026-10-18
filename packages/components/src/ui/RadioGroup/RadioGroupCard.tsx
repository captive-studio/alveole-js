import React, { CSSProperties, useId } from 'react';
import { TamaguiElement, RadioGroupItemProps as TamaguiRadioGroupCardProps } from 'tamagui';
import { Label } from 'tamagui/unstyled';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Leading, LeadingSlot } from '../Leading';
import { useStyles } from './RadioGroup.styles';
import { useRadioGroup } from './RadioGroupContext';
import { RadioInput } from './RadioInput';

export type RadioGroupCardElement = TamaguiElement;

export type RadioGroupCardProps = Pick<TamaguiRadioGroupCardProps, 'value'> & {
  label: string;
  leading?: Leading;
  style?: CSSProperties;
  separator?: boolean;
};

export const RadioGroupCard = (props: RadioGroupCardProps) => {
  const { label, style, leading, value, separator = true } = props;
  const rid = useId();
  const id = React.useMemo(() => `radiogroup-${value}-${rid}`, [value, rid]);

  const styles = useStyles();
  useRadioGroup();

  return (
    <Box tag="radio-group-card" style={styles.card}>
      <Label htmlFor={id} display="flex" flexDirection="row" width={'100%'}>
        <Box style={{ ...styles.itemCard, ...style }} backgroundColor={{ hover: styles.itemCardHover.backgroundColor }}>
          <Box style={styles.radioGroupCardContent}>
            <RadioInput value={value} id={id} size="sm" />
            {leading != null && (
              <Box display="flex" flexDirection="row" gap={'050'} style={styles.itemCardIcon}>
                <LeadingSlot contenu={leading} apparence={{ size: 'sm' }} />
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
