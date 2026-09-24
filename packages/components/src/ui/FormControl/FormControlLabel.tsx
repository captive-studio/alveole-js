import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { useFieldDisabled, useFieldId, useFieldRequired } from './FieldId';
import { useStyles } from './FormControl.styles';

export type FormControlLabelProps = {
  label: string;
  labelRight?: React.ReactNode;
  disabled?: boolean;
};

export const FormControlLabel = (props: FormControlLabelProps) => {
  const { label, labelRight, disabled: ownDisabled } = props;

  const styles = useStyles();
  const fieldId = useFieldId();
  const disabled = useFieldDisabled(ownDisabled);
  const required = useFieldRequired();

  return (
    <Box tag="form-control-label" style={styles.labelContainer}>
      <Typography
        tag="label"
        htmlFor={fieldId}
        style={{
          ...styles.label,
          ...(disabled ? styles.labelDisabled : {}),
        }}
      >
        {label}
      </Typography>
      {!!required && (
        <Typography aria-hidden style={styles.requiredMarker}>
          *
        </Typography>
      )}
      {!!label && (
        <Box mt={'auto'} mb={'auto'} ml={'auto'}>
          {labelRight}
        </Box>
      )}
    </Box>
  );
};
