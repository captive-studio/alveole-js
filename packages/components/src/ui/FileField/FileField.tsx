import { Alert } from '../../core/Alert';
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

  const onValueChange: typeof onChange = value => {
    const normalizedValue = Array.isArray(value) ? value[0] : value;
    const mimeType = normalizedValue?.mimeType;
    if (type == null || mimeType == null) return onChange(value);

    const fileName = normalizedValue?.name;
    if (
      (type.includes('image') && mimeType.startsWith('image')) ||
      (type.includes('pdf') && mimeType.endsWith('pdf')) ||
      (type.includes('csv') &&
        (mimeType === 'text/csv' || mimeType === 'application/csv' || fileName?.endsWith('.csv')))
    )
      return onChange(value);
    else {
      Alert.alert({
        title: 'Type de fichier incorrect',
        message: `Le format du fichier n'est pas pris en charge`,
      });
    }
  };

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
