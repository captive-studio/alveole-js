import { Box, BoxProps } from '@alveole/components';
import React from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { useStyles } from './From.styles';

export type FormProps = BoxProps & {
  disabledKeyboardOverflow?: boolean;
};

export const Form = (props: FormProps) => {
  const { style, disabledKeyboardOverflow, ...formProps } = props;

  const styles = useStyles();

  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const shouldHandleDismiss = isKeyboardVisible && !disabledKeyboardOverflow;

  return (
    <TouchableWithoutFeedback
      onPress={shouldHandleDismiss ? Keyboard.dismiss : undefined}
      disabled={!shouldHandleDismiss}
    >
      <Box
        tag="form"
        style={[
          {
            ...styles.form,
            ...(Platform.OS === 'ios' && isKeyboardVisible && !disabledKeyboardOverflow
              ? styles.iosPaddingKeyboard
              : Platform.OS === 'android' && isKeyboardVisible && !disabledKeyboardOverflow
                ? styles.androidPaddingKeyboard
                : {}),
          },
          style,
        ]}
        {...formProps}
      />
    </TouchableWithoutFeedback>
  );
};
