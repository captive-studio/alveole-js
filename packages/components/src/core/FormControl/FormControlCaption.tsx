import { Box, LucideIcon, Typography } from '@alveole/components';
import { useStyles } from './FormControl.styles';

export type FormControlCaptionProps = {
  error?: string;
  success?: string;
};

export const FormControlCaption = (props: FormControlCaptionProps) => {
  const { error, success } = props;

  const styles = useStyles();

  return (
    <Box tag="form-control-caption" style={styles.caption}>
      {(error != null || success != null) &&
        (success ? (
          <LucideIcon name="CircleCheck" size="sm" color={styles.successText.color} />
        ) : (
          <LucideIcon name="OctagonX" size="sm" color={styles.errorText.color} />
        ))}

      <Typography style={styles.captionText} color={error ? styles.errorText.color : styles.successText.color}>
        {error ?? success}
      </Typography>
    </Box>
  );
};
