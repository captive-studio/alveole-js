import {
  FormControl,
  FormControlCaption,
  FormControlCaptionProps,
  FormControlFileInput,
  FormControlFileInputProps,
  FormControlFileInputValue,
  FormControlHint,
  FormControlHintProps,
  FormControlLabel,
  FormControlLabelProps,
  valideLeType,
} from '../FormControl';
import { InputHeading } from '../InputHeading';
import { useStyles } from './FileField.styles';

export type FileFieldValue = FormControlFileInputValue;
export type FileFieldProps = FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps &
  FormControlFileInputProps;

export const FileField = (props: FileFieldProps) => {
  const { label, labelRight, hint, error, success, disabled, type, onChange } = props;

  const styles = useStyles();

  const onValueChange = valideLeType({ type, onChange });

  return (
    <FormControl style={styles.fileInput}>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <FormControlFileInput {...props} onChange={onValueChange} />

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
};
