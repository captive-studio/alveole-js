import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './FormControl.styles';

export type FormControlCaptionProps = {
  error?: string;
  success?: string;
};

export const FormControlCaption = (props: FormControlCaptionProps) => {
  const { error, success } = props;

  const styles = useStyles();

  const { icon, color } = error
    ? { icon: 'OctagonX' as const, color: styles.errorText.color }
    : { icon: 'CircleCheck' as const, color: styles.successText.color };

  return (
    <Box tag="form-control-caption" style={styles.caption}>
      {(error != null || success != null) && (
        <Box style={styles.captionIcon}>
          <LucideIcon name={icon} size="sm" color={color} />
        </Box>
      )}

      <Typography style={styles.captionText} color={color}>
        {error ?? success}
      </Typography>
    </Box>
  );
};
