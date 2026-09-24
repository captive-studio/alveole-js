import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { useFieldDisabled, useFieldId } from './FieldId';
import { useStyles } from './FormControl.styles';

export type FormControlLabelProps = {
  label: string;
  labelRight?: React.ReactNode;
  optional?: boolean;
  optionalText?: string;
  disabled?: boolean;
};

export const FormControlLabel = (props: FormControlLabelProps) => {
  const { label, labelRight, optional = false, optionalText = '(optionnel)', disabled: ownDisabled } = props;

  const styles = useStyles();
  const fieldId = useFieldId();
  const disabled = useFieldDisabled(ownDisabled);

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
      {!!optional && <Typography style={styles.optionalText}>{optionalText}</Typography>}
      {!!label && (
        <Box mt={'auto'} mb={'auto'} ml={'auto'}>
          {labelRight}
        </Box>
      )}
    </Box>
  );
};
