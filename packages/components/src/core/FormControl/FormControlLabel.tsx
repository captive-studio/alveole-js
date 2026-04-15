import { Box, Typography } from '@alveole/components';
import React from 'react';
import { useStyles } from './FormControl.styles';
import { FormControlCaptionProps } from './FormControlCaption';

export type FormControlLabelProps = {
  label: string;
  labelRight?: React.ReactNode;
  disabled?: boolean;
} & FormControlCaptionProps;

export const FormControlLabel = (props: FormControlLabelProps) => {
  const { label, labelRight = false, disabled = false, error, success } = props;

  const styles = useStyles();

  return (
    <Box style={styles.labelContainer}>
      <Typography
        style={{
          ...styles.label,
          ...(error ? styles.errorText : {}),
          ...(success ? styles.successText : {}),
          ...(disabled ? styles.labelDisabled : {}),
        }}
      >
        {label}
      </Typography>
      {label && (
        <Box mt={'auto'} mb={'auto'} ml={'auto'}>
          {labelRight}
        </Box>
      )}
    </Box>
  );
};
