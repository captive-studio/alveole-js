import React, { useRef } from 'react';
import type { TamaguiElement } from 'tamagui';
import { Box } from '../Box';
import type { FormProps } from './Form';
import { useStyles } from './Form.styles';

export const Form = (props: FormProps) => {
  const { style, ...formProps } = props;
  const styles = useStyles();
  const formRef = useRef<TamaguiElement>(null);

  const webFormProps = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = formRef.current;
      if (!(form instanceof HTMLElement)) return;
      const button = form.querySelector('button[role="button"][aria-selected="true"]');
      if (button instanceof HTMLElement) button.click();
    },
  };

  return <Box ref={formRef} tag="form" style={[styles.form, style]} {...formProps} {...webFormProps} />;
};
