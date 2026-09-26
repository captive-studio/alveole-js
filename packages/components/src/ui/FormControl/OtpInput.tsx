import React from 'react';
import type { TextInputProps } from 'react-native';
import { OtpInput as OtpEntry, OtpInputProps as OtpEntryProps, OtpInputRef } from 'react-native-otp-entry';
import { Box } from '../../core/Box';
import { versStyleNatif } from '../../core/styleNatif/versStyleNatif';
import { useFieldId } from './FieldId';
import { useStyles } from './OtpInput.styles';
import { otpTheme } from './otpTheme';

export type OtpInputElement = OtpInputRef;
export type OtpInputProps = Omit<OtpEntryProps, 'style' | 'theme' | 'focusColor' | 'onTextChange'> & {
  readOnly?: boolean;
  error?: string;
  success?: string;
  onChange?: OtpEntryProps['onTextChange'];
};

export const OtpInput = React.forwardRef<OtpInputElement, OtpInputProps>(function OtpInput(props, ref) {
  const { disabled, readOnly, error, success, onChange, textInputProps, ...inputProps } = props;

  const fieldId = useFieldId();
  const styles = useStyles();

  return (
    <Box tag="form-control-otp-input">
      <OtpEntry
        ref={ref}
        disabled={disabled || readOnly}
        // La bibliotheque colore d'elle-meme la bordure de la cellule active et le curseur
        // clignotant avec `focusColor`, dont le defaut est un vert sans rapport avec le kit.
        focusColor={styles.focusedPinCodeContainerStyle.borderColor}
        theme={otpTheme(styles, { disabled, error, success })}
        onTextChange={onChange}
        // `outline` est une propriete du web que le `TextStyle` de react-native ne connait
        // pas : la conversion est explicite ici parce que c'est la frontiere, comme dans
        // `ButtonIcon`. Le style lui-meme se relit et s'eprouve dans la table.
        textInputProps={{
          id: fieldId,
          style: versStyleNatif<TextInputProps['style']>(styles.hiddenInputStyle),
          ...textInputProps,
        }}
        {...inputProps}
      />
    </Box>
  );
});
