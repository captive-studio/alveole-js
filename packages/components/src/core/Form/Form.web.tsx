import { Box } from '@alveole/components';
import React, { useRef } from 'react';
import type { FormProps } from './Form';
import { useStyles } from './Form.styles';

export const Form = (props: FormProps) => {
  const { style, ...formProps } = props;
  const styles = useStyles();

  const formRef = useRef<HTMLFormElement>(null);

  const webFormProps = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const button = formRef.current?.querySelector('button[role="button"][aria-selected="true"]');
      if (button instanceof HTMLElement) button.click();
    },
  };

  return <Box ref={formRef} tag="form" style={[styles.form, style]} {...formProps} {...webFormProps} />;
};
