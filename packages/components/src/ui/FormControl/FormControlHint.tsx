import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { useFieldDisabled } from './FieldId';
import { useStyles } from './FormControl.styles';

export type FormControlHintProps = {
  hint?: string;
  disabled?: boolean;
};

export const FormControlHint = (props: FormControlHintProps) => {
  const { hint, disabled: ownDisabled } = props;

  const styles = useStyles();
  const disabled = useFieldDisabled(ownDisabled);

  return (
    <Box tag="form-control-hint" style={styles.hintContainer}>
      <Typography style={{ ...styles.hint, ...(disabled ? styles.hintDisabled : {}) }}>{hint}</Typography>
    </Box>
  );
};
