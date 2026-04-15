import { Box, BoxProps } from '@alveole/components';
import React from 'react';
import { TextInput as ReactNativeTextInput } from 'react-native';
import { useStyles } from './FormControl.styles';

export type FormControlProps = React.PropsWithChildren & { style?: BoxProps['style'] };

export const FormControl = React.forwardRef<ReactNativeTextInput, FormControlProps>(function FormControl(props, ref) {
  const { children, style } = props;

  const styles = useStyles();

  return (
    <Box tag="form-control" style={[styles.formControl, style]}>
      {children}
    </Box>
  );
});
