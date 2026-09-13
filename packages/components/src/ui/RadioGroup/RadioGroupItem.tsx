import React, { useId } from 'react';
import { Label, TamaguiElement, RadioGroupItemProps as TamaguiRadioGroupItemProps } from 'tamagui';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
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

  return (
    <Box tag="radio-group-item" style={styles.item}>
      <Label unstyled htmlFor={id} style={styles.labelContainer}>
        <Box>
          <RadioInput value={value} id={id} size="md" />
        </Box>

        <Box>
          <Typography style={styles.itemLabel}>{children}</Typography>
        </Box>
      </Label>
    </Box>
  );
};
