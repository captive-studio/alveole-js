import { Box, BoxProps } from '../../core';
import { useStyles } from './Divider.styles';

export type DividerProps = Omit<BoxProps, 'children'>;

export const Divider = (props: DividerProps) => {
  const styles = useStyles();
  return <Box tag="divider" style={styles.divider} {...props} />;
};
