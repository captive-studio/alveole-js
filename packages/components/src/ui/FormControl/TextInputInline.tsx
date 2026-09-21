import { useTheme } from '@alveole/theme';
import React from 'react';
import { BlurEvent, FocusEvent, Platform, TextInput as ReactNativeTextInput } from 'react-native';
import { Box } from '../../core/Box';
import { useFieldId } from './FieldId';
import { useStyles } from './FormControl.styles';
import { TextInputElement, TextInputProps } from './TextInput.types';
import { inputFrameStyle, inputTextStyle } from './textInputStyles';
import { useFieldFocus } from './useFieldFocus';

/**
 * Chaque plateforme a son mot pour « ce champ ne participe pas ». Le web a l'attribut
 * `disabled`, que React Native ne connait pas et que TypeScript refuse sur son `TextInput` ;
 * le natif a `editable={false}`. `readOnly` ne conviendrait ni a l'un ni a l'autre : il
 * laisse le champ focusable au clavier et soumis avec le formulaire.
 */
const desactivationDe = (disabled?: boolean | null) =>
  disabled !== true ? null : Platform.OS === 'web' ? { disabled: true } : { editable: false };

/**
 * La saisie ordinaire : on ecrit dans le champ la ou il est. Le focus est tenu ici et non
 * laisse a la plateforme, parce que le contour se dessine sur le cadre et non sur le champ.
 */
export const TextInputInline = React.forwardRef<TextInputElement, TextInputProps>(function TextInputInline(props, ref) {
  const {
    disabled,
    readOnly,
    editable,
    error,
    success,
    startAdornment,
    endAdornment,
    onFocus,
    onBlur,
    onPressIn,
    ...inputProps
  } = props;

  const { color } = useTheme();
  const styles = useStyles();
  const fieldId = useFieldId();

  const champ = useFieldFocus<FocusEvent, BlurEvent>({ disabled, readOnly, editable, onFocus, onBlur });
  const inputRef = React.useRef<ReactNativeTextInput>(null);

  React.useImperativeHandle(ref, () => inputRef.current as ReactNativeTextInput);

  return (
    <Box
      tag="form-control-text-input-inner"
      style={inputFrameStyle(styles, {
        disabled,
        focus: champ.focus,
        error,
        success,
        startAdornment,
        endAdornment,
        multiline: inputProps.multiline,
      })}
    >
      {startAdornment}

      <ReactNativeTextInput
        ref={inputRef}
        id={inputProps.id ?? fieldId}
        style={inputTextStyle(styles, { startAdornment, endAdornment })}
        readOnly={readOnly === true}
        editable={editable}
        onFocus={champ.handleFocus}
        onBlur={champ.handleBlur}
        onPressIn={onPressIn}
        showSoftInputOnFocus={inputProps.showSoftInputOnFocus}
        caretHidden={inputProps.caretHidden}
        selectTextOnFocus={inputProps.selectTextOnFocus}
        contextMenuHidden={inputProps.contextMenuHidden}
        selectionColor={inputProps.selectionColor}
        placeholderTextColor={color.text.inverse.muted}
        {...inputProps}
        {...desactivationDe(disabled)}
      />

      {endAdornment}
    </Box>
  );
});
