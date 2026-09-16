import { useTheme } from '@alveole/theme';
import React from 'react';
import { BlurEvent, FocusEvent, TextInput as ReactNativeTextInput } from 'react-native';
import { Box } from '../../core/Box';
import { useFieldId } from './FieldId';
import { useStyles } from './FormControl.styles';
import { TextInputElement, TextInputProps } from './TextInput.types';
import { inputFrameStyle, inputTextStyle } from './textInputStyles';

/**
 * La saisie ordinaire : on ecrit dans le champ la ou il est. Le focus est tenu ici et non
 * laisse a la plateforme, parce que le contour se dessine sur le cadre et non sur le champ.
 */
export const TextInputInline = React.forwardRef<TextInputElement, TextInputProps>(function TextInputInline(props, ref) {
  const { disabled, readOnly, startAdornment, endAdornment, onFocus, onBlur, onPressIn, ...inputProps } = props;

  const { color } = useTheme();
  const styles = useStyles();
  const fieldId = useFieldId();

  const [focus, setFocus] = React.useState(false);
  const inputRef = React.useRef<ReactNativeTextInput>(null);

  React.useImperativeHandle(ref, () => inputRef.current as ReactNativeTextInput);

  const handleFocus = (e: FocusEvent) => {
    if (!disabled && !readOnly) setFocus(true);
    onFocus?.(e);
  };

  const handleBlur = (e: BlurEvent) => {
    if (!disabled && !readOnly) setFocus(false);
    onBlur?.(e);
  };

  return (
    <Box
      tag="form-control-text-input-inner"
      style={inputFrameStyle(styles, {
        disabled,
        focus,
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
        readOnly={disabled === true || readOnly === true}
        editable={inputProps.editable}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPressIn={onPressIn}
        showSoftInputOnFocus={inputProps.showSoftInputOnFocus}
        caretHidden={inputProps.caretHidden}
        selectTextOnFocus={inputProps.selectTextOnFocus}
        contextMenuHidden={inputProps.contextMenuHidden}
        selectionColor={inputProps.selectionColor}
        placeholderTextColor={color.text.inverse.muted}
        {...inputProps}
      />

      {endAdornment}
    </Box>
  );
});
