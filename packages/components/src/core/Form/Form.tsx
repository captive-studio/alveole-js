import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Box, BoxProps } from '../Box';
import { useStyles } from './Form.styles';

export type FormProps = BoxProps;

export const Form = (props: FormProps) => {
  const { style, ...formProps } = props;
  const styles = useStyles();

  return (
    <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
      <Box tag="form" style={[styles.form, style]} {...formProps} />
    </TouchableWithoutFeedback>
  );
};
