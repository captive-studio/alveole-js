import { useTheme } from '@alveole/theme';
import React from 'react';
import { Pressable, TextInput as ReactNativeTextInput } from 'react-native';
import { useFieldId } from './FieldId';
import { useStyles } from './FormControl.styles';
import { TextInputElement, TextInputProps } from './TextInput.types';
import { inputFrameStyle, inputTextStyle } from './textInputStyles';

type TextInputMirrorProps = TextInputProps & { isOpen: boolean; onOpen: () => void };

/**
 * Le champ tel qu'il apparait dans le formulaire quand la saisie vit en modale : il a
 * l'allure d'un champ mais n'en est pas un. Tout ce qui pourrait y installer un curseur
 * est neutralise, il ne reste qu'une surface pressable.
 */
export const TextInputMirror = React.forwardRef<TextInputElement, TextInputMirrorProps>(
  function TextInputMirror(props, ref) {
    const { disabled, startAdornment, endAdornment, isOpen, onOpen, ...inputProps } = props;

    const { color } = useTheme();
    const styles = useStyles();
    const fieldId = useFieldId();

    return (
      <Pressable
        accessibilityRole="button"
        style={inputFrameStyle(styles, {
          disabled,
          // Le miroir reste allume tant que la modale est ouverte : c'est lui que l'oeil
          // retrouve en la refermant.
          focus: isOpen,
          startAdornment,
          endAdornment,
          multiline: inputProps.multiline,
        })}
        onPress={onOpen}
      >
        {startAdornment}

        <ReactNativeTextInput
          ref={ref}
          id={inputProps.id ?? fieldId}
          style={inputTextStyle(styles, { startAdornment, endAdornment })}
          readOnly
          editable={false}
          focusable={false}
          pointerEvents="none"
          showSoftInputOnFocus={false}
          caretHidden
          selectTextOnFocus={false}
          contextMenuHidden
          selectionColor="transparent"
          placeholderTextColor={color.text.inverse.muted}
          {...inputProps}
        />

        {endAdornment}
      </Pressable>
    );
  },
);
