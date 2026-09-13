import { ReactNode } from 'react';
import { Box } from '../../core/Box';
import { useStyles } from './InputHeading.styles';

export type InputHeadingProps = {
  children: ReactNode;
};

export const InputHeading = (props: InputHeadingProps) => {
  const { children } = props;
  const styles = useStyles();
  return (
    <Box tag="input-heading" style={styles.inputHeading}>
      {children}
    </Box>
  );
};
