import React from 'react';
import { ButtonIcon } from '../Button';
import {
  FormControl,
  FormControlCaption,
  FormControlCaptionProps,
  FormControlHint,
  FormControlHintProps,
  FormControlLabel,
  FormControlLabelProps,
  TextInput,
  TextInputElement,
  TextInputProps,
} from '../FormControl';
import { useStyles } from './PasswordField.styles';

export type PasswordFieldProps = TextInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    onChange?: TextInputProps['onChangeText'];
  };

export const PasswordField = React.forwardRef<TextInputElement, PasswordFieldProps>(function PasswordField(props, ref) {
  const { label, labelRight, hint, error, success, disabled, onChange } = props;

  const styles = useStyles();

  const [visibilityOff, setVisibilityOff] = React.useState(true);

  return (
    <FormControl style={styles.passwordInput}>
      {!!label && (
        <FormControlLabel label={label} labelRight={labelRight} disabled={disabled} error={error} success={success} />
      )}
      {!!hint && <FormControlHint hint={hint} disabled={disabled} />}

      <TextInput
        ref={ref}
        secureTextEntry={visibilityOff}
        endAdornment={
          <ButtonIcon
            size="sm"
            variant="tertiary"
            style={styles.visibilityButton}
            icon={visibilityOff ? 'EyeClosed' : 'Eye'}
            accessibilityLabel={visibilityOff ? 'Afficher le mot de passe' : 'Masquer le mot de passe'}
            onPress={() => setVisibilityOff(initial => !initial)}
          />
        }
        onChangeText={onChange}
        textContentType="password"
        autoComplete="current-password"
        autoCapitalize="none"
        inputMode="text"
        {...props}
      />

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
