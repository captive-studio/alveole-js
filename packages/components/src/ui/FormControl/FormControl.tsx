import React from 'react';
import { TextInput as ReactNativeTextInput } from 'react-native';
import { Box, BoxProps } from '../../core/Box';
import { FieldIdProvider } from './FieldId';
import { useStyles } from './FormControl.styles';

export type FormControlProps = React.PropsWithChildren & { style?: BoxProps['style'] };

export const FormControl = React.forwardRef<ReactNativeTextInput, FormControlProps>(function FormControl(props, _ref) {
  const { children, style } = props;

  const styles = useStyles();

  return (
    <FieldIdProvider>
      <Box tag="form-control" style={[styles.formControl, style]}>
        {children}
      </Box>
    </FieldIdProvider>
  );
});
