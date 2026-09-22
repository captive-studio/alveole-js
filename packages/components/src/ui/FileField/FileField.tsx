import {
  FieldFrame,
  FormControlCaptionProps,
  FormControlFileInput,
  FormControlFileInputProps,
  FormControlFileInputValue,
  FormControlHintProps,
  FormControlLabelProps,
  valideLeType,
} from '../FormControl';
import { useStyles } from './FileField.styles';

export type FileFieldValue = FormControlFileInputValue;
export type FileFieldProps = FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps &
  FormControlFileInputProps;

export const FileField = (props: FileFieldProps) => {
  const { type, onChange } = props;

  const styles = useStyles();

  const onValueChange = valideLeType({ type, onChange });

  return (
    <FieldFrame {...props} style={styles.fileInput}>
      <FormControlFileInput {...props} onChange={onValueChange} />
    </FieldFrame>
  );
};
