import React from 'react';
import { TextInput as ReactNativeTextInput } from 'react-native';
import { Box, BoxProps } from '../../core/Box';
import { InputHeading } from '../InputHeading';
import { FieldIdProvider } from './FieldId';
import { useStyles } from './FormControl.styles';
import { FormControlCaption, FormControlCaptionProps } from './FormControlCaption';
import { FormControlHint, FormControlHintProps } from './FormControlHint';
import { FormControlLabel, FormControlLabelProps } from './FormControlLabel';

export type FormControlProps = React.PropsWithChildren &
  Pick<FormControlHintProps, 'hint'> &
  FormControlCaptionProps &
  Pick<FormControlLabelProps, 'labelRight'> & {
    label?: string;
    disabled?: boolean;
    required?: boolean;
    style?: BoxProps['style'];
  };

export const FormControl = React.forwardRef<ReactNativeTextInput, FormControlProps>(function FormControl(props, _ref) {
  const { children, label, labelRight, hint, error, success, disabled, required = false, style } = props;

  const styles = useStyles();

  return (
    <FieldIdProvider disabled={disabled} required={required}>
      <Box tag="form-control" style={[styles.formControl, style]}>
        {(!!label || !!hint) && (
          <InputHeading>
            {!!label && <FormControlLabel label={label} labelRight={labelRight} optional={!required} />}
            {!!hint && <FormControlHint hint={hint} />}
          </InputHeading>
        )}
        {children}
        {(!!error || !!success) && <FormControlCaption error={error} success={success} />}
      </Box>
    </FieldIdProvider>
  );
});
